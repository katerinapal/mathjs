"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isZero = _index.indexjs.isZero;
var bignumber = _index.indexjs.bignumber;
var fraction = _index.indexjs.fraction;
var complex = _index.indexjs.complex;
var unit = _index.indexjs.unit;

describe('isZero', function () {

  it('should test whether a number is zero', function () {
    _assert2.default.strictEqual(isZero(0), true);
    _assert2.default.strictEqual(isZero(-0), true);

    _assert2.default.strictEqual(isZero(2), false);
    _assert2.default.strictEqual(isZero(-3), false);
    _assert2.default.strictEqual(isZero(-0.5), false);
    _assert2.default.strictEqual(isZero(Infinity), false);
    _assert2.default.strictEqual(isZero(-Infinity), false);
    _assert2.default.strictEqual(isZero(NaN), false);
  });

  it('should test whether a boolean is zero', function () {
    _assert2.default.strictEqual(isZero(true), false);
    _assert2.default.strictEqual(isZero(false), true);
  });

  it('should test whether a BigNumber is zero', function () {
    _assert2.default.strictEqual(isZero(bignumber(0)), true);
    _assert2.default.strictEqual(isZero(bignumber(-0)), true);

    _assert2.default.strictEqual(isZero(bignumber(2)), false);
    _assert2.default.strictEqual(isZero(bignumber(-3)), false);
    _assert2.default.strictEqual(isZero(bignumber(-0.5)), false);
    _assert2.default.strictEqual(isZero(bignumber(Infinity)), false);
    _assert2.default.strictEqual(isZero(bignumber(-Infinity)), false);
    _assert2.default.strictEqual(isZero(bignumber(NaN)), false);
  });

  it('should test whether a Fraction is zero', function () {
    _assert2.default.strictEqual(isZero(fraction(0)), true);
    _assert2.default.strictEqual(isZero(fraction(-0)), true);

    _assert2.default.strictEqual(isZero(fraction(2)), false);
    _assert2.default.strictEqual(isZero(fraction(-3)), false);
  });

  it('should test whether a string contains a zero value', function () {
    _assert2.default.strictEqual(isZero('0'), true);
    _assert2.default.strictEqual(isZero('-0'), true);

    _assert2.default.strictEqual(isZero('2'), false);
    _assert2.default.strictEqual(isZero('-3'), false);
  });

  it('should test whether a complex number is zero', function () {
    _assert2.default.strictEqual(isZero(complex(0, 0)), true);
    _assert2.default.strictEqual(isZero(complex(0, 1)), false);
    _assert2.default.strictEqual(isZero(complex(2, 0)), false);
    _assert2.default.strictEqual(isZero(complex(2, 4)), false);
  });

  it('should test whether a unit is zero', function () {
    _assert2.default.strictEqual(isZero(unit('0 m')), true);
    _assert2.default.strictEqual(isZero(unit('0 kB')), true);

    _assert2.default.strictEqual(isZero(unit('5 cm')), false);
    _assert2.default.strictEqual(isZero(unit('-3 inch')), false);
  });

  it('should test isZero element wise on an Array', function () {
    _assert2.default.deepEqual(isZero([0, 5, 0, -3]), [true, false, true, false]);
  });

  it('should test isZero element wise on a Matrix', function () {
    _assert2.default.deepEqual(isZero(_index.indexjs.matrix([0, 5, 0, -3])), _index.indexjs.matrix([true, false, true, false]));
  });

  it('should throw an error in case of unsupported data types', function () {
    _assert2.default.throws(function () {
      isZero(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isZero({});
    }, /TypeError: Unexpected type of argument/);
  });
});
