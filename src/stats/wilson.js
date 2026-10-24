// Wilson score interval (Wilson 1927): a confidence interval for a binomial
// proportion that stays sane for small samples, unlike the normal
// approximation. Used for "how many of n went up" style rates.

/**
 * @param {number} up    count of successes (0..n)
 * @param {number} n     total count (> 0)
 * @param {number} [z]   z-score, defaults to 1.959964 (95%)
 * @returns {{lo:number, hi:number, center:number}|null} null when n <= 0
 */
export function wilson(up, n, z) {
  if (!n || n <= 0) return null;
  if (z == null) z = 1.959964;
  const p = up / n,
    z2 = z * z,
    den = 1 + z2 / n;
  const center = (p + z2 / (2 * n)) / den;
  const half = (z * Math.sqrt((p * (1 - p)) / n + z2 / (4 * n * n))) / den;
  return {
    lo: Math.max(0, center - half),
    hi: Math.min(1, center + half),
    center,
  };
}
