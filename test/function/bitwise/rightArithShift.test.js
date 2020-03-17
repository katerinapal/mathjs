'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test rightArithShift
var math = require('../../../index'),
    matrix = math.matrix,
    sparse = math.sparse,
    bignumber = math.bignumber,
    rightArithShift = math.rightArithShift;

describe('rightArithShift', function () {

  it('should right arithmetically shift a number by a given amount', function () {
    _assert2.default.equal(rightArithShift(0, 1000), 0);
    _assert2.default.equal(rightArithShift(2, 0), 2);
    _assert2.default.equal(rightArithShift(12, 3), 1);
    _assert2.default.equal(rightArithShift(32, 4), 2);
    _assert2.default.equal(rightArithShift(-1, 1000), -1);
    _assert2.default.equal(rightArithShift(-12, 2), -3);
    _assert2.default.equal(rightArithShift(122, 3), 15);
    _assert2.default.equal(rightArithShift(-13, 2), -4);
    _assert2.default.equal(rightArithShift(-13, 3), -2);
  });

  it('should right arithmetically shift booleans by a boolean amount', function () {
    _assert2.default.equal(rightArithShift(true, true), 0);
    _assert2.default.equal(rightArithShift(true, false), 1);
    _assert2.default.equal(rightArithShift(false, true), 0);
    _assert2.default.equal(rightArithShift(false, false), 0);
  });

  it('should right arithmetically shift with a mix of numbers and booleans', function () {
    _assert2.default.equal(rightArithShift(2, true), 1);
    _assert2.default.equal(rightArithShift(2, false), 2);
    _assert2.default.equal(rightArithShift(true, 0), 1);
    _assert2.default.equal(rightArithShift(true, 1), 0);
    _assert2.default.equal(rightArithShift(false, 2), 0);
  });

  it('should right arithmetically shift numbers and null', function () {
    _assert2.default.equal(rightArithShift(1, null), 1);
    _assert2.default.equal(rightArithShift(null, 1), 0);
  });

  it('should right arithmetically shift bignumbers', function () {
    _assert2.default.deepEqual(rightArithShift(bignumber(17), bignumber(3)), bignumber(2));
    _assert2.default.deepEqual(rightArithShift(bignumber('633825300114114700748351602688000'), bignumber(100)), bignumber(500));
    _assert2.default.deepEqual(rightArithShift(bignumber(-17), bignumber(3)), bignumber(-3));
    _assert2.default.equal(rightArithShift(bignumber(-17), bignumber(-3)).isNaN(), true);
    _assert2.default.equal(rightArithShift(bignumber(Infinity), bignumber(Infinity)).isNaN(), true);
    _assert2.default.deepEqual(rightArithShift(bignumber(-Infinity), bignumber(Infinity)), bignumber(-1));
  });

  it('should right arithmetically shift mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(rightArithShift(bignumber(17), 3), bignumber(2));
    _assert2.default.deepEqual(rightArithShift(bignumber('-633825300114114700748351602688000'), 100), bignumber(-500));
    _assert2.default.equal(rightArithShift(bignumber(-17), -3).isNaN(), true);
    _assert2.default.deepEqual(rightArithShift(17, bignumber(3)), bignumber(2));
    _assert2.default.deepEqual(rightArithShift(-17, bignumber(3)), bignumber(-3));
    _assert2.default.equal(rightArithShift(-3, bignumber(-17)).isNaN(), true);
    _assert2.default.deepEqual(rightArithShift(bignumber(-Infinity), Infinity), bignumber(-1));
    _assert2.default.equal(rightArithShift(bignumber(Infinity), Infinity).isNaN(), true);
    _assert2.default.equal(rightArithShift(Infinity, bignumber(Infinity)).isNaN(), true);
  });

  it('should right arithmetically shift mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(rightArithShift(true, bignumber(0)), bignumber(1));
    _assert2.default.deepEqual(rightArithShift(false, bignumber('1000000')), bignumber(0));
    _assert2.default.deepEqual(rightArithShift(bignumber(3), false), bignumber(3));
    _assert2.default.deepEqual(rightArithShift(bignumber(3), true), bignumber(1));
  });

  it('should throw an error if the parameters are not integers', function () {
    _assert2.default.throws(function () {
      rightArithShift(1.1, 1);
    }, /Integers expected in function rightArithShift/);
    _assert2.default.throws(function () {
      rightArithShift(1, 1.1);
    }, /Integers expected in function rightArithShift/);
    _assert2.default.throws(function () {
      rightArithShift(1.1, 1.1);
    }, /Integers expected in function rightArithShift/);
    _assert2.default.throws(function () {
      rightArithShift(bignumber(1.1), 1);
    }, /Integers expected in function rightArithShift/);
    _assert2.default.throws(function () {
      rightArithShift(1, bignumber(1.1));
    }, /Integers expected in function rightArithShift/);
    _assert2.default.throws(function () {
      rightArithShift(bignumber(1.1), bignumber(1));
    }, /Integers expected in function rightArithShift/);
    _assert2.default.throws(function () {
      rightArithShift(bignumber(1), bignumber(1.1));
    }, /Integers expected in function rightArithShift/);
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      rightArithShift(math.unit('5cm'), 2);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightArithShift(2, math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightArithShift(math.unit('2cm'), math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  describe('Array', function () {

    it('should right arithmetically shift array - scalar', function () {
      _assert2.default.deepEqual(rightArithShift([[1, 2], [8, 0]], 2), [[0, 0], [2, 0]]);
      _assert2.default.deepEqual(rightArithShift(2, [[1, 2], [8, 0]]), [[1, 0], [0, 2]]);
    });

    it('should right arithmetically shift array - array', function () {
      _assert2.default.deepEqual(rightArithShift([[1, 2], [8, 0]], [[4, 8], [32, 0]]), [[0, 0], [8, 0]]);
      _assert2.default.deepEqual(rightArithShift([[4, 8], [32, 0]], [[1, 2], [8, 0]]), [[2, 2], [0, 0]]);
    });

    it('should right arithmetically shift array - dense matrix', function () {
      _assert2.default.deepEqual(rightArithShift([[1, 2], [8, 0]], matrix([[4, 8], [32, 0]])), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightArithShift([[4, 8], [32, 0]], matrix([[1, 2], [8, 0]])), matrix([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift array - sparse matrix', function () {
      _assert2.default.deepEqual(rightArithShift([[1, 2], [8, 0]], sparse([[4, 8], [32, 0]])), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightArithShift([[4, 8], [32, 0]], sparse([[1, 2], [8, 0]])), matrix([[2, 2], [0, 0]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should right arithmetically shift dense matrix - scalar', function () {
      _assert2.default.deepEqual(rightArithShift(matrix([[1, 2], [8, 0]]), 2), matrix([[0, 0], [2, 0]]));
      _assert2.default.deepEqual(rightArithShift(2, matrix([[1, 2], [8, 0]])), matrix([[1, 0], [0, 2]]));
    });

    it('should right arithmetically shift dense matrix - array', function () {
      _assert2.default.deepEqual(rightArithShift(matrix([[1, 2], [8, 0]]), [[4, 8], [32, 0]]), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightArithShift(matrix([[4, 8], [32, 0]]), [[1, 2], [8, 0]]), matrix([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(rightArithShift(matrix([[1, 2], [8, 0]]), matrix([[4, 8], [32, 0]])), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightArithShift(matrix([[4, 8], [32, 0]]), matrix([[1, 2], [8, 0]])), matrix([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(rightArithShift(matrix([[1, 2], [8, 0]]), sparse([[4, 8], [32, 0]])), matrix([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightArithShift(matrix([[4, 8], [32, 0]]), sparse([[1, 2], [8, 0]])), matrix([[2, 2], [0, 0]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should right arithmetically shift sparse matrix - scalar', function () {
      _assert2.default.deepEqual(rightArithShift(sparse([[1, 2], [8, 0]]), 2), sparse([[0, 0], [2, 0]]));
      _assert2.default.deepEqual(rightArithShift(2, sparse([[1, 2], [8, 0]])), matrix([[1, 0], [0, 2]]));
    });

    it('should right arithmetically shift sparse matrix - array', function () {
      _assert2.default.deepEqual(rightArithShift(sparse([[1, 2], [8, 0]]), [[4, 8], [32, 0]]), sparse([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightArithShift(sparse([[4, 8], [32, 0]]), [[1, 2], [8, 0]]), sparse([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(rightArithShift(sparse([[1, 2], [8, 0]]), matrix([[4, 8], [32, 0]])), sparse([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightArithShift(sparse([[4, 8], [32, 0]]), matrix([[1, 2], [8, 0]])), sparse([[2, 2], [0, 0]]));
    });

    it('should right arithmetically shift sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(rightArithShift(sparse([[1, 2], [8, 0]]), sparse([[4, 8], [32, 0]])), sparse([[0, 0], [8, 0]]));
      _assert2.default.deepEqual(rightArithShift(sparse([[4, 8], [32, 0]]), sparse([[1, 2], [8, 0]])), sparse([[2, 2], [0, 0]]));
    });
  });

  it('should throw an error if used with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      rightArithShift(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      rightArithShift(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      rightArithShift(new Date(), true);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightArithShift(true, new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightArithShift(true, undefined);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      rightArithShift(undefined, true);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX rightArithShift', function () {
    var expression = math.parse('rightArithShift(3,2)');
    _assert2.default.equal(expression.toTex(), '\\left(3>>2\\right)');
  });
});
