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
    acot = _index.indexjs.acot,
    cot = _index.indexjs.cot,
    bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 }),
    acotBig = bigmath.acot,
    cotBig = bigmath.cot,
    Big = bigmath.bignumber;

describe('acot', function () {
  it('should return the arccot of a boolean', function () {
    approx.equal(acot(true), pi / 4);
    _assert2.default.equal(acot(false), pi / 2);
  });

  it('should return the arccot of null', function () {
    _assert2.default.equal(acot(null), pi / 2);
  });

  it('should return the arccot of a number', function () {
    approx.equal(acot(-1) / pi, -0.25);
    approx.equal(acot(-0.5), -1.107148717794);
    _assert2.default.equal(acot(0), pi / 2);
    approx.equal(acot(0.5), 1.107148717794);
    approx.equal(acot(1) / pi, 0.25);

    _assert2.default.equal(acot(-Infinity), 0);
    _assert2.default.equal(acot(Infinity), 0);
  });

  it('should return the arccot of a bignumber', function () {
    var arg2 = Big(-1);
    var arg3 = Big(-0.5);
    var arg4 = Big(0);
    var arg7 = Big(2);
    var arg8 = Big(Infinity);

    _assert2.default.deepEqual(acotBig(Big(-2)), Big('-0.46364760900080611621'));
    _assert2.default.deepEqual(acotBig(arg2), Big('-0.78539816339744830962'));
    _assert2.default.deepEqual(acotBig(arg3), Big('-1.107148717794090503'));
    _assert2.default.deepEqual(acotBig(arg4).toString(), '1.5707963267948966192');
    _assert2.default.deepEqual(acotBig(Big(1)), Big('0.78539816339744830962'));
    _assert2.default.deepEqual(acotBig(arg7), Big('0.46364760900080611621'));
    _assert2.default.deepEqual(acotBig(arg8), Big(0));

    // Ensure the arguments where not changed
    _assert2.default.deepEqual(arg2, Big(-1));
    _assert2.default.deepEqual(arg3, Big(-0.5));
    _assert2.default.deepEqual(arg4, Big(0));
    _assert2.default.deepEqual(arg7, Big(2));
    _assert2.default.deepEqual(arg8.toString(), 'Infinity');

    // Hit Newton's method case
    bigmath.config({ precision: 61 });
    _assert2.default.deepEqual(acotBig(Big(1.1)), Big('0.7378150601204649138136281298033902035827333552504444896340492'));
  });

  it('should be the inverse function of cot', function () {
    approx.equal(acot(cot(-1)), -1);
    approx.equal(acot(cot(0)), 0);
    approx.equal(acot(cot(0.1)), 0.1);
    approx.equal(acot(cot(0.5)), 0.5);
    approx.equal(acot(cot(2)), -1.14159265358979);
  });

  it('should be the inverse function of bignumber cot', function () {
    bigmath.config({ precision: 20 });
    _assert2.default.deepEqual(acotBig(cotBig(Big(-1))), Big(-1));
    _assert2.default.deepEqual(acotBig(cotBig(Big(0))), Big(0));
    _assert2.default.deepEqual(acotBig(cotBig(Big(0.1))), Big(0.1));
    _assert2.default.deepEqual(acotBig(cotBig(Big(0.5))), Big(0.5));
    _assert2.default.deepEqual(acotBig(cotBig(Big(2))), Big('-1.1415926535897932385'));
    _assert2.default.deepEqual(acotBig(cotBig(bigmath.pi.div(2).minus(1e-10))).toString(), '1.5707963266948966193');
    _assert2.default.deepEqual(acotBig(cotBig(bigmath.pi.div(2))).toString(), '-1.570796326794895205');
  });

  it('should return the arccot of a complex number', function () {
    var re = 0.160875277198321;
    var im = 0.229072682968539;
    approx.deepEqual(acot(complex('2+3i')), complex(re, -im));
    approx.deepEqual(acot(complex('2-3i')), complex(re, im));
    approx.deepEqual(acot(complex('-2+3i')), complex(-re, -im));
    approx.deepEqual(acot(complex('-2-3i')), complex(-re, im));
    _assert2.default.deepEqual(acot(complex('i')), complex(0, -Infinity));
    approx.deepEqual(acot(complex('1')), complex(pi / 4, 0));
    approx.deepEqual(acot(complex('1+i')), complex(0.553574358897, -0.4023594781085));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      acot(unit('45deg'));
    });
    _assert2.default.throws(function () {
      acot(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      acot('string');
    });
  });

  it('should calculate the arccot element-wise for arrays and matrices', function () {
    // matrix, array, range
    var acot123 = [pi / 4, 0.4636476090008, 0.3217505543966];
    approx.deepEqual(acot([1, 2, 3]), acot123);
    approx.deepEqual(acot(matrix([1, 2, 3])), matrix(acot123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      acot();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      acot(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX acot', function () {
    var expression = _index.indexjs.parse('acot(2)');
    _assert2.default.equal(expression.toTex(), '\\cot^{-1}\\left(2\\right)');
  });
});
