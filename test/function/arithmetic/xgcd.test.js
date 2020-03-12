"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var index_obj = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test xgcd
var error = require('../../../lib/error/index'),
    math = index_obj.create({ matrix: 'Array' }),
    gcd = index_obj.gcd,
    xgcd = index_obj.xgcd;

describe('xgcd', function () {

  it('should return extended greatest common divisor of two numbers', function () {
    // xgcd(36163, 21199) = 1247 => -7(36163) + 12(21199) = 1247
    _assert2.default.deepEqual([1247, -7, 12], xgcd(36163, 21199));
    // xgcd(120, 23) = 1 => -9(120) + 47(23) = 1
    _assert2.default.deepEqual([1, -9, 47], xgcd(120, 23));
    // some unit tests from: https://github.com/sjkaliski/numbers.js/blob/master/test/basic.test.js
    _assert2.default.deepEqual([5, -3, 5], xgcd(65, 40));
    _assert2.default.deepEqual([5, 5, -3], xgcd(40, 65));
    _assert2.default.deepEqual([21, -16, 27], xgcd(1239, 735));
    _assert2.default.deepEqual([21, 5, -2], xgcd(105, 252));
    _assert2.default.deepEqual([21, -2, 5], xgcd(252, 105));
  });

  it('should calculate xgcd for edge cases around zero', function () {
    _assert2.default.deepEqual([3, 1, 0], xgcd(3, 0));
    _assert2.default.deepEqual([3, -1, 0], xgcd(-3, 0));
    _assert2.default.deepEqual([3, 0, 1], xgcd(0, 3));
    _assert2.default.deepEqual([3, 0, -1], xgcd(0, -3));

    _assert2.default.deepEqual([1, 0, 1], xgcd(1, 1));
    _assert2.default.deepEqual([1, 1, 0], xgcd(1, 0));
    _assert2.default.deepEqual([1, 0, -1], xgcd(1, -1));
    _assert2.default.deepEqual([1, 0, 1], xgcd(-1, 1));
    _assert2.default.deepEqual([1, -1, 0], xgcd(-1, 0));
    _assert2.default.deepEqual([1, 0, -1], xgcd(-1, -1));
    _assert2.default.deepEqual([1, 0, 1], xgcd(0, 1));
    _assert2.default.deepEqual([1, 0, -1], xgcd(0, -1));
    _assert2.default.deepEqual([0, 0, 0], xgcd(0, 0));
  });

  it('should calculate xgcd of booleans', function () {
    _assert2.default.deepEqual(xgcd(true, true), [1, 0, 1]);
    _assert2.default.deepEqual(xgcd(true, false), [1, 1, 0]);
    _assert2.default.deepEqual(xgcd(false, true), [1, 0, 1]);
    _assert2.default.deepEqual(xgcd(false, false), [0, 0, 0]);
  });

  it('should calculate xgcd of numbers and null', function () {
    _assert2.default.deepEqual(xgcd(1, null), [1, 1, 0]);
    _assert2.default.deepEqual(xgcd(null, 1), [1, 0, 1]);
    _assert2.default.deepEqual(xgcd(null, null), [0, 0, 0]);
  });

  it('should calculate xgcd for BigNumbers', function () {
    _assert2.default.deepEqual(xgcd(index_obj.bignumber(65), index_obj.bignumber(40)), [index_obj.bignumber(5), index_obj.bignumber(-3), index_obj.bignumber(5)]);
    _assert2.default.deepEqual(xgcd(index_obj.bignumber(65), index_obj.bignumber(40)), [index_obj.bignumber(5), index_obj.bignumber(-3), index_obj.bignumber(5)]);
  });

  it('should calculate xgcd for mixed BigNumbers and Numbers', function () {
    _assert2.default.deepEqual(xgcd(index_obj.bignumber(65), 40), [index_obj.bignumber(5), index_obj.bignumber(-3), index_obj.bignumber(5)]);
    _assert2.default.deepEqual(xgcd(65, index_obj.bignumber(40)), [index_obj.bignumber(5), index_obj.bignumber(-3), index_obj.bignumber(5)]);
  });

  // FIXME: xgcd for negative values
  it.skip('should calculate xgcd for edge cases with negative values', function () {
    _assert2.default.deepEqual([1, -2, 1], xgcd(2, 5));
    _assert2.default.deepEqual([1, -2, -1], xgcd(2, -5));
    _assert2.default.deepEqual([1, 2, 1], xgcd(-2, 5));
    _assert2.default.deepEqual([1, 2, -1], xgcd(-2, -5));

    _assert2.default.deepEqual([2, 1, 0], xgcd(2, 6));
    _assert2.default.deepEqual([2, 1, 0], xgcd(2, -6));
    _assert2.default.deepEqual([2, -1, 0], xgcd(-2, 6));
    _assert2.default.deepEqual([2, -1, 0], xgcd(-2, -6));
  });

  it('should find the greatest common divisor of booleans', function () {
    _assert2.default.deepEqual([1, 0, 1], xgcd(true, true));
    _assert2.default.deepEqual([1, 1, 0], xgcd(true, false));
    _assert2.default.deepEqual([1, 0, 1], xgcd(false, true));
    _assert2.default.deepEqual([0, 0, 0], xgcd(false, false));
  });

  it('should give same results as gcd', function () {
    _assert2.default.equal(gcd(1239, 735), xgcd(1239, 735)[0]);
    _assert2.default.equal(gcd(105, 252), xgcd(105, 252)[0]);
    _assert2.default.equal(gcd(7, 13), xgcd(7, 13)[0]);
  });

  it('should return a matrix when configured to use matrices', function () {
    var math1 = index_obj.create({ matrix: 'Matrix' });
    _assert2.default.deepEqual(math1.xgcd(65, 40), index_obj.matrix([5, -3, 5]));

    var math2 = index_obj.create({ matrix: 'Array' });
    _assert2.default.deepEqual(math2.xgcd(65, 40), [5, -3, 5]);
  });

  it('should throw an error if used with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      xgcd(1);
    });
    _assert2.default.throws(function () {
      xgcd(1, 2, 3);
    });
  });

  it('should throw an error for non-integer numbers', function () {
    _assert2.default.throws(function () {
      xgcd(2, 4.1);
    }, /Parameters in function xgcd must be integer numbers/);
    _assert2.default.throws(function () {
      xgcd(2.3, 4);
    }, /Parameters in function xgcd must be integer numbers/);
  });

  it('should throw an error when used with a complex number', function () {
    _assert2.default.throws(function () {
      xgcd(index_obj.complex(1, 3), 2);
    }, TypeError, 'Function xgcd(complex, number) not supported');
  });

  it('should convert to a number when used with a string', function () {
    _assert2.default.deepEqual(xgcd('65', '40'), [5, -3, 5]);
    _assert2.default.throws(function () {
      xgcd(2, 'a');
    }, /Cannot convert "a" to a number/);
  });

  it('should throw an error when used with a unit', function () {
    _assert2.default.throws(function () {
      xgcd(index_obj.unit('5cm'), 2);
    }, TypeError, 'Function xgcd(unit, number) not supported');
  });

  it('should throw an error when used with a matrix', function () {
    _assert2.default.throws(function () {
      xgcd([5, 2, 3], [25, 3, 6]);
    }, TypeError, 'Function xgcd(array, array) not supported');
  });

  it('should LaTeX xgcd', function () {
    var expression = index_obj.parse('xgcd(2,3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{xgcd}\\left(2,3\\right)');
  });
});
