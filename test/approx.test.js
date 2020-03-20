"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('approx', function () {

  it('should test equality of positive values', function () {
    (0, _approx.equal)(1 / 3, 0.33333333);
    (0, _approx.equal)(2, 2.000001);
    (0, _approx.equal)(2, 1.999999);
    _assert2.default.throws(function () {
      (0, _approx.equal)(2, 2.001);
    }, _assert2.default.AssertionError);
    _assert2.default.throws(function () {
      (0, _approx.equal)(2, 1.999);
    }, _assert2.default.AssertionError);
  });

  it('should test equality of negative values', function () {
    (0, _approx.equal)(-2, -2.000001);
    (0, _approx.equal)(-2, -1.999999);
    _assert2.default.throws(function () {
      (0, _approx.equal)(-2, -2.001);
    }, _assert2.default.AssertionError);
    _assert2.default.throws(function () {
      (0, _approx.equal)(-2, -1.999);
    }, _assert2.default.AssertionError);
  });

  it('should test equality of very large values', function () {
    (0, _approx.equal)(2e100, 2.000001e100);
    (0, _approx.equal)(2e100, 1.999999e100);
    _assert2.default.throws(function () {
      (0, _approx.equal)(2e100, 2.001e100);
    }, _assert2.default.AssertionError);
    _assert2.default.throws(function () {
      (0, _approx.equal)(2e100, 1.999e100);
    }, _assert2.default.AssertionError);
  });

  it('should test equality of very small values', function () {
    (0, _approx.equal)(2e-100, 2.000001e-100);
    (0, _approx.equal)(2e-100, 1.999999e-100);
    _assert2.default.throws(function () {
      (0, _approx.equal)(2e-100, 2.001e-100);
    }, _assert2.default.AssertionError);
    _assert2.default.throws(function () {
      (0, _approx.equal)(2e-100, 1.999e-100);
    }, _assert2.default.AssertionError);
  });

  it('should test equality of NaN numbers', function () {
    // NaN values
    var a = NaN;
    var b = NaN;
    (0, _approx.equal)(a, b);
    _assert2.default.throws(function () {
      (0, _approx.equal)(NaN, 3);
    }, _assert2.default.AssertionError);
    _assert2.default.throws(function () {
      (0, _approx.equal)(NaN, 'nonumber');
    }, _assert2.default.AssertionError);
  });

  it('should test equality when one of the values is zero', function () {
    // zero as one of the two values
    (0, _approx.equal)(0, 1e-15);
    (0, _approx.equal)(1e-15, 0);
    _assert2.default.throws(function () {
      (0, _approx.equal)(0, 0.001);
    }, _assert2.default.AssertionError);
  });

  it('should test deep equality of arrays and objects', function () {
    approx.deepEqual({
      a: [1, 2, 3],
      b: [{ c: 4, d: 5 }]
    }, {
      a: [1.000001, 1.99999999, 3.000005],
      b: [{ c: 3.999999981, d: 5.0000023 }]
    });

    _assert2.default.throws(function () {
      approx.deepEqual({
        a: [1, 2, 3],
        b: [{ c: 4, d: 5 }]
      }, {
        a: [1.000001, 1.99999999, 3.000005],
        b: [{ c: 3.1, d: 5.0000023 }]
      });
    }, _assert2.default.AssertionError);

    _assert2.default.throws(function () {
      approx.deepEqual({
        a: [1, 2, 3],
        b: [{ c: 4, d: 5 }]
      }, {
        a: [1.001, 1.99999999, 3.000005],
        b: [{ c: 3, d: 5.0000023 }]
      });
    }, _assert2.default.AssertionError);
  });
});
