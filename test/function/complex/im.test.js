import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
var assert = {};
var math = indexjs;

describe('im', function() {

  it('should return the imaginary part of a complex number', function() {
    assert.equal(indexjs.im(indexjs.complex(2,3)), 3);
    assert.equal(indexjs.im(indexjs.complex(-2,-3)), -3);
    assert.equal(indexjs.im(indexjs.i), 1);
  });

  it('should return the imaginary part of a real number', function() {
    assert.equal(indexjs.im(2), 0);
  });

  it('should return the imaginary part of a big number', function() {
    assert.deepEqual(indexjs.im(indexjs.bignumber(2)), indexjs.bignumber(0));
  });

  it('should return the imaginary part of a boolean', function() {
    assert.equal(indexjs.im(true), 0);
    assert.equal(indexjs.im(false), 0);
  });

  it('should return the imaginary part of null', function() {
    assert.equal(indexjs.im(null), 0);
  });

  it('should return the imaginary part of a boolean', function() {
    assert.equal(indexjs.im(true), 0);
    assert.equal(indexjs.im(false), 0);
  });

  it('should return the imaginary part for each element in a matrix', function() {
    assert.deepEqual(indexjs.im([2, indexjs.complex('3-6i')]), [0, -6]);
    assert.deepEqual(indexjs.im(indexjs.matrix([2, indexjs.complex('3-6i')])).valueOf(), [0, -6]);
  });

  it('should throw an error when called with an unsupported type of argument', function() {
    assert.throws(function () {indexjs.im(new Date())}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {indexjs.im(indexjs.unit('5cm'))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {indexjs.im()}, /TypeError: Too few arguments/);
    assert.throws(function () {indexjs.im(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX im', function () {
    var expression = indexjs.parse('im(1+i)');
    assert.equal(expression.toTex(), '\\Im\\left\\lbrace1+ i\\right\\rbrace');
  });

});
