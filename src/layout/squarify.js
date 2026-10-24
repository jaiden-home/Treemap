// Squarified treemap layout (Bruls, Huizing & van Wijk 2000), numerically
// equivalent to d3-hierarchy's treemapSquarify.ratio(1) (verified to float
// precision by test/d3-equivalence.test.js).
//
// items: [{ key, value > 0 }] -> { rects, rows, order }
//   rects: key -> {x, y, w, h}
//   rows:  row partitions [{ keys, dice }] (reused by resquarify)
//   order: keys sorted by value desc (the placement order)
// keepOrder=true places items in the given order instead of value-descending,
// letting callers control placement order while areas still encode value.

export function squarify(items, x0, y0, x1, y1, keepOrder) {
  const n = items.length;
  const rects = {},
    rows = [];
  if (n === 0 || !(x1 > x0) || !(y1 > y0)) return { rects, rows, order: [] };

  const order = items.map((_, i) => i);
  if (!keepOrder) order.sort((a, b) => items[b].value - items[a].value || a - b);
  let total = 0;
  for (const it of items) total += it.value;

  let i0 = 0,
    i1 = 0,
    value = total;
  while (i0 < n) {
    const dx = x1 - x0,
      dy = y1 - y0;
    let sumValue;
    do {
      sumValue = items[order[i1++]].value;
    } while (!sumValue && i1 < n);
    let minValue = sumValue,
      maxValue = sumValue;
    const alpha = Math.max(dy / dx, dx / dy) / value; // ratio = 1
    let beta = sumValue * sumValue * alpha;
    let minRatio = Math.max(maxValue / beta, beta / minValue);
    for (; i1 < n; ++i1) {
      const nodeValue = items[order[i1]].value;
      sumValue += nodeValue;
      if (nodeValue < minValue) minValue = nodeValue;
      if (nodeValue > maxValue) maxValue = nodeValue;
      beta = sumValue * sumValue * alpha;
      const newRatio = Math.max(maxValue / beta, beta / minValue);
      if (newRatio > minRatio) {
        sumValue -= nodeValue;
        break;
      }
      minRatio = newRatio;
    }
    const dice = dx < dy;
    const rowIdx = order.slice(i0, i1);
    rows.push({ keys: rowIdx.map((i) => items[i].key), dice });
    placeRow(rects, items, rowIdx, sumValue, dice, x0, y0, x1, y1, value);
    if (dice) y0 = value ? y0 + (dy * sumValue) / value : y1;
    else x0 = value ? x0 + (dx * sumValue) / value : x1;
    value -= sumValue;
    i0 = i1;
  }
  return { rects, rows, order: order.map((i) => items[i].key) };
}

/** Lay out one row (or column) of cells inside the current remainder box. */
export function placeRow(rects, items, rowIdx, sumValue, dice, x0, y0, x1, y1, remainingValue) {
  if (dice) {
    const yEnd = remainingValue ? y0 + ((y1 - y0) * sumValue) / remainingValue : y1;
    const k = sumValue ? (x1 - x0) / sumValue : 0;
    let xx = x0;
    for (const i of rowIdx) {
      const it = items[i];
      const w = it.value * k;
      rects[it.key] = { x: xx, y: y0, w, h: yEnd - y0 };
      xx += w;
    }
  } else {
    const xEnd = remainingValue ? x0 + ((x1 - x0) * sumValue) / remainingValue : x1;
    const k = sumValue ? (y1 - y0) / sumValue : 0;
    let yy = y0;
    for (const i of rowIdx) {
      const it = items[i];
      const h = it.value * k;
      rects[it.key] = { x: x0, y: yy, w: xEnd - x0, h };
      yy += h;
    }
  }
}
