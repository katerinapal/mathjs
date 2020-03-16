'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');
var math = require('../../../index');
var composition = math.composition;

describe('composition', function () {

  it('should calculate the number of ways to compose a set of n objects into k non-empty subsets', function () {
    _assert2.default.equal(composition(5, 3), 6);
    _assert2.default.equal(composition(1, 1), 1);
    _assert2.default.equal(composition(8, 3), 21);
  });

  it('should calculate the composition of n items taken k at a time with BigNumbers', function () {
    _assert2.default.deepEqual(composition(math.bignumber(7), math.bignumber(5)), math.bignumber(15));
    _assert2.default.deepEqual(composition(math.bignumber(70), math.bignumber(3)), math.bignumber(2346));
    _assert2.default.deepEqual(composition(math.bignumber(56), math.bignumber(11)), math.bignumber(29248649430));
  });

  it('should not work with non-integer and negative input', function () {
    _assert2.default.throws(function () {
      composition(0.5, 3);
    }, /TypeError: Positive integer value expected in function composition/);
    _assert2.default.throws(function () {
      composition(-2, 3);
    }, /TypeError: Positive integer value expected in function composition/);
    _assert2.default.throws(function () {
      composition(6, -2);
    }, /TypeError: Positive integer value expected in function composition/);
    _assert2.default.throws(function () {
      composition(3, 5);
    }, /TypeError: k must be less than or equal to n in function composition/);
    _assert2.default.throws(function () {
      composition(math.bignumber(3), math.bignumber(5));
    }, /TypeError: k must be less than or equal to n in function composition/);
    _assert2.default.throws(function () {
      composition(math.bignumber(3.5), math.bignumber(-3));
    }, /TypeError: Positive integer value expected in function composition/);
    _assert2.default.throws(function () {
      composition(math.bignumber(3.5), 0.25);
    }, /TypeError: Positive integer value expected in function composition/);
  });

  it('should not work with the wrong number or type of arguments', function () {
    _assert2.default.throws(function () {
      composition(5, 3, 2);
    });
    _assert2.default.throws(function () {
      composition(true, "hello world");
    });
  });
});
