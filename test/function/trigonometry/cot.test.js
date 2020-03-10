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
    cot = indexjs.cot,
    bigmath = indexjs.create({number: 'BigNumber', precision: 20}),
    biggermath = indexjs.create({number: 'BigNumber', precision: 22});

describe('cot', function() {
  it('should return the cotan of a boolean', function () {
    approxjs(cot(true), 0.642092615934331);
    approxjs(cot(false), Infinity);
  });

  it('should return the cotan of null', function () {
    approxjs(cot(null), Infinity);
  });

  it('should return the cotan of a number', function() {
    approxjs(cot(0), Infinity);
    approxjs(1 / cot(pi*1/8), 0.414213562373095);
    approxjs(1 / cot(pi*1/4), 1);
    approxjs(cot(pi*2/4), 0);
    approxjs(1 / cot(pi*3/4), -1);
    approxjs(1 / cot(pi*4/4), 0);
    approxjs(1 / cot(pi*5/4), 1);
    approxjs(cot(pi*6/4), 0);
    approxjs(1 / cot(pi*7/4), -1);
    approxjs(1 / cot(pi*8/4), 0);
  });

  it('should return the cotan of a bignumber', function() {
    var Big = bigmath.bignumber;
    var bigPi = bigmath.pi;
    var sqrt2 = bigmath.SQRT2.toString();

    var arg1 = Big(0);
    var result1 = bigmath.cot(arg1);
    assert.ok(!result1.isFinite());
    assert.equal(result1.constructor.precision, 20);
    assert.deepEqual(arg1, Big(0));

    var result2 = bigmath.cot(bigPi.div(8));
    assert.deepEqual(result2.toString(), '2.4142135623730950488');
    assert.equal(result2.constructor.precision, 20);
    assert.equal(bigPi.constructor.precision, 20);

    assert.deepEqual(bigmath.cot(bigPi.div(2)), Big('-1.4142135623730950488e-15')); // about zero
    assert.deepEqual(bigmath.cot(bigPi), Big('26769019461318409709')); // about infinity
  });

  it('should return the cotan of a complex number', function() {
    var re = 0.00373971037633696;
    var im = 0.99675779656935837;
    approxjs.deepEqual(cot(complex('2+3i')), complex(-re, -im));
    approxjs.deepEqual(cot(complex('2-3i')), complex(-re, im));
    approxjs.deepEqual(cot(complex('-2+3i')), complex(re, -im));
    approxjs.deepEqual(cot(complex('-2-3i')), complex(re, im));
    approxjs.deepEqual(cot(complex('i')), complex(0, -1.313035285499331));
    approxjs.deepEqual(cot(complex('1')), complex(0.642092615934331, 0));
    approxjs.deepEqual(cot(complex('1+i')), complex(0.217621561854403, -0.868014142895925));
  });

  it('should return the cotan of an angle', function() {
    approxjs(cot(unit('45deg')), 1);
    approxjs(cot(unit('-45deg')), -1);

    assert(cot(unit(indexjs.bignumber(45), 'deg')).isBigNumber);
    approxjs(cot(unit(indexjs.bignumber(45), 'deg')).toNumber(), 1);

    approxjs.deepEqual(cot(indexjs.unit(complex('1+i'), 'rad')), complex(0.217621561854403, -0.868014142895925));
  });

  it('should throw an error if called with an invalid unit', function() {
    assert.throws(function () {cot(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {cot('string')});
  });

  var cot123 = [0.642092615934331, -0.457657554360286, -7.015252551434534];

  it('should return the cotan of each element of an array', function() {
    approxjs.deepEqual(cot([1,2,3]), cot123);
  });

  it('should return the cotan of each element of a matrix', function() {
    approxjs.deepEqual(cot(matrix([1,2,3])), matrix(cot123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {cot()}, /TypeError: Too few arguments/);
    assert.throws(function () {cot(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX cot', function () {
    var expression = indexjs.parse('cot(1)');
    assert.equal(expression.toTex(), '\\cot\\left(1\\right)');
  });

});
