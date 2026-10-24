/*
 * test/run-tests.js — 零依赖单元测试（node test/run-tests.js）
 *
 * 覆盖题目要求的机器可验证不变量：
 *  T1 面积守恒        Σ格子面积 = 容器面积（容差 0.1%）
 *  T2 无重叠          任意两格交集面积 ≈ 0
 *  T3 不越界          所有格子在容器内
 *  T4 颜色单调        离开锚点 0.5 越远，感知距离（Lab ΔE）单调增大；红/绿方向正确
 *  T5 WCAG AA         自适应文字（浅底深字/深底白字）全色阶对比度 ≥ 4.5:1
 *  T6 色盲可分辨      红/绿端点在 deuteranopia/protanopia 模拟后仍可分辨（ΔE76 报告+阈值）
 *  T7 Wilson 区间     与独立公式交叉验证、边界行为
 *  T8 宽高比回归      真实数据布局的最差宽高比 ≤ 阈值
 *  T9 布局稳定性      数值扰动 ±10% 后 resquarify 的平均 IoU ≥ squarify 重排
 */
'use strict';

const Treemap = require('../treemap.js');
const U = Treemap.utils;

const data = require('../data.js');

let passed = 0, failed = 0;
function test(name, fn) {
  try {
    fn();
    console.log('  PASS  ' + name);
    passed++;
  } catch (e) {
    console.log('  FAIL  ' + name + '\n        ' + e.message);
    failed++;
  }
}
function assert(cond, msg) { if (!cond) throw new Error(msg); }
function approx(a, b, tol, msg) {
  if (Math.abs(a - b) > tol) throw new Error((msg || 'approx') + ': ' + a + ' vs ' + b + ' (tol ' + tol + ')');
}

/* ---------- 数据准备 ---------- */
function catItems(areaMode) {
  return data.categories.map((c, i) => ({
    key: c.name || 'cat' + i,
    value: areaMode === 'absPct' ? Math.max(Math.abs(c.avgPct), 0.5) : Math.max(c.n || 0, 0.5)
  }));
}
function conceptItems(cat) {
  return cat.concepts.map((c, j) => ({ key: c.code || 'c' + j, value: Math.max(c.n || 0, 0.5) }));
}

console.log('\n== T1-T3 布局不变量（面积守恒 / 无重叠 / 不越界） ==');
const SIZES = [[1280, 720], [1600, 900], [900, 900], [700, 1100], [1920, 1080]];
for (const [W, H] of SIZES) {
  test(`squarify ${W}x${H} 大类层：面积守恒+无重叠+不越界`, () => {
    const { rects } = U.squarifyLayout(catItems('n'), 0, 0, W, H);
    const keys = Object.keys(rects);
    assert(keys.length === data.categories.length, '格子数 ' + keys.length);
    let sum = 0;
    for (const k of keys) {
      const r = rects[k];
      sum += r.w * r.h;
      assert(r.x >= -1e-6 && r.y >= -1e-6 && r.x + r.w <= W + 1e-6 && r.y + r.h <= H + 1e-6,
        `越界: ${k} (${r.x},${r.y},${r.w},${r.h})`);
    }
    approx(sum, W * H, W * H * 0.001, '面积守恒');
    for (let i = 0; i < keys.length; i++) for (let j = i + 1; j < keys.length; j++) {
      const a = rects[keys[i]], b = rects[keys[j]];
      const ix = Math.max(0, Math.min(a.x + a.w, b.x + b.w) - Math.max(a.x, b.x));
      const iy = Math.max(0, Math.min(a.y + a.h, b.y + b.h) - Math.max(a.y, b.y));
      assert(ix * iy < 1e-6, `重叠: ${keys[i]} × ${keys[j]} = ${ix * iy}`);
    }
  });
}
test('squarify 子概念层不变量（子概念最多的大类）', () => {
  const cat = data.categories.reduce((a, b) => (b.concepts.length > a.concepts.length ? b : a));
  const { rects } = U.squarifyLayout(conceptItems(cat), 0, 0, 600, 400);
  let sum = 0;
  Object.values(rects).forEach(r => { sum += r.w * r.h; });
  approx(sum, 600 * 400, 600 * 400 * 0.001, '面积守恒');
});

