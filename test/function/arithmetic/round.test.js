import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
// test round
var assert = {};
var approx = approxjs;
var math = indexjs;
var bignumber = indexjs.bignumber;
var fraction = indexjs.fraction;
var matrix = indexjs.matrix;
var sparse = indexjs.sparse;
var round = indexjs.round;

describe('round', function() {

  it('should round a number to te given number of decimals', function() {
    approxjs(round(indexjs.pi), 3);
    approxjs(round(indexjs.pi * 1000), 3142);
    approxjs(round(indexjs.pi, 3), 3.142);
    approxjs(round(indexjs.pi, 6), 3.141593);
    approxjs(round(1234.5678, 2), 1234.57);
    approxjs(round(2.135, 2), 2.14);
  });

  it('should round booleans (yeah, not really useful but it should be supported)', function() {
    approxjs(round(true), 1);
    approxjs(round(false), 0);
    approxjs(round(true, 2), 1);
    approxjs(round(false, 2), 0);
  });

  it('should round null', function () {
    assert.equal(round(null), 0);
    assert.equal(round(null, 2), 0);
  });

  it('should throw an error on invalid type of value', function() {
    assert.throws(function () {round(new Date());}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error on invalid type of n', function() {
    assert.throws(function () {round(indexjs.pi, new Date());}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error on invalid value of n', function() {
    assert.throws(function () {round(indexjs.pi, -2);}, /Number of decimals in function round must be in te range of 0-15/);
    assert.throws(function () {round(indexjs.pi, 20);}, /Number of decimals in function round must be in te range of 0-15/);
    assert.throws(function () {round(indexjs.pi, 2.5);}, /Number of decimals in function round must be an integer/);
  });

  it('should throw an error if used with wrong number of arguments', function() {
    assert.throws(function () {round();}, /TypeError: Too few arguments/);
    assert.throws(function () {round(1,2,3);}, /TypeError: Too many arguments/);
  });

  it('should round bignumbers', function() {
    assert.deepEqual(round(bignumber(2.7)), bignumber(3));
    assert.deepEqual(round(bignumber(2.1)), bignumber(2));
    assert.deepEqual(round(bignumber(2.123456), bignumber(3)), bignumber(2.123));
    assert.deepEqual(round(bignumber(2.123456), 3), bignumber(2.123));
    assert.deepEqual(round(2.1234567, bignumber(3)), bignumber(2.123));
    assert.deepEqual(round(true, bignumber(3)), bignumber(1));
    assert.deepEqual(round(bignumber(1.23), true), bignumber(1.2));
  });

  it('should round fractions', function() {
    var a = fraction('2/3');
    assert(round(a) instanceof indexjs.type.Fraction);
    assert.equal(a.toString(), '0.(6)');

    assert.equal(round(fraction('2/3')).toString(), '1');
    assert.equal(round(fraction('1/3')).toString(), '0');
    assert.equal(round(fraction('1/2')).toString(), '1');
  });

  it('should round real and imag part of a complex number', function() {
    assert.deepEqual(round(indexjs.complex(2.2, indexjs.pi)), indexjs.complex(2,3));
  });

  it('should round a complex number with a bignumber as number of decimals', function() {
    assert.deepEqual(round(indexjs.complex(2.157, indexjs.pi), bignumber(2)), indexjs.complex(2.16, 3.14));
  });

  it('should throw an error if used with a unit', function() {
    assert.throws(function () { round(indexjs.unit('5cm')); }, TypeError, 'Function round(unit) not supported');
    assert.throws(function () { round(indexjs.unit('5cm'), 2); }, TypeError, 'Function round(unit) not supported');
    assert.throws(function () { round(indexjs.unit('5cm'), bignumber(2)); }, TypeError, 'Function round(unit) not supported');
  });

  it('should convert to a number when used with a string', function() {
    assert.strictEqual(round('3.6'), 4);
    assert.strictEqual(round('3.12345', '3'), 3.123);
    assert.throws(function () {round('hello world'); }, /Cannot convert "hello world" to a number/);
  });


  it('should round each element in a matrix, array, range', function() {
    assert.deepEqual(round(indexjs.range(0,2.1,1/3), 2), indexjs.matrix([0,0.33,0.67,1,1.33,1.67,2]));
    assert.deepEqual(round(indexjs.range(0,2.1,1/3)), indexjs.matrix([0,0,1,1,1,2,2]));
    assert.deepEqual(round([1.7,2.3]), [2,2]);
    assert.deepEqual(round(indexjs.matrix([1.7,2.3])).valueOf(), [2, 2]);
  });
  
  describe('Array', function () {
    
    it('should round array', function () {
      assert.deepEqual(round([1.7, 2.3]), [2, 2]);
    });
    
    it('should round array and scalar', function () {
      assert.deepEqual(round([1.7777, 2.3456], 3), [1.778, 2.346]);
      assert.deepEqual(round(3.12385, [2, 3]), [3.12, 3.124]);
    });
  });
  
  describe('DenseMatrix', function () {

    it('should round dense matrix', function () {
      assert.deepEqual(round(matrix([[1.7, 2.3], [8.987, -3.565]])), matrix([[2, 2], [9, -4]]));
    });

    it('should round dense matrix and scalar', function () {
      assert.deepEqual(round(matrix([[1.7777, 2.3456],[-90.8272, 0]]), 3), matrix([[1.778, 2.346], [-90.827, 0]]));
      assert.deepEqual(round(3.12385, matrix([[2, 3], [0, 2]])), matrix([[3.12, 3.124],[3, 3.12]]));
    });
  });
  
  describe('SparseMatrix', function () {

    it('should round sparse matrix', function () {
      assert.deepEqual(round(sparse([[1.7, 0], [8.987, -3.565]])), sparse([[2, 0], [9, -4]]));
    });

    it('should round sparse matrix and scalar', function () {
      assert.deepEqual(round(sparse([[1.7777, 2.3456],[-90.8272, 0]]), 3), sparse([[1.778, 2.346], [-90.827, 0]]));
      assert.deepEqual(round(3.12385, sparse([[2, 3], [0, 2]])), matrix([[3.12, 3.124],[3, 3.12]]));
    });
  });

  it('should LaTeX round', function () {
    var expr1 = indexjs.parse('round(1.1)');
    var expr2 = indexjs.parse('round(1.1,2)');

    assert.equal(expr1.toTex(), '\\left\\lfloor1.1\\right\\rceil');
    assert.equal(expr2.toTex(), '\\mathrm{round}\\left(1.1,2\\right)');
  });

});
