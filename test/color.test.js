// Color science regressions.
//
//  T4 monotonicity  perceptual distance (Lab dE) grows monotonically away
//                   from the neutral anchor, in both hue directions
//  T5 WCAG AA       adaptive text contrast >= 4.5:1 across the whole scale
//  T6 CVD           scale endpoints stay distinguishable under
//                   deuteranopia / protanopia simulation (Machado 2009)

import test from 'node:test';
import assert from 'node:assert/strict';

import { scaleRgb } from '../src/color/scale.js';
import { rgbToLab } from '../src/color/convert.js';
import { relativeLuminance, contrastRatio } from '../src/color/contrast.js';
import { cvdSimulate, deltaE76 } from '../src/color/cvd.js';

test('perceptual distance from the anchor is monotonically non-decreasing', () => {
  const mid = rgbToLab(...scaleRgb(0.5));
  let prevR = -1,
    prevG = -1;
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const dR = deltaE76(rgbToLab(...scaleRgb(0.5 + t / 2)), mid);
    const dG = deltaE76(rgbToLab(...scaleRgb(0.5 - t / 2)), mid);
    assert.ok(dR >= prevR - 1e-9, `red branch dE not monotonic at t=${t}: ${dR} < ${prevR}`);
    assert.ok(dG >= prevG - 1e-9, `green branch dE not monotonic at t=${t}: ${dG} < ${prevG}`);
    prevR = dR;
    prevG = dG;
  }
  assert.ok(prevR > 40 && prevG > 40, `endpoint perceptual strength insufficient: ${prevR}/${prevG}`);
});

test('hue direction is correct: red branch r-g grows, green branch g-r grows', () => {
  let prevR = -Infinity,
    prevG = -Infinity;
  for (let i = 0; i <= 50; i++) {
    const t = i / 50;
    const [r1, g1] = scaleRgb(0.5 + t / 2);
    const [r2, g2] = scaleRgb(0.5 - t / 2);
    assert.ok(r1 - g1 >= prevR - 1e-9, 'red branch direction');
    assert.ok(g2 - r2 >= prevG - 1e-9, 'green branch direction');
    prevR = r1 - g1;
    prevG = g2 - r2;
  }
});

test('adaptive text meets WCAG AA (>= 4.5:1) across the entire 101-point scale', () => {
  const DARK_TEXT = [0, 0, 0]; // opaque black used by .tm-cell.tm-dk .tm-nm
  let minC = Infinity,
    minAt = 0,
    darkCount = 0;
  for (let i = 0; i <= 100; i++) {
    const ratio = i / 100;
    const rgb = scaleRgb(ratio);
    const lum = relativeLuminance(...rgb);
    // Same rule as the renderer's isLightBg: dark text when white fails AA.
    const useDark = contrastRatio(1.0, lum) < 4.5;
    if (useDark) darkCount++;
    const c = useDark ? contrastRatio(lum, relativeLuminance(...DARK_TEXT)) : contrastRatio(1.0, lum);
    if (c < minC) {
      minC = c;
      minAt = ratio;
    }
  }
  assert.ok(minC >= 4.5, `min contrast ${minC.toFixed(2)}:1 at ratio=${minAt} < 4.5`);
  assert.ok(darkCount > 0 && darkCount < 101, 'both text modes must be exercised');
});

for (const type of ['deuteranopia', 'protanopia']) {
  test(`${type}: scale endpoints remain distinguishable after simulation`, () => {
    const redSim = cvdSimulate(...scaleRgb(1.0), type);
    const greenSim = cvdSimulate(...scaleRgb(0.0), type);
    const dE = deltaE76(rgbToLab(...redSim), rgbToLab(...greenSim));
    const dL = Math.abs(rgbToLab(...redSim).L - rgbToLab(...greenSim).L);
    assert.ok(dE >= 6, `dE76=${dE.toFixed(1)} too low to distinguish`);
    assert.ok(dL > 0, 'lightness redundancy should be preserved');
  });
}
