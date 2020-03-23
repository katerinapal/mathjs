import assert from "assert";
import { indexjs as index_indexjsjs } from "../../index";
var error = require('../../lib/error/index'), bool = index_indexjsjs['boolean'];

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
    assert.equal(bool(index_indexjsjs.bignumber(-2)), true);
    assert.equal(bool(index_indexjsjs.bignumber(-1)), true);
    assert.equal(bool(index_indexjsjs.bignumber(0)), false);
    assert.equal(bool(index_indexjsjs.bignumber(1)), true);
    assert.equal(bool(index_indexjsjs.bignumber(2)), true);
  });

  it('should convert the elements of a matrix or array to booleans', function() {
    assert.deepEqual(bool(index_indexjsjs.matrix([1,0,1,1])), index_indexjsjs.matrix([true, false, true, true]));
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
    assert.throws(function () {bool(index_indexjsjs.complex(2,3))}, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error if used with a unit', function() {  
    assert.throws(function () {bool(index_indexjsjs.unit('5cm'))}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX boolean', function () {
    var expression = index_indexjsjs.parse('boolean(1)');
    assert.equal(expression.toTex(), '\\mathrm{boolean}\\left(1\\right)');
  });

});
