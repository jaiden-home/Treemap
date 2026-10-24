// Demo fixture integrity: the aggregation audit that used to live in a
// standalone script. Based on the dataset's own semantics ("one stock, one
// concept"), every parent aggregate must be reproducible from its children.

import test from 'node:test';
import assert from 'node:assert/strict';

import { loadDemoData } from './helpers.js';

const data = loadDemoData();

const R2_TOL = 0.01 + 1e-9; // two-decimal rounding tolerance

test('A1-A3: category n / up / evalN equal the sums over its concepts', () => {
  for (const cat of data.categories) {
    const cs = cat.concepts || [];
    const sumN = cs.reduce((s, c) => s + c.n, 0);
    const sumUp = cs.reduce((s, c) => s + c.up, 0);
    const sumEval = cs.reduce((s, c) => s + c.evalN, 0);
    assert.equal(cat.n, sumN, `${cat.name}: n ${cat.n} != sum ${sumN}`);
    assert.equal(cat.up, sumUp, `${cat.name}: up ${cat.up} != sum ${sumUp}`);
    assert.equal(cat.evalN, sumEval, `${cat.name}: evalN ${cat.evalN} != sum ${sumEval}`);
  }
});

test('A4: category avgPct matches the n-weighted mean of its concepts', () => {
  let maxDev = 0,
    at = '';
  for (const cat of data.categories) {
    const cs = cat.concepts || [];
    const sumN = cs.reduce((s, c) => s + c.n, 0);
    const weighted = cs.reduce((s, c) => s + c.avgPct * c.n, 0) / sumN;
    const dev = Math.abs(weighted - cat.avgPct);
    if (dev > maxDev) {
      maxDev = dev;
      at = cat.name;
    }
  }
  assert.ok(maxDev <= R2_TOL, `max deviation ${maxDev.toFixed(4)} at "${at}"`);
});

test('A5: each category leader is one of its concepts leaders', () => {
  for (const cat of data.categories) {
    const hit = (cat.concepts || []).some(
      (c) => c.leader && cat.leader && c.leader.code === cat.leader.code && c.leader.pct === cat.leader.pct,
    );
    assert.ok(hit, `${cat.name}: leader ${cat.leader && cat.leader.name} not found among concepts`);
  }
});

test('A6: global totals match the declared meta', () => {
  const totalN = data.categories.reduce((s, c) => s + c.n, 0);
  const totalConcepts = data.categories.reduce((s, c) => s + c.concepts.length, 0);
  assert.equal(totalN, data.meta.stocksEvaluated, 'sum of category n vs meta.stocksEvaluated');
  assert.equal(data.categories.length, data.meta.categories, 'category count vs meta');
  assert.equal(totalConcepts, data.meta.concepts, 'concept count vs meta');
});

test('A7: value ranges and leader consistency', () => {
  for (const cat of data.categories) {
    for (const c of [cat, ...cat.concepts]) {
      assert.ok(Math.abs(c.avgPct) <= 20.05, `${c.name}: avgPct ${c.avgPct} beyond limit-up/down`);
      assert.ok(c.up >= 0 && c.up <= c.evalN, `${c.name}: up/evalN ${c.up}/${c.evalN}`);
      if (c.leader) {
        assert.ok(Math.abs(c.leader.pct) <= 20.05, `${c.name}: leader pct ${c.leader.pct}`);
        assert.ok(
          c.leader.pct >= c.avgPct - 1e-9,
          `${c.name}: leader ${c.leader.pct} < avgPct ${c.avgPct} contradicts "leader"`,
        );
      }
    }
  }
});

test('A8: concept codes are globally unique', () => {
  const seen = {};
  for (const cat of data.categories) {
    for (const c of cat.concepts) {
      assert.ok(!seen[c.code], `duplicate code ${c.code} (${seen[c.code]} / ${cat.name})`);
      seen[c.code] = cat.name;
    }
  }
});

test('derived period views satisfy the same aggregation invariants', () => {
  const periods = data.periods || {};
  for (const key of ['week', 'month', 'year']) {
    const set = periods[key];
    if (!set) continue;
    for (const cat of set.categories) {
      const cs = cat.concepts || [];
      assert.equal(
        cat.n,
        cs.reduce((s, c) => s + c.n, 0),
        `${key}/${cat.name}: n mismatch`,
      );
      assert.equal(
        cat.up,
        cs.reduce((s, c) => s + c.up, 0),
        `${key}/${cat.name}: up mismatch`,
      );
    }
  }
});
