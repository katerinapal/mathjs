"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _decimal = require("decimal.js");

var _decimal2 = _interopRequireDefault(_decimal);

var _nearlyEqual = require("../../../lib/utils/bignumber/nearlyEqual");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('nearlyEqual', function () {

  it('should test whether two BigNumbers are nearly equal', function () {
    var epsilon = 1e-2;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(0.9), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(0.95), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(0.98), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(0.99), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(0.991), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(1.1), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(1.05), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(1.02), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(1.01), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(1), epsilon), true);

    // smaller epsilon
    var epsilon2 = 1e-4;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(0.99), epsilon2), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(0.999), epsilon2), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1), new BigNumber(0.9999), epsilon2), true);
  });

  it('should test whether a positive and negative number are nearly equal', function () {
    var epsilon = 1e-3;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1.2), new BigNumber(1.2), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1.2), new BigNumber(-1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(-1.2), new BigNumber(1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(-1.2), new BigNumber(-1.2), epsilon), true);
  });

  it('should test whether two large numbers are nearly equal', function () {
    var epsilon = 1e-2;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber('1e500'), new BigNumber('0.90e500'), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber('1e500'), new BigNumber('0.95e500'), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber('1e500'), new BigNumber('0.98e500'), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber('1e500'), new BigNumber('0.99e500'), epsilon), true);
  });

  it('should test whether two small numbers are nearly equal (always true)', function () {
    var epsilon = 1e-2;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber('1e-200'), new BigNumber('0.99e-200'), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber('1e-200'), new BigNumber('10e-200'), epsilon), false);
  });

  it('should compare with zero', function () {
    var epsilon = 1e-3;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(0), new BigNumber(0), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(0), new BigNumber(-0), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(0), new BigNumber(1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(0), new BigNumber(1e30), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(0), new BigNumber(1e-30), epsilon), false);
  });

  it('should compare with Infinity', function () {
    var epsilon = 1e-3;

    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1.2), new BigNumber(Infinity), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(Infinity), new BigNumber(1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(Infinity), new BigNumber(Infinity), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(Infinity), new BigNumber(-Infinity), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(-Infinity), new BigNumber(Infinity), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(-Infinity), new BigNumber(-Infinity), epsilon), true);
  });

  it('should compare with NaN', function () {
    var epsilon = 1e-3;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1.2), new BigNumber(NaN), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(NaN), new BigNumber(1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(NaN), new BigNumber(NaN), epsilon), false);
  });

  it('should do exact comparison when epsilon is null or undefined', function () {
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1.2), new BigNumber(1.2)), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1.2), new BigNumber(1.2), null), true);

    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1.2).plus(1e-18), new BigNumber(1.2)), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new BigNumber(1.2).plus(1e-18), new BigNumber(1.2), null), false);
  });
});
