"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    multinomial = math.multinomial;

describe('multinomial', function () {

  it('should calculate the multinomial of an array of numbers', function () {
    _assert2.default.equal(multinomial([1, 2, 1]), 12);
    _assert2.default.equal(multinomial([4, 2, 1]), 105);
    _assert2.default.equal(multinomial([4, 4]), 70);
  });

  it('should calculate the multinomial of n items taken k at a time with BigNumbers', function () {
    _assert2.default.equal(_underscore2.default.isEqual(multinomial([math.bignumber(3), math.bignumber(4), math.bignumber(5)]), math.bignumber(27720)), true);
    _assert2.default.deepEqual(multinomial([math.bignumber(10), math.bignumber(1), math.bignumber(2)]), math.bignumber(858));
  });

  it('should not work with non-integer and negative input', function () {
    _assert2.default.throws(function () {
      multinomial([0.5, 3]);
    }, TypeError);
    _assert2.default.throws(function () {
      multinomial([math.bignumber(3), math.bignumber(0.5)]);
    }, TypeError);
    _assert2.default.throws(function () {
      multinomial([math.bignumber(3.5), math.bignumber(-3)]);
    }, TypeError);
    _assert2.default.throws(function () {
      multinomial([math.bignumber(3.5), 1 / 3]);
    }, TypeError);
  });

  it('should not work with the wrong number or type of arguments', function () {
    _assert2.default.throws(function () {
      multinomial(5, 3, 2);
    });
    _assert2.default.throws(function () {
      multinomial(true, "hello world");
    });
  });
});
