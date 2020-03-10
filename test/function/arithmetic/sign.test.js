import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
// test sign
var assert = {};
var approx = approxjs;
var math = indexjs;
var bignumber = indexjs.bignumber;
var fraction = indexjs.fraction;
var complex = indexjs.complex;

describe('sign', function() {
  it('should calculate the sign of a boolean', function () {
    assert.equal(indexjs.sign(true), 1);
    assert.equal(indexjs.sign(false), 0);
  });

  it('should calculate the sign of null', function () {
    assert.equal(indexjs.sign(null), 0);
  });

  it('should calculate the sign of a number', function() {
    assert.equal(indexjs.sign(3), 1);
    assert.equal(indexjs.sign(-3), -1);
    assert.equal(indexjs.sign(0), 0);
  });

  it('should calculate the sign of a big number', function() {
    assert.deepEqual(indexjs.sign(bignumber(3)), bignumber(1));
    assert.deepEqual(indexjs.sign(bignumber(-3)), bignumber(-1));
    assert.deepEqual(indexjs.sign(bignumber(0)), bignumber(0));
  });

  it('should calculate the sign of a fraction', function() {
    var a = fraction(0.5);
    assert(indexjs.sign(a) instanceof indexjs.type.Fraction);
    assert.equal(indexjs.sign(a).toString(), '1');
    assert.equal(indexjs.sign(fraction(-0.5)).toString(), '-1');
    assert.equal(a.toString(), '0.5');
  });

  it('should calculate the sign of a complex value', function() {
    approxjs.deepEqual(indexjs.sign(indexjs.complex(2,-3)), indexjs.complex(0.554700196225229, -0.832050294337844));
  });

  it('should calculate the sign of a unit', function() {
    assert.equal(indexjs.sign(indexjs.unit('5 cm')), 1);
    assert.equal(indexjs.sign(indexjs.unit('-5 kg')), -1);
    assert.equal(indexjs.sign(indexjs.unit('0 mol/s')), 0);
    assert.equal(indexjs.sign(indexjs.unit('-283.15 degC')), -1);
    assert.equal(indexjs.sign(indexjs.unit('-273.15 degC')), 0);
    assert.equal(indexjs.sign(indexjs.unit('-263.15 degC')), 1);

    assert.deepEqual(indexjs.sign(indexjs.unit(bignumber(5), 'cm')), bignumber(1));
    assert.deepEqual(indexjs.sign(indexjs.unit(bignumber(-5), 'cm')), bignumber(-1));
    assert.deepEqual(indexjs.sign(indexjs.unit(fraction(5), 'cm')), fraction(1));
    assert.deepEqual(indexjs.sign(indexjs.unit(fraction(-5), 'cm')), fraction(-1));

    assert.deepEqual(indexjs.sign(indexjs.unit(complex(3,4), 'mi')), complex(0.6,0.8));
  });

  it('should throw an error when used with a string', function() {
    assert.throws(function () { indexjs.sign("hello world"); });
  });

  it('should return a matrix of the signs of each elements in the given array', function() {
    assert.deepEqual(indexjs.sign([-2,-1,0,1,2]), [-1,-1,0,1,1]);
  });

  it('should return a matrix of the signs of each elements in the given matrix', function() {
    assert.deepEqual(indexjs.sign(indexjs.matrix([-2,-1,0,1,2])), indexjs.matrix([-1,-1,0,1,1]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {indexjs.sign()}, /TypeError: Too few arguments/);
    assert.throws(function () {indexjs.sign(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX sign', function () {
    var expression = indexjs.parse('sign(-4)');
    assert.equal(expression.toTex(), '\\mathrm{sign}\\left(-4\\right)');
  });

});
