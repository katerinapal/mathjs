'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPositive = math.isPositive;
var bignumber = math.bignumber;
var fraction = math.fraction;
var complex = math.complex;
var unit = math.unit;

describe('isPositive', function () {

  it('should test whether a number is positive', function () {
    _assert2.default.strictEqual(isPositive(0), false);
    _assert2.default.strictEqual(isPositive(-0), false);
    _assert2.default.strictEqual(isPositive(2), true);
    _assert2.default.strictEqual(isPositive(-3), false);
    _assert2.default.strictEqual(isPositive(Infinity), true);
    _assert2.default.strictEqual(isPositive(-Infinity), false);
    _assert2.default.strictEqual(isPositive(NaN), false);
  });

  it('should test whether a boolean is positive', function () {
    _assert2.default.strictEqual(isPositive(true), true);
    _assert2.default.strictEqual(isPositive(false), false);
  });

  it('should test whether a BigNumber is positive', function () {
    _assert2.default.strictEqual(isPositive(bignumber(0)), false);
    _assert2.default.strictEqual(isPositive(bignumber(-0)), false);
    _assert2.default.strictEqual(isPositive(bignumber(2)), true);
    _assert2.default.strictEqual(isPositive(bignumber(-3)), false);
    _assert2.default.strictEqual(isPositive(bignumber(Infinity)), true);
    _assert2.default.strictEqual(isPositive(bignumber(-Infinity)), false);
    _assert2.default.strictEqual(isPositive(bignumber(NaN)), false);
  });

  it('should test whether a Fraction is positive', function () {
    _assert2.default.strictEqual(isPositive(fraction(2)), true);
    _assert2.default.strictEqual(isPositive(fraction(-3)), false);
    _assert2.default.strictEqual(isPositive(fraction(0)), false);
    _assert2.default.strictEqual(isPositive(fraction(-0)), false);
  });

  it('should test whether a unit is positive', function () {
    _assert2.default.strictEqual(isPositive(unit('0 m')), false);
    _assert2.default.strictEqual(isPositive(unit('0 kB')), false);
    _assert2.default.strictEqual(isPositive(unit('5 cm')), true);
    _assert2.default.strictEqual(isPositive(unit('-3 inch')), false);
  });

  it('should test whether a string contains a positive value', function () {
    _assert2.default.strictEqual(isPositive('2'), true);
    _assert2.default.strictEqual(isPositive('-2'), false);
    _assert2.default.strictEqual(isPositive('0'), false);
  });

  it('should test isPositive element wise on an Array', function () {
    _assert2.default.deepEqual(isPositive([0, 5, 0, -3]), [false, true, false, false]);
  });

  it('should test isPositive element wise on a Matrix', function () {
    _assert2.default.deepEqual(isPositive(math.matrix([0, 5, 0, -3])), math.matrix([false, true, false, false]));
  });

  it('should throw an error in case of unsupported data types', function () {
    _assert2.default.throws(function () {
      isPositive(complex(2, 3));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isPositive(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isPositive({});
    }, /TypeError: Unexpected type of argument/);
  });
});
