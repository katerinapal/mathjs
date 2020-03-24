"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {};

describe('clone', function () {

  it('should clone a boolean', function () {
    _assert2.default.strictEqual(_index.indexjs.clone(true), true);
    _assert2.default.strictEqual(_index.indexjs.clone(false), false);
  });

  it('should clone null', function () {
    _assert2.default.strictEqual(_index.indexjs.clone(null), null);
  });

  it('should clone a number', function () {
    var a = 1;
    var b = _index.indexjs.clone(a);
    a = 2;
    _assert2.default.strictEqual(b, 1);
  });

  it('should throw an error on wrong number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.clone();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.clone(2, 4);
    }, /TypeError: Too many arguments/);
  });

  it('should clone a bignumber', function () {
    var a = _index.indexjs.bignumber('2.3e500');
    var b = _index.indexjs.clone(a);
    _assert2.default.deepEqual(a, b);
  });

  it('should clone a string', function () {
    var a = 'hello world';
    var b = _index.indexjs.clone(a);
    a = 'bye!';
    _assert2.default.strictEqual(a, 'bye!');
    _assert2.default.strictEqual(b, 'hello world');
  });

  it('should clone a complex number', function () {
    var a = _index.indexjs.complex(2, 3);
    var b = _index.indexjs.clone(a);
    _assert2.default.notEqual(a, b);
    a.re = 5;
    _assert2.default.strictEqual(a.toString(), '5 + 3i');
    _assert2.default.strictEqual(b.toString(), '2 + 3i');
  });

  it('should clone a unit', function () {
    var a = _index.indexjs.unit('5mm');
    var b = _index.indexjs.clone(a);
    a.value = 10;
    _assert2.default.equal(a.toString(), '10 m');
    _assert2.default.equal(b.toString(), '5 mm');
  });

  it('should clone a fraction', function () {
    var a = _index.indexjs.fraction(2, 3);
    var b = _index.indexjs.clone(a);
    _assert2.default.deepEqual(a, b);
  });

  it('should clone an array', function () {
    var a = [1, 2, [3, 4]];
    var b = _index.indexjs.clone(a);
    a[2][1] = 5;
    _assert2.default.equal(b[2][1], 4);
  });

  it('should clone a matrix', function () {
    var a = _index.indexjs.matrix([[1, 2], [3, 4]]);
    var b = _index.indexjs.clone(a);
    a.valueOf()[0][0] = 5;
    _assert2.default.equal(b.valueOf()[0][0], 1);

    a = _index.indexjs.matrix([1, 2, new _index.indexjs.complex(2, 3), 4]);
    b = _index.indexjs.clone(a);
    a.valueOf()[2].re = 5;
    _assert2.default.equal(b.valueOf()[2].re, 2);
  });

  it('should LaTeX clone', function () {
    var expression = _index.indexjs.parse('clone(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{clone}\\left(1\\right)');
  });
});
