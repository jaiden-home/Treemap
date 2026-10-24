// Small DOM/formatting helpers shared by the renderer.

/** Escape untrusted text before injecting it into label/tooltip HTML. */
export function escapeHtml(s) {
  return String(s).replace(
    /[&<>"']/g,
    (c) =>
      ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;',
      })[c],
  );
}

/** Position and size an element, clamping negative dimensions to 0. */
export function setBox(el, x, y, w, h) {
  el.style.left = x.toFixed(1) + 'px';
  el.style.top = y.toFixed(1) + 'px';
  el.style.width = Math.max(0, w).toFixed(1) + 'px';
  el.style.height = Math.max(0, h).toFixed(1) + 'px';
}

export function debounce(fn, ms) {
  let t = null;
  return function () {
    clearTimeout(t);
    t = setTimeout(fn, ms);
  };
}

export function clamp01(v) {
  v = +v;
  return Number.isFinite(v) ? Math.max(0, Math.min(1, v)) : 0.5;
}
