import assert_moduleDefault from "assert";
import * as approxjs from "../../tools/approx";
import { types as typesjs } from "../../lib/utils/types";
// test types utils
var assert = {},
    approx = approxjs,
    types = typesjs;

describe ('types', function () {

  it('should return the type of null', function () {
    assert.equal(typesjs.type(null), 'null');
  });

  it('should return the type of undefined', function () {
    assert.equal(typesjs.type(undefined), 'undefined');
    assert.equal(typesjs.type(), 'undefined');
  });

  it('should return the type of a boolean', function () {

    assert.equal(typesjs.type(false), 'boolean');
    assert.equal(typesjs.type(true), 'boolean');
  });

  it('should return the type of a number', function () {
    assert.equal(typesjs.type(2.3), 'number');
    assert.equal(typesjs.type(Number(2.3)), 'number');
    assert.equal(typesjs.type(new Number(2.3)), 'number');
    assert.equal(typesjs.type(NaN), 'number');
  });

  it('should return the type of a string', function () {
    assert.equal(typesjs.type('bla'), 'string');
    assert.equal(typesjs.type(new String('bla')), 'string');
  });

  it('should return the type of an object', function () {
    assert.equal(typesjs.type({}), 'Object');
    assert.equal(typesjs.type(new Object()), 'Object');
  });

  it('should return the type of an array', function () {
    assert.equal(typesjs.type([]), 'Array');
    assert.equal(typesjs.type(new Array()), 'Array');
  });

  it('should return the type of a function', function () {
    assert.equal(typesjs.type(function () {}), 'Function');
  });

  it('should return the type of a date', function () {
    assert.equal(typesjs.type(new Date()), 'Date');
  });

  it('should return the type of a regexp', function () {
    assert.equal(typesjs.type(/regexp/), 'RegExp');
  });

});