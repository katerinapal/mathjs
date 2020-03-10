import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
import { approx as approxjs } from "../../../tools/approx";
var assert = {};
var error = indexjs;
var math = indexjs;
var approx = approxjs;
var pi = indexjs.pi;
var asech = indexjs.asech;
var sech = indexjs.sech;
var complex = indexjs.complex;
var matrix = indexjs.matrix;
var unit = indexjs.unit;
var bigmath = indexjs.create({number: 'BigNumber', precision: 20});
var biggermath = indexjs.create({precision: 22});
var predmath = indexjs.create({predictable: true});
var asechBig = bigmath.asech;
var Big = bigmath.bignumber;

describe('asech', function() {
  it('should return the hyperbolic arcsec of a boolean', function () {
    assert.equal(asech(true), 0);
    assert.equal(asech(false), Infinity);
  });

  it('should return the hyperbolic arcsec of null', function () {
    assert.equal(asech(null), Infinity);
  });

  it('should return the hyperbolic arcsec of a number', function() {
    approxjs.deepEqual(asech(-0.5), complex(1.3169578969, pi));
    approxjs.deepEqual(asech(2), complex(0, pi / 3));
    //assert.ok(isNaN(asech(-0.5)));
    //assert.ok(isNaN(asech(2)));

    assert.equal(asech(0), Infinity);
    approxjs(asech(0.25), 2.0634370688955605467272811726201);
    approxjs(asech(0.5), 1.31695789692481670862504634730797);
    approxjs(asech(0.75), 0.7953654612239056305278909331478);
    assert.equal(asech(1), 0);
  });

  it('should return the hyperbolic arcsec of a number when predictable:true', function() {
    assert.equal(typeof predmath.asech(2), 'number');
    assert(isNaN(predmath.asech(2)));
  });

  it('should return the hyperbolic arcsec of a bignumber', function() {
    var arg1 = Big(0);
    var arg2 = Big(0.25);
    assert.deepEqual(asechBig(arg1).toString(), 'Infinity');
    assert.deepEqual(asechBig(arg2), Big('2.0634370688955605467'));
    assert.deepEqual(asechBig(Big(0.5)), Big('1.3169578969248167086'));
    assert.deepEqual(asechBig(Big(0.75)), Big('0.79536546122390563049'));
    assert.deepEqual(asechBig(Big(1)), Big(0));

    //Make sure arg was not changed
    assert.deepEqual(arg1, Big(0));
    assert.deepEqual(arg2, Big(0.25));

    /* out of range */
    assert.ok(asech(Big(-1)).isNaN());
    assert.ok(asech(Big(2)).isNaN());
  });

  it('should be the inverse function of hyperbolic sec', function() {
    approxjs(asech(sech(-1)), 1);
    approxjs(asech(sech(0)), 0);
    approxjs(asech(sech(0.1)), 0.1);
    approxjs(asech(sech(0.5)), 0.5);
    approxjs(asech(sech(2)), 2);
  });

  it('should be the inverse function of bignumber sech', function() {
    assert.deepEqual(asechBig(bigmath.sech(Big(-1))), Big(1));
    assert.deepEqual(asechBig(bigmath.sech(Big(0))), Big(0));
    assert.deepEqual(asechBig(bigmath.sech(Big(0.5))), Big('0.49999999999999999995'));
    assert.deepEqual(asechBig(bigmath.sech(Big(2))), Big(2));

    /* Pass in more digits to pi. */
    assert.deepEqual(asechBig(biggermath.sech(Big(0.1))), Big('0.10000000000000000012'));
  });

  it('should return the arcsech of a complex number', function() {
    approxjs.deepEqual(asech(complex('2+3i')), complex(0.23133469857397, -1.420410722467035));
    approxjs.deepEqual(asech(complex('2-3i')), complex(0.23133469857397, 1.420410722467035));
    approxjs.deepEqual(asech(complex('-2+3i')), complex(0.23133469857397, -1.72118193112275858));
    approxjs.deepEqual(asech(complex('-2-3i')), complex(0.23133469857397, 1.72118193112275858));
    approxjs.deepEqual(asech(complex('1+i')), complex(0.5306375309525178, -1.11851787964370594));
    approxjs.deepEqual(asech(complex('i')), complex(0.881373587019543, -1.570796326794897));
    approxjs.deepEqual(asech(complex('2')), complex(0, pi / 3));
    assert.deepEqual(asech(complex('1')), complex(0, 0));
    approxjs.deepEqual(asech(complex('0.5')), complex(1.3169578969248, 0));
    assert.deepEqual(asech(complex('0')), complex(Infinity, 0));
    approxjs.deepEqual(asech(complex('-0.5')), complex(1.3169578969248, pi));
    approxjs.deepEqual(asech(complex('-1')), complex(0, pi));
  });

  it('should throw an error if called with a unit', function() {
    assert.throws(function () {asech(unit('45deg'))});
    assert.throws(function () {asech(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {asech('string')});
  });

  it('should calculate the arcsec element-wise for arrays and matrices', function() {
    var asech01 = [Infinity, 0];
    assert.deepEqual(asech([0,1]), asech01);
    assert.deepEqual(asech(matrix([0,1])), matrix(asech01));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {asech()}, /TypeError: Too few arguments/);
    assert.throws(function () {asech(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX asech', function () {
    var expression = indexjs.parse('asech(1)');
    assert.equal(expression.toTex(), '\\mathrm{sech}^{-1}\\left(1\\right)');
  });

});
