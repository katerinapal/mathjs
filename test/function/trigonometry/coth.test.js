"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    pi = _index.indexjs.pi,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    unit = _index.indexjs.unit,
    coth = _index.indexjs.coth,
    bigmath = _index.indexjs.create({ precision: 20 }),
    biggermath = _index.indexjs.create({ number: 'BigNumber', precision: 21 });

describe('coth', function () {
  it('should return the coth of a boolean', function () {
    approx.equal(coth(true), 1.3130352854993);
    approx.equal(coth(false), Number.POSITIVE_INFINITY);
  });

  it('should return the coth of null', function () {
    approx.equal(coth(null), Number.POSITIVE_INFINITY);
  });

  it('should return the coth of a number', function () {
    approx.equal(coth(0), Number.POSITIVE_INFINITY);
    approx.equal(coth(pi), 1.0037418731973);
    approx.equal(coth(1), 1.3130352854993);
    approx.equal(coth(2), 1.0373147207275);
    approx.equal(coth(3), 1.0049698233137);
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
    approx.deepEqual(coth(complex('1')), complex(1.3130352854993, 0));
    approx.deepEqual(coth(complex('i')), complex(0, -0.64209261593433));
    approx.deepEqual(coth(complex('2 + i')), complex(0.98432922645819, -0.032797755533753));
  });

  it('should return the coth of an angle', function () {
    approx.equal(coth(unit('90deg')), 1.0903314107274);
    approx.equal(coth(unit('-45deg')), -1.5248686188221);

    (0, _assert2.default)(coth(unit(_index.indexjs.bignumber(90), 'deg')).isBigNumber);
    approx.equal(coth(unit(_index.indexjs.bignumber(90), 'deg')).toNumber(), 1.0903314107274);

    approx.deepEqual(coth(_index.indexjs.unit(complex('2 + i'), 'rad')), complex(0.98432922645819, -0.032797755533753));
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
    approx.deepEqual(coth([1, 2, 3]), coth123);
  });

  it('should return the coth of each element of a matrix', function () {
    approx.deepEqual(coth(matrix([1, 2, 3])), matrix(coth123));
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
    var expression = _index.indexjs.parse('coth(1)');
    _assert2.default.equal(expression.toTex(), '\\coth\\left(1\\right)');
  });
});
