"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test ones
var error = {},
    ones = _index.indexjs.ones,
    matrix = _index.indexjs.matrix;

describe('ones', function () {

  it('should create an empty matrix', function () {
    _assert2.default.deepEqual(ones(), matrix());
    _assert2.default.deepEqual(ones([]), []);
    _assert2.default.deepEqual(ones(matrix([])), matrix());
  });

  it('should create an empty matrix, sparse', function () {
    _assert2.default.deepEqual(ones('sparse'), matrix('sparse'));
    _assert2.default.deepEqual(ones([], 'sparse'), matrix([], 'sparse'));
    _assert2.default.deepEqual(ones(matrix([]), 'sparse'), matrix('sparse'));
  });

  it('should create a vector with ones', function () {
    _assert2.default.deepEqual(ones(3), matrix([1, 1, 1]));
    _assert2.default.deepEqual(ones(matrix([4])), matrix([1, 1, 1, 1]));
    _assert2.default.deepEqual(ones([4]), [1, 1, 1, 1]);
    _assert2.default.deepEqual(ones(0), matrix([]));
  });

  it('should create a 2D matrix with ones', function () {
    _assert2.default.deepEqual(ones(2, 3), matrix([[1, 1, 1], [1, 1, 1]]));
    _assert2.default.deepEqual(ones(3, 2), matrix([[1, 1], [1, 1], [1, 1]]));
    _assert2.default.deepEqual(ones([3, 2]), [[1, 1], [1, 1], [1, 1]]);
  });

  it('should create a matrix with ones from a matrix', function () {
    _assert2.default.deepEqual(ones(matrix([3])), matrix([1, 1, 1]));
    _assert2.default.deepEqual(ones(matrix([3, 2])), matrix([[1, 1], [1, 1], [1, 1]]));
  });

  it('should create a matrix with bignumber ones', function () {
    var one = _index.indexjs.bignumber(1);
    var three = _index.indexjs.bignumber(3);
    _assert2.default.deepEqual(ones(three), matrix([one, one, one]));
    _assert2.default.deepEqual(ones([three]), [one, one, one]);
  });

  it('should create a 3D matrix with ones', function () {
    var res = [[[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]], [[1, 1, 1, 1], [1, 1, 1, 1], [1, 1, 1, 1]]];
    _assert2.default.deepEqual(ones(2, 3, 4), matrix(res));
    _assert2.default.deepEqual(ones(matrix([2, 3, 4])), matrix(res));
    _assert2.default.deepEqual(ones([2, 3, 4]), res);
  });

  // TODO: test setting `matrix`

  it('should create a matrix with ones with the same size as original matrix', function () {
    var a = matrix([[1, 2, 3], [4, 5, 6]]);
    _assert2.default.deepEqual(ones(_index.indexjs.size(a)).size(), a.size());
  });

  // TODO: test with invalid input

  it('should LaTeX ones', function () {
    var expression = _index.indexjs.parse('ones(2)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{ones}\\left(2\\right)');
  });
});
