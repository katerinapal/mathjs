import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
import { approx as approxjs } from "../../../tools/approx";
var assert = {},
    error = indexjs,
    math = indexjs,
    approx = approxjs,
    pi = indexjs.pi,
    complex = indexjs.complex,
    matrix = indexjs.matrix,
    unit = indexjs.unit,
    sech = indexjs.sech,
    bigmath = indexjs.create({precision: 20}),
    biggermath = indexjs.create({number: 'BigNumber', precision: 21});

describe('sech', function() {
  it('should return the sech of a boolean', function () {
    approxjs(sech(true), 0.64805427366389);
    approxjs(sech(false), 1);
  });

  it('should return the sech of null', function () {
    approxjs(sech(null), 1);
  });

  it('should return the sech of a number', function() {
    approxjs(sech(0), 1);
    approxjs(sech(pi), 0.086266738334054);
    approxjs(sech(1), 0.64805427366389);
    approxjs(sech(2), 0.26580222883408);
    approxjs(sech(3), 0.099327927419433);
  });

  it('should return the sech of a bignumber', function() {
    var sechBig = bigmath.sech;
    var Big = bigmath.bignumber;

    assert.deepEqual(sechBig(Big(0)), Big(1));
    assert.deepEqual(sechBig(Big(1)), Big('0.64805427366388539957'));
    assert.deepEqual(sechBig(Big(2)), Big('0.26580222883407969212'));
    assert.deepEqual(sechBig(Big(3)), Big('0.099327927419433207829'));

    /* Pass in extra digits to pi. */
    assert.deepEqual(sechBig(biggermath.pi), Big('0.086266738334054414697'));
  });

  it('should return the sech of a complex number', function() {
    approxjs.deepEqual(sech(complex('1')), complex(0.64805427366389, 0));
    approxjs.deepEqual(sech(complex('i')), complex(1.8508157176809, 0));
    approxjs.deepEqual(sech(complex('2 + i')), complex(0.15117629826558, -0.22697367539372));
  });

  it('should return the sech of an angle', function() {
    approxjs(sech(unit('90deg')), 0.39853681533839);
    approxjs(sech(unit('-45deg')), 0.75493970871413);

    assert(sech(unit(indexjs.bignumber(90), 'deg')).isBigNumber);
    approxjs(sech(unit(indexjs.bignumber(90), 'deg')).toNumber(), 0.39853681533839);

    approxjs.deepEqual(sech(unit(complex('2 + i'), 'rad')), complex(0.15117629826558, -0.22697367539372));
  });

  it('should throw an error if called with an invalid unit', function() {
    assert.throws(function () {sech(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {sech('string')});
  });

  var sech123 = [0.64805427366389, 0.26580222883408, 0.099327927419433];

  it('should return the sech of each element of an array', function() {
    approxjs.deepEqual(sech([1,2,3]), sech123);
  });

  it('should return the sech of each element of a matrix', function() {
    approxjs.deepEqual(sech(matrix([1,2,3])), matrix(sech123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {sech()}, /TypeError: Too few arguments/);
    assert.throws(function () {sech(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX sech', function () {
    var expression = indexjs.parse('sech(1)');
    assert.equal(expression.toTex(), '\\mathrm{sech}\\left(1\\right)');
  });
});
