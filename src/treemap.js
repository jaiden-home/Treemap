// Grouped treemap component: two-level layout (groups -> items) with a
// perceptually uniform diverging color scale, adaptive WCAG AA labels,
// drill-down zoom and hover tooltips. Zero dependencies.
//
// The engine is domain-agnostic: everything data-specific (which field drives
// area/color, label text, sort order, tooltip content) is supplied through
// accessors, in the spirit of d3. See demo/app.js for a full example.

import { squarify } from './layout/squarify.js';
import { resquarify } from './layout/resquarify.js';
import { scaleRgb, frameColors } from './color/scale.js';
import { isLightBg } from './color/contrast.js';
import { injectStyle } from './style.js';
import { escapeHtml, setBox, debounce, clamp01 } from './utils.js';

const DEFAULTS = {
  data: null,
  groups: (d) => d.groups ?? d.categories ?? d.children ?? [],
  items: (g) => g.items ?? g.concepts ?? g.children ?? [],
  area: (d) => (d && d.value != null ? +d.value : 1), // weight >= floor drives cell area
  color: () => 0.5, // ratio in [0,1]; 0.5 = neutral anchor
  label: (d) => (d && d.name != null ? String(d.name) : ''),
  sublabel: () => null, // secondary line when the cell fits it
  detail: () => null, // trusted HTML shown in zoomed cells
  sortGroups: null, // (a, b) => number; null keeps data order
  sortItems: null, // (a, b, group) => number
  layout: 'resquarify', // 'resquarify' | 'squarify'
  tooltip: null, // (item, group) => html | false | null (built-in)
  zoomable: true,
  padding: 0,
  labelHeight: 15,
  floor: 0.5, // minimum area weight
};

export default class Treemap {
  constructor(container, options) {
    if (typeof document === 'undefined') throw new Error('Treemap requires a DOM environment');
    const el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) throw new Error('Treemap: container not found: ' + container);

    this._container = el;
    this._opt = Object.assign({}, DEFAULTS, options || {});
    this._data = this._opt.data || null;
    this._zoom = null;
    this._listeners = { zoom: [], back: [], hover: [] };
    this._layoutStates = {}; // resquarify row partitions, keyed per level

    injectStyle();

    this._root = document.createElement('div');
    this._root.className = 'tm-root';
    this._container.appendChild(this._root);

    this._tip = document.createElement('div');
    this._tip.className = 'tm-tip';
    this._tip.style.display = 'none';
    document.body.appendChild(this._tip);

    this._onHover = (e) => this._handleHover(e);
    this._onLeave = () => {
      this._tip.style.display = 'none';
    };
    this._onClick = (e) => this._handleClick(e);
    this._root.addEventListener('mousemove', this._onHover);
    this._root.addEventListener('mouseover', this._onHover);
    this._root.addEventListener('mouseleave', this._onLeave);
    this._root.addEventListener('click', this._onClick);

