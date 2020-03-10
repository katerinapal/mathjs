import assert_moduleDefault from "assert";
import * as indexjs from "../../lib/error/index";
import { math as indexjs } from "../../index";
import { approx as approxjs } from "../../tools/approx";
var assert = {},
    error = indexjs,
    math = indexjs,
    approx = approxjs,
    number = indexjs.number;

describe('number', function() {

  it('should be 0 if called with no argument', function() {
    approxjs(number(), 0);
  });

  it('should convert a boolean to a number', function() {
    approxjs(number(true), 1);
    approxjs(number(false), 0);
  });

  it('should convert null to a number', function() {
    approxjs(number(null), 0);
  });

  it('should convert a bignumber to a number', function() {
    approxjs(number(indexjs.bignumber(0.1)), 0.1);
    approxjs(number(indexjs.bignumber('1.3e500')), Infinity);
  });

  it('should convert a fraction to a number', function() {
    approxjs(number(indexjs.fraction(2,5)), 0.4);
  });

  it('should accept a number as argument', function() {
    approxjs(number(3), 3);
    approxjs(number(-3), -3);
  });

  it('should convert a unit to a number', function() {
    approxjs(number(indexjs.unit('52cm'), 'm'), 0.52);
  });

  it('should parse the string if called with a valid string', function() {
    approxjs(number('2.1e3'), 2100);
    approxjs(number(' 2.1e-3 '), 0.0021);
    approxjs(number(''), 0);
    approxjs(number(' '), 0);
  });

  it('should throw an error if called with an invalid string', function() {
    assert.throws(function () {number('2.3.4')}, SyntaxError);
    assert.throws(function () {number('23a')}, SyntaxError);
  });

  it('should convert the elements of a matrix to numbers', function() {
    assert.deepEqual(number(indexjs.matrix(['123',true])), indexjs.matrix([123, 1]));
  });

  it('should convert the elements of an array to numbers', function() {
    assert.deepEqual(number(['123',true]), [123, 1]);
  });

  it('should throw an error if called with a wrong number of arguments', function() {
    assert.throws(function () {number(1,2,3)}, /TypeError: Too many arguments/);
  });

  it('should throw an error if called with a complex number', function() {
    assert.throws(function () {number(indexjs.complex(2,3))}, TypeError);
  });

  it('should throw an error with wrong type of arguments', function() {
    assert.throws(function () {number(indexjs.unit('5cm'))}, /Second argument with valueless unit expected/);
    //assert.throws(function () {number(math.unit('5cm'), 2)}, TypeError); // FIXME: this should also throw an error
    assert.throws(function () {number(indexjs.unit('5cm'), new Date())}, TypeError);
    assert.throws(function () {number('23', 2)}, TypeError);
  });

  it('should LaTeX number', function () {
    var expr1 = indexjs.parse('number()');
    var expr2 = indexjs.parse('number(1)');
    var expr3 = indexjs.parse('number(1,cm)');

    assert.equal(expr1.toTex(), '0');
    assert.equal(expr2.toTex(), '\\left(1\\right)');
    assert.equal(expr3.toTex(), '\\left(\\left(1\\right)\\mathrm{cm}\\right)');
  });
});

