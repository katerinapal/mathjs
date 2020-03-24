"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test larger
var bignumber = _index.indexjs.bignumber,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    unit = _index.indexjs.unit,
    larger = _index.indexjs.larger;

describe('larger', function () {

  it('should compare two numbers correctly', function () {
    _assert2.default.equal(larger(2, 3), false);
    _assert2.default.equal(larger(2, 2), false);
    _assert2.default.equal(larger(2, 1), true);
    _assert2.default.equal(larger(0, 0), false);
    _assert2.default.equal(larger(-2, 2), false);
    _assert2.default.equal(larger(-2, -3), true);
    _assert2.default.equal(larger(-3, -2), false);
  });

  it('should compare two floating point numbers correctly', function () {
    // Infinity
    _assert2.default.equal(larger(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(larger(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), false);
    _assert2.default.equal(larger(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), true);
    _assert2.default.equal(larger(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(larger(Number.POSITIVE_INFINITY, 2.0), true);
    _assert2.default.equal(larger(2.0, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(larger(Number.NEGATIVE_INFINITY, 2.0), false);
    _assert2.default.equal(larger(2.0, Number.NEGATIVE_INFINITY), true);
    // floating point numbers
    _assert2.default.equal(larger(0.3 - 0.2, 0.1), false);
  });

  it('should compare two booleans', function () {
    _assert2.default.equal(larger(true, true), false);
    _assert2.default.equal(larger(true, false), true);
    _assert2.default.equal(larger(false, true), false);
    _assert2.default.equal(larger(false, false), false);
  });

  it('should compare mixed numbers and booleans', function () {
    _assert2.default.equal(larger(2, true), true);
    _assert2.default.equal(larger(0, true), false);
    _assert2.default.equal(larger(true, 2), false);
    _assert2.default.equal(larger(false, 2), false);
  });

  it('should compare mixed numbers and null', function () {
    _assert2.default.equal(larger(1, null), true);
    _assert2.default.equal(larger(0, null), false);
    _assert2.default.equal(larger(null, 1), false);
    _assert2.default.equal(larger(null, 0), false);
  });

  it('should compare bignumbers', function () {
    _assert2.default.equal(larger(bignumber(2), bignumber(3)), false);
    _assert2.default.equal(larger(bignumber(2), bignumber(2)), false);
    _assert2.default.equal(larger(bignumber(3), bignumber(2)), true);
    _assert2.default.equal(larger(bignumber(0), bignumber(0)), false);
    _assert2.default.equal(larger(bignumber(-2), bignumber(2)), false);
  });

  it('should compare mixed numbers and bignumbers', function () {
    _assert2.default.equal(larger(bignumber(2), 3), false);
    _assert2.default.equal(larger(2, bignumber(2)), false);

    _assert2.default.throws(function () {
      larger(1 / 3, bignumber(1).div(3));
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      larger(bignumber(1).div(3), 1 / 3);
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should compare mixed booleans and bignumbers', function () {
    _assert2.default.equal(larger(bignumber(0.1), true), false);
    _assert2.default.equal(larger(bignumber(1), true), false);
    _assert2.default.equal(larger(bignumber(1), false), true);
    _assert2.default.equal(larger(false, bignumber(0)), false);
    _assert2.default.equal(larger(true, bignumber(0)), true);
  });

  it('should compare two fractions', function () {
    _assert2.default.strictEqual(larger(_index.indexjs.fraction(3), _index.indexjs.fraction(2)).valueOf(), true);
    _assert2.default.strictEqual(larger(_index.indexjs.fraction(2), _index.indexjs.fraction(3)).valueOf(), false);
    _assert2.default.strictEqual(larger(_index.indexjs.fraction(3), _index.indexjs.fraction(3)).valueOf(), false);
  });

  it('should compare mixed fractions and numbers', function () {
    _assert2.default.strictEqual(larger(1, _index.indexjs.fraction(1, 3)), true);
    _assert2.default.strictEqual(larger(_index.indexjs.fraction(2), 2), false);
  });

  it('should add two measures of the same unit', function () {
    _assert2.default.equal(larger(unit('100cm'), unit('10inch')), true);
    _assert2.default.equal(larger(unit('99cm'), unit('1m')), false);
    //assert.equal(larger(unit('100cm'), unit('1m')), false); // dangerous, round-off errors
    _assert2.default.equal(larger(unit('101cm'), unit('1m')), true);
  });

  it('should apply configuration option epsilon', function () {
    var mymath = _index.indexjs.create();
    _assert2.default.equal(mymath.larger(1, 0.991), true);
    _assert2.default.equal(mymath.larger(_index.indexjs.bignumber(1), _index.indexjs.bignumber(0.991)), true);

    mymath.config({ epsilon: 1e-2 });
    _assert2.default.equal(mymath.larger(1, 0.991), false);
    _assert2.default.equal(mymath.larger(_index.indexjs.bignumber(1), _index.indexjs.bignumber(0.991)), false);
  });

  it('should throw an error if comparing a unit with a number', function () {
    _assert2.default.throws(function () {
      larger(unit('100cm'), 22);
    });
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      larger(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error if comparing a unit with a bignumber', function () {
    _assert2.default.throws(function () {
      larger(unit('100cm'), bignumber(22));
    });
  });

  it('should perform lexical comparison for two strings', function () {
    _assert2.default.equal(larger('0', 0), false);

    _assert2.default.equal(larger('abd', 'abc'), true);
    _assert2.default.equal(larger('abc', 'abc'), false);
    _assert2.default.equal(larger('abc', 'abd'), false);
  });

  describe('Array', function () {

    it('should compare array - scalar', function () {
      _assert2.default.deepEqual(larger('B', ['A', 'B', 'C']), [true, false, false]);
      _assert2.default.deepEqual(larger(['A', 'B', 'C'], 'B'), [false, false, true]);
    });

    it('should compare array - array', function () {
      _assert2.default.deepEqual(larger([[1, 2, 0], [-1, 0, 2]], [[1, -1, 0], [-1, 1, 0]]), [[false, true, false], [false, false, true]]);
    });

    it('should compare array - dense matrix', function () {
      _assert2.default.deepEqual(larger([[1, 2, 0], [-1, 0, 2]], matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, false, true]]));
    });

    it('should compare array - sparse matrix', function () {
      _assert2.default.deepEqual(larger([[1, 2, 0], [-1, 0, 2]], sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, false, true]]));
    });

    it('should throw an error if arrays have different sizes', function () {
      _assert2.default.throws(function () {
        larger([1, 4, 5], [3, 4]);
      });
    });
  });

  describe('DenseMatrix', function () {

    it('should compare dense matrix - scalar', function () {
      _assert2.default.deepEqual(larger('B', matrix(['A', 'B', 'C'])), matrix([true, false, false]));
      _assert2.default.deepEqual(larger(matrix(['A', 'B', 'C']), 'B'), matrix([false, false, true]));
    });

    it('should compare dense matrix - array', function () {
      _assert2.default.deepEqual(larger(matrix([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[false, true, false], [false, false, true]]));
    });

    it('should compare dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(larger(matrix([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, false, true]]));
    });

    it('should compare dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(larger(matrix([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, false, true]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should compare sparse matrix - scalar', function () {
      _assert2.default.deepEqual(larger('B', sparse([['A', 'B'], ['C', 'D']])), matrix([[true, false], [false, false]]));
      _assert2.default.deepEqual(larger(sparse([['A', 'B'], ['C', 'D']]), 'B'), matrix([[false, false], [true, true]]));
    });

    it('should compare sparse matrix - array', function () {
      _assert2.default.deepEqual(larger(sparse([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[false, true, false], [false, false, true]]));
    });

    it('should compare sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(larger(sparse([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, false, true]]));
    });

    it('should compare sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(larger(sparse([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, false, true]]));
    });
  });

  it('should throw an error when comparing complex numbers', function () {
    _assert2.default.throws(function () {
      larger(complex(1, 1), complex(1, 2));
    }, TypeError);
    _assert2.default.throws(function () {
      larger(complex(2, 1), 3);
    }, TypeError);
    _assert2.default.throws(function () {
      larger(3, complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      larger(_index.indexjs.bignumber(3), complex(2, 4));
    }, TypeError);
    _assert2.default.throws(function () {
      larger(complex(2, 4), _index.indexjs.bignumber(3));
    }, TypeError);
  });

  it('should throw an error if matrices are different sizes', function () {
    _assert2.default.throws(function () {
      larger([1, 4, 6], [3, 4]);
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      larger(1);
    }, /Too few arguments/);
    _assert2.default.throws(function () {
      larger(1, 2, 3);
    }, /Too many arguments/);
  });

  it('should LaTeX larger', function () {
    var expression = _index.indexjs.parse('larger(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1>2\\right)');
  });
});
