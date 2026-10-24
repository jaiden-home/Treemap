/*
 * audit/audit.js — data.js 聚合一致性审计（node audit/audit.js）
 *
 * 题目要求：无逐股原始数据时，对既有聚合数据做可复核的一致性审计。
 * 依据 meta.note 的口径："一股一概念"（每只股票恰好归属一个子概念），因此：
 *   A1 大类 n      == Σ 子概念 n          （成分不重不漏）
 *   A2 大类 up     == Σ 子概念 up
 *   A3 大类 evalN  == Σ 子概念 evalN
 *   A4 大类 avgPct ≈ Σ(子概念 avgPct × n) / Σ n   （等权平均的可加性；容差=舍入误差）
 *   A5 领涨股一致性：大类 leader 必为其某一子概念的 leader，且 pct 一致
 *   A6 全局口径：Σ 大类 n == meta.stocksEvaluated；大类/概念计数 == meta
 *   A7 值域合理性：|avgPct| ≤ 20.05（涨跌停±20% 含舍入）、0 ≤ up ≤ evalN、evalN ≥ n? 等
 * 输出：控制台 + audit/audit-results.json（供 report.md 引用）
 */
'use strict';

const fs = require('fs');
const path = require('path');
const data = require('../data.js');

const results = { file: 'data.js', meta: data.meta, checks: [], issues: [] };
function record(id, name, ok, detail) {
  results.checks.push({ id, name, ok, detail });
  const mark = ok ? 'PASS' : 'FAIL';
  console.log(`  ${mark}  [${id}] ${name}` + (detail ? `\n        ${detail}` : ''));
  if (!ok) results.issues.push({ id, name, detail });
}
const r2 = x => Math.round(x * 100) / 100;

console.log('\n== 聚合一致性审计 ==');

/* A1-A4 逐大类核对 */
let maxAvgDev = 0, maxAvgDevAt = '';
let a1 = true, a2 = true, a3 = true, a5 = true;
const perCat = [];
for (const cat of data.categories) {
  const cs = cat.concepts || [];
  const sumN = cs.reduce((s, c) => s + c.n, 0);
  const sumUp = cs.reduce((s, c) => s + c.up, 0);
  const sumEval = cs.reduce((s, c) => s + c.evalN, 0);
  const weightedAvg = sumN ? cs.reduce((s, c) => s + c.avgPct * c.n, 0) / sumN : NaN;
  const dev = Math.abs(weightedAvg - cat.avgPct);
  if (dev > maxAvgDev) { maxAvgDev = dev; maxAvgDevAt = cat.name; }

  if (sumN !== cat.n) { a1 = false; results.issues.push({ id: 'A1', name: cat.name, detail: `n: ${cat.n} != Σ ${sumN}` }); }
  if (sumUp !== cat.up) { a2 = false; results.issues.push({ id: 'A2', name: cat.name, detail: `up: ${cat.up} != Σ ${sumUp}` }); }
  if (sumEval !== cat.evalN) { a3 = false; results.issues.push({ id: 'A3', name: cat.name, detail: `evalN: ${cat.evalN} != Σ ${sumEval}` }); }

  // A5 leader 必须出现在某个子概念的 leader 中（一股一概念 ⇒ 大类最大值必在某个概念内取到）
  const leaderHit = cs.some(c => c.leader && cat.leader && c.leader.code === cat.leader.code && c.leader.pct === cat.leader.pct);
  if (!leaderHit) { a5 = false; results.issues.push({ id: 'A5', name: cat.name, detail: `leader ${cat.leader && cat.leader.name} 未在任何子概念 leader 中出现` }); }

  perCat.push({ name: cat.name, n: cat.n, sumN, up: cat.up, sumUp, avgPct: cat.avgPct, weightedAvg: r2(weightedAvg), dev: +dev.toFixed(4) });
}
record('A1', '大类 n == Σ 子概念 n（成分不重不漏）', a1, a1 ? `${data.categories.length}/${data.categories.length} 大类一致` : results.issues.filter(i => i.id === 'A1').length + ' 处不一致');
record('A2', '大类 up == Σ 子概念 up', a2, a2 ? `${data.categories.length}/${data.categories.length} 大类一致` : '');
record('A3', '大类 evalN == Σ 子概念 evalN', a3, a3 ? `${data.categories.length}/${data.categories.length} 大类一致` : '');
record('A4', '大类 avgPct ≈ 按 n 加权还原值（容差 0.01 = 两位小数舍入）',
  maxAvgDev <= 0.01 + 1e-9,
  `最大偏差 ${maxAvgDev.toFixed(4)} @「${maxAvgDevAt}」（>0.01 说明大类均值非由这些子概念等权聚合而来）`);
