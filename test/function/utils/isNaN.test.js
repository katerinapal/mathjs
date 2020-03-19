'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNaN = math.isNaN;
var bignumber = math.bignumber;
var fraction = math.fraction;
var complex = math.complex;
var Unit = math.type.Unit;
var Fraction = math.type.Fraction;

describe('isNegative', function () {

  it('should test whether a number is NaN', function () {
    _assert2.default.strictEqual(isNaN(0), false);
    _assert2.default.strictEqual(isNaN(2), false);
    _assert2.default.strictEqual(isNaN(-3), false);
    _assert2.default.strictEqual(isNaN(Infinity), false);
    _assert2.default.strictEqual(isNaN(-Infinity), false);
    _assert2.default.strictEqual(isNaN(NaN), true);
  });

  it('should test whether a boolean is NaN', function () {
    _assert2.default.strictEqual(isNaN(true), false);
    _assert2.default.strictEqual(isNaN(false), false);
  });

  it('should test whether a BigNumber is NaN', function () {
    _assert2.default.strictEqual(isNaN(bignumber(0)), false);
    _assert2.default.strictEqual(isNaN(bignumber(2)), false);
    _assert2.default.strictEqual(isNaN(bignumber(-3)), false);
    _assert2.default.strictEqual(isNaN(bignumber(Infinity)), false);
    _assert2.default.strictEqual(isNaN(bignumber(-Infinity)), false);
    _assert2.default.strictEqual(isNaN(bignumber(NaN)), true);
  });

  it('should test whether a Fraction is NaN', function () {
    _assert2.default.strictEqual(isNaN(fraction(2)), false);
    _assert2.default.strictEqual(isNaN(fraction(-3)), false);
    _assert2.default.strictEqual(isNaN(fraction(0)), false);
  });

  it('should test whether a unit is NaN', function () {
    _assert2.default.strictEqual(isNaN(new Unit(0, 'm')), false);
    _assert2.default.strictEqual(isNaN(new Unit(0, 'kB')), false);
    _assert2.default.strictEqual(isNaN(new Unit(5, 'cm')), false);
    _assert2.default.strictEqual(isNaN(new Unit(-3, 'inch')), false);
    _assert2.default.strictEqual(isNaN(new Unit(NaN, 'inch')), true);
  });

  it('should test whether a complex number contains NaN', function () {
    _assert2.default.strictEqual(isNaN(complex(0, 0)), false);
    _assert2.default.strictEqual(isNaN(complex(NaN, 0)), false);
    _assert2.default.strictEqual(isNaN(complex(0, NaN)), false);
    _assert2.default.strictEqual(isNaN(complex(NaN, NaN)), true);
  });

  it('should test whether a string contains a NaN', function () {
    _assert2.default.strictEqual(isNaN('2'), false);
    _assert2.default.strictEqual(isNaN('-2'), false);
    _assert2.default.strictEqual(isNaN('0'), false);
    _assert2.default.throws(function () {
      isNaN('NaN');
    }, /Error: Cannot convert "NaN" to a number/);
    _assert2.default.strictEqual(isNaN(''), false);
  });

  it('should test isNegative element wise on an Array', function () {
    _assert2.default.deepEqual(isNaN([0, 5, -2, NaN]), [false, false, false, true]);
  });

  it('should test isNegative element wise on a Matrix', function () {
    _assert2.default.deepEqual(isNaN(math.matrix([0, 5, -2, NaN])), math.matrix([false, false, false, true]));
  });

  it('should throw an error in case of unsupported data types', function () {
    _assert2.default.throws(function () {
      isNaN(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isNaN({});
    }, /TypeError: Unexpected type of argument/);
  });
});
