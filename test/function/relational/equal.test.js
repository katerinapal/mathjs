'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test equal
var math = require('../../../index'),
    bignumber = math.bignumber,
    complex = math.complex,
    matrix = math.matrix,
    sparse = math.sparse,
    unit = math.unit,
    equal = math.equal;

describe('equal', function () {

  it('should compare two numbers correctly', function () {
    _assert2.default.equal(equal(2, 3), false);
    _assert2.default.equal(equal(2, 2), true);
    _assert2.default.equal(equal(0, 0), true);
    _assert2.default.equal(equal(-2, 2), false);
  });

  it('should compare two floating point numbers correctly', function () {
    // NaN
    _assert2.default.equal(equal(Number.NaN, Number.NaN), false);
    // Infinity
    _assert2.default.equal(equal(Number.POSITIVE_INFINITY, Number.POSITIVE_INFINITY), true);
    _assert2.default.equal(equal(Number.NEGATIVE_INFINITY, Number.NEGATIVE_INFINITY), true);
    _assert2.default.equal(equal(Number.POSITIVE_INFINITY, Number.NEGATIVE_INFINITY), false);
    _assert2.default.equal(equal(Number.NEGATIVE_INFINITY, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(equal(Number.POSITIVE_INFINITY, 2.0), false);
    _assert2.default.equal(equal(2.0, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(equal(Number.NEGATIVE_INFINITY, 2.0), false);
    _assert2.default.equal(equal(2.0, Number.NEGATIVE_INFINITY), false);
    _assert2.default.equal(equal(Number.NaN, Number.POSITIVE_INFINITY), false);
    _assert2.default.equal(equal(Number.POSITIVE_INFINITY, Number.NaN), false);
    _assert2.default.equal(equal(Number.NaN, Number.NEGATIVE_INFINITY), false);
    _assert2.default.equal(equal(Number.NEGATIVE_INFINITY, Number.NaN), false);
    // floating point numbers
    _assert2.default.equal(equal(0.3 - 0.2, 0.1), true);
  });

  it('should compare two booleans', function () {
    _assert2.default.equal(equal(true, true), true);
    _assert2.default.equal(equal(true, false), false);
    _assert2.default.equal(equal(false, true), false);
    _assert2.default.equal(equal(false, false), true);
  });

  it('should compare mixed numbers and booleans', function () {
    _assert2.default.equal(equal(2, true), false);
    _assert2.default.equal(equal(1, true), true);
    _assert2.default.equal(equal(0, true), false);
    _assert2.default.equal(equal(true, 2), false);
    _assert2.default.equal(equal(true, 1), true);
    _assert2.default.equal(equal(false, 2), false);
    _assert2.default.equal(equal(false, 0), true);
  });

  it('should compare bignumbers', function () {
    _assert2.default.equal(equal(bignumber(2), bignumber(3)), false);
    _assert2.default.equal(equal(bignumber(2), bignumber(2)), true);
    _assert2.default.equal(equal(bignumber(3), bignumber(2)), false);
    _assert2.default.equal(equal(bignumber(0), bignumber(0)), true);
    _assert2.default.equal(equal(bignumber(-2), bignumber(2)), false);
  });

  it('should compare mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(equal(bignumber(2), 3), false);
    _assert2.default.deepEqual(equal(2, bignumber(2)), true);

    _assert2.default.throws(function () {
      equal(1 / 3, bignumber(1).div(3));
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      equal(bignumber(1).div(3), 1 / 3);
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should compare mixed booleans and bignumbers', function () {
    _assert2.default.equal(equal(bignumber(0.1), true), false);
    _assert2.default.equal(equal(bignumber(1), true), true);
    _assert2.default.equal(equal(bignumber(1), false), false);
    _assert2.default.equal(equal(false, bignumber(0)), true);
    _assert2.default.equal(equal(true, bignumber(0)), false);
  });

  it('should compare two complex numbers correctly', function () {
    _assert2.default.equal(equal(complex(2, 3), complex(2, 4)), false);
    _assert2.default.equal(equal(complex(2, 3), complex(2, 3)), true);
    _assert2.default.equal(equal(complex(1, 3), complex(2, 3)), false);
    _assert2.default.equal(equal(complex(1, 3), complex(2, 4)), false);
    _assert2.default.equal(equal(complex(2, 0), 2), true);
    _assert2.default.equal(equal(complex(2, 1), 2), false);
    _assert2.default.equal(equal(2, complex(2, 0)), true);
    _assert2.default.equal(equal(2, complex(2, 1)), false);
    _assert2.default.equal(equal(complex(2, 0), 3), false);
  });

  it('should compare mixed complex numbers and bignumbers (downgrades to numbers)', function () {
    _assert2.default.deepEqual(equal(math.complex(6, 0), bignumber(6)), true);
    _assert2.default.deepEqual(equal(math.complex(6, -2), bignumber(6)), false);
    _assert2.default.deepEqual(equal(bignumber(6), math.complex(6, 0)), true);
    _assert2.default.deepEqual(equal(bignumber(6), math.complex(6, 4)), false);
  });

  it('should compare two fractions', function () {
    var a = math.fraction(3);
    _assert2.default.strictEqual(equal(a, math.fraction(2)).valueOf(), false);
    _assert2.default.equal(a.toString(), '3');

    _assert2.default.strictEqual(equal(math.fraction(2), math.fraction(3)).valueOf(), false);
    _assert2.default.strictEqual(equal(math.fraction(3), math.fraction(3)).valueOf(), true);

    _assert2.default.strictEqual(equal(math.add(math.fraction(0.1), math.fraction(0.2)), math.fraction(0.3)).valueOf(), true); // this would fail with numbers
  });

  it('should compare mixed fractions and numbers', function () {
    _assert2.default.strictEqual(equal(1, math.fraction(1, 3)), false);
    _assert2.default.strictEqual(equal(math.fraction(2), 2), true);
  });

  it('should compare two units correctly', function () {
    _assert2.default.equal(equal(unit('100cm'), unit('10inch')), false);
    _assert2.default.equal(equal(unit('100cm'), unit('1m')), true);
    _assert2.default.equal(equal(unit('12inch'), unit('1foot')), true); // round-off error should be no issue
    _assert2.default.equal(equal(unit('2.54cm'), unit('1inch')), true); // round-off error should be no issue
  });

  it('should compare null', function () {
    _assert2.default.equal(equal(null, null), true);
    _assert2.default.equal(equal(null, undefined), false);
    _assert2.default.equal(equal(undefined, null), false);
    _assert2.default.equal(equal(0, null), false);
    _assert2.default.equal(equal(null, 0), false);
    _assert2.default.equal(equal('null', null), false);
  });

  it('should compare undefined', function () {
    _assert2.default.equal(equal(undefined, undefined), true);
    _assert2.default.equal(equal(undefined, 'undefined'), false);
    _assert2.default.equal(equal(undefined, null), false);
    _assert2.default.equal(equal(undefined, 0), false);
    _assert2.default.equal(equal(2, undefined), false);
  });

  it('should apply configuration option epsilon', function () {
    var mymath = math.create();
    _assert2.default.equal(mymath.equal(1, 0.991), false);
    _assert2.default.equal(mymath.equal(math.bignumber(1), math.bignumber(0.991)), false);

    mymath.config({ epsilon: 1e-2 });
    _assert2.default.equal(mymath.equal(1, 0.991), true);
    _assert2.default.equal(mymath.equal(math.bignumber(1), math.bignumber(0.991)), true);
  });

  it('should throw an error when comparing a unit with a big number', function () {
    _assert2.default.throws(function () {
      equal(math.unit('5 m'), bignumber(10)).toString();
    });
  });

  it('should throw an error when comparing a unit with a number', function () {
    _assert2.default.throws(function () {
      equal(unit('100cm'), 22);
    });
  });

  it('should throw an error for two measures of different units', function () {
    _assert2.default.throws(function () {
      equal(math.unit(5, 'km'), math.unit(100, 'gram'));
    });
  });

  it('should compare two strings correctly', function () {
    _assert2.default.equal(equal('0', 0), true);
    _assert2.default.equal(equal('Hello', 'hello'), false);
    _assert2.default.equal(equal('hello', 'hello'), true);
  });

  describe('Array', function () {

    it('should compare array - scalar', function () {
      _assert2.default.deepEqual(equal('B', ['A', 'B', 'C']), [false, true, false]);
      _assert2.default.deepEqual(equal(['A', 'B', 'C'], 'B'), [false, true, false]);
    });

    it('should compare array - array', function () {
      _assert2.default.deepEqual(equal([[1, 2, 0], [-1, 0, 2]], [[1, -1, 0], [-1, 1, 0]]), [[true, false, true], [true, false, false]]);
    });

    it('should compare array - dense matrix', function () {
      _assert2.default.deepEqual(equal([[1, 2, 0], [-1, 0, 2]], matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, false, false]]));
    });

    it('should compare array - sparse matrix', function () {
      _assert2.default.deepEqual(equal([[1, 2, 0], [-1, 0, 2]], sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, false, false]]));
    });

    it('should throw an error if arrays have different sizes', function () {
      _assert2.default.throws(function () {
        equal([1, 4, 5], [3, 4]);
      });
    });
  });

  describe('DenseMatrix', function () {

    it('should compare dense matrix - scalar', function () {
      _assert2.default.deepEqual(equal('B', matrix(['A', 'B', 'C'])), matrix([false, true, false]));
      _assert2.default.deepEqual(equal(matrix(['A', 'B', 'C']), 'B'), matrix([false, true, false]));
    });

    it('should compare dense matrix - array', function () {
      _assert2.default.deepEqual(equal(matrix([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[true, false, true], [true, false, false]]));
    });

    it('should compare dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(equal(matrix([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, false, false]]));
    });

    it('should compare dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(equal(matrix([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, false, false]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should compare sparse matrix - scalar', function () {
      _assert2.default.deepEqual(equal('B', sparse([['A', 'B'], ['C', 'D']])), matrix([[false, true], [false, false]]));
      _assert2.default.deepEqual(equal(sparse([['A', 'B'], ['C', 'D']]), 'B'), matrix([[false, true], [false, false]]));
    });

    it('should compare sparse matrix - array', function () {
      _assert2.default.deepEqual(equal(sparse([[1, 2, 0], [-1, 0, 2]]), [[1, -1, 0], [-1, 1, 0]]), matrix([[true, false, true], [true, false, false]]));
    });

    it('should compare sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(equal(sparse([[1, 2, 0], [-1, 0, 2]]), matrix([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, false, false]]));
    });

    it('should compare sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(equal(sparse([[1, 2, 0], [-1, 0, 2]]), sparse([[1, -1, 0], [-1, 1, 0]])), matrix([[true, false, true], [true, false, false]]));
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      equal(1);
    }, /Too few arguments/);
    _assert2.default.throws(function () {
      equal(1, 2, 3);
    }, /Too many arguments/);
  });

  it('should LaTeX equal', function () {
    var expression = math.parse('equal(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1=2\\right)');
  });
});
