"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _NumberFormatter = require("../../lib/utils/NumberFormatter");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('NumberFormatter', function () {

  it('should create a new NumberFormatter', function () {
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(0), { sign: '', coefficients: [0], exponent: 0 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(2.3), { sign: '', coefficients: [2, 3], exponent: 0 });

    var a = new _NumberFormatter.NumberFormatter(2.3);
    _assert2.default.strictEqual(a.coefficients[0], 2);
    _assert2.default.strictEqual(a.coefficients[1], 3);
    _assert2.default.strictEqual(a.exponent, 0);

    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(-2.3), { sign: '-', coefficients: [2, 3], exponent: 0 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('02.3'), { sign: '', coefficients: [2, 3], exponent: 0 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(2300), { sign: '', coefficients: [2, 3], exponent: 3 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(0.00023), { sign: '', coefficients: [2, 3], exponent: -4 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('0.00023'), { sign: '', coefficients: [2, 3], exponent: -4 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('000.0002300'), { sign: '', coefficients: [2, 3], exponent: -4 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('002300'), { sign: '', coefficients: [2, 3], exponent: 3 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('2.3e3'), { sign: '', coefficients: [2, 3], exponent: 3 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('2.3e+3'), { sign: '', coefficients: [2, 3], exponent: 3 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('-2.3e3'), { sign: '-', coefficients: [2, 3], exponent: 3 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('23e3'), { sign: '', coefficients: [2, 3], exponent: 4 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('-23e3'), { sign: '-', coefficients: [2, 3], exponent: 4 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('2.3e-3'), { sign: '', coefficients: [2, 3], exponent: -3 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('23e-3'), { sign: '', coefficients: [2, 3], exponent: -2 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('-23e-3'), { sign: '-', coefficients: [2, 3], exponent: -2 });
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter('99.99'), { sign: '', coefficients: [9, 9, 9, 9], exponent: 1 });
  });

  it('should clone a NumberFormatter', function () {
    var a = new _NumberFormatter.NumberFormatter(2.3);
    var clone = a.clone();
    _assert2.default.deepEqual(clone, a);
    _assert2.default.notStrictEqual(clone, a);
  });

  it('should round a NumberFormatter', function () {
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(123456).roundDigits(3), new _NumberFormatter.NumberFormatter(123000));
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(123456).roundDigits(4), new _NumberFormatter.NumberFormatter(123500));
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(0.00555).roundDigits(2), new _NumberFormatter.NumberFormatter(0.0056));
    _assert2.default.deepEqual(new _NumberFormatter.NumberFormatter(99.99).roundDigits(2), new _NumberFormatter.NumberFormatter(100));
  });

  it('should format a number with toFixed', function () {
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0).toFixed(), '0');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(2300).toFixed(), '2300');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-2300).toFixed(), '-2300');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(19.9).toFixed(), '20');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(99.9).toFixed(), '100');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(99.5).toFixed(), '100');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(99.4).toFixed(), '99');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(2.3).toFixed(), '2');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(2.5).toFixed(), '3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(2.9).toFixed(), '3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1.5).toFixed(), '2');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-1.5).toFixed(), '-2');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(123.45).toFixed(), '123');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.005).toFixed(), '0');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.7).toFixed(), '1');

    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.15).toFixed(1), '0.2');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(123.4567).toFixed(1), '123.5');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-123.4567).toFixed(1), '-123.5');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.23).toFixed(1), '0.2');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.005).toFixed(5), '0.00500');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.00567).toFixed(4), '0.0057');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.00999).toFixed(2), '0.01');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.00999).toFixed(3), '0.010');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-0.00999).toFixed(3), '-0.010');
  });

  it('should format a number with toExponential', function () {
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0).toExponential(), '0e+0');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.15).toExponential(), '1.5e-1');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1).toExponential(), '1e+0');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-1).toExponential(), '-1e+0');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1000).toExponential(), '1e+3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(2300).toExponential(), '2.3e+3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-2300).toExponential(), '-2.3e+3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(3.568).toExponential(), '3.568e+0');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.00123).toExponential(), '1.23e-3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-0.00123).toExponential(), '-1.23e-3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter('20.3e2').toExponential(), '2.03e+3');

    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0).toExponential(2), '0.0e+0');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.15).toExponential(1), '2e-1');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1234).toExponential(2), '1.2e+3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-1234).toExponential(2), '-1.2e+3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1234).toExponential(6), '1.23400e+3');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(9999).toExponential(2), '1.0e+4');
  });

  it('should format a number with toPrecision', function () {
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0).toPrecision(), '0');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.15).toPrecision(), '0.15');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(2300).toPrecision(), '2300');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-2300).toPrecision(), '-2300');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.00123).toPrecision(), '0.00123');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-0.00123).toPrecision(), '-0.00123');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1.2e-8).toPrecision(), '1.2e-8');

    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(2300).toPrecision(6), '2300.00');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1234.5678).toPrecision(6), '1234.57');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1234.5678).toPrecision(2), '1200');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(1234).toPrecision(2), '1200');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.15).toPrecision(1), '0.2');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.004).toPrecision(3), '0.00400');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.00123456).toPrecision(5), '0.0012346');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(999).toPrecision(2), '1000');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(99900).toPrecision(2), '100000');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(99999).toPrecision(2), '100000');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(999e7).toPrecision(2), '1.0e+10');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(0.00999).toPrecision(2), '0.010');
    _assert2.default.strictEqual(new _NumberFormatter.NumberFormatter(-0.00999).toPrecision(2), '-0.010');
  });

  it('should should throw an error on invalid input', function () {
    _assert2.default.throws(function () {
      new _NumberFormatter.NumberFormatter('2.3.4');
    }, /SyntaxError/);
    _assert2.default.throws(function () {
      new _NumberFormatter.NumberFormatter('2.3ee');
    }, /SyntaxError/);
    _assert2.default.throws(function () {
      new _NumberFormatter.NumberFormatter('2.3e4.3');
    }, /SyntaxError/);
    _assert2.default.throws(function () {
      new _NumberFormatter.NumberFormatter('2.3a');
    }, /SyntaxError/);
    _assert2.default.throws(function () {
      new _NumberFormatter.NumberFormatter('foo');
    }, /SyntaxError/);
    _assert2.default.throws(function () {
      new _NumberFormatter.NumberFormatter(new Date());
    }, /SyntaxError/);
  });
});
