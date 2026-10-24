// WCAG 2.x relative luminance and contrast ratio, plus the rule the renderer
// uses to pick light-on-dark vs dark-on-light labels.

import { srgbToLinear } from './convert.js';

export function relativeLuminance(r, g, b) {
  return 0.2126 * srgbToLinear(r) + 0.7152 * srgbToLinear(g) + 0.0722 * srgbToLinear(b);
}

export function contrastRatio(l1, l2) {
  const hi = Math.max(l1, l2),
    lo = Math.min(l1, l2);
  return (hi + 0.05) / (lo + 0.05);
}

/** A background is "light" when white text would fail WCAG AA (4.5:1). */
export function isLightBg(rgb) {
  return contrastRatio(relativeLuminance(rgb[0], rgb[1], rgb[2]), 1) < 4.5;
}
