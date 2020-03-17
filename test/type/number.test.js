"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../lib/error/index'),
    math = require('../../index'),
    number = math.number;

describe('number', function () {

  it('should be 0 if called with no argument', function () {
    (0, _approx.equal)(number(), 0);
  });

  it('should convert a boolean to a number', function () {
    (0, _approx.equal)(number(true), 1);
    (0, _approx.equal)(number(false), 0);
  });

  it('should convert null to a number', function () {
    (0, _approx.equal)(number(null), 0);
  });

  it('should convert a bignumber to a number', function () {
    (0, _approx.equal)(number(math.bignumber(0.1)), 0.1);
    (0, _approx.equal)(number(math.bignumber('1.3e500')), Infinity);
  });

  it('should convert a fraction to a number', function () {
    (0, _approx.equal)(number(math.fraction(2, 5)), 0.4);
  });

  it('should accept a number as argument', function () {
    (0, _approx.equal)(number(3), 3);
    (0, _approx.equal)(number(-3), -3);
  });

  it('should convert a unit to a number', function () {
    (0, _approx.equal)(number(math.unit('52cm'), 'm'), 0.52);
  });

  it('should parse the string if called with a valid string', function () {
    (0, _approx.equal)(number('2.1e3'), 2100);
    (0, _approx.equal)(number(' 2.1e-3 '), 0.0021);
    (0, _approx.equal)(number(''), 0);
    (0, _approx.equal)(number(' '), 0);
  });

  it('should throw an error if called with an invalid string', function () {
    _assert2.default.throws(function () {
      number('2.3.4');
    }, SyntaxError);
    _assert2.default.throws(function () {
      number('23a');
    }, SyntaxError);
  });

  it('should convert the elements of a matrix to numbers', function () {
    _assert2.default.deepEqual(number(math.matrix(['123', true])), math.matrix([123, 1]));
  });

  it('should convert the elements of an array to numbers', function () {
    _assert2.default.deepEqual(number(['123', true]), [123, 1]);
  });

  it('should throw an error if called with a wrong number of arguments', function () {
    _assert2.default.throws(function () {
      number(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error if called with a complex number', function () {
    _assert2.default.throws(function () {
      number(math.complex(2, 3));
    }, TypeError);
  });

  it('should throw an error with wrong type of arguments', function () {
    _assert2.default.throws(function () {
      number(math.unit('5cm'));
    }, /Second argument with valueless unit expected/);
    //assert.throws(function () {number(math.unit('5cm'), 2)}, TypeError); // FIXME: this should also throw an error
    _assert2.default.throws(function () {
      number(math.unit('5cm'), new Date());
    }, TypeError);
    _assert2.default.throws(function () {
      number('23', 2);
    }, TypeError);
  });

  it('should LaTeX number', function () {
    var expr1 = math.parse('number()');
    var expr2 = math.parse('number(1)');
    var expr3 = math.parse('number(1,cm)');

    _assert2.default.equal(expr1.toTex(), '0');
    _assert2.default.equal(expr2.toTex(), '\\left(1\\right)');
    _assert2.default.equal(expr3.toTex(), '\\left(\\left(1\\right)\\mathrm{cm}\\right)');
  });
});
