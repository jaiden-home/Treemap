// Shared helpers for the test suite.

import { readFileSync } from 'node:fs';

/**
 * demo/data.js is a classic browser script that assigns globalThis.HEATMAP_DATA.
 * Evaluate it the same way a browser would and read the global back.
 */
export function loadDemoData() {
  const code = readFileSync(new URL('../demo/data.js', import.meta.url), 'utf8');
  new Function(code)();
  const data = globalThis.HEATMAP_DATA;
  if (!data) throw new Error('demo/data.js did not set HEATMAP_DATA');
  return data;
}

/** Deterministic PRNG (mulberry32), used for synthetic layout scenarios. */
export function mulberry32(a) {
  return function () {
    a |= 0;
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Group-level layout items (area = constituent count, as in the demo). */
export function groupItems(data) {
  return data.categories.map((c, i) => ({
    key: c.name || 'cat' + i,
    value: Math.max(c.n || 0, 0.5),
  }));
}

/** Item-level layout items for one group. */
export function conceptItems(cat) {
  return cat.concepts.map((c, j) => ({
    key: c.code || c.name || 'c' + j,
    value: Math.max(c.n || 0, 0.5),
  }));
}