console.log('\n== T4 颜色单调性（感知均匀 diverging） ==');
test('离开锚点越远，与中性的 Lab ΔE 单调不减', () => {
  const mid = U.rgbToLab(...U.scaleRgb(0.5));
  let prevR = -1, prevG = -1;
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const dR = U.deltaE76(U.rgbToLab(...U.scaleRgb(0.5 + t / 2)), mid);
    const dG = U.deltaE76(U.rgbToLab(...U.scaleRgb(0.5 - t / 2)), mid);
    assert(dR >= prevR - 1e-9, `红支 ΔE 非单调 @t=${t}: ${dR} < ${prevR}`);
    assert(dG >= prevG - 1e-9, `绿支 ΔE 非单调 @t=${t}: ${dG} < ${prevG}`);
    prevR = dR; prevG = dG;
  }
  assert(prevR > 40 && prevG > 40, '端点感知强度不足: ' + prevR + '/' + prevG);
});
test('方向正确：红支 (r-g) 递增，绿支 (g-r) 递增', () => {
  let prevR = -Infinity, prevG = -Infinity;
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const [r1, g1] = U.scaleRgb(0.5 + t / 2);
    const [r2, g2] = U.scaleRgb(0.5 - t / 2);
    assert(r1 - g1 >= prevR - 1e-9, '红支方向');
    assert(g2 - r2 >= prevG - 1e-9, '绿支方向');
    prevR = r1 - g1; prevG = g2 - r2;
  }
});

console.log('\n== T5 WCAG AA 对比度（自适应文字 vs 全色阶） ==');
test('全色阶 101 采样点：浅底深字 / 深底白字对比度 ≥ 4.5:1', () => {
  const DARK_TEXT = [0, 0, 0]; // 深色主文字 #000（.tm-cell.tm-dk .tm-nm）：不透明纯黑，保证切换边界无 WCAG 死区
  let minC = Infinity, minAt = 0, darkCnt = 0;
  for (let i = 0; i <= 100; i++) {
    const ratio = i / 100;
    const rgb = U.scaleRgb(ratio);
    const lum = U.relativeLuminance(...rgb);
    // 与渲染器 isLightBg 同规则：白字对比度 < 4.5 时切换深色文字
    const useDark = U.contrastRatio(1.0, lum) < 4.5;
    if (useDark) darkCnt++;
    const c = useDark
      ? U.contrastRatio(lum, U.relativeLuminance(...DARK_TEXT))
      : U.contrastRatio(1.0, lum);
    if (c < minC) { minC = c; minAt = ratio; }
  }
  console.log(`        （最小对比度 ${minC.toFixed(2)}:1 @ratio=${minAt}，深字采样 ${darkCnt}/101）`);
  assert(minC >= 4.5, '最小对比度 ' + minC.toFixed(2) + ' < 4.5');
});

console.log('\n== T6 色觉障碍可分辨性（Machado severity=1.0） ==');
for (const type of ['deuteranopia', 'protanopia']) {
  test(`${type}：红/绿端点模拟后仍可分辨`, () => {
    const redSim = U.cvdSimulate(...U.scaleRgb(1.0), type);
    const greenSim = U.cvdSimulate(...U.scaleRgb(0.0), type);
    const dE = U.deltaE76(U.rgbToLab(...redSim), U.rgbToLab(...greenSim));
    const dL = Math.abs(U.rgbToLab(...redSim).L - U.rgbToLab(...greenSim).L);
    console.log(`        （模拟后 ΔE76=${dE.toFixed(1)}, ΔL*=${dL.toFixed(1)}）`);
    assert(dE >= 6, 'ΔE76=' + dE.toFixed(1) + ' 过低，色盲下不可分辨');
  });
}

