import assert from "assert";
import { toolsapprox } from "../../../tools/approx";
import { index } from "../../../index";
var approx = toolsapprox;
var math = index;
var bignumber = index.bignumber;
var fraction = index.fraction;
var complex = index.complex;

describe('sign', function() {
  it('should calculate the sign of a boolean', function () {
    assert.equal(index.sign(true), 1);
    assert.equal(index.sign(false), 0);
  });

  it('should calculate the sign of null', function () {
    assert.equal(index.sign(null), 0);
  });

  it('should calculate the sign of a number', function() {
    assert.equal(index.sign(3), 1);
    assert.equal(index.sign(-3), -1);
    assert.equal(index.sign(0), 0);
  });

  it('should calculate the sign of a big number', function() {
    assert.deepEqual(index.sign(bignumber(3)), bignumber(1));
    assert.deepEqual(index.sign(bignumber(-3)), bignumber(-1));
    assert.deepEqual(index.sign(bignumber(0)), bignumber(0));
  });

  it('should calculate the sign of a fraction', function() {
    var a = fraction(0.5);
    assert(index.sign(a) instanceof index.type.Fraction);
    assert.equal(index.sign(a).toString(), '1');
    assert.equal(index.sign(fraction(-0.5)).toString(), '-1');
    assert.equal(a.toString(), '0.5');
  });

  it('should calculate the sign of a complex value', function() {
    toolsapprox.deepEqual(index.sign(index.complex(2,-3)), index.complex(0.554700196225229, -0.832050294337844));
  });

  it('should calculate the sign of a unit', function() {
    assert.equal(index.sign(index.unit('5 cm')), 1);
    assert.equal(index.sign(index.unit('-5 kg')), -1);
    assert.equal(index.sign(index.unit('0 mol/s')), 0);
    assert.equal(index.sign(index.unit('-283.15 degC')), -1);
    assert.equal(index.sign(index.unit('-273.15 degC')), 0);
    assert.equal(index.sign(index.unit('-263.15 degC')), 1);

    assert.deepEqual(index.sign(index.unit(bignumber(5), 'cm')), bignumber(1));
    assert.deepEqual(index.sign(index.unit(bignumber(-5), 'cm')), bignumber(-1));
    assert.deepEqual(index.sign(index.unit(fraction(5), 'cm')), fraction(1));
    assert.deepEqual(index.sign(index.unit(fraction(-5), 'cm')), fraction(-1));

    assert.deepEqual(index.sign(index.unit(complex(3,4), 'mi')), complex(0.6,0.8));
  });

  it('should throw an error when used with a string', function() {
    assert.throws(function () { index.sign("hello world"); });
  });

  it('should return a matrix of the signs of each elements in the given array', function() {
    assert.deepEqual(index.sign([-2,-1,0,1,2]), [-1,-1,0,1,1]);
  });

  it('should return a matrix of the signs of each elements in the given matrix', function() {
    assert.deepEqual(index.sign(index.matrix([-2,-1,0,1,2])), index.matrix([-1,-1,0,1,1]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index.sign()}, /TypeError: Too few arguments/);
    assert.throws(function () {index.sign(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX sign', function () {
    var expression = index.parse('sign(-4)');
    assert.equal(expression.toTex(), '\\mathrm{sign}\\left(-4\\right)');
  });

});
