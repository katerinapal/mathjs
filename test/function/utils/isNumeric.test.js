'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isNumeric = math.isNumeric;
var bignumber = math.bignumber;
var fraction = math.fraction;

describe('isNumeric', function () {

  it('should test whether a value is numeric', function () {
    _assert2.default.strictEqual(isNumeric(2), true);
    _assert2.default.strictEqual(isNumeric(true), true);
    _assert2.default.strictEqual(isNumeric(bignumber(2.3)), true);
    _assert2.default.strictEqual(isNumeric(fraction(1, 3)), true);

    _assert2.default.strictEqual(isNumeric('2'), false);
    _assert2.default.strictEqual(isNumeric('foo'), false);
    _assert2.default.strictEqual(isNumeric(math.complex(2, 3)), false);
    _assert2.default.strictEqual(isNumeric(math.unit('5 cm')), false);
  });

  it('should test isNumeric element wise on an Array', function () {
    _assert2.default.deepEqual(isNumeric([2, 'foo', true]), [true, false, true]);
  });

  it('should test isNumeric element wise on a Matrix', function () {
    _assert2.default.deepEqual(isNumeric(math.matrix([2, 'foo', true])), math.matrix([true, false, true]));
  });

  it('should throw an error in case of unsupported data types', function () {
    _assert2.default.throws(function () {
      isNumeric(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      isNumeric({});
    }, /TypeError: Unexpected type of argument/);
  });
});
