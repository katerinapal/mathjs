"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigNumber = _index.indexjs.type.BigNumber;
var Complex = _index.indexjs.type.Complex;
var DenseMatrix = _index.indexjs.type.DenseMatrix;
var Unit = _index.indexjs.type.Unit;
var mean = _index.indexjs.mean;

describe('mean', function () {
  it('should return the mean value of some numbers', function () {
    _assert2.default.equal(mean(5), 5);
    _assert2.default.equal(mean(3, 1), 2);
    _assert2.default.equal(mean(0, 3), 1.5);
    _assert2.default.equal(mean(1, 3, 5, 2, -5), 1.2);
    _assert2.default.equal(mean(0, 0, 0, 0), 0);
  });

  it('should return the mean of big numbers', function () {
    _assert2.default.deepEqual(mean(new BigNumber(1), new BigNumber(3), new BigNumber(5), new BigNumber(2), new BigNumber(-5)), new _index.indexjs.type.BigNumber(1.2));
  });

  it('should return the mean value for complex values', function () {
    _assert2.default.deepEqual(mean(new Complex(2, 3), new Complex(2, 1)), new Complex(2, 2));
    _assert2.default.deepEqual(mean(new Complex(2, 3), new Complex(2, 5)), new Complex(2, 4));
  });

  it('should return the mean value for mixed real and complex values', function () {
    _assert2.default.deepEqual(mean(new Complex(2, 4), 4), new Complex(3, 2));
    _assert2.default.deepEqual(mean(4, new Complex(2, 4)), new Complex(3, 2));
  });

  it('should return the mean value from an array', function () {
    _assert2.default.equal(mean([5]), 5);
    _assert2.default.equal(mean([1, 3, 5, 2, -5]), 1.2);
  });

  it('should return the mean value from a 1d matrix', function () {
    _assert2.default.equal(mean(new DenseMatrix([5])), 5);
    _assert2.default.equal(mean(new DenseMatrix([1, 3, 5, 2, -5])), 1.2);
  });

  it('should return the mean for each vector on the last dimension', function () {
    _assert2.default.deepEqual(mean([[2, 4], [6, 8]]), 5);
    _assert2.default.deepEqual(mean(new DenseMatrix([[2, 4], [6, 8]])), 5);
  });

  var inputMatrix = [// this is a 4x3x2 matrix, full test coverage
  [[10, 20], [30, 40], [50, 60]], [[70, 80], [90, 100], [110, 120]], [[130, 140], [150, 160], [170, 180]], [[190, 200], [210, 220], [230, 240]]];

  it('should return the mean value along a dimension on a matrix', function () {
    _assert2.default.deepEqual(mean([[2, 6], [4, 10]], 1), [4, 7]);
    _assert2.default.deepEqual(mean([[2, 6], [4, 10]], 0), [3, 8]);
    _assert2.default.deepEqual(mean(inputMatrix, 0), [[100, 110], [120, 130], [140, 150]]);
    _assert2.default.deepEqual(mean(inputMatrix, 1), [[30, 40], [90, 100], [150, 160], [210, 220]]);
    _assert2.default.deepEqual(mean(inputMatrix, 2), [[15, 35, 55], [75, 95, 115], [135, 155, 175], [195, 215, 235]]);
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      mean();
    });
    _assert2.default.throws(function () {
      mean([], 2, 3);
    });
  });

  it('should throw an error when called multiple arrays or matrices', function () {
    _assert2.default.throws(function () {
      mean([1, 2], [3, 4]);
    }, /Scalar values expected/);
    _assert2.default.throws(function () {
      mean(_index.indexjs.matrix([1, 2]), _index.indexjs.matrix([3, 4]));
    }, /Scalar values expected/);
  });

  it('should throw an error if called a dimension out of range', function () {
    _assert2.default.throws(function () {
      mean([1, 2, 3], -1);
    }, /IndexError: Index out of range \(-1 < 0\)/);
    _assert2.default.throws(function () {
      mean([1, 2, 3], 1);
    }, /IndexError: Index out of range \(1 > 0\)/);
  });

  it('should throw an error if called with an empty array', function () {
    _assert2.default.throws(function () {
      mean([]);
    });
  });

  it('should LaTeX mean', function () {
    var expression = _index.indexjs.parse('mean(1,2,3,4)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{mean}\\left(1,2,3,4\\right)');
  });
});
