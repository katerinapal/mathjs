import assert from "assert";
import * as liberrorindex from "../../../lib/error/index";
import { index } from "../../../index";
import { toolsapprox } from "../../../tools/approx";
var error = liberrorindex;
var math = index;
var approx = toolsapprox;
var pi = index.pi;
var acosh = index.acosh;
var cosh = index.cosh;
var complex = index.complex;
var matrix = index.matrix;
var unit = index.unit;
var bigmath = index.create({number: 'BigNumber', precision: 20});
var biggermath = index.create({precision: 22});
var predmath = index.create({predictable: true});
var acoshBig = bigmath.acosh;
var Big = bigmath.bignumber;

describe('acosh', function() {
  it('should return the hyperbolic arccos of a boolean', function () {
    assert.equal(acosh(true), 0);
    toolsapprox.deepEqual(acosh(false), complex(0, pi / 2));
    //assert.ok(isNaN(acosh(false)));
  });

  it('should return the hyperbolic arccos of null', function () {
    toolsapprox.deepEqual(acosh(null), complex(0, pi / 2));
    //assert.ok(isNaN(acosh(null)));
  });

  it('should return the hyperbolic arccos of a number', function() {
    toolsapprox.deepEqual(acosh(-2), complex(1.31695789692481670862504634730797, pi));
    toolsapprox.deepEqual(acosh(0), complex(0, pi / 2));
    //assert.ok(isNaN(acosh(-2)));
    //assert.ok(isNaN(acosh(0)));

    toolsapprox(acosh(1), 0);
    toolsapprox(acosh(2), 1.31695789692481670862504634730797);
    toolsapprox(acosh(3), 1.7627471740390860504652186499595);
    toolsapprox(acosh(pi), 1.811526272460853107021852049305);
  });

  it('should return NaN for values out of range and predictable:true', function() {
    assert.equal(typeof predmath.acosh(-2), 'number');
    assert(isNaN(predmath.acosh(-2)));
  });

  it('should return the hyperbolic arccos of a bignumber', function() {
    var arg = Big(1);
    assert.deepEqual(acosh(arg), Big(0));
    assert.deepEqual(acoshBig(Big(2)), Big('1.3169578969248167086'));
    assert.deepEqual(acoshBig(Big(3)), Big('1.7627471740390860505'));
    assert.deepEqual(acoshBig(bigmath.pi).toString(), '1.811526272460853107');

    //Make sure arg was not changed
    assert.deepEqual(arg, Big(1));
  });

  it('should be the inverse function of hyperbolic cos', function() {
    toolsapprox(acosh(cosh(-1)), 1);
    toolsapprox(acosh(cosh(0)), 0);
    toolsapprox(acosh(cosh(0.1)), 0.1);
    toolsapprox(acosh(cosh(0.5)), 0.5);
    toolsapprox(acosh(cosh(2)), 2);
  });

  it('should be the inverse function of bignumber cosh', function() {
    assert.deepEqual(acoshBig(bigmath.cosh(Big(-1))), Big(1));
    assert.deepEqual(acoshBig(bigmath.cosh(Big(0))), Big(0));
    assert.deepEqual(acoshBig(bigmath.cosh(Big(2))), Big(2));

    // Pass in extra digit
    var arg = Big(0.1);
    assert.deepEqual(acoshBig(biggermath.cosh(arg)), Big('0.10000000000000000012'));
    assert.deepEqual(acoshBig(biggermath.cosh(Big(0.5))), Big('0.49999999999999999995'));
    assert.deepEqual(arg, Big(0.1));
  });

  it('should throw an error if the bignumber result is complex', function() {
    assert.ok(acosh(Big(0.5).isNaN()));
    assert.ok(acosh(Big(-0.5).isNaN()));
  });

  it('should return the arccosh of a complex number', function() {
    toolsapprox.deepEqual(acosh(complex('2+3i')), complex(1.9833870299165, 1.000143542473797));
    toolsapprox.deepEqual(acosh(complex('2-3i')), complex(1.9833870299165, -1.000143542473797));
    toolsapprox.deepEqual(acosh(complex('-2+3i')), complex(1.9833870299165, 2.14144911111600));
    toolsapprox.deepEqual(acosh(complex('-2-3i')), complex(1.9833870299165, -2.14144911111600));
    toolsapprox.deepEqual(acosh(complex('1+i')), complex(1.061275061905036, 0.904556894302381));
    toolsapprox.deepEqual(acosh(complex('i')), complex(0.881373587019543, 1.570796326794897));
    assert.deepEqual(acosh(complex('1')), complex(0, 0));
    toolsapprox.deepEqual(acosh(complex('0')), complex(0, pi / 2));
  });

  it('should throw an error if called with a unit', function() {
    assert.throws(function () {acosh(unit('45deg'))});
    assert.throws(function () {acosh(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {acosh('string')});
  });

  it('should calculate the arccos element-wise for arrays and matrices', function() {
    var acosh123 = [0, 1.3169578969248167, 1.7627471740390860504];
    toolsapprox.deepEqual(acosh([1,2,3]), acosh123);
    toolsapprox.deepEqual(acosh(matrix([1,2,3])), matrix(acosh123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {acosh()}, /TypeError: Too few arguments/);
    assert.throws(function () {acosh(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX acosh', function () {
    var expression = index.parse('acosh(1)');
    assert.equal(expression.toTex(), '\\cosh^{-1}\\left(1\\right)');
  });

});
