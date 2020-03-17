'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test rightLogShift
var math = require('../../../index'),
    matrix = math.matrix,
    sparse = math.sparse,
    rightLogShift = math.rightLogShift;

describe('rightLogShift', function () {

  it('should right logically shift a number by a given amount', function () {
    _assert2.default.equal(rightLogShift(0, 1000), 0);
    _assert2.default.equal(rightLogShift(2, 0), 2);
    _assert2.default.equal(rightLogShift(12, 3), 1);
    _assert2.default.equal(rightLogShift(32, 4), 2);
    _assert2.default.equal(rightLogShift(-1, 1000), 16777215);
    _assert2.default.equal(rightLogShift(-12, 2), 1073741821);
    _assert2.default.equal(rightLogShift(122, 3), 15);
    _assert2.default.equal(rightLogShift(-13, 2), 1073741820);
    _assert2.default.equal(rightLogShift(-13, 3), 536870910);
  });

  it('should right logically shift booleans by a boolean amount', function () {
    _assert2.default.equal(rightLogShift(true, true), 0);
    _assert2.default.equal(rightLogShift(true, false), 1);
    _assert2.default.equal(rightLogShift(false, true), 0);
    _assert2.default.equal(rightLogShift(false, false), 0);
  });

  it('should right logically shift with a mix of numbers and booleans', function () {
    _assert2.default.equal(rightLogShift(2, true), 1);
    _assert2.default.equal(rightLogShift(2, false), 2);
    _assert2.default.equal(rightLogShift(true, 0), 1);
    _assert2.default.equal(rightLogShift(true, 1), 0);
    _assert2.default.equal(rightLogShift(false, 2), 0);
  });

  it('should right logically shift numbers and null', function () {
    _assert2.default.equal(rightLogShift(1, null), 1);
    _assert2.default.equal(rightLogShift(null, 1), 0);
  });

  it('should throw an error if the parameters are not integers', function () {
    _assert2.default.throws(function () {
      rightLogShift(1.1, 1);
    }, /Integers expected in function rightLogShift/);
    _assert2.default.throws(function () {
      rightLogShift(1, 1.1);
    }, /Integers expected in function rightLogShift/);
    _assert2.default.throws(function () {
      rightLogShift(1.1, 1.1);
    }, /Integers expected in function rightLogShift/);
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      rightLogShift(math.unit('5cm'), 2);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightLogShift(2, math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightLogShift(math.unit('2cm'), math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  describe('Array', function () {

    it('should right arithmetically shift array - scalar', function () {
      _assert2.default.deepEqual(rightLogShift([[4, 8], [8, 0]], 2), [[1, 2], [2, 0]]);
      _assert2.default.deepEqual(rightLogShift([[4, 8], [12, 16]], 2), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual(rightLogShift(2, [[1, 2], [8, 0]]), [[1, 0], [0, 2]]);
    });

    it('should right arithmetically shift array - array', function () {
      _assert2.default.deepEqual(rightLogShift([[1, 2], [8, 0]], [[4, 8], [32, 0]]), [[0, 0], [8, 0]]);
      _assert2.default.deepEqual(rightLogShift([[4, 8], [32, 0]], [[1, 2], [8, 0]]), [[2, 2], [0, 0]]);
    });

    it('should right arithmetically shift array - dense matrix', function () {
      _assert2.default.deepEqual(rightLogShift([[1, 2], [8, 0]], matrix([[4, 8], [32, 0]])), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightLogShift([[4, 8], [32, 0]], matrix([[1, 2], [8, 0]])), matrix([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift array - sparse matrix', function () {
      _assert2.default.deepEqual(rightLogShift([[1, 2], [8, 0]], sparse([[4, 8], [32, 0]])), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightLogShift([[4, 8], [32, 0]], sparse([[1, 2], [8, 0]])), matrix([[2, 2], [0, 0]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should right arithmetically shift dense matrix - scalar', function () {
      _assert2.default.deepEqual(rightLogShift(matrix([[4, 8], [8, 0]]), 2), matrix([[1, 2], [2, 0]]));
      _assert2.default.deepEqual(rightLogShift(matrix([[4, 8], [12, 16]]), 2), matrix([[1, 2], [3, 4]]));
      _assert2.default.deepEqual(rightLogShift(2, matrix([[1, 2], [8, 0]])), matrix([[1, 0], [0, 2]]));
    });

    it('should right arithmetically shift dense matrix - array', function () {
      _assert2.default.deepEqual(rightLogShift(matrix([[1, 2], [8, 0]]), [[4, 8], [32, 0]]), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightLogShift(matrix([[4, 8], [32, 0]]), [[1, 2], [8, 0]]), matrix([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(rightLogShift(matrix([[1, 2], [8, 0]]), matrix([[4, 8], [32, 0]])), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightLogShift(matrix([[4, 8], [32, 0]]), matrix([[1, 2], [8, 0]])), matrix([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(rightLogShift(matrix([[1, 2], [8, 0]]), sparse([[4, 8], [32, 0]])), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightLogShift(matrix([[4, 8], [32, 0]]), sparse([[1, 2], [8, 0]])), matrix([[2, 2], [0, 0]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should right arithmetically shift sparse matrix - scalar', function () {
      _assert2.default.deepEqual(rightLogShift(sparse([[4, 8], [8, 0]]), 2), sparse([[1, 2], [2, 0]]));
      _assert2.default.deepEqual(rightLogShift(sparse([[4, 8], [12, 16]]), 2), sparse([[1, 2], [3, 4]]));
      _assert2.default.deepEqual(rightLogShift(2, sparse([[1, 2], [8, 0]])), matrix([[1, 0], [0, 2]]));
    });

    it('should right arithmetically shift sparse matrix - array', function () {
      _assert2.default.deepEqual(rightLogShift(sparse([[1, 2], [8, 0]]), [[4, 8], [32, 0]]), sparse([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightLogShift(sparse([[4, 8], [32, 0]]), [[1, 2], [8, 0]]), sparse([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(rightLogShift(sparse([[1, 2], [8, 0]]), matrix([[4, 8], [32, 0]])), sparse([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightLogShift(sparse([[4, 8], [32, 0]]), matrix([[1, 2], [8, 0]])), sparse([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(rightLogShift(sparse([[1, 2], [8, 0]]), sparse([[4, 8], [32, 0]])), sparse([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightLogShift(sparse([[4, 8], [32, 0]]), sparse([[1, 2], [8, 0]])), sparse([[2, 2], [0, 0]]));
    });
  });

  it('should throw an error if used with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      rightLogShift(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      rightLogShift(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      rightLogShift(new Date(), true);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightLogShift(true, new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightLogShift(true, undefined);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightLogShift(undefined, true);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX rightLogShift', function () {
    var expression = math.parse('rightLogShift(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1>>>2\\right)');
  });
});
