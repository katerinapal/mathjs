"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Complex = _index.indexjs.type.Complex;
var Matrix = _index.indexjs.type.Matrix;
var Unit = _index.indexjs.type.Unit;
var ResultSet = _index.indexjs.type.ResultSet;

describe('eval', function () {

  it('should evaluate expressions', function () {
    (0, _approx.equal)(_index.indexjs.eval('(2+3)/4'), 1.25);
    _assert2.default.deepEqual(_index.indexjs.eval('sqrt(-4)'), new Complex(0, 2));
  });

  it('should eval a list of expressions', function () {
    _assert2.default.deepEqual(_index.indexjs.eval(['1+2', '3+4', '5+6']), [3, 7, 11]);
    _assert2.default.deepEqual(_index.indexjs.eval(['a=3', 'b=4', 'a*b']), [3, 4, 12]);
    _assert2.default.deepEqual(_index.indexjs.eval(_index.indexjs.matrix(['a=3', 'b=4', 'a*b'])), _index.indexjs.matrix([3, 4, 12]));
    _assert2.default.deepEqual(_index.indexjs.eval(['a=3', 'b=4', 'a*b']), [3, 4, 12]);
  });

  it('should eval a series of expressions', function () {
    _assert2.default.deepEqual(_index.indexjs.eval('a=3\nb=4\na*b'), new ResultSet([3, 4, 12]));
    _assert2.default.deepEqual(_index.indexjs.eval('f(x) = a * x; a=2; f(4)'), new ResultSet([8]));
    _assert2.default.deepEqual(_index.indexjs.eval('b = 43; b * 4'), new ResultSet([172]));
  });

  it('should throw an error if wrong number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.eval();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.eval('', {}, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error with a unit', function () {
    _assert2.default.throws(function () {
      _index.indexjs.eval(new Unit(5, 'cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error with a complex number', function () {
    _assert2.default.throws(function () {
      _index.indexjs.eval(new Complex(2, 3));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error with a boolean', function () {
    _assert2.default.throws(function () {
      _index.indexjs.eval(true);
    }, TypeError);
  });

  it('should handle the given scope', function () {
    var scope = {
      a: 3,
      b: 4
    };
    _assert2.default.deepEqual(_index.indexjs.eval('a*b', scope), 12);
    _assert2.default.deepEqual(_index.indexjs.eval('c=5', scope), 5);
    _assert2.default.deepEqual(_index.indexjs.format(_index.indexjs.eval('f(x) = x^a', scope)), 'f(x)');

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
    _assert2.default.deepEqual(_index.indexjs.eval('hello("jos")', scope), 'hello, jos!');
  });

  it('should LaTeX eval', function () {
    var expr1 = _index.indexjs.parse('eval(expr)');
    var expr2 = _index.indexjs.parse('eval(expr,scope)');

    _assert2.default.equal(expr1.toTex(), '\\mathrm{eval}\\left( expr\\right)');
    _assert2.default.equal(expr2.toTex(), '\\mathrm{eval}\\left( expr, scope\\right)');
  });
});
