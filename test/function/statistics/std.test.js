import assert from "assert";
import { toolsapprox } from "../../../tools/approx";
import { index } from "../../../index";
var approx = toolsapprox;
var math = index;
var BigNumber = index.type.BigNumber;
var Complex = index.type.Complex;
var DenseMatrix = index.type.DenseMatrix;
var Unit = index.type.Unit;
var std = index.std;

describe('std', function() {

  it('should return the standard deviation of numbers', function() {
    assert.equal(std(5), 0);
    assert.equal(std(2,4,6), 2);
  });

  it('should return the standard deviation of big numbers', function() {
    assert.deepEqual(std(new BigNumber(2),new BigNumber(4),new BigNumber(6)),
        new index.type.BigNumber(2));
  });

  it('should return the standard deviation of complex numbers', function() {
    //
    toolsapprox.deepEqual(std(new Complex(2,4), new Complex(4,2)), new Complex(1.41421,-1.41421));
  });

  it('should return the standard deviation of mixed numbers and complex numbers', function() {
    toolsapprox.deepEqual(std(2, new Complex(6,4)), new Complex(2.82842,2.82842));
  });

  it('should return the standard deviation from an array', function() {
    assert.equal(std([2,4,6]), 2);
    assert.equal(std([5]), 0);
  });

  it('should return the uncorrected variance from an array', function() {
    assert.equal(std([2,4], 'uncorrected'), 1);
    assert.equal(std([2,4,6,8], 'uncorrected'), Math.sqrt(5));
  });

  it('should return the biased standard deviation from an array', function() {
    assert.equal(std([2,8], 'biased'), Math.sqrt(6));
    assert.equal(std([2,4,6,8], 'biased'), 2);
  });

  it('should throw an error in case of unknown type of normalization', function() {
    assert.throws(function () {std([2,8], 'foo')}, /Unknown normalization/);
  });

  it('should return the standard deviation from an 1d matrix', function() {
    assert.equal(std(new DenseMatrix([2,4,6])), 2);
    assert.equal(std(new DenseMatrix([5])), 0);
  });

  it('should return the standard deviation element from a 2d array', function() {
    assert.deepEqual(std([
      [2,4,6],
      [1,3,5]
    ]), Math.sqrt(3.5));
  });

  it('should return the standard deviation element from a 2d matrix', function() {
    assert.deepEqual(std(new DenseMatrix([
      [2,4,6],
      [1,3,5]
    ])), Math.sqrt(3.5));
  });

  it('should throw an error if called with invalid number of arguments', function() {
    assert.throws(function() {std()});
    assert.throws(function() {std([], 2, 3)});
  });

  it('should throw an error if called with invalid type of arguments', function() {
    assert.throws(function() {std(new Date(), 2)}, TypeError);
    assert.throws(function() {std(new Unit('5cm'), new Unit('10cm'))}, TypeError);
    assert.throws(function() {std([2,3,4], 5)}, /Unknown normalization "5"/);
  });

  it('should throw an error if called with an empty array', function() {
    assert.throws(function() {std([])});
  });

  it('should LaTeX std', function () {
    var expression = index.parse('std(1,2,3)');
    assert.equal(expression.toTex(), '\\mathrm{std}\\left(1,2,3\\right)');
  });

});
