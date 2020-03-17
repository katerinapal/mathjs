'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    combinations = math.combinations;

describe('combinations', function () {

  it('should calculate the combinations of a number taking k at a time', function () {
    _assert2.default.equal(combinations(0, 0), 1);
    _assert2.default.equal(combinations(7, 5), 21);
    _assert2.default.equal(combinations(20, 15), 15504);
    _assert2.default.equal(combinations(63, 7), 553270671);
    _assert2.default.equal(combinations(25, 6), 177100);
  });

  it('should calculate the combinations of n items taken k at a time with BigNumbers', function () {
    _assert2.default.deepEqual(combinations(math.bignumber(7), math.bignumber(5)), math.bignumber(21));
    _assert2.default.deepEqual(combinations(math.bignumber(20), math.bignumber(15)), math.bignumber(15504));
    _assert2.default.deepEqual(combinations(math.bignumber(63), math.bignumber(7)), math.bignumber(553270671));
    _assert2.default.deepEqual(combinations(math.bignumber(25), math.bignumber(6)), math.bignumber(177100));
  });

  it('should not work with non-integer and negative input', function () {
    _assert2.default.throws(function () {
      combinations(-12, 6);
    }, TypeError);
    _assert2.default.throws(function () {
      combinations(12, -6);
    }, TypeError);
    _assert2.default.throws(function () {
      combinations(0.5, 3);
    }, TypeError);
    _assert2.default.throws(function () {
      combinations(4, 0.5);
    }, TypeError);
    _assert2.default.throws(function () {
      combinations(3, 5);
    }, TypeError);
    _assert2.default.throws(function () {
      combinations(math.bignumber(3), math.bignumber(5));
    }, TypeError);
    _assert2.default.throws(function () {
      combinations(math.bignumber(3.5), math.bignumber(-3));
    }, TypeError);
    _assert2.default.throws(function () {
      combinations(math.bignumber(3.5), 1 / 3);
    }, TypeError);
  });

  it('should not work with the wrong number or type of arguments', function () {
    _assert2.default.throws(function () {
      combinations(5, 3, 2);
    });
    _assert2.default.throws(function () {
      combinations(true, "hello world");
    });
  });

  it('should LaTeX combinations', function () {
    var expression = math.parse('combinations(3,2)');
    _assert2.default.equal(expression.toTex(), '\\binom{3}{2}');
  });
});
