"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _underscore = require("underscore");

var _underscore2 = _interopRequireDefault(_underscore);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    multinomial = _index.indexjs.multinomial;

describe('multinomial', function () {

  it('should calculate the multinomial of an array of numbers', function () {
    _assert2.default.equal(multinomial([1, 2, 1]), 12);
    _assert2.default.equal(multinomial([4, 2, 1]), 105);
    _assert2.default.equal(multinomial([4, 4]), 70);
  });

  it('should calculate the multinomial of n items taken k at a time with BigNumbers', function () {
    _assert2.default.equal(_.isEqual(multinomial([_index.indexjs.bignumber(3), _index.indexjs.bignumber(4), _index.indexjs.bignumber(5)]), _index.indexjs.bignumber(27720)), true);
    _assert2.default.deepEqual(multinomial([_index.indexjs.bignumber(10), _index.indexjs.bignumber(1), _index.indexjs.bignumber(2)]), _index.indexjs.bignumber(858));
  });

  it('should not work with non-integer and negative input', function () {
    _assert2.default.throws(function () {
      multinomial([0.5, 3]);
    }, TypeError);
    _assert2.default.throws(function () {
      multinomial([_index.indexjs.bignumber(3), _index.indexjs.bignumber(0.5)]);
    }, TypeError);
    _assert2.default.throws(function () {
      multinomial([_index.indexjs.bignumber(3.5), _index.indexjs.bignumber(-3)]);
    }, TypeError);
    _assert2.default.throws(function () {
      multinomial([_index.indexjs.bignumber(3.5), 1 / 3]);
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
