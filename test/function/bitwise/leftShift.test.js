"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test leftShift
var matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    bignumber = _index.indexjs.bignumber,
    leftShift = _index.indexjs.leftShift;

describe('leftShift', function () {

  it('should left shift a number by a given amount', function () {
    _assert2.default.equal(leftShift(0, 1000), 0);
    _assert2.default.equal(leftShift(2, 0), 2);
    _assert2.default.equal(leftShift(2, 3), 16);
    _assert2.default.equal(leftShift(2, 4), 32);
    _assert2.default.equal(leftShift(-2, 2), -8);
    _assert2.default.equal(leftShift(3, 3), 24);
    _assert2.default.equal(leftShift(-3, 2), -12);
    _assert2.default.equal(leftShift(-3, 3), -24);
  });

  it('should left shift booleans by a boolean amount', function () {
    _assert2.default.equal(leftShift(true, true), 2);
    _assert2.default.equal(leftShift(true, false), 1);
    _assert2.default.equal(leftShift(false, true), 0);
    _assert2.default.equal(leftShift(false, false), 0);
  });

  it('should left shift with a mix of numbers and booleans', function () {
    _assert2.default.equal(leftShift(2, true), 4);
    _assert2.default.equal(leftShift(2, false), 2);
    _assert2.default.equal(leftShift(true, 2), 4);
    _assert2.default.equal(leftShift(false, 2), 0);
  });

  it('should left shift numbers and null', function () {
    _assert2.default.equal(leftShift(1, null), 1);
    _assert2.default.equal(leftShift(null, 1), 0);
  });

  it('should left shift bignumbers', function () {
    _assert2.default.deepEqual(leftShift(bignumber(2), bignumber(3)), bignumber(16));
    _assert2.default.deepEqual(leftShift(bignumber(500), bignumber(100)), bignumber('633825300114114700748351602688000'));
    _assert2.default.deepEqual(leftShift(bignumber(-1), bignumber(2)), bignumber(-4));
    _assert2.default.equal(leftShift(bignumber(0), bignumber(-2)).isNaN(), true);
    _assert2.default.deepEqual(leftShift(bignumber(Infinity), bignumber(2)).toString(), 'Infinity');
    _assert2.default.equal(leftShift(bignumber(Infinity), bignumber(Infinity)).isNaN(), true);
  });

  it('should left shift mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(leftShift(bignumber(2), 3), bignumber(16));
    _assert2.default.deepEqual(leftShift(bignumber(500), 100), bignumber('633825300114114700748351602688000'));
    _assert2.default.deepEqual(leftShift(2, bignumber(3)), bignumber(16));
    _assert2.default.deepEqual(leftShift(-1, bignumber(2)), bignumber(-4));
    _assert2.default.deepEqual(leftShift(bignumber(-1), 2), bignumber(-4));
    _assert2.default.equal(leftShift(bignumber(0), -2).isNaN(), true);
    _assert2.default.equal(leftShift(bignumber(Infinity), Infinity).isNaN(), true);
  });

  it('should left shift mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(leftShift(true, bignumber(3)), bignumber(8));
    _assert2.default.deepEqual(leftShift(false, bignumber(3)), bignumber(0));
    _assert2.default.deepEqual(leftShift(bignumber(3), false), bignumber(3));
    _assert2.default.deepEqual(leftShift(bignumber(3), true), bignumber(6));
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      leftShift(_index.indexjs.unit('5cm'), 2);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      leftShift(2, _index.indexjs.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      leftShift(_index.indexjs.unit('2cm'), _index.indexjs.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error if the parameters are not integers', function () {
    _assert2.default.throws(function () {
      leftShift(1.1, 1);
    }, /Integers expected in function leftShift/);
    _assert2.default.throws(function () {
      leftShift(1, 1.1);
    }, /Integers expected in function leftShift/);
    _assert2.default.throws(function () {
      leftShift(1.1, 1.1);
    }, /Integers expected in function leftShift/);
    _assert2.default.throws(function () {
      leftShift(bignumber(1.1), 1);
    }, /Integers expected in function leftShift/);
    _assert2.default.throws(function () {
      leftShift(1, bignumber(1.1));
    }, /Integers expected in function leftShift/);
    _assert2.default.throws(function () {
      leftShift(bignumber(1.1), bignumber(1));
    }, /Integers expected in function leftShift/);
    _assert2.default.throws(function () {
      leftShift(bignumber(1), bignumber(1.1));
    }, /Integers expected in function leftShift/);
  });

  describe('Array', function () {

    it('should left shift array and scalar', function () {
      _assert2.default.deepEqual(leftShift([[1, 2], [8, 0]], 2), [[4, 8], [32, 0]]);
      _assert2.default.deepEqual(leftShift(2, [[1, 2], [8, 0]]), [[4, 8], [512, 2]]);
    });

    it('should left shift array - array', function () {
      _assert2.default.deepEqual(leftShift([[1, 2], [8, 0]], [[4, 8], [32, 0]]), [[16, 512], [8, 0]]);
      _assert2.default.deepEqual(leftShift([[4, 8], [32, 0]], [[1, 2], [8, 0]]), [[8, 32], [8192, 0]]);
    });

    it('should left shift array - dense matrix', function () {
      _assert2.default.deepEqual(leftShift([[1, 2], [8, 0]], matrix([[4, 8], [32, 0]])), matrix([[16, 512], [8, 0]]));
      _assert2.default.deepEqual(leftShift([[4, 8], [32, 0]], matrix([[1, 2], [8, 0]])), matrix([[8, 32], [8192, 0]]));
    });

    it('should left shift array - sparse matrix', function () {
      _assert2.default.deepEqual(leftShift([[1, 2], [8, 0]], sparse([[4, 8], [32, 0]])), matrix([[16, 512], [8, 0]]));
      _assert2.default.deepEqual(leftShift([[4, 8], [32, 0]], sparse([[1, 2], [8, 0]])), matrix([[8, 32], [8192, 0]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should left shift dense matrix and scalar', function () {
      _assert2.default.deepEqual(leftShift(matrix([[1, 2], [8, 0]]), 2), matrix([[4, 8], [32, 0]]));
      _assert2.default.deepEqual(leftShift(2, matrix([[1, 2], [8, 0]])), matrix([[4, 8], [512, 2]]));
    });

    it('should left shift dense matrix - array', function () {
      _assert2.default.deepEqual(leftShift(matrix([[1, 2], [8, 0]]), [[4, 8], [32, 0]]), matrix([[16, 512], [8, 0]]));
      _assert2.default.deepEqual(leftShift(matrix([[4, 8], [32, 0]]), [[1, 2], [8, 0]]), matrix([[8, 32], [8192, 0]]));
    });

    it('should left shift dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(leftShift(matrix([[1, 2], [8, 0]]), matrix([[4, 8], [32, 0]])), matrix([[16, 512], [8, 0]]));
      _assert2.default.deepEqual(leftShift(matrix([[4, 8], [32, 0]]), matrix([[1, 2], [8, 0]])), matrix([[8, 32], [8192, 0]]));
    });

    it('should left shift dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(leftShift(matrix([[1, 2], [8, 0]]), sparse([[4, 8], [32, 0]])), matrix([[16, 512], [8, 0]]));
      _assert2.default.deepEqual(leftShift(matrix([[4, 8], [32, 0]]), sparse([[1, 2], [8, 0]])), matrix([[8, 32], [8192, 0]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should left shift sparse matrix and scalar', function () {
      _assert2.default.deepEqual(leftShift(sparse([[1, 2], [8, 0]]), 2), sparse([[4, 8], [32, 0]]));
      _assert2.default.deepEqual(leftShift(2, sparse([[1, 2], [8, 0]])), matrix([[4, 8], [512, 2]]));
    });

    it('should left shift sparse matrix - array', function () {
      _assert2.default.deepEqual(leftShift(sparse([[1, 2], [8, 0]]), [[4, 8], [32, 0]]), sparse([[16, 512], [8, 0]]));
      _assert2.default.deepEqual(leftShift(sparse([[4, 8], [32, 0]]), [[1, 2], [8, 0]]), sparse([[8, 32], [8192, 0]]));
    });

    it('should left shift sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(leftShift(sparse([[1, 2], [8, 0]]), matrix([[4, 8], [32, 0]])), sparse([[16, 512], [8, 0]]));
      _assert2.default.deepEqual(leftShift(sparse([[4, 8], [32, 0]]), matrix([[1, 2], [8, 0]])), sparse([[8, 32], [8192, 0]]));
    });

    it('should left shift sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(leftShift(sparse([[1, 2], [8, 0]]), sparse([[4, 8], [32, 0]])), sparse([[16, 512], [8, 0]]));
      _assert2.default.deepEqual(leftShift(sparse([[4, 8], [32, 0]]), sparse([[1, 2], [8, 0]])), sparse([[8, 32], [8192, 0]]));
    });
  });

  it('should throw an error if used with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      leftShift(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      leftShift(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      leftShift(new Date(), true);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      leftShift(true, new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      leftShift(true, undefined);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      leftShift(undefined, true);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX leftShift', function () {
    var expression = _index.indexjs.parse('leftShift(2,3)');
    _assert2.default.equal(expression.toTex(), '\\left(2<<3\\right)');
  });
});
