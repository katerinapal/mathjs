import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
// test ceil
var assert = {};
var approx = approxjs;
var math = indexjs;
var bignumber = indexjs.bignumber;
var complex = indexjs.complex;
var fraction = indexjs.fraction;
var matrix = indexjs.matrix;
var unit = indexjs.unit;
var range = indexjs.range;
var ceil = indexjs.ceil;

describe('ceil', function() {
  it('should return the ceil of a boolean', function () {
    assert.equal(ceil(true), 1);
    assert.equal(ceil(false), 0);
  });

  it('should return the ceil of null', function () {
    assert.equal(indexjs.ceil(null), 0);
  });

  it('should return the ceil of a number', function() {
    approxjs(ceil(0), 0);
    approxjs(ceil(1), 1);
    approxjs(ceil(1.3), 2);
    approxjs(ceil(1.8), 2);
    approxjs(ceil(2), 2);
    approxjs(ceil(-1), -1);
    approxjs(ceil(-1.3), -1);
    approxjs(ceil(-1.8), -1);
    approxjs(ceil(-2), -2);
    approxjs(ceil(-2.1), -2);
    approxjs(ceil(indexjs.pi), 4);
  });

  it('should return the ceil of a big number', function () {
    assert.deepEqual(ceil(bignumber(0)), bignumber(0));
    assert.deepEqual(ceil(bignumber(1)), bignumber(1));
    assert.deepEqual(ceil(bignumber(1.3)), bignumber(2));
    assert.deepEqual(ceil(bignumber(1.8)), bignumber(2));
    assert.deepEqual(ceil(bignumber(2)), bignumber(2));
    assert.deepEqual(ceil(bignumber(-1)), bignumber(-1));
    assert.deepEqual(ceil(bignumber(-1.3)), bignumber(-1));
    assert.deepEqual(ceil(bignumber(-1.8)), bignumber(-1));
    assert.deepEqual(ceil(bignumber(-2)), bignumber(-2));
    assert.deepEqual(ceil(bignumber(-2.1)), bignumber(-2));
  });

  it('should return the ceil of real and imag part of a complex', function() {
    approxjs.deepEqual(ceil(complex(0, 0)), complex(0, 0));
    approxjs.deepEqual(ceil(complex(1.3, 1.8)), complex(2, 2));
    approxjs.deepEqual(ceil(indexjs.i), complex(0, 1));
    approxjs.deepEqual(ceil(complex(-1.3, -1.8)), complex(-1, -1));
  });

  it('should return the ceil of a number', function() {
    var a = fraction('2/3');
    assert(ceil(a) instanceof indexjs.type.Fraction);
    assert.equal(a.toString(), '0.(6)');

    assert.equal(ceil(fraction(0)).toString(), '0');
    assert.equal(ceil(fraction(1)), '1');
    assert.equal(ceil(fraction(1.3)).toString(), '2');
    assert.equal(ceil(fraction(1.8)).toString(), '2');
    assert.equal(ceil(fraction(2)).toString(), '2');
    assert.equal(ceil(fraction(-1)).toString(), '-1');
    assert.equal(ceil(fraction(-1.3)).toString(), '-1');
    assert.equal(ceil(fraction(-1.8)).toString(), '-1');
    assert.equal(ceil(fraction(-2)).toString(), '-2');
    assert.equal(ceil(fraction(-2.1)).toString(), '-2');
  });

  it('should throw an error for units', function() {
    assert.throws(function () {ceil(unit('5cm'))}, TypeError, 'Function ceil(unit) not supported');
  });


  it('should convert a string to a number', function() {
    assert.strictEqual(ceil('1.8'), 2);
  });

  it('should ceil each element in a matrix, array or range', function() {
    approxjs.deepEqual(ceil([1.2, 3.4, 5.6, 7.8, 10.0]), [2, 4, 6, 8, 10]);
    approxjs.deepEqual(ceil(matrix([1.2, 3.4, 5.6, 7.8, 10.0])), matrix([2, 4, 6, 8, 10]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {ceil()}, /TypeError: Too few arguments/);
    assert.throws(function () {ceil(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX ceil', function () {
    var expression = indexjs.parse('ceil(0.5)');
    assert.equal(expression.toTex(), '\\left\\lceil0.5\\right\\rceil');
  });

});
