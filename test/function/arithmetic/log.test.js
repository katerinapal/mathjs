'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var error = require('../../../lib/error/index');
var math = require('../../../index');
var mathPredictable = math.create({ predictable: true });
var complex = math.complex;
var matrix = math.matrix;
var unit = math.unit;
var range = math.range;
var log = math.log;

describe('log', function () {
  it('should return the log of a boolean value', function () {
    _assert2.default.equal(log(true), 0);
    _assert2.default.equal(log(false), -Infinity);
    _assert2.default.equal(log(1, false), 0);
  });

  it('should return the log of null', function () {
    _assert2.default.equal(log(null), -Infinity);
    _assert2.default.equal(log(1, null), 0);
  });

  it('should return the log of positive numbers', function () {
    approx.deepEqual(log(1), 0);
    approx.deepEqual(log(2), 0.693147180559945);
    approx.deepEqual(log(3), 1.098612288668110);
    approx.deepEqual(math.exp(log(100)), 100);
  });

  it('should return the log of negative numbers', function () {
    approx.deepEqual(log(-1), complex('0.000000000000000 + 3.141592653589793i'));
    approx.deepEqual(log(-2), complex('0.693147180559945 + 3.141592653589793i'));
    approx.deepEqual(log(-3), complex('1.098612288668110 + 3.141592653589793i'));
  });

  it('should return the log of negative numbers with predictable: true', function () {
    _assert2.default.equal(_typeof(mathPredictable.log(-1)), 'number');
    (0, _assert2.default)(isNaN(mathPredictable.log(-1)));
  });

  it('should return the log of zero', function () {
    approx.deepEqual(log(0), -Infinity);
  });

  it('should return the log base N of a number', function () {
    approx.deepEqual(log(100, 10), 2);
    approx.deepEqual(log(1000, 10), 3);
    approx.deepEqual(log(8, 2), 3);
    approx.deepEqual(log(16, 2), 4);
  });

  it('should throw an error if invalid number of arguments', function () {
    _assert2.default.throws(function () {
      log();
    }, /TypeError: Too few arguments in function log \(expected: any, index: 1\)/);
    _assert2.default.throws(function () {
      log(1, 2, 3);
    }, /TypeError: Too many arguments in function log \(expected: 2, actual: 3\)/);
  });

  it('should return the log of positive bignumbers', function () {
    var bigmath = math.create({ precision: 100 });

    _assert2.default.deepEqual(bigmath.log(bigmath.bignumber(1)), bigmath.bignumber('0'));
    _assert2.default.deepEqual(bigmath.log(bigmath.bignumber(2)), bigmath.bignumber('0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875'));
    _assert2.default.deepEqual(bigmath.log(bigmath.bignumber(3)), bigmath.bignumber('1.098612288668109691395245236922525704647490557822749451734694333637494293218608966873615754813732089'));

    // note: the following gives a round-off error with regular numbers
    _assert2.default.deepEqual(bigmath.log(bigmath.bignumber(1000), bigmath.bignumber(10)), bigmath.bignumber(3));
  });

  it('should return the log of negative bignumbers', function () {
    var bigmath = math.create({ precision: 100 });

    approx.deepEqual(bigmath.log(bigmath.bignumber(-1)), complex('0.000000000000000 + 3.141592653589793i'));
    approx.deepEqual(bigmath.log(bigmath.bignumber(-2)), complex('0.693147180559945 + 3.141592653589793i'));
    approx.deepEqual(bigmath.log(bigmath.bignumber(-3)), complex('1.098612288668110 + 3.141592653589793i'));
  });

  it('should return the log of negative bignumbers with predictable:true', function () {
    _assert2.default.ok(mathPredictable.log(math.bignumber(-1)).isNaN());
  });

  it('should return the log of a bignumber with value zero', function () {
    var bigmath = math.create({ precision: 100 });

    _assert2.default.deepEqual(bigmath.log(bigmath.bignumber(0)).toString(), '-Infinity');
  });

  it('should return the log of a complex number', function () {
    approx.deepEqual(log(math.i), complex('1.570796326794897i'));
    approx.deepEqual(log(complex(0, -1)), complex('-1.570796326794897i'));
    approx.deepEqual(log(complex(1, 1)), complex('0.346573590279973 + 0.785398163397448i'));
    approx.deepEqual(log(complex(1, -1)), complex('0.346573590279973 - 0.785398163397448i'));
    approx.deepEqual(log(complex(-1, -1)), complex('0.346573590279973 - 2.356194490192345i'));
    approx.deepEqual(log(complex(-1, 1)), complex('0.346573590279973 + 2.356194490192345i'));
    approx.deepEqual(log(complex(1, 0)), complex(0, 0));
  });

  it('should throw an error when used on a unit', function () {
    _assert2.default.throws(function () {
      log(unit('5cm'));
    });
  });

  it('should throw an error when used on a string', function () {
    _assert2.default.throws(function () {
      log('text');
    });
  });

  it('should return the log of each element of a matrix', function () {
    var res = [0, 0.693147180559945, 1.098612288668110, 1.386294361119891];
    approx.deepEqual(log([1, 2, 3, 4]), res);
    approx.deepEqual(log(matrix([1, 2, 3, 4])), matrix(res));
    approx.deepEqual(log(matrix([[1, 2], [3, 4]])), matrix([[0, 0.693147180559945], [1.098612288668110, 1.386294361119891]]));
  });

  it('should LaTeX log', function () {
    var expr1 = math.parse('log(e)');
    var expr2 = math.parse('log(32,2)');

    _assert2.default.equal(expr1.toTex(), '\\ln\\left( e\\right)');
    _assert2.default.equal(expr2.toTex(), '\\log_{2}\\left(32\\right)');
  });
});
