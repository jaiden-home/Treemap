/**
 * Type definitions for treemap-heatmap.
 *
 * The library is data-shape agnostic: nodes are plain objects and every
 * data-specific concern is expressed through accessors. `any` on node types
 * is intentional (the engine never assumes domain fields).
 */

/** Axis-aligned rectangle produced by the layout algorithms. */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** Layout input item. */
export interface LayoutItem {
  key: string;
  value: number;
}

/** Layout output: rects keyed by item key plus row partitions (for resquarify). */
export interface LayoutResult {
  rects: Record<string, Rect>;
  rows: Array<{ keys: string[]; dice: boolean }>;
  order: string[] | null;
  fresh?: boolean;
}

/** Wilson score interval for a binomial proportion. */
export interface WilsonInterval {
  lo: number;
  hi: number;
  center: number;
}

/** Constructor options; every key is also a chainable method on the chart. */
export interface TreemapOptions {
  /** Dataset object; structure is defined by the `groups` accessor. */
  data?: any;
  /** Returns the top-level group array of the dataset. Default: `d => d.groups ?? d.categories ?? d.children ?? []`. */
  groups?: (d: any) => any[];
  /** Returns the item array of a group. Default: `g => g.items ?? g.concepts ?? g.children ?? []`. */
  items?: (group: any) => any[];
  /** Area weight accessor (>= 0). Default: `d => d.value ?? 1`. */
  area?: (d: any) => number;
  /** Color ratio accessor in [0, 1]; 0.5 is the neutral anchor. Default: `() => 0.5`. */
  color?: (d: any) => number;
  /** Primary label text (escaped by the library). Default: `d => d.name ?? ''`. */
  label?: (d: any) => string;
  /** Secondary label shown when a cell has room. Default: `() => null`. */
  sublabel?: (d: any) => string | null;
  /** Trusted HTML detail shown in zoomed cells. Default: `() => null`. */
  detail?: (d: any) => string | null;
  /** Comparator for group render order. Default: `null` (dataset order). */
  sortGroups?: ((a: any, b: any) => number) | null;
  /** Comparator for item render/placement order; receives the parent group. Default: `null`. */
  sortItems?: ((a: any, b: any, group: any) => number) | null;
  /** Layout algorithm. Default: `'resquarify'`. */
  layout?: 'squarify' | 'resquarify';
  /** Custom tooltip HTML builder, or `false` to disable. Default: built-in tooltip. */
  tooltip?: ((item: any, group: any) => string) | false | null;
  /** Enable click-to-zoom drill-down. Default: `true`. */
  zoomable?: boolean;
  /** Inner padding of each group frame in px. Default: `0`. */
  padding?: number;
  /** Group frame label bar height in px. Default: `15`. */
  labelHeight?: number;
  /** Minimum area weight (keeps tiny nodes visible). Default: `0.5`. */
  floor?: number;
}

/** Chart instance returned by the `Treemap` factory. All setters chain. */
export interface TreemapChart {
  data(d?: any): any;
  data(): any | undefined;
  groups(fn?: (d: any) => any[]): this;
  items(fn?: (group: any) => any[]): this;
  area(fn?: (d: any) => number): this;
  color(fn?: (d: any) => number): this;
  label(fn?: (d: any) => string): this;
  sublabel(fn?: (d: any) => string | null): this;
  detail(fn?: (d: any) => string | null): this;
  sortGroups(fn?: ((a: any, b: any) => number) | null): this;
  sortItems(fn?: ((a: any, b: any, group: any) => number) | null): this;
  layout(kind?: 'squarify' | 'resquarify'): this;
  tooltip(fn?: ((item: any, group: any) => string) | false | null): this;
  zoomable(enabled?: boolean): this;
  on(event: 'zoom', fn: (group: any, index: number) => void): this;
  on(event: 'back', fn: () => void): this;
  on(event: 'hover', fn: (item: any, group: any) => void): this;
  render(): this;
  /** Zoom into the group at `index`; no-op when out of range. */
  zoom(index: number): this;
  /** Return to the overview. */
  back(): this;
  /** The currently zoomed group node, or `null`. */
  zoomed(): any | null;
  /** Remove DOM nodes and listeners. The instance must not be used afterwards. */
  destroy(): void;
}

declare const Treemap: {
  (container: string | HTMLElement, options?: TreemapOptions): TreemapChart;
  version: string;
  /** Squarified treemap; numerically equivalent to d3.treemapSquarify.ratio(1). */
  squarify(items: LayoutItem[], x0: number, y0: number, x1: number, y1: number, keepOrder?: boolean): LayoutResult;
  /** Resquarified treemap; reuses row partitions from `state` when the key set is unchanged. */
  resquarify(
    items: LayoutItem[],
    x0: number,
    y0: number,
    x1: number,
    y1: number,
    state?: { rows: LayoutResult['rows'] } | null,
    keepOrder?: boolean,
  ): LayoutResult;
  /** Wilson score interval; returns `null` when `n <= 0`. */
  wilson(up: number, n: number, z?: number): WilsonInterval | null;
};

export default Treemap;
