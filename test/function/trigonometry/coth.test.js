"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    pi = math.pi,
    complex = math.complex,
    matrix = math.matrix,
    unit = math.unit,
    coth = math.coth,
    bigmath = math.create({ precision: 20 }),
    biggermath = math.create({ number: 'BigNumber', precision: 21 });

describe('coth', function () {
  it('should return the coth of a boolean', function () {
    (0, _approx.equal)(coth(true), 1.3130352854993);
    (0, _approx.equal)(coth(false), Number.POSITIVE_INFINITY);
  });

  it('should return the coth of null', function () {
    (0, _approx.equal)(coth(null), Number.POSITIVE_INFINITY);
  });

  it('should return the coth of a number', function () {
    (0, _approx.equal)(coth(0), Number.POSITIVE_INFINITY);
    (0, _approx.equal)(coth(pi), 1.0037418731973);
    (0, _approx.equal)(coth(1), 1.3130352854993);
    (0, _approx.equal)(coth(2), 1.0373147207275);
    (0, _approx.equal)(coth(3), 1.0049698233137);
  });

  it('should return the coth of a bignumber', function () {
    var cothBig = bigmath.coth;
    var Big = bigmath.bignumber;
    _assert2.default.deepEqual(cothBig(Big(0)).toString(), 'Infinity');
    _assert2.default.deepEqual(cothBig(Big(1)), Big('1.3130352854993313036'));
    _assert2.default.deepEqual(cothBig(Big(2)), Big('1.0373147207275480959'));
    _assert2.default.deepEqual(cothBig(Big(3)), Big('1.0049698233136891711'));

    /* Pass in extra digits to pi. */
    _assert2.default.deepEqual(cothBig(biggermath.pi), Big('1.0037418731973212882'));
  });

  it('should return the coth of a complex number', function () {
    (0, _approx.equal)(coth(complex('1')), complex(1.3130352854993, 0));
    (0, _approx.equal)(coth(complex('i')), complex(0, -0.64209261593433));
    (0, _approx.equal)(coth(complex('2 + i')), complex(0.98432922645819, -0.032797755533753));
  });

  it('should return the coth of an angle', function () {
    (0, _approx.equal)(coth(unit('90deg')), 1.0903314107274);
    (0, _approx.equal)(coth(unit('-45deg')), -1.5248686188221);

    (0, _assert2.default)(coth(unit(math.bignumber(90), 'deg')).isBigNumber);
    (0, _approx.equal)(coth(unit(math.bignumber(90), 'deg')).toNumber(), 1.0903314107274);

    (0, _approx.equal)(coth(math.unit(complex('2 + i'), 'rad')), complex(0.98432922645819, -0.032797755533753));
  });

  it('should throw an error if called with an invalid unit', function () {
    _assert2.default.throws(function () {
      coth(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      coth('string');
    });
  });

  var coth123 = [1.3130352854993, 1.0373147207275, 1.0049698233137];

  it('should return the coth of each element of an array', function () {
    (0, _approx.equal)(coth([1, 2, 3]), coth123);
  });

  it('should return the coth of each element of a matrix', function () {
    (0, _approx.equal)(coth(matrix([1, 2, 3])), matrix(coth123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      coth();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      coth(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX coth', function () {
    var expression = math.parse('coth(1)');
    _assert2.default.equal(expression.toTex(), '\\coth\\left(1\\right)');
  });
});
