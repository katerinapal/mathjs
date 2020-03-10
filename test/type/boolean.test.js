import assert_moduleDefault from "assert";
import * as indexjs from "../../lib/error/index";
import { math as indexjs } from "../../index";
var assert = {},
    error = indexjs,
    math = indexjs,
    bool = indexjs['boolean'];

describe('boolean', function() {

  it('should convert a boolean to a boolean', function() {
    assert.equal(bool(true), true);
    assert.equal(bool(false), false);
  });

  it('should convert null to a boolean', function() {
    assert.equal(bool(null), false);
  });

  it('should convert a number into a boolean', function() {
    assert.equal(bool(-2), true);
    assert.equal(bool(-1), true);
    assert.equal(bool(0), false);
    assert.equal(bool(1), true);
    assert.equal(bool(2), true);
  });

  it('should convert a bignumber into a boolean', function() {
    assert.equal(bool(indexjs.bignumber(-2)), true);
    assert.equal(bool(indexjs.bignumber(-1)), true);
    assert.equal(bool(indexjs.bignumber(0)), false);
    assert.equal(bool(indexjs.bignumber(1)), true);
    assert.equal(bool(indexjs.bignumber(2)), true);
  });

  it('should convert the elements of a matrix or array to booleans', function() {
    assert.deepEqual(bool(indexjs.matrix([1,0,1,1])), indexjs.matrix([true, false, true, true]));
    assert.deepEqual(bool([1,0,1,1]), [true, false, true, true]);
  });

  it('should convert a string into a boolean', function() {
    assert.equal(bool('true'), true);
    assert.equal(bool('false'), false);

    assert.equal(bool('True'), true);
    assert.equal(bool('False'), false);

    assert.equal(bool('1'), true);
    assert.equal(bool('0'), false);
    assert.equal(bool(' 0 '), false);

    assert.equal(bool('2'), true);
    assert.equal(bool(' 4e2 '), true);
    assert.equal(bool(' -4e2 '), true);
  });

  it('should throw an error if the string is not a valid number', function() {
    assert.throws(function () {bool('')}, /Error: Cannot convert/);
    assert.throws(function () {bool('23a')}, /Error: Cannot convert/);
  });

  it('should throw an error if there\'s a wrong number of arguments', function() {
    assert.throws(function () {bool(1,2)}, /TypeError: Too many arguments/);
  });

  it('should throw an error if used with a complex', function() {
    assert.throws(function () {bool(indexjs.complex(2,3))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error if used with a unit', function() {  
    assert.throws(function () {bool(indexjs.unit('5cm'))}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX boolean', function () {
    var expression = indexjs.parse('boolean(1)');
    assert.equal(expression.toTex(), '\\mathrm{boolean}\\left(1\\right)');
  });

});
