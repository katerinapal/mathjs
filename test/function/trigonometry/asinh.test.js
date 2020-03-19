"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    pi = _index.indexjs.pi,
    asinh = _index.indexjs.asinh,
    sinh = _index.indexjs.sinh,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    unit = _index.indexjs.unit,
    bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 }),
    biggermath = _index.indexjs.create({ precision: 21 }),
    asinhBig = bigmath.asinh,
    Big = bigmath.bignumber;

describe('asinh', function () {
  it('should return the hyperbolic arcsin of a boolean', function () {
    (0, _approx.equal)(asinh(true), 0.8813735870195430);
    _assert2.default.equal(asinh(false), 0);
  });

  it('should return the hyperbolic arcsin of null', function () {
    _assert2.default.equal(asinh(null), 0);
  });

  it('should return the hyperbolic arcsin of a number', function () {
    (0, _approx.equal)(asinh(-2), -1.44363547517881034249327674027311);
    (0, _approx.equal)(asinh(-1), -0.88137358701954302523260932497979);
    (0, _approx.equal)(asinh(0), 0);
    (0, _approx.equal)(asinh(1), 0.88137358701954302523260932497979);
    (0, _approx.equal)(asinh(2), 1.44363547517881034249327674027311);
    (0, _approx.equal)(asinh(pi), 1.8622957433108482198883613251826);
  });

  it('should return the hyperbolic arcsin of a bignumber', function () {
    var arg = Big(-2);
    _assert2.default.deepEqual(asinhBig(arg), Big('-1.4436354751788103425'));
    _assert2.default.deepEqual(asinhBig(Big(-1)), Big('-0.88137358701954302523'));
    _assert2.default.deepEqual(asinhBig(Big(0)), Big(0));
    _assert2.default.deepEqual(asinhBig(Big(1)), Big('0.88137358701954302523'));
    _assert2.default.deepEqual(asinhBig(Big(2)), Big('1.4436354751788103425'));
    _assert2.default.deepEqual(asinhBig(bigmath.pi).toString(), '1.8622957433108482199');

    //Make sure arg was not changed
    _assert2.default.deepEqual(arg, Big(-2));
  });

  it('should be the inverse function of hyperbolic sin', function () {
    (0, _approx.equal)(asinh(sinh(-1)), -1);
    (0, _approx.equal)(asinh(sinh(0)), 0);
    (0, _approx.equal)(asinh(sinh(0.1)), 0.1);
    (0, _approx.equal)(asinh(sinh(0.5)), 0.5);
    (0, _approx.equal)(asinh(sinh(2)), 2);
  });

  it('should be the inverse function of bignumber sinh', function () {
    _assert2.default.deepEqual(asinhBig(bigmath.sinh(Big(-1))), Big(-1));
    _assert2.default.deepEqual(asinhBig(bigmath.sinh(Big(0))), Big(0));
    _assert2.default.deepEqual(asinhBig(bigmath.sinh(Big(0.5))), Big(0.5));
    _assert2.default.deepEqual(asinhBig(bigmath.sinh(Big(2))), Big(2));

    /* Pass in more digits to pi. */
    _assert2.default.deepEqual(asinhBig(biggermath.sinh(Big(0.1))), Big('0.099999999999999999996'));
  });

  it('should return the arcsinh of a complex number', function () {
    approx.deepEqual(asinh(complex('2+3i')), complex(1.9686379257931, 0.9646585044076028));
    approx.deepEqual(asinh(complex('2-3i')), complex(1.9686379257931, -0.9646585044076028));
    approx.deepEqual(asinh(complex('-2+3i')), complex(-1.9686379257931, 0.9646585044076028));
    approx.deepEqual(asinh(complex('-2-3i')), complex(-1.9686379257931, -0.9646585044076028));
    approx.deepEqual(asinh(complex('1+i')), complex(1.0612750619050357, 0.6662394324925153));
    approx.deepEqual(asinh(complex('i')), complex(0, pi / 2));
    approx.deepEqual(asinh(complex('1')), complex(0.881373587019543025, 0));
    _assert2.default.deepEqual(asinh(complex('0')), complex(0, 0));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      asinh(unit('45deg'));
    });
    _assert2.default.throws(function () {
      asinh(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      asinh('string');
    });
  });

  it('should calculate the arcsin element-wise for arrays and matrices', function () {
    var asinh123 = [0.881373587019543025, 1.4436354751788103, 1.8184464592320668];
    approx.deepEqual(asinh([1, 2, 3]), asinh123);
    approx.deepEqual(asinh(matrix([1, 2, 3])), matrix(asinh123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      asinh();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      asinh(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX asinh', function () {
    var expression = _index.indexjs.parse('asinh(2)');
    _assert2.default.equal(expression.toTex(), '\\sinh^{-1}\\left(2\\right)');
  });
});
