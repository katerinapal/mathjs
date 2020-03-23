import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";

describe('im', function() {

  it('should return the imaginary part of a complex number', function() {
    assert.equal(index_indexjsjs.im(index_indexjsjs.complex(2,3)), 3);
    assert.equal(index_indexjsjs.im(index_indexjsjs.complex(-2,-3)), -3);
    assert.equal(index_indexjsjs.im(index_indexjsjs.i), 1);
  });

  it('should return the imaginary part of a real number', function() {
    assert.equal(index_indexjsjs.im(2), 0);
  });

  it('should return the imaginary part of a big number', function() {
    assert.deepEqual(index_indexjsjs.im(index_indexjsjs.bignumber(2)), index_indexjsjs.bignumber(0));
  });

  it('should return the imaginary part of a boolean', function() {
    assert.equal(index_indexjsjs.im(true), 0);
    assert.equal(index_indexjsjs.im(false), 0);
  });

  it('should return the imaginary part of null', function() {
    assert.equal(index_indexjsjs.im(null), 0);
  });

  it('should return the imaginary part of a boolean', function() {
    assert.equal(index_indexjsjs.im(true), 0);
    assert.equal(index_indexjsjs.im(false), 0);
  });

  it('should return the imaginary part for each element in a matrix', function() {
    assert.deepEqual(index_indexjsjs.im([2, index_indexjsjs.complex('3-6i')]), [0, -6]);
    assert.deepEqual(index_indexjsjs.im(index_indexjsjs.matrix([2, index_indexjsjs.complex('3-6i')])).valueOf(), [0, -6]);
  });

  it('should throw an error when called with an unsupported type of argument', function() {
    assert.throws(function () {index_indexjsjs.im(new Date())}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {index_indexjsjs.im(index_indexjsjs.unit('5cm'))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index_indexjsjs.im()}, /TypeError: Too few arguments/);
    assert.throws(function () {index_indexjsjs.im(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX im', function () {
    var expression = index_indexjsjs.parse('im(1+i)');
    assert.equal(expression.toTex(), '\\Im\\left\\lbrace1+ i\\right\\rbrace');
  });

});
