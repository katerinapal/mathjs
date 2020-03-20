"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pi = _index.indexjs.pi;
var acosh = _index.indexjs.acosh;
var cosh = _index.indexjs.cosh;
var complex = _index.indexjs.complex;
var matrix = _index.indexjs.matrix;
var unit = _index.indexjs.unit;
var bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 });
var biggermath = _index.indexjs.create({ precision: 22 });
var predmath = _index.indexjs.create({ predictable: true });
var acoshBig = bigmath.acosh;
var Big = bigmath.bignumber;

describe('acosh', function () {
  it('should return the hyperbolic arccos of a boolean', function () {
    _assert2.default.equal(acosh(true), 0);
    approx.deepEqual(acosh(false), complex(0, pi / 2));
    //assert.ok(isNaN(acosh(false)));
  });

  it('should return the hyperbolic arccos of null', function () {
    approx.deepEqual(acosh(null), complex(0, pi / 2));
    //assert.ok(isNaN(acosh(null)));
  });

  it('should return the hyperbolic arccos of a number', function () {
    approx.deepEqual(acosh(-2), complex(1.31695789692481670862504634730797, pi));
    approx.deepEqual(acosh(0), complex(0, pi / 2));
    //assert.ok(isNaN(acosh(-2)));
    //assert.ok(isNaN(acosh(0)));

    approx.equal(acosh(1), 0);
    approx.equal(acosh(2), 1.31695789692481670862504634730797);
    approx.equal(acosh(3), 1.7627471740390860504652186499595);
    approx.equal(acosh(pi), 1.811526272460853107021852049305);
  });

  it('should return NaN for values out of range and predictable:true', function () {
    _assert2.default.equal(_typeof(predmath.acosh(-2)), 'number');
    (0, _assert2.default)(isNaN(predmath.acosh(-2)));
  });

  it('should return the hyperbolic arccos of a bignumber', function () {
    var arg = Big(1);
    _assert2.default.deepEqual(acosh(arg), Big(0));
    _assert2.default.deepEqual(acoshBig(Big(2)), Big('1.3169578969248167086'));
    _assert2.default.deepEqual(acoshBig(Big(3)), Big('1.7627471740390860505'));
    _assert2.default.deepEqual(acoshBig(bigmath.pi).toString(), '1.811526272460853107');

    //Make sure arg was not changed
    _assert2.default.deepEqual(arg, Big(1));
  });

  it('should be the inverse function of hyperbolic cos', function () {
    approx.equal(acosh(cosh(-1)), 1);
    approx.equal(acosh(cosh(0)), 0);
    approx.equal(acosh(cosh(0.1)), 0.1);
    approx.equal(acosh(cosh(0.5)), 0.5);
    approx.equal(acosh(cosh(2)), 2);
  });

  it('should be the inverse function of bignumber cosh', function () {
    _assert2.default.deepEqual(acoshBig(bigmath.cosh(Big(-1))), Big(1));
    _assert2.default.deepEqual(acoshBig(bigmath.cosh(Big(0))), Big(0));
    _assert2.default.deepEqual(acoshBig(bigmath.cosh(Big(2))), Big(2));

    // Pass in extra digit
    var arg = Big(0.1);
    _assert2.default.deepEqual(acoshBig(biggermath.cosh(arg)), Big('0.10000000000000000012'));
    _assert2.default.deepEqual(acoshBig(biggermath.cosh(Big(0.5))), Big('0.49999999999999999995'));
    _assert2.default.deepEqual(arg, Big(0.1));
  });

  it('should throw an error if the bignumber result is complex', function () {
    _assert2.default.ok(acosh(Big(0.5).isNaN()));
    _assert2.default.ok(acosh(Big(-0.5).isNaN()));
  });

  it('should return the arccosh of a complex number', function () {
    approx.deepEqual(acosh(complex('2+3i')), complex(1.9833870299165, 1.000143542473797));
    approx.deepEqual(acosh(complex('2-3i')), complex(1.9833870299165, -1.000143542473797));
    approx.deepEqual(acosh(complex('-2+3i')), complex(1.9833870299165, 2.14144911111600));
    approx.deepEqual(acosh(complex('-2-3i')), complex(1.9833870299165, -2.14144911111600));
    approx.deepEqual(acosh(complex('1+i')), complex(1.061275061905036, 0.904556894302381));
    approx.deepEqual(acosh(complex('i')), complex(0.881373587019543, 1.570796326794897));
    _assert2.default.deepEqual(acosh(complex('1')), complex(0, 0));
    approx.deepEqual(acosh(complex('0')), complex(0, pi / 2));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      acosh(unit('45deg'));
    });
    _assert2.default.throws(function () {
      acosh(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      acosh('string');
    });
  });

  it('should calculate the arccos element-wise for arrays and matrices', function () {
    var acosh123 = [0, 1.3169578969248167, 1.7627471740390860504];
    approx.deepEqual(acosh([1, 2, 3]), acosh123);
    approx.deepEqual(acosh(matrix([1, 2, 3])), matrix(acosh123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      acosh();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      acosh(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX acosh', function () {
    var expression = _index.indexjs.parse('acosh(1)');
    _assert2.default.equal(expression.toTex(), '\\cosh^{-1}\\left(1\\right)');
  });
});
