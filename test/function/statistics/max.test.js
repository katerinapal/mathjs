"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigNumber = _index.indexjs.type.BigNumber;
var Complex = _index.indexjs.type.Complex;
var DenseMatrix = _index.indexjs.type.DenseMatrix;
var Unit = _index.indexjs.type.Unit;
var max = _index.indexjs.max;

describe('max', function () {

  it('should return the max of numbers', function () {
    _assert2.default.equal(max(5), 5);
    _assert2.default.equal(max(3, 1), 3);
    _assert2.default.equal(max(1, 3), 3);
    _assert2.default.equal(max(1, 3, 5, 2, -5), 5);
    _assert2.default.equal(max(0, 0, 0, 0), 0);
  });

  it('should return the max of big numbers', function () {
    _assert2.default.deepEqual(max(new BigNumber(1), new BigNumber(3), new BigNumber(5), new BigNumber(2), new BigNumber(-5)), new BigNumber(5));
  });

  it('should return the max string following lexical order', function () {
    _assert2.default.equal(max('A', 'C', 'D', 'B'), 'D');
  });

  it('should return the max element from a vector', function () {
    _assert2.default.equal(max(new DenseMatrix([1, 3, 5, 2, -5])), 5);
  });

  it('should return the max element from a 2d matrix', function () {
    _assert2.default.deepEqual(max([[1, 4, 7], [3, 0, 5], [-1, 11, 9]]), 11);
    _assert2.default.deepEqual(max(new DenseMatrix([[1, 4, 7], [3, 0, 5], [-1, 11, 9]])), 11);
  });

  it('should return a reduced n-1 matrix from a n matrix', function () {
    _assert2.default.deepEqual(max([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 0), [7, 8, 9]);

    _assert2.default.deepEqual(max([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1), [3, 6, 9]);

    _assert2.default.deepEqual(max([[1, 2, 3], [6, 5, 4], [8, 7, 9]], 1), [3, 6, 9]);

    _assert2.default.deepEqual(max([[[1, 2], [3, 4], [5, 6]], [[6, 7], [8, 9], [10, 11]]], 2), [[2, 4, 6], [7, 9, 11]]);
  });

  it('should throw an error when called with complex numbers', function () {
    _assert2.default.throws(function () {
      max(new Complex(2, 3), new Complex(2, 1));
    }, TypeError);
    _assert2.default.throws(function () {
      max(new Complex(2, 3), new Complex(2, 5));
    }, TypeError);

    _assert2.default.throws(function () {
      max(new Complex(3, 4), 4);
    }, TypeError);
    _assert2.default.throws(function () {
      max(new Complex(3, 4), 5);
    }, TypeError);
    _assert2.default.throws(function () {
      max(5, new Complex(3, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      max(new Complex(3, 4), 6);
    }, TypeError);
  });

  it('should throw an error when called multiple arrays or matrices', function () {
    _assert2.default.throws(function () {
      max([1, 2], [3, 4]);
    }, /Scalar values expected/);
    _assert2.default.throws(function () {
      max(_index.indexjs.matrix([1, 2]), _index.indexjs.matrix([3, 4]));
    }, /Scalar values expected/);
  });

  it('should throw an error if called a dimension out of range', function () {
    _assert2.default.throws(function () {
      max([1, 2, 3], -1);
    }, /IndexError: Index out of range \(-1 < 0\)/);
    _assert2.default.throws(function () {
      max([1, 2, 3], 1);
    }, /IndexError: Index out of range \(1 > 0\)/);
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      max();
    });
    _assert2.default.throws(function () {
      max([], 2, 3);
    });
  });

  it('should return undefined if called with an empty array', function () {
    _assert2.default.throws(function () {
      max([]);
    });
  });

  it('should LaTeX max', function () {
    var expression = _index.indexjs.parse('max(1,2,3)');
    _assert2.default.equal(expression.toTex(), '\\max\\left(1,2,3\\right)');
  });
});
