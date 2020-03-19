'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isInteger = math.isInteger;
var bignumber = math.bignumber;
var fraction = math.fraction;

describe('isInteger', function () {

  it('should test whether a number is an integer', function () {
    _assert2.default.strictEqual(isInteger(2), true);
    _assert2.default.strictEqual(isInteger(0), true);
    _assert2.default.strictEqual(isInteger(-3), true);
    _assert2.default.strictEqual(isInteger(-0.5), false);
    _assert2.default.strictEqual(isInteger(0.5), false);
    _assert2.default.strictEqual(isInteger(Infinity), false);
    _assert2.default.strictEqual(isInteger(-Infinity), false);
    _assert2.default.strictEqual(isInteger(NaN), false);
    _assert2.default.strictEqual(isInteger(0.1 + 0.2), false); // TODO: what to do with round off errors?
  });

  it('should test whether a boolean is an integer', function () {
    _assert2.default.strictEqual(isInteger(true), true);
    _assert2.default.strictEqual(isInteger(false), true);
  });

  it('should test whether a BigNumber is an integer', function () {
    _assert2.default.strictEqual(isInteger(bignumber(2)), true);
    _assert2.default.strictEqual(isInteger(bignumber(0)), true);
    _assert2.default.strictEqual(isInteger(bignumber(-3)), true);
    _assert2.default.strictEqual(isInteger(bignumber(-0.5)), false);
    _assert2.default.strictEqual(isInteger(bignumber(0.5)), false);
    _assert2.default.strictEqual(isInteger(bignumber(Infinity)), false);
    _assert2.default.strictEqual(isInteger(bignumber(-Infinity)), false);
    _assert2.default.strictEqual(isInteger(bignumber(NaN)), false);
  });

  it('should test whether a Fraction is an integer', function () {
    _assert2.default.strictEqual(isInteger(fraction(2)), true);
    _assert2.default.strictEqual(isInteger(fraction(0)), true);
    _assert2.default.strictEqual(isInteger(fraction(-3)), true);
    _assert2.default.strictEqual(isInteger(fraction(-0.5)), false);
    _assert2.default.strictEqual(isInteger(fraction(0.5)), false);
  });

  it('should test whether a string contains an integer', function () {
    _assert2.default.strictEqual(isInteger('2'), true);
    _assert2.default.strictEqual(isInteger('0'), true);
    _assert2.default.strictEqual(isInteger('-3'), true);
    _assert2.default.strictEqual(isInteger('-0.5'), false);
    _assert2.default.strictEqual(isInteger('0.5'), false);
  });

  it('should test isInteger element wise on an Array', function () {
    _assert2.default.deepEqual(isInteger([2, 5, 0.5, 3]), [true, true, false, true]);
  });

  it('should test isInteger element wise on a Matrix', function () {
    _assert2.default.deepEqual(isInteger(math.matrix([2, 5, 0.5, 3])), math.matrix([true, true, false, true]));
  });

  it('should throw an error in case of unsupported data types', function () {
    _assert2.default.throws(function () {
      isInteger(math.complex(2, 3));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isInteger(math.unit('5 cm'));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isInteger(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isInteger({});
    }, /TypeError: Unexpected type of argument/);
  });
});
