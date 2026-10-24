// Build configuration: one ESM entry, three distribution formats.
//   dist/treemap-heatmap.cjs     CommonJS (module.exports = Treemap)
//   dist/treemap-heatmap.mjs     ES module bundle
//   dist/treemap-heatmap.js      UMD dev build, global `Treemap`
//   dist/treemap-heatmap.min.js  UMD minified (unpkg/jsdelivr entry)

import { readFileSync } from 'node:fs';
import terser from '@rollup/plugin-terser';

const pkg = JSON.parse(readFileSync('./package.json', 'utf8'));
const banner = `// ${pkg.name} v${pkg.version} — ${pkg.license} License — ${pkg.homepage}`;

export default {
  input: 'src/index.js',
  output: [
    { file: 'dist/treemap-heatmap.cjs', format: 'cjs', exports: 'default', banner },
    { file: 'dist/treemap-heatmap.mjs', format: 'esm', banner },
    { file: 'dist/treemap-heatmap.js', format: 'umd', name: 'Treemap', exports: 'default', banner },
    {
      file: 'dist/treemap-heatmap.min.js',
      format: 'umd',
      name: 'Treemap',
      exports: 'default',
      banner,
      plugins: [terser({ format: { comments: /^!/ } })],
    },
  ],
};
