import assert from "assert";
import { type as libutilstypes_typejs } from "../../lib/utils/types";
// test types utils
var approx = require('../../tools/approx');

describe ('types', function () {

  it('should return the type of null', function () {
    assert.equal(libutilstypes_typejs.type(null), 'null');
  });

  it('should return the type of undefined', function () {
    assert.equal(libutilstypes_typejs.type(undefined), 'undefined');
    assert.equal(libutilstypes_typejs.type(), 'undefined');
  });

  it('should return the type of a boolean', function () {

    assert.equal(libutilstypes_typejs.type(false), 'boolean');
    assert.equal(libutilstypes_typejs.type(true), 'boolean');
  });

  it('should return the type of a number', function () {
    assert.equal(libutilstypes_typejs.type(2.3), 'number');
    assert.equal(libutilstypes_typejs.type(Number(2.3)), 'number');
    assert.equal(libutilstypes_typejs.type(new Number(2.3)), 'number');
    assert.equal(libutilstypes_typejs.type(NaN), 'number');
  });

  it('should return the type of a string', function () {
    assert.equal(libutilstypes_typejs.type('bla'), 'string');
    assert.equal(libutilstypes_typejs.type(new String('bla')), 'string');
  });

  it('should return the type of an object', function () {
    assert.equal(libutilstypes_typejs.type({}), 'Object');
    assert.equal(libutilstypes_typejs.type(new Object()), 'Object');
  });

  it('should return the type of an array', function () {
    assert.equal(libutilstypes_typejs.type([]), 'Array');
    assert.equal(libutilstypes_typejs.type(new Array()), 'Array');
  });

  it('should return the type of a function', function () {
    assert.equal(libutilstypes_typejs.type(function () {}), 'Function');
  });

  it('should return the type of a date', function () {
    assert.equal(libutilstypes_typejs.type(new Date()), 'Date');
  });

  it('should return the type of a regexp', function () {
    assert.equal(libutilstypes_typejs.type(/regexp/), 'RegExp');
  });

});