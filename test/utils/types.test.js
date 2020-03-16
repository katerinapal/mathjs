'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test types utils
var approx = require('../../tools/approx'),
    types = require('../../lib/utils/types');

describe('types', function () {

  it('should return the type of null', function () {
    _assert2.default.equal(types.type(null), 'null');
  });

  it('should return the type of undefined', function () {
    _assert2.default.equal(types.type(undefined), 'undefined');
    _assert2.default.equal(types.type(), 'undefined');
  });

  it('should return the type of a boolean', function () {

    _assert2.default.equal(types.type(false), 'boolean');
    _assert2.default.equal(types.type(true), 'boolean');
  });

  it('should return the type of a number', function () {
    _assert2.default.equal(types.type(2.3), 'number');
    _assert2.default.equal(types.type(Number(2.3)), 'number');
    _assert2.default.equal(types.type(new Number(2.3)), 'number');
    _assert2.default.equal(types.type(NaN), 'number');
  });

  it('should return the type of a string', function () {
    _assert2.default.equal(types.type('bla'), 'string');
    _assert2.default.equal(types.type(new String('bla')), 'string');
  });

  it('should return the type of an object', function () {
    _assert2.default.equal(types.type({}), 'Object');
    _assert2.default.equal(types.type(new Object()), 'Object');
  });

  it('should return the type of an array', function () {
    _assert2.default.equal(types.type([]), 'Array');
    _assert2.default.equal(types.type(new Array()), 'Array');
  });

  it('should return the type of a function', function () {
    _assert2.default.equal(types.type(function () {}), 'Function');
  });

  it('should return the type of a date', function () {
    _assert2.default.equal(types.type(new Date()), 'Date');
  });

  it('should return the type of a regexp', function () {
    _assert2.default.equal(types.type(/regexp/), 'RegExp');
  });
});
