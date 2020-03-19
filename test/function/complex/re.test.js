'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('re', function () {

  it('should return the real part of a complex number', function () {
    _assert2.default.equal(math.re(math.complex(2, 3)), 2);
    _assert2.default.equal(math.re(math.complex(-2, -3)), -2);
    _assert2.default.equal(math.re(math.i), 0);
  });

  it('should return the real part of a real number', function () {
    _assert2.default.equal(math.re(2), 2);
  });

  it('should return the real part of a big number', function () {
    _assert2.default.deepEqual(math.re(math.bignumber(2)), math.bignumber(2));
  });

  it('should return the real part of a boolean', function () {
    _assert2.default.strictEqual(math.re(true), 1);
    _assert2.default.strictEqual(math.re(false), 0);
  });

  it('should return the real part of null', function () {
    _assert2.default.strictEqual(math.re(null), 0);
  });

  it('should return the real part for each element in a matrix', function () {
    _assert2.default.deepEqual(math.re([2, math.complex('3-6i')]), [2, 3]);
    _assert2.default.deepEqual(math.re(math.matrix([2, math.complex('3-6i')])).valueOf(), [2, 3]);
  });

  it('should throw an error when called with an unsupported type of argument', function () {
    _assert2.default.throws(function () {
      math.re(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      math.re(math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      math.re();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      math.re(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX re', function () {
    var expression = math.parse('re(1+i)');
    _assert2.default.equal(expression.toTex(), '\\Re\\left\\lbrace1+ i\\right\\rbrace');
  });
});
