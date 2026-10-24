// Public entry point. The default export is a callable factory (jQuery/D3
// style: `Treemap('#chart')`, `new` optional); layout and statistics helpers
// are attached as statics so they are reachable from every distribution
// format (ESM default import, CJS require, UMD global).

import Chart from './treemap.js';
import { squarify } from './layout/squarify.js';
import { resquarify } from './layout/resquarify.js';
import { wilson } from './stats/wilson.js';
import { version } from './version.js';

function Treemap(container, options) {
  // Returning an object from a constructor works for both call styles.
  return new Chart(container, options);
}

Treemap.version = version;
Treemap.squarify = squarify;
Treemap.resquarify = resquarify;
Treemap.wilson = wilson;

export default Treemap;
