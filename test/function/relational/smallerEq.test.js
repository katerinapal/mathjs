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
    smallerEq = _index.indexjs.smallerEq;

describe('smallerEq', function () {

  it('should compare two numbers correctly', function () {
    _assert2.default.equal(smallerEq(2, 3), true);
    _assert2.default.equal(smallerEq(2, 2), true);
    _assert2.default.equal(smallerEq(2, 1), false);
    _assert2.default.equal(smallerEq(0, 0), true);
    _assert2.default.equal(smallerEq(-2, 2), true);
    _assert2.default.equal(smallerEq(-2, -3), false);
    _assert2.default.equal(smallerEq(-2, -2), true);
    _assert2.default.equal(smallerEq(-3, -2), true);
  });

  it('should compare two floating point numbers correctly', function () {
    // Infinity
    _assert2.default.equal(smallerEq(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(smallerEq(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), true);
    _assert2.default.equal(smallerEq(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), false);
    _assert2.default.equal(smallerEq(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(smallerEq(Number.POSITIVE_INFINITY, 2.0), false);
    _assert2.default.equal(smallerEq(2.0, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(smallerEq(Number.NEGATIVE_INFINITY, 2.0), true);
    _assert2.default.equal(smallerEq(2.0, Number.NEGATIVE_INFINITY), false);
    // floating point numbers
    _assert2.default.equal(smallerEq(0.3 - 0.2, 0.1), true);
  });

  it('should compare two booleans', function () {
    _assert2.default.equal(smallerEq(true, true), true);
    _assert2.default.equal(smallerEq(true, false), false);
    _assert2.default.equal(smallerEq(false, true), true);
    _assert2.default.equal(smallerEq(false, false), true);
  });

  it('should compare mixed numbers and booleans', function () {
    _assert2.default.equal(smallerEq(2, true), false);
    _assert2.default.equal(smallerEq(1, true), true);
    _assert2.default.equal(smallerEq(0, true), true);
    _assert2.default.equal(smallerEq(true, 2), true);
    _assert2.default.equal(smallerEq(true, 1), true);
    _assert2.default.equal(smallerEq(false, 2), true);
  });

  it('should compare mixed numbers and null', function () {
    _assert2.default.equal(smallerEq(1, null), false);
    _assert2.default.equal(smallerEq(0, null), true);
    _assert2.default.equal(smallerEq(null, 1), true);
    _assert2.default.equal(smallerEq(null, 0), true);
  });

  it('should compare bignumbers', function () {
    _assert2.default.deepEqual(smallerEq(bignumber(2), bignumber(3)), true);
    _assert2.default.deepEqual(smallerEq(bignumber(2), bignumber(2)), true);
    _assert2.default.deepEqual(smallerEq(bignumber(3), bignumber(2)), false);
    _assert2.default.deepEqual(smallerEq(bignumber(0), bignumber(0)), true);
    _assert2.default.deepEqual(smallerEq(bignumber(-2), bignumber(2)), true);
  });

  it('should compare mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(smallerEq(bignumber(2), 3), true);
    _assert2.default.deepEqual(smallerEq(2, bignumber(2)), true);

    _assert2.default.throws(function () {
      smallerEq(1 / 3, bignumber(1).div(3));
    }, /TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      smallerEq(bignumber(1).div(3), 1 / 3);
    }, /TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should compare mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(smallerEq(bignumber(0.1), true), true);
    _assert2.default.deepEqual(smallerEq(bignumber(1), true), true);
    _assert2.default.deepEqual(smallerEq(bignumber(1), false), false);
    _assert2.default.deepEqual(smallerEq(bignumber(0), false), true);
    _assert2.default.deepEqual(smallerEq(false, bignumber(0)), true);
    _assert2.default.deepEqual(smallerEq(true, bignumber(0)), false);
    _assert2.default.deepEqual(smallerEq(true, bignumber(1)), true);
  });

  it('should compare two fractions', function () {
    _assert2.default.strictEqual(smallerEq(_index.indexjs.fraction(3), _index.indexjs.fraction(2)).valueOf(), false);
    _assert2.default.strictEqual(smallerEq(_index.indexjs.fraction(2), _index.indexjs.fraction(3)).valueOf(), true);
    _assert2.default.strictEqual(smallerEq(_index.indexjs.fraction(3), _index.indexjs.fraction(3)).valueOf(), true);
  });

  it('should compare mixed fractions and numbers', function () {
    _assert2.default.strictEqual(smallerEq(1, _index.indexjs.fraction(1, 3)), false);
    _assert2.default.strictEqual(smallerEq(_index.indexjs.fraction(2), 2), true);
  });

  it('should compare two measures of the same unit correctly', function () {
    _assert2.default.equal(smallerEq(unit('100cm'), unit('10inch')), false);
    _assert2.default.equal(smallerEq(unit('99cm'), unit('1m')), true);
    //assert.equal(smallerEq(unit('100cm'), unit('1m')), true); // dangerous, round-off errors
    _assert2.default.equal(smallerEq(unit('101cm'), unit('1m')), false);
  });

  it('should apply configuration option epsilon', function () {
    var mymath = _index.indexjs.create();
    _assert2.default.equal(mymath.smallerEq(1.01, 1), false);
    _assert2.default.equal(mymath.smallerEq(_index.indexjs.bignumber(1.01), _index.indexjs.bignumber(1)), false);

    mymath.config({ epsilon: 1e-2 });
    _assert2.default.equal(mymath.smallerEq(1.01, 1), true);
    _assert2.default.equal(mymath.smallerEq(_index.indexjs.bignumber(1.01), _index.indexjs.bignumber(1)), true);
  });

  it('should throw an error if comparing a unit with a number', function () {
    _assert2.default.throws(function () {
      smallerEq(unit('100cm'), 22);
    });
    _assert2.default.throws(function () {
      smallerEq(22, unit('100cm'));
    });
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      smallerEq(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error if comparing a unit with a bignumber', function () {
    _assert2.default.throws(function () {
      smallerEq(unit('100cm'), bignumber(22));
    });
    _assert2.default.throws(function () {
      smallerEq(bignumber(22), unit('100cm'));
    });
  });

  it('should perform lexical comparison of two strings', function () {
    _assert2.default.equal(smallerEq('0', 0), true);
    _assert2.default.equal(smallerEq('abd', 'abc'), false);
    _assert2.default.equal(smallerEq('abc', 'abc'), true);
    _assert2.default.equal(smallerEq('abc', 'abd'), true);
  });

  describe('Array', function () {

    it('should compare array - scalar', function () {
      _assert2.default.deepEqual(smallerEq('B', ['A', 'B', 'C']), [false, true, true]);
      _assert2.default.deepEqual(smallerEq(['A', 'B', 'C'], 'B'), [true, true, false]);
    });

    it('should compare array - array', function () {
      _assert2.default.deepEqual(smallerEq([[1, 2, 0], [-1, 0, 2]], [[1, -1, 0], [-1, 1, 0]]), [[true, false, true], [true, true, false]]);
    });

    it('should compare array - dense matrix', function () {
      _assert2.default.deepEqual(smallerEq([[1, 2, 0], [-1, 0, 2]], matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, true, false]]));
    });

    it('should compare array - sparse matrix', function () {
      _assert2.default.deepEqual(smallerEq([[1, 2, 0], [-1, 0, 2]], sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, true, false]]));
    });

    it('should throw an error if arrays have different sizes', function () {
      _assert2.default.throws(function () {
        smallerEq([1, 4, 5], [3, 4]);
      });
    });
  });

  describe('DenseMatrix', function () {

    it('should compare dense matrix - scalar', function () {
      _assert2.default.deepEqual(smallerEq('B', matrix(['A', 'B', 'C'])), matrix([false, true, true]));
      _assert2.default.deepEqual(smallerEq(matrix(['A', 'B', 'C']), 'B'), matrix([true, true, false]));
    });

    it('should compare dense matrix - array', function () {
      _assert2.default.deepEqual(smallerEq(matrix([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[true, false, true], [true, true, false]]));
    });

    it('should compare dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(smallerEq(matrix([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, true, false]]));
    });

    it('should compare dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(smallerEq(matrix([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, true, false]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should compare sparse matrix - scalar', function () {
      _assert2.default.deepEqual(smallerEq('B', sparse([['A', 'B'], ['C', 'D']])), matrix([[false, true], [true, true]]));
      _assert2.default.deepEqual(smallerEq(sparse([['A', 'B'], ['C', 'D']]), 'B'), matrix([[true, true], [false, false]]));
    });

    it('should compare sparse matrix - array', function () {
      _assert2.default.deepEqual(smallerEq(sparse([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[true, false, true], [true, true, false]]));
    });

    it('should compare sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(smallerEq(sparse([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, true, false]]));
    });

    it('should compare sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(smallerEq(sparse([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, true, false]]));
    });
  });

  it('should throw an error when comparing complex numbers', function () {
    _assert2.default.throws(function () {
      smallerEq(complex(1, 1), complex(1, 2));
    }, TypeError);
    _assert2.default.throws(function () {
      smallerEq(complex(2, 1), 3);
    }, TypeError);
    _assert2.default.throws(function () {
      smallerEq(3, complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      smallerEq(_index.indexjs.bignumber(3), complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      smallerEq(complex(2, 4), _index.indexjs.bignumber(3));
    }, TypeError);
  });

  it('should throw an error with two matrices of different sizes', function () {
    _assert2.default.throws(function () {
      smallerEq([1, 4, 6], [3, 4]);
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      smallerEq(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      smallerEq(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX smallerEq', function () {
    var expression = _index.indexjs.parse('smallerEq(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1\\leq2\\right)');
  });
});
