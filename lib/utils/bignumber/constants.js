import * as function_obj from "../function";
var memoize = function_obj.memoize;

var e_exportedObj = function_obj(function (BigNumber) {
  return new BigNumber(1).exp();
}, hasher);

var phi_exportedObj = function_obj(function (BigNumber) {
  return new BigNumber(1).plus(new BigNumber(5).sqrt()).div(2);
}, hasher);

var pi_exportedObj = function_obj(function (BigNumber) {
  return pi = BigNumber.acos(-1);
}, hasher);

var tau_exportedObj = function_obj(function (BigNumber) {
  return pi_exportedObj(BigNumber).times(2);
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
export { e_exportedObj as e };
export { phi_exportedObj as phi };
export { pi_exportedObj as pi };
export { tau_exportedObj as tau };
