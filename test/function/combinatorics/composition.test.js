"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var composition = _index.indexjs.composition;

describe('composition', function () {

  it('should calculate the number of ways to compose a set of n objects into k non-empty subsets', function () {
    _assert2.default.equal(composition(5, 3), 6);
    _assert2.default.equal(composition(1, 1), 1);
    _assert2.default.equal(composition(8, 3), 21);
  });

  it('should calculate the composition of n items taken k at a time with BigNumbers', function () {
    _assert2.default.deepEqual(composition(_index.indexjs.bignumber(7), _index.indexjs.bignumber(5)), _index.indexjs.bignumber(15));
    _assert2.default.deepEqual(composition(_index.indexjs.bignumber(70), _index.indexjs.bignumber(3)), _index.indexjs.bignumber(2346));
    _assert2.default.deepEqual(composition(_index.indexjs.bignumber(56), _index.indexjs.bignumber(11)), _index.indexjs.bignumber(29248649430));
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
      composition(_index.indexjs.bignumber(3), _index.indexjs.bignumber(5));
    }, /TypeError: k must be less than or equal to n in function composition/);
    _assert2.default.throws(function () {
      composition(_index.indexjs.bignumber(3.5), _index.indexjs.bignumber(-3));
    }, /TypeError: Positive integer value expected in function composition/);
    _assert2.default.throws(function () {
      composition(_index.indexjs.bignumber(3.5), 0.25);
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
