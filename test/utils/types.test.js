import assert from "assert";
import { type as libutilstypes_typejs } from "../../lib/utils/types";
// test types utils
var approx = require('../../tools/approx');

describe ('types', function () {

  it('should return the type of null', function () {
    assert.equal(libutilstypes_typejs(null), 'null');
  });

  it('should return the type of undefined', function () {
    assert.equal(libutilstypes_typejs(undefined), 'undefined');
    assert.equal(libutilstypes_typejs(), 'undefined');
  });

  it('should return the type of a boolean', function () {

    assert.equal(libutilstypes_typejs(false), 'boolean');
    assert.equal(libutilstypes_typejs(true), 'boolean');
  });

  it('should return the type of a number', function () {
    assert.equal(libutilstypes_typejs(2.3), 'number');
    assert.equal(libutilstypes_typejs(Number(2.3)), 'number');
    assert.equal(libutilstypes_typejs(new Number(2.3)), 'number');
    assert.equal(libutilstypes_typejs(NaN), 'number');
  });

  it('should return the type of a string', function () {
    assert.equal(libutilstypes_typejs('bla'), 'string');
    assert.equal(libutilstypes_typejs(new String('bla')), 'string');
  });

  it('should return the type of an object', function () {
    assert.equal(libutilstypes_typejs({}), 'Object');
    assert.equal(libutilstypes_typejs(new Object()), 'Object');
  });

  it('should return the type of an array', function () {
    assert.equal(libutilstypes_typejs([]), 'Array');
    assert.equal(libutilstypes_typejs(new Array()), 'Array');
  });

  it('should return the type of a function', function () {
    assert.equal(libutilstypes_typejs(function () {}), 'Function');
  });

  it('should return the type of a date', function () {
    assert.equal(libutilstypes_typejs(new Date()), 'Date');
  });

  it('should return the type of a regexp', function () {
    assert.equal(libutilstypes_typejs(/regexp/), 'RegExp');
  });

});