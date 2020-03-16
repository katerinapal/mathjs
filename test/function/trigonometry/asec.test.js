'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');
var math = require('../../../index');
var approx = require('../../../tools/approx');
var pi = math.pi;
var asec = math.asec;
var sec = math.sec;
var complex = math.complex;
var matrix = math.matrix;
var unit = math.unit;
var bigmath = math.create({ number: 'BigNumber', precision: 20 });
var biggermath = math.create({ precision: 21 });
var predmath = math.create({ predictable: true });
var asecBig = bigmath.asec;
var Big = bigmath.bignumber;

describe('asec', function () {
  it('should return the arcsec of a boolean', function () {
    _assert2.default.equal(asec(true), 0);
    _assert2.default.deepEqual(asec(false), complex(0, Infinity));
    //assert.ok(isNaN(asec(false)));
  });

  it('should return the arcsec of null', function () {
    _assert2.default.deepEqual(asec(null), complex(0, Infinity));
    //assert.ok(isNaN(asec(null)));
  });

  it('should return the arcsec of a number', function () {
    approx.equal(asec(-2) / pi, 2 / 3);
    approx.equal(asec(-1) / pi, 1);
    approx.equal(asec(1) / pi, 0);
    approx.equal(asec(2) / pi, 1 / 3);

    approx.deepEqual(asec(-0.5), complex(pi, -1.3169578969248));
    approx.deepEqual(asec(0.5), complex(0, 1.3169578969248));
  });

  it('should return the arcsec of a number when predictable:true', function () {
    _assert2.default.equal(_typeof(predmath.asec(0.5)), 'number');
    (0, _assert2.default)(isNaN(predmath.asec(0.5)));
  });

  it('should return the arcsec of a bignumber', function () {
    var arg1 = Big(-2);
    var arg2 = Big(-1);
    _assert2.default.deepEqual(asecBig(arg1).toString(), bigmath.tau.div(3).toString());
    _assert2.default.deepEqual(asecBig(arg2).toString(), bigmath.pi.toString());
    _assert2.default.deepEqual(asecBig(Big(1)), Big(0));
    _assert2.default.deepEqual(asecBig(Big(2)).toString(), bigmath.pi.div(3).toString());

    //Make sure arg was not changed
    _assert2.default.deepEqual(arg1, Big(-2));
    _assert2.default.deepEqual(arg2, Big(-1));

    // Hit Newton's method case
    bigmath.config({ precision: 64 });
    var arg = Big('3.00000001');
    _assert2.default.deepEqual(asecBig(Big(3)), bigmath.bignumber('1.230959417340774682134929178247987375710340009355094839055548334'));
    // wolfram:                  asec(3) = 1.2309594173407746821349291782479873757103400093550948390555483336639923144782560878532516201708609211389442794492
    _assert2.default.deepEqual(asecBig(arg), Big('1.230959418519285979938614206185297709155969929825366328254265441'));
    // wolfram:                         1.2309594185192859799386142061852977091559699298253663282542654408321080017053701257305273449373991752616248450522
    _assert2.default.deepEqual(arg, Big(3.00000001));

    // out of range
    _assert2.default.ok(asec(Big(0.5)).isNaN());
    _assert2.default.ok(asec(Big(0)).isNaN());
    _assert2.default.ok(asec(Big(-0.5)).isNaN());
  });

  it('should be the inverse function of sec', function () {
    approx.equal(asec(sec(-1)), 1);
    approx.equal(asec(sec(0)), 0);
    approx.equal(asec(sec(0.1)), 0.1);
    approx.equal(asec(sec(0.5)), 0.5);
    approx.equal(asec(sec(2)), 2);
  });

  it('should be the inverse function of bignumber sec', function () {
    bigmath.config({ precision: 20 });
    _assert2.default.deepEqual(asecBig(bigmath.sec(Big(-1))), Big(1));
    _assert2.default.deepEqual(asecBig(bigmath.sec(Big(0))), Big(0));
    _assert2.default.deepEqual(asecBig(bigmath.sec(Big(0.5))), Big('0.49999999999999999997'));
    _assert2.default.deepEqual(asecBig(bigmath.sec(Big(2))), Big(2));
  });

  it('should return the arcsec of a complex number', function () {
    approx.deepEqual(asec(complex('2+3i')), complex(1.42041072246703, 0.23133469857397));
    approx.deepEqual(asec(complex('2-3i')), complex(1.42041072246703, -0.23133469857397));
    approx.deepEqual(asec(complex('-2+3i')), complex(1.7211819311228, 0.2313346985739733));
    approx.deepEqual(asec(complex('-2-3i')), complex(1.7211819311228, -0.2313346985739733));
    approx.deepEqual(asec(complex('i')), complex(1.570796326794897, 0.881373587019543));
    approx.deepEqual(asec(complex('1+i')), complex(1.1185178796437059, 0.530637530952517826));
    approx.deepEqual(asec(complex('1')), complex(0, 0));
    approx.deepEqual(asec(complex('0.5')), complex(0, 1.3169578969248));
    approx.deepEqual(asec(complex('0')), complex(0, Infinity));
    approx.deepEqual(asec(complex('-0.5')), complex(pi, -1.3169578969248));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      asec(unit('45deg'));
    });
    _assert2.default.throws(function () {
      asec(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      asec('string');
    });
  });

  it('should calculate the arcsec element-wise for arrays and matrices', function () {
    var asec123 = [0, pi / 3, 1.23095941734077468];
    approx.deepEqual(asec([1, 2, 3]), asec123);
    approx.deepEqual(asec(matrix([1, 2, 3])), matrix(asec123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      asec();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      asec(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX asec', function () {
    var expression = math.parse('asec(2)');
    _assert2.default.equal(expression.toTex(), '\\sec^{-1}\\left(2\\right)');
  });
});
