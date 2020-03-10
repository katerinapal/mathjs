import assert from "assert";
import { toolsapprox_obj } from "../../../tools/approx";
import { index_obj } from "../../../index";
var approx = toolsapprox_obj;
var math = index_obj;
var bignumber = index_obj.bignumber;
var fraction = index_obj.fraction;
var complex = index_obj.complex;

describe('sign', function() {
  it('should calculate the sign of a boolean', function () {
    assert.equal(index_obj.sign(true), 1);
    assert.equal(index_obj.sign(false), 0);
  });

  it('should calculate the sign of null', function () {
    assert.equal(index_obj.sign(null), 0);
  });

  it('should calculate the sign of a number', function() {
    assert.equal(index_obj.sign(3), 1);
    assert.equal(index_obj.sign(-3), -1);
    assert.equal(index_obj.sign(0), 0);
  });

  it('should calculate the sign of a big number', function() {
    assert.deepEqual(index_obj.sign(bignumber(3)), bignumber(1));
    assert.deepEqual(index_obj.sign(bignumber(-3)), bignumber(-1));
    assert.deepEqual(index_obj.sign(bignumber(0)), bignumber(0));
  });

  it('should calculate the sign of a fraction', function() {
    var a = fraction(0.5);
    assert(index_obj.sign(a) instanceof index_obj.type.Fraction);
    assert.equal(index_obj.sign(a).toString(), '1');
    assert.equal(index_obj.sign(fraction(-0.5)).toString(), '-1');
    assert.equal(a.toString(), '0.5');
  });

  it('should calculate the sign of a complex value', function() {
    toolsapprox_obj.deepEqual(index_obj.sign(index_obj.complex(2,-3)), index_obj.complex(0.554700196225229, -0.832050294337844));
  });

  it('should calculate the sign of a unit', function() {
    assert.equal(index_obj.sign(index_obj.unit('5 cm')), 1);
    assert.equal(index_obj.sign(index_obj.unit('-5 kg')), -1);
    assert.equal(index_obj.sign(index_obj.unit('0 mol/s')), 0);
    assert.equal(index_obj.sign(index_obj.unit('-283.15 degC')), -1);
    assert.equal(index_obj.sign(index_obj.unit('-273.15 degC')), 0);
    assert.equal(index_obj.sign(index_obj.unit('-263.15 degC')), 1);

    assert.deepEqual(index_obj.sign(index_obj.unit(bignumber(5), 'cm')), bignumber(1));
    assert.deepEqual(index_obj.sign(index_obj.unit(bignumber(-5), 'cm')), bignumber(-1));
    assert.deepEqual(index_obj.sign(index_obj.unit(fraction(5), 'cm')), fraction(1));
    assert.deepEqual(index_obj.sign(index_obj.unit(fraction(-5), 'cm')), fraction(-1));

    assert.deepEqual(index_obj.sign(index_obj.unit(complex(3,4), 'mi')), complex(0.6,0.8));
  });

  it('should throw an error when used with a string', function() {
    assert.throws(function () { index_obj.sign("hello world"); });
  });

  it('should return a matrix of the signs of each elements in the given array', function() {
    assert.deepEqual(index_obj.sign([-2,-1,0,1,2]), [-1,-1,0,1,1]);
  });

  it('should return a matrix of the signs of each elements in the given matrix', function() {
    assert.deepEqual(index_obj.sign(index_obj.matrix([-2,-1,0,1,2])), index_obj.matrix([-1,-1,0,1,1]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index_obj.sign()}, /TypeError: Too few arguments/);
    assert.throws(function () {index_obj.sign(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX sign', function () {
    var expression = index_obj.parse('sign(-4)');
    assert.equal(expression.toTex(), '\\mathrm{sign}\\left(-4\\right)');
  });

});
