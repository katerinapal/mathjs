"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test size
var error = require('../../../lib/error/index'),
    size = _index.indexjs.size,
    matrix = _index.indexjs.matrix;

describe('size', function () {

  it('should calculate the size of an array', function () {
    _assert2.default.deepEqual(size([[1, 2, 3], [4, 5, 6]]), [2, 3]);
    _assert2.default.deepEqual(size([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [2, 2, 2]);
    _assert2.default.deepEqual(size([1, 2, 3]), [3]);
    _assert2.default.deepEqual(size([[1], [2], [3]]), [3, 1]);
    _assert2.default.deepEqual(size([100]), [1]);
    _assert2.default.deepEqual(size([[100]]), [1, 1]);
    _assert2.default.deepEqual(size([[[100]]]), [1, 1, 1]);
    _assert2.default.deepEqual(size([]), [0]);
    _assert2.default.deepEqual(size([[]]), [1, 0]);
    _assert2.default.deepEqual(size([[[]]]), [1, 1, 0]);
    _assert2.default.deepEqual(size([[[], []]]), [1, 2, 0]);
  });

  it('should calculate the size of a matrix', function () {
    _assert2.default.deepEqual(size(matrix()), matrix([0]));
    _assert2.default.deepEqual(size(matrix([[1, 2, 3], [4, 5, 6]])), matrix([2, 3]));
    _assert2.default.deepEqual(size(matrix([[], []])), matrix([2, 0]));
  });

  it('should calculate the size of a range', function () {
    _assert2.default.deepEqual(size(_index.indexjs.range(2, 6)), matrix([4]));
  });

  it('should calculate the size of a scalar', function () {
    _assert2.default.deepEqual(size(2), matrix([]));
    _assert2.default.deepEqual(size(_index.indexjs.bignumber(2)), matrix([]));
    _assert2.default.deepEqual(size(_index.indexjs.complex(2, 3)), matrix([]));
    _assert2.default.deepEqual(size(true), matrix([]));
    _assert2.default.deepEqual(size(null), matrix([]));
  });

  it('should calculate the size of a scalar with setting matrix=="array"', function () {
    var math2 = _index.indexjs.create({ matrix: 'Array' });
    _assert2.default.deepEqual(math2.size(2), []);
    _assert2.default.deepEqual(math2.size(math2.bignumber(2)), []);
    _assert2.default.deepEqual(math2.size(math2.complex(2, 3)), []);
    _assert2.default.deepEqual(math2.size('string'), [6]);
  });

  it('should calculate the size of a string', function () {
    _assert2.default.deepEqual(size('hello'), matrix([5]));
    _assert2.default.deepEqual(size(''), matrix([0]));
  });

  it('should throw an error if called with an invalid number of arguments', function () {
    _assert2.default.throws(function () {
      size();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      size(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error if called with invalid type of arguments', function () {
    _assert2.default.throws(function () {
      size(new Date());
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX size', function () {
    var expression = _index.indexjs.parse('size(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{size}\\left(1\\right)');
  });
});
