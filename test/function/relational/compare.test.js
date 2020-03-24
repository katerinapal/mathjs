"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test compare
var bignumber = _index.indexjs.bignumber,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    unit = _index.indexjs.unit,
    compare = _index.indexjs.compare;

describe('compare', function () {

  it('should compare two numbers correctly', function () {
    _assert2.default.equal(compare(2, 3), -1);
    _assert2.default.equal(compare(2, 2), 0);
    _assert2.default.equal(compare(2, 1), 1);
    _assert2.default.equal(compare(0, 0), 0);
    _assert2.default.equal(compare(-2, 2), -1);
    _assert2.default.equal(compare(-2, -3), 1);
    _assert2.default.equal(compare(-3, -2), -1);
  });

  it('should compare two floating point numbers correctly', function () {
    // Infinity
    _assert2.default.equal(compare(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), 0);
    _assert2.default.equal(compare(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), 0);
    _assert2.default.equal(compare(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), 1);
    _assert2.default.equal(compare(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), -1);
    _assert2.default.equal(compare(Number.POSITIVE_INFINITY, 2.0), 1);
    _assert2.default.equal(compare(2.0, Number.POSITIVE_INFINITY), -1);
    _assert2.default.equal(compare(Number.NEGATIVE_INFINITY, 2.0), -1);
    _assert2.default.equal(compare(2.0, Number.NEGATIVE_INFINITY), 1);
    // floating point numbers
    _assert2.default.equal(compare(0.3 - 0.2, 0.1), 0);
  });

  it('should compare two booleans', function () {
    _assert2.default.equal(compare(true, true), 0);
    _assert2.default.equal(compare(true, false), 1);
    _assert2.default.equal(compare(false, true), -1);
    _assert2.default.equal(compare(false, false), 0);
  });

  it('should compare mixed numbers and booleans', function () {
    _assert2.default.equal(compare(2, true), 1);
    _assert2.default.equal(compare(0, true), -1);
    _assert2.default.equal(compare(true, 2), -1);
    _assert2.default.equal(compare(false, 2), -1);
  });

  it('should compare mixed numbers and null', function () {
    _assert2.default.equal(compare(2, null), 1);
    _assert2.default.equal(compare(0, null), 0);
    _assert2.default.equal(compare(null, 2), -1);
  });

  it('should compare bignumbers', function () {
    _assert2.default.deepEqual(compare(bignumber(2), bignumber(3)), bignumber(-1));
    _assert2.default.deepEqual(compare(bignumber(2), bignumber(2)), bignumber(0));
    _assert2.default.deepEqual(compare(bignumber(3), bignumber(2)), bignumber(1));
    _assert2.default.deepEqual(compare(bignumber(0), bignumber(0)), bignumber(0));
    _assert2.default.deepEqual(compare(bignumber(-2), bignumber(2)), bignumber(-1));
  });

  it('should compare mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(compare(bignumber(2), 3), bignumber(-1));
    _assert2.default.deepEqual(compare(2, bignumber(2)), bignumber(0));
  });

  it('should compare mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(compare(bignumber(0.1), true), bignumber(-1));
    _assert2.default.deepEqual(compare(bignumber(1), true), bignumber(0));
    _assert2.default.deepEqual(compare(bignumber(1), false), bignumber(1));
    _assert2.default.deepEqual(compare(false, bignumber(0)), bignumber(0));
    _assert2.default.deepEqual(compare(true, bignumber(0)), bignumber(1));
  });

  it('should compare two fractions', function () {
    var a = _index.indexjs.fraction(1, 3);
    var b = _index.indexjs.fraction(1, 6);
    (0, _assert2.default)(compare(a, b) instanceof _index.indexjs.type.Fraction);
    _assert2.default.equal(a.toString(), '0.(3)');
    _assert2.default.equal(b.toString(), '0.1(6)');

    _assert2.default.equal(compare(_index.indexjs.fraction(3), _index.indexjs.fraction(2)).valueOf(), 1);
    _assert2.default.equal(compare(_index.indexjs.fraction(2), _index.indexjs.fraction(3)).valueOf(), -1);
    _assert2.default.equal(compare(_index.indexjs.fraction(3), _index.indexjs.fraction(3)).valueOf(), 0);

    _assert2.default.strictEqual(compare(_index.indexjs.add(_index.indexjs.fraction(0.1), _index.indexjs.fraction(0.2)), _index.indexjs.fraction(0.3)).valueOf(), 0); // this would fail with numbers
  });

  it('should compare mixed fractions and numbers', function () {
    _assert2.default.deepEqual(compare(1, _index.indexjs.fraction(1, 3)), _index.indexjs.fraction(1));
    _assert2.default.deepEqual(compare(_index.indexjs.fraction(1, 3), 1), _index.indexjs.fraction(-1));
  });

  it('should add two measures of the same unit', function () {
    _assert2.default.equal(compare(unit('100cm'), unit('10inch')), 1);
    _assert2.default.equal(compare(unit('99cm'), unit('1m')), -1);
    _assert2.default.equal(compare(unit('1m'), unit('1m')), bignumber(0));
    _assert2.default.equal(compare(unit('101cm'), unit('1m')), 1);
  });

  it('should throw an error if comparing a unit with a number', function () {
    _assert2.default.throws(function () {
      compare(unit('100cm'), 22);
    });
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      compare(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error if comparing a unit with a bignumber', function () {
    _assert2.default.throws(function () {
      compare(unit('100cm'), bignumber(22));
    });
  });

  it('should perform lexical comparison for two strings', function () {
    _assert2.default.equal(compare('0', 0), 0);

    _assert2.default.equal(compare('abd', 'abc'), 1);
    _assert2.default.equal(compare('abc', 'abc'), 0);
    _assert2.default.equal(compare('abc', 'abd'), -1);
  });

  describe('Array', function () {

    it('should compare array - scalar', function () {
      _assert2.default.deepEqual(compare('B', ['A', 'B', 'C']), [1, 0, -1]);
      _assert2.default.deepEqual(compare(['A', 'B', 'C'], 'B'), [-1, 0, 1]);
    });

    it('should compare array - array', function () {
      _assert2.default.deepEqual(compare([[1, 2, 0], [-1, 0, 2]], [[3, -1, 0], [-2, 1, 0]]), [[-1, 1, 0], [1, -1, 1]]);
    });

    it('should compare array - dense matrix', function () {
      _assert2.default.deepEqual(compare([[1, 2, 0], [-1, 0, 2]], matrix([[3, -1, 0], [-2, 1, 0]])), matrix([[-1, 1, 0], [1, -1, 1]]));
    });

    it('should compare array - sparse matrix', function () {
      _assert2.default.deepEqual(compare([[1, 2, 0], [-1, 0, 2]], sparse([[3, -1, 0], [-2, 1, 0]])), matrix([[-1, 1, 0], [1, -1, 1]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should compare dense matrix - scalar', function () {
      _assert2.default.deepEqual(compare('B', matrix(['A', 'B', 'C'])), matrix([1, 0, -1]));
      _assert2.default.deepEqual(compare(matrix(['A', 'B', 'C']), 'B'), matrix([-1, 0, 1]));
    });

    it('should compare dense matrix - array', function () {
      _assert2.default.deepEqual(compare(matrix([[1, 2, 0], [-1, 0, 2]]), [[3, -1, 0], [-2, 1, 0]]), matrix([[-1, 1, 0], [1, -1, 1]]));
    });

    it('should compare dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(compare(matrix([[1, 2, 0], [-1, 0, 2]]), matrix([[3, -1, 0], [-2, 1, 0]])), matrix([[-1, 1, 0], [1, -1, 1]]));
    });

    it('should compare dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(compare(matrix([[1, 2, 0], [-1, 0, 2]]), sparse([[3, -1, 0], [-2, 1, 0]])), matrix([[-1, 1, 0], [1, -1, 1]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should compare sparse matrix - scalar', function () {
      _assert2.default.deepEqual(compare('B', sparse([['A', 'B'], ['C', 'X']])), matrix([[1, 0], [-1, -1]]));
      _assert2.default.deepEqual(compare(sparse([['A', 'B'], ['C', 'X']]), 'B'), matrix([[-1, 0], [1, 1]]));
    });

    it('should compare sparse matrix - array', function () {
      _assert2.default.deepEqual(compare(sparse([[1, 2, 0], [-1, 0, 2]]), [[3, -1, 0], [-2, 1, 0]]), matrix([[-1, 1, 0], [1, -1, 1]]));
    });

    it('should compare sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(compare(sparse([[1, 2, 0], [-1, 0, 2]]), matrix([[3, -1, 0], [-2, 1, 0]])), matrix([[-1, 1, 0], [1, -1, 1]]));
    });

    it('should compare sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(compare(sparse([[1, 2, 0], [-1, 0, 2]]), sparse([[3, -1, 0], [-2, 1, 0]])), sparse([[-1, 1, 0], [1, -1, 1]]));
    });
  });

  it('should apply configuration option epsilon', function () {
    var mymath = _index.indexjs.create();

    _assert2.default.equal(mymath.compare(1, 0.991), 1);
    _assert2.default.equal(mymath.compare(_index.indexjs.bignumber(1), _index.indexjs.bignumber(0.991)).valueOf(), 1);

    mymath.config({ epsilon: 1e-2 });
    _assert2.default.equal(mymath.compare(1, 0.991), 0);
    _assert2.default.equal(mymath.compare(_index.indexjs.bignumber(1), _index.indexjs.bignumber(0.991)), 0);
  });

  it('should throw an error when comparing complex numbers', function () {
    _assert2.default.throws(function () {
      compare(complex(1, 1), complex(1, 2));
    }, TypeError);
    _assert2.default.throws(function () {
      compare(complex(2, 1), 3);
    }, TypeError);
    _assert2.default.throws(function () {
      compare(3, complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      compare(_index.indexjs.bignumber(3), complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      compare(complex(2, 4), _index.indexjs.bignumber(3));
    }, TypeError);
  });

  it('should throw an error if matrices are different sizes', function () {
    _assert2.default.throws(function () {
      compare([1, 4, 6], [3, 4]);
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      compare(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      compare(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX compare', function () {
    var expression = _index.indexjs.parse('compare(1,2)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{compare}\\left(1,2\\right)');
  });
});
