"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _types = require("../../lib/utils/types");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test types utils
var approx = require('../../tools/approx');

describe('types', function () {

  it('should return the type of null', function () {
    _assert2.default.equal(_types.type.type(null), 'null');
  });

  it('should return the type of undefined', function () {
    _assert2.default.equal(_types.type.type(undefined), 'undefined');
    _assert2.default.equal(_types.type.type(), 'undefined');
  });

  it('should return the type of a boolean', function () {

    _assert2.default.equal(_types.type.type(false), 'boolean');
    _assert2.default.equal(_types.type.type(true), 'boolean');
  });

  it('should return the type of a number', function () {
    _assert2.default.equal(_types.type.type(2.3), 'number');
    _assert2.default.equal(_types.type.type(Number(2.3)), 'number');
    _assert2.default.equal(_types.type.type(new Number(2.3)), 'number');
    _assert2.default.equal(_types.type.type(NaN), 'number');
  });

  it('should return the type of a string', function () {
    _assert2.default.equal(_types.type.type('bla'), 'string');
    _assert2.default.equal(_types.type.type(new String('bla')), 'string');
  });

  it('should return the type of an object', function () {
    _assert2.default.equal(_types.type.type({}), 'Object');
    _assert2.default.equal(_types.type.type(new Object()), 'Object');
  });

  it('should return the type of an array', function () {
    _assert2.default.equal(_types.type.type([]), 'Array');
    _assert2.default.equal(_types.type.type(new Array()), 'Array');
  });

  it('should return the type of a function', function () {
    _assert2.default.equal(_types.type.type(function () {}), 'Function');
  });

  it('should return the type of a date', function () {
    _assert2.default.equal(_types.type.type(new Date()), 'Date');
  });

  it('should return the type of a regexp', function () {
    _assert2.default.equal(_types.type.type(/regexp/), 'RegExp');
  });
});
