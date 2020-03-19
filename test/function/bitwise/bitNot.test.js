"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test bitNot
var bignumber = _index.indexjs.bignumber,
    bitNot = _index.indexjs.bitNot;

describe('bitNot', function () {
  it('should return bitwise not of a boolean', function () {
    _assert2.default.equal(bitNot(true), -2);
    _assert2.default.equal(bitNot(false), -1);
  });

  it('should return bitwise not of null', function () {
    _assert2.default.equal(bitNot(null), -1);
  });

  it('should perform bitwise not of a number', function () {
    _assert2.default.deepEqual(bitNot(2), -3);
    _assert2.default.deepEqual(bitNot(-2), 1);
    _assert2.default.deepEqual(bitNot(0), -1);
  });

  it('should perform bitwise not of a bignumber', function () {
    _assert2.default.deepEqual(bitNot(bignumber(2)), bignumber(-3));
    _assert2.default.deepEqual(bitNot(bignumber(-2)), bignumber(1));
    _assert2.default.deepEqual(bitNot(bignumber('1.2345e30')), bignumber('-1234500000000000000000000000001'));
  });

  it('should throw an error if the parameters are not integers', function () {
    _assert2.default.throws(function () {
      bitNot(1.1);
    }, /Integer expected in function bitNot/);
    _assert2.default.throws(function () {
      bitNot(bignumber(1.1));
    }, /Integer expected in function bitNot/);
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      bitNot(_index.indexjs.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should perform element-wise bitwise not on a matrix', function () {
    a2 = _index.indexjs.matrix([[1, 2], [3, 4]]);
    var a7 = bitNot(a2);
    _assert2.default.ok(a7 instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(a7.size(), [2, 2]);
    _assert2.default.deepEqual(a7.valueOf(), [[-2, -3], [-4, -5]]);
  });

  it('should perform element-wise bitwise not on an array', function () {
    _assert2.default.deepEqual(bitNot([[1, 2], [3, 4]]), [[-2, -3], [-4, -5]]);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      bitNot();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      bitNot(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of argument', function () {
    _assert2.default.throws(function () {
      bitNot(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitNot(undefined);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX bitNot', function () {
    var expression = _index.indexjs.parse('bitNot(4)');
    _assert2.default.equal(expression.toTex(), '~\\left(4\\right)');
  });
});
