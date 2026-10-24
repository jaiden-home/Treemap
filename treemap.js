/*!
 * treemap.js v2.0.0 — 专业级零依赖矩形树图（热力图）引擎
 *
 * 设计原则（详见 report.md）：
 *  - 面积表达"涨势强弱"：涨股比 up/n × 1000 + 1，上涨占比越高格子越大（无数据回退 1）；
 *  - 颜色为 CIE LCh（HCL）感知均匀 diverging 色阶，由平均涨幅驱动：
 *    锚点 = 0%（中性灰），红涨绿跌，±10% 封顶（≥+10% 最红，≤-10% 最绿）；
 *    两端点明度不同（红 L*=47 / 绿 L*=36），为色觉障碍者保留亮度冗余编码；
 *    全色阶对白字满足 WCAG AA（对比度 ≥ 4.5:1）；
 *  - 布局：squarify（与 d3.treemapSquarify.ratio(1) 数值等价，容差 <0.5px）
 *    + resquarify（数据更新时复用行划分，保持格子位置稳定）；
 *  - 涨股比附 Wilson 95% 置信区间，避免小样本比率被过度解读。
 *
 * 用法（像 D3 一样）：
 *   var chart = Treemap('#chart')
 *     .data(heatmapData)            // { categories: [{ name, n, up, evalN, avgPct, leader, concepts: [...] }] }
 *     .area(function (d) { return d.n ? d.up / d.n * 1000 + 1 : 1; }) // 面积编码（默认涨股比 up/n × 1000 + 1）
 *     .color(function (d) { return Math.max(0, Math.min(1, ((d.avgPct || 0) + 10) / 20)); }) // 颜色编码（默认平均涨幅 ±10% 封顶）
 *     .layout('resquarify')         // 'resquarify'（默认）| 'squarify'
 *     .tooltip(fn | false)          // 默认 Tooltip 含 Wilson CI；false 关闭
 *     .zoomable(true)
 *     .on('zoom', fn).on('back', fn).on('hover', fn)
 *     .render();
 *   chart.zoom(i); chart.back(); chart.zoomed(); chart.destroy();
 *
 * 零依赖；也支持 CommonJS：var Treemap = require('./treemap.js');
 * 测试/验证工具见 Treemap.utils（布局、色彩数学、Wilson、对比度、色盲模拟、IoU）。
 */
