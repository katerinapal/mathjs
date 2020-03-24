import assert from "assert";
import { indexjs as index_indexjsjs } from "../../index";
var error = {}, string = index_indexjsjs.string;

describe('string', function() {

  it('should be \'\' if called with no argument', function() {
    assert.equal(string(), '');
  });

  it('should convert a boolean to a string', function() {
    assert.equal(string(true), 'true');
    assert.equal(string(false), 'false');
  });

  it('should convert null to a string', function() {
    assert.equal(string(null), 'null');
  });

  it('should be the identity if called with a string', function() {
    assert.equal(string('hello'), 'hello');
    assert.equal(string(''), '');
    assert.equal(string(' '), ' ');
  });

  it('should convert the elements of an array to strings', function() {
    assert.deepEqual(string([[2,true],['hi',null]]), [['2', 'true'],['hi', 'null']]);
  });

  it('should convert the elements of a matrix to strings', function() {
    assert.deepEqual(string(index_indexjsjs.matrix([[2,true],['hi',null]])),
        index_indexjsjs.matrix([['2', 'true'],['hi', 'null']]));
  });

  it('should convert a number to string', function() {
    assert.equal(string(1/8), '0.125');
    assert.equal(string(2.1e-3), '0.0021');
    assert.equal(string(123456789), '1.23456789e+8');
    assert.equal(string(2000000), '2e+6');
  });

  it('should convert a bignumber to string', function() {
    assert.equal(string(index_indexjsjs.bignumber('2.3e+500')), '2.3e+500');
  });

  it('should convert a complex number to string', function() {
    assert.equal(string(index_indexjsjs.complex(2,3)), '2 + 3i');
  });

  it('should convert a unit to string', function() {
    assert.equal(string(index_indexjsjs.unit('5cm')), '50 mm');
  });

  it('should throw an error if called with wrong number of arguments', function() {
    assert.throws(function () {string(1,2)}, /TypeError: Too many arguments/);
    assert.throws(function () {string(1,2,3)}, /TypeError: Too many arguments/);
  });

});
