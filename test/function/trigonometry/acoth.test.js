"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pi = _index.indexjs.pi;
var acoth = _index.indexjs.acoth;
var coth = _index.indexjs.coth;
var complex = _index.indexjs.complex;
var matrix = _index.indexjs.matrix;
var unit = _index.indexjs.unit;
var bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 });
var biggermath = _index.indexjs.create({ precision: 21 });
var predmath = _index.indexjs.create({ predictable: true });
var acothBig = bigmath.acoth;
var Big = bigmath.bignumber;

describe('acoth', function () {
  it('should return the hyperbolic arccot of a boolean', function () {
    _assert2.default.equal(acoth(true), Infinity);
    approx.deepEqual(acoth(false), complex(0, pi / 2));
    //assert.ok(isNaN(acoth(false)));
  });

  it('should return the hyperbolic arccot of null', function () {
    approx.deepEqual(acoth(null), complex(0, pi / 2));
    //assert.ok(isNaN(acoth(null)));
  });

  it('should return the hyperbolic arccot of a number', function () {
    approx.deepEqual(acoth(0), complex(0, pi / 2));
    approx.deepEqual(acoth(0.5), complex(0.5493061443340548, -1.5707963267949));
    //assert.ok(isNaN(acoth(0)));
    //assert.ok(isNaN(acoth(0.5)));

    (0, _approx.equal)(acoth(-2), -0.54930614433405484569762261846);
    _assert2.default.equal(acoth(-1), -Infinity);
    _assert2.default.equal(acoth(1), Infinity);
    (0, _approx.equal)(acoth(2), 0.54930614433405484569762261846);
    _assert2.default.equal(acoth(Infinity), 0);
  });

  it('should return the hyperbolic arccot of a number when predictable:true', function () {
    _assert2.default.equal(_typeof(predmath.acoth(0.5)), 'number');
    (0, _assert2.default)(isNaN(predmath.acoth(0.5)));
  });

  it('should return the hyperbolic arccot of a bignumber', function () {
    var arg2 = Big(-2);
    var arg3 = Big(-1);
    _assert2.default.deepEqual(acothBig(Big(-Infinity)), Big('-0'));
    _assert2.default.deepEqual(acothBig(arg2), Big('-0.5493061443340548457'));
    _assert2.default.deepEqual(acothBig(arg3).toString(), '-Infinity');
    _assert2.default.deepEqual(acothBig(Big(1)).toString(), 'Infinity');
    _assert2.default.deepEqual(acothBig(Big(2)), Big('0.5493061443340548457'));
    _assert2.default.deepEqual(acothBig(Big(Infinity)), Big(0));

    //Make sure arg was not changed
    _assert2.default.deepEqual(arg2, Big(-2));
    _assert2.default.deepEqual(arg3, Big(-1));

    // out of range
    _assert2.default.ok(acothBig(Big(-0.5)).isNaN());
    _assert2.default.ok(acothBig(Big(0.5)).isNaN());
  });

  it('should be the inverse function of hyperbolic cot', function () {
    (0, _approx.equal)(acoth(coth(-2)), -2);
    (0, _approx.equal)(acoth(coth(-1)), -1);
    (0, _approx.equal)(acoth(coth(0)), 0);
    (0, _approx.equal)(acoth(coth(1)), 1);
    (0, _approx.equal)(acoth(coth(2)), 2);
  });

  it('should be the inverse function of bignumber coth', function () {
    _assert2.default.deepEqual(acothBig(bigmath.coth(Big(-1))), Big(-1));
    _assert2.default.deepEqual(acothBig(bigmath.coth(Big(0))), Big(0));
    _assert2.default.deepEqual(acothBig(bigmath.coth(Big(1))), Big(1));

    /* Pass in more digits to pi. */
    _assert2.default.deepEqual(acothBig(biggermath.coth(Big(-2))), Big('-2.0000000000000000001'));
    _assert2.default.deepEqual(acothBig(biggermath.coth(Big(2))), Big('2.0000000000000000001'));
  });

  it('should return the arccoth of a complex number', function () {
    approx.deepEqual(acoth(complex('2+3i')), complex(0.1469466662255, -0.2318238045004));
    approx.deepEqual(acoth(complex('2-3i')), complex(0.1469466662255, 0.2318238045004));
    approx.deepEqual(acoth(complex('-2+3i')), complex(-0.1469466662255, -0.2318238045004));
    approx.deepEqual(acoth(complex('-2-3i')), complex(-0.1469466662255, 0.2318238045004));
    approx.deepEqual(acoth(complex('1+i')), complex(0.4023594781085251, -0.55357435889705));
    approx.deepEqual(acoth(complex('i')), complex(0, -pi / 4));
    _assert2.default.deepEqual(acoth(complex('1')), complex(Infinity, 0));
    approx.deepEqual(acoth(complex('0.5')), complex(0.5493061443340548, -1.5707963267949));
    approx.deepEqual(acoth(complex('0')), complex(0, pi / 2));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      acoth(unit('45deg'));
    });
    _assert2.default.throws(function () {
      acoth(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      acoth('string');
    });
  });

  it('should calculate the arccot element-wise for arrays and matrices', function () {
    var acoth123 = [Infinity, 0.54930614433405, 0.34657359027997];
    approx.deepEqual(acoth([1, 2, 3]), acoth123);
    approx.deepEqual(acoth(matrix([1, 2, 3])), matrix(acoth123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      acoth();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      acoth(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX acoth', function () {
    var expression = _index.indexjs.parse('acoth(2)');
    _assert2.default.equal(expression.toTex(), '\\coth^{-1}\\left(2\\right)');
  });
});
