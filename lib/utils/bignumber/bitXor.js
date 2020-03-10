import { bitwise as bitwise_bitwise } from "./bitwise";
import { bitNot as bitNot_bitNot } from "./bitNot";
var bitwise = bitwise_bitwise;
var bitNot = bitNot_bitNot;

var exportedObject = function bitXor(x, y) {
  if ((x.isFinite() && !x.isInteger()) || (y.isFinite() && !y.isInteger())) {
    throw new Error('Integers expected in function bitXor');
  }

  var BigNumber = x.constructor;
  if (x.isNaN() || y.isNaN()) {
    return new BigNumber(NaN);
  }
  if (x.isZero()) {
    return y;
  }
  if (y.isZero()) {
    return x;
  }

  if (x.eq(y)) {
    return new BigNumber(0);
  }

  var negOne = new BigNumber(-1);
  if (x.eq(negOne)) {
    return bitNot_bitNot(y);
  }
  if (y.eq(negOne)) {
    return bitNot_bitNot(x);
  }

  if (!x.isFinite() || !y.isFinite()) {
    if (!x.isFinite() && !y.isFinite()) {
      return negOne;
    }
    return new BigNumber(x.isNegative() == y.isNegative()
        ?  Infinity
        : -Infinity);
  }
  return bitwise_bitwise(x, y, function (a, b) { return a ^ b });
};

/**
 * Bitwise XOR for BigNumbers
 *
 * Special Cases:
 *   N ^  n =  N
 *   n ^  0 =  n
 *   n ^  n =  0
 *   n ^ -1 = ~n
 *   I ^  n =  I
 *   I ^ -n = -I
 *   I ^ -I = -1
 *  -I ^  n = -I
 *  -I ^ -n =  I
 *
 * @param {BigNumber} x
 * @param {BigNumber} y
 * @return {BigNumber} Result of `x` ^ `y`, fully precise
 *
 */
/**
 * Bitwise XOR for BigNumbers
 *
 * Special Cases:
 *   N ^  n =  N
 *   n ^  0 =  n
 *   n ^  n =  0
 *   n ^ -1 = ~n
 *   I ^  n =  I
 *   I ^ -n = -I
 *   I ^ -I = -1
 *  -I ^  n = -I
 *  -I ^ -n =  I
 *
 * @param {BigNumber} x
 * @param {BigNumber} y
 * @return {BigNumber} Result of `x` ^ `y`, fully precise
 *
 */
export { exportedObject as bitXorjs };;
