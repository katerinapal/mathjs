"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _decimal = require("decimal.js");

var _decimal2 = _interopRequireDefault(_decimal);

var _string = require("../../lib/utils/string");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../tools/approx');
var math = require('../../index');

describe('string', function () {

  it('isString', function () {
    _assert2.default.equal((0, _string.isString)('hi'), true);
    _assert2.default.equal((0, _string.isString)(String('hi')), true);

    _assert2.default.equal((0, _string.isString)(23), false);
    _assert2.default.equal((0, _string.isString)(true), false);
    _assert2.default.equal((0, _string.isString)(new Date()), false);

    // we don't support non primitive Strings anymore
    _assert2.default.equal((0, _string.isString)(new String('hi')), false);
  });

  it('endsWith', function () {
    _assert2.default.equal((0, _string.isString)('hello', 'hello'), true);
    _assert2.default.equal((0, _string.isString)('hello', 'lo'), true);
    _assert2.default.equal((0, _string.isString)('hello', ''), true);

    _assert2.default.equal((0, _string.isString)('hello!', 'lo'), false);
    _assert2.default.equal((0, _string.isString)('hello', 'LO'), false);
    _assert2.default.equal((0, _string.isString)('hello', 'hellohello'), false);
  });

  describe('format', function () {

    it('should format null', function () {
      _assert2.default.equal((0, _string.isString)(null), 'null');
    });

    it('should format undefined', function () {
      _assert2.default.equal((0, _string.isString)(undefined), 'undefined');
    });

    it('should format a number', function () {
      _assert2.default.equal((0, _string.isString)(2.3), '2.3');
    });

    it('should format a bignumber', function () {
      var B = _decimal2.default.config({
        precision: 20
      });
      _assert2.default.equal((0, _string.isString)(new B(1).div(3)), '0.33333333333333333333');
    });

    it('should format a fraction without options', function () {
      _assert2.default.equal((0, _string.isString)(math.fraction(1, 3)), '1/3');
      _assert2.default.equal((0, _string.isString)(math.fraction(2, 6)), '1/3');
      _assert2.default.equal((0, _string.isString)(math.fraction(-0.125)), '-1/8');
    });

    it('should format a fraction with option fraction=\'ratio\'', function () {
      _assert2.default.equal((0, _string.isString)(math.fraction(1, 3), { fraction: 'ratio' }), '1/3');
      _assert2.default.equal((0, _string.isString)(math.fraction(2, 6), { fraction: 'ratio' }), '1/3');
    });

    it('should format a fraction with option fraction=\'decimal\'', function () {
      _assert2.default.equal((0, _string.isString)(math.fraction(1, 3), { fraction: 'decimal' }), '0.(3)');
      _assert2.default.equal((0, _string.isString)(math.fraction(2, 6), { fraction: 'decimal' }), '0.(3)');
    });

    it('should format a number with configuration', function () {
      _assert2.default.equal((0, _string.isString)(1.23456, 3), '1.23');
      _assert2.default.equal((0, _string.isString)(1.23456, { precision: 3 }), '1.23');
    });

    it('should format an array', function () {
      _assert2.default.equal((0, _string.isString)([1, 2, 3]), '[1, 2, 3]');
      _assert2.default.equal((0, _string.isString)([[1, 2], [3, 4]]), '[[1, 2], [3, 4]]');
    });

    it('should format a string', function () {
      _assert2.default.equal((0, _string.isString)('string'), '"string"');
    });

    it('should format an object', function () {
      var obj = {
        a: 1.1111,
        b: math.complex(2.2222, 3)
      };

      _assert2.default.equal((0, _string.isString)(obj), '{"a": 1.1111, "b": 2.2222 + 3i}');
      _assert2.default.equal((0, _string.isString)(obj, 3), '{"a": 1.11, "b": 2.22 + 3i}');
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

      _assert2.default.equal((0, _string.isString)(obj), 'obj');
      _assert2.default.equal((0, _string.isString)(obj, 4), 'obj 4');
      _assert2.default.equal((0, _string.isString)(obj, { precision: 4 }), 'obj {"precision":4}');
    });

    it('should format a function', function () {
      _assert2.default.equal((0, _string.isString)(function (a, b) {
        return a + b;
      }), 'function');
      var f = function f(a, b) {
        return a + b;
      };
      f.syntax = 'f(x, y)';
      _assert2.default.equal((0, _string.isString)(f), 'f(x, y)');
    });

    it('should format unknown objects by converting them to string', function () {
      _assert2.default.equal((0, _string.isString)({}), '{}');
    });

    it('should format unknown primitives by converting them to string', function () {
      _assert2.default.equal((0, _string.isString)(true), 'true');
    });
  });
});
