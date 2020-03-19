import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
var BigNumber = index_indexjsjs.type.BigNumber;
var Complex = index_indexjsjs.type.Complex;
var DenseMatrix = index_indexjsjs.type.DenseMatrix;
var Unit = index_indexjsjs.type.Unit;
var sum = index_indexjsjs.sum;

describe('sum', function() {

  it('should return the sum of numbers', function() {
    assert.equal(sum(5), 5);
    assert.equal(sum(3,1), 4);
    assert.equal(sum(1,3), 4);
    assert.equal(sum(1,3,5,2), 11);
    assert.equal(sum(0,0,0,0), 0);
  });

  it('should return the sum of big numbers', function() {
    assert.deepEqual(sum(new BigNumber(1),new BigNumber(3),new BigNumber(5),new BigNumber(2)),
        new BigNumber(11));
  });

  it('should return the sum of strings (convert them to numbers)', function() {
    assert.strictEqual(sum('2', '3', '4', '5'), 14);
    assert.strictEqual(sum([['2', '3'], ['4', '5']]), 14);
  });

  it('should return the sum of complex numbers', function() {
    assert.deepEqual(sum(new Complex(2,3), new Complex(-1,2)), new Complex(1,5));
  });

  it('should return the sum of mixed numbers and complex numbers', function() {
    assert.deepEqual(sum(2, new Complex(-1,3)), new Complex(1,3));
  });

  it('should return the sum from an array', function() {
    assert.equal(sum([1,3,5,2,-5]), 6);
  });

  it('should return the sum of units', function() {
    assert.deepEqual(sum([new Unit(5,'mm'), new Unit(10,'mm'), new Unit(15,'mm')]), new Unit(30,'mm'));
  });

  it('should return the sum from an 1d matrix', function() {
    assert.equal(sum(new DenseMatrix([1,3,5,2,-5])), 6);
  });

  it('should return the sum element from a 2d array', function() {
    assert.deepEqual(sum([
      [ 1, 4,  7],
      [ 3, 0,  5],
      [-1, 11, 9]
    ]), 39);
  });

  it('should return the sum element from a 2d matrix', function() {
    assert.deepEqual(sum(new DenseMatrix([
      [ 1, 4,  7],
      [ 3, 0,  5],
      [-1, 11, 9]
    ])), 39);
  });

  it('should throw an error if called with invalid number of arguments', function() {
    assert.throws(function() {sum()});
    assert.throws(function() {sum([], 2, 3)});
  });

  it('should throw an error if called with not yet supported argument dim', function() {
    assert.throws(function() {sum([], 2)}, /not yet supported/);
  });

  it('should return zero if called with an empty array', function() {
    var bigMath = index_indexjsjs.create({number: 'BigNumber'});
    var fracMath = index_indexjsjs.create({number: 'Fraction'});

    var big = bigMath.sum([]);
    var frac = fracMath.sum([]);

    assert.equal(sum([]), 0);
    assert.equal(big.type, 'BigNumber');
    assert.equal(frac.type, 'Fraction');
    assert.equal(index_indexjsjs.equal(bigMath.sum([]), new BigNumber(0)).valueOf(), true);
    assert.equal(index_indexjsjs.equal(fracMath.sum([]), new fracMath.type.Fraction(0)), true);
  });

  it('should LaTeX sum', function () {
    var expression = index_indexjsjs.parse('sum(1,2,3)');
    assert.equal(expression.toTex(), '\\mathrm{sum}\\left(1,2,3\\right)');
  });

});
