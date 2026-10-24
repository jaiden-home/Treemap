// Color-vision-deficiency simulation (Machado, Oliveira & Fernandes 2009,
// severity 1.0, applied in linear-light RGB) and the CIE76 color difference
// used by the accessibility tests to verify that scale endpoints remain
// distinguishable for deuteranopia and protanopia observers.

import { srgbToLinear, linearToSrgb, rgbToLab } from './convert.js';

const CVD = {
  deuteranopia: [
    [0.367322, 0.860646, -0.227968],
    [0.280085, 0.672501, 0.047413],
    [-0.01182, 0.04294, 0.968881],
  ],
  protanopia: [
    [0.152286, 1.052583, -0.204868],
    [0.114503, 0.786281, 0.099216],
    [-0.003882, -0.048116, 1.051998],
  ],
};

/** Simulate how `type` CVD observers perceive an sRGB color. */
export function cvdSimulate(r, g, b, type) {
  const m = CVD[type];
  if (!m) throw new Error('unknown CVD type: ' + type);
  const lr = srgbToLinear(r),
    lg = srgbToLinear(g),
    lb = srgbToLinear(b);
  return [
    linearToSrgb(m[0][0] * lr + m[0][1] * lg + m[0][2] * lb),
    linearToSrgb(m[1][0] * lr + m[1][1] * lg + m[1][2] * lb),
    linearToSrgb(m[2][0] * lr + m[2][1] * lg + m[2][2] * lb),
  ];
}

/** CIE76 color difference in Lab space. */
export function deltaE76(lab1, lab2) {
  const dL = lab1.L - lab2.L,
    da = lab1.a - lab2.a,
    db = lab1.b - lab2.b;
  return Math.sqrt(dL * dL + da * da + db * db);
}

export { rgbToLab };
