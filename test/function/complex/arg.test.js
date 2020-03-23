"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var arg = _index.indexjs.arg;

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
    _assert2.default.equal(arg(_index.indexjs.bignumber(1)), 0);
  });

  it('should compute the argument of a complex number correctly', function () {
    _assert2.default.equal(arg(_index.indexjs.complex('0')) / _index.indexjs.pi, 0);
    _assert2.default.equal(arg(_index.indexjs.complex('1 + 0i')) / _index.indexjs.pi, 0);
    _assert2.default.equal(arg(_index.indexjs.complex('1 + i')) / _index.indexjs.pi, 0.25);
    _assert2.default.equal(arg(_index.indexjs.complex('0 + i')) / _index.indexjs.pi, 0.5);
    _assert2.default.equal(arg(_index.indexjs.complex('-1 + i')) / _index.indexjs.pi, 0.75);
    _assert2.default.equal(arg(_index.indexjs.complex('-1 + 0i')) / _index.indexjs.pi, 1);
    _assert2.default.equal(arg(_index.indexjs.complex('-1 - i')) / _index.indexjs.pi, -0.75);
    _assert2.default.equal(arg(_index.indexjs.complex('0 - i')) / _index.indexjs.pi, -0.5);
    _assert2.default.equal(arg(_index.indexjs.complex('1 - i')) / _index.indexjs.pi, -0.25);
    _assert2.default.equal(arg(_index.indexjs.i) / _index.indexjs.pi, 0.5);
  });

  it('should calculate the argument for each element in a matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.divide(arg([_index.indexjs.i, _index.indexjs.unaryMinus(_index.indexjs.i), _index.indexjs.add(1, _index.indexjs.i)]), _index.indexjs.pi), [0.5, -0.5, 0.25]);
    _assert2.default.deepEqual(_index.indexjs.matrix(_index.indexjs.divide(arg([_index.indexjs.i, _index.indexjs.unaryMinus(_index.indexjs.i), _index.indexjs.add(1, _index.indexjs.i)]), _index.indexjs.pi)).valueOf(), [0.5, -0.5, 0.25]);
  });

  it('should compute the argument of a real number correctly', function () {
    _assert2.default.equal(arg(2) / _index.indexjs.pi, 0);
    _assert2.default.equal(arg(-2) / _index.indexjs.pi, 1);
  });

  it('should throw an error if used with a string', function () {
    _assert2.default.throws(function () {
      arg('string');
    });
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      arg(_index.indexjs.unit('5cm'));
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
    var expression = _index.indexjs.parse('arg(1+i)');
    _assert2.default.equal(expression.toTex(), '\\arg\\left(1+ i\\right)');
  });
});
