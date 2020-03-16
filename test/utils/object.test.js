"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _object = require("../../lib/utils/object");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test object utils
var approx = require('../../tools/approx');

describe('object', function () {

  describe('clone', function () {

    it('should clone undefined', function () {
      _assert2.default.strictEqual(object.clone(undefined), undefined);
    });

    it('should clone null', function () {
      _assert2.default.strictEqual(object.clone(null), null);
    });

    it('should clone booleans', function () {
      _assert2.default.strictEqual(object.clone(true), true);
      _assert2.default.strictEqual(object.clone(false), false);
      _assert2.default.ok(object.clone(new Boolean(true)) instanceof Boolean);
      _assert2.default.equal(object.clone(new Boolean(true)), true);
      _assert2.default.equal(object.clone(new Boolean(false)), false);
    });

    it('should clone numbers', function () {
      _assert2.default.strictEqual(object.clone(2.3), 2.3);
      _assert2.default.ok(object.clone(new Number(2.3)) instanceof Number);
      _assert2.default.equal(object.clone(new Number(2.3)), 2.3);
    });

    it('should clone strings', function () {
      _assert2.default.strictEqual(object.clone('hello'), 'hello');
      _assert2.default.ok(object.clone(new String('hello')) instanceof String);
      _assert2.default.equal(object.clone(new String('hello')), 'hello');
    });

    it('should (deep) clone objects', function () {
      var obj = { a: { b: 'c', d: new Date(2014, 0, 1) } };
      var clone = object.clone(obj);

      _assert2.default.deepEqual(obj, clone);

      // check whether the clone remains unchanged when changing the original object
      obj.a.b = 'cc';

      _assert2.default.equal(clone.a.b, 'c');

      obj.a.d.setMonth(2);
      _assert2.default.equal(clone.a.d.valueOf(), new Date(2014, 0, 1).valueOf());
    });

    it('should clone dates', function () {
      var d1 = new Date(2014, 1, 1);
      var d2 = object.clone(d1);
      _assert2.default.equal(d1.valueOf(), d2.valueOf());
      d1.setMonth(2);
      _assert2.default.notEqual(d1, d2);
    });

    it('should (deep) clone arrays', function () {
      var d = new Date(2014, 0, 1);
      var arr = [1, 2, d, { a: 3 }];
      var clone = object.clone(arr);

      _assert2.default.deepEqual(arr, clone);
      _assert2.default.notStrictEqual(arr, clone);
      _assert2.default.notStrictEqual(arr[2], clone[2]);
      _assert2.default.notStrictEqual(arr[3], clone[3]);

      // check whether the clone remains unchanged when changing the original object
      arr[2] = null;
      arr[3].a = 1;
      d.setMonth(2);
      _assert2.default.equal(clone[2].valueOf(), new Date(2014, 0, 1).valueOf());
      _assert2.default.equal(clone[3].a, 3);
    });

    it('should throw an error in case of an unsupported type', function () {
      _assert2.default.throws(function () {
        object.clone(/a regexp/);
      }, /Cannot clone/);
    });
  });

  describe('extend', function () {
    it('should extend an object with all properties of an other object', function () {
      var e = {};
      var o1 = { a: 2, b: 3 };
      var o2 = { a: 4, b: null, c: undefined, d: 5, e: e };
      var o3 = object.extend(o1, o2);

      _assert2.default.strictEqual(o1, o3);
      _assert2.default.strictEqual(o1.e, o3.e);
      _assert2.default.deepEqual(o3, { a: 4, b: null, c: undefined, d: 5, e: e });
      _assert2.default.deepEqual(o2, { a: 4, b: null, c: undefined, d: 5, e: e }); // should be unchanged
    });

    it('should ignore inherited properties when extending an object', function () {
      Object.prototype.foo = 'bar';
      var o1 = { a: 2, b: 3 };
      var o2 = object.extend({}, o1);

      _assert2.default.equal(o2['foo'], 'bar');
      _assert2.default.equal(o2.hasOwnProperty('foo'), false);

      delete Object.prototype.foo;
    });
  });

  describe('deepExtend', function () {
    it('should deep extend an object with all properties of an other object', function () {
      var e = { f: { g: 3 } };
      var o1 = { a: 2, b: 3 };
      var o2 = { a: 4, b: null, c: undefined, d: 5, e: e };
      var o3 = object.deepExtend(o1, o2);

      _assert2.default.strictEqual(o1, o3);
      _assert2.default.notStrictEqual(o3.e, o2.e);
      _assert2.default.deepEqual(o3, { a: 4, b: null, c: undefined, d: 5, e: { f: { g: 3 } } });
      _assert2.default.deepEqual(o2, { a: 4, b: null, c: undefined, d: 5, e: { f: { g: 3 } } }); // should be unchanged

      e.f.g = 4;
      _assert2.default.deepEqual(o3, { a: 4, b: null, c: undefined, d: 5, e: { f: { g: 3 } } }); // should be unchanged
      _assert2.default.deepEqual(o2, { a: 4, b: null, c: undefined, d: 5, e: { f: { g: 4 } } }); // should be changed
    });

    it('should throw an error when deep extending an array (is not yet supported)', function () {
      _assert2.default.throws(function () {
        object.deepExtend({}, []);
      }, /Arrays are not supported by deepExtend/);
      _assert2.default.throws(function () {
        object.deepExtend({}, { a: [] });
      }, /Arrays are not supported by deepExtend/);
      _assert2.default.throws(function () {
        object.deepExtend({}, { a: { b: [] } });
      }, /Arrays are not supported by deepExtend/);
    });

    it('should ignore inherited properties when deep extending an object', function () {
      Object.prototype.foo = 'bar';
      var o1 = { a: 2, b: 3 };
      var o2 = object.deepExtend({}, o1);

      _assert2.default.equal(o2['foo'], 'bar');
      _assert2.default.equal(o2.hasOwnProperty('foo'), false);

      delete Object.prototype.foo;
    });
  });

  describe('deepEqual', function () {

    it('should deep compare two objects', function () {
      _assert2.default.equal(object.deepEqual({}, {}), true);

      _assert2.default.equal(object.deepEqual({ a: 2, b: 3 }, { a: 2, b: 3 }), true);
      _assert2.default.equal(object.deepEqual({ a: 2, b: 3 }, { a: 2, b: 4 }), false);
      _assert2.default.equal(object.deepEqual({ a: 2, b: 3 }, { a: 2 }), false);
      _assert2.default.equal(object.deepEqual({ a: 2 }, { a: 2, b: 3 }), false);
      _assert2.default.equal(object.deepEqual({ a: 2, b: 3 }, { a: 2, b: {} }), false);
      _assert2.default.equal(object.deepEqual({ a: 2, b: {} }, { a: 2, b: {} }), true);

      _assert2.default.equal(object.deepEqual({ a: 2, b: { c: 4 } }, { a: 2, b: { c: 4 } }), true);
      _assert2.default.equal(object.deepEqual({ a: 2, b: { c: 4 } }, { a: 2, b: { c: 5 } }), false);
      _assert2.default.equal(object.deepEqual({ a: 2, b: { c: 4 } }, { a: 2, b: {} }), false);
      _assert2.default.equal(object.deepEqual({ a: 2, b: {} }, { a: 2, b: { c: 4 } }), false);
    });

    it('should deep compare two arrays', function () {
      _assert2.default.equal(object.deepEqual([], []), true);
      _assert2.default.equal(object.deepEqual([1, 2], [1, 2]), true);
      _assert2.default.equal(object.deepEqual([1, 2], [1, 2, 3]), false);
      _assert2.default.equal(object.deepEqual([1, 0, 3], [1, 2, 3]), false);

      _assert2.default.equal(object.deepEqual([1, 2, [3, 4]], [1, 2, [3, 4]]), true);
      _assert2.default.equal(object.deepEqual([1, 2, [3]], [1, 2, [3, 4]]), false);
      _assert2.default.equal(object.deepEqual([1, 2, [3, 4]], [1, 2, [3]]), false);
      _assert2.default.equal(object.deepEqual([1, 2, null], [1, 2, [3]]), false);
      _assert2.default.equal(object.deepEqual([1, 2, [3]], [1, 2, null]), false);
      _assert2.default.equal(object.deepEqual([1, 2, 3], [1, 2, [3]]), false);
      _assert2.default.equal(object.deepEqual([1, 2, [3]], [1, 2, 3]), false);
    });

    it('should deep compare mixed objects an arrays', function () {
      _assert2.default.equal(object.deepEqual({}, []), false);
      _assert2.default.equal(object.deepEqual({ a: {} }, { a: [] }), false);

      _assert2.default.equal(object.deepEqual({ a: [1, 2, 3] }, { a: [1, 2, 3] }), true);
      _assert2.default.equal(object.deepEqual({ a: [1, 2, {}] }, { a: [1, 2, {}] }), true);
      _assert2.default.equal(object.deepEqual({ a: [1, 2, { b: 4 }] }, { a: [1, 2, { b: 4 }] }), true);
      _assert2.default.equal(object.deepEqual({ a: [1, 2, { b: 4 }] }, { a: [1, 2, { b: 5 }] }), false);
      _assert2.default.equal(object.deepEqual({ a: [1, 2, { b: 4 }] }, { a: [1, 2, {}] }), false);

      _assert2.default.equal(object.deepEqual([1, 2, {}], [1, 2, {}]), true);
      _assert2.default.equal(object.deepEqual([1, 2, { a: 3 }], [1, 2, { a: 3 }]), true);
      _assert2.default.equal(object.deepEqual([1, 2, { a: 3 }], [1, 2, { a: 4 }]), false);
      _assert2.default.equal(object.deepEqual([1, 2, { a: 3 }], [1, 2, 3]), false);
      _assert2.default.equal(object.deepEqual([1, 2, 3], [1, 2, { a: 3 }]), false);
      _assert2.default.equal(object.deepEqual([1, 2, { a: [3, 4] }], [1, 2, { a: [3, 4] }]), true);
      _assert2.default.equal(object.deepEqual([1, 2, { a: [3, 4] }], [1, 2, { a: [3, 4, 5] }]), false);
    });

    it('should not ignore inherited properties during comparison', function () {
      Object.prototype.foo = 'bar';

      _assert2.default.equal(object.deepEqual({}, {}), true);
      _assert2.default.equal(object.deepEqual({ foo: 'bar' }, {}), true);

      delete Object.prototype.foo;
    });
  });

  describe('canDefineProperty', function () {

    it('should test whether defineProperty is available', function () {
      _assert2.default.equal(object.canDefineProperty(), true);
    });
  });

  describe('lazy', function () {

    it('should get a lazy property', function () {
      var obj = {};
      var count = 0;
      object.lazy(obj, 'x', function () {
        count++;
        return 2;
      });

      var x = obj.x;
      _assert2.default.equal(x, 2);
      _assert2.default.equal(count, 1);

      var x2 = obj.x;
      _assert2.default.equal(x2, 2);
      _assert2.default.equal(count, 1);
    });

    it('should set a lazy property', function () {
      var obj = {};
      object.lazy(obj, 'x', function () {
        return 2;
      });

      obj.x = 3;
      var x = obj.x;
      _assert2.default.equal(x, 3);
    });
  });

  describe('traverse', function () {

    it('should traverse an existing path into an object', function () {
      var a = {};
      var b = { a: a };
      var c = { b: b };

      _assert2.default.strictEqual(object.traverse(c), c);
      _assert2.default.strictEqual(object.traverse(c, ''), c);
      _assert2.default.strictEqual(object.traverse(c, 'b'), b);
      _assert2.default.strictEqual(object.traverse(c, 'b.a'), a);
    });

    it('should append missing piece of a path', function () {
      var a = {};
      var b = { a: a };
      var c = { b: b };

      _assert2.default.strictEqual(object.traverse(c), c);
      _assert2.default.strictEqual(object.traverse(c, ''), c);
      _assert2.default.strictEqual(object.traverse(c, 'b'), b);
      _assert2.default.strictEqual(object.traverse(c, 'b.a'), a);
      _assert2.default.strictEqual(object.traverse(c, 'b.d'), b.d);
      _assert2.default.strictEqual(object.traverse(c, 'b.e.f'), b.e.f);
    });
  });

  describe('isFactory', function () {

    it('should test whether an object is a factory', function () {
      _assert2.default.equal(object.isFactory({}), false);
      _assert2.default.equal(object.isFactory({ foo: true }), false);
      _assert2.default.equal(object.isFactory({ name: 'foo' }), false);
      _assert2.default.equal(object.isFactory({ name: 'foo', factory: 'bar' }), false);
      _assert2.default.equal(object.isFactory({ name: 2, factory: function factory() {} }), true);
      _assert2.default.equal(object.isFactory({ factory: function factory() {} }), true);

      _assert2.default.equal(object.isFactory({ name: 'foo', factory: function factory() {} }), true);
      _assert2.default.equal(object.isFactory({ name: 'foo', factory: function factory() {}, foo: 'bar' }), true);
    });
  });
});
