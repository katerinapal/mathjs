import assert from "assert";
import { toolsapprox_obj } from "../../../tools/approx";
import { index_obj } from "../../../index";
var approx = toolsapprox_obj;
var math = index_obj;
var arg = index_obj.arg;

describe('arg', function() {
  it('should compute the argument of a boolean', function () {
    assert.equal(arg(true), 0);
    assert.equal(arg(false), 0);
  });

  it('should compute the argument of null', function () {
    assert.equal(arg(null), 0);
  });

  it('should compute the argument of a number', function () {
    assert.equal(arg(1), 0);
    assert.equal(arg(2), 0);
    assert.equal(arg(0), 0);
    toolsapprox_obj(arg(-2), 3.141592653589793);
  });

  it('should compute the argument of a bignumber (downgrades to number)', function () {
    assert.equal(arg(index_obj.bignumber(1)), 0);
  });

  it('should compute the argument of a complex number correctly', function() {
    assert.equal(arg(index_obj.complex('0')) / index_obj.pi, 0);
    assert.equal(arg(index_obj.complex('1 + 0i')) / index_obj.pi, 0);
    assert.equal(arg(index_obj.complex('1 + i')) / index_obj.pi, 0.25);
    assert.equal(arg(index_obj.complex('0 + i')) / index_obj.pi, 0.5);
    assert.equal(arg(index_obj.complex('-1 + i')) / index_obj.pi, 0.75);
    assert.equal(arg(index_obj.complex('-1 + 0i')) / index_obj.pi, 1);
    assert.equal(arg(index_obj.complex('-1 - i')) / index_obj.pi, -0.75);
    assert.equal(arg(index_obj.complex('0 - i')) / index_obj.pi, -0.5);
    assert.equal(arg(index_obj.complex('1 - i')) / index_obj.pi, -0.25);
    assert.equal(arg(index_obj.i) / index_obj.pi, 0.5);
  });

  it('should calculate the argument for each element in a matrix', function() {
    assert.deepEqual(index_obj.divide(arg([
      index_obj.i, index_obj.unaryMinus(index_obj.i), index_obj.add(1,index_obj.i)
    ]), index_obj.pi), [
      0.5, -0.5, 0.25
    ]);
    assert.deepEqual(index_obj.matrix(index_obj.divide(arg([
      index_obj.i, index_obj.unaryMinus(index_obj.i), index_obj.add(1,index_obj.i)
    ]), index_obj.pi)).valueOf(), [
      0.5, -0.5, 0.25
    ]);
  });

  it('should compute the argument of a real number correctly', function() {
    assert.equal(arg(2) / index_obj.pi, 0);
    assert.equal(arg(-2) / index_obj.pi, 1);
  });

  it('should throw an error if used with a string', function() {
    assert.throws(function () {arg('string')});
  });

  it('should throw an error if used with a unit', function() {
    assert.throws(function () {arg(index_obj.unit('5cm'))});
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {arg()}, /TypeError: Too few arguments/);
    assert.throws(function () {arg(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX arg', function () {
    var expression = index_obj.parse('arg(1+i)');
    assert.equal(expression.toTex(), '\\arg\\left(1+ i\\right)');
  });

});
