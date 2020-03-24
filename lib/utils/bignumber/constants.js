var memoize = null;

var e_e = memoize(function (BigNumber) {
  return new BigNumber(1).exp();
}, hasher);

var phi_phi = memoize(function (BigNumber) {
  return new BigNumber(1).plus(new BigNumber(5).sqrt()).div(2);
}, hasher);

var pi_pi = memoize(function (BigNumber) {
  return pi = BigNumber.acos(-1);
}, hasher);

var tau_tau = memoize(function (BigNumber) {
  return pi_pi(BigNumber).times(2);
}, hasher);

/**
 * Create a hash for a BigNumber constructor function. The created has is
 * the configured precision
 * @param {Array} args         Supposed to contain a single entry with
 *                             a BigNumber constructor
 * @return {number} precision
 * @private
 */
function hasher (args) {
  return args[0].precision;
}
export { e_e as e };
export { phi_phi as phi };
export { pi_pi as pi };
export { tau_tau as tau };
