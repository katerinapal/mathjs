'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var Complex = math.type.Complex;
var Matrix = math.type.Matrix;
var Unit = math.type.Unit;
var ResultSet = math.type.ResultSet;

describe('eval', function () {

  it('should evaluate expressions', function () {
    approx.equal(math.eval('(2+3)/4'), 1.25);
    _assert2.default.deepEqual(math.eval('sqrt(-4)'), new Complex(0, 2));
  });

  it('should eval a list of expressions', function () {
    _assert2.default.deepEqual(math.eval(['1+2', '3+4', '5+6']), [3, 7, 11]);
    _assert2.default.deepEqual(math.eval(['a=3', 'b=4', 'a*b']), [3, 4, 12]);
    _assert2.default.deepEqual(math.eval(math.matrix(['a=3', 'b=4', 'a*b'])), math.matrix([3, 4, 12]));
    _assert2.default.deepEqual(math.eval(['a=3', 'b=4', 'a*b']), [3, 4, 12]);
  });

  it('should eval a series of expressions', function () {
    _assert2.default.deepEqual(math.eval('a=3\nb=4\na*b'), new ResultSet([3, 4, 12]));
    _assert2.default.deepEqual(math.eval('f(x) = a * x; a=2; f(4)'), new ResultSet([8]));
    _assert2.default.deepEqual(math.eval('b = 43; b * 4'), new ResultSet([172]));
  });

  it('should throw an error if wrong number of arguments', function () {
    _assert2.default.throws(function () {
      math.eval();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      math.eval('', {}, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error with a unit', function () {
    _assert2.default.throws(function () {
      math.eval(new Unit(5, 'cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error with a complex number', function () {
    _assert2.default.throws(function () {
      math.eval(new Complex(2, 3));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error with a boolean', function () {
    _assert2.default.throws(function () {
      math.eval(true);
    }, TypeError);
  });

  it('should handle the given scope', function () {
    var scope = {
      a: 3,
      b: 4
    };
    _assert2.default.deepEqual(math.eval('a*b', scope), 12);
    _assert2.default.deepEqual(math.eval('c=5', scope), 5);
    _assert2.default.deepEqual(math.format(math.eval('f(x) = x^a', scope)), 'f(x)');

    _assert2.default.deepEqual(Object.keys(scope).length, 4);
    _assert2.default.deepEqual(scope.a, 3);
    _assert2.default.deepEqual(scope.b, 4);
    _assert2.default.deepEqual(scope.c, 5);
    _assert2.default.deepEqual(_typeof(scope.f), 'function');

    _assert2.default.equal(scope.f(3), 27);
    scope.a = 2;
    _assert2.default.equal(scope.f(3), 9);
    scope.hello = function (name) {
      return 'hello, ' + name + '!';
    };
    _assert2.default.deepEqual(math.eval('hello("jos")', scope), 'hello, jos!');
  });

  it('should LaTeX eval', function () {
    var expr1 = math.parse('eval(expr)');
    var expr2 = math.parse('eval(expr,scope)');

    _assert2.default.equal(expr1.toTex(), '\\mathrm{eval}\\left( expr\\right)');
    _assert2.default.equal(expr2.toTex(), '\\mathrm{eval}\\left( expr, scope\\right)');
  });
});
