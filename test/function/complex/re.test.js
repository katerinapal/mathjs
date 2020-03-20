"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('re', function () {

  it('should return the real part of a complex number', function () {
    _assert2.default.equal(_index.indexjs.re(_index.indexjs.complex(2, 3)), 2);
    _assert2.default.equal(_index.indexjs.re(_index.indexjs.complex(-2, -3)), -2);
    _assert2.default.equal(_index.indexjs.re(_index.indexjs.i), 0);
  });

  it('should return the real part of a real number', function () {
    _assert2.default.equal(_index.indexjs.re(2), 2);
  });

  it('should return the real part of a big number', function () {
    _assert2.default.deepEqual(_index.indexjs.re(_index.indexjs.bignumber(2)), _index.indexjs.bignumber(2));
  });

  it('should return the real part of a boolean', function () {
    _assert2.default.strictEqual(_index.indexjs.re(true), 1);
    _assert2.default.strictEqual(_index.indexjs.re(false), 0);
  });

  it('should return the real part of null', function () {
    _assert2.default.strictEqual(_index.indexjs.re(null), 0);
  });

  it('should return the real part for each element in a matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.re([2, _index.indexjs.complex('3-6i')]), [2, 3]);
    _assert2.default.deepEqual(_index.indexjs.re(_index.indexjs.matrix([2, _index.indexjs.complex('3-6i')])).valueOf(), [2, 3]);
  });

  it('should throw an error when called with an unsupported type of argument', function () {
    _assert2.default.throws(function () {
      _index.indexjs.re(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      _index.indexjs.re(_index.indexjs.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.re();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.re(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX re', function () {
    var expression = _index.indexjs.parse('re(1+i)');
    _assert2.default.equal(expression.toTex(), '\\Re\\left\\lbrace1+ i\\right\\rbrace');
  });
});