    this._onResize = debounce(() => this.render(), 120);
    window.addEventListener('resize', this._onResize);
    this._ro = null;
    this._roReady = false;
    if (typeof ResizeObserver !== 'undefined') {
      this._ro = new ResizeObserver(() => {
        if (!this._roReady) {
          this._roReady = true;
          return;
        } // skip initial fire
        this._onResize();
      });
      this._ro.observe(this._container);
    }
  }

  /* ---- chainable accessors (getter when called without arguments) ---- */
  data(_) {
    if (!arguments.length) return this._data;
    this._data = _;
    return this;
  }
  groups(_) {
    if (!arguments.length) return this._opt.groups;
    this._opt.groups = _;
    return this;
  }
  items(_) {
    if (!arguments.length) return this._opt.items;
    this._opt.items = _;
    return this;
  }
  area(_) {
    if (!arguments.length) return this._opt.area;
    this._opt.area = _;
    return this;
  }
  color(_) {
    if (!arguments.length) return this._opt.color;
    this._opt.color = _;
    return this;
  }
  label(_) {
    if (!arguments.length) return this._opt.label;
    this._opt.label = _;
    return this;
  }
  sublabel(_) {
    if (!arguments.length) return this._opt.sublabel;
    this._opt.sublabel = _;
    return this;
  }
  detail(_) {
    if (!arguments.length) return this._opt.detail;
    this._opt.detail = _;
    return this;
  }
  sortGroups(_) {
    if (!arguments.length) return this._opt.sortGroups;
    this._opt.sortGroups = _;
    return this;
  }
  sortItems(_) {
    if (!arguments.length) return this._opt.sortItems;
    this._opt.sortItems = _;
    return this;
  }
  layout(_) {
    if (!arguments.length) return this._opt.layout;
    this._opt.layout = _;
    return this;
  }
  tooltip(_) {
    if (!arguments.length) return this._opt.tooltip;
    this._opt.tooltip = _;
    return this;
  }
  zoomable(_) {
    if (!arguments.length) return this._opt.zoomable;
    this._opt.zoomable = _;
    return this;
  }

  on(name, fn) {
    if (this._listeners[name] && typeof fn === 'function') this._listeners[name].push(fn);
    return this;
  }

  zoomed() {
    return this._zoom === null ? null : this._groupList()[this._zoom];
  }

  zoom(i) {
    if (!this._data || i == null || i === this._zoom) return this;
    const groups = this._groupList();
    if (i < 0 || i >= groups.length) return this;
    this._zoom = i;
    this._tip.style.display = 'none';
    this.render();
    this._emit('zoom', [groups[i], i]);
    return this;
  }

  back() {
    if (this._zoom === null) return this;
    this._zoom = null;
    this.render();
    this._emit('back', []);
    return this;
  }

  destroy() {
    if (!this._root) return;
    if (this._ro) {
      this._ro.disconnect();
      this._ro = null;
    }
    window.removeEventListener('resize', this._onResize);
    this._root.removeEventListener('mousemove', this._onHover);
    this._root.removeEventListener('mouseover', this._onHover);
    this._root.removeEventListener('mouseleave', this._onLeave);
    this._root.removeEventListener('click', this._onClick);
    this._root.remove();
    this._tip.remove();
    this._root = this._tip = null;
  }

  /* ---- internals ---- */

  _emit(name, args) {
    const ls = this._listeners[name] || [];
    for (const fn of ls) fn.apply(null, args);
  }

  _groupList() {
    try {
      return this._opt.groups(this._data) || [];
    } catch {
      return [];
    }
  }

  _itemList(group) {
    try {
      return this._opt.items(group) || [];
    } catch {
      return [];
    }
  }

  _weight(d) {
    let v;
    try {
      v = +this._opt.area(d);
    } catch {
      v = 0;
    }
    if (!(v > 0)) v = 0;
    return Math.max(v, this._opt.floor);
  }

  _layoutLevel(levelId, items, x0, y0, x1, y1, keepOrder) {
    if (this._opt.layout === 'squarify') return squarify(items, x0, y0, x1, y1, keepOrder);
    const res = resquarify(items, x0, y0, x1, y1, this._layoutStates[levelId], keepOrder);
    this._layoutStates[levelId] = { rows: res.rows };
    return res;
  }

  /** Groups in render order (sorted copy; original indices preserved via indexOf). */
  _sortedGroups() {
    const all = this._groupList();
    const arr = all.slice();
    if (typeof this._opt.sortGroups === 'function') arr.sort(this._opt.sortGroups);
    return arr;
  }

  /** Items in render order; this order also drives keepOrder placement. */
  _sortedItems(group) {
    const all = this._itemList(group);
    const arr = all.slice();
    if (typeof this._opt.sortItems === 'function') {
      arr.sort((a, b) => this._opt.sortItems(a, b, group));
    }
    return arr;
  }

  render() {
    if (!this._root) return this;
    this._root.innerHTML = '';
    if (!this._data || !this._groupList().length) return this;
    const W = this._root.clientWidth,
      H = this._root.clientHeight;
    if (W < 20 || H < 20) return this;
    if (this._zoom === null) this._renderOverview(W, H);
    else this._renderZoom(W, H);
    return this;
  }

  _renderOverview(W, H) {
    const opt = this._opt;
    const allGroups = this._groupList();
    const groups = this._sortedGroups();
    const items = groups.map((g, i) => ({ key: 'g' + i, value: this._weight(g) }));
    const laid = this._layoutLevel('overview', items, 0, 0, W, H);
    const cellFrag = document.createDocumentFragment();
    const frameFrag = document.createDocumentFragment();
    let delay = 0;

    groups.forEach((group, si) => {
      const gi = allGroups.indexOf(group); // original index: used by zoom and lookups
      const r = laid.rects[items[si].key];
      if (!r || r.w < 6 || r.h < 6) return;

      const g = 2; // frame inset: gap between adjacent groups = 2g
      const frame = document.createElement('div');
      frame.className = 'tm-frame';
      setBox(frame, r.x + g, r.y + g, r.w - g * 2, r.h - g * 2);

      // Frame background: a light tint of the group's own scale color.
      const fRatio = clamp01(safe(opt.color, group));
      const fc = scaleRgb(fRatio);
      frame.style.background = `rgba(${fc[0]},${fc[1]},${fc[2]},.15)`;

      // Frame label: always visible, degrading to name-only on narrow frames.
      const lb = document.createElement('div');
      lb.className = 'tm-frame-label' + (r.w < 56 || r.h < 26 ? ' tm-fl-xs' : r.w < 100 ? ' tm-fl-c' : '');
      lb.dataset.c = gi;
      lb.style.height = opt.labelHeight + 'px';

      // Label bar colors follow the most extreme child (largest |ratio - 0.5|).
      const fcol = frameColors(this._extremeRatio(group));
      lb.style.background = `rgb(${fcol.bg.join(',')})`;
      lb.style.color = `rgb(${fcol.fg.join(',')})`;
      if (fcol.dark) lb.className += ' tm-dk';
      lb.innerHTML = `<b>${escapeHtml(safe(opt.label, group))}</b>` + frameSubHtml(opt, group);
      frame.appendChild(lb);
      frameFrag.appendChild(frame);

      const off = opt.labelHeight + 1; // 1px gap between label bar and cells
      const ix = r.x + g + opt.padding,
        iy = r.y + g + opt.padding + off;
      const iw = r.w - (g + opt.padding) * 2,
        ih = r.h - (g + opt.padding) * 2 - off;
      if (iw < 4 || ih < 4) return;

      const itemList = this._sortedItems(group);
      const citems = itemList.map((it, j) => ({ key: 'i' + j, value: this._weight(it) }));
      // keepOrder: cells are placed in sortItems order; size still encodes value.
      const claid = this._layoutLevel('group:' + gi, citems, ix, iy, ix + iw, iy + ih, true);

      itemList.forEach((item, j) => {
        const cr = claid.rects[citems[j].key];
        if (!cr || cr.w < 2.5 || cr.h < 2.5) return;
        const realIdx = this._itemList(group).indexOf(item);
        cellFrag.appendChild(this._makeCell(item, gi, realIdx, cr, false, delay++));
      });
    });

    this._root.appendChild(cellFrag);
    this._root.appendChild(frameFrag);
  }

  _renderZoom(W, H) {
    const pad = 6;
    const g = 2; // cell inset, matching the overview (adjacent gap = 2g)
    const group = this._groupList()[this._zoom];
    const itemList = this._sortedItems(group);
    const items = itemList.map((it, j) => ({ key: 'i' + j, value: this._weight(it) }));
    const laid = this._layoutLevel('zoom:' + this._zoom, items, pad, pad, W - pad, H - pad, true);
    const frag = document.createDocumentFragment();
    itemList.forEach((item, j) => {
      const r = laid.rects[items[j].key];
      if (!r || r.w < g * 2 + 3 || r.h < g * 2 + 3) return;
      const realIdx = this._itemList(group).indexOf(item);
      frag.appendChild(
        this._makeCell(item, this._zoom, realIdx, { x: r.x + g, y: r.y + g, w: r.w - g * 2, h: r.h - g * 2 }, true, j),
      );
    });
    this._root.appendChild(frag);
  }

  /** The child whose color ratio is furthest from the neutral anchor. */
  _extremeRatio(group) {
    const opt = this._opt;
    let best = null,
      bestDist = -1;
    for (const child of this._itemList(group)) {
      const ratio = clamp01(safe(opt.color, child));
      const dist = Math.abs(ratio - 0.5);
      if (dist > bestDist + 1e-12 || (Math.abs(dist - bestDist) <= 1e-12 && ratio > best)) {
        best = ratio;
        bestDist = dist;
      }
    }
    return best;
  }

  _makeCell(item, gi, idx, r, zoomed, delay) {
    const opt = this._opt;
    const el = document.createElement('div');
    el.className = 'tm-cell' + (zoomed ? ' tm-z' : '');
    el.dataset.c = gi;
    el.dataset.i = idx;
    setBox(el, r.x, r.y, r.w, r.h);

    const ratio = clamp01(safe(opt.color, item));
    const bg = scaleRgb(ratio);
    el.style.background = `rgb(${bg[0]},${bg[1]},${bg[2]})`;
    if (isLightBg(bg)) el.className += ' tm-dk'; // light cells switch to dark text
    el.style.animationDelay = Math.min(delay * 3, 320) + 'ms';

    // Label tiers by available size: 1 = name, 2 = + sublabel, 3 = + detail.
    let t = 0;
    if (zoomed) {
      if (r.w >= 170 && r.h >= 92) t = 3;
      else if (r.w >= 96 && r.h >= 52) t = 2;
      else if (r.w >= 52 && r.h >= 26) t = 1;
    } else {
      if (r.w >= 66 && r.h >= 44) t = 2;
      else if (r.w >= 12 && r.h >= 12) t = 1; // truncated rather than blank
      if (t === 1 && r.w < 62) el.classList.add('tm-xs');
    }
    let html = '';
    if (t >= 1) html += `<div class="tm-nm">${escapeHtml(safe(opt.label, item))}</div>`;
    if (t >= 2) {
      const sub = safe(opt.sublabel, item);
      if (sub != null) html += `<div class="tm-pv">${escapeHtml(sub)}</div>`;
    }
    if (t >= 3) {
      const det = safe(opt.detail, item); // trusted HTML by design (caller-supplied)
      if (det != null) html += `<div class="tm-ex">${det}</div>`;
    }
    if (html) {
      const lbl = document.createElement('div');
      lbl.className = 'tm-lbl';
      lbl.innerHTML = html;
      el.appendChild(lbl);
    }
    return el;
  }

  _handleHover(e) {
    if (!this._data || !e.target.closest) return;
    const cell = e.target.closest('.tm-cell');
    if (!cell) {
      this._tip.style.display = 'none';
      return;
    }
    const group = this._groupList()[+cell.dataset.c];
    if (!group) return;
    const item = this._itemList(group)[+cell.dataset.i];
    if (!item) return;
    this._emit('hover', [item, group]);

    const fn = this._opt.tooltip;
    if (fn === false) {
      this._tip.style.display = 'none';
      return;
    }
    const html = typeof fn === 'function' ? fn(item, group) || '' : this._builtinTooltip(item, group);
    if (!html) {
      this._tip.style.display = 'none';
      return;
    }
    this._tip.innerHTML = html;
    this._tip.style.display = 'block';

    const tw = this._tip.offsetWidth,
      th = this._tip.offsetHeight;
    let x = e.clientX + 14,
      y = e.clientY + 14;
    if (x + tw > window.innerWidth - 8) x = e.clientX - tw - 14;
    if (y + th > window.innerHeight - 8) y = e.clientY - th - 14;
    this._tip.style.left = x + 'px';
    this._tip.style.top = y + 'px';
  }

  _builtinTooltip(item, group) {
    const opt = this._opt;
    let html =
      `<div class="tm-tt">${escapeHtml(safe(opt.label, item))}` +
      `<span class="tm-tc">${escapeHtml(safe(opt.label, group))}</span></div>`;
    const sub = safe(opt.sublabel, item);
    if (sub != null) {
      html += `<div class="tm-tr"><span>Value</span><b>${escapeHtml(sub)}</b></div>`;
    }
    return html;
  }

  _handleClick(e) {
    if (!this._opt.zoomable || this._zoom !== null || !e.target.closest) return;
    const cell = e.target.closest('.tm-cell');
    const lb = cell ? null : e.target.closest('.tm-frame-label');
    if (!cell && !lb) return;
    this.zoom(+(cell ? cell.dataset.c : lb.dataset.c));
  }
}

/** Invoke an accessor defensively: throwers degrade to the neutral fallback. */
function safe(fn, d) {
  try {
    const v = fn(d);
    return v == null ? '' : v;
  } catch {
    return '';
  }
}

function frameSubHtml(opt, group) {
  const sub = safe(opt.sublabel, group);
  return sub !== '' ? `<span>${escapeHtml(sub)}</span>` : '';
}
