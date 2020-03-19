"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('abs', function () {
  it('should return the abs value of a boolean', function () {
    _assert2.default.strictEqual(_index.indexjs.abs(true), 1);
    _assert2.default.strictEqual(_index.indexjs.abs(false), 0);
  });

  it('should return the abs value of null', function () {
    _assert2.default.strictEqual(_index.indexjs.abs(null), 0);
  });

  it('should return the abs value of a number', function () {
    _assert2.default.strictEqual(_index.indexjs.abs(-4.2), 4.2);
    _assert2.default.strictEqual(_index.indexjs.abs(-3.5), 3.5);
    _assert2.default.strictEqual(_index.indexjs.abs(100), 100);
    _assert2.default.strictEqual(_index.indexjs.abs(0), 0);
  });

  it('should return the absolute value of a big number', function () {
    _assert2.default.deepEqual(_index.indexjs.abs(_index.indexjs.bignumber(-2.3)), _index.indexjs.bignumber(2.3));
    _assert2.default.deepEqual(_index.indexjs.abs(_index.indexjs.bignumber('5e500')), _index.indexjs.bignumber('5e500'));
    _assert2.default.deepEqual(_index.indexjs.abs(_index.indexjs.bignumber('-5e500')), _index.indexjs.bignumber('5e500'));
  });

  it('should return the absolute value of a complex number', function () {
    _assert2.default.equal(_index.indexjs.abs(_index.indexjs.complex(3, -4)), 5);
    _assert2.default.equal(_index.indexjs.abs(_index.indexjs.complex(1e200, -4e200)), 4.12310562561766e+200);
  });

  it('should return the absolute value of a fraction', function () {
    var a = _index.indexjs.fraction('-1/3');
    _assert2.default.equal(_index.indexjs.abs(a).toString(), '0.(3)');
    _assert2.default.equal(a.toString(), '-0.(3)');
    _assert2.default.equal(_index.indexjs.abs(_index.indexjs.fraction('1/3')).toString(), '0.(3)');
  });

  it('should convert a string to a number', function () {
    _assert2.default.strictEqual(_index.indexjs.abs('-2'), 2);
  });

  it('should return the absolute value of all elements in an Array', function () {
    var a1 = _index.indexjs.abs([1, -2, 3]);
    _assert2.default.ok(Array.isArray(a1));
    _assert2.default.deepEqual(a1, [1, 2, 3]);
    a1 = _index.indexjs.abs([-2, -1, 0, 1, 2]);
    _assert2.default.ok(Array.isArray(a1));
    _assert2.default.deepEqual(a1, [2, 1, 0, 1, 2]);
  });

  it('should return the absolute number of a complex number with zero', function () {
    _assert2.default.equal(_index.indexjs.abs(_index.indexjs.complex(1, 0)), 1);
    _assert2.default.equal(_index.indexjs.abs(_index.indexjs.complex(0, 1)), 1);
    _assert2.default.equal(_index.indexjs.abs(_index.indexjs.complex(0, 0)), 0);
    _assert2.default.equal(_index.indexjs.abs(_index.indexjs.complex(-1, 0)), 1);
    _assert2.default.equal(_index.indexjs.abs(_index.indexjs.complex(0, -1)), 1);
  });

  it('should return the absolute value of all elements in a matrix', function () {
    var a1 = _index.indexjs.abs(_index.indexjs.matrix([1, -2, 3]));
    _assert2.default.ok(a1 instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(a1.size(), [3]);
    _assert2.default.deepEqual(a1.valueOf(), [1, 2, 3]);
    a1 = _index.indexjs.abs(_index.indexjs.matrix([-2, -1, 0, 1, 2]));
    _assert2.default.ok(a1 instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(a1.size(), [5]);
    _assert2.default.deepEqual(a1.valueOf(), [2, 1, 0, 1, 2]);
  });

  it('should return the absolute value of a unit', function () {
    var u = _index.indexjs.abs(_index.indexjs.unit('5 m'));
    _assert2.default.equal(u.toString(), '5 m');

    u = _index.indexjs.abs(_index.indexjs.unit('-5 m'));
    _assert2.default.equal(u.toString(), '5 m');

    u = _index.indexjs.abs(_index.indexjs.unit('-283.15 degC'));
    _assert2.default.equal(u.toString(), '-263.15 degC');

    u = _index.indexjs.abs(_index.indexjs.unit(_index.indexjs.fraction(2, 3), 'm'));
    _assert2.default.equal(u.toString(), '2/3 m');

    u = _index.indexjs.abs(_index.indexjs.unit(_index.indexjs.complex(-4, 3), 'in'));
    _assert2.default.equal(u.toString(), '5 in');
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.abs();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.abs(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of unsupported types', function () {
    _assert2.default.throws(function () {
      _index.indexjs.abs(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      _index.indexjs.abs(undefined);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX abs', function () {
    var expression = _index.indexjs.parse('abs(-1)');
    _assert2.default.equal(expression.toTex(), '\\left|-1\\right|');
  });
});
