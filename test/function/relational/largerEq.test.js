"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test largerEq
var bignumber = _index.indexjs.bignumber,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    unit = _index.indexjs.unit,
    largerEq = _index.indexjs.largerEq;

describe('largerEq', function () {

  it('should compare two numbers correctly', function () {
    _assert2.default.equal(largerEq(2, 3), false);
    _assert2.default.equal(largerEq(2, 2), true);
    _assert2.default.equal(largerEq(2, 1), true);
    _assert2.default.equal(largerEq(0, 0), true);
    _assert2.default.equal(largerEq(-2, 2), false);
    _assert2.default.equal(largerEq(-2, -3), true);
    _assert2.default.equal(largerEq(-3, -2), false);
  });

  it('should compare two floating point numbers correctly', function () {
    // Infinity
    _assert2.default.equal(largerEq(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(largerEq(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), true);
    _assert2.default.equal(largerEq(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), true);
    _assert2.default.equal(largerEq(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(largerEq(Number.POSITIVE_INFINITY, 2.0), true);
    _assert2.default.equal(largerEq(2.0, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(largerEq(Number.NEGATIVE_INFINITY, 2.0), false);
    _assert2.default.equal(largerEq(2.0, Number.NEGATIVE_INFINITY), true);
    // floating point numbers
    _assert2.default.equal(largerEq(0.3 - 0.2, 0.1), true);
  });

  it('should compare two booleans', function () {
    _assert2.default.equal(largerEq(true, true), true);
    _assert2.default.equal(largerEq(true, false), true);
    _assert2.default.equal(largerEq(false, true), false);
    _assert2.default.equal(largerEq(false, false), true);
  });

  it('should compare mixed numbers and booleans', function () {
    _assert2.default.equal(largerEq(2, true), true);
    _assert2.default.equal(largerEq(0, true), false);
    _assert2.default.equal(largerEq(true, 2), false);
    _assert2.default.equal(largerEq(true, 1), true);
    _assert2.default.equal(largerEq(false, 0), true);
  });

  it('should compare mixed numbers and null', function () {
    _assert2.default.equal(largerEq(1, null), true);
    _assert2.default.equal(largerEq(0, null), true);
    _assert2.default.equal(largerEq(null, 1), false);
    _assert2.default.equal(largerEq(null, 0), true);
  });

  it('should compare bignumbers', function () {
    _assert2.default.equal(largerEq(bignumber(2), bignumber(3)), false);
    _assert2.default.equal(largerEq(bignumber(2), bignumber(2)), true);
    _assert2.default.equal(largerEq(bignumber(3), bignumber(2)), true);
    _assert2.default.equal(largerEq(bignumber(0), bignumber(0)), true);
    _assert2.default.equal(largerEq(bignumber(-2), bignumber(2)), false);
  });

  it('should compare mixed numbers and bignumbers', function () {
    _assert2.default.equal(largerEq(bignumber(2), 3), false);
    _assert2.default.equal(largerEq(2, bignumber(2)), true);

    _assert2.default.throws(function () {
      largerEq(1 / 3, bignumber(1).div(3));
    }, /TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      largerEq(bignumber(1).div(3), 1 / 3);
    }, /TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should compare mixed booleans and bignumbers', function () {
    _assert2.default.equal(largerEq(bignumber(0.1), true), false);
    _assert2.default.equal(largerEq(bignumber(1), true), true);
    _assert2.default.equal(largerEq(bignumber(1), false), true);
    _assert2.default.equal(largerEq(false, bignumber(0)), true);
    _assert2.default.equal(largerEq(true, bignumber(0)), true);
    _assert2.default.equal(largerEq(true, bignumber(1)), true);
  });

  it('should compare two fractions', function () {
    _assert2.default.strictEqual(largerEq(_index.indexjs.fraction(3), _index.indexjs.fraction(2)).valueOf(), true);
    _assert2.default.strictEqual(largerEq(_index.indexjs.fraction(2), _index.indexjs.fraction(3)).valueOf(), false);
    _assert2.default.strictEqual(largerEq(_index.indexjs.fraction(3), _index.indexjs.fraction(3)).valueOf(), true);
  });

  it('should compare mixed fractions and numbers', function () {
    _assert2.default.strictEqual(largerEq(1, _index.indexjs.fraction(1, 3)), true);
    _assert2.default.strictEqual(largerEq(_index.indexjs.fraction(2), 2), true);
  });

  it('should compare two units correctly', function () {
    _assert2.default.equal(largerEq(unit('100cm'), unit('10inch')), true);
    _assert2.default.equal(largerEq(unit('99cm'), unit('1m')), false);
    //assert.equal(largerEq(unit('100cm'), unit('1m')), true); // dangerous, round-off errors
    _assert2.default.equal(largerEq(unit('101cm'), unit('1m')), true);
  });

  it('should apply configuration option epsilon', function () {
    var mymath = _index.indexjs.create();
    _assert2.default.equal(mymath.largerEq(1, 1.01), false);
    _assert2.default.equal(mymath.largerEq(_index.indexjs.bignumber(1), _index.indexjs.bignumber(1.01)), false);

    mymath.config({ epsilon: 1e-2 });
    _assert2.default.equal(mymath.largerEq(1, 1.01), true);
    _assert2.default.equal(mymath.largerEq(_index.indexjs.bignumber(1), _index.indexjs.bignumber(1.01)), true);
  });

  it('should throw an error if comparing a unit with a number', function () {
    _assert2.default.throws(function () {
      largerEq(unit('100cm'), 22);
    });
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      largerEq(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error if comparing a unit with a bignumber', function () {
    _assert2.default.throws(function () {
      largerEq(unit('100cm'), bignumber(22));
    });
  });

  it('should perform lexical comparison for 2 strings', function () {
    _assert2.default.equal(largerEq('0', 0), true);
    _assert2.default.equal(largerEq('abd', 'abc'), true);
    _assert2.default.equal(largerEq('abc', 'abc'), true);
    _assert2.default.equal(largerEq('abc', 'abd'), false);
  });

  describe('Array', function () {

    it('should compare array - scalar', function () {
      _assert2.default.deepEqual(largerEq('B', ['A', 'B', 'C']), [true, true, false]);
      _assert2.default.deepEqual(largerEq(['A', 'B', 'C'], 'B'), [false, true, true]);
    });

    it('should compare array - array', function () {
      _assert2.default.deepEqual(largerEq([[1, 2, 0], [-1, 0, 2]], [[1, -1, 0], [-1, 1, 0]]), [[true, true, true], [true, false, true]]);
    });

    it('should compare array - dense matrix', function () {
      _assert2.default.deepEqual(largerEq([[1, 2, 0], [-1, 0, 2]], matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, true, true], [true, false, true]]));
    });

    it('should compare array - sparse matrix', function () {
      _assert2.default.deepEqual(largerEq([[1, 2, 0], [-1, 0, 2]], sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, true, true], [true, false, true]]));
    });

    it('should throw an error if arrays have different sizes', function () {
      _assert2.default.throws(function () {
        largerEq([1, 4, 5], [3, 4]);
      });
    });
  });

  describe('DenseMatrix', function () {

    it('should compare dense matrix - scalar', function () {
      _assert2.default.deepEqual(largerEq('B', matrix(['A', 'B', 'C'])), matrix([true, true, false]));
      _assert2.default.deepEqual(largerEq(matrix(['A', 'B', 'C']), 'B'), matrix([false, true, true]));
    });

    it('should compare dense matrix - array', function () {
      _assert2.default.deepEqual(largerEq(matrix([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[true, true, true], [true, false, true]]));
    });

    it('should compare dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(largerEq(matrix([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, true, true], [true, false, true]]));
    });

    it('should compare dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(largerEq(matrix([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, true, true], [true, false, true]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should compare sparse matrix - scalar', function () {
      _assert2.default.deepEqual(largerEq('B', sparse([['A', 'B'], ['C', 'D']])), matrix([[true, true], [false, false]]));
      _assert2.default.deepEqual(largerEq(sparse([['A', 'B'], ['C', 'D']]), 'B'), matrix([[false, true], [true, true]]));
    });

    it('should compare sparse matrix - array', function () {
      _assert2.default.deepEqual(largerEq(sparse([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[true, true, true], [true, false, true]]));
    });

    it('should compare sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(largerEq(sparse([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, true, true], [true, false, true]]));
    });

    it('should compare sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(largerEq(sparse([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, true, true], [true, false, true]]));
    });
  });

  it('should throw an error when comparing complex numbers', function () {
    _assert2.default.throws(function () {
      largerEq(complex(1, 1), complex(1, 2));
    }, TypeError);
    _assert2.default.throws(function () {
      largerEq(complex(2, 1), 3);
    }, TypeError);
    _assert2.default.throws(function () {
      largerEq(3, complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      largerEq(_index.indexjs.bignumber(3), complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      largerEq(complex(2, 4), _index.indexjs.bignumber(3));
    }, TypeError);
  });

  it('should throw an error if comparing two matrices of different sizes', function () {
    _assert2.default.throws(function () {
      largerEq([1, 4, 6], [3, 4]);
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      largerEq(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      largerEq(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX largerEq', function () {
    var expression = _index.indexjs.parse('largerEq(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1\\geq2\\right)');
  });
});
