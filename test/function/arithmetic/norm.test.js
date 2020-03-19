'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('norm', function () {

  it('should return the absolute value of a boolean', function () {
    _assert2.default.equal(math.norm(true), 1);
    _assert2.default.equal(math.norm(true, 10), 1);
    _assert2.default.equal(math.norm(false), 0);
    _assert2.default.equal(math.norm(false, 10), 0);
  });

  it('should return the absolute value of null', function () {
    _assert2.default.equal(math.norm(null), 0);
    _assert2.default.equal(math.norm(null, 10), 0);
  });

  it('should return the absolute value of a number', function () {
    _assert2.default.equal(math.norm(-4.2), 4.2);
    _assert2.default.equal(math.norm(-3.5), 3.5);
    _assert2.default.equal(math.norm(100), 100);
    _assert2.default.equal(math.norm(0), 0);
    _assert2.default.equal(math.norm(100, 10), 100);
  });

  it('should return the absolute value of a big number', function () {
    _assert2.default.deepEqual(math.norm(math.bignumber(-2.3)), math.bignumber(2.3));
    _assert2.default.deepEqual(math.norm(math.bignumber('5e500')), math.bignumber('5e500'));
    _assert2.default.deepEqual(math.norm(math.bignumber('-5e500')), math.bignumber('5e500'));
  });

  it('should return the norm of a complex number', function () {
    _assert2.default.equal(math.norm(math.complex(3, -4)), 5);
    _assert2.default.equal(math.norm(math.complex(1e200, -4e200)), 4.12310562561766e+200);
    _assert2.default.equal(math.norm(math.complex(-4e200, 1e200)), 4.12310562561766e+200);
  });

  it('should return the norm of a vector', function () {
    // empty vector
    _assert2.default.equal(math.norm([]), 0.0);
    _assert2.default.equal(math.norm(math.matrix([])), 0.0);
    // p = Infinity
    _assert2.default.equal(math.norm([1, 2, -3], Number.POSITIVE_INFINITY), 3);
    _assert2.default.equal(math.norm(math.matrix([1, 2, -3]), Number.POSITIVE_INFINITY), 3);
    _assert2.default.equal(math.norm([1, 2, -3], 'inf'), 3);
    _assert2.default.equal(math.norm(math.matrix([1, 2, -3]), 'inf'), 3);
    // p = -Infinity
    _assert2.default.equal(math.norm([1, 2, -3], Number.NEGATIVE_INFINITY), 1);
    _assert2.default.equal(math.norm(math.matrix([1, 2, -3]), Number.NEGATIVE_INFINITY), 1);
    _assert2.default.equal(math.norm([1, 2, -3], '-inf'), 1);
    _assert2.default.equal(math.norm(math.matrix([1, 2, -3]), '-inf'), 1);
    // p == 1
    _assert2.default.equal(math.norm([-3, -4], 1), 7.0);
    _assert2.default.equal(math.norm(math.matrix([-3, -4]), 1), 7.0);
    // p - positive
    _assert2.default.equal(math.norm([3, 4], 2), 5.0);
    _assert2.default.equal(math.norm(math.matrix([3, 4]), 2), 5.0);
    // p - negative
    _assert2.default.equal(math.norm([3, 4], -2), 2.4);
    _assert2.default.equal(math.norm(math.matrix([3, 4]), -2), 2.4);
    // missing p (defaults to 2)
    _assert2.default.equal(math.norm([3, 4]), 5.0);
    _assert2.default.equal(math.norm(math.matrix([3, 4])), 5.0);
    // p == 'fro'
    _assert2.default.equal(math.norm([3, 4], 'fro'), 5.0);
    _assert2.default.equal(math.norm(math.matrix([3, 4]), 'fro'), 5.0);
    // p == 0
    _assert2.default.equal(math.norm([3, 4], 0), Number.POSITIVE_INFINITY);
    _assert2.default.equal(math.norm(math.matrix([3, 4]), 0), Number.POSITIVE_INFINITY);
  });

  it('should return the norm of a matrix', function () {
    // p = 1
    _assert2.default.equal(math.norm([[1, 2], [3, 4]], 1), 6);
    _assert2.default.equal(math.norm(math.matrix([[1, 2], [3, 4]]), 1), 6);
    _assert2.default.equal(math.norm(math.matrix([[1, 2], [3, 4]], 'sparse'), 1), 6);
    // p = Infinity
    _assert2.default.equal(math.norm([[1, 2], [3, 4]], Number.POSITIVE_INFINITY), 7);
    _assert2.default.equal(math.norm(math.matrix([[1, 2], [3, 4]]), Number.POSITIVE_INFINITY), 7);
    _assert2.default.equal(math.norm(math.matrix([[1, 2], [3, 4]], 'sparse'), Number.POSITIVE_INFINITY), 7);
    _assert2.default.equal(math.norm([[1, 2], [3, 4]], 'inf'), 7);
    _assert2.default.equal(math.norm(math.matrix([[1, 2], [3, 4]]), 'inf'), 7);
    _assert2.default.equal(math.norm(math.matrix([[1, 2], [3, 4]], 'sparse'), 'inf'), 7);
    // p = 'fro'
    _assert2.default.equal(math.norm([[1, 2], [-3, -4]], 'fro'), math.sqrt(30));
    _assert2.default.equal(math.norm(math.matrix([[1, 2], [-3, -4]]), 'fro'), math.sqrt(30));
    _assert2.default.equal(math.norm(math.matrix([[1, 2], [-3, -4]], 'sparse'), 'fro'), math.sqrt(30));
    // p - not implemented yet!
    _assert2.default.throws(function () {
      math.norm(math.norm([[1, 2], [3, 4]], 2), 6);
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      math.norm();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      math.norm(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error with a string', function () {
    _assert2.default.throws(function () {
      math.norm('a string');
    });
  });

  it('should LaTeX norm', function () {
    var expr1 = math.parse('norm(a)');
    var expr2 = math.parse("norm(a,2)");

    _assert2.default.equal(expr1.toTex(), '\\left\\| a\\right\\|');
    _assert2.default.equal(expr2.toTex(), '\\mathrm{norm}\\left( a,2\\right)');
  });
});
