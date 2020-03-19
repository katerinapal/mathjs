'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('im', function () {

  it('should return the imaginary part of a complex number', function () {
    _assert2.default.equal(math.im(math.complex(2, 3)), 3);
    _assert2.default.equal(math.im(math.complex(-2, -3)), -3);
    _assert2.default.equal(math.im(math.i), 1);
  });

  it('should return the imaginary part of a real number', function () {
    _assert2.default.equal(math.im(2), 0);
  });

  it('should return the imaginary part of a big number', function () {
    _assert2.default.deepEqual(math.im(math.bignumber(2)), math.bignumber(0));
  });

  it('should return the imaginary part of a boolean', function () {
    _assert2.default.equal(math.im(true), 0);
    _assert2.default.equal(math.im(false), 0);
  });

  it('should return the imaginary part of null', function () {
    _assert2.default.equal(math.im(null), 0);
  });

  it('should return the imaginary part of a boolean', function () {
    _assert2.default.equal(math.im(true), 0);
    _assert2.default.equal(math.im(false), 0);
  });

  it('should return the imaginary part for each element in a matrix', function () {
    _assert2.default.deepEqual(math.im([2, math.complex('3-6i')]), [0, -6]);
    _assert2.default.deepEqual(math.im(math.matrix([2, math.complex('3-6i')])).valueOf(), [0, -6]);
  });

  it('should throw an error when called with an unsupported type of argument', function () {
    _assert2.default.throws(function () {
      math.im(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      math.im(math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      math.im();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      math.im(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX im', function () {
    var expression = math.parse('im(1+i)');
    _assert2.default.equal(expression.toTex(), '\\Im\\left\\lbrace1+ i\\right\\rbrace');
  });
});
