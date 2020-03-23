import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
var bignumber = index_indexjsjs.bignumber;
var fraction = index_indexjsjs.fraction;
var complex = index_indexjsjs.complex;

describe('unaryMinus', function() {
  it('should return unary minus of a boolean', function () {
    assert.equal(index_indexjsjs.unaryMinus(true), -1);
    assert.equal(index_indexjsjs.unaryMinus(false), 0);
  });

  // TODO: unary minus should return bignumber on boolean input when configured for bignumber
  it.skip('should return bignumber unary minus of a boolean', function () {
    var bigmath = index_indexjsjs.create({number: 'BigNumber'});
    assert.deepEqual(bigmath.unaryMinus(true), bigmath.bignumber(-1));
    assert.deepEqual(bigmath.unaryMinus(false), bigmath.bignumber(0));
  });

  it('should return unary minus of null', function () {
    assert.equal(index_indexjsjs.unaryMinus(null), 0);
  });

  it('should perform unary minus of a number', function() {
    assert.deepEqual(index_indexjsjs.unaryMinus(2), -2);
    assert.deepEqual(index_indexjsjs.unaryMinus(-2), 2);
    assert.deepEqual(index_indexjsjs.unaryMinus(0), 0);
  });

  it('should perform unary minus of a big number', function() {
    assert.deepEqual(index_indexjsjs.unaryMinus(bignumber(2)), bignumber(-2));
    assert.deepEqual(index_indexjsjs.unaryMinus(bignumber(-2)), bignumber(2));
    assert.deepEqual(index_indexjsjs.unaryMinus(bignumber(0)).toString(), '0');
  });

  it('should perform unary minus of a fraction', function() {
    var a = fraction(0.5);
    assert(index_indexjsjs.unaryMinus(a) instanceof index_indexjsjs.type.Fraction);
    assert.equal(a.toString(), '0.5');

    assert.equal(index_indexjsjs.unaryMinus(fraction(0.5)).toString(), '-0.5');
    assert.equal(index_indexjsjs.unaryMinus(fraction(-0.5)).toString(), '0.5');
  });

  it('should perform unary minus of a complex number', function() {
    assert.equal(index_indexjsjs.unaryMinus(index_indexjsjs.complex(3, 2)), '-3 - 2i');
    assert.equal(index_indexjsjs.unaryMinus(index_indexjsjs.complex(3, -2)), '-3 + 2i');
    assert.equal(index_indexjsjs.unaryMinus(index_indexjsjs.complex(-3, 2)), '3 - 2i');
    assert.equal(index_indexjsjs.unaryMinus(index_indexjsjs.complex(-3, -2)), '3 + 2i');
  });

  it('should perform unary minus of a unit', function() {
    assert.equal(index_indexjsjs.unaryMinus(index_indexjsjs.unit(5, 'km')).toString(), '-5 km');
    assert.equal(index_indexjsjs.unaryMinus(index_indexjsjs.unit(fraction(2/3), 'km')).toString(), '-2/3 km');
    assert.equal(index_indexjsjs.unaryMinus(index_indexjsjs.unit(complex(2,-4), 'gal')).toString(), '(-2 + 4i) gal');
  });

  it('should perform element-wise unary minus on a matrix', function() {
    a2 = index_indexjsjs.matrix([[1,2],[3,4]]);
    var a7 = index_indexjsjs.unaryMinus(a2);
    assert.ok(a7 instanceof index_indexjsjs.type.Matrix);
    assert.deepEqual(a7.size(), [2,2]);
    assert.deepEqual(a7.valueOf(), [[-1,-2],[-3,-4]]);
    assert.deepEqual(index_indexjsjs.unaryMinus([[1,2],[3,4]]), [[-1,-2],[-3,-4]]);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index_indexjsjs.unaryMinus()}, /TypeError: Too few arguments/);
    assert.throws(function () {index_indexjsjs.unaryMinus(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of argument', function() {
    assert.throws(function () {index_indexjsjs.unaryMinus(new Date())}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX unaryMinus', function () {
    var expression = index_indexjsjs.parse('unaryMinus(1)');
    assert.equal(expression.toTex(), '-\\left(1\\right)');
  });

});
