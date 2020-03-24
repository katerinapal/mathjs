"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('im', function () {

  it('should return the imaginary part of a complex number', function () {
    _assert2.default.equal(_index.indexjs.im(_index.indexjs.complex(2, 3)), 3);
    _assert2.default.equal(_index.indexjs.im(_index.indexjs.complex(-2, -3)), -3);
    _assert2.default.equal(_index.indexjs.im(_index.indexjs.i), 1);
  });

  it('should return the imaginary part of a real number', function () {
    _assert2.default.equal(_index.indexjs.im(2), 0);
  });

  it('should return the imaginary part of a big number', function () {
    _assert2.default.deepEqual(_index.indexjs.im(_index.indexjs.bignumber(2)), _index.indexjs.bignumber(0));
  });

  it('should return the imaginary part of a boolean', function () {
    _assert2.default.equal(_index.indexjs.im(true), 0);
    _assert2.default.equal(_index.indexjs.im(false), 0);
  });

  it('should return the imaginary part of null', function () {
    _assert2.default.equal(_index.indexjs.im(null), 0);
  });

  it('should return the imaginary part of a boolean', function () {
    _assert2.default.equal(_index.indexjs.im(true), 0);
    _assert2.default.equal(_index.indexjs.im(false), 0);
  });

  it('should return the imaginary part for each element in a matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.im([2, _index.indexjs.complex('3-6i')]), [0, -6]);
    _assert2.default.deepEqual(_index.indexjs.im(_index.indexjs.matrix([2, _index.indexjs.complex('3-6i')])).valueOf(), [0, -6]);
  });

  it('should throw an error when called with an unsupported type of argument', function () {
    _assert2.default.throws(function () {
      _index.indexjs.im(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      _index.indexjs.im(_index.indexjs.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.im();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.im(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX im', function () {
    var expression = _index.indexjs.parse('im(1+i)');
    _assert2.default.equal(expression.toTex(), '\\Im\\left\\lbrace1+ i\\right\\rbrace');
  });
});
