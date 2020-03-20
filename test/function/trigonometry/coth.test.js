import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
import { equal as toolsapprox_equaljs } from "../../../tools/approx";
var error = require('../../../lib/error/index'), pi = index_indexjsjs.pi, complex = index_indexjsjs.complex, matrix = index_indexjsjs.matrix, unit = index_indexjsjs.unit, coth = index_indexjsjs.coth, bigmath = index_indexjsjs.create({precision: 20}), biggermath = index_indexjsjs.create({number: 'BigNumber', precision: 21});

describe('coth', function() {
  it('should return the coth of a boolean', function () {
    toolsapprox_equaljs(coth(true), 1.3130352854993);
    toolsapprox_equaljs(coth(false), Number.POSITIVE_INFINITY);
  });

  it('should return the coth of null', function () {
    toolsapprox_equaljs(coth(null), Number.POSITIVE_INFINITY);
  });

  it('should return the coth of a number', function() {
    toolsapprox_equaljs(coth(0), Number.POSITIVE_INFINITY);
    toolsapprox_equaljs(coth(pi), 1.0037418731973);
    toolsapprox_equaljs(coth(1), 1.3130352854993);
    toolsapprox_equaljs(coth(2), 1.0373147207275);
    toolsapprox_equaljs(coth(3), 1.0049698233137);
  });

  it('should return the coth of a bignumber', function() {
    var cothBig = bigmath.coth;
    var Big = bigmath.bignumber;
    assert.deepEqual(cothBig(Big(0)).toString(), 'Infinity');
    assert.deepEqual(cothBig(Big(1)), Big('1.3130352854993313036'));
    assert.deepEqual(cothBig(Big(2)), Big('1.0373147207275480959'));
    assert.deepEqual(cothBig(Big(3)), Big('1.0049698233136891711'));

    /* Pass in extra digits to pi. */
    assert.deepEqual(cothBig(biggermath.pi), Big('1.0037418731973212882'));
  });

  it('should return the coth of a complex number', function() {
    approx.deepEqual(coth(complex('1')), complex(1.3130352854993, 0));
    approx.deepEqual(coth(complex('i')), complex(0, -0.64209261593433));
    approx.deepEqual(coth(complex('2 + i')), complex(0.98432922645819, -0.032797755533753));
  });

  it('should return the coth of an angle', function() {
    toolsapprox_equaljs(coth(unit('90deg')), 1.0903314107274);
    toolsapprox_equaljs(coth(unit('-45deg')), -1.5248686188221);

    assert(coth(unit(index_indexjsjs.bignumber(90), 'deg')).isBigNumber);
    toolsapprox_equaljs(coth(unit(index_indexjsjs.bignumber(90), 'deg')).toNumber(), 1.0903314107274);

    approx.deepEqual(coth(index_indexjsjs.unit(complex('2 + i'), 'rad')), complex(0.98432922645819, -0.032797755533753));
  });

  it('should throw an error if called with an invalid unit', function() {
    assert.throws(function () {coth(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {coth('string')});
  });

  var coth123 = [1.3130352854993, 1.0373147207275, 1.0049698233137];

  it('should return the coth of each element of an array', function() {
    approx.deepEqual(coth([1,2,3]), coth123);
  });

  it('should return the coth of each element of a matrix', function() {
    approx.deepEqual(coth(matrix([1,2,3])), matrix(coth123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {coth()}, /TypeError: Too few arguments/);
    assert.throws(function () {coth(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX coth', function () {
    var expression = index_indexjsjs.parse('coth(1)');
    assert.equal(expression.toTex(), '\\coth\\left(1\\right)');
  });
});
