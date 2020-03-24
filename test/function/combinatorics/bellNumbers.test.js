"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    bellNumbers = _index.indexjs.bellNumbers;

describe('bellNumbers', function () {

  it('should calculate the number of partitions of a set', function () {
    _assert2.default.equal(bellNumbers(3), 5);
    _assert2.default.equal(bellNumbers(0), 1);
    _assert2.default.equal(bellNumbers(8), 4140);
  });

  it('should calculate the bellNumbers of n items with BigNumbers', function () {
    _assert2.default.deepEqual(bellNumbers(_index.indexjs.bignumber(2)), _index.indexjs.bignumber(2));
    _assert2.default.deepEqual(bellNumbers(_index.indexjs.bignumber(3)), _index.indexjs.bignumber(5));
  });

  it('should not work with non-integer and negative input', function () {
    _assert2.default.throws(function () {
      bellNumbers(0.5);
    }, TypeError);
    _assert2.default.throws(function () {
      bellNumbers(-1);
    }, TypeError);
    _assert2.default.throws(function () {
      bellNumbers(_index.indexjs.bignumber(-3));
    }, TypeError);
    _assert2.default.throws(function () {
      bellNumbers(_index.indexjs.bignumber(3.5));
    }, TypeError);
  });

  it('should throw an error in case of non-integer input', function () {
    _assert2.default.throws(function () {
      bellNumbers(5.2);
    }, /Non-negative integer value expected/);
  });

  it('should throw an error in case of negative input', function () {
    _assert2.default.throws(function () {
      bellNumbers(-2);
    }, /Non-negative integer value expected/);
  });

  it('should throw an error in case of wrong number or type of arguments', function () {
    _assert2.default.throws(function () {
      bellNumbers(5, 3, 2);
    });
    _assert2.default.throws(function () {
      bellNumbers(true, "hello world");
    });
  });

  it('should LaTeX bellNumbers', function () {
    var expression = _index.indexjs.parse('bellNumbers(3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{B}_{3}');
  });
});
