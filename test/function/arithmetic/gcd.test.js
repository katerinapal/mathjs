"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test gcd
var matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    gcd = _index.indexjs.gcd;

describe('gcd', function () {

  it('should find the greatest common divisor of two or more numbers', function () {
    _assert2.default.strictEqual(gcd(12, 8), 4);
    _assert2.default.strictEqual(gcd(8, 12), 4);
    _assert2.default.strictEqual(gcd(8, -12), 4);
    _assert2.default.strictEqual(gcd(-12, 8), 4);
    _assert2.default.strictEqual(gcd(12, -8), 4);
    _assert2.default.strictEqual(gcd(15, 3), 3);
    _assert2.default.strictEqual(gcd(25, 15, -10, 30), 5);
  });

  it('should calculate gcd for edge cases around zero', function () {
    _assert2.default.strictEqual(gcd(3, 0), 3);
    _assert2.default.strictEqual(gcd(-3, 0), 3);
    _assert2.default.strictEqual(gcd(0, 3), 3);
    _assert2.default.strictEqual(gcd(0, -3), 3);
    _assert2.default.strictEqual(gcd(0, 0), 0);

    _assert2.default.strictEqual(gcd(1, 1), 1);
    _assert2.default.strictEqual(gcd(1, 0), 1);
    _assert2.default.strictEqual(gcd(1, -1), 1);
    _assert2.default.strictEqual(gcd(-1, 1), 1);
    _assert2.default.strictEqual(gcd(-1, 0), 1);
    _assert2.default.strictEqual(gcd(-1, -1), 1);
    _assert2.default.strictEqual(gcd(0, 1), 1);
    _assert2.default.strictEqual(gcd(0, -1), 1);
    _assert2.default.strictEqual(gcd(0, 0), 0);
  });

  it('should calculate gcd for edge cases with negative values', function () {
    _assert2.default.deepEqual(1, gcd(2, 5));
    _assert2.default.deepEqual(1, gcd(2, -5));
    _assert2.default.deepEqual(1, gcd(-2, 5));
    _assert2.default.deepEqual(1, gcd(-2, -5));

    _assert2.default.deepEqual(2, gcd(2, 6));
    _assert2.default.deepEqual(2, gcd(2, -6));
    _assert2.default.deepEqual(2, gcd(-2, 6));
    _assert2.default.deepEqual(2, gcd(-2, -6));
  });

  it('should calculate gcd for BigNumbers', function () {
    _assert2.default.deepEqual(gcd(_index.indexjs.bignumber(12), _index.indexjs.bignumber(8)), _index.indexjs.bignumber(4));
    _assert2.default.deepEqual(gcd(_index.indexjs.bignumber(8), _index.indexjs.bignumber(12)), _index.indexjs.bignumber(4));
  });

  it('should calculate gcd for mixed BigNumbers and Numbers', function () {
    _assert2.default.deepEqual(gcd(_index.indexjs.bignumber(12), 8), _index.indexjs.bignumber(4));
    _assert2.default.deepEqual(gcd(8, _index.indexjs.bignumber(12)), _index.indexjs.bignumber(4));
  });

  it('should find the greatest common divisor of fractions', function () {
    var a = _index.indexjs.fraction(5, 8);
    _assert2.default.equal(gcd(a, _index.indexjs.fraction(3, 7)).toString(), '0.017(857142)');
    _assert2.default.equal(a.toString(), '0.625');
  });

  it('should find the greatest common divisor of mixed numbers and fractions', function () {
    _assert2.default.deepEqual(gcd(_index.indexjs.fraction(12), 8), _index.indexjs.fraction(4));
    _assert2.default.deepEqual(gcd(12, _index.indexjs.fraction(8)), _index.indexjs.fraction(4));
  });

  it('should find the greatest common divisor of booleans', function () {
    _assert2.default.equal(gcd(true, true), 1);
    _assert2.default.equal(gcd(true, false), 1);
    _assert2.default.equal(gcd(false, true), 1);
    _assert2.default.equal(gcd(false, false), 0);
  });

  it('should find the greatest common divisor of numbers and null', function () {
    _assert2.default.equal(gcd(1, null), 1);
    _assert2.default.equal(gcd(null, 1), 1);
    _assert2.default.equal(gcd(null, null), 0);
  });

  it('should throw an error if only one argument', function () {
    _assert2.default.throws(function () {
      gcd(1);
    }, /TypeError: Too few arguments/);
  });

  it('should throw an error for non-integer numbers', function () {
    _assert2.default.throws(function () {
      gcd(2, 4.1);
    }, /Parameters in function gcd must be integer numbers/);
    _assert2.default.throws(function () {
      gcd(2.3, 4);
    }, /Parameters in function gcd must be integer numbers/);
  });

  it('should throw an error with complex numbers', function () {
    _assert2.default.throws(function () {
      gcd(_index.indexjs.complex(1, 3), 2);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should convert strings to numbers', function () {
    _assert2.default.strictEqual(gcd('12', '8'), 4);
    _assert2.default.strictEqual(gcd(12, '8'), 4);
    _assert2.default.strictEqual(gcd('12', 8), 4);

    _assert2.default.throws(function () {
      gcd('a', 8);
    }, /Cannot convert "a" to a number/);
  });

  it('should throw an error with units', function () {
    _assert2.default.throws(function () {
      gcd(_index.indexjs.unit('5cm'), 2);
    }, /TypeError: Unexpected type of argument/);
  });

  describe('Array', function () {

    it('should find the greatest common divisor array - scalar', function () {
      _assert2.default.deepEqual(gcd([5, 18, 3], 3), [1, 3, 3]);
      _assert2.default.deepEqual(gcd(3, [5, 18, 3]), [1, 3, 3]);
    });

    it('should find the greatest common divisor array - array', function () {
      _assert2.default.deepEqual(gcd([5, 2, 3], [25, 3, 6]), [5, 1, 3]);
    });

    it('should find the greatest common divisor array - dense matrix', function () {
      _assert2.default.deepEqual(gcd([5, 2, 3], matrix([25, 3, 6])), matrix([5, 1, 3]));
    });

    it('should find the greatest common divisor array - sparse matrix', function () {
      _assert2.default.deepEqual(gcd([[5, 2, 3], [3, 2, 5]], sparse([[0, 3, 6], [6, 0, 25]])), matrix([[5, 1, 3], [3, 2, 5]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should find the greatest common divisor dense matrix - scalar', function () {
      _assert2.default.deepEqual(gcd(matrix([5, 18, 3]), 3), matrix([1, 3, 3]));
      _assert2.default.deepEqual(gcd(3, matrix([5, 18, 3])), matrix([1, 3, 3]));
    });

    it('should find the greatest common divisor dense matrix - array', function () {
      _assert2.default.deepEqual(gcd(matrix([5, 2, 3]), [25, 3, 6]), matrix([5, 1, 3]));
    });

    it('should find the greatest common divisor dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(gcd(matrix([5, 2, 3]), matrix([25, 3, 6])), matrix([5, 1, 3]));
    });

    it('should find the greatest common divisor dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(gcd(matrix([[5, 2, 3], [3, 2, 5]]), sparse([[0, 3, 6], [6, 0, 25]])), matrix([[5, 1, 3], [3, 2, 5]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should find the greatest common divisor sparse matrix - scalar', function () {
      _assert2.default.deepEqual(gcd(sparse([[5, 0, 3], [0, 18, 0]]), 3), matrix([[1, 3, 3], [3, 3, 3]]));
      _assert2.default.deepEqual(gcd(3, sparse([[5, 0, 3], [0, 18, 0]])), matrix([[1, 3, 3], [3, 3, 3]]));
    });

    it('should find the greatest common divisor sparse matrix - array', function () {
      _assert2.default.deepEqual(gcd(sparse([[5, 2, 3], [3, 2, 5]]), [[0, 3, 6], [6, 0, 25]]), matrix([[5, 1, 3], [3, 2, 5]]));
    });

    it('should find the greatest common divisor sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(gcd(sparse([[5, 2, 3], [3, 2, 5]]), matrix([[0, 3, 6], [6, 0, 25]])), matrix([[5, 1, 3], [3, 2, 5]]));
    });

    it('should find the greatest common divisor sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(gcd(sparse([[5, 2, 3], [3, 2, 5]]), sparse([[0, 3, 6], [6, 0, 25]])), sparse([[5, 1, 3], [3, 2, 5]]));
    });
  });

  it('should LaTeX gcd', function () {
    var expression = _index.indexjs.parse('gcd(2,3)');
    _assert2.default.equal(expression.toTex(), '\\gcd\\left(2,3\\right)');
  });
});
