// Layout invariants and quality regressions.
//
//  T1 area conservation   sum of cell areas == container area (0.1% tolerance)
//  T2 no overlap          pairwise intersections ~= 0
//  T3 containment         all cells inside the container
//  T8 aspect ratios       worst ratio stays under regression thresholds
//  T9 stability           resquarify mean IoU >= squarify after ±10% perturbation

import test from 'node:test';
import assert from 'node:assert/strict';

import { squarify } from '../src/layout/squarify.js';
import { resquarify } from '../src/layout/resquarify.js';
import { worstAspectRatio, meanIoU } from '../src/layout/metrics.js';

import { loadDemoData, mulberry32, groupItems, conceptItems } from './helpers.js';

const data = loadDemoData();

function approx(a, b, tol, msg) {
  assert.ok(Math.abs(a - b) <= tol, `${msg || 'approx'}: ${a} vs ${b} (tol ${tol})`);
}

/* ---------------- T1-T3: invariants across container shapes ---------------- */

test('squarify preserves area, avoids overlap and stays inside the container', () => {
  const sizes = [
    [1280, 720],
    [1600, 900],
    [900, 900],
    [700, 1100],
    [1920, 1080],
  ];
  for (const [W, H] of sizes) {
    const { rects } = squarify(groupItems(data), 0, 0, W, H);
    const keys = Object.keys(rects);
    assert.equal(keys.length, data.categories.length, `cell count for ${W}x${H}`);
    let sum = 0;
    for (const k of keys) {
      const r = rects[k];
      sum += r.w * r.h;
      assert.ok(
        r.x >= -1e-6 && r.y >= -1e-6 && r.x + r.w <= W + 1e-6 && r.y + r.h <= H + 1e-6,
        `outside container: ${k} (${r.x},${r.y},${r.w},${r.h})`,
      );
    }
    approx(sum, W * H, W * H * 0.001, `area conservation at ${W}x${H}`);
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const a = rects[keys[i]],
          b = rects[keys[j]];
        const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
        const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
        assert.ok(ix * iy < 1e-6, `overlap: ${keys[i]} x ${keys[j]} = ${ix * iy}`);
      }
    }
  }
});

test('squarify holds invariants on the deepest item level', () => {
  const cat = data.categories.reduce((a, b) => (b.concepts.length > a.concepts.length ? b : a));
  const { rects } = squarify(conceptItems(cat), 0, 0, 600, 400);
  let sum = 0;
  for (const r of Object.values(rects)) sum += r.w * r.h;
  approx(sum, 600 * 400, 600 * 400 * 0.001, 'area conservation');
});

/* ---------------- T8: aspect ratio regressions ---------------- */

test('group level: worst aspect ratio <= 6 at 1600x900', () => {
  const { rects } = squarify(groupItems(data), 0, 0, 1600, 900);
  const worst = worstAspectRatio(rects);
  assert.ok(worst <= 6, `worst aspect ratio ${worst.toFixed(2)} > 6`);
});

test(`item level: worst aspect ratio <= 8 across all ${data.categories.length} groups (600x400)`, () => {
  let worstAll = 0;
  for (const cat of data.categories) {
    const { rects } = squarify(conceptItems(cat), 0, 0, 600, 400);
    worstAll = Math.max(worstAll, worstAspectRatio(rects));
  }
  assert.ok(worstAll <= 8, `worst aspect ratio ${worstAll.toFixed(2)} > 8`);
});

/* ---------------- T9: stability of resquarify ---------------- */

test('after ±10% perturbation, resquarify mean IoU >= squarify and >= 0.85', () => {
  const rnd = mulberry32(42);
  const base = groupItems(data);
  const perturbed = base.map((it) => ({ key: it.key, value: it.value * (0.9 + rnd() * 0.2) }));

  const sq1 = squarify(base, 0, 0, 1600, 900);
  const sq2 = squarify(perturbed, 0, 0, 1600, 900);
  const iouSq = meanIoU(sq1.rects, sq2.rects);

  const rq1 = resquarify(base, 0, 0, 1600, 900, null);
  const rq2 = resquarify(perturbed, 0, 0, 1600, 900, { rows: rq1.rows });
  const iouRq = meanIoU(rq1.rects, rq2.rects);

  assert.ok(iouRq >= iouSq, `resquarify IoU ${iouRq.toFixed(3)} < squarify IoU ${iouSq.toFixed(3)}`);
  assert.ok(iouRq >= 0.85, `resquarify IoU ${iouRq.toFixed(3)} < 0.85`);
});

test('resquarify falls back to a fresh squarify when the key set changes', () => {
  const base = groupItems(data);
  const rq1 = resquarify(base, 0, 0, 1600, 900, null);
  const changed = base.slice(0, Math.ceil(base.length / 2)); // half the keys removed
  const rq2 = resquarify(changed, 0, 0, 1600, 900, { rows: rq1.rows });
  assert.equal(rq2.fresh, true, 'should be a fresh squarify pass');
  let sum = 0;
  for (const r of Object.values(rq2.rects)) sum += r.w * r.h;
  approx(sum, 1600 * 900, 1600 * 900 * 0.001, 'area conservation after fallback');
});

test('squarify keepOrder places items in the given order while preserving area', () => {
  const items = [
    { key: 'a', value: 10 },
    { key: 'b', value: 30 },
    { key: 'c', value: 60 },
  ];
  const { rects, order } = squarify(items, 0, 0, 300, 100, true);
  assert.deepEqual(order, ['a', 'b', 'c'], 'keepOrder should not re-sort');
  let sum = 0;
  for (const r of Object.values(rects)) sum += r.w * r.h;
  approx(sum, 300 * 100, 300 * 100 * 0.001, 'area conservation with keepOrder');
});

test('empty and degenerate inputs return empty layouts', () => {
  assert.deepEqual(squarify([], 0, 0, 100, 100).rects, {});
  assert.deepEqual(squarify([{ key: 'a', value: 1 }], 10, 10, 10, 10).rects, {});
});
