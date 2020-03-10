import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;

describe('im', function() {

  it('should return the imaginary part of a complex number', function() {
    assert.equal(index_obj.im(index_obj.complex(2,3)), 3);
    assert.equal(index_obj.im(index_obj.complex(-2,-3)), -3);
    assert.equal(index_obj.im(index_obj.i), 1);
  });

  it('should return the imaginary part of a real number', function() {
    assert.equal(index_obj.im(2), 0);
  });

  it('should return the imaginary part of a big number', function() {
    assert.deepEqual(index_obj.im(index_obj.bignumber(2)), index_obj.bignumber(0));
  });

  it('should return the imaginary part of a boolean', function() {
    assert.equal(index_obj.im(true), 0);
    assert.equal(index_obj.im(false), 0);
  });

  it('should return the imaginary part of null', function() {
    assert.equal(index_obj.im(null), 0);
  });

  it('should return the imaginary part of a boolean', function() {
    assert.equal(index_obj.im(true), 0);
    assert.equal(index_obj.im(false), 0);
  });

  it('should return the imaginary part for each element in a matrix', function() {
    assert.deepEqual(index_obj.im([2, index_obj.complex('3-6i')]), [0, -6]);
    assert.deepEqual(index_obj.im(index_obj.matrix([2, index_obj.complex('3-6i')])).valueOf(), [0, -6]);
  });

  it('should throw an error when called with an unsupported type of argument', function() {
    assert.throws(function () {index_obj.im(new Date())}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {index_obj.im(index_obj.unit('5cm'))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index_obj.im()}, /TypeError: Too few arguments/);
    assert.throws(function () {index_obj.im(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX im', function () {
    var expression = index_obj.parse('im(1+i)');
    assert.equal(expression.toTex(), '\\Im\\left\\lbrace1+ i\\right\\rbrace');
  });

});
