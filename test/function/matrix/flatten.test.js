'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    matrix = math.matrix,
    flatten = math.flatten;

describe('flatten', function () {

  it('should flatten an empty array', function () {
    _assert2.default.deepEqual(flatten([]), []);
  });

  it('should clone the flattened array', function () {
    var c = math.complex();
    var flat = flatten([c]);
    _assert2.default.deepEqual(flat, [c]);
    (0, _assert2.default)(c !== flat[0]);
  });

  it('should flatten a 1 dimensional array', function () {
    _assert2.default.deepEqual(flatten([1, 2, 3]), [1, 2, 3]);
  });

  it('should flatten a 2 dimensional array', function () {
    _assert2.default.deepEqual(flatten([[1, 2], [3, 4]]), [1, 2, 3, 4]);
  });

  it('should flatten a 3 dimensional array', function () {
    _assert2.default.deepEqual(flatten([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [1, 2, 3, 4, 5, 6, 7, 8]);
  });

  it('should flatten a 1 dimensional matrix', function () {
    _assert2.default.deepEqual(flatten(matrix([1, 2, 3])), matrix([1, 2, 3]));
  });

  it('should flatten a 2 dimensional matrix', function () {
    _assert2.default.deepEqual(flatten(matrix([[1, 2], [3, 4]])), matrix([1, 2, 3, 4]));
  });

  it('should flatten a 3 dimensional matrix', function () {
    _assert2.default.deepEqual(flatten(matrix([[[1, 2], [3, 4]], [[5, 6], [7, 8]]])), matrix([1, 2, 3, 4, 5, 6, 7, 8]));
  });

  it('should throw an error on invalid arguments', function () {
    _assert2.default.throws(function () {
      flatten();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      flatten([], 2);
    }, /TypeError: Too many arguments/);
    _assert2.default.throws(function () {
      flatten("str");
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX flatten', function () {
    var expression = math.parse('flatten([[1,2],[3,4]])');
    _assert2.default.equal(expression.toTex(), '\\mathrm{flatten}\\left(\\begin{bmatrix}1&2\\\\3&4\\\\\\end{bmatrix}\\right)');
  });
});
