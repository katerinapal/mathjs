"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _number = require("../../lib/utils/number");

var libutilsnumber_numberjsjs = _interopRequireWildcard(_number);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test number utils
var approx = require('../../tools/approx');

describe('number', function () {

  it('isInteger', function () {
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(1), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(3), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(-4), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(0), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(12000), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(-3000), true);

    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(1.1), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(0.1), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(-2.3), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(-2.3), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isInteger(NaN), false);
  });

  it('isNumber', function () {
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(1), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(2e+3), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(Number(2.3)), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(NaN), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(-23), true);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(parseFloat('123')), true);

    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber('23'), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber('str'), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(new Date()), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber({}), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber([]), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(/regexp/), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(true), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(false), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(null), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(undefined), false);
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(), false);

    // we don't support non primitive Numbers anymore
    _assert2.default.equal(libutilsnumber_numberjsjs.isNumber(new Number(23)), false);
  });

  it('sign', function () {
    _assert2.default.equal(libutilsnumber_numberjsjs.sign(1), 1);
    _assert2.default.equal(libutilsnumber_numberjsjs.sign(3), 1);
    _assert2.default.equal(libutilsnumber_numberjsjs.sign(4.5), 1);
    _assert2.default.equal(libutilsnumber_numberjsjs.sign(0.00234), 1);

    _assert2.default.equal(libutilsnumber_numberjsjs.sign(0), 0);

    _assert2.default.equal(libutilsnumber_numberjsjs.sign(-1), -1);
    _assert2.default.equal(libutilsnumber_numberjsjs.sign(-3), -1);
    _assert2.default.equal(libutilsnumber_numberjsjs.sign(-0.23), -1);
  });

  it('should count the number of significant digits of a number', function () {
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(0), 0);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(2), 1);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(1234), 4);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(2.34), 3);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(3000), 1);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(0.0034), 2);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(120.5e50), 4);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(1120.5e+50), 5);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(120.52e-50), 5);
    _assert2.default.equal(libutilsnumber_numberjsjs.digits(Math.PI), 16);
  });

  it('should format a number using toFixed', function () {
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2.34), '2');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2.34, 1), '2.3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(-2.34, 1), '-2.3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2.34e10, 1), '23400000000.0');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2.34e30, 1), '2340000000000000000000000000000.0'); // test above the 21 digit limit of toPrecision
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2.34e-10, 1), '0.0');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2, 20), '2.00000000000000000000');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2, 21), '2.000000000000000000000');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2, 22), '2.0000000000000000000000');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2, 30), '2.000000000000000000000000000000');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(-2e3, 0), '-2000');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(5.555, 1), '5.6');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(-5.555, 1), '-5.6');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(-0.005555, 4), '-0.0056');
    _assert2.default.equal(libutilsnumber_numberjsjs.toFixed(2.135, 2), '2.14');
  });

  it('should format a number using toPrecision', function () {
    _assert2.default.equal(libutilsnumber_numberjsjs.toPrecision(2.34), '2.34');
    _assert2.default.equal(libutilsnumber_numberjsjs.toPrecision(2.34, 2), '2.3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toPrecision(-2.34, 2), '-2.3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toPrecision(2.34e10, 2), '2.3e+10');
    _assert2.default.equal(libutilsnumber_numberjsjs.toPrecision(2.34e-10, 2), '2.3e-10');
    _assert2.default.equal(libutilsnumber_numberjsjs.toPrecision(2, 4), '2.000');
    _assert2.default.equal(libutilsnumber_numberjsjs.toPrecision(-0.005555, 2), '-0.0056');
    _assert2.default.equal(libutilsnumber_numberjsjs.toPrecision(2.135, 3), '2.14');

    // TODO: test upper and lower bounds here
  });

  it('should format a number using toExponential', function () {
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2.34), '2.34e+0');
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2.34e+3), '2.34e+3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2.34e-3), '2.34e-3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2.34e+3, 2), '2.3e+3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2.135, 3), '2.14e+0');
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2e+3, 20), '2.0000000000000000000e+3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2e+3, 21), '2.00000000000000000000e+3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2e+3, 22), '2.000000000000000000000e+3');
    _assert2.default.equal(libutilsnumber_numberjsjs.toExponential(2e+3, 30), '2.00000000000000000000000000000e+3');
  });

  describe('format', function () {

    it('should format special values Infinity, NaN', function () {
      _assert2.default.equal(libutilsnumber_numberjsjs.format(Infinity), 'Infinity');
      _assert2.default.equal(libutilsnumber_numberjsjs.format(-Infinity), '-Infinity');
      _assert2.default.equal(libutilsnumber_numberjsjs.format('no number'), 'NaN');
    });

    describe('should apply options', function () {

      it('fixed notation', function () {
        var options = { notation: 'fixed' };
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0, options), '0');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123, options), '123');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123.456, options), '123');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123.7, options), '124');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(-123.7, options), '-124');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(-66, options), '-66');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.123456, options), '0');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789, options), '123456789');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(-123456789, options), '-123456789');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+9, options), '123456789000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+17, options), '12345678900000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+18, options), '123456789000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+19, options), '1234567890000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+20, options), '12345678900000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+21, options), '123456789000000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+22, options), '1234567890000000000000000000000');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-18, options), '0');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-22, options), '0');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-32, options), '0');
      });

      it('fixed notation with precision', function () {
        var options = { notation: 'fixed', precision: 2 };

        _assert2.default.equal(libutilsnumber_numberjsjs.format(0, options), '0.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123, options), '123.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123.456, options), '123.46');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123.7, options), '123.70');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.123456, options), '0.12');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(-0.5555, options), '-0.56');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789, options), '123456789.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+9, options), '123456789000000000.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+18, options), '123456789000000000000000000.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+19, options), '1234567890000000000000000000.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+20, options), '12345678900000000000000000000.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+21, options), '123456789000000000000000000000.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+22, options), '1234567890000000000000000000000.00');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.2e-14, options), '0.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.3e-18, options), '0.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.3e-19, options), '0.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.3e-20, options), '0.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.3e-21, options), '0.00');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.3e-22, options), '0.00');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(5.6789e-30, { notation: 'fixed', precision: 32 }), '0.00000000000000000000000000000568');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(5.6999e-30, { notation: 'fixed', precision: 32 }), '0.00000000000000000000000000000570');
      });

      it('exponential notation', function () {
        var options = { notation: 'exponential' };
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0, options), '0e+0');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123, options), '1.23e+2');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123.456, options), '1.23456e+2');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.0123, options), '1.23e-2');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789, options), '1.23456789e+8');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e+9, options), '1.23456789e+17');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789e-9, options), '1.23456789e-1');
      });

      it('exponential notation with precision', function () {
        var options = { notation: 'exponential', precision: 3 };
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123, options), '1.23e+2');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123.456, options), '1.23e+2');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2, options), '2.00e+0');
      });

      it('auto notation', function () {
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2 / 7), '0.2857142857142857');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.10400), '0.104');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1000), '1000');
        //assert.equal(number.format(-0.005), '-0.005');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(-2300), '-2300');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(-1.2e12), '-1.2e+12');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(0), '0');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.4e-7), '2.4e-7');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.4e-6), '2.4e-6');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.4e-5), '2.4e-5');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.4e-4), '2.4e-4');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e-3), '0.0023');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e-2), '0.023');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e-1), '0.23');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3), '2.3');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e+1), '23');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e+2), '230');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e+3), '2300');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e+4), '23000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e+5), '2.3e+5');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(2.3e+6), '2.3e+6');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.000000012), '1.000000012');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1000000012), '1.000000012e+9');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(1234567), '1.234567e+6');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789123456), '1.23456789123456e+14');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789123456e-14), '1.23456789123456');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789123456789), '1.2345678912345678e+17');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.1111e+6), '1.111e+5');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.3333e+6), '3.333e+5');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.6666e+6), '6.666e+5');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.9999e+6), '9.999e+5');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.111e+6), '1.111e+6');
      });

      it('auto notation with precision', function () {
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1 / 3), '0.3333333333333333');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1 / 3, { precision: 3 }), '0.333');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1 / 3, { precision: 4 }), '0.3333');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1 / 3, { precision: 5 }), '0.33333');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.05555, { precision: 2 }), '0.056');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(-0.05555, { precision: 2 }), '-0.056');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(1000.000, { precision: 5 }), '1000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1000.0010, { precision: 5 }), '1000'); // rounded off at 5 digits
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1234, { precision: 3 }), '1230');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123.4, { precision: 6 }), '123.4');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.001234, { precision: 3 }), '0.00123');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(1234567, { precision: 4 }), '1.235e+6');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1234567, { precision: 2 }), '1.2e+6');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123e-6, { precision: 2 }), '1.2e-4');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123e-6, { precision: 8 }), '1.23e-4'); // should remove trailing zeros
        _assert2.default.equal(libutilsnumber_numberjsjs.format(3e+6, { precision: 8 }), '3e+6'); // should remove trailing zeros
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1234, { precision: 2 }), '1200');

        // overflow the maximum allowed precision of 20
        _assert2.default.equal(libutilsnumber_numberjsjs.format(4, { precision: 30 }), '4');
      });

      it('auto notation with custom lower and upper bound', function () {
        var options = {
          exponential: {
            lower: 1e-6,
            upper: 1e+9
          }
        };
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0, options), '0');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1234567, options), '1234567');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+9, options), '1e+9');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+9 - 1, options), '999999999');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-6, options), '0.000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.999e-6, options), '9.99e-7');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789123, options), '1.23456789123e+11');

        _assert2.default.equal(libutilsnumber_numberjsjs.format(Math.pow(2, 53), { exponential: { upper: 1e+20 } }), '9007199254740992');
      });

      it('auto notation with custom lower bound', function () {
        var options = { exponential: { lower: 1e-6 } };
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0, options), '0');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-6, options), '0.000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.999e-6, options), '9.99e-7');
      });

      it('auto notation with very large custom lower bound', function () {
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1, { exponential: { lower: 1e-2 } }), '1');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-1, { exponential: { lower: 1e-2 } }), '0.1');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-2, { exponential: { lower: 1e-2 } }), '0.01');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-3, { exponential: { lower: 1e-2 } }), '1e-3');
      });

      it('auto notation with very small custom lower bound', function () {
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-18, { exponential: { lower: 1e-30 } }), '0.000000000000000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-19, { exponential: { lower: 1e-30 } }), '0.0000000000000000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-20, { exponential: { lower: 1e-30 } }), '0.00000000000000000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-21, { exponential: { lower: 1e-30 } }), '0.000000000000000000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-22, { exponential: { lower: 1e-30 } }), '0.0000000000000000000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-23, { exponential: { lower: 1e-30 } }), '0.00000000000000000000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-24, { exponential: { lower: 1e-30 } }), '0.000000000000000000000001');
      });

      it('auto notation with custom upper bound', function () {
        var options = { exponential: { upper: 1e+9 } };
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+9, options), '1e+9');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+9 - 1, options), '999999999');
      });

      it('auto notation with very large custom upper bound', function () {
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+18, { exponential: { upper: 1e+30 } }), '1000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+19, { exponential: { upper: 1e+30 } }), '10000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+20, { exponential: { upper: 1e+30 } }), '100000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+21, { exponential: { upper: 1e+30 } }), '1000000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+22, { exponential: { upper: 1e+30 } }), '10000000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+23, { exponential: { upper: 1e+30 } }), '100000000000000000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+24, { exponential: { upper: 1e+30 } }), '1000000000000000000000000');
      });

      it('auto notation with very small custom upper bound', function () {
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1, { exponential: { upper: 1e2 } }), '1');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e1, { exponential: { upper: 1e2 } }), '10');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e2, { exponential: { upper: 1e2 } }), '1e+2');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e3, { exponential: { upper: 1e2 } }), '1e+3');
      });

      it('auto notation with custom precision, lower, and upper bound', function () {
        var options = {
          precision: 4,
          exponential: {
            lower: 1e-6,
            upper: 1e+9
          }
        };

        _assert2.default.equal(libutilsnumber_numberjsjs.format(0, options), '0');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1234567, options), '1235000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+9, options), '1e+9');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1.1e+9, options), '1.1e+9');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e+9 - 1, options), '1000000000');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(1e-6, options), '0.000001');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(0.999e-6, options), '9.99e-7');
        _assert2.default.equal(libutilsnumber_numberjsjs.format(123456789123, options), '1.235e+11');
      });

      it('should throw an error on unknown notation', function () {
        _assert2.default.throws(function () {
          libutilsnumber_numberjsjs.format(123, { notation: 'non existing' });
        });
      });
    });

    it('should format numbers with precision as second parameter', function () {
      _assert2.default.equal(libutilsnumber_numberjsjs.format(1 / 3), '0.3333333333333333');
      _assert2.default.equal(libutilsnumber_numberjsjs.format(1 / 3, 5), '0.33333');
      _assert2.default.equal(libutilsnumber_numberjsjs.format(1 / 3, 3), '0.333');
      _assert2.default.equal(libutilsnumber_numberjsjs.format(2 / 3, 3), '0.667');
    });

    it('should format numbers with a custom formatting function', function () {
      function asCurrency(value) {
        return '$' + value.toFixed(2);
      }

      _assert2.default.equal(libutilsnumber_numberjsjs.format(12.4264, asCurrency), '$12.43');
      _assert2.default.equal(libutilsnumber_numberjsjs.format(0.1, asCurrency), '$0.10');
      _assert2.default.equal(libutilsnumber_numberjsjs.format(1.2e+6, asCurrency), '$1200000.00');
    });
  });

  describe('nearlyEqual', function () {

    it('should test whether two numbers are nearly equal', function () {
      var epsilon = 1e-2;
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 0.9, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 0.95, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 0.98, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 0.991, epsilon), true);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 1.1, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 1.05, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 1.02, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 1.01, epsilon), true);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 1, epsilon), true);

      // smaller epsilon
      var epsilon2 = 1e-4;
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 0.99, epsilon2), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 0.999, epsilon2), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1, 0.9999, epsilon2), true);

      // test one of these famous round-off errors
      _assert2.default.equal(0.1 + 0.2 == 0.3, false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(0.1 + 0.2, 0.3, 1e-14), true);
    });

    it('should test whether a positive and negative number are nearly equal', function () {
      var epsilon = 1e-3;
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1.2, 1.2, epsilon), true);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1.2, -1.2, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(-1.2, 1.2, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(-1.2, -1.2, epsilon), true);
    });

    it('should test whether two large numbers are nearly equal', function () {
      var epsilon = 1e-2;
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1e200, 0.90e200, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1e200, 0.95e200, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1e200, 0.98e200, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1e200, 0.99e200, epsilon), true);
    });

    it('should test whether two small numbers are nearly equal (always true)', function () {
      var epsilon = 1e-2;
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1e-200, 0.99e-200, epsilon), true);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1e-200, 10e-200, epsilon), true); // FIXME: why is this true?
    });

    it('should compare with zero', function () {
      var epsilon = 1e-3;
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(0, 0, epsilon), true);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(0, -0, epsilon), true);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(0, 1.2, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(0, 1e30, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(0, 1e-30, epsilon), true); // FIXME: why is this true?
    });

    it('should compare with Infinity', function () {
      var epsilon = 1e-3;

      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1.2, Infinity, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(Infinity, 1.2, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(Infinity, Infinity, epsilon), true);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(Infinity, -Infinity, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(-Infinity, Infinity, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(-Infinity, -Infinity, epsilon), true);
    });

    it('should compare with NaN', function () {
      var epsilon = 1e-3;
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1.2, NaN, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(NaN, 1.2, epsilon), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(NaN, NaN, epsilon), false);
    });

    it('should do exact comparison when epsilon is null or undefined', function () {
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1.2, 1.2), true);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(1.2, 1.2, null), true);

      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(0.1 + 0.2, 0.3), false);
      _assert2.default.equal(libutilsnumber_numberjsjs.nearlyEqual(0.1 + 0.2, 0.3, null), false);
    });
  });
});
