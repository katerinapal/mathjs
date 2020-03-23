"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pi = _index.indexjs.pi;
var acos = _index.indexjs.acos;
var cos = _index.indexjs.cos;
var complex = _index.indexjs.complex;
var matrix = _index.indexjs.matrix;
var unit = _index.indexjs.unit;
var bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 });
var mathPredictable = _index.indexjs.create({ predictable: true });
var acosBig = bigmath.acos;
var cosBig = bigmath.cos;
var Big = bigmath.bignumber;

describe('acos', function () {
  it('should return the arccos of a boolean', function () {
    approx.equal(acos(true), 0);
    approx.equal(acos(false), 0.5 * pi);
  });

  it('should return the arccos of null', function () {
    approx.equal(acos(null), 0.5 * pi);
  });

  it('should return the arccos of a number', function () {
    approx.equal(acos(-1) / pi, 1);
    approx.equal(acos(-0.5) / pi, 2 / 3);
    approx.equal(acos(0) / pi, 0.5);
    approx.equal(acos(0.5) / pi, 1 / 3);
    approx.equal(acos(1) / pi, 0);

    approx.deepEqual(acos(-2), complex('3.14159265358979 - 1.31695789692482i'));
    approx.deepEqual(acos(2), complex('1.316957896924817i'));
  });

  it('should return the arccos of a number when predictable:true', function () {
    _assert2.default.equal(_typeof(mathPredictable.acos(-2)), 'number');
    (0, _assert2.default)(isNaN(mathPredictable.acos(-2)));
  });

  it('should return the arccos of a bignumber', function () {
    var arg = Big(-1);
    _assert2.default.deepEqual(acosBig(arg).toString(), bigmath.pi.toString());
    _assert2.default.deepEqual(acosBig(Big(-0.5)), Big('2.0943951023931954923'));
    _assert2.default.deepEqual(acosBig(Big(0)), Big('1.5707963267948966192'));
    _assert2.default.deepEqual(acosBig(Big(0.5)), Big('1.0471975511965977462'));
    _assert2.default.deepEqual(acosBig(Big(1)), Big(0));

    // Hit Newton's method case
    bigmath.config({ precision: 61 });
    _assert2.default.deepEqual(acosBig(Big(0.00000001)), Big('1.570796316794896619231321524973084775431910533020886243820359'));
    // Wolfram:                                     1.5707963167948966192313215249730847754319105330208862438203592009158129650174844596314777278941600852176250962802
    //Make sure arg was not changed
    _assert2.default.deepEqual(arg, Big(-1));
  });

  it('should be the inverse function of cos', function () {
    approx.equal(acos(cos(-1)), 1);
    approx.equal(acos(cos(0)), 0);
    approx.equal(acos(cos(0.1)), 0.1);
    approx.equal(acos(cos(0.5)), 0.5);
    approx.equal(acos(cos(2)), 2);
  });

  it('should be the inverse function of bignumber cos', function () {
    bigmath.config({ precision: 20 });
    _assert2.default.deepEqual(acosBig(cosBig(Big(-1))), Big(1));
    _assert2.default.deepEqual(acosBig(cosBig(Big(0))), Big('0'));
    _assert2.default.deepEqual(acosBig(cosBig(Big(0.1))), Big('0.099999999999999999956'));
    _assert2.default.deepEqual(acosBig(cosBig(Big(0.5))), Big('0.49999999999999999999'));
    _assert2.default.deepEqual(acosBig(cosBig(Big(2))), Big(2));
  });

  it('should return for bignumber cos for x > 1', function () {
    _assert2.default.ok(acos(Big(1.1)).isNaN());
    _assert2.default.ok(acos(Big(-1.1)).isNaN());
  });

  it('should return the arccos of a complex number', function () {
    approx.deepEqual(acos(complex('2+3i')), complex(1.00014354247380, -1.98338702991654));
    approx.deepEqual(acos(complex('2-3i')), complex(1.00014354247380, 1.98338702991654));
    approx.deepEqual(acos(complex('-2+3i')), complex(2.14144911111600, -1.98338702991654));
    approx.deepEqual(acos(complex('-2-3i')), complex(2.14144911111600, 1.98338702991654));
    approx.deepEqual(acos(complex('i')), complex(1.570796326794897, -0.881373587019543));
    approx.deepEqual(acos(complex('1')), complex(0, 0));
    approx.deepEqual(acos(complex('1+i')), complex(0.904556894302381, -1.061275061905036));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      acos(unit('45deg'));
    });
    _assert2.default.throws(function () {
      acos(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      acos('string');
    });
  });

  it('should calculate the arccos element-wise for arrays and matrices', function () {
    // note: the results of acos(2) and acos(3) differs in octave
    // the next tests are verified with mathematica
    var acos123 = [0, complex(0, 1.316957896924817), complex(0, 1.762747174039086)];
    approx.deepEqual(acos([1, 2, 3]), acos123);
    approx.deepEqual(acos(matrix([1, 2, 3])), matrix(acos123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      acos();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      acos(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX acos', function () {
    var expression = _index.indexjs.parse('acos(1)');
    _assert2.default.equal(expression.toTex(), '\\cos^{-1}\\left(1\\right)');
  });
});
