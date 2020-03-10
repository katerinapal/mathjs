import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
import { approx as approxjs } from "../../../tools/approx";
var assert = {};
var error = indexjs;
var math = indexjs;
var approx = approxjs;
var pi = indexjs.pi;
var acoth = indexjs.acoth;
var coth = indexjs.coth;
var complex = indexjs.complex;
var matrix = indexjs.matrix;
var unit = indexjs.unit;
var bigmath = indexjs.create({number: 'BigNumber', precision: 20});
var biggermath = indexjs.create({precision: 21});
var predmath = indexjs.create({predictable: true});
var acothBig = bigmath.acoth;
var Big = bigmath.bignumber;

describe('acoth', function() {
  it('should return the hyperbolic arccot of a boolean', function () {
    assert.equal(acoth(true), Infinity);
    approxjs.deepEqual(acoth(false), complex(0, pi / 2));
    //assert.ok(isNaN(acoth(false)));
  });

  it('should return the hyperbolic arccot of null', function () {
    approxjs.deepEqual(acoth(null), complex(0, pi / 2));
    //assert.ok(isNaN(acoth(null)));
  });

  it('should return the hyperbolic arccot of a number', function() {
    approxjs.deepEqual(acoth(0), complex(0, pi / 2));
    approxjs.deepEqual(acoth(0.5), complex(0.5493061443340548, -1.5707963267949));
    //assert.ok(isNaN(acoth(0)));
    //assert.ok(isNaN(acoth(0.5)));

    approxjs(acoth(-2), -0.54930614433405484569762261846);
    assert.equal(acoth(-1), -Infinity);
    assert.equal(acoth(1), Infinity);
    approxjs(acoth(2), 0.54930614433405484569762261846);
    assert.equal(acoth(Infinity), 0);
  });

  it('should return the hyperbolic arccot of a number when predictable:true', function() {
    assert.equal(typeof predmath.acoth(0.5), 'number');
    assert(isNaN(predmath.acoth(0.5)));
  });

  it('should return the hyperbolic arccot of a bignumber', function() {
    var arg2 = Big(-2);
    var arg3 = Big(-1);
    assert.deepEqual(acothBig(Big(-Infinity)), Big('-0'));
    assert.deepEqual(acothBig(arg2), Big('-0.5493061443340548457'));
    assert.deepEqual(acothBig(arg3).toString(), '-Infinity');
    assert.deepEqual(acothBig(Big(1)).toString(), 'Infinity');
    assert.deepEqual(acothBig(Big(2)), Big('0.5493061443340548457'));
    assert.deepEqual(acothBig(Big(Infinity)), Big(0));

    //Make sure arg was not changed
    assert.deepEqual(arg2, Big(-2));
    assert.deepEqual(arg3, Big(-1));

    // out of range
    assert.ok(acothBig(Big(-0.5)).isNaN());
    assert.ok(acothBig(Big(0.5)).isNaN());
  });

  it('should be the inverse function of hyperbolic cot', function() {
    approxjs(acoth(coth(-2)), -2);
    approxjs(acoth(coth(-1)), -1);
    approxjs(acoth(coth(0)), 0);
    approxjs(acoth(coth(1)), 1);
    approxjs(acoth(coth(2)), 2);
  });

  it('should be the inverse function of bignumber coth', function() {
    assert.deepEqual(acothBig(bigmath.coth(Big(-1))), Big(-1));
    assert.deepEqual(acothBig(bigmath.coth(Big(0))), Big(0));
    assert.deepEqual(acothBig(bigmath.coth(Big(1))), Big(1));

    /* Pass in more digits to pi. */
    assert.deepEqual(acothBig(biggermath.coth(Big(-2))), Big('-2.0000000000000000001'));
    assert.deepEqual(acothBig(biggermath.coth(Big(2))), Big('2.0000000000000000001'));
  });

  it('should return the arccoth of a complex number', function() {
    approxjs.deepEqual(acoth(complex('2+3i')), complex(0.1469466662255, -0.2318238045004));
    approxjs.deepEqual(acoth(complex('2-3i')), complex(0.1469466662255, 0.2318238045004));
    approxjs.deepEqual(acoth(complex('-2+3i')), complex(-0.1469466662255, -0.2318238045004));
    approxjs.deepEqual(acoth(complex('-2-3i')), complex(-0.1469466662255, 0.2318238045004));
    approxjs.deepEqual(acoth(complex('1+i')), complex(0.4023594781085251, -0.55357435889705));
    approxjs.deepEqual(acoth(complex('i')), complex(0, -pi / 4));
    assert.deepEqual(acoth(complex('1')), complex(Infinity, 0));
    approxjs.deepEqual(acoth(complex('0.5')), complex(0.5493061443340548, -1.5707963267949));
    approxjs.deepEqual(acoth(complex('0')), complex(0, pi / 2));
  });

  it('should throw an error if called with a unit', function() {
    assert.throws(function () {acoth(unit('45deg'))});
    assert.throws(function () {acoth(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {acoth('string')});
  });

  it('should calculate the arccot element-wise for arrays and matrices', function() {
    var acoth123 = [Infinity, 0.54930614433405, 0.34657359027997];
    approxjs.deepEqual(acoth([1,2,3]), acoth123);
    approxjs.deepEqual(acoth(matrix([1,2,3])), matrix(acoth123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {acoth()}, /TypeError: Too few arguments/);
    assert.throws(function () {acoth(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX acoth', function () {
    var expression = indexjs.parse('acoth(2)');
    assert.equal(expression.toTex(), '\\coth^{-1}\\left(2\\right)');
  });

});
