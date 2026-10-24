// Wilson score interval: textbook values, the defining formula, boundaries.

import test from 'node:test';
import assert from 'node:assert/strict';

import { wilson } from '../src/stats/wilson.js';

test('wilson(50, 100) matches the textbook 95% interval', () => {
  const w = wilson(50, 100);
  assert.ok(Math.abs(w.lo - 0.4038) < 0.001, `lo ${w.lo}`);
  assert.ok(Math.abs(w.hi - 0.5962) < 0.001, `hi ${w.hi}`);
});

test('interval stays inside [0, 1] at the extremes', () => {
  const w0 = wilson(0, 16),
    w1 = wilson(16, 16);
  assert.equal(w0.lo, 0);
  assert.ok(w0.hi > 0 && w0.hi < 0.25, `all-down interval ${JSON.stringify(w0)}`);
  assert.equal(w1.hi, 1);
  assert.ok(w1.lo > 0.75, `all-up interval ${JSON.stringify(w1)}`);
});

test('matches the Newcombe defining formula and shrinks toward 0.5', () => {
  const up = 13,
    n = 16,
    z = 1.959964,
    p = up / n,
    z2 = z * z;
  const center = (p + z2 / (2 * n)) / (1 + z2 / n);
  const half = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / (1 + z2 / n);
  const w = wilson(up, n);
  assert.ok(Math.abs(w.center - center) < 1e-12, 'center vs defining formula');
  assert.ok(Math.abs(w.lo - (center - half)) < 1e-12, 'lo vs defining formula');
  assert.ok(Math.abs(w.hi - (center + half)) < 1e-12, 'hi vs defining formula');
  // Small-sample shrinkage: center sits between the point estimate and 0.5.
  assert.ok(
    (w.center - 0.5) * (p - 0.5) > 0 && Math.abs(w.center - 0.5) < Math.abs(p - 0.5),
    `shrinkage direction: center=${w.center} p=${p}`,
  );
});

test('intervals narrow as n grows at a fixed rate', () => {
  const a = wilson(8, 10),
    b = wilson(80, 100);
  assert.ok(a.hi - a.lo > b.hi - b.lo, 'interval did not narrow with n');
});

test('returns null for non-positive n', () => {
  assert.equal(wilson(3, 0), null);
});
