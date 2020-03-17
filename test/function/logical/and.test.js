'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test and
var math = require('../../../index'),
    bignumber = math.bignumber,
    complex = math.complex,
    matrix = math.matrix,
    sparse = math.sparse,
    unit = math.unit,
    and = math.and;

describe('and', function () {

  it('should and two numbers correctly', function () {
    _assert2.default.strictEqual(and(1, 1), true);
    _assert2.default.strictEqual(and(-1, 1), true);
    _assert2.default.strictEqual(and(-1, -1), true);
    _assert2.default.strictEqual(and(0, -1), false);
    _assert2.default.strictEqual(and(1, 0), false);
    _assert2.default.strictEqual(and(1, NaN), false);
    _assert2.default.strictEqual(and(NaN, 1), false);
    _assert2.default.strictEqual(and(1e10, 0.019209), true);
    _assert2.default.strictEqual(and(-1.0e-100, 1.0e-100), true);
    _assert2.default.strictEqual(and(Infinity, -Infinity), true);
  });

  it('should and two complex numbers', function () {
    _assert2.default.strictEqual(and(complex(1, 1), complex(1, 1)), true);
    _assert2.default.strictEqual(and(complex(0, 1), complex(1, 1)), true);
    _assert2.default.strictEqual(and(complex(1, 0), complex(1, 1)), true);
    _assert2.default.strictEqual(and(complex(1, 1), complex(0, 1)), true);
    _assert2.default.strictEqual(and(complex(1, 1), complex(1, 0)), true);
    _assert2.default.strictEqual(and(complex(1, 0), complex(1, 0)), true);
    _assert2.default.strictEqual(and(complex(0, 1), complex(0, 1)), true);
    _assert2.default.strictEqual(and(complex(0, 0), complex(1, 1)), false);
    _assert2.default.strictEqual(and(complex(0, 0), complex(0, 1)), false);
    _assert2.default.strictEqual(and(complex(0, 0), complex(1, 0)), false);
    _assert2.default.strictEqual(and(complex(1, 1), complex(0, 0)), false);
    _assert2.default.strictEqual(and(complex(0, 1), complex(0, 0)), false);
    _assert2.default.strictEqual(and(complex(1, 0), complex(0, 0)), false);
    _assert2.default.strictEqual(and(complex(), complex(1, 1)), false);
    _assert2.default.strictEqual(and(complex(0), complex(1, 1)), false);
    _assert2.default.strictEqual(and(complex(1), complex(1, 1)), true);
    _assert2.default.strictEqual(and(complex(1, 1), complex()), false);
    _assert2.default.strictEqual(and(complex(1, 1), complex(0)), false);
    _assert2.default.strictEqual(and(complex(1, 1), complex(1)), true);
  });

  it('should and mixed numbers and complex numbers', function () {
    _assert2.default.strictEqual(and(complex(1, 1), 1), true);
    _assert2.default.strictEqual(and(complex(1, 1), 0), false);
    _assert2.default.strictEqual(and(1, complex(1, 1)), true);
    _assert2.default.strictEqual(and(0, complex(1, 1)), false);
    _assert2.default.strictEqual(and(complex(0, 0), 1), false);
    _assert2.default.strictEqual(and(1, complex(0, 0)), false);
  });

  it('should and two booleans', function () {
    _assert2.default.strictEqual(and(true, true), true);
    _assert2.default.strictEqual(and(true, false), false);
    _assert2.default.strictEqual(and(false, true), false);
    _assert2.default.strictEqual(and(false, false), false);
  });

  it('should and mixed numbers and booleans', function () {
    _assert2.default.strictEqual(and(2, true), true);
    _assert2.default.strictEqual(and(2, false), false);
    _assert2.default.strictEqual(and(0, true), false);
    _assert2.default.strictEqual(and(true, 2), true);
    _assert2.default.strictEqual(and(false, 2), false);
  });

  it('should and mixed numbers and null', function () {
    _assert2.default.strictEqual(and(2, null), false);
    _assert2.default.strictEqual(and(null, 2), false);
  });

  it('should and bignumbers', function () {
    _assert2.default.strictEqual(and(bignumber(1), bignumber(1)), true);
    _assert2.default.strictEqual(and(bignumber(-1), bignumber(1)), true);
    _assert2.default.strictEqual(and(bignumber(-1), bignumber(-1)), true);
    _assert2.default.strictEqual(and(bignumber(0), bignumber(-1)), false);
    _assert2.default.strictEqual(and(bignumber(1), bignumber(0)), false);
    _assert2.default.strictEqual(and(bignumber(1), bignumber(NaN)), false);
    _assert2.default.strictEqual(and(bignumber(NaN), bignumber(1)), false);
    _assert2.default.strictEqual(and(bignumber('1e+10'), bignumber(0.19209)), true);
    _assert2.default.strictEqual(and(bignumber('-1.0e-100'), bignumber('1.0e-100')), true);
    _assert2.default.strictEqual(and(bignumber(Infinity), bignumber(-Infinity)), true);
  });

  it('should and mixed numbers and bignumbers', function () {
    _assert2.default.strictEqual(and(bignumber(2), 3), true);
    _assert2.default.strictEqual(and(2, bignumber(2)), true);
    _assert2.default.strictEqual(and(0, bignumber(2)), false);
    _assert2.default.strictEqual(and(2, bignumber(0)), false);
    _assert2.default.strictEqual(and(bignumber(0), 2), false);
    _assert2.default.strictEqual(and(bignumber(2), 0), false);
  });

  it('should and two units', function () {
    _assert2.default.strictEqual(and(unit('100cm'), unit('10inch')), true);
    _assert2.default.strictEqual(and(unit('100cm'), unit('0 inch')), false);
    _assert2.default.strictEqual(and(unit('0cm'), unit('1m')), false);
    _assert2.default.strictEqual(and(unit('m'), unit('1m')), false);
    _assert2.default.strictEqual(and(unit('1dm'), unit('m')), false);
    _assert2.default.strictEqual(and(unit('-100cm'), unit('-10inch')), true);
    _assert2.default.strictEqual(and(unit(5, 'km'), unit(100, 'gram')), true);
    _assert2.default.strictEqual(and(unit(5, 'km'), unit(0, 'gram')), false);
    _assert2.default.strictEqual(and(unit(0, 'km'), unit(100, 'gram')), false);

    _assert2.default.strictEqual(and(unit(bignumber(0), 'm'), unit(bignumber(0), 'm')), false);
    _assert2.default.strictEqual(and(unit(bignumber(1), 'm'), unit(bignumber(0), 'm')), false);
    _assert2.default.strictEqual(and(unit(bignumber(0), 'm'), unit(bignumber(1), 'm')), false);
    _assert2.default.strictEqual(and(unit(bignumber(1), 'm'), unit(bignumber(1), 'm')), true);
  });

  describe('Array', function () {

    it('should and array - scalar', function () {
      _assert2.default.deepEqual(and(10, [0, 2]), [false, true]);
      _assert2.default.deepEqual(and([0, 2], 10), [false, true]);
    });

    it('should and array - array', function () {
      _assert2.default.deepEqual(and([0, 1, 0, 12], [0, 0, 1, 22]), [false, false, false, true]);
      _assert2.default.deepEqual(and([], []), []);
    });

    it('should and array - dense matrix', function () {
      _assert2.default.deepEqual(and([0, 1, 0, 12], matrix([0, 0, 1, 22])), matrix([false, false, false, true]));
      _assert2.default.deepEqual(and([], matrix([])), matrix([]));
    });

    it('should and array - sparse matrix', function () {
      _assert2.default.deepEqual(and([[0, 1], [0, 12]], sparse([[0, 0], [1, 22]])), sparse([[false, false], [false, true]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should and dense matrix - scalar', function () {
      _assert2.default.deepEqual(and(10, matrix([0, 2])), matrix([false, true]));
      _assert2.default.deepEqual(and(matrix([0, 2]), 10), matrix([false, true]));
    });

    it('should and dense matrix - array', function () {
      _assert2.default.deepEqual(and(matrix([0, 1, 0, 12]), [0, 0, 1, 22]), matrix([false, false, false, true]));
      _assert2.default.deepEqual(and(matrix([]), []), matrix([]));
    });

    it('should and dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(and(matrix([0, 1, 0, 12]), matrix([0, 0, 1, 22])), matrix([false, false, false, true]));
      _assert2.default.deepEqual(and(matrix([]), matrix([])), matrix([]));
    });

    it('should and dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(and(matrix([[0, 1], [0, 12]]), sparse([[0, 0], [1, 22]])), sparse([[false, false], [false, true]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should and sparse matrix - scalar', function () {
      _assert2.default.deepEqual(and(10, sparse([[0], [2]])), sparse([[false], [true]]));
      _assert2.default.deepEqual(and(sparse([[0], [2]]), 10), sparse([[false], [true]]));
    });

    it('should and sparse matrix - array', function () {
      _assert2.default.deepEqual(and(sparse([[0, 1], [0, 12]]), [[0, 0], [1, 22]]), sparse([[false, false], [false, true]]));
    });

    it('should and sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(and(sparse([[0, 1], [0, 12]]), matrix([[0, 0], [1, 22]])), sparse([[false, false], [false, true]]));
    });

    it('should and sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(and(sparse([[0, 1], [0, 12]]), sparse([[0, 0], [1, 22]])), sparse([[false, false], [false, true]]));
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      and(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      and(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      and(new Date(), true);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      and(true, new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      and(true, undefined);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      and(undefined, true);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX and', function () {
    var expression = math.parse('and(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1\\wedge2\\right)');
  });
});
