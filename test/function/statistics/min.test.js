"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigNumber = _index.indexjs.type.BigNumber;
var Complex = _index.indexjs.type.Complex;
var DenseMatrix = _index.indexjs.type.DenseMatrix;
var Unit = _index.indexjs.type.Unit;
var min = _index.indexjs.min;

describe('min', function () {

  it('should return the min between several numbers', function () {
    _assert2.default.equal(min(5), 5);
    _assert2.default.equal(min(1, 3), 1);
    _assert2.default.equal(min(3, 1), 1);
    _assert2.default.equal(min(1, 3, 5, -5, 2), -5);
    _assert2.default.equal(min(0, 0, 0, 0), 0);
  });

  it('should return the min string following lexical order', function () {
    _assert2.default.equal(min('A', 'C', 'D', 'B'), 'A');
  });

  it('should return the min element from a vector', function () {
    _assert2.default.equal(min([1, 3, 5, -5, 2]), -5);
  });

  it('should return the min of big numbers', function () {
    _assert2.default.deepEqual(min(new BigNumber(1), new BigNumber(3), new BigNumber(5), new BigNumber(2), new BigNumber(-5)), new BigNumber(-5));
  });

  it('should return the min element from a vector array', function () {
    _assert2.default.equal(min(new DenseMatrix([1, 3, 5, -5, 2])), -5);
  });

  it('should return the max element from a 2d matrix', function () {
    _assert2.default.deepEqual(min([[1, 4, 7], [3, 0, 5], [-1, 9, 11]]), -1);
    _assert2.default.deepEqual(min(new DenseMatrix([[1, 4, 7], [3, 0, 5], [-1, 9, 11]])), -1);
  });

  it('should return a reduced n-1 matrix from a n matrix', function () {
    _assert2.default.deepEqual(min([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 0), [1, 2, 3]);
    _assert2.default.deepEqual(min([[1, 2, 3], [4, 5, 6], [7, 8, 9]], 1), [1, 4, 7]);

    _assert2.default.deepEqual(min([[1, 2, 3], [6, 5, 4], [8, 7, 9]], 1), [1, 4, 7]);

    _assert2.default.deepEqual(min([[[1, 2], [3, 4], [5, 6]], [[6, 7], [8, 9], [10, 11]]], 2), [[1, 3, 5], [6, 8, 10]]);

    _assert2.default.deepEqual(min([[[1, 2], [3, 4], [5, 6]], [[6, 7], [8, 9], [10, 11]]], 1), [[1, 2], [6, 7]]);

    _assert2.default.deepEqual(min([[[1, 2], [3, 4], [5, 6]], [[6, 7], [8, 9], [10, 11]]], 0), [[1, 2], [3, 4], [5, 6]]);
  });

  it('should throw an error when called with complex numbers', function () {
    _assert2.default.throws(function () {
      min(new Complex(2, 3), new Complex(2, 1));
    }, TypeError);
    _assert2.default.throws(function () {
      min(new Complex(2, 3), new Complex(2, 5));
    }, TypeError);

    _assert2.default.throws(function () {
      min(new Complex(3, 4), 4);
    }, TypeError);
    _assert2.default.throws(function () {
      min(new Complex(3, 4), 5);
    }, TypeError);
    _assert2.default.throws(function () {
      min(5, new Complex(3, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      min(new Complex(3, 4), 6);
    }, TypeError);
  });

  it('should throw an error when called multiple arrays or matrices', function () {
    _assert2.default.throws(function () {
      min([1, 2], [3, 4]);
    }, /Scalar values expected/);
    _assert2.default.throws(function () {
      min(_index.indexjs.matrix([1, 2]), _index.indexjs.matrix([3, 4]));
    }, /Scalar values expected/);
  });

  it('should throw an error if called a dimension out of range', function () {
    _assert2.default.throws(function () {
      min([1, 2, 3], -1);
    }, /IndexError: Index out of range \(-1 < 0\)/);
    _assert2.default.throws(function () {
      min([1, 2, 3], 1);
    }, /IndexError: Index out of range \(1 > 0\)/);
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      min();
    });
    _assert2.default.throws(function () {
      min([], 2, 3);
    });
  });

  it('should throw an error if called with an empty array', function () {
    _assert2.default.throws(function () {
      min([]);
    });
  });

  it('should LaTeX min', function () {
    var expression = _index.indexjs.parse('min(1,2,3)');
    _assert2.default.equal(expression.toTex(), '\\min\\left(1,2,3\\right)');
  });
});
