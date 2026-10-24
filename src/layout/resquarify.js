// Resquarified treemap (d3-hierarchy semantics): when the key set is
// unchanged, reuse the previous row partitions and row directions so cells
// stay put while values change (e.g. live data updates). Otherwise fall back
// to a fresh squarify pass.

import { squarify, placeRow } from './squarify.js';

function keySetMatch(rows, items) {
  const seen = {};
  let count = 0;
  for (const row of rows) {
    for (const k of row.keys) {
      if (seen[k]) return false;
      seen[k] = true;
      count++;
    }
  }
  if (count !== items.length) return false;
  for (const it of items) if (!seen[it.key]) return false;
  return true;
}

export function resquarify(items, x0, y0, x1, y1, state, keepOrder) {
  if (!state || !state.rows || !keySetMatch(state.rows, items)) {
    const fresh = squarify(items, x0, y0, x1, y1, keepOrder);
    return { rects: fresh.rects, rows: fresh.rows, order: fresh.order, fresh: true };
  }
  const byKey = {};
  let total = 0;
  for (const it of items) {
    byKey[it.key] = it;
    total += it.value;
  }

  const rects = {};
  let value = total;
  let cx0 = x0,
    cy0 = y0;
  for (const row of state.rows) {
    const rowIdx = row.keys.map((k) => items.indexOf(byKey[k]));
    let sumValue = 0;
    for (const i of rowIdx) sumValue += items[i].value;
    placeRow(rects, items, rowIdx, sumValue, row.dice, cx0, cy0, x1, y1, value);
    const dx = x1 - cx0,
      dy = y1 - cy0;
    if (row.dice) cy0 = value ? cy0 + (dy * sumValue) / value : y1;
    else cx0 = value ? cx0 + (dx * sumValue) / value : x1;
    value -= sumValue;
  }
  return { rects, rows: state.rows, order: null, fresh: false };
}
