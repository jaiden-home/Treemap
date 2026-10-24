# Contributing to treemap-heatmap

Thanks for your interest in improving treemap-heatmap. This document covers
everything you need to contribute effectively.

## Development setup

```bash
git clone https://github.com/jaiden-home/treemap-heatmap.git
cd treemap-heatmap
npm install
npm test       # runs the full suite (layout, color, stats, data, d3 equivalence)
npm run build  # produces dist/ (the demo needs this)
npm run lint
```

Node.js >= 18 is required for development; the library itself is
browser-only and dependency-free.

## Project layout

```
src/
  index.js           entry: default export + statics
  treemap.js         the DOM component (render, zoom, tooltip, events)
  style.js           injected CSS
  utils.js           escaping / DOM / timing helpers
  version.js
  layout/
    squarify.js      squarified layout + row placement (Bruls et al. 2000)
    resquarify.js    stable-update layout (d3 semantics)
    metrics.js       aspect ratio, IoU
  color/
    convert.js       sRGB <-> CIELAB <-> CIELCh (D65)
    scale.js         diverging scale + frame label colors
    contrast.js      WCAG relative luminance / contrast ratio
    cvd.js           color-vision-deficiency simulation + deltaE76
  stats/
    wilson.js        Wilson score interval
types/index.d.ts     TypeScript definitions
test/                node:test suites (see below)
demo/                self-contained demo (works over file://)
dist/                build output (never committed)
```

## Design principles

1. **The engine is domain-agnostic.** Anything that smells like a specific
   dataset (field names, label text, sort semantics, tooltip copy) belongs in
   an accessor or in the demo, never in `src/treemap.js`.
2. **Numerical behavior is contract.** The squarify/resquarify outputs are
   equivalent to d3-hierarchy to float precision, and the color math is
   regression-tested. Refactors must keep `npm test` green; if you change the
   math intentionally, update the tests and say so in the PR.
3. **Accessibility is not optional.** New colors, labels or interactions must
   keep the WCAG AA and CVD tests passing.
4. **Zero runtime dependencies.** Dev dependencies (rollup, eslint, d3-hierarchy
   for equivalence testing) are fine; nothing ships to users.

## Tests

Tests use the built-in [`node:test`](https://nodejs.org/api/test.html) runner
(no framework dependency):

- `test/layout.test.js` — area conservation, no overlap, containment, aspect
  ratios, resquarify stability (IoU) and fallback behavior
- `test/color.test.js` — perceptual monotonicity, 101-point WCAG AA sweep,
  CVD distinguishability
- `test/stats.test.js` — Wilson interval against the defining formula and
  textbook values
- `test/data.test.js` — demo fixture aggregation invariants (the audit that
  used to be a standalone script)
- `test/d3-equivalence.test.js` — per-cell equivalence with d3-hierarchy
- `test/api.test.js` — public surface sanity (version, statics, DOM guard)

Add a test for every bug fix; add tests alongside every feature. Run
`npm test` before opening a PR.

## Commit messages

This project follows [Conventional Commits](https://www.conventionalcommits.org/):
`feat:`, `fix:`, `docs:`, `refactor:`, `test:`, `chore:`, `perf:`.
CI enforces lint + tests on every PR; releases are cut from `v*` tags.

## Pull requests

1. Fork / branch from `main`.
2. Keep PRs focused; one concern per PR.
3. Ensure `npm run lint && npm test` pass locally.
4. Describe the motivation and the change; link related issues.
5. For public API changes, update `types/index.d.ts`, README and CHANGELOG.

## Reporting bugs / requesting features

Open an issue using the provided templates. For security issues, see
[SECURITY.md](SECURITY.md) — please do not open public issues for
vulnerabilities.
