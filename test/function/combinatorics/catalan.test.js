"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {},
    catalan = _index.indexjs.catalan;

describe('catalan', function () {

  it('should calculate the nth catalan number', function () {
    _assert2.default.equal(catalan(3), 5);
    _assert2.default.equal(catalan(0), 1);
    _assert2.default.equal(catalan(8), 1430);
  });

  it('should calculate the nth catalan number with BigNumbers', function () {
    _assert2.default.deepEqual(catalan(_index.indexjs.bignumber(7)), _index.indexjs.bignumber(429));
    _assert2.default.deepEqual(catalan(_index.indexjs.bignumber(13)), _index.indexjs.bignumber(742900));
  });

  it('should not work with non-integer and negative input', function () {
    _assert2.default.throws(function () {
      catalan(0.5);
    }, TypeError);
    _assert2.default.throws(function () {
      catalan(-1);
    }, TypeError);
    _assert2.default.throws(function () {
      catalan(_index.indexjs.bignumber(-3));
    }, TypeError);
    _assert2.default.throws(function () {
      catalan(_index.indexjs.bignumber(3.5));
    }, TypeError);
  });

  it('should throw an error in case of non-integer input', function () {
    _assert2.default.throws(function () {
      catalan(5.2);
    }, /Non-negative integer value expected/);
  });

  it('should throw an error in case of negative input', function () {
    _assert2.default.throws(function () {
      catalan(-2);
    }, /Non-negative integer value expected/);
  });

  it('should throw an error in case of wrong number or type of arguments', function () {
    _assert2.default.throws(function () {
      catalan(5, 3, 2);
    });
    _assert2.default.throws(function () {
      catalan(true, "hello world");
    });
  });

  it('should LaTeX catalan', function () {
    var expression = _index.indexjs.parse('catalan(3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{C}_{3}');
  });
});
