"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var hypot = math.hypot;
var bignumber = math.bignumber;
var fraction = math.fraction;

describe('hypot', function () {
  it('should return the hypot of numbers', function () {
    _assert2.default.strictEqual(hypot(3, 4), 5);
    _assert2.default.strictEqual(hypot(3, -4), 5);
    (0, _approx.equal)(hypot(3, 4, 5), 7.0710678118654755);
    _assert2.default.strictEqual(hypot(-2), 2);
    _assert2.default.strictEqual(hypot(0), 0);
    _assert2.default.strictEqual(hypot(Infinity), Infinity);
  });

  it('should return the hypot of BigNumbers', function () {
    _assert2.default.deepEqual(hypot(bignumber(3), bignumber(4)), bignumber(5));
    _assert2.default.deepEqual(hypot(bignumber(3), bignumber(-4)), bignumber(5));
    _assert2.default.deepEqual(hypot(bignumber(3), bignumber(4), bignumber(5)), bignumber('7.07106781186547524400844362104849039284835937688474036588339869'));
    _assert2.default.deepEqual(hypot(bignumber(-2)), bignumber(2));
  });

  it('should return the hypot of an Array with numbers', function () {
    _assert2.default.strictEqual(hypot([3, 4]), 5);
  });

  it('should return the hypot of an Matrix with numbers', function () {
    _assert2.default.strictEqual(hypot(math.matrix([3, 4])), 5);
  });

  it('should return the hypot of an Array with mixed numbers and BigNumbers', function () {
    _assert2.default.deepEqual(hypot([3, bignumber(4)]), bignumber(5));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      hypot();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      hypot([], 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of unsupported types', function () {
    _assert2.default.throws(function () {
      hypot(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      hypot([new Date()]);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      hypot([2, 3, math.complex()]);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      hypot(undefined);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX hypot', function () {
    var expression = math.parse('hypot(3,4)');
    _assert2.default.equal(expression.toTex(), '\\hypot\\left(3,4\\right)');
  });
});
