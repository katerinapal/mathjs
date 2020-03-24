"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {},
    stirlingS2 = _index.indexjs.stirlingS2;

describe('stirlingS2', function () {

  it('should calculate the number of ways to partition a set of n objects into k non-empty subsets', function () {
    _assert2.default.equal(stirlingS2(5, 3), 25);
    _assert2.default.equal(stirlingS2(0, 0), 1);
    _assert2.default.equal(stirlingS2(8, 7), 28);
  });

  it('should calculate the stirlingS2 of n items taken k at a time with BigNumbers', function () {
    _assert2.default.deepEqual(stirlingS2(_index.indexjs.bignumber(7), _index.indexjs.bignumber(5)), _index.indexjs.bignumber(140));
    _assert2.default.deepEqual(stirlingS2(_index.indexjs.bignumber(8), _index.indexjs.bignumber(6)), _index.indexjs.bignumber(266));
  });

  it('should not work with non-integer and negative input', function () {
    _assert2.default.throws(function () {
      stirlingS2(0.5, 3);
    }, /Non-negative integer value expected/);
    _assert2.default.throws(function () {
      stirlingS2(-2, 3);
    }, /Non-negative integer value expected/);

    _assert2.default.throws(function () {
      stirlingS2(3, 5);
    }, /k must be less than or equal to n in function stirlingS2/);
    _assert2.default.throws(function () {
      stirlingS2(_index.indexjs.bignumber(3), _index.indexjs.bignumber(5));
    }, /k must be less than or equal to n in function stirlingS2/);
    _assert2.default.throws(function () {
      stirlingS2(_index.indexjs.bignumber(3.5), _index.indexjs.bignumber(-3));
    }, /Non-negative integer value expected/);
    _assert2.default.throws(function () {
      stirlingS2(_index.indexjs.bignumber(3.5), 1 / 3);
    }, /Non-negative integer value expected/);
  });

  it('should not work with the wrong number or type of arguments', function () {
    _assert2.default.throws(function () {
      stirlingS2(5, 3, 2);
    });
    _assert2.default.throws(function () {
      stirlingS2(true, "hello world");
    });
  });

  it('should LaTeX stirlingS2', function () {
    var expression = _index.indexjs.parse('stirlingS2(3,2)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{S}\\left(3,2\\right)');
  });
});
