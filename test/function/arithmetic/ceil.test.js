import assert from "assert";
import { approxjs as toolsapprox_approxjsjs } from "../../../tools/approx";
import { indexjs as index_indexjsjs } from "../../../index";
var bignumber = index_indexjsjs.bignumber;
var complex = index_indexjsjs.complex;
var fraction = index_indexjsjs.fraction;
var matrix = index_indexjsjs.matrix;
var unit = index_indexjsjs.unit;
var range = index_indexjsjs.range;
var ceil = index_indexjsjs.ceil;

describe('ceil', function() {
  it('should return the ceil of a boolean', function () {
    assert.equal(ceil(true), 1);
    assert.equal(ceil(false), 0);
  });

  it('should return the ceil of null', function () {
    assert.equal(index_indexjsjs.ceil(null), 0);
  });

  it('should return the ceil of a number', function() {
    approx.equal(ceil(0), 0);
    approx.equal(ceil(1), 1);
    approx.equal(ceil(1.3), 2);
    approx.equal(ceil(1.8), 2);
    approx.equal(ceil(2), 2);
    approx.equal(ceil(-1), -1);
    approx.equal(ceil(-1.3), -1);
    approx.equal(ceil(-1.8), -1);
    approx.equal(ceil(-2), -2);
    approx.equal(ceil(-2.1), -2);
    approx.equal(ceil(index_indexjsjs.pi), 4);
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
    approx.deepEqual(ceil(complex(0, 0)), complex(0, 0));
    approx.deepEqual(ceil(complex(1.3, 1.8)), complex(2, 2));
    approx.deepEqual(ceil(index_indexjsjs.i), complex(0, 1));
    approx.deepEqual(ceil(complex(-1.3, -1.8)), complex(-1, -1));
  });

  it('should return the ceil of a number', function() {
    var a = fraction('2/3');
    assert(ceil(a) instanceof index_indexjsjs.type.Fraction);
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
    approx.deepEqual(ceil([1.2, 3.4, 5.6, 7.8, 10.0]), [2, 4, 6, 8, 10]);
    approx.deepEqual(ceil(matrix([1.2, 3.4, 5.6, 7.8, 10.0])), matrix([2, 4, 6, 8, 10]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {ceil()}, /TypeError: Too few arguments/);
    assert.throws(function () {ceil(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX ceil', function () {
    var expression = index_indexjsjs.parse('ceil(0.5)');
    assert.equal(expression.toTex(), '\\left\\lceil0.5\\right\\rceil');
  });

});
