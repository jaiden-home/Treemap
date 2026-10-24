// Styles injected once per document. Class names are prefixed `tm-` and are
// part of the public API surface for custom tooltip markup.

const STYLE_ID = 'treemap-heatmap-style';

const CSS = [
  '.tm-root{position:relative;width:100%;height:100%;overflow:hidden;user-select:none}',
  '.tm-cell{position:absolute;cursor:pointer;overflow:hidden;animation:tmIn .4s ease both;transition:transform .16s ease,box-shadow .16s ease,filter .16s ease}',
  '.tm-cell:hover{filter:brightness(1.1);z-index:6;transform:translateY(-3px) scale(1.02);box-shadow:0 10px 26px rgba(0,0,0,.55),0 0 0 1px rgba(255,255,255,.22)}',
  '@keyframes tmIn{from{opacity:0}to{opacity:1}}',
  '.tm-lbl{position:absolute;inset:0;padding:4px 6px;pointer-events:none;text-shadow:0 1px 3px rgba(0,0,0,.65)}',
  '.tm-nm{font-size:11px;font-weight:600;color:rgba(255,255,255,.95);white-space:nowrap;overflow:hidden;text-overflow:ellipsis;line-height:1.35}',
  '.tm-pv{font-size:10px;color:rgba(255,255,255,.88);font-variant-numeric:tabular-nums;line-height:1.35}',
  '.tm-ex{font-size:10px;color:rgba(255,255,255,.75);margin-top:5px;line-height:1.5}',
  '.tm-cell.tm-dk .tm-lbl{text-shadow:0 1px 3px rgba(255,255,255,.5)}',
  '.tm-cell.tm-dk .tm-nm{color:#000}', // opaque black: no WCAG dead zone at the light/dark text switch
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
].join('\n');

export function injectStyle() {
  if (typeof document === 'undefined' || document.getElementById(STYLE_ID)) return;
  const s = document.createElement('style');
  s.id = STYLE_ID;
  s.textContent = CSS;
  document.head.appendChild(s);
}
