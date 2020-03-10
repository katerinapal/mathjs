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
var fix = index_obj.fix;

describe('fix', function() {
  it('should round booleans correctly', function () {
    assert.equal(fix(true), 1);
    assert.equal(fix(false), 0);
  });

  it('should round null', function () {
    assert.equal(index_obj.ceil(null), 0);
  });

  it('should round numbers correctly', function() {
    toolsapprox_obj(fix(0), 0);
    toolsapprox_obj(fix(1), 1);
    toolsapprox_obj(fix(1.3), 1);
    toolsapprox_obj(fix(1.8), 1);
    toolsapprox_obj(fix(2), 2);
    toolsapprox_obj(fix(-1), -1);
    toolsapprox_obj(fix(-1.3), -1);
    toolsapprox_obj(fix(-1.8), -1);
    toolsapprox_obj(fix(-2), -2);
    toolsapprox_obj(fix(-2.1), -2);
    toolsapprox_obj(fix(index_obj.pi), 3);
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
    toolsapprox_obj.deepEqual(fix(complex(0, 0)), complex(0, 0));
    toolsapprox_obj.deepEqual(fix(complex(1.3, 1.8)), complex(1, 1));
    toolsapprox_obj.deepEqual(fix(index_obj.i), complex(0, 1));
    toolsapprox_obj.deepEqual(fix(complex(-1.3, -1.8)), complex(-1, -1));
  });

  it('should round fractions correctly', function() {
    var a = fraction('2/3');
    assert(fix(a) instanceof index_obj.type.Fraction);
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
    toolsapprox_obj.deepEqual(fix([1.2, 3.4, 5.6, 7.8, 10.0]), [1, 3, 5, 7, 10]);
    toolsapprox_obj.deepEqual(fix(matrix([1.2, 3.4, 5.6, 7.8, 10.0])), matrix([1, 3, 5, 7, 10]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {fix()}, /TypeError: Too few arguments/);
    assert.throws(function () {fix(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX fix', function () {
    var expression = index_obj.parse('fix(0.6)');
    assert.equal(expression.toTex(), '\\mathrm{fix}\\left(0.6\\right)');
  });

});
