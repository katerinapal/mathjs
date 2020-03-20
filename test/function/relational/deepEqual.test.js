"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test deepEqual
var bignumber = _index.indexjs.bignumber,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    unit = _index.indexjs.unit,
    deepEqual = _index.indexjs.deepEqual;

describe('deepEqual', function () {

  it('should compare scalars correctly', function () {
    _assert2.default.equal(deepEqual(2, 3), false);
    _assert2.default.equal(deepEqual(2, 2), true);
    _assert2.default.equal(deepEqual(0, 0), true);
    _assert2.default.equal(deepEqual(-2, 2), false);
    _assert2.default.equal(deepEqual(true, 1), true);
  });

  it('should compare two matrices', function () {
    _assert2.default.deepEqual(deepEqual([1, 4, 5], [3, 4, 5]), false);
    _assert2.default.deepEqual(deepEqual([1, 4, 5], [1, 4, 5]), true);
    _assert2.default.deepEqual(deepEqual([1, 4, 5], [1, 4]), false);
    _assert2.default.deepEqual(deepEqual([1, 4], [1, 4, 5]), false);
    _assert2.default.deepEqual(deepEqual([1, 4, 5], matrix([3, 4, 5])), false);
    _assert2.default.deepEqual(deepEqual([1, 4, 5], matrix([1, 4, 5])), true);
    _assert2.default.deepEqual(deepEqual(matrix([1, 4, 5]), matrix([1, 4, 5])), true);

    _assert2.default.deepEqual(deepEqual(matrix([[1, 2], [3, 4]]), matrix([[1, 2], [3, 4]])), true);
    _assert2.default.deepEqual(deepEqual(matrix([[1, 2], [3, 4]]), matrix([[1, 2], [3, 5]])), false);
    _assert2.default.deepEqual(deepEqual(matrix([[1, 2], [3, 4]]), matrix([[1, 2], [3, 4], [5, 6]])), false);
    _assert2.default.deepEqual(deepEqual(matrix([[1, 2], [3, 4], [5, 6]]), matrix([[1, 2], [3, 4]])), false);
  });

  it('should compare mixed scalars and matrices', function () {
    _assert2.default.deepEqual(deepEqual([1, 2, 3], 2), false);
    _assert2.default.deepEqual(deepEqual(2, [1, 2, 3]), false);
    _assert2.default.deepEqual(deepEqual(matrix([1, 2, 3]), 2), false);
    _assert2.default.deepEqual(deepEqual(2, matrix([1, 2, 3])), false);
  });

  it('should compare two matrices with mixed types', function () {
    _assert2.default.deepEqual(deepEqual([1, 4, 5], [true, 4, 5]), true);
    _assert2.default.deepEqual(deepEqual([2, 3], [2, bignumber(3)]), true);
    _assert2.default.deepEqual(deepEqual([2, 3], [2, bignumber(4)]), false);
    _assert2.default.deepEqual(deepEqual([complex(2, 3), 3], [complex(2, 3), 3]), true);
    _assert2.default.deepEqual(deepEqual([complex(2, 3), 3], [complex(2, 4), 3]), false);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      deepEqual(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      deepEqual(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX deepEqual', function () {
    var expression = _index.indexjs.parse('deepEqual([1,2],[1,3])');
    _assert2.default.equal(expression.toTex(), '\\mathrm{deepEqual}\\left(\\begin{bmatrix}1\\\\2\\\\\\end{bmatrix},\\begin{bmatrix}1\\\\3\\\\\\end{bmatrix}\\right)');
  });
});
