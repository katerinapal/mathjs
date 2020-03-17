'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test zeros
var math = require('../../../index'),
    zeros = math.zeros,
    matrix = math.matrix;

describe('zeros', function () {

  it('should create an empty matrix', function () {
    _assert2.default.deepEqual(zeros(), matrix());
    _assert2.default.deepEqual(zeros([]), []);
    _assert2.default.deepEqual(zeros(matrix([])), matrix());
  });

  it('should create an empty matrix, sparse', function () {
    _assert2.default.deepEqual(zeros('sparse'), matrix('sparse'));
    _assert2.default.deepEqual(zeros([], 'sparse'), matrix([], 'sparse'));
    _assert2.default.deepEqual(zeros(matrix([]), 'sparse'), matrix('sparse'));
  });

  it('should create a vector with zeros', function () {
    _assert2.default.deepEqual(zeros(3), matrix([0, 0, 0]));
    _assert2.default.deepEqual(zeros(matrix([4])), matrix([0, 0, 0, 0]));
    _assert2.default.deepEqual(zeros([4]), [0, 0, 0, 0]);
    _assert2.default.deepEqual(zeros(0), matrix([]));
  });

  it('should create a matrix with bignumber zeros', function () {
    var zero = math.bignumber(0);
    var three = math.bignumber(3);
    _assert2.default.deepEqual(zeros(three), matrix([zero, zero, zero]));
    _assert2.default.deepEqual(zeros([three]), [zero, zero, zero]);
  });

  it('should create a 2D matrix with zeros from an array', function () {
    _assert2.default.deepEqual(zeros(2, 3), matrix([[0, 0, 0], [0, 0, 0]]));
    _assert2.default.deepEqual(zeros(3, 2), matrix([[0, 0], [0, 0], [0, 0]]));
    _assert2.default.deepEqual(zeros([3, 2]), [[0, 0], [0, 0], [0, 0]]);
  });

  it('should create a matrix with zeros from a matrix', function () {
    _assert2.default.deepEqual(zeros(matrix([3])), matrix([0, 0, 0]));
    _assert2.default.deepEqual(zeros(matrix([3, 2])), matrix([[0, 0], [0, 0], [0, 0]]));
  });

  it('should create a 3D matrix with zeros', function () {
    var res = [[[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]];

    _assert2.default.deepEqual(zeros(2, 3, 4), matrix(res));
    _assert2.default.deepEqual(zeros(matrix([2, 3, 4])), matrix(res));
    _assert2.default.deepEqual(zeros([2, 3, 4]), res);
  });

  // TODO: test setting `matrix`

  it('should create a matrix with zeros with the same size as original matrix', function () {
    var a = matrix([[1, 2, 3], [4, 5, 6]]);
    _assert2.default.deepEqual(zeros(math.size(a)).size(), a.size());
  });

  // TODO: test with invalid input

  it('should LaTeX zeros', function () {
    var expression = math.parse('zeros(2,3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{zeros}\\left(2,3\\right)');
  });
});
