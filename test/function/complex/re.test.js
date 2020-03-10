import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
var assert = {};
var math = indexjs;

describe('re', function() {

  it('should return the real part of a complex number', function() {
    assert.equal(indexjs.re(indexjs.complex(2,3)), 2);
    assert.equal(indexjs.re(indexjs.complex(-2,-3)), -2);
    assert.equal(indexjs.re(indexjs.i), 0);
  });

  it('should return the real part of a real number', function() {
    assert.equal(indexjs.re(2), 2);
  });

  it('should return the real part of a big number', function() {
    assert.deepEqual(indexjs.re(indexjs.bignumber(2)), indexjs.bignumber(2));
  });

  it('should return the real part of a boolean', function() {
    assert.strictEqual(indexjs.re(true), 1);
    assert.strictEqual(indexjs.re(false), 0);
  });

  it('should return the real part of null', function() {
    assert.strictEqual(indexjs.re(null), 0);
  });

  it('should return the real part for each element in a matrix', function() {
    assert.deepEqual(indexjs.re([2, indexjs.complex('3-6i')]), [2, 3]);
    assert.deepEqual(indexjs.re(indexjs.matrix([2, indexjs.complex('3-6i')])).valueOf(), [2, 3]);
  });

  it('should throw an error when called with an unsupported type of argument', function() {
    assert.throws(function () {indexjs.re(new Date())}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {indexjs.re(indexjs.unit('5cm'))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {indexjs.re()}, /TypeError: Too few arguments/);
    assert.throws(function () {indexjs.re(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX re', function () {
    var expression = indexjs.parse('re(1+i)');
    assert.equal(expression.toTex(), '\\Re\\left\\lbrace1+ i\\right\\rbrace');
  });

});
