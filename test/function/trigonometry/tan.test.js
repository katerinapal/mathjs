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
    tan = indexjs.tan,
    piBigmath = indexjs.create({number: 'BigNumber', precision: 21}),
    bigmath = indexjs.create({precision: 20}),
    Big = bigmath.bignumber,
    bigTan = bigmath.tan;

describe('tan', function() {
  it('should return the tangent of a boolean', function () {
    approxjs(tan(true), 1.55740772465490);
    approxjs(tan(false), 0);
  });

  it('should return the tangent of null', function () {
    approxjs(tan(null), 0);
  });

  it('should return the tangent of a number', function() {
    approxjs(tan(0), 0);
    approxjs(tan(pi*1/4), 1);
    approxjs(tan(pi*1/8), 0.414213562373095);
    assert.ok(tan(pi*2/4) > 1e10);
    approxjs(tan(pi*3/4), -1);
    approxjs(tan(pi*4/4), 0);
    approxjs(tan(pi*5/4), 1);
    assert.ok(tan(pi*6/4) > 1e10);
    approxjs(tan(pi*7/4), -1);
    approxjs(tan(pi*8/4), 0);
  });

  it('should return the tangent of a bignumber', function() { 
    var bigPi = piBigmath.pi;

    assert.deepEqual(bigTan(Big(0)), Big(0));
    assert.deepEqual(bigTan(Big(-1)), Big('-1.5574077246549022305'));

    assert.deepEqual(bigTan(bigPi.div(8)).toString(), '0.414213562373095048802');
    // Wolfram:                                        0.414213562373095048801688724209698078569671875376948073176
    assert.deepEqual(bigTan(bigPi.div(4)).toString(), '0.999999999999999999999');
  });

  it('should return the tangent of a complex number', function() {
    var re = 0.00376402564150425,
        im = 1.00323862735360980;
    approxjs.deepEqual(tan(complex('2+3i')), complex(-re, im));
    approxjs.deepEqual(tan(complex('2-3i')), complex(-re, -im));
    approxjs.deepEqual(tan(complex('-2+3i')), complex(re, im));
    approxjs.deepEqual(tan(complex('-2-3i')), complex(re, -im));
    approxjs.deepEqual(tan(complex('i')), complex(0, 0.761594155955765));
    approxjs.deepEqual(tan(complex('1')), complex(1.55740772465490, 0));
    approxjs.deepEqual(tan(complex('1+i')), complex(0.271752585319512, 1.083923327338695));
  });

  it('should return the tangent of an angle', function() {
    approxjs(tan(unit(' 60deg')), indexjs.sqrt(3));
    approxjs(tan(unit('-135deg')), 1);

    assert(tan(unit(indexjs.bignumber(60), 'deg')).isBigNumber);
    approxjs(tan(unit(indexjs.bignumber(60), 'deg')).toNumber(), indexjs.sqrt(3));

    approxjs.deepEqual(tan(unit(complex('1+i'), 'rad')), complex(0.271752585319512, 1.083923327338695));
  });

  it('should throw an error if called with an invalid unit', function() {
    assert.throws(function () {tan(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {tan('string')});
  });

  var tan123 = [1.557407724654902, -2.185039863261519, -0.142546543074278];

  it('should return the tan of each element of an array', function() {
    approxjs.deepEqual(tan([1,2,3]), tan123);
  });

  it('should return the tan of each element of a matrix', function() {
    approxjs.deepEqual(tan(matrix([1,2,3])), matrix(tan123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {tan()}, /TypeError: Too few arguments/);
    assert.throws(function () {tan(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX tan', function () {
    var expression = indexjs.parse('tan(1)');
    assert.equal(expression.toTex(), '\\tan\\left(1\\right)');
  });

});
