'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var isNegative = math.isNegative;
var bignumber = math.bignumber;
var fraction = math.fraction;
var complex = math.complex;
var unit = math.unit;

describe('isNegative', function () {

  it('should test whether a number is negative', function () {
    _assert2.default.strictEqual(isNegative(0), false);
    _assert2.default.strictEqual(isNegative(-0), false);
    _assert2.default.strictEqual(isNegative(2), false);
    _assert2.default.strictEqual(isNegative(-3), true);
    _assert2.default.strictEqual(isNegative(Infinity), false);
    _assert2.default.strictEqual(isNegative(-Infinity), true);
    _assert2.default.strictEqual(isNegative(NaN), false);
  });

  it('should test whether a boolean is negative', function () {
    _assert2.default.strictEqual(isNegative(true), false);
    _assert2.default.strictEqual(isNegative(false), false);
  });

  it('should test whether a BigNumber is negative', function () {
    _assert2.default.strictEqual(isNegative(bignumber(0)), false);
    _assert2.default.strictEqual(isNegative(bignumber(-0)), false);
    _assert2.default.strictEqual(isNegative(bignumber(2)), false);
    _assert2.default.strictEqual(isNegative(bignumber(-3)), true);
    _assert2.default.strictEqual(isNegative(bignumber(Infinity)), false);
    _assert2.default.strictEqual(isNegative(bignumber(-Infinity)), true);
    _assert2.default.strictEqual(isNegative(bignumber(NaN)), false);
  });

  it('should test whether a Fraction is negative', function () {
    _assert2.default.strictEqual(isNegative(fraction(2)), false);
    _assert2.default.strictEqual(isNegative(fraction(-3)), true);
    _assert2.default.strictEqual(isNegative(fraction(0)), false);
    _assert2.default.strictEqual(isNegative(fraction(-0)), false);
  });

  it('should test whether a unit is negative', function () {
    _assert2.default.strictEqual(isNegative(unit('0 m')), false);
    _assert2.default.strictEqual(isNegative(unit('0 kB')), false);
    _assert2.default.strictEqual(isNegative(unit('5 cm')), false);
    _assert2.default.strictEqual(isNegative(unit('-3 inch')), true);
  });

  it('should test whether a string contains a negative value', function () {
    _assert2.default.strictEqual(isNegative('2'), false);
    _assert2.default.strictEqual(isNegative('-2'), true);
    _assert2.default.strictEqual(isNegative('0'), false);
  });

  it('should test isNegative element wise on an Array', function () {
    _assert2.default.deepEqual(isNegative([0, 5, 0, -3]), [false, false, false, true]);
  });

  it('should test isNegative element wise on a Matrix', function () {
    _assert2.default.deepEqual(isNegative(math.matrix([0, 5, 0, -3])), math.matrix([false, false, false, true]));
  });

  it('should throw an error in case of unsupported data types', function () {
    _assert2.default.throws(function () {
      isNegative(complex(2, 3));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isNegative(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isNegative({});
    }, /TypeError: Unexpected type of argument/);
  });
});
