"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test xor
var bignumber = _index.indexjs.bignumber,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    unit = _index.indexjs.unit,
    xor = _index.indexjs.xor;

describe('xor', function () {

  it('should xor two numbers correctly', function () {
    _assert2.default.strictEqual(xor(1, 1), false);
    _assert2.default.strictEqual(xor(-1, 1), false);
    _assert2.default.strictEqual(xor(-1, -1), false);
    _assert2.default.strictEqual(xor(0, -1), true);
    _assert2.default.strictEqual(xor(1, 0), true);
    _assert2.default.strictEqual(xor(1, NaN), true);
    _assert2.default.strictEqual(xor(NaN, 1), true);
    _assert2.default.strictEqual(xor(1e10, 0.019209), false);
    _assert2.default.strictEqual(xor(-1.0e-100, 1.0e-100), false);
    _assert2.default.strictEqual(xor(Infinity, -Infinity), false);
    _assert2.default.strictEqual(xor(NaN, NaN), false);
    _assert2.default.strictEqual(xor(NaN, 0), false);
    _assert2.default.strictEqual(xor(0, NaN), false);
    _assert2.default.strictEqual(xor(0, 0), false);
  });

  it('should xor two complex numbers', function () {
    _assert2.default.strictEqual(xor(complex(1, 1), complex(1, 1)), false);
    _assert2.default.strictEqual(xor(complex(0, 1), complex(1, 1)), false);
    _assert2.default.strictEqual(xor(complex(1, 0), complex(1, 1)), false);
    _assert2.default.strictEqual(xor(complex(1, 1), complex(0, 1)), false);
    _assert2.default.strictEqual(xor(complex(1, 1), complex(1, 0)), false);
    _assert2.default.strictEqual(xor(complex(1, 0), complex(1, 0)), false);
    _assert2.default.strictEqual(xor(complex(0, 1), complex(0, 1)), false);
    _assert2.default.strictEqual(xor(complex(0, 0), complex(1, 1)), true);
    _assert2.default.strictEqual(xor(complex(0, 0), complex(0, 1)), true);
    _assert2.default.strictEqual(xor(complex(0, 0), complex(1, 0)), true);
    _assert2.default.strictEqual(xor(complex(1, 1), complex(0, 0)), true);
    _assert2.default.strictEqual(xor(complex(0, 1), complex(0, 0)), true);
    _assert2.default.strictEqual(xor(complex(1, 0), complex(0, 0)), true);
    _assert2.default.strictEqual(xor(complex(), complex(1, 1)), true);
    _assert2.default.strictEqual(xor(complex(0), complex(1, 1)), true);
    _assert2.default.strictEqual(xor(complex(1), complex(1, 1)), false);
    _assert2.default.strictEqual(xor(complex(1, 1), complex()), true);
    _assert2.default.strictEqual(xor(complex(1, 1), complex(0)), true);
    _assert2.default.strictEqual(xor(complex(1, 1), complex(1)), false);
    _assert2.default.strictEqual(xor(complex(0, 0), complex(0, 0)), false);
    _assert2.default.strictEqual(xor(complex(), complex()), false);
  });

  it('should xor mixed numbers and complex numbers', function () {
    _assert2.default.strictEqual(xor(complex(1, 1), 1), false);
    _assert2.default.strictEqual(xor(complex(1, 1), 0), true);
    _assert2.default.strictEqual(xor(1, complex(1, 1)), false);
    _assert2.default.strictEqual(xor(0, complex(1, 1)), true);
    _assert2.default.strictEqual(xor(complex(0, 0), 1), true);
    _assert2.default.strictEqual(xor(1, complex(0, 0)), true);
    _assert2.default.strictEqual(xor(0, complex(0, 0)), false);
    _assert2.default.strictEqual(xor(complex(0, 0), 0), false);
  });

  it('should xor two booleans', function () {
    _assert2.default.strictEqual(xor(true, true), false);
    _assert2.default.strictEqual(xor(true, false), true);
    _assert2.default.strictEqual(xor(false, true), true);
    _assert2.default.strictEqual(xor(false, false), false);
  });

  it('should xor mixed numbers and booleans', function () {
    _assert2.default.strictEqual(xor(2, true), false);
    _assert2.default.strictEqual(xor(2, false), true);
    _assert2.default.strictEqual(xor(0, true), true);
    _assert2.default.strictEqual(xor(true, 2), false);
    _assert2.default.strictEqual(xor(false, 2), true);
    _assert2.default.strictEqual(xor(false, 0), false);
  });

  it('should xor mixed numbers and null', function () {
    _assert2.default.strictEqual(xor(2, null), true);
    _assert2.default.strictEqual(xor(null, 2), true);
  });

  it('should xor bignumbers', function () {
    _assert2.default.strictEqual(xor(bignumber(1), bignumber(1)), false);
    _assert2.default.strictEqual(xor(bignumber(-1), bignumber(1)), false);
    _assert2.default.strictEqual(xor(bignumber(-1), bignumber(-1)), false);
    _assert2.default.strictEqual(xor(bignumber(0), bignumber(-1)), true);
    _assert2.default.strictEqual(xor(bignumber(1), bignumber(0)), true);
    _assert2.default.strictEqual(xor(bignumber(1), bignumber(NaN)), true);
    _assert2.default.strictEqual(xor(bignumber(NaN), bignumber(1)), true);
    _assert2.default.strictEqual(xor(bignumber('1e+10'), bignumber(0.19209)), false);
    _assert2.default.strictEqual(xor(bignumber('-1.0e-400'), bignumber('1.0e-400')), false);
    _assert2.default.strictEqual(xor(bignumber(Infinity), bignumber(-Infinity)), false);
    _assert2.default.strictEqual(xor(bignumber(NaN), bignumber(NaN)), false);
    _assert2.default.strictEqual(xor(bignumber(NaN), bignumber(0)), false);
    _assert2.default.strictEqual(xor(bignumber(0), bignumber(NaN)), false);
    _assert2.default.strictEqual(xor(bignumber(0), bignumber(0)), false);
  });

  it('should xor mixed numbers and bignumbers', function () {
    _assert2.default.strictEqual(xor(bignumber(2), 3), false);
    _assert2.default.strictEqual(xor(2, bignumber(2)), false);
    _assert2.default.strictEqual(xor(0, bignumber(2)), true);
    _assert2.default.strictEqual(xor(2, bignumber(0)), true);
    _assert2.default.strictEqual(xor(bignumber(0), 2), true);
    _assert2.default.strictEqual(xor(bignumber(2), 0), true);
    _assert2.default.strictEqual(xor(bignumber(0), 0), false);
  });

  it('should xor two units', function () {
    _assert2.default.strictEqual(xor(unit('100cm'), unit('10inch')), false);
    _assert2.default.strictEqual(xor(unit('100cm'), unit('0 inch')), true);
    _assert2.default.strictEqual(xor(unit('0cm'), unit('1m')), true);
    _assert2.default.strictEqual(xor(unit('m'), unit('1m')), true);
    _assert2.default.strictEqual(xor(unit('1dm'), unit('m')), true);
    _assert2.default.strictEqual(xor(unit('-100cm'), unit('-10inch')), false);
    _assert2.default.strictEqual(xor(unit(5, 'km'), unit(100, 'gram')), false);
    _assert2.default.strictEqual(xor(unit(5, 'km'), unit(0, 'gram')), true);
    _assert2.default.strictEqual(xor(unit(0, 'km'), unit(100, 'gram')), true);
    _assert2.default.strictEqual(xor(unit(0, 'km'), unit(0, 'gram')), false);

    _assert2.default.strictEqual(xor(unit(bignumber(0), 'm'), unit(bignumber(0), 'm')), false);
    _assert2.default.strictEqual(xor(unit(bignumber(1), 'm'), unit(bignumber(0), 'm')), true);
    _assert2.default.strictEqual(xor(unit(bignumber(0), 'm'), unit(bignumber(1), 'm')), true);
    _assert2.default.strictEqual(xor(unit(bignumber(1), 'm'), unit(bignumber(1), 'm')), false);
  });

  it('should xor two arrays', function () {
    _assert2.default.deepEqual(xor([0, 1, 0, 12], [0, 0, 1, 22]), [false, true, true, false]);
    _assert2.default.deepEqual(xor([], []), []);
  });

  describe('Array', function () {

    it('should xor array - scalar', function () {
      _assert2.default.deepEqual(xor(10, [0, 2]), [true, false]);
      _assert2.default.deepEqual(xor([0, 2], 10), [true, false]);
    });

    it('should xor array - array', function () {
      _assert2.default.deepEqual(xor([0, 1, 0, 12], [0, 0, 1, 22]), [false, true, true, false]);
      _assert2.default.deepEqual(xor([], []), []);
    });

    it('should xor array - dense matrix', function () {
      _assert2.default.deepEqual(xor([0, 1, 0, 12], matrix([0, 0, 1, 22])), matrix([false, true, true, false]));
      _assert2.default.deepEqual(xor([], matrix([])), matrix([]));
    });

    it('should xor array - sparse matrix', function () {
      _assert2.default.deepEqual(xor([[0, 1], [0, 12]], sparse([[0, 0], [1, 22]])), matrix([[false, true], [true, false]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should xor dense matrix - scalar', function () {
      _assert2.default.deepEqual(xor(10, matrix([0, 2])), matrix([true, false]));
      _assert2.default.deepEqual(xor(matrix([0, 2]), 10), matrix([true, false]));
    });

    it('should xor dense matrix - array', function () {
      _assert2.default.deepEqual(xor(matrix([0, 1, 0, 12]), [0, 0, 1, 22]), matrix([false, true, true, false]));
      _assert2.default.deepEqual(xor(matrix([]), []), matrix([]));
    });

    it('should xor dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(xor(matrix([0, 1, 0, 12]), matrix([0, 0, 1, 22])), matrix([false, true, true, false]));
      _assert2.default.deepEqual(xor(matrix([]), matrix([])), matrix([]));
    });

    it('should xor dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(xor(matrix([[0, 1], [0, 12]]), sparse([[0, 0], [1, 22]])), matrix([[false, true], [true, false]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should xor sparse matrix - scalar', function () {
      _assert2.default.deepEqual(xor(10, sparse([[0], [2]])), matrix([[true], [false]]));
      _assert2.default.deepEqual(xor(sparse([[0], [2]]), 10), matrix([[true], [false]]));
    });

    it('should xor sparse matrix - array', function () {
      _assert2.default.deepEqual(xor(sparse([[0, 1], [0, 12]]), [[0, 0], [1, 22]]), matrix([[false, true], [true, false]]));
    });

    it('should xor sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(xor(sparse([[0, 1], [0, 12]]), matrix([[0, 0], [1, 22]])), matrix([[false, true], [true, false]]));
    });

    it('should xor sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(xor(sparse([[0, 1], [0, 12]]), sparse([[0, 0], [1, 22]])), matrix([[false, true], [true, false]]));
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      xor(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      xor(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      xor(new Date(), true);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      xor(true, new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      xor(true, undefined);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      xor(undefined, true);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX xor', function () {
    var expression = _index.indexjs.parse('xor(1,2)');
    _assert2.default.equal(expression.toTex(), '\\left(1\\veebar2\\right)');
  });
});
