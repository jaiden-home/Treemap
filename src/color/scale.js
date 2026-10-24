// Perceptually uniform diverging color scale in CIE LCh space.
//
//   ratio 0.5 -> neutral gray anchor (#ACACAC)
//   ratio 1.0 -> saturated red   (L*=47, C=78.5, h=25.3)
//   ratio 0.0 -> saturated green (L*=36.2, C=60.3, h=136)
//
// L and C are interpolated linearly at a fixed hue, which is linear in Lab and
// therefore perceptually uniform. The endpoints intentionally differ in
// lightness (47 vs 36) so the direction remains readable under color-vision
// deficiency (see cvd.js and the test suite).

import { lchToRgbClamped, rgbToLab } from './convert.js';
import { contrastRatio, relativeLuminance, isLightBg } from './contrast.js';

export const SCALE = {
  mid: { L: 70.3, C: 0 }, // #ACACAC
  red: { L: 47, C: 78.5, H: 25.3 }, // #DC143C
  green: { L: 36.2, C: 60.3, H: 136 }, // #006400
};

/** Map a [0,1] ratio to an sRGB triple on the diverging scale. */
export function scaleRgb(ratio) {
  ratio = Math.max(0, Math.min(1, ratio));
  const t = Math.abs(ratio - 0.5) / 0.5;
  const end = ratio >= 0.5 ? SCALE.red : SCALE.green;
  const L = SCALE.mid.L + (end.L - SCALE.mid.L) * t;
  const C = SCALE.mid.C + (end.C - SCALE.mid.C) * t;
  return lchToRgbClamped(L, C, end.H);
}

export function colorFor(ratio) {
  const c = scaleRgb(ratio);
  return `rgb(${c[0]},${c[1]},${c[2]})`;
}

/* ------------------------------------------------------------------ *
 * Group frame label colors
 * ------------------------------------------------------------------ */

// Flat fallback when the group sits exactly on the neutral anchor.
export const FRAME_FLAT = { bg: [125, 125, 125], fg: [200, 200, 200] }; // #7D7D7D + #C8C8C8

/**
 * Foreground in the same hue family as the background: start from the
 * saturated scale endpoint and scan lightness in both directions until the
 * WCAG AA body-text ratio (4.5:1) is met (dark direction additionally needs
 * L* >= 28 to keep the hue recognizable). Fall back to the AA large-text
 * ratio (3:1), preferring the direction with the higher realized chroma.
 */
function sameHueFg(bg, ratio) {
  const end = ratio >= 0.5 ? SCALE.red : SCALE.green;
  const bgL = relativeLuminance(bg[0], bg[1], bg[2]);
  const bgLabL = rgbToLab(bg[0], bg[1], bg[2]).L;

  const scan = (dir) => {
    let first3 = null,
      first45 = null,
      L45 = 0;
    for (let d = 1; d <= 100; d++) {
      let L = bgLabL + dir * d;
      if (L < 0) L = 0;
      if (L > 100) L = 100;
      const c = lchToRgbClamped(L, end.C, end.H);
      const r = contrastRatio(relativeLuminance(c[0], c[1], c[2]), bgL);
      if (!first3 && r >= 3) first3 = c;
      if (!first45 && r >= 4.5) {
        first45 = c;
        L45 = L;
        break;
      }
      if (L === 0 || L === 100) break;
    }
    return { first3, first45, L45 };
  };
  const chroma = (list) => {
    let best = list[0],
      bestC = -1;
    for (const c of list) {
      const lab = rgbToLab(c[0], c[1], c[2]);
      const C = Math.sqrt(lab.a * lab.a + lab.b * lab.b);
      if (C > bestC) {
        bestC = C;
        best = c;
      }
    }
    return best;
  };

  const upR = scan(1),
    dnR = scan(-1);
  const cand45 = [];
  if (upR.first45) cand45.push(upR.first45);
  if (dnR.first45 && dnR.L45 >= 28) cand45.push(dnR.first45);
  if (cand45.length) return chroma(cand45); // AA body text
  const cand3 = [];
  if (upR.first3) cand3.push(upR.first3);
  if (dnR.first3) cand3.push(dnR.first3);
  if (cand3.length) return chroma(cand3); // AA large text, hue preserved
  return contrastRatio(1, bgL) >= 4.5 ? [255, 255, 255] : [0, 0, 0];
}

/**
 * Colors for a group frame label driven by the group's most extreme child
 * ratio (largest |ratio - 0.5|): background matches that child's cell color,
 * foreground is a same-hue accessible text color. `null` (no measurable
 * children) or an exact anchor value yields the flat gray special case.
 */
export function frameColors(extremeRatio) {
  if (extremeRatio == null || Math.abs(extremeRatio - 0.5) < 1e-9) {
    return { bg: FRAME_FLAT.bg.slice(), fg: FRAME_FLAT.fg.slice(), dark: false };
  }
  const bg = scaleRgb(extremeRatio);
  return { bg, fg: sameHueFg(bg, extremeRatio), dark: isLightBg(bg) };
}
