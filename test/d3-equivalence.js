/*
 * test/d3-equivalence.js — 与参照实现 d3-hierarchy 的逐格数值等价性验证
 * （node test/d3-equivalence.js；d3-hierarchy 仅作验证工具，不进入交付物）
 *
 *  E1 squarify 等价：本实现 vs d3.treemap().tile(d3.treemapSquarify.ratio(1))
 *     —— 真实数据大类层/全部 31 类子概念层 + 合成随机数据与极端容器，
 *        逐格比较 (x, y, w, h)，要求最大偏差 < 0.5px。
 *  E2 resquarify 等价：数值更新后 vs d3.treemapResquarify.ratio(1) 第二次布局。
 */
'use strict';

const fs = require('fs');
const path = require('path');
const d3 = require('d3-hierarchy');
const Treemap = require('../treemap.js');
const U = Treemap.utils;

const data = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'heatmap.json'), 'utf-8'));
const TOL = 0.5; // 题目要求容差 < 0.5px

let passed = 0, failed = 0;
function check(label, fn) {
  try {
    const maxDiff = fn();
    if (maxDiff >= TOL) throw new Error('最大偏差 ' + maxDiff.toExponential(3) + 'px ≥ ' + TOL);
    console.log(`  PASS  ${label}（最大偏差 ${maxDiff.toExponential(2)}px）`);
    passed++;
  } catch (e) {
    console.log(`  FAIL  ${label}\n        ${e.message}`);
    failed++;
  }
}

function d3Layout(items, W, H, tile) {
  const root = d3.hierarchy({ children: items.map((it, i) => ({ name: it.key, value: it.value, idx: i })) })
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value || a.data.idx - b.data.idx);
  d3.treemap().tile(tile).size([W, H]).round(false)(root);
  return root;
}

function maxCellDiff(items, mine, d3root) {
  let maxDiff = 0;
  for (const leaf of d3root.leaves()) {
    const r = mine.rects[leaf.data.name];
    if (!r) throw new Error('缺少格子: ' + leaf.data.name);
    maxDiff = Math.max(maxDiff,
      Math.abs(r.x - leaf.x0), Math.abs(r.y - leaf.y0),
      Math.abs(r.w - (leaf.x1 - leaf.x0)), Math.abs(r.h - (leaf.y1 - leaf.y0)));
  }
  if (Object.keys(mine.rects).length !== d3root.leaves().length) throw new Error('格子数不一致');
  return maxDiff;
}

const sqTile = d3.treemapSquarify.ratio(1);
const rsqTile = d3.treemapResquarify.ratio(1);

function catItems() {
  return data.categories.map((c, i) => ({ key: c.name || 'cat' + i, value: Math.max(c.n || 0, 0.5) }));
}
function conceptItems(cat) {
  return cat.concepts.map((c, j) => ({ key: c.code || c.name || 'c' + j, value: Math.max(c.n || 0, 0.5) }));
}

console.log('\n== E1 squarify 与 d3.treemapSquarify.ratio(1) 逐格等价 ==');
for (const [W, H] of [[1600, 900], [1280, 720], [900, 900], [700, 1100], [1920, 600]]) {
  check(`大类层 ${W}x${H}`, () => {
    const items = catItems();
    return maxCellDiff(items, U.squarifyLayout(items, 0, 0, W, H), d3Layout(items, W, H, sqTile));
  });
}
data.categories.forEach(cat => {
  check(`子概念层「${cat.name}」(${cat.concepts.length} 格, 600x400)`, () => {
    const items = conceptItems(cat);
    return maxCellDiff(items, U.squarifyLayout(items, 0, 0, 600, 400), d3Layout(items, 600, 400, sqTile));
  });
});

// 合成数据（无重复值，避免排序歧义）+ 极端容器
function mulberry32(a) {
  return function () {
    a |= 0; a = a + 0x6D2B79F5 | 0;
    let t = Math.imul(a ^ a >>> 15, 1 | a);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
}
const rnd = mulberry32(7);
[1, 2, 3, 5, 17, 144].forEach(n => {
  [[400, 400], [100, 1000], [1000, 100]].forEach(([W, H], ci) => {
    check(`合成 n=${n} 容器 ${W}x${H}`, () => {
      const items = Array.from({ length: n }, (_, i) => ({ key: 'k' + i, value: 1 + rnd() * 100 }));
      return maxCellDiff(items, U.squarifyLayout(items, 0, 0, W, H), d3Layout(items, W, H, sqTile));
    });
  });
});

console.log('\n== E2 resquarify 与 d3.treemapResquarify.ratio(1) 逐格等价 ==');
check('大类层 1600x900：首次布局 + 数值更新后二次布局', () => {
  const W = 1600, H = 900;
  const rnd2 = mulberry32(99);
  const items1 = catItems();
  const items2 = items1.map(it => ({ key: it.key, value: it.value * (0.85 + rnd2() * 0.3) }));

  // 本实现：首次（退化为 squarify）+ 复用行划分的二次布局
  const mine1 = U.resquarifyLayout(items1, 0, 0, W, H, null);
  const mine2 = U.resquarifyLayout(items2, 0, 0, W, H, { rows: mine1.rows });

  // d3：同一 root 两次调用，第二次走 resquarify 缓存路径
  const root = d3.hierarchy({ children: items1.map((it, i) => ({ name: it.key, value: it.value, idx: i })) })
    .sum(d => d.value)
    .sort((a, b) => b.value - a.value || a.data.idx - b.data.idx);
  const tm = d3.treemap().tile(rsqTile).size([W, H]).round(false);
  tm(root);                                   // 第一次：squarify 并记录行划分
  // 注意：root.children 已按值排序，必须按 name 映射新值
  const v2byKey = {};
  items2.forEach(it => { v2byKey[it.key] = it.value; });
  root.children.forEach(leaf => { leaf.data.value = v2byKey[leaf.data.name]; leaf.value = leaf.data.value; });
  root.value = items2.reduce((s, it) => s + it.value, 0);
  tm(root);                                   // 第二次：resquarify 复用行划分

  const d2 = maxCellDiff(items2, mine2, root);
  return d2;
});

console.log(`\n结果：${passed} 通过，${failed} 失败（容差要求 < ${TOL}px）`);
process.exit(failed ? 1 : 0);
