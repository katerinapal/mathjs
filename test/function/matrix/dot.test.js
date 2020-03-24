"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');

describe('dot', function () {

  it('should calculate dot product for two arrays', function () {
    _assert2.default.equal(_index.indexjs.dot([2, 4, 1], [2, 2, 3]), 15);
    _assert2.default.equal(_index.indexjs.dot([7, 3], [2, 4]), 26);
  });

  it('should calculate dot product for two matrices', function () {
    _assert2.default.equal(_index.indexjs.dot(_index.indexjs.matrix([2, 4, 1]), _index.indexjs.matrix([2, 2, 3])), 15);
    _assert2.default.equal(_index.indexjs.dot(_index.indexjs.matrix([7, 3]), _index.indexjs.matrix([2, 4])), 26);
  });

  it('should calculate dot product for mixed arrays and matrices', function () {
    _assert2.default.equal(_index.indexjs.dot([2, 4, 1], _index.indexjs.matrix([2, 2, 3])), 15);
    _assert2.default.equal(_index.indexjs.dot(_index.indexjs.matrix([7, 3]), [2, 4]), 26);
  });

  it('should throw an error for unsupported types of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.dot([2, 4, 1], 2);
    }, TypeError);
  });

  it('should throw an error for multi dimensional matrix input', function () {
    _assert2.default.throws(function () {
      _index.indexjs.dot([[1, 2], [3, 4]], [[1, 2], [3, 4]]);
    }, /Vector expected/);
  });

  it('should throw an error in case of vectors with unequal length', function () {
    _assert2.default.throws(function () {
      _index.indexjs.dot([2, 3], [1, 2, 3]);
    }, /Vectors must have equal length \(2 != 3\)/);
  });

  it('should throw an error in case of empty vectors', function () {
    _assert2.default.throws(function () {
      _index.indexjs.dot([], []);
    }, /Cannot calculate the dot product of empty vectors/);
  });

  it('should LaTeX dot', function () {
    var expression = _index.indexjs.parse('dot([1,2],[3,4])');
    _assert2.default.equal(expression.toTex(), '\\left(\\begin{bmatrix}1\\\\2\\\\\\end{bmatrix}\\cdot\\begin{bmatrix}3\\\\4\\\\\\end{bmatrix}\\right)');
  });
});
