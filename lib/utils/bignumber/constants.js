"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
var e_exportedObj = memoize(function (BigNumber) {
  return new BigNumber(1).exp();
}, hasher);

var phi_exportedObj = memoize(function (BigNumber) {
  return new BigNumber(1).plus(new BigNumber(5).sqrt()).div(2);
}, hasher);

var pi_exportedObj = memoize(function (BigNumber) {
  return pi = BigNumber.acos(-1);
}, hasher);

var tau_exportedObj = memoize(function (BigNumber) {
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
function hasher(args) {
  return args[0].precision;
}
exports.e = e_exportedObj;
exports.phi = phi_exportedObj;
exports.pi = pi_exportedObj;
exports.tau = tau_exportedObj;
