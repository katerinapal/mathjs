"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = math.bignumber;
var fraction = math.fraction;
var matrix = math.matrix;
var sparse = math.sparse;
var round = math.round;

describe('round', function () {

  it('should round a number to te given number of decimals', function () {
    (0, _approx.equal)(round(math.pi), 3);
    (0, _approx.equal)(round(math.pi * 1000), 3142);
    (0, _approx.equal)(round(math.pi, 3), 3.142);
    (0, _approx.equal)(round(math.pi, 6), 3.141593);
    (0, _approx.equal)(round(1234.5678, 2), 1234.57);
    (0, _approx.equal)(round(2.135, 2), 2.14);
  });

  it('should round booleans (yeah, not really useful but it should be supported)', function () {
    (0, _approx.equal)(round(true), 1);
    (0, _approx.equal)(round(false), 0);
    (0, _approx.equal)(round(true, 2), 1);
    (0, _approx.equal)(round(false, 2), 0);
  });

  it('should round null', function () {
    _assert2.default.equal(round(null), 0);
    _assert2.default.equal(round(null, 2), 0);
  });

  it('should throw an error on invalid type of value', function () {
    _assert2.default.throws(function () {
      round(new Date());
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error on invalid type of n', function () {
    _assert2.default.throws(function () {
      round(math.pi, new Date());
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error on invalid value of n', function () {
    _assert2.default.throws(function () {
      round(math.pi, -2);
    }, /Number of decimals in function round must be in te range of 0-15/);
    _assert2.default.throws(function () {
      round(math.pi, 20);
    }, /Number of decimals in function round must be in te range of 0-15/);
    _assert2.default.throws(function () {
      round(math.pi, 2.5);
    }, /Number of decimals in function round must be an integer/);
  });

  it('should throw an error if used with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      round();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      round(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should round bignumbers', function () {
    _assert2.default.deepEqual(round(bignumber(2.7)), bignumber(3));
    _assert2.default.deepEqual(round(bignumber(2.1)), bignumber(2));
    _assert2.default.deepEqual(round(bignumber(2.123456), bignumber(3)), bignumber(2.123));
    _assert2.default.deepEqual(round(bignumber(2.123456), 3), bignumber(2.123));
    _assert2.default.deepEqual(round(2.1234567, bignumber(3)), bignumber(2.123));
    _assert2.default.deepEqual(round(true, bignumber(3)), bignumber(1));
    _assert2.default.deepEqual(round(bignumber(1.23), true), bignumber(1.2));
  });

  it('should round fractions', function () {
    var a = fraction('2/3');
    (0, _assert2.default)(round(a) instanceof math.type.Fraction);
    _assert2.default.equal(a.toString(), '0.(6)');

    _assert2.default.equal(round(fraction('2/3')).toString(), '1');
    _assert2.default.equal(round(fraction('1/3')).toString(), '0');
    _assert2.default.equal(round(fraction('1/2')).toString(), '1');
  });

  it('should round real and imag part of a complex number', function () {
    _assert2.default.deepEqual(round(math.complex(2.2, math.pi)), math.complex(2, 3));
  });

  it('should round a complex number with a bignumber as number of decimals', function () {
    _assert2.default.deepEqual(round(math.complex(2.157, math.pi), bignumber(2)), math.complex(2.16, 3.14));
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      round(math.unit('5cm'));
    }, TypeError, 'Function round(unit) not supported');
    _assert2.default.throws(function () {
      round(math.unit('5cm'), 2);
    }, TypeError, 'Function round(unit) not supported');
    _assert2.default.throws(function () {
      round(math.unit('5cm'), bignumber(2));
    }, TypeError, 'Function round(unit) not supported');
  });

  it('should convert to a number when used with a string', function () {
    _assert2.default.strictEqual(round('3.6'), 4);
    _assert2.default.strictEqual(round('3.12345', '3'), 3.123);
    _assert2.default.throws(function () {
      round('hello world');
    }, /Cannot convert "hello world" to a number/);
  });

  it('should round each element in a matrix, array, range', function () {
    _assert2.default.deepEqual(round(math.range(0, 2.1, 1 / 3), 2), math.matrix([0, 0.33, 0.67, 1, 1.33, 1.67, 2]));
    _assert2.default.deepEqual(round(math.range(0, 2.1, 1 / 3)), math.matrix([0, 0, 1, 1, 1, 2, 2]));
    _assert2.default.deepEqual(round([1.7, 2.3]), [2, 2]);
    _assert2.default.deepEqual(round(math.matrix([1.7, 2.3])).valueOf(), [2, 2]);
  });

  describe('Array', function () {

    it('should round array', function () {
      _assert2.default.deepEqual(round([1.7, 2.3]), [2, 2]);
    });

    it('should round array and scalar', function () {
      _assert2.default.deepEqual(round([1.7777, 2.3456], 3), [1.778, 2.346]);
      _assert2.default.deepEqual(round(3.12385, [2, 3]), [3.12, 3.124]);
    });
  });

  describe('DenseMatrix', function () {

    it('should round dense matrix', function () {
      _assert2.default.deepEqual(round(matrix([[1.7, 2.3], [8.987, -3.565]])), matrix([[2, 2], [9, -4]]));
    });

    it('should round dense matrix and scalar', function () {
      _assert2.default.deepEqual(round(matrix([[1.7777, 2.3456], [-90.8272, 0]]), 3), matrix([[1.778, 2.346], [-90.827, 0]]));
      _assert2.default.deepEqual(round(3.12385, matrix([[2, 3], [0, 2]])), matrix([[3.12, 3.124], [3, 3.12]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should round sparse matrix', function () {
      _assert2.default.deepEqual(round(sparse([[1.7, 0], [8.987, -3.565]])), sparse([[2, 0], [9, -4]]));
    });

    it('should round sparse matrix and scalar', function () {
      _assert2.default.deepEqual(round(sparse([[1.7777, 2.3456], [-90.8272, 0]]), 3), sparse([[1.778, 2.346], [-90.827, 0]]));
      _assert2.default.deepEqual(round(3.12385, sparse([[2, 3], [0, 2]])), matrix([[3.12, 3.124], [3, 3.12]]));
    });
  });

  it('should LaTeX round', function () {
    var expr1 = math.parse('round(1.1)');
    var expr2 = math.parse('round(1.1,2)');

    _assert2.default.equal(expr1.toTex(), '\\left\\lfloor1.1\\right\\rceil');
    _assert2.default.equal(expr2.toTex(), '\\mathrm{round}\\left(1.1,2\\right)');
  });
});