console.log('\n== T7 Wilson 区间 ==');
test('wilson(50,100) ≈ [0.4038, 0.5962]（与教科书值对照）', () => {
  const w = U.wilson(50, 100);
  approx(w.lo, 0.4038, 0.001, 'lo');
  approx(w.hi, 0.5962, 0.001, 'hi');
});
test('wilson 边界：全跌/全涨仍落在 [0,1]；中心向 0.5 收缩且与独立公式一致', () => {
  const w0 = U.wilson(0, 16), w1 = U.wilson(16, 16);
  assert(w0.lo === 0 && w0.hi > 0 && w0.hi < 0.25, '全跌区间异常: ' + JSON.stringify(w0));
  assert(w1.hi === 1 && w1.lo > 0.75, '全涨区间异常: ' + JSON.stringify(w1));
  // 独立公式交叉验证（Newcombe 1998 定义式）
  const up = 13, n = 16, z = 1.959964, p = up / n, z2 = z * z;
  const center = (p + z2 / (2 * n)) / (1 + z2 / n);
  const half = z * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n)) / (1 + z2 / n);
  const w = U.wilson(up, n);
  approx(w.center, center, 1e-12, 'center 与定义式');
  approx(w.lo, center - half, 1e-12, 'lo 与定义式');
  approx(w.hi, center + half, 1e-12, 'hi 与定义式');
  // 小样本收缩方向：中心介于点估计与 0.5 之间
  assert((w.center - 0.5) * (p - 0.5) > 0 && Math.abs(w.center - 0.5) < Math.abs(p - 0.5),
    '收缩方向异常: center=' + w.center + ' p=' + p);
});
test('wilson 与正态近似的序关系：n 越大区间越窄', () => {
  const a = U.wilson(8, 10), b = U.wilson(80, 100);
  assert((a.hi - a.lo) > (b.hi - b.lo), '区间宽度未随 n 收窄');
});

console.log('\n== T8 宽高比回归（真实数据） ==');
test('大类层最差宽高比 ≤ 6（1600x900）', () => {
  const { rects } = U.squarifyLayout(catItems('n'), 0, 0, 1600, 900);
  const worst = U.worstAspectRatio(rects);
  console.log(`        （实测最差宽高比 ${worst.toFixed(2)}）`);
  assert(worst <= 6, 'worst=' + worst.toFixed(2));
});
test(`全部 ${data.categories.length} 个大类的子概念层最差宽高比 ≤ 8（按各自框 600x400 归一）`, () => {
  let worstAll = 0;
  for (const cat of data.categories) {
    const { rects } = U.squarifyLayout(conceptItems(cat), 0, 0, 600, 400);
    worstAll = Math.max(worstAll, U.worstAspectRatio(rects));
  }
  console.log(`        （${data.categories.length} 类中最差 ${worstAll.toFixed(2)}）`);
  assert(worstAll <= 8, 'worst=' + worstAll.toFixed(2));
});

console.log('\n== T9 布局稳定性（resquarify vs squarify，数值扰动 ±10%） ==');
test('扰动后 resquarify 平均 IoU ≥ squarify 重排，且 ≥ 0.85', () => {
  function mulberry32(a) {
    return function () {
      a |= 0; a = a + 0x6D2B79F5 | 0;
      let t = Math.imul(a ^ a >>> 15, 1 | a);
      t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
      return ((t ^ t >>> 14) >>> 0) / 4294967296;
    };
  }
  const rnd = mulberry32(42);
  const base = catItems('n');
  const perturbed = base.map(it => ({ key: it.key, value: it.value * (0.9 + rnd() * 0.2) }));

  const sq1 = U.squarifyLayout(base, 0, 0, 1600, 900);
  const sq2 = U.squarifyLayout(perturbed, 0, 0, 1600, 900);
  const iouSq = U.meanIoU(sq1.rects, sq2.rects);

  const rq1 = U.resquarifyLayout(base, 0, 0, 1600, 900, null);
  const rq2 = U.resquarifyLayout(perturbed, 0, 0, 1600, 900, { rows: rq1.rows });
  const iouRq = U.meanIoU(rq1.rects, rq2.rects);

  console.log(`        （squarify 重排 IoU=${iouSq.toFixed(3)}, resquarify IoU=${iouRq.toFixed(3)}）`);
  assert(iouRq >= iouSq, 'resquarify 未比 squarify 更稳定');
  assert(iouRq >= 0.85, 'resquarify IoU=' + iouRq.toFixed(3) + ' < 0.85');
});
test('键集合变化时 resquarify 安全回退为 squarify', () => {
  const base = catItems('n');
  const rq1 = U.resquarifyLayout(base, 0, 0, 1600, 900, null);
  const changed = base.slice(0, Math.ceil(base.length / 2)); // 删掉一半大类 ⇒ 键集合必变
  const rq2 = U.resquarifyLayout(changed, 0, 0, 1600, 900, { rows: rq1.rows });
  assert(rq2.fresh === true, '应回退为全新 squarify');
  let sum = 0;
  Object.values(rq2.rects).forEach(r => { sum += r.w * r.h; });
  approx(sum, 1600 * 900, 1600 * 900 * 0.001, '回退后面积守恒');
});

console.log(`\n结果：${passed} 通过，${failed} 失败`);
process.exit(failed ? 1 : 0);
