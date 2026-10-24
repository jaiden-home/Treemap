// Color-space conversions: sRGB <-> CIELAB <-> CIELCh (D65 reference white).
// Linear-light Lab interpolation is what makes the scale perceptually uniform;
// lchToRgbClamped bisects chroma back into sRGB gamut so every interpolated
// stop remains displayable.

const Xn = 0.95047,
  Yn = 1,
  Zn = 1.08883; // D65

export function srgbToLinear(c) {
  c /= 255;
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

export function linearToSrgb(c) {
  c = Math.max(0, Math.min(1, c));
  return 255 * (c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055);
}

function labF(t) {
  return t > 216 / 24389 ? Math.cbrt(t) : ((24389 / 27) * t + 16) / 116;
}

function labFInv(t) {
  return t > 6 / 29 ? t * t * t : ((27 / 24389) * (116 * t - 16)) / 3;
}

export function rgbToLab(r, g, b) {
  const lr = srgbToLinear(r),
    lg = srgbToLinear(g),
    lb = srgbToLinear(b);
  const x = (0.4124564 * lr + 0.3575761 * lg + 0.1804375 * lb) / Xn;
  const y = (0.2126729 * lr + 0.7151522 * lg + 0.072175 * lb) / Yn;
  const z = (0.0193339 * lr + 0.119192 * lg + 0.9503041 * lb) / Zn;
  const fx = labF(x),
    fy = labF(y),
    fz = labF(z);
  return { L: 116 * fy - 16, a: 500 * (fx - fy), b: 200 * (fy - fz) };
}

export function labToRgb(L, a, bb) {
  const fy = (L + 16) / 116,
    fx = fy + a / 500,
    fz = fy - bb / 200;
  const x = Xn * labFInv(fx),
    y = Yn * labFInv(fy),
    z = Zn * labFInv(fz);
  const lr = 3.2404542 * x - 1.5371385 * y - 0.4985314 * z;
  const lg = -0.969266 * x + 1.8760108 * y + 0.041556 * z;
  const lb = 0.0556434 * x - 0.2040259 * y + 1.0572252 * z;
  return [linearToSrgb(lr), linearToSrgb(lg), linearToSrgb(lb)];
}

export function lchToLab(L, C, H) {
  const hr = (H * Math.PI) / 180;
  return { L, a: C * Math.cos(hr), b: C * Math.sin(hr) };
}

function inGamut(rgb) {
  return rgb.every((c) => c >= -0.001 && c <= 255.001);
}

/** LCh -> sRGB; when out of gamut, shrink chroma by bisection at fixed L/H. */
export function lchToRgbClamped(L, C, H) {
  let lab = lchToLab(L, C, H);
  let rgb = labToRgb(lab.L, lab.a, lab.b);
  if (inGamut(rgb)) return rgb.map(Math.round);
  let lo = 0,
    hi = C;
  for (let i = 0; i < 18; i++) {
    const mid = (lo + hi) / 2;
    lab = lchToLab(L, mid, H);
    rgb = labToRgb(lab.L, lab.a, lab.b);
    if (inGamut(rgb)) lo = mid;
    else hi = mid;
  }
  lab = lchToLab(L, lo, H);
  rgb = labToRgb(lab.L, lab.a, lab.b);
  return rgb.map((c) => Math.max(0, Math.min(255, Math.round(c))));
}
