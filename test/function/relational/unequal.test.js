"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test unequal
var bignumber = _index.indexjs.bignumber,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    unit = _index.indexjs.unit,
    unequal = _index.indexjs.unequal;

describe('unequal', function () {

  it('should compare two numbers correctly', function () {
    _assert2.default.equal(unequal(2, 3), true);
    _assert2.default.equal(unequal(2, 2), false);
    _assert2.default.equal(unequal(0, 0), false);
    _assert2.default.equal(unequal(-2, 2), true);
    _assert2.default.equal(unequal(true, 1), false);
  });

  it('should compare two floating point numbers correctly', function () {
    // NaN
    _assert2.default.equal(unequal(Number.NaN, Number.NaN), true);
    // Infinity
    _assert2.default.equal(unequal(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(unequal(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), false);
    _assert2.default.equal(unequal(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), true);
    _assert2.default.equal(unequal(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(unequal(Number.POSITIVE_INFINITY, 2.0), true);
    _assert2.default.equal(unequal(2.0, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(unequal(Number.NEGATIVE_INFINITY, 2.0), true);
    _assert2.default.equal(unequal(2.0, Number.NEGATIVE_INFINITY), true);
    _assert2.default.equal(unequal(Number.NaN, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(unequal(Number.POSITIVE_INFINITY, Number.NaN), true);
    _assert2.default.equal(unequal(Number.NaN, Number.NEGATIVE_INFINITY), true);
    _assert2.default.equal(unequal(Number.NEGATIVE_INFINITY, Number.NaN), true);
    // floating point numbers
    _assert2.default.equal(unequal(0.3 - 0.2, 0.1), false);
  });

  it('should compare two booleans', function () {
    _assert2.default.equal(unequal(true, true), false);
    _assert2.default.equal(unequal(true, false), true);
    _assert2.default.equal(unequal(false, true), true);
    _assert2.default.equal(unequal(false, false), false);
  });

  it('should compare mixed numbers and booleans', function () {
    _assert2.default.equal(unequal(2, true), true);
    _assert2.default.equal(unequal(1, true), false);
    _assert2.default.equal(unequal(0, true), true);
    _assert2.default.equal(unequal(true, 2), true);
    _assert2.default.equal(unequal(true, 1), false);
    _assert2.default.equal(unequal(false, 2), true);
    _assert2.default.equal(unequal(false, 0), false);
  });

  it('should compare bignumbers', function () {
    _assert2.default.deepEqual(unequal(bignumber(2), bignumber(3)), true);
    _assert2.default.deepEqual(unequal(bignumber(2), bignumber(2)), false);
    _assert2.default.deepEqual(unequal(bignumber(3), bignumber(2)), true);
    _assert2.default.deepEqual(unequal(bignumber(0), bignumber(0)), false);
    _assert2.default.deepEqual(unequal(bignumber(-2), bignumber(2)), true);
  });

  it('should compare mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(unequal(bignumber(2), 3), true);
    _assert2.default.deepEqual(unequal(2, bignumber(2)), false);

    _assert2.default.throws(function () {
      unequal(1 / 3, bignumber(1).div(3));
    }, /TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      unequal(bignumber(1).div(3), 1 / 3);
    }, /TypeError: Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should compare mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(unequal(bignumber(0.1), true), true);
    _assert2.default.deepEqual(unequal(bignumber(1), true), false);
    _assert2.default.deepEqual(unequal(bignumber(1), false), true);
    _assert2.default.deepEqual(unequal(bignumber(0), false), false);
    _assert2.default.deepEqual(unequal(false, bignumber(0)), false);
    _assert2.default.deepEqual(unequal(true, bignumber(0)), true);
    _assert2.default.deepEqual(unequal(true, bignumber(1)), false);
  });

  it('should compare two complex numbers correctly', function () {
    _assert2.default.equal(unequal(complex(2, 3), complex(2, 4)), true);
    _assert2.default.equal(unequal(complex(2, 3), complex(2, 3)), false);
    _assert2.default.equal(unequal(complex(1, 3), complex(2, 3)), true);
    _assert2.default.equal(unequal(complex(1, 3), complex(2, 4)), true);
    _assert2.default.equal(unequal(complex(2, 0), 2), false);
    _assert2.default.equal(unequal(complex(2, 1), 2), true);
    _assert2.default.equal(unequal(2, complex(2, 0)), false);
    _assert2.default.equal(unequal(2, complex(2, 1)), true);
    _assert2.default.equal(unequal(complex(2, 0), 3), true);
  });

  it('should compare mixed complex numbers and bignumbers (downgrades to numbers)', function () {
    _assert2.default.deepEqual(unequal(_index.indexjs.complex(6, 0), bignumber(6)), false);
    _assert2.default.deepEqual(unequal(_index.indexjs.complex(6, -2), bignumber(6)), true);
    _assert2.default.deepEqual(unequal(bignumber(6), _index.indexjs.complex(6, 0)), false);
    _assert2.default.deepEqual(unequal(bignumber(6), _index.indexjs.complex(6, 4)), true);
  });

  it('should compare two fractions', function () {
    _assert2.default.strictEqual(unequal(_index.indexjs.fraction(3), _index.indexjs.fraction(2)).valueOf(), true);
    _assert2.default.strictEqual(unequal(_index.indexjs.fraction(2), _index.indexjs.fraction(3)).valueOf(), true);
    _assert2.default.strictEqual(unequal(_index.indexjs.fraction(3), _index.indexjs.fraction(3)).valueOf(), false);
  });

  it('should compare mixed fractions and numbers', function () {
    _assert2.default.strictEqual(unequal(1, _index.indexjs.fraction(1, 3)), true);
    _assert2.default.strictEqual(unequal(_index.indexjs.fraction(2), 2), false);
  });

  it('should compare two quantitites of the same unit correctly', function () {
    _assert2.default.equal(unequal(unit('100cm'), unit('10inch')), true);
    _assert2.default.equal(unequal(unit('100cm'), unit('1m')), false);
    //assert.equal(unequal(unit('12inch'), unit('1foot')), false); // round-off error :(
    //assert.equal(unequal(unit('2.54cm'), unit('1inch')), false); // round-off error :(
  });

  it('should compare null', function () {
    _assert2.default.equal(unequal(null, null), false);
    _assert2.default.equal(unequal(null, undefined), true);
    _assert2.default.equal(unequal(0, null), true);
    _assert2.default.equal(unequal('null', null), true);
  });

  it('should compare undefined', function () {
    _assert2.default.equal(unequal(undefined, undefined), false);
    _assert2.default.equal(unequal(undefined, 'undefined'), true);
    _assert2.default.equal(unequal(undefined, null), true);
    _assert2.default.equal(unequal(2, undefined), true);
  });

  it('should apply configuration option epsilon', function () {
    var mymath = _index.indexjs.create();
    _assert2.default.equal(mymath.unequal(1, 0.991), true);
    _assert2.default.equal(mymath.unequal(_index.indexjs.bignumber(1), _index.indexjs.bignumber(0.991)), true);

    mymath.config({ epsilon: 1e-2 });
    _assert2.default.equal(mymath.unequal(1, 0.991), false);
    _assert2.default.equal(mymath.unequal(_index.indexjs.bignumber(1), _index.indexjs.bignumber(0.991)), false);
  });

  it('should throw an error when comparing numbers and units', function () {
    _assert2.default.throws(function () {
      unequal(unit('100cm'), 22);
    });
    _assert2.default.throws(function () {
      unequal(22, unit('100cm'));
    });
  });

  it('should throw an error when comparing bignumbers and units', function () {
    _assert2.default.throws(function () {
      unequal(unit('100cm'), bignumber(22));
    });
    _assert2.default.throws(function () {
      unequal(bignumber(22), unit('100cm'));
    });
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      unequal(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'gram'));
    });
  });

  it('should compare two strings correctly', function () {
    _assert2.default.equal(unequal('0', 0), false);
    _assert2.default.equal(unequal('Hello', 'hello'), true);
    _assert2.default.equal(unequal('hello', 'hello'), false);
  });

  describe('Array', function () {

    it('should compare array - scalar', function () {
      _assert2.default.deepEqual(unequal('B', ['A', 'B', 'C']), [true, false, true]);
      _assert2.default.deepEqual(unequal(['A', 'B', 'C'], 'B'), [true, false, true]);
    });

    it('should compare array - array', function () {
      _assert2.default.deepEqual(unequal([[1, 2, 0], [-1, 0, 2]], [[1, -1, 0], [-1, 1, 0]]), [[false, true, false], [false, true, true]]);
    });

    it('should compare array - dense matrix', function () {
      _assert2.default.deepEqual(unequal([[1, 2, 0], [-1, 0, 2]], matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, true, true]]));
    });

    it('should compare array - sparse matrix', function () {
      _assert2.default.deepEqual(unequal([[1, 2, 0], [-1, 0, 2]], sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, true, true]]));
    });

    it('should throw an error if arrays have different sizes', function () {
      _assert2.default.throws(function () {
        unequal([1, 4, 5], [3, 4]);
      });
    });
  });

  describe('DenseMatrix', function () {

    it('should compare dense matrix - scalar', function () {
      _assert2.default.deepEqual(unequal('B', matrix(['A', 'B', 'C'])), matrix([true, false, true]));
      _assert2.default.deepEqual(unequal(matrix(['A', 'B', 'C']), 'B'), matrix([true, false, true]));
    });

    it('should compare dense matrix - array', function () {
      _assert2.default.deepEqual(unequal(matrix([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[false, true, false], [false, true, true]]));
    });

    it('should compare dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(unequal(matrix([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, true, true]]));
    });

    it('should compare dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(unequal(matrix([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, true, true]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should compare sparse matrix - scalar', function () {
      _assert2.default.deepEqual(unequal('B', sparse([['A', 'B'], ['C', 'D']])), matrix([[true, false], [true, true]]));
      _assert2.default.deepEqual(unequal(sparse([['A', 'B'], ['C', 'D']]), 'B'), matrix([[true, false], [true, true]]));
    });

    it('should compare sparse matrix - array', function () {
      _assert2.default.deepEqual(unequal(sparse([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[false, true, false], [false, true, true]]));
    });

    it('should compare sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(unequal(sparse([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, true, true]]));
    });

    it('should compare sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(unequal(sparse([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[false, true, false], [false, true, true]]));
    });
  });

  it('should throw an error if matrices have different sizes', function () {
    _assert2.default.throws(function () {
      unequal([1, 4, 5], [3, 4]);
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      unequal(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      unequal(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX unequal', function () {
    var expression = _index.indexjs.parse('unequal(1,0)');
    _assert2.default.equal(expression.toTex(), '\\left(1\\neq0\\right)');
  });
});
