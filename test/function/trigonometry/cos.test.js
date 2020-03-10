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
    cos = indexjs.cos,
    bigmath = indexjs.create({number: 'BigNumber', precision: 15}),
    biggermath = indexjs.create({number: 'BigNumber', precision: 238});


describe('cos', function() {
  it('should return the cosine of a boolean', function () {
    approxjs(cos(true), 0.54030230586814);
    approxjs(cos(false), 1);
  });

  it('should return the cosine of null', function () {
    approxjs(cos(null), 1);
  });

  it('should return the cosine of a number', function() {
    approxjs(cos(0), 1);
    approxjs(cos(pi*1/4), 0.707106781186548);
    approxjs(cos(pi*1/8), 0.923879532511287);
    approxjs(cos(pi*2/4), 0);
    approxjs(cos(pi*3/4), -0.707106781186548);
    approxjs(cos(pi*4/4), -1);
    approxjs(cos(pi*5/4), -0.707106781186548);
    approxjs(cos(pi*6/4), 0);
    approxjs(cos(pi*7/4), 0.707106781186548);
    approxjs(cos(pi*8/4), 1);
    approxjs(cos(pi/4), Math.SQRT1_2);
  });

  it('should return the cosine of a bignumber', function() {
    assert.deepEqual(bigmath.cos(biggermath.bignumber(0)).toString(), '1');

    // 103.64 % tau = 3.109... <- pretty close to the pi boundary
    var result_val = '-0.99947004918247698171247470962484532559534008595265991588' +
                        '25959085696348870383952892132851183764863885182646678036' +
                        '80857263937361947475191126604630777331941809888320749410' +
                        '59494006339537812110786663367929884637840572887762249921' +
                        '8425619255481';
    var cos_val = biggermath.cos(biggermath.bignumber(103.64));
    assert.equal(biggermath.bignumber(103.64).constructor.precision, 238);
    assert.equal(cos_val.constructor.precision, 238);
    assert.deepEqual(cos_val.toString(), result_val);

    cos_val = biggermath.cos(biggermath.bignumber(-103.64));
    assert.equal(cos_val.constructor.precision, 238);
    assert.deepEqual(cos_val.toString(), result_val);


    biggermath.config({precision: 16});
    var bigPi = biggermath.pi;

    // we've had a bug in reducing the period, affecting integer values around multiples of tau
    assert.deepEqual(bigmath.cos(bigmath.bignumber(6)).toString(), '0.960170286650366');
    assert.deepEqual(bigmath.cos(bigmath.bignumber(7)).toString(), '0.753902254343305');

    // we've had a bug in reducing the period, affecting integer values around multiples of tau (like 6, 7)
    for (var x = -20; x < 20; x += 1) {
      approxjs(bigmath.cos(bigmath.bignumber(x)).toNumber(), Math.cos(x));
    }

    assert.deepEqual(bigmath.cos(bigPi.div(4)).toString(), '0.7071067811865475');
    assert.ok(bigmath.cos(bigPi.div(2)).lt(1e-15));
    assert.deepEqual(bigmath.cos(bigPi).toString(), '-1');
    assert.ok(bigmath.cos(bigPi.times(3).div(2)).lt(1e-15));
    assert.deepEqual(bigmath.cos(bigPi.times(2)).toString(), '1');
    assert.deepEqual(bigmath.cos(bigmath.tau).toString(), '1');
    assert.deepEqual(bigmath.cos(bigmath.tau.times(2)).toString(), '1');
  });

  it('should return the cosine of a complex number', function() {
    var re = 4.18962569096881,
        im = 9.10922789375534;
    approxjs.deepEqual(cos(complex('2+3i')), complex(-re, -im));
    approxjs.deepEqual(cos(complex('2-3i')), complex(-re, im));
    approxjs.deepEqual(cos(complex('-2+3i')), complex(-re, im));
    approxjs.deepEqual(cos(complex('-2-3i')), complex(-re, -im));
    approxjs.deepEqual(cos(complex('i')), complex(1.54308063481524, 0));
    approxjs.deepEqual(cos(complex('1')), complex(0.540302305868140, 0));
    approxjs.deepEqual(cos(complex('1+i')), complex(0.833730025131149, -0.988897705762865));
    approxjs.deepEqual(cos(complex('1e-10+1e-10i')), complex('1-1e-20i'));
  });

  it('should return the cosine of an angle', function() {
    approxjs(cos(unit('45deg')), 0.707106781186548);
    approxjs(cos(unit('-135deg')), -0.707106781186548);

    assert(cos(unit(indexjs.bignumber(45), 'deg')).isBigNumber);
    approxjs(cos(unit(indexjs.bignumber(45), 'deg')).toNumber(), 0.707106781186548);

    approxjs.deepEqual(cos(unit(complex(1,1), 'rad')), complex(0.833730025131149, -0.988897705762865));
  });

  it('should throw an error if called with an invalid unit', function() {
    assert.throws(function () {cos(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {cos('string')});
  });

  var cos123 = [0.540302305868140, -0.41614683654714, -0.989992496600445];

  it('should return the cos of each element of a matrix', function() {
    approxjs.deepEqual(cos(matrix([1,2,3])), matrix(cos123));
  });

  it('should return the cos of each element of an array', function() {
    approxjs.deepEqual(cos([1,2,3]), cos123);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {cos()}, /TypeError: Too few arguments/);
    assert.throws(function () {cos(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX cos', function () {
    var expression = indexjs.parse('cos(1)');
    assert.equal(expression.toTex(), '\\cos\\left(1\\right)');
  });

});
