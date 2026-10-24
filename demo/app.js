// Demo application: wires the generic treemap engine to a stock-market
// heatmap dataset. Everything domain-specific lives here — the engine itself
// (../src/) knows nothing about stocks, percentages or Chinese labels.
(function () {
  'use strict';

  var backBtn = document.getElementById('backBtn');
  var crumbText = document.getElementById('crumbText');
  var metaEl = document.getElementById('meta');

  if (typeof Treemap !== 'function') {
    var hint = document.getElementById('buildHint');
    hint.style.display = 'block';
    hint.innerHTML =
      '未找到 <code>../dist/treemap-heatmap.js</code>。<br>' +
      '请先在项目根目录执行 <code>npm install && npm run build</code> 生成 dist 构建产物，然后刷新本页。';
    return;
  }

  /* Single data source: demo/data.js. periods = { day, week, month, year };
     week/month/year are deterministically derived from the day view. */
  var data = HEATMAP_DATA;
  var m = data.meta;
  var sets = data.periods || { day: data };

  function fmtPct(v) {
    return (v > 0 ? '+' : '') + v.toFixed(2) + '%';
  }
  function pctClass(v) {
    return v > 0 ? 'up' : v < 0 ? 'down' : 'flat';
  }

  /* ---------- domain wiring for the generic engine ---------- */

  // Area encodes breadth of the advance: up/n × 1000 + 1 (floor when no data).
  function area(d) {
    return d.n ? ((d.up || 0) / d.n) * 1000 + 1 : 1;
  }

  // Color encodes average change, clamped to ±10%, 0% maps to the neutral anchor.
  function color(d) {
    return Math.max(0, Math.min(1, ((d.avgPct || 0) + 10) / 20));
  }

  function sublabel(d) {
    return typeof d.avgPct === 'number' ? fmtPct(d.avgPct) : null;
  }

  // Rich zoomed-cell detail (trusted HTML: comes from our own fixture).
  function detail(d) {
    var parts = [];
    if (d.evalN) {
      var ci = Treemap.wilson(d.up, d.evalN);
      parts.push(
        '涨股比 ' +
          d.up +
          '/' +
          d.evalN +
          (ci ? '（CI ' + Math.round(ci.lo * 100) + '–' + Math.round(ci.hi * 100) + '%）' : ''),
      );
    }
    if (d.leader) parts.push('领涨 ' + d.leader.name + ' ' + fmtPct(d.leader.pct));
    return parts.length ? parts.join('<br>') : null;
  }

  // Concepts follow their category: descending when the category is up,
  // ascending when down (both extremes move to the front).
  function sortItems(a, b, group) {
    return (group && group.avgPct < 0 ? -1 : 1) * ((b.avgPct || 0) - (a.avgPct || 0));
  }
  function sortGroups(a, b) {
    return (b.avgPct || 0) - (a.avgPct || 0);
  }

  // Tooltip with a Wilson 95% CI so small-sample up-rates are not over-read.
  function tooltip(cp, cat) {
    var html =
      '<div class="tm-tt">' + cp.name + '<span class="tm-tc">' + (cat && cat.name ? cat.name : '') + '</span></div>';
    if (typeof cp.avgPct === 'number') {
      html +=
        '<div class="tm-tr"><span>平均涨幅</span><b class="' +
        (cp.avgPct >= 0 ? 'tm-up' : 'tm-down') +
        '">' +
        fmtPct(cp.avgPct) +
        '</b></div>';
    }
    if (cp.evalN) {
      var ci = Treemap.wilson(cp.up, cp.evalN);
      html +=
        '<div class="tm-tr"><span>涨股比</span><b>' +
        cp.up +
        '/' +
        cp.evalN +
        '（' +
        Math.round((cp.up / cp.evalN) * 100) +
        '%）</b></div>' +
        '<div class="tm-tr"><span>95% CI</span><b>' +
        Math.round(ci.lo * 100) +
        '% – ' +
        Math.round(ci.hi * 100) +
        '%</b></div>';
    }
    if (cp.n != null) html += '<div class="tm-tr"><span>成分股数</span><b>' + cp.n + '</b></div>';
    if (cp.leader) {
      html += '<div class="tm-tr"><span>领涨股</span><b>' + cp.leader.name + ' ' + fmtPct(cp.leader.pct) + '</b></div>';
    }
    return html;
  }

  /* ---------- page chrome ---------- */

  function renderMeta(set) {
    var mm = set.meta;
    metaEl.innerHTML =
      '<span>' +
      mm.periodName +
      '视图 · ' +
      mm.periodRange +
      '</span>' +
      '<span>截至 ' +
      mm.lastDate +
      '</span>' +
      '<span>' +
      mm.stocksEvaluated +
      ' 只个股</span>' +
      '<span>' +
      mm.categories +
      ' 大类</span>' +
      '<span>' +
      mm.concepts +
      ' 概念</span>' +
      '<span>数据源 demo/data.js（真实收盘快照；周/月/年为演示派生）</span>';
  }

  function chrome(cat) {
    if (!cat) {
      backBtn.hidden = true;
      crumbText.innerHTML =
        '全部 ' + m.categories + ' 个大类 · ' + m.concepts + ' 个子概念（提示：点击单元格放大对应大类，Esc 返回）';
    } else {
      backBtn.hidden = false;
      crumbText.innerHTML =
        '<b>' +
        cat.name +
        '</b>　平均 <span class="' +
        pctClass(cat.avgPct) +
        '">' +
        fmtPct(cat.avgPct) +
        '</span>　涨股比 ' +
        cat.up +
        '/' +
        cat.evalN +
        '　领涨 ' +
        cat.leader.name +
        ' ' +
        fmtPct(cat.leader.pct);
    }
  }

  /* Use the library like D3: configure accessors, listen to events, render. */
  var chart = Treemap('#plot', {
    data: sets.day,
    area: area,
    color: color,
    label: function (d) {
      return d.name;
    },
    sublabel: sublabel,
    detail: detail,
    sortItems: sortItems,
    sortGroups: sortGroups,
    tooltip: tooltip,
  })
    .on('zoom', function (cat) {
      chrome(cat);
    })
    .on('back', function () {
      chrome(null);
    })
    .render();

  backBtn.addEventListener('click', function () {
    chart.back();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') chart.back();
  });

  /* Day / week / month / year switching: same concept tree, different period.
     The key set is unchanged, so resquarify reuses its row partitions and
     cells stay put while values change. */
  var viewBtns = Array.prototype.slice.call(document.querySelectorAll('#views button'));
  function setPeriod(key) {
    var set = sets[key];
    if (!set || set === chart.data()) return;
    viewBtns.forEach(function (b) {
      b.classList.toggle('on', b.dataset.p === key);
    });
    var zoomed = chart.zoomed(); // keep the current drill-down across periods
    chart.data(set).render();
    renderMeta(set);
    chrome(
      zoomed
        ? set.categories.filter(function (c) {
            return c.name === zoomed.name;
          })[0]
        : null,
    );
  }
  viewBtns.forEach(function (b) {
    b.addEventListener('click', function () {
      setPeriod(b.dataset.p);
    });
  });

  renderMeta(sets.day);
  chrome(null);
})();
