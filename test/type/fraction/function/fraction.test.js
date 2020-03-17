"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _fraction = require("fraction.js");

var _fraction2 = _interopRequireDefault(_fraction);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../../index');

describe('fraction', function () {

  it('should create a fraction', function () {
    equalFraction(math.fraction(1, 3), new _fraction2.default(1, 3));
    equalFraction(math.fraction(0.3), new _fraction2.default(0.3));
    equalFraction(math.fraction('1/3'), new _fraction2.default(1, 3));
    equalFraction(math.fraction({ n: 1, d: 3 }), new _fraction2.default(1, 3));
  });

  it('should create a fraction from a BigNumber', function () {
    var b = math.bignumber(2).div(3);
    var f = math.fraction(b);
    equalFraction(f, new _fraction2.default('0.6666666666666666666666666666666666666666666666666666666666666667'));
  });

  it('should clone a fraction', function () {
    var a = math.fraction(1, 3);
    var b = math.fraction(a);
    _assert2.default.strictEqual(a, b); // b === a as fractions are supposed to be immutable
  });

  it('should create a fraction for all elements in an array', function () {
    var arr = math.fraction([0.2, 0.25, 0.125]);
    (0, _assert2.default)(Array.isArray(arr));
    _assert2.default.equal(arr.length, 3);

    equalFraction(arr[0], new _fraction2.default(1, 5));
    equalFraction(arr[1], new _fraction2.default(1, 4));
    equalFraction(arr[2], new _fraction2.default(1, 8));
  });

  it('should create a fraction for all elements in a Matrix', function () {
    var mat = math.fraction(math.matrix([0.2, 0.25, 0.125]));
    _assert2.default.strictEqual(mat.isMatrix, true);

    var arr = mat.toArray();
    equalFraction(arr[0], new _fraction2.default(1, 5));
    equalFraction(arr[1], new _fraction2.default(1, 4));
    equalFraction(arr[2], new _fraction2.default(1, 8));
  });

  it('should throw an error in case of NaN or Infinity', function () {
    _assert2.default.throws(function () {
      math.fraction(Infinity);
    }, /Error: Infinity cannot be represented as a fraction/);
    _assert2.default.throws(function () {
      math.fraction(-Infinity);
    }, /Error: -Infinity cannot be represented as a fraction/);
    _assert2.default.throws(function () {
      math.fraction(NaN);
    }, /Error: NaN cannot be represented as a fraction/);
  });
});

function equalFraction(a, b) {
  var msg = a.toString() + ' !== ' + b.toString();
  _assert2.default.strictEqual(a.s, b.s, msg);
  _assert2.default.strictEqual(a.n, b.n, msg);
  _assert2.default.strictEqual(a.d, b.d, msg);
}
