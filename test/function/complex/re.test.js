import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;

describe('re', function() {

  it('should return the real part of a complex number', function() {
    assert.equal(index_obj.re(index_obj.complex(2,3)), 2);
    assert.equal(index_obj.re(index_obj.complex(-2,-3)), -2);
    assert.equal(index_obj.re(index_obj.i), 0);
  });

  it('should return the real part of a real number', function() {
    assert.equal(index_obj.re(2), 2);
  });

  it('should return the real part of a big number', function() {
    assert.deepEqual(index_obj.re(index_obj.bignumber(2)), index_obj.bignumber(2));
  });

  it('should return the real part of a boolean', function() {
    assert.strictEqual(index_obj.re(true), 1);
    assert.strictEqual(index_obj.re(false), 0);
  });

  it('should return the real part of null', function() {
    assert.strictEqual(index_obj.re(null), 0);
  });

  it('should return the real part for each element in a matrix', function() {
    assert.deepEqual(index_obj.re([2, index_obj.complex('3-6i')]), [2, 3]);
    assert.deepEqual(index_obj.re(index_obj.matrix([2, index_obj.complex('3-6i')])).valueOf(), [2, 3]);
  });

  it('should throw an error when called with an unsupported type of argument', function() {
    assert.throws(function () {index_obj.re(new Date())}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {index_obj.re(index_obj.unit('5cm'))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index_obj.re()}, /TypeError: Too few arguments/);
    assert.throws(function () {index_obj.re(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX re', function () {
    var expression = index_obj.parse('re(1+i)');
    assert.equal(expression.toTex(), '\\Re\\left\\lbrace1+ i\\right\\rbrace');
  });

});
