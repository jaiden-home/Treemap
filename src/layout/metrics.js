// Layout quality metrics used by the regression tests.

/** Worst aspect ratio (max(w/h, h/w)) across a set of rects. */
export function worstAspectRatio(rects) {
  let worst = 0;
  for (const k of Object.keys(rects)) {
    const r = rects[k];
    if (r.w <= 0 || r.h <= 0) continue;
    const ratio = Math.max(r.w / r.h, r.h / r.w);
    if (ratio > worst) worst = ratio;
  }
  return worst;
}

/** Intersection-over-union of two rects. */
export function rectIoU(a, b) {
  const ix0 = Math.max(a.x, b.x),
    iy0 = Math.max(a.y, b.y);
  const ix1 = Math.min(a.x + a.w, b.x + b.w),
    iy1 = Math.min(a.y + a.h, b.y + b.h);
  const inter = Math.max(0, ix1 - ix0) * Math.max(0, iy1 - iy0);
  const uni = a.w * a.h + b.w * b.h - inter;
  return uni > 0 ? inter / uni : 1;
}

/** Mean IoU across shared keys: 1 = perfectly stable layout across updates. */
export function meanIoU(rectsA, rectsB) {
  const keys = Object.keys(rectsA);
  let sum = 0,
    cnt = 0;
  for (const k of keys) {
    if (rectsB[k]) {
      sum += rectIoU(rectsA[k], rectsB[k]);
      cnt++;
    }
  }
  return cnt ? sum / cnt : 0;
}
