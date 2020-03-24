"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {};

describe('map', function () {

  it('should apply map to all elements of the matrix', function () {
    var m = _index.indexjs.matrix([[1, 2, 3], [4, 5, 6]]);
    var m2 = _index.indexjs.map(m, function (value) {
      return value * 2;
    });
    _assert2.default.deepEqual(m2.valueOf(), [[2, 4, 6], [8, 10, 12]]);
    _assert2.default.ok(m2 instanceof _index.indexjs.type.Matrix);
  });

  it('should apply deep-map to all elements in the array', function () {
    var arr = [[1, 2, 3], [4, 5, 6]];
    var arr2 = _index.indexjs.map(arr, function (value) {
      return value * 2;
    });
    _assert2.default.deepEqual(arr2, [[2, 4, 6], [8, 10, 12]]);
    _assert2.default.ok(Array.isArray(arr2));
  });

  it('should invoke callback with parameters value, index, obj', function () {
    var arr = [[1, 2, 3], [4, 5, 6]];

    _assert2.default.deepEqual(_index.indexjs.map(arr, function (value, index, obj) {
      // we don't clone index here, this should return a copy with every iteration
      return [value, index, obj === arr];
    }).valueOf(), [[[1, [0, 0], true], [2, [0, 1], true], [3, [0, 2], true]], [[4, [1, 0], true], [5, [1, 1], true], [6, [1, 2], true]]]);
  });

  it('should invoke a typed function with correct number of arguments (1)', function () {
    var output = _index.indexjs.map([1, 2, 3], _index.indexjs.typed('callback', {
      'number': function number(value) {
        return value + 2;
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should invoke a typed function with correct number of arguments (2)', function () {
    var output = _index.indexjs.map([1, 2, 3], _index.indexjs.typed('callback', {
      'number, Array': function numberArray(value, index) {
        return value + 2;
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should invoke a typed function with correct number of arguments (3)', function () {
    var output = _index.indexjs.map([1, 2, 3], _index.indexjs.typed('callback', {
      'number, Array, Array': function numberArrayArray(value, index, array) {
        return value + 2;
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should throw an error if called with unsupported type', function () {
    _assert2.default.throws(function () {
      _index.indexjs.map(1, function () {});
    });
    _assert2.default.throws(function () {
      _index.indexjs.map('arr', function () {});
    });
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.map([1, 2, 3]);
    });
  });

  it('should LaTeX map', function () {
    var expression = _index.indexjs.parse('map([1,2,3],callback)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{map}\\left(\\begin{bmatrix}1\\\\2\\\\3\\\\\\end{bmatrix}, callback\\right)');
  });
});
