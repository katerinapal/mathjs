"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var arg = math.arg;

describe('arg', function () {
  it('should compute the argument of a boolean', function () {
    _assert2.default.equal(arg(true), 0);
    _assert2.default.equal(arg(false), 0);
  });

  it('should compute the argument of null', function () {
    _assert2.default.equal(arg(null), 0);
  });

  it('should compute the argument of a number', function () {
    _assert2.default.equal(arg(1), 0);
    _assert2.default.equal(arg(2), 0);
    _assert2.default.equal(arg(0), 0);
    (0, _approx.equal)(arg(-2), 3.141592653589793);
  });

  it('should compute the argument of a bignumber (downgrades to number)', function () {
    _assert2.default.equal(arg(math.bignumber(1)), 0);
  });

  it('should compute the argument of a complex number correctly', function () {
    _assert2.default.equal(arg(math.complex('0')) / math.pi, 0);
    _assert2.default.equal(arg(math.complex('1 + 0i')) / math.pi, 0);
    _assert2.default.equal(arg(math.complex('1 + i')) / math.pi, 0.25);
    _assert2.default.equal(arg(math.complex('0 + i')) / math.pi, 0.5);
    _assert2.default.equal(arg(math.complex('-1 + i')) / math.pi, 0.75);
    _assert2.default.equal(arg(math.complex('-1 + 0i')) / math.pi, 1);
    _assert2.default.equal(arg(math.complex('-1 - i')) / math.pi, -0.75);
    _assert2.default.equal(arg(math.complex('0 - i')) / math.pi, -0.5);
    _assert2.default.equal(arg(math.complex('1 - i')) / math.pi, -0.25);
    _assert2.default.equal(arg(math.i) / math.pi, 0.5);
  });

  it('should calculate the argument for each element in a matrix', function () {
    _assert2.default.deepEqual(math.divide(arg([math.i, math.unaryMinus(math.i), math.add(1, math.i)]), math.pi), [0.5, -0.5, 0.25]);
    _assert2.default.deepEqual(math.matrix(math.divide(arg([math.i, math.unaryMinus(math.i), math.add(1, math.i)]), math.pi)).valueOf(), [0.5, -0.5, 0.25]);
  });

  it('should compute the argument of a real number correctly', function () {
    _assert2.default.equal(arg(2) / math.pi, 0);
    _assert2.default.equal(arg(-2) / math.pi, 1);
  });

  it('should throw an error if used with a string', function () {
    _assert2.default.throws(function () {
      arg('string');
    });
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      arg(math.unit('5cm'));
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      arg();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      arg(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX arg', function () {
    var expression = math.parse('arg(1+i)');
    _assert2.default.equal(expression.toTex(), '\\arg\\left(1+ i\\right)');
  });
});
