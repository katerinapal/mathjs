import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
var assert = {};
var approx = approxjs;
var math = indexjs;
var arg = indexjs.arg;

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
    approxjs(arg(-2), 3.141592653589793);
  });

  it('should compute the argument of a bignumber (downgrades to number)', function () {
    assert.equal(arg(indexjs.bignumber(1)), 0);
  });

  it('should compute the argument of a complex number correctly', function() {
    assert.equal(arg(indexjs.complex('0')) / indexjs.pi, 0);
    assert.equal(arg(indexjs.complex('1 + 0i')) / indexjs.pi, 0);
    assert.equal(arg(indexjs.complex('1 + i')) / indexjs.pi, 0.25);
    assert.equal(arg(indexjs.complex('0 + i')) / indexjs.pi, 0.5);
    assert.equal(arg(indexjs.complex('-1 + i')) / indexjs.pi, 0.75);
    assert.equal(arg(indexjs.complex('-1 + 0i')) / indexjs.pi, 1);
    assert.equal(arg(indexjs.complex('-1 - i')) / indexjs.pi, -0.75);
    assert.equal(arg(indexjs.complex('0 - i')) / indexjs.pi, -0.5);
    assert.equal(arg(indexjs.complex('1 - i')) / indexjs.pi, -0.25);
    assert.equal(arg(indexjs.i) / indexjs.pi, 0.5);
  });

  it('should calculate the argument for each element in a matrix', function() {
    assert.deepEqual(indexjs.divide(arg([
      indexjs.i, indexjs.unaryMinus(indexjs.i), indexjs.add(1,indexjs.i)
    ]), indexjs.pi), [
      0.5, -0.5, 0.25
    ]);
    assert.deepEqual(indexjs.matrix(indexjs.divide(arg([
      indexjs.i, indexjs.unaryMinus(indexjs.i), indexjs.add(1,indexjs.i)
    ]), indexjs.pi)).valueOf(), [
      0.5, -0.5, 0.25
    ]);
  });

  it('should compute the argument of a real number correctly', function() {
    assert.equal(arg(2) / indexjs.pi, 0);
    assert.equal(arg(-2) / indexjs.pi, 1);
  });

  it('should throw an error if used with a string', function() {
    assert.throws(function () {arg('string')});
  });

  it('should throw an error if used with a unit', function() {
    assert.throws(function () {arg(indexjs.unit('5cm'))});
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {arg()}, /TypeError: Too few arguments/);
    assert.throws(function () {arg(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX arg', function () {
    var expression = indexjs.parse('arg(1+i)');
    assert.equal(expression.toTex(), '\\arg\\left(1+ i\\right)');
  });

});
