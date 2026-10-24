// Flat ESLint config. Lints library source, tests and build config;
// demo/data.js is a verbatim data fixture and is excluded.

import js from '@eslint/js';

const browserGlobals = {
  document: 'readonly',
  window: 'readonly',
  globalThis: 'readonly',
  HTMLElement: 'readonly',
  ResizeObserver: 'readonly',
  HEATMAP_DATA: 'readonly',
  Treemap: 'readonly',
  console: 'readonly',
  setTimeout: 'readonly',
  clearTimeout: 'readonly',
  URL: 'readonly',
  Function: 'readonly',
};

export default [
  { ignores: ['dist/**', 'node_modules/**', 'demo/data.js', '**/*.min.js'] },
  js.configs.recommended,
  {
    files: ['src/**/*.js', 'test/**/*.js', 'rollup.config.js'],
    languageOptions: {
      ecmaVersion: 2023,
      sourceType: 'module',
      globals: { ...browserGlobals },
    },
  },
  {
    files: ['demo/app.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'script',
      globals: { ...browserGlobals },
    },
  },
];
