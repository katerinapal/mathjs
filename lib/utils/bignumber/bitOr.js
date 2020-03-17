"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.bitOrjs = undefined;

var _bitwise = require("./bitwise");

var exportedObject = function bitOr(x, y) {
  if (x.isFinite() && !x.isInteger() || y.isFinite() && !y.isInteger()) {
    throw new Error('Integers expected in function bitOr');
  }

  var BigNumber = x.constructor;
  if (x.isNaN() || y.isNaN()) {
    return new BigNumber(NaN);
  }

  var negOne = new BigNumber(-1);
  if (x.isZero() || y.eq(negOne) || x.eq(y)) {
    return y;
  }
  if (y.isZero() || x.eq(negOne)) {
    return x;
  }

  if (!x.isFinite() || !y.isFinite()) {
    if (!x.isFinite() && !x.isNegative() && y.isNegative() || x.isNegative() && !y.isNegative() && !y.isFinite()) {
      return negOne;
    }
    if (x.isNegative() && y.isNegative()) {
      return x.isFinite() ? x : y;
    }
    return x.isFinite() ? y : x;
  }

  return (0, _bitwise.bitwisejs)(x, y, function (a, b) {
    return a | b;
  });
};

/**
 * Bitwise OR for BigNumbers
 *
 * Special Cases:
 *   N |  n =  N
 *   n |  0 =  n
 *   n | -1 = -1
 *   n |  n =  n
 *   I |  I =  I
 *  -I | -I = -I
 *   I | -n = -1
 *   I | -I = -1
 *   I |  n =  I
 *  -I |  n = -I
 *  -I | -n = -n
 *
 * @param {BigNumber} x
 * @param {BigNumber} y
 * @return {BigNumber} Result of `x` | `y`, fully precise
 */
/**
 * Bitwise OR for BigNumbers
 *
 * Special Cases:
 *   N |  n =  N
 *   n |  0 =  n
 *   n | -1 = -1
 *   n |  n =  n
 *   I |  I =  I
 *  -I | -I = -I
 *   I | -n = -1
 *   I | -I = -1
 *   I |  n =  I
 *  -I |  n = -I
 *  -I | -n = -n
 *
 * @param {BigNumber} x
 * @param {BigNumber} y
 * @return {BigNumber} Result of `x` | `y`, fully precise
 */
exports.bitOrjs = exportedObject;
;
