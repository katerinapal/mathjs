"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = _index.indexjs.bignumber;
var complex = _index.indexjs.complex;
var fraction = _index.indexjs.fraction;
var matrix = _index.indexjs.matrix;
var unit = _index.indexjs.unit;
var range = _index.indexjs.range;
var ceil = _index.indexjs.ceil;

describe('ceil', function () {
  it('should return the ceil of a boolean', function () {
    _assert2.default.equal(ceil(true), 1);
    _assert2.default.equal(ceil(false), 0);
  });

  it('should return the ceil of null', function () {
    _assert2.default.equal(_index.indexjs.ceil(null), 0);
  });

  it('should return the ceil of a number', function () {
    (0, _approx.equal)(ceil(0), 0);
    (0, _approx.equal)(ceil(1), 1);
    (0, _approx.equal)(ceil(1.3), 2);
    (0, _approx.equal)(ceil(1.8), 2);
    (0, _approx.equal)(ceil(2), 2);
    (0, _approx.equal)(ceil(-1), -1);
    (0, _approx.equal)(ceil(-1.3), -1);
    (0, _approx.equal)(ceil(-1.8), -1);
    (0, _approx.equal)(ceil(-2), -2);
    (0, _approx.equal)(ceil(-2.1), -2);
    (0, _approx.equal)(ceil(_index.indexjs.pi), 4);
  });

  it('should return the ceil of a big number', function () {
    _assert2.default.deepEqual(ceil(bignumber(0)), bignumber(0));
    _assert2.default.deepEqual(ceil(bignumber(1)), bignumber(1));
    _assert2.default.deepEqual(ceil(bignumber(1.3)), bignumber(2));
    _assert2.default.deepEqual(ceil(bignumber(1.8)), bignumber(2));
    _assert2.default.deepEqual(ceil(bignumber(2)), bignumber(2));
    _assert2.default.deepEqual(ceil(bignumber(-1)), bignumber(-1));
    _assert2.default.deepEqual(ceil(bignumber(-1.3)), bignumber(-1));
    _assert2.default.deepEqual(ceil(bignumber(-1.8)), bignumber(-1));
    _assert2.default.deepEqual(ceil(bignumber(-2)), bignumber(-2));
    _assert2.default.deepEqual(ceil(bignumber(-2.1)), bignumber(-2));
  });

  it('should return the ceil of real and imag part of a complex', function () {
    approx.deepEqual(ceil(complex(0, 0)), complex(0, 0));
    approx.deepEqual(ceil(complex(1.3, 1.8)), complex(2, 2));
    approx.deepEqual(ceil(_index.indexjs.i), complex(0, 1));
    approx.deepEqual(ceil(complex(-1.3, -1.8)), complex(-1, -1));
  });

  it('should return the ceil of a number', function () {
    var a = fraction('2/3');
    (0, _assert2.default)(ceil(a) instanceof _index.indexjs.type.Fraction);
    _assert2.default.equal(a.toString(), '0.(6)');

    _assert2.default.equal(ceil(fraction(0)).toString(), '0');
    _assert2.default.equal(ceil(fraction(1)), '1');
    _assert2.default.equal(ceil(fraction(1.3)).toString(), '2');
    _assert2.default.equal(ceil(fraction(1.8)).toString(), '2');
    _assert2.default.equal(ceil(fraction(2)).toString(), '2');
    _assert2.default.equal(ceil(fraction(-1)).toString(), '-1');
    _assert2.default.equal(ceil(fraction(-1.3)).toString(), '-1');
    _assert2.default.equal(ceil(fraction(-1.8)).toString(), '-1');
    _assert2.default.equal(ceil(fraction(-2)).toString(), '-2');
    _assert2.default.equal(ceil(fraction(-2.1)).toString(), '-2');
  });

  it('should throw an error for units', function () {
    _assert2.default.throws(function () {
      ceil(unit('5cm'));
    }, TypeError, 'Function ceil(unit) not supported');
  });

  it('should convert a string to a number', function () {
    _assert2.default.strictEqual(ceil('1.8'), 2);
  });

  it('should ceil each element in a matrix, array or range', function () {
    approx.deepEqual(ceil([1.2, 3.4, 5.6, 7.8, 10.0]), [2, 4, 6, 8, 10]);
    approx.deepEqual(ceil(matrix([1.2, 3.4, 5.6, 7.8, 10.0])), matrix([2, 4, 6, 8, 10]));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      ceil();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      ceil(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX ceil', function () {
    var expression = _index.indexjs.parse('ceil(0.5)');
    _assert2.default.equal(expression.toTex(), '\\left\\lceil0.5\\right\\rceil');
  });
});
