import assert from "assert";
import { toolsapprox_obj } from "../../../tools/approx";
import { index_obj } from "../../../index";
var approx = toolsapprox_obj;
var math = index_obj;
var bignumber = index_obj.bignumber;
var complex = index_obj.complex;
var fraction = index_obj.fraction;
var matrix = index_obj.matrix;
var unit = index_obj.unit;
var range = index_obj.range;
var ceil = index_obj.ceil;

describe('ceil', function() {
  it('should return the ceil of a boolean', function () {
    assert.equal(ceil(true), 1);
    assert.equal(ceil(false), 0);
  });

  it('should return the ceil of null', function () {
    assert.equal(index_obj.ceil(null), 0);
  });

  it('should return the ceil of a number', function() {
    toolsapprox_obj(ceil(0), 0);
    toolsapprox_obj(ceil(1), 1);
    toolsapprox_obj(ceil(1.3), 2);
    toolsapprox_obj(ceil(1.8), 2);
    toolsapprox_obj(ceil(2), 2);
    toolsapprox_obj(ceil(-1), -1);
    toolsapprox_obj(ceil(-1.3), -1);
    toolsapprox_obj(ceil(-1.8), -1);
    toolsapprox_obj(ceil(-2), -2);
    toolsapprox_obj(ceil(-2.1), -2);
    toolsapprox_obj(ceil(index_obj.pi), 4);
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
    toolsapprox_obj.deepEqual(ceil(complex(0, 0)), complex(0, 0));
    toolsapprox_obj.deepEqual(ceil(complex(1.3, 1.8)), complex(2, 2));
    toolsapprox_obj.deepEqual(ceil(index_obj.i), complex(0, 1));
    toolsapprox_obj.deepEqual(ceil(complex(-1.3, -1.8)), complex(-1, -1));
  });

  it('should return the ceil of a number', function() {
    var a = fraction('2/3');
    assert(ceil(a) instanceof index_obj.type.Fraction);
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
    toolsapprox_obj.deepEqual(ceil([1.2, 3.4, 5.6, 7.8, 10.0]), [2, 4, 6, 8, 10]);
    toolsapprox_obj.deepEqual(ceil(matrix([1.2, 3.4, 5.6, 7.8, 10.0])), matrix([2, 4, 6, 8, 10]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {ceil()}, /TypeError: Too few arguments/);
    assert.throws(function () {ceil(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX ceil', function () {
    var expression = index_obj.parse('ceil(0.5)');
    assert.equal(expression.toTex(), '\\left\\lceil0.5\\right\\rceil');
  });

});
