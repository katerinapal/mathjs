import assert from "assert";
import { toolsapprox } from "../../../tools/approx";
import { index } from "../../../index";
var approx = toolsapprox;
var math = index;
var Complex = index.type.Complex;
var Matrix = index.type.Matrix;
var Unit = index.type.Unit;
var ResultSet = index.type.ResultSet;

describe('eval', function() {

  it('should evaluate expressions', function() {
    toolsapprox(index.eval('(2+3)/4'), 1.25);
    assert.deepEqual(index.eval('sqrt(-4)'), new Complex(0, 2));
  });

  it('should eval a list of expressions', function() {
    assert.deepEqual(index.eval(['1+2', '3+4', '5+6']), [3, 7, 11]);
    assert.deepEqual(index.eval(['a=3', 'b=4', 'a*b']), [3, 4, 12]);
    assert.deepEqual(index.eval(index.matrix(['a=3', 'b=4', 'a*b'])), index.matrix([3, 4, 12]));
    assert.deepEqual(index.eval(['a=3', 'b=4', 'a*b']), [3, 4, 12]);
  });

  it('should eval a series of expressions', function() {
    assert.deepEqual(index.eval('a=3\nb=4\na*b'), new ResultSet([3, 4, 12]));
    assert.deepEqual(index.eval('f(x) = a * x; a=2; f(4)'), new ResultSet([8]));
    assert.deepEqual(index.eval('b = 43; b * 4'), new ResultSet([172]));
  });

  it('should throw an error if wrong number of arguments', function() {
    assert.throws(function () {index.eval()},  /TypeError: Too few arguments/);
    assert.throws(function () {index.eval('', {}, 3)}, /TypeError: Too many arguments/);
  });

  it('should throw an error with a unit', function() {
    assert.throws(function () {index.eval(new Unit(5, 'cm'))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error with a complex number', function() {
    assert.throws(function () {index.eval(new Complex(2,3))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error with a boolean', function() {
    assert.throws(function () {index.eval(true)}, TypeError);
  });

  it('should handle the given scope', function() {
    var scope = {
      a: 3,
      b: 4
    };
    assert.deepEqual(index.eval('a*b', scope), 12);
    assert.deepEqual(index.eval('c=5', scope), 5);
    assert.deepEqual(index.format(index.eval('f(x) = x^a', scope)), 'f(x)');

    assert.deepEqual(Object.keys(scope).length, 4);
    assert.deepEqual(scope.a, 3);
    assert.deepEqual(scope.b, 4);
    assert.deepEqual(scope.c, 5);
    assert.deepEqual(typeof scope.f, 'function');

    assert.equal(scope.f(3), 27);
    scope.a = 2;
    assert.equal(scope.f(3), 9);
    scope.hello = function (name) {
      return 'hello, ' + name + '!';
    };
    assert.deepEqual(index.eval('hello("jos")', scope), 'hello, jos!');
  });

  it('should LaTeX eval', function () {
    var expr1 = index.parse('eval(expr)');
    var expr2 = index.parse('eval(expr,scope)');

    assert.equal(expr1.toTex(), '\\mathrm{eval}\\left( expr\\right)');
    assert.equal(expr2.toTex(), '\\mathrm{eval}\\left( expr, scope\\right)');
  });

});
