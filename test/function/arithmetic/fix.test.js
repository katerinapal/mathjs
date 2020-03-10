import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
// test fix
var assert = {};
var approx = approxjs;
var math = indexjs;
var bignumber = indexjs.bignumber;
var complex = indexjs.complex;
var fraction = indexjs.fraction;
var matrix = indexjs.matrix;
var unit = indexjs.unit;
var range = indexjs.range;
var fix = indexjs.fix;

describe('fix', function() {
  it('should round booleans correctly', function () {
    assert.equal(fix(true), 1);
    assert.equal(fix(false), 0);
  });

  it('should round null', function () {
    assert.equal(indexjs.ceil(null), 0);
  });

  it('should round numbers correctly', function() {
    approxjs(fix(0), 0);
    approxjs(fix(1), 1);
    approxjs(fix(1.3), 1);
    approxjs(fix(1.8), 1);
    approxjs(fix(2), 2);
    approxjs(fix(-1), -1);
    approxjs(fix(-1.3), -1);
    approxjs(fix(-1.8), -1);
    approxjs(fix(-2), -2);
    approxjs(fix(-2.1), -2);
    approxjs(fix(indexjs.pi), 3);
  });

  it('should round big numbers correctly', function() {
    assert.deepEqual(fix(bignumber(0)), bignumber(0));
    assert.deepEqual(fix(bignumber(1)), bignumber(1));
    assert.deepEqual(fix(bignumber(1.3)), bignumber(1));
    assert.deepEqual(fix(bignumber(1.8)), bignumber(1));
    assert.deepEqual(fix(bignumber(2)), bignumber(2));
    assert.deepEqual(fix(bignumber(-1)), bignumber(-1));
    assert.deepEqual(fix(bignumber(-1.3)), bignumber(-1));
    assert.deepEqual(fix(bignumber(-1.8)), bignumber(-1));
    assert.deepEqual(fix(bignumber(-2)), bignumber(-2));
    assert.deepEqual(fix(bignumber(-2.1)), bignumber(-2));
  });

  it('should round complex numbers correctly', function() {
    // complex
    approxjs.deepEqual(fix(complex(0, 0)), complex(0, 0));
    approxjs.deepEqual(fix(complex(1.3, 1.8)), complex(1, 1));
    approxjs.deepEqual(fix(indexjs.i), complex(0, 1));
    approxjs.deepEqual(fix(complex(-1.3, -1.8)), complex(-1, -1));
  });

  it('should round fractions correctly', function() {
    var a = fraction('2/3');
    assert(fix(a) instanceof indexjs.type.Fraction);
    assert.equal(a.toString(), '0.(6)');

    assert.equal(fix(fraction(0)).toString(), '0');
    assert.equal(fix(fraction(1)).toString(), '1');
    assert.equal(fix(fraction(1.3)).toString(), '1');
    assert.equal(fix(fraction(1.8)).toString(), '1');
    assert.equal(fix(fraction(2)).toString(), '2');
    assert.equal(fix(fraction(-1)).toString(), '-1');
    assert.equal(fix(fraction(-1.3)).toString(), '-1');
    assert.equal(fix(fraction(-1.8)).toString(), '-1');
    assert.equal(fix(fraction(-2)).toString(), '-2');
    assert.equal(fix(fraction(-2.1)).toString(), '-2');
  });
  
  it('should throw an error on unit as parameter', function() {
    // unit
    assert.throws(function () {fix(unit('5cm'))}, TypeError, 'Function fix(unit) not supported');
  });

  it('should convert a string to a number', function() {
    assert.strictEqual(fix('1.8'), 1);
  });

  it('should correctly round all values of a matrix element-wise', function() {
    // matrix, array, range
    approxjs.deepEqual(fix([1.2, 3.4, 5.6, 7.8, 10.0]), [1, 3, 5, 7, 10]);
    approxjs.deepEqual(fix(matrix([1.2, 3.4, 5.6, 7.8, 10.0])), matrix([1, 3, 5, 7, 10]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {fix()}, /TypeError: Too few arguments/);
    assert.throws(function () {fix(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX fix', function () {
    var expression = indexjs.parse('fix(0.6)');
    assert.equal(expression.toTex(), '\\mathrm{fix}\\left(0.6\\right)');
  });

});
