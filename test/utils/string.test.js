"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _decimal = require("decimal.js");

var _decimal2 = _interopRequireDefault(_decimal);

var _index = require("../../index");

var _string = require("../../lib/utils/string");

var libutilsstring_stringjsjs = _interopRequireWildcard(_string);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('string', function () {

  it('isString', function () {
    _assert2.default.equal(string.isString('hi'), true);
    _assert2.default.equal(string.isString(String('hi')), true);

    _assert2.default.equal(string.isString(23), false);
    _assert2.default.equal(string.isString(true), false);
    _assert2.default.equal(string.isString(new Date()), false);

    // we don't support non primitive Strings anymore
    _assert2.default.equal(string.isString(new String('hi')), false);
  });

  it('endsWith', function () {
    _assert2.default.equal(string.endsWith('hello', 'hello'), true);
    _assert2.default.equal(string.endsWith('hello', 'lo'), true);
    _assert2.default.equal(string.endsWith('hello', ''), true);

    _assert2.default.equal(string.endsWith('hello!', 'lo'), false);
    _assert2.default.equal(string.endsWith('hello', 'LO'), false);
    _assert2.default.equal(string.endsWith('hello', 'hellohello'), false);
  });

  describe('format', function () {

    it('should format null', function () {
      _assert2.default.equal(string.format(null), 'null');
    });

    it('should format undefined', function () {
      _assert2.default.equal(string.format(undefined), 'undefined');
    });

    it('should format a number', function () {
      _assert2.default.equal(string.format(2.3), '2.3');
    });

    it('should format a bignumber', function () {
      var B = _decimal2.default.config({
        precision: 20
      });
      _assert2.default.equal(string.format(new B(1).div(3)), '0.33333333333333333333');
    });

    it('should format a fraction without options', function () {
      _assert2.default.equal(string.format(_index.indexjs.fraction(1, 3)), '1/3');
      _assert2.default.equal(string.format(_index.indexjs.fraction(2, 6)), '1/3');
      _assert2.default.equal(string.format(_index.indexjs.fraction(-0.125)), '-1/8');
    });

    it('should format a fraction with option fraction=\'ratio\'', function () {
      _assert2.default.equal(string.format(_index.indexjs.fraction(1, 3), { fraction: 'ratio' }), '1/3');
      _assert2.default.equal(string.format(_index.indexjs.fraction(2, 6), { fraction: 'ratio' }), '1/3');
    });

    it('should format a fraction with option fraction=\'decimal\'', function () {
      _assert2.default.equal(string.format(_index.indexjs.fraction(1, 3), { fraction: 'decimal' }), '0.(3)');
      _assert2.default.equal(string.format(_index.indexjs.fraction(2, 6), { fraction: 'decimal' }), '0.(3)');
    });

    it('should format a number with configuration', function () {
      _assert2.default.equal(string.format(1.23456, 3), '1.23');
      _assert2.default.equal(string.format(1.23456, { precision: 3 }), '1.23');
    });

    it('should format an array', function () {
      _assert2.default.equal(string.format([1, 2, 3]), '[1, 2, 3]');
      _assert2.default.equal(string.format([[1, 2], [3, 4]]), '[[1, 2], [3, 4]]');
    });

    it('should format a string', function () {
      _assert2.default.equal(string.format('string'), '"string"');
    });

    it('should format an object', function () {
      var obj = {
        a: 1.1111,
        b: _index.indexjs.complex(2.2222, 3)
      };

      _assert2.default.equal(string.format(obj), '{"a": 1.1111, "b": 2.2222 + 3i}');
      _assert2.default.equal(string.format(obj, 3), '{"a": 1.11, "b": 2.22 + 3i}');
    });

    it('should format an object with its own format function', function () {
      var obj = {
        format: function format(options) {
          var str = 'obj';
          if (options !== undefined) {
            str += ' ' + JSON.stringify(options);
          }
          return str;
        }
      };

      _assert2.default.equal(string.format(obj), 'obj');
      _assert2.default.equal(string.format(obj, 4), 'obj 4');
      _assert2.default.equal(string.format(obj, { precision: 4 }), 'obj {"precision":4}');
    });

    it('should format a function', function () {
      _assert2.default.equal(string.format(function (a, b) {
        return a + b;
      }), 'function');
      var f = function f(a, b) {
        return a + b;
      };
      f.syntax = 'f(x, y)';
      _assert2.default.equal(string.format(f), 'f(x, y)');
    });

    it('should format unknown objects by converting them to string', function () {
      _assert2.default.equal(string.format({}), '{}');
    });

    it('should format unknown primitives by converting them to string', function () {
      _assert2.default.equal(string.format(true), 'true');
    });
  });
});
