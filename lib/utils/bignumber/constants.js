"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.tau = exports.pi = exports.phi = exports.e = undefined;

var _function = require("../function");

var e_e = (0, _function.memoize)(function (BigNumber) {
  return new BigNumber(1).exp();
}, hasher);

var phi_phi = (0, _function.memoize)(function (BigNumber) {
  return new BigNumber(1).plus(new BigNumber(5).sqrt()).div(2);
}, hasher);

var pi_pi = (0, _function.memoize)(function (BigNumber) {
  return pi = BigNumber.acos(-1);
}, hasher);

var tau_tau = (0, _function.memoize)(function (BigNumber) {
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
function hasher(args) {
  return args[0].precision;
}
exports.e = e_e;
exports.phi = phi_phi;
exports.pi = pi_pi;
exports.tau = tau_tau;
