'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var isPrime = math.isPrime;
var bignumber = math.bignumber;
var complex = math.complex;

describe('isPrime', function () {

  it('should test whether a number is prime', function () {
    _assert2.default.strictEqual(isPrime(0), false);
    _assert2.default.strictEqual(isPrime(-0), false);
    _assert2.default.strictEqual(isPrime(-1), false);
    _assert2.default.strictEqual(isPrime(1), false);
    _assert2.default.strictEqual(isPrime(2), true);
    _assert2.default.strictEqual(isPrime(3), true);
    _assert2.default.strictEqual(isPrime(5), true);
    _assert2.default.strictEqual(isPrime(7), true);
    _assert2.default.strictEqual(isPrime(4), false);
    _assert2.default.strictEqual(isPrime(100), false);
    _assert2.default.strictEqual(isPrime(102), false);
    _assert2.default.strictEqual(isPrime(999), false);
  });

  it('should test whether a BigNumber is prime', function () {
    _assert2.default.strictEqual(isPrime(bignumber(0)), false);
    _assert2.default.strictEqual(isPrime(bignumber(-0)), false);
    _assert2.default.strictEqual(isPrime(bignumber(-1)), false);
    _assert2.default.strictEqual(isPrime(bignumber(1)), false);
    _assert2.default.strictEqual(isPrime(bignumber(2)), true);
    _assert2.default.strictEqual(isPrime(bignumber(3)), true);
    _assert2.default.strictEqual(isPrime(bignumber(5)), true);
    _assert2.default.strictEqual(isPrime(bignumber(7)), true);
    _assert2.default.strictEqual(isPrime(bignumber(4)), false);
    _assert2.default.strictEqual(isPrime(bignumber(100)), false);
    _assert2.default.strictEqual(isPrime(bignumber(102)), false);
    _assert2.default.strictEqual(isPrime(bignumber(999)), false);
  });

  it('should test isPrime element wise on an Array', function () {
    _assert2.default.deepEqual(isPrime([0, 1, 2, 5, 9]), [false, false, true, true, false]);
  });

  it('should throw an error in case of unsupported data types', function () {
    _assert2.default.throws(function () {
      isPrime(complex(2, 3));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isPrime(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isPrime({});
    }, /TypeError: Unexpected type of argument/);
  });
});
