"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = math.bignumber;
var complex = math.complex;
var fraction = math.fraction;
var matrix = math.matrix;
var unit = math.unit;
var range = math.range;
var fix = math.fix;

describe('fix', function () {
  it('should round booleans correctly', function () {
    _assert2.default.equal(fix(true), 1);
    _assert2.default.equal(fix(false), 0);
  });

  it('should round null', function () {
    _assert2.default.equal(math.ceil(null), 0);
  });

  it('should round numbers correctly', function () {
    (0, _approx.equal)(fix(0), 0);
    (0, _approx.equal)(fix(1), 1);
    (0, _approx.equal)(fix(1.3), 1);
    (0, _approx.equal)(fix(1.8), 1);
    (0, _approx.equal)(fix(2), 2);
    (0, _approx.equal)(fix(-1), -1);
    (0, _approx.equal)(fix(-1.3), -1);
    (0, _approx.equal)(fix(-1.8), -1);
    (0, _approx.equal)(fix(-2), -2);
    (0, _approx.equal)(fix(-2.1), -2);
    (0, _approx.equal)(fix(math.pi), 3);
  });

  it('should round big numbers correctly', function () {
    _assert2.default.deepEqual(fix(bignumber(0)), bignumber(0));
    _assert2.default.deepEqual(fix(bignumber(1)), bignumber(1));
    _assert2.default.deepEqual(fix(bignumber(1.3)), bignumber(1));
    _assert2.default.deepEqual(fix(bignumber(1.8)), bignumber(1));
    _assert2.default.deepEqual(fix(bignumber(2)), bignumber(2));
    _assert2.default.deepEqual(fix(bignumber(-1)), bignumber(-1));
    _assert2.default.deepEqual(fix(bignumber(-1.3)), bignumber(-1));
    _assert2.default.deepEqual(fix(bignumber(-1.8)), bignumber(-1));
    _assert2.default.deepEqual(fix(bignumber(-2)), bignumber(-2));
    _assert2.default.deepEqual(fix(bignumber(-2.1)), bignumber(-2));
  });

  it('should round complex numbers correctly', function () {
    // complex
    approx.deepEqual(fix(complex(0, 0)), complex(0, 0));
    approx.deepEqual(fix(complex(1.3, 1.8)), complex(1, 1));
    approx.deepEqual(fix(math.i), complex(0, 1));
    approx.deepEqual(fix(complex(-1.3, -1.8)), complex(-1, -1));
  });

  it('should round fractions correctly', function () {
    var a = fraction('2/3');
    (0, _assert2.default)(fix(a) instanceof math.type.Fraction);
    _assert2.default.equal(a.toString(), '0.(6)');

    _assert2.default.equal(fix(fraction(0)).toString(), '0');
    _assert2.default.equal(fix(fraction(1)).toString(), '1');
    _assert2.default.equal(fix(fraction(1.3)).toString(), '1');
    _assert2.default.equal(fix(fraction(1.8)).toString(), '1');
    _assert2.default.equal(fix(fraction(2)).toString(), '2');
    _assert2.default.equal(fix(fraction(-1)).toString(), '-1');
    _assert2.default.equal(fix(fraction(-1.3)).toString(), '-1');
    _assert2.default.equal(fix(fraction(-1.8)).toString(), '-1');
    _assert2.default.equal(fix(fraction(-2)).toString(), '-2');
    _assert2.default.equal(fix(fraction(-2.1)).toString(), '-2');
  });

  it('should throw an error on unit as parameter', function () {
    // unit
    _assert2.default.throws(function () {
      fix(unit('5cm'));
    }, TypeError, 'Function fix(unit) not supported');
  });

  it('should convert a string to a number', function () {
    _assert2.default.strictEqual(fix('1.8'), 1);
  });

  it('should correctly round all values of a matrix element-wise', function () {
    // matrix, array, range
    approx.deepEqual(fix([1.2, 3.4, 5.6, 7.8, 10.0]), [1, 3, 5, 7, 10]);
    approx.deepEqual(fix(matrix([1.2, 3.4, 5.6, 7.8, 10.0])), matrix([1, 3, 5, 7, 10]));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      fix();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      fix(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX fix', function () {
    var expression = math.parse('fix(0.6)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{fix}\\left(0.6\\right)');
  });
});
