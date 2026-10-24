// Numerical equivalence with d3-hierarchy (the reference implementation).
// d3-hierarchy is a devDependency used for verification only — nothing from
// it ships in the library.
//
//  E1 squarify     vs d3.treemapSquarify.ratio(1): per-cell comparison,
//                  tolerance < 0.5px (measured: float noise, ~1e-13)
//  E2 resquarify   vs d3.treemapResquarify.ratio(1): second pass after a
//                  value update, reusing row partitions

import test from 'node:test';
import assert from 'node:assert/strict';

import { hierarchy, treemap, treemapSquarify, treemapResquarify } from 'd3-hierarchy';

import { squarify } from '../src/layout/squarify.js';
import { resquarify } from '../src/layout/resquarify.js';

import { loadDemoData, mulberry32, groupItems, conceptItems } from './helpers.js';

const data = loadDemoData();
const TOL = 0.5;

const sqTile = treemapSquarify.ratio(1);
const rsqTile = treemapResquarify.ratio(1);

function d3Layout(items, W, H, tile) {
  const root = hierarchy({ children: items.map((it, i) => ({ name: it.key, value: it.value, idx: i })) })
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value || a.data.idx - b.data.idx);
  treemap().tile(tile).size([W, H]).round(false)(root);
  return root;
}

function maxCellDiff(items, mine, d3root) {
  let maxDiff = 0;
  const leaves = d3root.leaves();
  assert.equal(Object.keys(mine.rects).length, leaves.length, 'cell count mismatch');
  for (const leaf of leaves) {
    const r = mine.rects[leaf.data.name];
    assert.ok(r, 'missing cell: ' + leaf.data.name);
    maxDiff = Math.max(
      maxDiff,
      Math.abs(r.x - leaf.x0),
      Math.abs(r.y - leaf.y0),
      Math.abs(r.w - (leaf.x1 - leaf.x0)),
      Math.abs(r.h - (leaf.y1 - leaf.y0)),
    );
  }
  return maxDiff;
}

function assertEquivalent(label, items, W, H, mine, tile) {
  const diff = maxCellDiff(items, mine, d3Layout(items, W, H, tile));
  assert.ok(diff < TOL, `${label}: max deviation ${diff.toExponential(3)}px >= ${TOL}px`);
}

/* ---------------- E1: squarify equivalence ---------------- */

for (const [W, H] of [
  [1600, 900],
  [1280, 720],
  [900, 900],
  [700, 1100],
  [1920, 600],
]) {
  test(`squarify == d3.treemapSquarify.ratio(1), group level ${W}x${H}`, () => {
    const items = groupItems(data);
    assertEquivalent('group level', items, W, H, squarify(items, 0, 0, W, H), sqTile);
  });
}

test('squarify == d3.treemapSquarify.ratio(1) on every group item level (600x400)', () => {
  for (const cat of data.categories) {
    const items = conceptItems(cat);
    assertEquivalent(`item level "${cat.name}"`, items, 600, 400, squarify(items, 0, 0, 600, 400), sqTile);
  }
});

test('squarify == d3 on synthetic data across sizes and extreme containers', () => {
  const rnd = mulberry32(7);
  for (const n of [1, 2, 3, 5, 17, 144]) {
    for (const [W, H] of [
      [400, 400],
      [100, 1000],
      [1000, 100],
    ]) {
      const items = Array.from({ length: n }, (_, i) => ({ key: 'k' + i, value: 1 + rnd() * 100 }));
      assertEquivalent(`synthetic n=${n} ${W}x${H}`, items, W, H, squarify(items, 0, 0, W, H), sqTile);
    }
  }
});

/* ---------------- E2: resquarify equivalence ---------------- */

test('resquarify == d3.treemapResquarify.ratio(1) on a value update (1600x900)', () => {
  const W = 1600,
    H = 900;
  const rnd2 = mulberry32(99);
  const items1 = groupItems(data);
  const items2 = items1.map((it) => ({ key: it.key, value: it.value * (0.85 + rnd2() * 0.3) }));

  // Ours: first pass (degenerates to squarify), second pass reuses rows.
  const mine1 = resquarify(items1, 0, 0, W, H, null);
  const mine2 = resquarify(items2, 0, 0, W, H, { rows: mine1.rows });

  // d3: same root passed through the treemap twice; second call reuses rows.
  const root = hierarchy({ children: items1.map((it, i) => ({ name: it.key, value: it.value, idx: i })) })
    .sum((d) => d.value)
    .sort((a, b) => b.value - a.value || a.data.idx - b.data.idx);
  const tm = treemap().tile(rsqTile).size([W, H]).round(false);
  tm(root);
  const v2 = {};
  for (const it of items2) v2[it.key] = it.value;
  for (const leaf of root.children) {
    leaf.data.value = v2[leaf.data.name];
    leaf.value = leaf.data.value;
  }
  root.value = items2.reduce((s, it) => s + it.value, 0);
  tm(root);

  const diff = maxCellDiff(items2, mine2, root);
  assert.ok(diff < TOL, `resquarify max deviation ${diff.toExponential(3)}px >= ${TOL}px`);
});
