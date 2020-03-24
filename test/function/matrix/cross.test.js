"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');

describe('cross', function () {

  it('should calculate cross product for two arrays', function () {
    _assert2.default.deepEqual(_index.indexjs.cross([1, 1, 0], [0, 1, 1]), [1, -1, 1]);
    _assert2.default.deepEqual(_index.indexjs.cross([3, -3, 1], [4, 9, 2]), [-15, -2, 39]);
    _assert2.default.deepEqual(_index.indexjs.cross([2, 3, 4], [5, 6, 7]), [-3, 6, -3]);
  });

  it('should calculate cross product for two matrices', function () {
    _assert2.default.deepEqual(_index.indexjs.cross(_index.indexjs.matrix([1, 1, 0]), _index.indexjs.matrix([0, 1, 1])), _index.indexjs.matrix([1, -1, 1]));
  });

  it('should calculate cross product for mixed arrays and matrices', function () {
    _assert2.default.deepEqual(_index.indexjs.cross([1, 1, 0], _index.indexjs.matrix([0, 1, 1])), _index.indexjs.matrix([1, -1, 1]));
    _assert2.default.deepEqual(_index.indexjs.cross(_index.indexjs.matrix([1, 1, 0]), [0, 1, 1]), _index.indexjs.matrix([1, -1, 1]));
  });

  it('should throw an error for unsupported types of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.cross([2, 4, 1], 2);
    }, TypeError);
  });

  it('should throw an error for multi dimensional matrix input', function () {
    _assert2.default.throws(function () {
      _index.indexjs.cross([[1, 2], [3, 4]], [[1, 2], [3, 4]]);
    }, /Vectors with length 3 expected/);
  });

  it('should throw an error in case of vectors with unequal length', function () {
    _assert2.default.throws(function () {
      _index.indexjs.cross([2, 3], [1, 2, 3]);
    }, /Vectors with length 3 expected/);
  });

  it('should throw an error in case of empty vectors', function () {
    _assert2.default.throws(function () {
      _index.indexjs.cross([], []);
    }, /Vectors with length 3 expected/);
  });

  it('should LaTeX cross', function () {
    var expression = _index.indexjs.parse('cross([1],[2])');
    _assert2.default.equal(expression.toTex(), '\\left(\\begin{bmatrix}1\\\\\\end{bmatrix}\\right)\\times\\left(\\begin{bmatrix}2\\\\\\end{bmatrix}\\right)');
  });
});
