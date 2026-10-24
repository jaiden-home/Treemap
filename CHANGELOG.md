# Changelog

All notable changes to this project are documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.1] - 2026-10-25

### Fixed

- Group frame label colors now follow the child furthest from the color anchor
  **on the group's own side of the anchor**: an up group highlights its
  strongest gainer, a down group its steepest loser. Previously the label took
  the overall extreme regardless of direction, so a mildly up category could
  show a green label driven by its worst loser. Falls back to the overall
  extreme when no child sits on the group's side.

## [1.0.0] - 2026-10-24

First public release. Pre-1.0 development happened in a private workspace
(single-file `treemap.js` v2.x); 1.0.0 restructures the project to open-source
standards without changing the numerical behavior of the algorithms.

### Added

- Modular ESM source tree (`src/`): layout (squarify, resquarify, metrics),
  color science (convert, scale, contrast, CVD simulation), statistics
  (Wilson interval), and the DOM component.
- Domain-agnostic accessor API: `groups`, `items`, `area`, `color`, `label`,
  `sublabel`, `detail`, `sortGroups`, `sortItems`. All stock-market semantics
  moved out of the engine and into the demo.
- Distribution: ESM / CJS / UMD (+ minified) via Rollup; TypeScript
  definitions (`types/index.d.ts`).
- `Treemap.wilson`, `Treemap.squarify`, `Treemap.resquarify` statics.
- HTML escaping for caller-supplied label/sublabel text (security hardening).
- `ResizeObserver`-driven re-render with `window.resize` fallback.
- Test suite on `node:test`: layout invariants, aspect-ratio and stability
  regressions, color monotonicity, 101-point WCAG AA sweep, CVD checks,
  Wilson cross-validation, fixture data integrity, and per-cell d3-hierarchy
  numerical equivalence.
- Open-source infrastructure: README, CHANGELOG, CONTRIBUTING, SECURITY,
  CODE_OF_CONDUCT, MIT LICENSE, GitHub Actions CI + release workflow, issue/PR
  templates, dependabot, ESLint + Prettier + EditorConfig.

### Changed

- Group/item layout keys are index-based, making duplicate names safe.
- Group frame label colors follow the child furthest from the color anchor
  (previously hard-wired to ±10% average-change semantics).
- Built-in tooltip is generic; rich domain tooltips are demo configuration.

### Removed

- Undocumented `.area('n' | 'absPct')` string modes (pass accessors instead).
- `Treemap.utils` grab-bag (import from `src/` modules or use statics).
- One-off workspace artifacts: internal audit report, duplicated raw data
  snapshot, nested test package.

## [0.x] - 2026

Private development of the single-file engine: squarify/resquarify
implementation, LCh scale, WCAG adaptive labels, Wilson interval tooltips,
zoom drill-down.
