# treemap-heatmap

[![CI](https://github.com/jaiden-home/treemap-heatmap/actions/workflows/ci.yml/badge.svg)](https://github.com/jaiden-home/treemap-heatmap/actions/workflows/ci.yml)
[![npm version](https://img.shields.io/npm/v/treemap-heatmap.svg)](https://www.npmjs.com/package/treemap-heatmap)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)

A zero-dependency, domain-agnostic **grouped treemap engine** for the browser.

It combines three things that are usually separate concerns in charting code:

- **Layout** — squarified treemaps ([Bruls et al. 2000](https://www.win.tue.nl/~vanwijk/stm.pdf)) that are _numerically equivalent_ to `d3.treemapSquarify.ratio(1)`, plus **resquarify** so cells stay put when data updates.
- **Color** — a perceptually uniform diverging scale built in **CIE LCh** space, with gamut clamping, WCAG AA adaptive labels, and verified readability under color-vision deficiency.
- **Interaction** — hover tooltips, click-to-zoom drill-down, keyboard-friendly events, ResizeObserver-driven re-render, full teardown.

The engine makes no assumptions about your data. Which field drives area, which
drives color, what labels read, and how things sort are all supplied through
accessors — the same design philosophy as D3.

```js
import Treemap from 'treemap-heatmap';

Treemap('#chart', {
  data: dataset,
  area: (d) => d.marketCap, // what cell size encodes
  color: (d) => (d.change + 10) / 20, // what cell color encodes, [0, 1]
  label: (d) => d.name,
}).render();
```

A complete, self-contained demo (stock-market heatmap, tooltips with Wilson
confidence intervals, period switching) lives in [`demo/`](demo/) — it even
works when opened directly via `file://`.

## Highlights

|               |                                                                                                                    |
| ------------- | ------------------------------------------------------------------------------------------------------------------ |
| Dependencies  | **0** (runtime)                                                                                                    |
| Layout        | squarify + resquarify, byte-for-byte validated against d3-hierarchy (max deviation ~1e-13 px across 55 scenarios)  |
| Color science | sRGB ↔ CIELAB ↔ CIELCh, chroma-bisecting gamut clamp                                                               |
| Accessibility | WCAG AA (≥ 4.5:1) text across the entire scale; deuteranopia/protanopia checked via Machado et al. 2009 simulation |
| Statistics    | Wilson score interval exposed as `Treemap.wilson`                                                                  |
| Build         | ESM / CJS / UMD (+ minified), TypeScript definitions shipped                                                       |
| Tests         | `node --test`, zero test-framework dependencies; d3-hierarchy used only as a _verification_ devDependency          |

## Install

```bash
npm install treemap-heatmap
```

Or via CDN (UMD, global `Treemap`):

```html
<script src="https://cdn.jsdelivr.net/npm/treemap-heatmap"></script>
```

## Quick start

```js
const data = {
  groups: [
    {
      name: 'Technology',
      children: [
        { name: 'Semiconductors', value: 72, change: 2.47 },
        { name: 'Software', value: 58, change: 3.5 },
      ],
    },
    // ...
  ],
};

const chart = Treemap('#chart', {
  data,
  groups: (d) => d.groups, // top-level array accessor
  items: (g) => g.children, // per-group item accessor
  area: (d) => d.value, // area weight
  color: (d) => Math.min(1, Math.max(0, (d.change + 10) / 20)), // [0,1], 0.5 = neutral
  label: (d) => d.name,
  sublabel: (d) => (d.change >= 0 ? '+' : '') + d.change + '%',
  sortItems: (a, b, group) => b.value - a.value,
})
  .on('zoom', (group) => console.log('zoomed into', group.name))
  .on('back', () => console.log('back to overview'))
  .render();

chart.zoom(0); // drill down programmatically
chart.back();
chart.destroy(); // teardown
```

## API

### `Treemap(container, options)`

`container` is a selector string or an HTMLElement. Returns a chainable chart
instance. Every option also exists as a chainable getter/setter method
(`chart.area(fn)`, `chart.layout('squarify')`, …).

### Options

| Option        | Type                              | Default                                             | Description                                                                                   |
| ------------- | --------------------------------- | --------------------------------------------------- | --------------------------------------------------------------------------------------------- |
| `data`        | `any`                             | `null`                                              | The dataset; structure defined by `groups`/`items`.                                           |
| `groups`      | `fn(d) → array`                   | `d => d.groups ?? d.categories ?? d.children ?? []` | Top-level group accessor.                                                                     |
| `items`       | `fn(group) → array`               | `g => g.items ?? g.concepts ?? g.children ?? []`    | Per-group item accessor.                                                                      |
| `area`        | `fn(d) → number`                  | `d => d.value ?? 1`                                 | Area weight (≥ 0; `floor` applies).                                                           |
| `color`       | `fn(d) → number`                  | `() => 0.5`                                         | Color ratio in [0, 1]; **0.5 is the neutral anchor**, 1 the positive end, 0 the negative end. |
| `label`       | `fn(d) → string`                  | `d => d.name ?? ''`                                 | Primary label (HTML-escaped by the library).                                                  |
| `sublabel`    | `fn(d) → string\|null`            | `() => null`                                        | Secondary label when the cell has room.                                                       |
| `detail`      | `fn(d) → string\|null`            | `() => null`                                        | **Trusted HTML** shown in zoomed cells.                                                       |
| `sortGroups`  | `fn(a, b)\|null`                  | `null`                                              | Group render order; `null` keeps dataset order.                                               |
| `sortItems`   | `fn(a, b, group)\|null`           | `null`                                              | Item order; also drives placement order (areas still encode `area`).                          |
| `layout`      | `'resquarify' \| 'squarify'`      | `'resquarify'`                                      | `resquarify` reuses row partitions across data updates for stable cells.                      |
| `tooltip`     | `fn(item, group) → html \| false` | built-in                                            | `false` disables. Custom tooltips may use `.tm-tt/.tm-tc/.tm-tr/.tm-up/.tm-down` classes.     |
| `zoomable`    | `boolean`                         | `true`                                              | Click-to-zoom drill-down.                                                                     |
| `padding`     | `number`                          | `0`                                                 | Inner padding per group frame (px).                                                           |
| `labelHeight` | `number`                          | `15`                                                | Group label bar height (px).                                                                  |
| `floor`       | `number`                          | `0.5`                                               | Minimum area weight, keeps tiny nodes visible.                                                |

### Methods

`render()`, `zoom(index)`, `back()`, `zoomed()`, `destroy()`, `on(event, fn)`
with events `zoom(group, index)`, `back()`, `hover(item, group)`.

### Statics

- `Treemap.version`
- `Treemap.squarify(items, x0, y0, x1, y1, keepOrder?)` — items are `[{ key, value }]`
- `Treemap.resquarify(items, x0, y0, x1, y1, state?, keepOrder?)` — pass `{ rows }` from a previous result to reuse row partitions
- `Treemap.wilson(up, n, z = 1.959964)` — Wilson score interval

## Design notes

**Why resquarify by default.** Squarify re-sorts by value on every pass, so
cells teleport when data changes. Resquarify (d3 semantics) reuses the
previous row partitions whenever the key set is unchanged. Measured on the
demo dataset with ±10% value perturbation: mean IoU **0.89** (resquarify) vs
**0.47** (squarify) — cells stay put.

**Why the scale is not a simple gradient.** The diverging scale interpolates
lightness and chroma linearly in CIE LCh at fixed hues (red `#DC143C`,
neutral `#ACACAC`, green `#006400`), which is perceptually uniform by
construction. Out-of-gamut stops are pulled back by bisecting chroma. The two
endpoints deliberately differ in lightness (L\* 47 vs 36) so direction
survives color-vision deficiency; the test suite verifies ΔE76 between the
simulated endpoints stays clearly distinguishable.

**Label accessibility.** Every cell picks light-on-dark or dark-on-light text
based on WCAG relative luminance; the switch point has no dead zone, and the
entire 101-sample scale meets AA (≥ 4.5:1) — both properties are regression
tests, not aspirations.

**Escaping.** `label`/`sublabel` text is HTML-escaped by the library. `detail`
and custom tooltip output are inserted as-is by design — they are caller-owned
markup; sanitize any untrusted input before returning it.

## Testing & verification

```bash
npm install
npm test          # layout invariants, color science, Wilson, data integrity, d3 equivalence
npm run build     # dist/ bundles
npm run lint
```

The suite includes: area conservation / no-overlap / in-containment across
five container shapes, aspect-ratio regressions, stability (IoU) comparisons,
scale monotonicity in ΔE, the 101-point WCAG sweep, CVD distinguishability,
Wilson interval cross-checks against the defining formula, full-fixture data
aggregation invariants, and per-cell numerical equivalence against
d3-hierarchy (devDependency only — never shipped).

## Demo

```bash
npm install && npm run build   # dist/ is required by the demo
open demo/index.html           # works over file:// too
```

## Browser support

Modern evergreen browsers (Chrome/Edge/Firefox/Safari). No polyfills; falls
back from `ResizeObserver` to `window.resize` automatically.

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md). Released under the [MIT License](LICENSE).
