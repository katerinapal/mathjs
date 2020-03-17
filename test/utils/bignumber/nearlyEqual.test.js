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
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(0.9), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(0.95), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(0.98), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(0.99), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(0.991), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(1.1), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(1.05), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(1.02), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(1.01), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(1), epsilon), true);

    // smaller epsilon
    var epsilon2 = 1e-4;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(0.99), epsilon2), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(0.999), epsilon2), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1), new _decimal2.default(0.9999), epsilon2), true);
  });

  it('should test whether a positive and negative number are nearly equal', function () {
    var epsilon = 1e-3;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1.2), new _decimal2.default(1.2), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1.2), new _decimal2.default(-1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(-1.2), new _decimal2.default(1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(-1.2), new _decimal2.default(-1.2), epsilon), true);
  });

  it('should test whether two large numbers are nearly equal', function () {
    var epsilon = 1e-2;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default('1e500'), new _decimal2.default('0.90e500'), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default('1e500'), new _decimal2.default('0.95e500'), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default('1e500'), new _decimal2.default('0.98e500'), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default('1e500'), new _decimal2.default('0.99e500'), epsilon), true);
  });

  it('should test whether two small numbers are nearly equal (always true)', function () {
    var epsilon = 1e-2;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default('1e-200'), new _decimal2.default('0.99e-200'), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default('1e-200'), new _decimal2.default('10e-200'), epsilon), false);
  });

  it('should compare with zero', function () {
    var epsilon = 1e-3;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(0), new _decimal2.default(0), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(0), new _decimal2.default(-0), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(0), new _decimal2.default(1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(0), new _decimal2.default(1e30), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(0), new _decimal2.default(1e-30), epsilon), false);
  });

  it('should compare with Infinity', function () {
    var epsilon = 1e-3;

    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1.2), new _decimal2.default(Infinity), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(Infinity), new _decimal2.default(1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(Infinity), new _decimal2.default(Infinity), epsilon), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(Infinity), new _decimal2.default(-Infinity), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(-Infinity), new _decimal2.default(Infinity), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(-Infinity), new _decimal2.default(-Infinity), epsilon), true);
  });

  it('should compare with NaN', function () {
    var epsilon = 1e-3;
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1.2), new _decimal2.default(NaN), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(NaN), new _decimal2.default(1.2), epsilon), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(NaN), new _decimal2.default(NaN), epsilon), false);
  });

  it('should do exact comparison when epsilon is null or undefined', function () {
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1.2), new _decimal2.default(1.2)), true);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1.2), new _decimal2.default(1.2), null), true);

    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1.2).plus(1e-18), new _decimal2.default(1.2)), false);
    _assert2.default.equal((0, _nearlyEqual.nearlyEqualjs)(new _decimal2.default(1.2).plus(1e-18), new _decimal2.default(1.2), null), false);
  });
});
