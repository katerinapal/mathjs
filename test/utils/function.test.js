"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _function = require("../../lib/utils/function");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('util.function', function () {

  describe('memoize', function () {

    it('should memoize a function with one argument', function () {
      var f = function f(x) {
        return x * x;
      };

      var m = (0, _function.memoize)(f);

      _assert2.default.strictEqual(m(2), 4);
      _assert2.default.strictEqual(m(3), 9);
    });

    it('should memoize a function with two arguments', function () {
      var f = function f(x, y) {
        return x * y;
      };

      var m = (0, _function.memoize)(f);

      _assert2.default.strictEqual(m(2, 3), 6);

      // hash should differ
      _assert2.default.strictEqual(m(1, 23), 23);
      _assert2.default.strictEqual(m(12, 3), 36);
    });

    it('should memoize a function with objects as arguments', function () {
      var f = function f(obj) {
        return obj.x * obj.y;
      };

      var m = (0, _function.memoize)(f);

      _assert2.default.strictEqual(m({ x: 2, y: 3 }), 6);
      _assert2.default.deepEqual(Object.keys(m.cache), ['[{"x":2,"y":3}]']);
      _assert2.default.strictEqual(m.cache['[{"x":2,"y":3}]'], 6);
    });

    it('should memoize a function with a custom hashIt function', function () {
      var f = function f(obj) {
        return obj.id;
      };
      var hashIt = function hashIt(args) {
        return 'id:' + args[0].id;
      };

      var m = (0, _function.memoize)(f, hashIt);

      _assert2.default.strictEqual(m({ id: 2 }), 2);
      _assert2.default.deepEqual(Object.keys(m.cache), ['id:2']);
      _assert2.default.strictEqual(m.cache['id:2'], 2);
    });

    it('should really return the cached result', function () {
      var a = 2;
      var f = function f(x) {
        return a;
      }; // trick: no pure function

      var m = (0, _function.memoize)(f);

      _assert2.default.strictEqual(m(4), 2);
      a = 3;
      _assert2.default.strictEqual(m(4), 2);
    });
  });

  describe('maxArgumentCount', function () {

    it('should calculate the max argument count of a typed function', function () {
      var a = function a() {};
      a.signatures = {
        'number, number': function numberNumber() {},
        'number': function number() {}
      };
      _assert2.default.equal((0, _function.memoize)(a), 2);

      var b = function b() {};
      b.signatures = {
        'number': function number() {},
        'number, number': function numberNumber() {}
      };
      _assert2.default.equal((0, _function.memoize)(b), 2);

      var c = function c() {};
      c.signatures = {
        'number': function number() {},
        'BigNumber': function BigNumber() {}
      };
      _assert2.default.equal((0, _function.memoize)(c), 1);

      var d = function d() {};
      d.signatures = {
        'number,number': function numberNumber() {},
        'number': function number() {},
        'number,any,number': function numberAnyNumber() {}
      };
      _assert2.default.equal((0, _function.memoize)(d), 3);
    });

    it('should return -1 for regular functions', function () {
      _assert2.default.equal((0, _function.memoize)(function () {}), -1);
    });
  });
});