record('A5', '大类领涨股必为某子概念领涨股（一股一概念的必然推论）', a5, a5 ? `${data.categories.length}/${data.categories.length} 一致` : '');

/* A6 全局口径 */
const totalN = data.categories.reduce((s, c) => s + c.n, 0);
const totalConcepts = data.categories.reduce((s, c) => s + c.concepts.length, 0);
record('A6a', `Σ 大类 n (${totalN}) == meta.stocksEvaluated (${data.meta.stocksEvaluated})`,
  totalN === data.meta.stocksEvaluated,
  totalN === data.meta.stocksEvaluated ? '覆盖率口径自洽：一股一概念且全部纳入' : '存在未纳入概念体系的已评估股票');
record('A6b', `大类计数 ${data.categories.length} == meta.categories (${data.meta.categories})`,
  data.categories.length === data.meta.categories);
record('A6c', `子概念计数 ${totalConcepts} == meta.concepts (${data.meta.concepts})`,
  totalConcepts === data.meta.concepts);

/* A7 值域与单调性 */
let rangeOk = true, upOk = true, leaderMaxOk = true;
const badRanges = [];
for (const cat of data.categories) {
  for (const c of [cat, ...cat.concepts]) {
    if (Math.abs(c.avgPct) > 20.05) { rangeOk = false; badRanges.push(`${c.name} avgPct=${c.avgPct}`); }
    if (!(c.up >= 0 && c.up <= c.evalN)) { upOk = false; badRanges.push(`${c.name} up/evalN=${c.up}/${c.evalN}`); }
    if (c.leader && Math.abs(c.leader.pct) > 20.05) { rangeOk = false; badRanges.push(`${c.name} leader pct=${c.leader.pct}`); }
    // leader 涨幅应 ≥ 该节点平均涨幅（否则"领涨"定义矛盾）
    if (c.leader && c.leader.pct < c.avgPct - 1e-9) { leaderMaxOk = false; badRanges.push(`${c.name} leader ${c.leader.pct} < avgPct ${c.avgPct}`); }
  }
}
record('A7a', '值域：|avgPct|、|leader.pct| ≤ 20.05（±20% 涨跌停 + 舍入）', rangeOk, badRanges.join('; '));
record('A7b', '0 ≤ up ≤ evalN', upOk);
record('A7c', 'leader.pct ≥ avgPct（领涨定义自洽）', leaderMaxOk, badRanges.join('; '));

/* 概念代码全局唯一性（一股一概念 ⇒ 概念间成分不相交，代码不应跨大类复用） */
const codeMap = {};
let dupCodes = [];
for (const cat of data.categories) for (const c of cat.concepts) {
  if (codeMap[c.code] && codeMap[c.code] !== cat.name) dupCodes.push(`${c.code}(${codeMap[c.code]} / ${cat.name})`);
  codeMap[c.code] = cat.name;
}
record('A8', '子概念 code 全局唯一（概念体系无跨大类复用）', dupCodes.length === 0, dupCodes.join('; '));

/* 汇总 */
results.perCat = perCat;
results.summary = {
  totalChecks: results.checks.length,
  passed: results.checks.filter(c => c.ok).length,
  maxAvgDeviation: +maxAvgDev.toFixed(4),
  maxAvgDeviationAt: maxAvgDevAt,
  totalStocksInCategories: totalN,
  issues: results.issues.length
};
fs.writeFileSync(path.join(__dirname, 'audit-results.json'), JSON.stringify(results, null, 2));
console.log(`\n审计汇总：${results.summary.passed}/${results.summary.totalChecks} 项通过；` +
  `加权还原最大偏差 ${results.summary.maxAvgDeviation}（@${maxAvgDevAt}）`);
console.log('详细结果已写入 audit/audit-results.json');
process.exit(results.checks.some(c => !c.ok) ? 1 : 0);
