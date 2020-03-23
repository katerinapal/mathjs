"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');

describe('forEach', function () {

  it('should iterate over all elements of the matrix', function () {
    var m = _index.indexjs.matrix([1, 2, 3]);
    var output = [];
    _index.indexjs.forEach(m, function (value) {
      output.push(value);
    });
    _assert2.default.deepEqual(output, [1, 2, 3]);
  });

  it('should iterate deep over all elements in the array', function () {
    var arr = [1, 2, 3];
    var output = [];
    _index.indexjs.forEach(arr, function (value) {
      output.push(value);
    });
    _assert2.default.deepEqual(output, [1, 2, 3]);
  });

  it('should invoke a typed function with correct number of arguments (1)', function () {
    var output = [];
    _index.indexjs.forEach([1, 2, 3], _index.indexjs.typed('callback', {
      'number': function number(value) {
        output.push(value + 2);
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should invoke a typed function with correct number of arguments (2)', function () {
    var output = [];
    _index.indexjs.forEach([1, 2, 3], _index.indexjs.typed('callback', {
      'number, Array': function numberArray(value, index) {
        output.push(value + 2);
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should invoke a typed function with correct number of arguments (3)', function () {
    var output = [];
    _index.indexjs.forEach([1, 2, 3], _index.indexjs.typed('callback', {
      'number, Array, Array': function numberArrayArray(value, index, array) {
        output.push(value + 2);
      }
    }));
    _assert2.default.deepEqual(output, [3, 4, 5]);
  });

  it('should invoke callback with parameters value, index, obj', function () {
    var arr = [[1, 2, 3], [4, 5, 6]];
    var output = [];

    _index.indexjs.forEach(arr, function (value, index, obj) {
      // note: we don't copy index, it should be a copy with each iteration
      output.push([value, index, obj === arr]);
    });
    _assert2.default.deepEqual(output, [[1, [0, 0], true], [2, [0, 1], true], [3, [0, 2], true], [4, [1, 0], true], [5, [1, 1], true], [6, [1, 2], true]]);
  });

  it('should throw an error if called with unsupported type', function () {
    _assert2.default.throws(function () {
      _index.indexjs.forEach(1, function () {});
    });
    _assert2.default.throws(function () {
      _index.indexjs.forEach('arr', function () {});
    });
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.forEach([1, 2, 3]);
    });
  });

  it('should LaTeX forEach', function () {
    var expression = _index.indexjs.parse('forEach([1,2,3],callback)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{forEach}\\left(\\begin{bmatrix}1\\\\2\\\\3\\\\\\end{bmatrix}, callback\\right)');
  });
});
