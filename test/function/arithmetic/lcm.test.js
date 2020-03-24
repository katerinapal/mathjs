"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    lcm = _index.indexjs.lcm;

describe('lcm', function () {

  it('should find the lowest common multiple of two or more numbers', function () {
    _assert2.default.equal(lcm(4, 6), 12);
    _assert2.default.equal(lcm(4, -6), 12);
    _assert2.default.equal(lcm(6, 4), 12);
    _assert2.default.equal(lcm(-6, 4), 12);
    _assert2.default.equal(lcm(-6, -4), 12);
    _assert2.default.equal(lcm(21, 6), 42);
    _assert2.default.equal(lcm(3, -4, 24), 24);

    _assert2.default.throws(function () {
      lcm(1);
    }, /TypeError: Too few arguments/);
  });

  it('should calculate lcm for edge cases around zero', function () {
    _assert2.default.equal(lcm(3, 0), 0);
    _assert2.default.equal(lcm(-3, 0), 0);
    _assert2.default.equal(lcm(0, 3), 0);
    _assert2.default.equal(lcm(0, -3), 0);
    _assert2.default.equal(lcm(0, 0), 0);

    _assert2.default.equal(lcm(1, 1), 1);
    _assert2.default.equal(lcm(1, 0), 0);
    _assert2.default.equal(lcm(1, -1), 1);
    _assert2.default.equal(lcm(-1, 1), 1);
    _assert2.default.equal(lcm(-1, 0), 0);
    _assert2.default.equal(lcm(-1, -1), 1);
    _assert2.default.equal(lcm(0, 1), 0);
    _assert2.default.equal(lcm(0, -1), 0);
    _assert2.default.equal(lcm(0, 0), 0);
  });

  it('should calculate lcm for BigNumbers', function () {
    _assert2.default.deepEqual(lcm(_index.indexjs.bignumber(4), _index.indexjs.bignumber(6)), _index.indexjs.bignumber(12));
    _assert2.default.deepEqual(lcm(_index.indexjs.bignumber(4), _index.indexjs.bignumber(6)), _index.indexjs.bignumber(12));
  });

  it('should calculate lcm for mixed BigNumbers and Numbers', function () {
    _assert2.default.deepEqual(lcm(_index.indexjs.bignumber(4), 6), _index.indexjs.bignumber(12));
    _assert2.default.deepEqual(lcm(4, _index.indexjs.bignumber(6)), _index.indexjs.bignumber(12));
  });

  it('should find the lowest common multiple of booleans', function () {
    _assert2.default.equal(lcm(true, true), 1);
    _assert2.default.equal(lcm(true, false), 0);
    _assert2.default.equal(lcm(false, true), 0);
    _assert2.default.equal(lcm(false, false), 0);
  });

  it('should find the lowest common multiple of numbers and null', function () {
    _assert2.default.equal(lcm(1, null), 0);
    _assert2.default.equal(lcm(null, 1), 0);
    _assert2.default.equal(lcm(null, null), 0);
  });

  it('should throw an error for non-integer numbers', function () {
    _assert2.default.throws(function () {
      lcm(2, 4.1);
    }, /Parameters in function lcm must be integer numbers/);
    _assert2.default.throws(function () {
      lcm(2.3, 4);
    }, /Parameters in function lcm must be integer numbers/);
  });

  it('should throw an error with complex numbers', function () {
    _assert2.default.throws(function () {
      lcm(_index.indexjs.complex(1, 3), 2);
    }, TypeError, 'Function lcm(complex, number) not supported');
  });

  it('should convert strings to numbers', function () {
    _assert2.default.equal(lcm('4', '6'), 12);
    _assert2.default.equal(lcm('4', 6), 12);
    _assert2.default.equal(lcm(4, '6'), 12);

    _assert2.default.throws(function () {
      lcm('a', 2);
    }, /Cannot convert "a" to a number/);
  });

  it('should find the least common multiple of fractions', function () {
    var a = _index.indexjs.fraction(5, 8);
    _assert2.default.equal(lcm(a, _index.indexjs.fraction(3, 7)).toString(), '15');
    _assert2.default.equal(a.toString(), '0.625');
  });

  it('should find the least common multiple of mixed numbers and fractions', function () {
    _assert2.default.deepEqual(lcm(_index.indexjs.fraction(12), 8), _index.indexjs.fraction(24));
    _assert2.default.deepEqual(lcm(12, _index.indexjs.fraction(8)), _index.indexjs.fraction(24));
  });

  it('should find the least common even for edge cases', function () {
    _assert2.default.deepEqual(lcm(_index.indexjs.fraction(-3), _index.indexjs.fraction(3)), _index.indexjs.fraction(3));
    _assert2.default.deepEqual(lcm(_index.indexjs.fraction(3), _index.indexjs.fraction(-3)), _index.indexjs.fraction(3));
    _assert2.default.deepEqual(lcm(_index.indexjs.fraction(0), _index.indexjs.fraction(3)), _index.indexjs.fraction(0));
    _assert2.default.deepEqual(lcm(_index.indexjs.fraction(3), _index.indexjs.fraction(0)), _index.indexjs.fraction(0));
    _assert2.default.deepEqual(lcm(_index.indexjs.fraction(0), _index.indexjs.fraction(0)), _index.indexjs.fraction(0));
    _assert2.default.deepEqual(lcm(_index.indexjs.fraction(200), _index.indexjs.fraction(333)), _index.indexjs.fraction(66600));
    _assert2.default.deepEqual(lcm(_index.indexjs.fraction(9999), _index.indexjs.fraction(8888)), _index.indexjs.fraction(79992));
  });

  it('should throw an error with units', function () {
    _assert2.default.throws(function () {
      lcm(_index.indexjs.unit('5cm'), 2);
    }, TypeError, 'Function lcm(unit, number) not supported');
  });

  describe('Array', function () {

    it('should find the greatest common divisor array - scalar', function () {
      _assert2.default.deepEqual(lcm([5, 18, 3], 3), [15, 18, 3]);
      _assert2.default.deepEqual(lcm(3, [5, 18, 3]), [15, 18, 3]);
    });

    it('should find the greatest common divisor array - array', function () {
      _assert2.default.deepEqual(lcm([5, 2, 3], [25, 3, 6]), [25, 6, 6]);
    });

    it('should find the greatest common divisor array - dense matrix', function () {
      _assert2.default.deepEqual(lcm([5, 2, 3], matrix([25, 3, 6])), matrix([25, 6, 6]));
    });

    it('should find the greatest common divisor array - sparse matrix', function () {
      _assert2.default.deepEqual(lcm([[5, 2, 3], [3, 2, 5]], sparse([[0, 3, 6], [6, 0, 25]])), sparse([[0, 6, 6], [6, 0, 25]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should find the greatest common divisor dense matrix - scalar', function () {
      _assert2.default.deepEqual(lcm(matrix([5, 18, 3]), 3), matrix([15, 18, 3]));
      _assert2.default.deepEqual(lcm(3, matrix([5, 18, 3])), matrix([15, 18, 3]));
    });

    it('should find the greatest common divisor dense matrix - array', function () {
      _assert2.default.deepEqual(lcm(matrix([5, 2, 3]), [25, 3, 6]), matrix([25, 6, 6]));
    });

    it('should find the greatest common divisor dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(lcm(matrix([5, 2, 3]), matrix([25, 3, 6])), matrix([25, 6, 6]));
    });

    it('should find the greatest common divisor dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(lcm(matrix([[5, 2, 3], [3, 2, 5]]), sparse([[0, 3, 6], [6, 0, 25]])), sparse([[0, 6, 6], [6, 0, 25]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should find the greatest common divisor sparse matrix - scalar', function () {
      _assert2.default.deepEqual(lcm(sparse([[5, 0, 3], [0, 18, 0]]), 3), sparse([[15, 0, 3], [0, 18, 0]]));
      _assert2.default.deepEqual(lcm(3, sparse([[5, 0, 3], [0, 18, 0]])), sparse([[15, 0, 3], [0, 18, 0]]));
    });

    it('should find the greatest common divisor sparse matrix - array', function () {
      _assert2.default.deepEqual(lcm(sparse([[5, 2, 3], [3, 2, 5]]), [[0, 3, 6], [6, 0, 25]]), sparse([[0, 6, 6], [6, 0, 25]]));
    });

    it('should find the greatest common divisor sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(lcm(sparse([[5, 2, 3], [3, 2, 5]]), matrix([[0, 3, 6], [6, 0, 25]])), sparse([[0, 6, 6], [6, 0, 25]]));
    });

    it('should find the greatest common divisor sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(lcm(sparse([[5, 2, 3], [3, 2, 5]]), sparse([[0, 3, 6], [6, 0, 25]])), sparse([[0, 6, 6], [6, 0, 25]]));
    });
  });

  it('should LaTeX lcm', function () {
    var expression = _index.indexjs.parse('lcm(2,3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{lcm}\\left(2,3\\right)');
  });
});
