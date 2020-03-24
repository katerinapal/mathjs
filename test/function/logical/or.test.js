"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test or
var bignumber = _index.indexjs.bignumber,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    unit = _index.indexjs.unit,
    or = _index.indexjs.or;

describe('or', function () {

  it('should or two numbers correctly', function () {
    _assert2.default.strictEqual(or(1, 1), true);
    _assert2.default.strictEqual(or(-1, 1), true);
    _assert2.default.strictEqual(or(-1, -1), true);
    _assert2.default.strictEqual(or(0, -1), true);
    _assert2.default.strictEqual(or(1, 0), true);
    _assert2.default.strictEqual(or(1, NaN), true);
    _assert2.default.strictEqual(or(NaN, 1), true);
    _assert2.default.strictEqual(or(1e10, 0.019209), true);
    _assert2.default.strictEqual(or(-1.0e-100, 1.0e-100), true);
    _assert2.default.strictEqual(or(Infinity, -Infinity), true);
    _assert2.default.strictEqual(or(NaN, NaN), false);
    _assert2.default.strictEqual(or(NaN, 0), false);
    _assert2.default.strictEqual(or(0, NaN), false);
    _assert2.default.strictEqual(or(0, 0), false);
  });

  it('should or two complex numbers', function () {
    _assert2.default.strictEqual(or(complex(1, 1), complex(1, 1)), true);
    _assert2.default.strictEqual(or(complex(0, 1), complex(1, 1)), true);
    _assert2.default.strictEqual(or(complex(1, 0), complex(1, 1)), true);
    _assert2.default.strictEqual(or(complex(1, 1), complex(0, 1)), true);
    _assert2.default.strictEqual(or(complex(1, 1), complex(1, 0)), true);
    _assert2.default.strictEqual(or(complex(1, 0), complex(1, 0)), true);
    _assert2.default.strictEqual(or(complex(0, 1), complex(0, 1)), true);
    _assert2.default.strictEqual(or(complex(0, 0), complex(1, 1)), true);
    _assert2.default.strictEqual(or(complex(0, 0), complex(0, 1)), true);
    _assert2.default.strictEqual(or(complex(0, 0), complex(1, 0)), true);
    _assert2.default.strictEqual(or(complex(1, 1), complex(0, 0)), true);
    _assert2.default.strictEqual(or(complex(0, 1), complex(0, 0)), true);
    _assert2.default.strictEqual(or(complex(1, 0), complex(0, 0)), true);
    _assert2.default.strictEqual(or(complex(), complex(1, 1)), true);
    _assert2.default.strictEqual(or(complex(0), complex(1, 1)), true);
    _assert2.default.strictEqual(or(complex(1), complex(1, 1)), true);
    _assert2.default.strictEqual(or(complex(1, 1), complex()), true);
    _assert2.default.strictEqual(or(complex(1, 1), complex(0)), true);
    _assert2.default.strictEqual(or(complex(1, 1), complex(1)), true);
    _assert2.default.strictEqual(or(complex(0, 0), complex(0, 0)), false);
    _assert2.default.strictEqual(or(complex(), complex()), false);
  });

  it('should or mixed numbers and complex numbers', function () {
    _assert2.default.strictEqual(or(complex(1, 1), 1), true);
    _assert2.default.strictEqual(or(complex(1, 1), 0), true);
    _assert2.default.strictEqual(or(1, complex(1, 1)), true);
    _assert2.default.strictEqual(or(0, complex(1, 1)), true);
    _assert2.default.strictEqual(or(complex(0, 0), 1), true);
    _assert2.default.strictEqual(or(1, complex(0, 0)), true);
    _assert2.default.strictEqual(or(0, complex(0, 0)), false);
    _assert2.default.strictEqual(or(complex(0, 0), 0), false);
  });

  it('should or two booleans', function () {
    _assert2.default.strictEqual(or(true, true), true);
    _assert2.default.strictEqual(or(true, false), true);
    _assert2.default.strictEqual(or(false, true), true);
    _assert2.default.strictEqual(or(false, false), false);
  });

  it('should or mixed numbers and booleans', function () {
    _assert2.default.strictEqual(or(2, true), true);
    _assert2.default.strictEqual(or(2, false), true);
    _assert2.default.strictEqual(or(0, true), true);
    _assert2.default.strictEqual(or(0, false), false);
    _assert2.default.strictEqual(or(true, 2), true);
    _assert2.default.strictEqual(or(false, 2), true);
    _assert2.default.strictEqual(or(false, 0), false);
  });

  it('should or mixed numbers and null', function () {
    _assert2.default.strictEqual(or(2, null), true);
    _assert2.default.strictEqual(or(null, 2), true);
    _assert2.default.strictEqual(or(null, null), false);
  });

  it('should or bignumbers', function () {
    _assert2.default.strictEqual(or(bignumber(1), bignumber(1)), true);
    _assert2.default.strictEqual(or(bignumber(-1), bignumber(1)), true);
    _assert2.default.strictEqual(or(bignumber(-1), bignumber(-1)), true);
    _assert2.default.strictEqual(or(bignumber(0), bignumber(-1)), true);
    _assert2.default.strictEqual(or(bignumber(1), bignumber(0)), true);
    _assert2.default.strictEqual(or(bignumber(1), bignumber(NaN)), true);
    _assert2.default.strictEqual(or(bignumber(NaN), bignumber(1)), true);
    _assert2.default.strictEqual(or(bignumber('1e+10'), bignumber(0.19209)), true);
    _assert2.default.strictEqual(or(bignumber('-1.0e-100'), bignumber('1.0e-100')), true);
    _assert2.default.strictEqual(or(bignumber(Infinity), bignumber(-Infinity)), true);
    _assert2.default.strictEqual(or(bignumber(NaN), bignumber(NaN)), false);
    _assert2.default.strictEqual(or(bignumber(NaN), bignumber(0)), false);
    _assert2.default.strictEqual(or(bignumber(0), bignumber(NaN)), false);
    _assert2.default.strictEqual(or(bignumber(0), bignumber(0)), false);
  });

  it('should or mixed numbers and bignumbers', function () {
    _assert2.default.strictEqual(or(bignumber(2), 3), true);
    _assert2.default.strictEqual(or(2, bignumber(2)), true);
    _assert2.default.strictEqual(or(0, bignumber(2)), true);
    _assert2.default.strictEqual(or(2, bignumber(0)), true);
    _assert2.default.strictEqual(or(bignumber(0), 2), true);
    _assert2.default.strictEqual(or(bignumber(0), 0), false);
    _assert2.default.strictEqual(or(bignumber(2), 0), true);
    _assert2.default.strictEqual(or(bignumber(0), 0), false);
  });

  it('should or two units', function () {
    _assert2.default.strictEqual(or(unit('100cm'), unit('10inch')), true);
    _assert2.default.strictEqual(or(unit('100cm'), unit('0 inch')), true);
    _assert2.default.strictEqual(or(unit('0cm'), unit('1m')), true);
    _assert2.default.strictEqual(or(unit('m'), unit('1m')), true);
    _assert2.default.strictEqual(or(unit('1dm'), unit('m')), true);
    _assert2.default.strictEqual(or(unit('dm'), unit('m')), false);
    _assert2.default.strictEqual(or(unit('-100cm'), unit('-10inch')), true);
    _assert2.default.strictEqual(or(unit(5, 'km'), unit(100, 'gram')), true);
    _assert2.default.strictEqual(or(unit(5, 'km'), unit(0, 'gram')), true);
    _assert2.default.strictEqual(or(unit(0, 'km'), unit(100, 'gram')), true);
    _assert2.default.strictEqual(or(unit(0, 'km'), unit(0, 'gram')), false);

    _assert2.default.strictEqual(or(unit(bignumber(0), 'm'), unit(bignumber(0), 'm')), false);
    _assert2.default.strictEqual(or(unit(bignumber(1), 'm'), unit(bignumber(0), 'm')), true);
    _assert2.default.strictEqual(or(unit(bignumber(0), 'm'), unit(bignumber(1), 'm')), true);
    _assert2.default.strictEqual(or(unit(bignumber(1), 'm'), unit(bignumber(1), 'm')), true);
  });

  it('should or two arrays', function () {
    _assert2.default.deepEqual(or([0, 1, 0, 12], [0, 0, 1, 22]), [false, true, true, true]);
    _assert2.default.deepEqual(or([], []), []);
  });

  it('should or mixed numbers and arrays', function () {
    _assert2.default.deepEqual(or(10, [0, 2]), [true, true]);
    _assert2.default.deepEqual(or([0, 2], 10), [true, true]);
    _assert2.default.deepEqual(or(0, [0, 2]), [false, true]);
    _assert2.default.deepEqual(or([0, 2], 0), [false, true]);
  });

  describe('Array', function () {

    it('should or array - scalar', function () {
      _assert2.default.deepEqual(or(10, [0, 2]), [true, true]);
      _assert2.default.deepEqual(or([0, 2], 10), [true, true]);
    });

    it('should or array - array', function () {
      _assert2.default.deepEqual(or([0, 1, 0, 12], [0, 0, 1, 22]), [false, true, true, true]);
      _assert2.default.deepEqual(or([], []), []);
    });

    it('should or array - dense matrix', function () {
      _assert2.default.deepEqual(or([0, 1, 0, 12], matrix([0, 0, 1, 22])), matrix([false, true, true, true]));
      _assert2.default.deepEqual(or([], matrix([])), matrix([]));
    });

    it('should or array - sparse matrix', function () {
      _assert2.default.deepEqual(or([[0, 1], [0, 12]], sparse([[0, 0], [1, 22]])), matrix([[false, true], [true, true]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should or dense matrix - scalar', function () {
      _assert2.default.deepEqual(or(10, matrix([0, 2])), matrix([true, true]));
      _assert2.default.deepEqual(or(matrix([0, 2]), 10), matrix([true, true]));
    });

    it('should or dense matrix - array', function () {
      _assert2.default.deepEqual(or(matrix([0, 1, 0, 12]), [0, 0, 1, 22]), matrix([false, true, true, true]));
      _assert2.default.deepEqual(or(matrix([]), []), matrix([]));
    });

    it('should or dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(or(matrix([0, 1, 0, 12]), matrix([0, 0, 1, 22])), matrix([false, true, true, true]));
      _assert2.default.deepEqual(or(matrix([]), matrix([])), matrix([]));
    });

    it('should or dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(or(matrix([[0, 1], [0, 12]]), sparse([[0, 0], [1, 22]])), matrix([[false, true], [true, true]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should or sparse matrix - scalar', function () {
      _assert2.default.deepEqual(or(10, sparse([[0], [2]])), matrix([[true], [true]]));
      _assert2.default.deepEqual(or(sparse([[0], [2]]), 10), matrix([[true], [true]]));
    });

    it('should or sparse matrix - array', function () {
      _assert2.default.deepEqual(or(sparse([[0, 1], [0, 12]]), [[0, 0], [1, 22]]), matrix([[false, true], [true, true]]));
    });

    it('should or sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(or(sparse([[0, 1], [0, 12]]), matrix([[0, 0], [1, 22]])), matrix([[false, true], [true, true]]));
    });

    it('should or sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(or(sparse([[0, 1], [0, 12]]), sparse([[0, 0], [1, 22]])), sparse([[false, true], [true, true]]));
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      or(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      or(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      or(new Date(), true);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      or(true, new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      or(true, undefined);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      or(undefined, true);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX or', function () {
    var expression = _index.indexjs.parse('or(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1\\vee2\\right)');
  });
});
