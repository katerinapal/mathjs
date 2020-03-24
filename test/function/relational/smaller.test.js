"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test smaller
var bignumber = _index.indexjs.bignumber,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    unit = _index.indexjs.unit,
    smaller = _index.indexjs.smaller;

describe('smaller', function () {

  it('should compare two numbers correctly', function () {
    _assert2.default.equal(smaller(2, 3), true);
    _assert2.default.equal(smaller(2, 2), false);
    _assert2.default.equal(smaller(2, 1), false);
    _assert2.default.equal(smaller(0, 0), false);
    _assert2.default.equal(smaller(-2, 2), true);
    _assert2.default.equal(smaller(-2, -3), false);
    _assert2.default.equal(smaller(-3, -2), true);
  });

  it('should compare two floating point numbers correctly', function () {
    // Infinity
    _assert2.default.equal(smaller(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(smaller(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), false);
    _assert2.default.equal(smaller(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), false);
    _assert2.default.equal(smaller(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(smaller(Number.POSITIVE_INFINITY, 2.0), false);
    _assert2.default.equal(smaller(2.0, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(smaller(Number.NEGATIVE_INFINITY, 2.0), true);
    _assert2.default.equal(smaller(2.0, Number.NEGATIVE_INFINITY), false);
    // floating point numbers
    _assert2.default.equal(smaller(0.3 - 0.2, 0.1), false);
  });

  it('should compare two booleans', function () {
    _assert2.default.equal(smaller(true, true), false);
    _assert2.default.equal(smaller(true, false), false);
    _assert2.default.equal(smaller(false, true), true);
    _assert2.default.equal(smaller(false, false), false);
  });

  it('should compare mixed numbers and booleans', function () {
    _assert2.default.equal(smaller(2, true), false);
    _assert2.default.equal(smaller(1, true), false);
    _assert2.default.equal(smaller(0, true), true);
    _assert2.default.equal(smaller(true, 2), true);
    _assert2.default.equal(smaller(true, 1), false);
    _assert2.default.equal(smaller(false, 2), true);
  });

  it('should compare mixed numbers and null', function () {
    _assert2.default.equal(smaller(1, null), false);
    _assert2.default.equal(smaller(0, null), false);
    _assert2.default.equal(smaller(null, 1), true);
    _assert2.default.equal(smaller(null, 0), false);
  });

  it('should compare bignumbers', function () {
    _assert2.default.deepEqual(smaller(bignumber(2), bignumber(3)), true);
    _assert2.default.deepEqual(smaller(bignumber(2), bignumber(2)), false);
    _assert2.default.deepEqual(smaller(bignumber(3), bignumber(2)), false);
    _assert2.default.deepEqual(smaller(bignumber(0), bignumber(0)), false);
    _assert2.default.deepEqual(smaller(bignumber(-2), bignumber(2)), true);
  });

  it('should compare mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(smaller(bignumber(2), 3), true);
    _assert2.default.deepEqual(smaller(2, bignumber(2)), false);

    //assert.equal(smaller(1/3, bignumber(1).div(3)), false);
    //assert.equal(smaller(bignumber(1).div(3), 1/3), false);

    _assert2.default.throws(function () {
      smaller(1 / 3, bignumber(1).div(3));
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      smaller(bignumber(1).div(3), 1 / 3);
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should compare mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(smaller(bignumber(0.1), true), true);
    _assert2.default.deepEqual(smaller(bignumber(1), true), false);
    _assert2.default.deepEqual(smaller(bignumber(1), false), false);
    _assert2.default.deepEqual(smaller(bignumber(0), false), false);
    _assert2.default.deepEqual(smaller(false, bignumber(0)), false);
    _assert2.default.deepEqual(smaller(true, bignumber(0)), false);
    _assert2.default.deepEqual(smaller(true, bignumber(1)), false);
  });

  it('should compare two fractions', function () {
    _assert2.default.strictEqual(smaller(_index.indexjs.fraction(3), _index.indexjs.fraction(2)).valueOf(), false);
    _assert2.default.strictEqual(smaller(_index.indexjs.fraction(2), _index.indexjs.fraction(3)).valueOf(), true);
    _assert2.default.strictEqual(smaller(_index.indexjs.fraction(3), _index.indexjs.fraction(3)).valueOf(), false);
  });

  it('should compare mixed fractions and numbers', function () {
    _assert2.default.strictEqual(smaller(1, _index.indexjs.fraction(1, 3)), false);
    _assert2.default.strictEqual(smaller(_index.indexjs.fraction(2), 2), false);
  });

  it('should compare two measures of the same unit correctly', function () {
    _assert2.default.equal(smaller(unit('100cm'), unit('10inch')), false);
    _assert2.default.equal(smaller(unit('99cm'), unit('1m')), true);
    //assert.equal(smaller(unit('100cm'), unit('1m')), false); // dangerous, round-off errors
    _assert2.default.equal(smaller(unit('101cm'), unit('1m')), false);
  });

  it('should apply configuration option epsilon', function () {
    var mymath = _index.indexjs.create();
    _assert2.default.equal(mymath.smaller(0.991, 1), true);
    _assert2.default.equal(mymath.smaller(_index.indexjs.bignumber(0.991), _index.indexjs.bignumber(1)), true);

    mymath.config({ epsilon: 1e-2 });
    _assert2.default.equal(mymath.smaller(0.991, 1), false);
    _assert2.default.equal(mymath.smaller(_index.indexjs.bignumber(0.991), _index.indexjs.bignumber(1)), false);
  });

  it('should throw an error if comparing a unit and a number', function () {
    _assert2.default.throws(function () {
      smaller(unit('100cm'), 22);
    });
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      smaller(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error if comparing a unit and a bignumber', function () {
    _assert2.default.throws(function () {
      smaller(unit('100cm'), bignumber(22));
    });
  });

  it('should perform lexical comparison on two strings', function () {
    _assert2.default.equal(smaller('0', 0), false);
    _assert2.default.equal(smaller('abd', 'abc'), false);
    _assert2.default.equal(smaller('abc', 'abc'), false);
    _assert2.default.equal(smaller('abc', 'abd'), true);
  });

  describe('Array', function () {

    it('should compare array - scalar', function () {
      _assert2.default.deepEqual(smaller('B', ['A', 'B', 'C']), [false, false, true]);
      _assert2.default.deepEqual(smaller(['A', 'B', 'C'], 'B'), [true, false, false]);
    });

    it('should compare array - array', function () {
      _assert2.default.deepEqual(smaller([[1, 2, 0], [-1, 0, 2]], [[1, -1, 0], [-1, 1, 0]]), [[false, false, false], [false, true, false]]);
    });

    it('should compare array - dense matrix', function () {
      _assert2.default.deepEqual(smaller([[1, 2, 0], [-1, 0, 2]], matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, false, false], [false, true, false]]));
    });

    it('should compare array - sparse matrix', function () {
      _assert2.default.deepEqual(smaller([[1, 2, 0], [-1, 0, 2]], sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, false, false], [false, true, false]]));
    });

    it('should throw an error if arrays have different sizes', function () {
      _assert2.default.throws(function () {
        smaller([1, 4, 5], [3, 4]);
      });
    });
  });

  describe('DenseMatrix', function () {

    it('should compare dense matrix - scalar', function () {
      _assert2.default.deepEqual(smaller('B', matrix(['A', 'B', 'C'])), matrix([false, false, true]));
      _assert2.default.deepEqual(smaller(matrix(['A', 'B', 'C']), 'B'), matrix([true, false, false]));
    });

    it('should compare dense matrix - array', function () {
      _assert2.default.deepEqual(smaller(matrix([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[false, false, false], [false, true, false]]));
    });

    it('should compare dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(smaller(matrix([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, false, false], [false, true, false]]));
    });

    it('should compare dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(smaller(matrix([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, false, false], [false, true, false]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should compare sparse matrix - scalar', function () {
      _assert2.default.deepEqual(smaller('B', sparse([['A', 'B'], ['C', 'D']])), matrix([[false, false], [true, true]]));
      _assert2.default.deepEqual(smaller(sparse([['A', 'B'], ['C', 'D']]), 'B'), matrix([[true, false], [false, false]]));
    });

    it('should compare sparse matrix - array', function () {
      _assert2.default.deepEqual(smaller(sparse([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[false, false, false], [false, true, false]]));
    });

    it('should compare sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(smaller(sparse([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, false, false], [false, true, false]]));
    });

    it('should compare sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(smaller(sparse([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, false, false], [false, true, false]]));
    });
  });

  it('should throw an error when comparing complex numbers', function () {
    _assert2.default.throws(function () {
      smaller(complex(1, 1), complex(1, 2));
    }, TypeError);
    _assert2.default.throws(function () {
      smaller(complex(2, 1), 3);
    }, TypeError);
    _assert2.default.throws(function () {
      smaller(3, complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      smaller(_index.indexjs.bignumber(3), complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      smaller(complex(2, 4), _index.indexjs.bignumber(3));
    }, TypeError);
  });

  it('should throw an error with two matrices of different sizes', function () {
    _assert2.default.throws(function () {
      smaller([1, 4, 6], [3, 4]);
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      smaller(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      smaller(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX smaller', function () {
    var expression = _index.indexjs.parse('smaller(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1<2\\right)');
  });
});
