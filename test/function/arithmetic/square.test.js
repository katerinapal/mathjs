'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var unit = math.unit;
var bignumber = math.bignumber;
var fraction = math.fraction;
var matrix = math.matrix;
var range = math.range;
var square = math.square;

describe('square', function () {
  it('should return the square of a boolean', function () {
    _assert2.default.equal(square(true), 1);
    _assert2.default.equal(square(false), 0);
  });

  it('should return the square of null', function () {
    _assert2.default.equal(square(null), 0);
  });

  it('should return the square of a number', function () {
    _assert2.default.equal(square(4), 16);
    _assert2.default.equal(square(-2), 4);
    _assert2.default.equal(square(0), 0);
  });

  it('should return the square of a big number', function () {
    _assert2.default.deepEqual(square(bignumber(4)), bignumber(16));
    _assert2.default.deepEqual(square(bignumber(-2)), bignumber(4));
    _assert2.default.deepEqual(square(bignumber(0)), bignumber(0));
  });

  it('should return the square of a fraction', function () {
    var a = fraction(0.5);
    (0, _assert2.default)(square(a) instanceof math.type.Fraction);
    _assert2.default.equal(square(a).toString(), '0.25');
    _assert2.default.equal(a.toString(), '0.5');
  });

  it('should throw an error if used with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      square();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      square(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should return the square of a complex number', function () {
    _assert2.default.deepEqual(square(math.complex('2i')), math.complex('-4'));
    _assert2.default.deepEqual(square(math.complex('2+3i')), math.complex('-5+12i'));
    _assert2.default.deepEqual(square(math.complex('2')), math.complex('4'));
  });

  it('should return the square of a unit', function () {
    _assert2.default.equal(square(math.unit('4 cm')).toString(), '16 cm^2');
    _assert2.default.equal(square(math.unit('-2 cm')).toString(), '4 cm^2');
    _assert2.default.equal(square(math.unit('0 cm')).toString(), '0 cm^2');
  });

  it('should throw an error when used with a string', function () {
    _assert2.default.throws(function () {
      square('text');
    });
  });

  it('should return the square of each element in a matrix', function () {
    _assert2.default.deepEqual(square([2, 3, 4, 5]), [4, 9, 16, 25]);
    _assert2.default.deepEqual(square(matrix([2, 3, 4, 5])), matrix([4, 9, 16, 25]));
    _assert2.default.deepEqual(square(matrix([[1, 2], [3, 4]])), matrix([[1, 4], [9, 16]]));
  });

  it('should LaTeX square', function () {
    var expression = math.parse('square(4)');
    _assert2.default.equal(expression.toTex(), '\\left(4\\right)^2');
  });
});
