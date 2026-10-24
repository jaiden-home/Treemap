// Public-surface sanity checks that do not require a DOM.

import test from 'node:test';
import assert from 'node:assert/strict';

import Treemap from '../src/index.js';
import { version } from '../src/version.js';

test('version is a semver string', () => {
  assert.match(version, /^\d+\.\d+\.\d+$/);
  assert.equal(Treemap.version, version);
});

test('layout and statistics statics are exposed for every distribution format', () => {
  assert.equal(typeof Treemap.squarify, 'function');
  assert.equal(typeof Treemap.resquarify, 'function');
  assert.equal(typeof Treemap.wilson, 'function');
});

test('statics are functional', () => {
  const { rects } = Treemap.squarify(
    [
      { key: 'a', value: 1 },
      { key: 'b', value: 3 },
    ],
    0,
    0,
    400,
    200,
  );
  assert.deepEqual(Object.keys(rects).sort(), ['a', 'b']);
  const w = Treemap.wilson(50, 100);
  assert.ok(w.lo > 0.4 && w.hi < 0.6);
});

test('constructing without a DOM throws a helpful error', () => {
  assert.throws(() => Treemap('#missing'), /DOM environment/);
});