(function (root, factory) {
  if (typeof module === 'object' && typeof module.exports === 'object') {
    module.exports = factory();
  } else {
    root.Treemap = factory();
  }
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  var VERSION = '2.0.0';
  var STYLE_ID = 'treemap-heatmap-style';

  /* ================================================================
   * 色彩科学：sRGB <-> CIE Lab <-> LCh（D65），感知均匀 diverging 色阶
   * ================================================================ */
  var Xn = 0.95047, Yn = 1.0, Zn = 1.08883; // D65

  function srgbToLinear(c) {
    c /= 255;
    return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
  }
  function linearToSrgb(c) {
    c = Math.max(0, Math.min(1, c));
    return 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
  }
  function labF(t) { return t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116; }
  function labFInv(t) { return t > 6 / 29 ? t * t * t : (27 / 24389) * (116 * t - 16) / 3; }

  function rgbToLab(r, g, b) {
    var lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
    var x = (0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb) / Xn;
    var y = (0.2126729 * lr + 0.7151522 * lg + 0.0721750 * lb) / Yn;
    var z = (0.0193339 * lr + 0.1191920 * lg + 0.9503041 * lb) / Zn;
    var fx = labF(x), fy = labF(y), fz = labF(z);
    return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
  }

  function labToRgb(L, a, bb) {
    var fy = (L + 16) / 116, fx = fy + a / 500, fz = fy - bb / 200;
    var x = Xn * labFInv(fx), y = Yn * labFInv(fy), z = Zn * labFInv(fz);
    var lr = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
    var lg = -0.9692660 * x + 1.8760108 * y + 0.0415560 * z;
    var lb = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
    return [linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb)];
  }

  function lchToLab(L, C, H) {
    var hr = H * Math.PI / 180;
    return { L: L, a: C * Math.cos(hr), b: C * Math.sin(hr) };
  }

  function inGamut(rgb) {
    return rgb.every(function (c) { return c >= -0.001 && c <= 255.001; });
  }

  /** LCh -> sRGB，越界时沿固定 L/H 二分收缩色度至色域内（专业色阶必备）。 */
  function lchToRgbClamped(L, C, H) {
    var lab = lchToLab(L, C, H);
    var rgb = labToRgb(lab.L, lab.a, lab.b);
    if (inGamut(rgb)) return rgb.map(Math.round);
    var lo = 0, hi = C;
    for (var i = 0; i < 18; i++) {
      var mid = (lo + hi) / 2;
      lab = lchToLab(L, mid, H);
      rgb = labToRgb(lab.L, lab.a, lab.b);
      if (inGamut(rgb)) lo = mid; else hi = mid;
    }
    lab = lchToLab(L, lo, H);
    rgb = labToRgb(lab.L, lab.a, lab.b);
    return rgb.map(function (c) { return Math.max(0, Math.min(255, Math.round(c))); });
  }

  /**
   * diverging 色阶：锚点 0.5（#ACACAC 中性灰），右支红（涨），左支绿（跌）。
   * 在 LCh 空间沿固定色相线性插值 L/C —— Lab 线性即感知均匀。
   * 注：mid 提亮后白字对比度 ≈ 2:1，低于 WCAG AA（端点红绿仍满足）。
   */
  var SCALE = {
    mid:   { L: 70.3, C: 0 },        // #ACACAC
    red:   { L: 47, C: 78.5, H: 25.3 },  // #DC143C
    green: { L: 36.2, C: 60.3, H: 136 }  // #006400
  };

  function scaleRgb(ratio) {
    ratio = Math.max(0, Math.min(1, ratio));
    var t = Math.abs(ratio - 0.5) / 0.5;
    var end = ratio >= 0.5 ? SCALE.red : SCALE.green;
    var L = SCALE.mid.L + (end.L - SCALE.mid.L) * t;
    var C = SCALE.mid.C + (end.C - SCALE.mid.C) * t;
    return lchToRgbClamped(L, C, end.H);
  }
  function colorFor(ratio) {
    var c = scaleRgb(ratio);
    return 'rgb(' + c[0] + ',' + c[1] + ',' + c[2] + ')';
  }

  /* ---------------- WCAG 相对亮度 / 对比度 ---------------- */
  function relativeLuminance(r, g, b) {
    return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
  }
  function contrastRatio(l1, l2) {
    var hi = Math.max(l1, l2), lo = Math.min(l1, l2);
    return (hi + 0.05) / (lo + 0.05);
  }

  /** 浅底判断：白字对比度 < 4.5:1（WCAG AA）时改用深色文字 */
  function isLightBg(rgb) {
    return contrastRatio(relativeLuminance(rgb[0], rgb[1], rgb[2]), 1) < 4.5;
  }

  /* ---------------- 标题栏配色：跟随模块内最红/最绿子格子 + 同色系字色 ---------------- */
  var FRAME_FLAT = { bg: [125, 125, 125], fg: [200, 200, 200] }; // 0%：#7D7D7D 底 + #C8C8C8 字

  /**
   * 与背景同色系的字色：色相/色度取色系端点（饱和红/绿），沿明度双向扫描。
   * 优先 WCAG AA 正文级 4.5:1（暗方向需 L*≥28 保色相）；
   * 不可达时退 AA 大字级 3:1，取实际色度更高（色相更明显）的方向：深红/深绿 或 亮绿。
   */
  function sameHueFg(bg, pct) {
    var end = pct >= 0 ? SCALE.red : SCALE.green;
    var bgL = relativeLuminance(bg[0], bg[1], bg[2]);
    var bgLabL = rgbToLab(bg[0], bg[1], bg[2]).L;

    function scan(dir) { // dir=+1 向亮，-1 向暗
      var first3 = null, first45 = null, L45 = 0;
      for (var d = 1; d <= 100; d++) {
        var L = bgLabL + dir * d;
        if (L < 0) L = 0;
        if (L > 100) L = 100;
        var c = lchToRgbClamped(L, end.C, end.H);
        var r = contrastRatio(relativeLuminance(c[0], c[1], c[2]), bgL);
        if (!first3 && r >= 3) first3 = c;
        if (!first45 && r >= 4.5) { first45 = c; L45 = L; break; }
        if (L === 0 || L === 100) break;
      }
      return { first3: first3, first45: first45, L45: L45 };
    }
    function chroma(list) { // 取实际 Lab 色度最高的候选（色相最明显）
      var best = list[0], bestC = -1;
      list.forEach(function (c) {
        var lab = rgbToLab(c[0], c[1], c[2]);
        var C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
        if (C > bestC) { bestC = C; best = c; }
      });
      return best;
    }

    var upR = scan(1), dnR = scan(-1);
    var cand45 = [];
    if (upR.first45) cand45.push(upR.first45);
    if (dnR.first45 && dnR.L45 >= 28) cand45.push(dnR.first45);
    if (cand45.length) return chroma(cand45); // AA 正文级
    var cand3 = [];
    if (upR.first3) cand3.push(upR.first3);
    if (dnR.first3) cand3.push(dnR.first3);
    if (cand3.length) return chroma(cand3);   // AA 大字级，保色相
    return contrastRatio(1, bgL) >= 4.5 ? [255, 255, 255] : [0, 0, 0];
  }

  /**
   * 标题栏配色：extremePct = 该大类下最红（涨时）或最绿（跌时）子概念的 avgPct，
   * 背景与其格子颜色一致；0 为 #7D7D7D 底 + #C8C8C8 字特例。
   */
  function frameColors(extremePct) {
    var pct = extremePct || 0;
    if (pct === 0) return { bg: FRAME_FLAT.bg.slice(), fg: FRAME_FLAT.fg.slice(), dark: false };
    var bg = scaleRgb(Math.max(0, Math.min(1, (pct + 10) / 20)));
    return { bg: bg, fg: sameHueFg(bg, pct), dark: isLightBg(bg) };
  }

  /* ---------------- 色觉障碍模拟（Machado et al. 2009, severity=1.0, 线性 RGB 域） ---------------- */
  var CVD = {
    deuteranopia: [
      [0.367322, 0.860646, -0.227968],
      [0.280085, 0.672501, 0.047413],
      [-0.011820, 0.042940, 0.968881]
    ],
    protanopia: [
      [0.152286, 1.052583, -0.204868],
      [0.114503, 0.786281, 0.099216],
      [-0.003882, -0.048116, 1.051998]
    ]
  };
  function cvdSimulate(r, g, b, type) {
    var m = CVD[type];
    if (!m) throw new Error('unknown CVD type: ' + type);
    var lr = srgbToLinear(r), lg = srgbToLinear(g), lb = srgbToLinear(b);
    return [
      linearToSrgb(m[0][0] * lr + m[0][1] * lg + m[0][2] * lb),
      linearToSrgb(m[1][0] * lr + m[1][1] * lg + m[1][2] * lb),
      linearToSrgb(m[2][0] * lr + m[2][1] * lg + m[2][2] * lb)
    ];
  }
  function deltaE76(lab1, lab2) {
    var dL = lab1.L - lab2.L, da = lab1.a - lab2.a, db = lab1.b - lab2.b;
    return Math.sqrt(dL * dL + da * da + db * db);
  }

  /* ================================================================
   * 统计：Wilson 区间（小样本涨股比的置信区间）
   * ================================================================ */
  function wilson(up, n, z) {
    if (!n || n <= 0) return null;
    if (z == null) z = 1.959964;
    var p = up / n, z2 = z * z, den = 1 + z2 / n;
    var center = (p + z2 / (2 * n)) / den;
    var half = z * Math.sqrt(p * (1 - p) / n + z2 / (4 * n * n)) / den;
    return {
      lo: Math.max(0, center - half),
      hi: Math.min(1, center + half),
      center: center
    };
  }

  /* ================================================================
   * 布局：squarify（与 d3.treemapSquarify.ratio(1) 数值等价）+ resquarify
   * items: [{ key, value>0 }]；返回 { rects: {key:{x,y,w,h}}, rows, order }
   * ================================================================ */
  function squarifyLayout(items, x0, y0, x1, y1) {
    var n = items.length;
    var rects = {}, rows = [];
    if (n === 0 || !(x1 > x0) || !(y1 > y0)) return { rects: rects, rows: rows, order: [] };

    var order = items.map(function (_, i) { return i; })
      .sort(function (a, b) { return items[b].value - items[a].value || a - b; });
    var total = 0;
    items.forEach(function (it) { total += it.value; });

    var i0 = 0, i1 = 0, value = total;
    while (i0 < n) {
      var dx = x1 - x0, dy = y1 - y0;
      var sumValue;
      do { sumValue = items[order[i1++]].value; } while (!sumValue && i1 < n);
      var minValue = sumValue, maxValue = sumValue;
      var alpha = Math.max(dy / dx, dx / dy) / value; // ratio = 1
      var beta = sumValue * sumValue * alpha;
      var minRatio = Math.max(maxValue / beta, beta / minValue);
      for (; i1 < n; ++i1) {
        var nodeValue = items[order[i1]].value;
        sumValue += nodeValue;
        if (nodeValue < minValue) minValue = nodeValue;
        if (nodeValue > maxValue) maxValue = nodeValue;
        beta = sumValue * sumValue * alpha;
        var newRatio = Math.max(maxValue / beta, beta / minValue);
        if (newRatio > minRatio) { sumValue -= nodeValue; break; }
        minRatio = newRatio;
      }
      var dice = dx < dy;
      var rowIdx = order.slice(i0, i1);
      rows.push({ keys: rowIdx.map(function (i) { return items[i].key; }), dice: dice });
      placeRow(rects, items, rowIdx, sumValue, dice, x0, y0, x1, y1, value);
      if (dice) y0 = value ? y0 + dy * sumValue / value : y1;
      else x0 = value ? x0 + dx * sumValue / value : x1;
      value -= sumValue;
      i0 = i1;
    }
    return { rects: rects, rows: rows, order: order.map(function (i) { return items[i].key; }) };
  }

  function placeRow(rects, items, rowIdx, sumValue, dice, x0, y0, x1, y1, remainingValue) {
    var i, it;
    if (dice) {
      var yEnd = remainingValue ? y0 + (y1 - y0) * sumValue / remainingValue : y1;
      var k = sumValue ? (x1 - x0) / sumValue : 0;
      var xx = x0;
      for (i = 0; i < rowIdx.length; i++) {
        it = items[rowIdx[i]];
        var w = it.value * k;
        rects[it.key] = { x: xx, y: y0, w: w, h: yEnd - y0 };
        xx += w;
      }
    } else {
      var xEnd = remainingValue ? x0 + (x1 - x0) * sumValue / remainingValue : x1;
      var k2 = sumValue ? (y1 - y0) / sumValue : 0;
      var yy = y0;
      for (i = 0; i < rowIdx.length; i++) {
        it = items[rowIdx[i]];
        var h = it.value * k2;
        rects[it.key] = { x: x0, y: yy, w: xEnd - x0, h: h };
        yy += h;
      }
    }
  }

  function keySetMatch(rows, items) {
    var seen = {};
    var count = 0;
    for (var r = 0; r < rows.length; r++) {
      for (var k = 0; k < rows[r].keys.length; k++) {
        if (seen[rows[r].keys[k]]) return false;
        seen[rows[r].keys[k]] = true;
        count++;
      }
    }
    if (count !== items.length) return false;
    for (var i = 0; i < items.length; i++) if (!seen[items[i].key]) return false;
    return true;
  }

  /** resquarify：键集合不变时复用上次行划分与行方向（D3 语义），否则退回 squarify。 */
  function resquarifyLayout(items, x0, y0, x1, y1, state) {
    if (!state || !state.rows || !keySetMatch(state.rows, items)) {
      var fresh = squarifyLayout(items, x0, y0, x1, y1);
      return { rects: fresh.rects, rows: fresh.rows, order: fresh.order, fresh: true };
    }
    var byKey = {};
    items.forEach(function (it) { byKey[it.key] = it; });
    var total = 0;
    items.forEach(function (it) { total += it.value; });

    var rects = {}, value = total;
    var cx0 = x0, cy0 = y0;
    for (var r = 0; r < state.rows.length; r++) {
      var row = state.rows[r];
      var rowIdx = row.keys.map(function (k) { return items.indexOf(byKey[k]); });
      var sumValue = 0;
      rowIdx.forEach(function (i) { sumValue += items[i].value; });
      placeRow(rects, items, rowIdx, sumValue, row.dice, cx0, cy0, x1, y1, value);
      var dx = x1 - cx0, dy = y1 - cy0;
      if (row.dice) cy0 = value ? cy0 + dy * sumValue / value : y1;
      else cx0 = value ? cx0 + dx * sumValue / value : x1;
      value -= sumValue;
    }
    return { rects: rects, rows: state.rows, order: null, fresh: false };
  }

  /* ---------------- 布局质量指标 ---------------- */
  function worstAspectRatio(rects) {
    var worst = 0;
    Object.keys(rects).forEach(function (k) {
      var r = rects[k];
      if (r.w <= 0 || r.h <= 0) return;
      var ratio = Math.max(r.w / r.h, r.h / r.w);
      if (ratio > worst) worst = ratio;
    });
    return worst;
  }

  function rectIoU(a, b) {
    var ix0 = Math.max(a.x, b.x), iy0 = Math.max(a.y, b.y);
    var ix1 = Math.min(a.x + a.w, b.x + b.w), iy1 = Math.min(a.y + a.h, b.y + b.h);
    var inter = Math.max(0, ix1 - ix0) * Math.max(0, iy1 - iy0);
    var uni = a.w * a.h + b.w * b.h - inter;
    return uni > 0 ? inter / uni : 1;
  }
  function meanIoU(rectsA, rectsB) {
    var keys = Object.keys(rectsA), sum = 0, cnt = 0;
    keys.forEach(function (k) {
      if (rectsB[k]) { sum += rectIoU(rectsA[k], rectsB[k]); cnt++; }
    });
    return cnt ? sum / cnt : 0;
  }

  /* ================================================================
   * 默认 Tooltip（含 Wilson 95% CI）
   * ================================================================ */
  function fmtPct(v) { return (v >= 0 ? '+' : '') + Number(v).toFixed(2) + '%'; }

  function defaultTooltip(cp, cat) {
    var html = '<div class="tm-tt">' + cp.name +
      '<span class="tm-tc">' + (cat && cat.name ? cat.name : '') + '</span></div>';
    if (typeof cp.avgPct === 'number') {
      html += '<div class="tm-tr"><span>平均涨幅</span><b class="' +
        (cp.avgPct >= 0 ? 'tm-up' : 'tm-down') + '">' + fmtPct(cp.avgPct) + '</b></div>';
    }
    if (cp.evalN) {
      var ci = wilson(cp.up, cp.evalN);
      html += '<div class="tm-tr"><span>涨股比</span><b>' + cp.up + '/' + cp.evalN +
        '（' + (cp.up / cp.evalN * 100).toFixed(0) + '%）</b></div>' +
        '<div class="tm-tr"><span>95% CI</span><b>' +
        (ci.lo * 100).toFixed(0) + '% – ' + (ci.hi * 100).toFixed(0) + '%</b></div>';
    }
    if (cp.n != null) html += '<div class="tm-tr"><span>成分股数</span><b>' + cp.n + '</b></div>';
    if (cp.leader) {
      html += '<div class="tm-tr"><span>领涨股</span><b>' + cp.leader.name + ' ' +
        fmtPct(cp.leader.pct) + '</b></div>';
    }
    return html;
  }

  /* ================================================================
   * 内置样式
   * ================================================================ */
  var CSS = [
    '.tm-root{position:relative;width:100%;height:100%;overflow:hidden;user-select:none}',
    '.tm-cell{position:absolute;cursor:pointer;overflow:hidden;animation:tmIn .4s ease both;transition:transform .16s ease,box-shadow .16s ease,filter .16s ease}',
    '.tm-cell:hover{filter:brightness(1.1);z-index:6;transform:translateY(-3px) scale(1.02);box-shadow:0 10px 26px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.22)}',
    '@keyframes tmIn{from{opacity:0}to{opacity:1}}',
    '.tm-lbl{position:absolute;inset:0;padding:4px 6px;pointer-events:none;text-shadow:0 1px 3px rgba(0,0,0,.65)}',
    '.tm-nm{font-size:11px;font-weight:600;color:rgba(255,255,255,.95);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.35}',
    '.tm-pv{font-size:10px;color:rgba(255,255,255,.88);font-variant-numeric:tabular-nums;line-height:1.35}',
    '.tm-ex{font-size:10px;color:rgba(255,255,255,.75);margin-top:5px;line-height:1.5}',
    '.tm-cell.tm-dk .tm-lbl{text-shadow:0 1px 3px rgba(255,255,255,.5)}',
    '.tm-cell.tm-dk .tm-nm{color:rgba(16,20,26,.92)}',
    '.tm-cell.tm-dk .tm-pv{color:rgba(16,20,26,.85)}',
    '.tm-cell.tm-dk .tm-ex{color:rgba(16,20,26,.78)}',
    '.tm-cell.tm-xs .tm-lbl{padding:0 2px}',
    '.tm-cell.tm-xs .tm-nm{font-size:9px;line-height:1.3}',
    '.tm-cell.tm-z{border-radius:3px}',
    '.tm-cell.tm-z .tm-nm{font-size:14px}',
    '.tm-cell.tm-z .tm-pv{font-size:12px}',
    '.tm-cell.tm-z .tm-ex{font-size:11px}',
    '.tm-frame{position:absolute;border-radius:3px;pointer-events:none;z-index:4;overflow:hidden}',
    '.tm-frame-label{position:absolute;top:0;left:0;right:0;display:flex;gap:6px;align-items:center;padding:0 6px;pointer-events:auto;cursor:pointer;overflow:hidden;border-bottom:1px solid rgba(255,255,255,.08)}',
    '.tm-frame-label:hover b{text-decoration:underline}',
    '.tm-frame-label b{font-size:11px;font-weight:700;letter-spacing:.5px;color:inherit;text-shadow:0 1px 2px rgba(0,0,0,.6);white-space:nowrap}',
    '.tm-frame-label span{font-size:9px;font-variant-numeric:tabular-nums;text-shadow:0 1px 3px rgba(0,0,0,.8);white-space:nowrap}',
    '.tm-frame-label.tm-fl-c span{display:none}',
    '.tm-frame-label.tm-fl-xs span{display:none}',
    '.tm-frame-label.tm-fl-xs b{font-size:9px;letter-spacing:.2px}',
    '.tm-frame-label.tm-dk b{text-shadow:0 1px 2px rgba(255,255,255,.55)}',
    '.tm-frame-label.tm-dk span{text-shadow:0 1px 2px rgba(255,255,255,.55)}',
    '.tm-tip{position:fixed;z-index:1000;pointer-events:none;background:rgba(15,18,26,.97);border:1px solid rgba(255,255,255,.14);border-radius:8px;padding:10px 12px;font-size:12px;line-height:1.6;box-shadow:0 8px 30px rgba(0,0,0,.55);max-width:300px;color:#e8eaed;font-family:-apple-system,BlinkMacSystemFont,"PingFang SC","Hiragino Sans GB","Microsoft YaHei","Segoe UI",sans-serif}',
    '.tm-tip .tm-tt{font-weight:700;font-size:13px;margin-bottom:6px;display:flex;align-items:baseline;gap:8px}',
    '.tm-tip .tm-tc{font-size:10px;color:#9aa0aa;font-weight:400}',
    '.tm-tip .tm-tr{display:flex;justify-content:space-between;gap:18px;color:#9aa0aa}',
    '.tm-tip .tm-tr b{color:#e8eaed;font-weight:600;font-variant-numeric:tabular-nums}',
    '.tm-up{color:#ff6b6b !important}',
    '.tm-down{color:#4ade80 !important}'
  ].join('\n');

  function injectStyle() {
    if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
    var s = document.createElement('style');
    s.id = STYLE_ID;
    s.textContent = CSS;
    document.head.appendChild(s);
  }

  function setBox(el, x, y, w, h) {
    el.style.left = x.toFixed(1) + 'px';
    el.style.top = y.toFixed(1) + 'px';
    el.style.width = Math.max(0, w).toFixed(1) + 'px';
    el.style.height = Math.max(0, h).toFixed(1) + 'px';
  }
  function debounce(fn, ms) {
    var t = null;
    return function () { clearTimeout(t); t = setTimeout(fn, ms); };
  }

  /* ================================================================
   * 默认配置
   * ================================================================ */
  var DEFAULTS = {
    area: function (d) { return d.n ? (d.up || 0) / d.n * 1000 + 1 : 1; }, // 面积 = 涨股比 up/n × 1000 + 1（无数据回退 1）
    floor: 0.5,           // 面积权重下限
    padding: 0,
    labelHeight: 15,
    zoomable: true,
    layout: 'resquarify', // 'resquarify' | 'squarify'
    color: function (d) { return Math.max(0, Math.min(1, ((d.avgPct || 0) + 10) / 20)); }, // 颜色 = 平均涨幅，[-10%,+10%] → [0,1]，0 为灰
    conceptSort: function (a, b) { return (b.avgPct || 0) - (a.avgPct || 0); },
    categorySort: function (a, b) { return (b.avgPct || 0) - (a.avgPct || 0); },
    tooltip: defaultTooltip
  };

  /* ================================================================
   * 插件主体
   * ================================================================ */
  function Treemap(container, options) {
    if (!(this instanceof Treemap)) return new Treemap(container, options);
    if (typeof document === 'undefined') throw new Error('Treemap requires a DOM environment');
    var el = typeof container === 'string' ? document.querySelector(container) : container;
    if (!el) throw new Error('Treemap: container not found: ' + container);

    this._container = el;
    this._opt = Object.assign({}, DEFAULTS, options || {});
    this._data = this._opt.data || null;
    this._zoom = null;
    this._listeners = { zoom: [], back: [], hover: [] };
    this._layoutStates = {}; // resquarify 行划分缓存（按层级 id）

    injectStyle();

    this._root = document.createElement('div');
    this._root.className = 'tm-root';
    this._container.appendChild(this._root);

    this._tip = document.createElement('div');
    this._tip.className = 'tm-tip';
    this._tip.style.display = 'none';
    document.body.appendChild(this._tip);

    var self = this;
    this._onHover = function (e) { self._handleHover(e); };
    this._onLeave = function () { self._tip.style.display = 'none'; };
    this._onClick = function (e) { self._handleClick(e); };
    this._root.addEventListener('mousemove', this._onHover);
    this._root.addEventListener('mouseover', this._onHover);
    this._root.addEventListener('mouseleave', this._onLeave);
    this._root.addEventListener('click', this._onClick);

    this._onResize = debounce(function () { self.render(); }, 120);
    window.addEventListener('resize', this._onResize);
  }

  /* ---- D3 风格链式 API ---- */
  Treemap.prototype.data = function (_) {
    if (!arguments.length) return this._data;
    this._data = _;
    return this;
  };
  Treemap.prototype.area = function (_) {
    if (!arguments.length) return this._opt.area;
    this._opt.area = _;
    return this;
  };
  Treemap.prototype.color = function (_) {
    if (!arguments.length) return this._opt.color;
    this._opt.color = _;
    return this;
  };
  Treemap.prototype.layout = function (_) {
    if (!arguments.length) return this._opt.layout;
    this._opt.layout = _;
    return this;
  };
  Treemap.prototype.tooltip = function (_) {
    if (!arguments.length) return this._opt.tooltip;
    this._opt.tooltip = _;
    return this;
  };
  Treemap.prototype.zoomable = function (_) {
    if (!arguments.length) return this._opt.zoomable;
    this._opt.zoomable = _;
    return this;
  };
  Treemap.prototype.on = function (name, fn) {
    if (this._listeners[name] && typeof fn === 'function') this._listeners[name].push(fn);
    return this;
  };
  Treemap.prototype.zoomed = function () {
    return this._zoom === null ? null : this._data.categories[this._zoom];
  };

  Treemap.prototype._emit = function (name, args) {
    var ls = this._listeners[name] || [];
    for (var i = 0; i < ls.length; i++) ls[i].apply(null, args);
  };

  /* ---- 面积权重 ---- */
  Treemap.prototype._weight = function (d) {
    var a = this._opt.area, v;
    if (typeof a === 'function') v = +a(d);
    else if (a === 'absPct') v = Math.abs(d.avgPct || 0);
    else v = d.n || 0; // 'n'
    if (!(v > 0)) v = 0;
    return Math.max(v, this._opt.floor);
  };

  Treemap.prototype._layoutLevel = function (levelId, items, x0, y0, x1, y1) {
    if (this._opt.layout === 'squarify') return squarifyLayout(items, x0, y0, x1, y1);
    var res = resquarifyLayout(items, x0, y0, x1, y1, this._layoutStates[levelId]);
    this._layoutStates[levelId] = { rows: res.rows };
    return res;
  };

  /* ---- 渲染 ---- */
  Treemap.prototype.render = function () {
    if (!this._root) return this;
    this._root.innerHTML = '';
    if (!this._data || !this._data.categories) return this;
    var W = this._root.clientWidth, H = this._root.clientHeight;
    if (W < 20 || H < 20) return this;
    if (this._zoom === null) this._renderAll(W, H);
    else this._renderZoom(W, H);
    return this;
  };

  Treemap.prototype._concepts = function (cat) {
    var arr = (cat.concepts || []).slice();
    if (typeof this._opt.conceptSort === 'function') arr.sort(this._opt.conceptSort);
    return arr;
  };

  /** 大类预排：与子概念管线一致，categorySort 默认按 avgPct 降序 */
  Treemap.prototype._categories = function () {
    var arr = (this._data.categories || []).slice();
    if (typeof this._opt.categorySort === 'function') arr.sort(this._opt.categorySort);
    return arr;
  };

  Treemap.prototype._renderAll = function (W, H) {
    var self = this, opt = this._opt, allCats = this._data.categories;
    var cats = self._categories(); // 预排后的渲染顺序，与子概念管线一致
    var items = cats.map(function (c, i) { return { key: c.name || ('cat' + i), value: self._weight(c) }; });
    var laid = this._layoutLevel('root', items, 0, 0, W, H);
    var cellFrag = document.createDocumentFragment();
    var frameFrag = document.createDocumentFragment();
    var delay = 0;

    cats.forEach(function (cat, si) {
      var ci = allCats.indexOf(cat); // 原始索引，供 zoom / dataset 使用
      var r = laid.rects[items[si].key];
      if (!r || r.w < 6 || r.h < 6) return;

      /* g：模块间隙 inset（相邻模块间距 = 2g） */
      var g = 2;
      var frame = document.createElement('div');
      frame.className = 'tm-frame';
      setBox(frame, r.x + g, r.y + g, r.w - g * 2, r.h - g * 2);

      /* 框架底色随大类颜色（低透明 tint），使整组 visually 聚合为一个模块 */
      var fRatio;
      try { fRatio = Math.max(0, Math.min(1, +opt.color(cat))); } catch (e) { fRatio = 0.5; }
      var fc = scaleRgb(fRatio);
      var rgba = 'rgba(' + fc[0] + ',' + fc[1] + ',' + fc[2] + ',';
      frame.style.background = rgba + '.15)';

      /* 标题恒定显示：窄框依次降级为「仅名称」「仅名称 + 小字号」 */
      var lb = document.createElement('div');
      lb.className = 'tm-frame-label' + (r.w < 56 || r.h < 26 ? ' tm-fl-xs' : r.w < 100 ? ' tm-fl-c' : '');
      lb.dataset.c = ci;
      lb.title = '点击放大「' + cat.name + '」';
      lb.style.height = opt.labelHeight + 'px';

      /* 标题栏配色：背景 = 模块内最红（大类涨时）或最绿（大类跌时）子格子的颜色；
         0% 为深灰特例；字色与背景同色系并保证对比度 */
      var catPct = typeof cat.avgPct === 'number' ? cat.avgPct : 0;
      var exPct = 0;
      (cat.concepts || []).forEach(function (c) {
        if (typeof c.avgPct !== 'number') return;
        if (catPct > 0) { if (c.avgPct > exPct) exPct = c.avgPct; }
        else if (catPct < 0) { if (c.avgPct < exPct) exPct = c.avgPct; }
      });
      var fcol = frameColors(exPct);
      lb.style.background = 'rgb(' + fcol.bg.join(',') + ')';
      lb.style.color = 'rgb(' + fcol.fg.join(',') + ')';
      if (fcol.dark) lb.className += ' tm-dk';
      lb.innerHTML = '<b>' + cat.name + '</b>' +
        (typeof cat.avgPct === 'number'
          ? '<span>' + fmtPct(cat.avgPct) + '</span>'
          : '');
      frame.appendChild(lb);
      frameFrag.appendChild(frame);

      var off = opt.labelHeight + 1; // 标题栏与小模块之间留 1px 间隙
      var ix = r.x + g + opt.padding, iy = r.y + g + opt.padding + off;
      var iw = r.w - (g + opt.padding) * 2, ih = r.h - (g + opt.padding) * 2 - off;
      if (iw < 4 || ih < 4) return;

      var concepts = self._concepts(cat);
      var citems = concepts.map(function (c, j) { return { key: c.code || c.name || ('c' + j), value: self._weight(c) }; });
      var claid = self._layoutLevel('cat:' + (cat.name || ci), citems, ix, iy, ix + iw, iy + ih);

      concepts.forEach(function (cp, j) {
        var cr = claid.rects[citems[j].key];
        if (!cr || cr.w < 2.5 || cr.h < 2.5) return;
        var realIdx = (cat.concepts || []).indexOf(cp);
        cellFrag.appendChild(self._makeCell(cp, ci, realIdx, cr, false, delay++));
      });
    });

    this._root.appendChild(cellFrag);
    this._root.appendChild(frameFrag);
  };

  Treemap.prototype._renderZoom = function (W, H) {
    var self = this;
    var cat = this._data.categories[this._zoom];
    var pad = 6;
    var g = 2; // 单元格间隙 inset，与一级模块一致（相邻间距 = 2g）
    var concepts = this._concepts(cat);
    var items = concepts.map(function (c, j) { return { key: c.code || c.name || ('c' + j), value: self._weight(c) }; });
    var laid = this._layoutLevel('zoom:' + this._zoom, items, pad, pad, W - pad, H - pad);
    var frag = document.createDocumentFragment();
    concepts.forEach(function (cp, j) {
      var r = laid.rects[items[j].key];
      if (!r || r.w < g * 2 + 3 || r.h < g * 2 + 3) return;
      var realIdx = (cat.concepts || []).indexOf(cp);
      frag.appendChild(self._makeCell(cp, self._zoom, realIdx,
        { x: r.x + g, y: r.y + g, w: r.w - g * 2, h: r.h - g * 2 }, true, j));
    });
    this._root.appendChild(frag);
  };

  Treemap.prototype._makeCell = function (cp, ci, idx, r, zoomed, delay) {
    var el = document.createElement('div');
    el.className = 'tm-cell' + (zoomed ? ' tm-z' : '');
    el.dataset.c = ci;
    el.dataset.i = idx;
    setBox(el, r.x, r.y, r.w, r.h);

    var ratio;
    try { ratio = Math.max(0, Math.min(1, +this._opt.color(cp))); } catch (e) { ratio = 0.5; }
    var bg = scaleRgb(ratio);
    el.style.background = 'rgb(' + bg[0] + ',' + bg[1] + ',' + bg[2] + ')';
    if (isLightBg(bg)) el.className += ' tm-dk'; // 浅底格子改用深色文字
    el.style.animationDelay = Math.min(delay * 3, 320) + 'ms';

    var html = '', t = 0;
    if (zoomed) {
      if (r.w >= 170 && r.h >= 92) t = 3;
      else if (r.w >= 96 && r.h >= 52) t = 2;
      else if (r.w >= 52 && r.h >= 26) t = 1;
    } else {
      if (r.w >= 66 && r.h >= 44) t = 2;
      else if (r.w >= 12 && r.h >= 12) t = 1; // 尽量显示：放不下就省略号截断，避免空白格子
      if (t === 1 && r.w < 62) el.classList.add('tm-xs');
    }
    if (t >= 1) html += '<div class="tm-nm">' + cp.name + '</div>';
    if (t >= 2 && typeof cp.avgPct === 'number') html += '<div class="tm-pv">' + fmtPct(cp.avgPct) + '</div>';
    if (t >= 3) {
      var ciInfo = cp.evalN ? wilson(cp.up, cp.evalN) : null;
      html += '<div class="tm-ex">' +
        (cp.evalN ? '涨股比 ' + cp.up + '/' + cp.evalN +
          (ciInfo ? '（CI ' + (ciInfo.lo * 100).toFixed(0) + '–' + (ciInfo.hi * 100).toFixed(0) + '%）' : '') + '<br>' : '') +
        (cp.leader ? '领涨 ' + cp.leader.name + ' ' + fmtPct(cp.leader.pct) : '') +
        '</div>';
    }
    if (html) {
      var lbl = document.createElement('div');
      lbl.className = 'tm-lbl';
      lbl.innerHTML = html;
      el.appendChild(lbl);
    }
    return el;
  };

  /* ---- 交互 ---- */
  Treemap.prototype._handleHover = function (e) {
    if (!this._data || !e.target.closest) return;
    var cell = e.target.closest('.tm-cell');
    if (!cell) { this._tip.style.display = 'none'; return; }
    var cat = this._data.categories[+cell.dataset.c];
    var cp = cat.concepts[+cell.dataset.i];
    this._emit('hover', [cp, cat]);

    var fn = this._opt.tooltip;
    if (fn === false || fn == null) { this._tip.style.display = 'none'; return; }
    var html = (typeof fn === 'function' ? fn(cp, cat) : defaultTooltip(cp, cat)) || '';
    if (!html) { this._tip.style.display = 'none'; return; }
    this._tip.innerHTML = html;
    this._tip.style.display = 'block';

    var tw = this._tip.offsetWidth, th = this._tip.offsetHeight;
    var x = e.clientX + 14, y = e.clientY + 14;
    if (x + tw > window.innerWidth - 8) x = e.clientX - tw - 14;
    if (y + th > window.innerHeight - 8) y = e.clientY - th - 14;
    this._tip.style.left = x + 'px';
    this._tip.style.top = y + 'px';
  };

  Treemap.prototype._handleClick = function (e) {
    if (!this._opt.zoomable || this._zoom !== null || !e.target.closest) return;
    var cell = e.target.closest('.tm-cell');
    var lb = cell ? null : e.target.closest('.tm-frame-label');
    if (!cell && !lb) return;
    this.zoom(+(cell ? cell.dataset.c : lb.dataset.c));
  };

  Treemap.prototype.zoom = function (i) {
    if (!this._data || i == null || i === this._zoom) return this;
    if (i < 0 || i >= this._data.categories.length) return this;
    this._zoom = i;
    this._tip.style.display = 'none';
    this.render();
    this._emit('zoom', [this._data.categories[i], i]);
    return this;
  };

  Treemap.prototype.back = function () {
    if (this._zoom === null) return this;
    this._zoom = null;
    this.render();
    this._emit('back', []);
    return this;
  };

  Treemap.prototype.destroy = function () {
    if (!this._root) return;
    window.removeEventListener('resize', this._onResize);
    this._root.removeEventListener('mousemove', this._onHover);
    this._root.removeEventListener('mouseover', this._onHover);
    this._root.removeEventListener('mouseleave', this._onLeave);
    this._root.removeEventListener('click', this._onClick);
    this._root.remove();
    this._tip.remove();
    this._root = this._tip = null;
  };

  /* ---- 暴露给测试/验证的工具 ---- */
  Treemap.version = VERSION;
  Treemap.utils = {
    squarifyLayout: squarifyLayout,
    resquarifyLayout: resquarifyLayout,
    worstAspectRatio: worstAspectRatio,
    meanIoU: meanIoU,
    rectIoU: rectIoU,
    wilson: wilson,
    colorFor: colorFor,
    scaleRgb: scaleRgb,
    frameColors: frameColors,
    SCALE: SCALE,
    rgbToLab: rgbToLab,
    labToRgb: labToRgb,
    lchToRgbClamped: lchToRgbClamped,
    relativeLuminance: relativeLuminance,
    contrastRatio: contrastRatio,
    cvdSimulate: cvdSimulate,
    deltaE76: deltaE76
  };
  return Treemap;
});
