"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {};
var pi = _index.indexjs.pi;
var atanh = _index.indexjs.atanh;
var tanh = _index.indexjs.tanh;
var complex = _index.indexjs.complex;
var matrix = _index.indexjs.matrix;
var unit = _index.indexjs.unit;
var bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 });
var biggermath = _index.indexjs.create({ precision: 21 });
var predmath = _index.indexjs.create({ predictable: true });
var atanhBig = bigmath.atanh;
var Big = bigmath.bignumber;

describe('atanh', function () {
  it('should return the hyperbolic arctan of a boolean', function () {
    _assert2.default.equal(atanh(true), Infinity);
    _assert2.default.equal(atanh(false), 0);
  });

  it('should return the hyperbolic arctan of null', function () {
    _assert2.default.equal(atanh(null), 0);
  });

  it('should return the hyperbolic arctan of a number', function () {
    approx.deepEqual(atanh(-2), complex(-0.54930614433405485, pi / 2));
    approx.deepEqual(atanh(2), complex(0.54930614433405485, -pi / 2));
    //assert.ok(isNaN(atanh(-2)));
    //assert.ok(isNaN(atanh(2)));

    approx.equal(atanh(-1), -Infinity);
    approx.equal(atanh(-0.5), -0.54930614433405484569762261846);
    approx.equal(atanh(0), 0);
    approx.equal(atanh(0.5), 0.54930614433405484569762261846);
    approx.equal(atanh(1), Infinity);
  });

  it('should return the hyperbolic arctan of a number when predictable:true', function () {
    _assert2.default.equal(_typeof(predmath.atanh(-2)), 'number');
    (0, _assert2.default)(isNaN(predmath.atanh(-2)));
  });

  it('should return the hyperbolic arctan of a bignumber', function () {
    var arg1 = Big(-1);
    var arg2 = Big(-0.5);
    _assert2.default.deepEqual(atanhBig(arg1).toString(), '-Infinity');
    _assert2.default.deepEqual(atanhBig(arg2), Big('-0.5493061443340548457'));
    _assert2.default.deepEqual(atanhBig(Big(0)), Big(0));
    _assert2.default.deepEqual(atanhBig(Big(0.5)), Big('0.5493061443340548457'));
    _assert2.default.deepEqual(atanhBig(Big(1)).toString(), 'Infinity');

    //Make sure arg was not changed
    _assert2.default.deepEqual(arg1, Big(-1));
    _assert2.default.deepEqual(arg2, Big(-0.5));
  });

  it('should be the inverse function of hyperbolic tan', function () {
    approx.equal(atanh(tanh(-1)), -1);
    approx.equal(atanh(tanh(0)), 0);
    approx.equal(atanh(tanh(0.1)), 0.1);
    approx.equal(atanh(tanh(0.5)), 0.5);
  });

  it('should be the inverse function of bignumber tanh', function () {
    _assert2.default.deepEqual(atanhBig(bigmath.tanh(Big(-0.5))), Big(-0.5));
    _assert2.default.deepEqual(atanhBig(bigmath.tanh(Big(0))), Big(0));
    _assert2.default.deepEqual(atanhBig(bigmath.tanh(Big(0.5))), Big(0.5));

    /* Pass in more digits to pi. */
    var arg = Big(-1);
    _assert2.default.deepEqual(atanhBig(biggermath.tanh(arg)), Big(-1));
    _assert2.default.deepEqual(atanhBig(biggermath.tanh(Big(0.1))), Big(0.1));
    _assert2.default.deepEqual(arg, Big(-1));

    _assert2.default.ok(atanh(Big(1.1)).isNaN());
  });

  it('should return the arctanh of a complex number', function () {
    approx.deepEqual(atanh(complex('2+3i')), complex(0.1469466662255, 1.33897252229449));
    approx.deepEqual(atanh(complex('2-3i')), complex(0.1469466662255, -1.33897252229449));
    approx.deepEqual(atanh(complex('-2+3i')), complex(-0.1469466662255, 1.33897252229449));
    approx.deepEqual(atanh(complex('-2-3i')), complex(-0.1469466662255, -1.33897252229449));
    approx.deepEqual(atanh(complex('1+i')), complex(0.402359478108525, 1.01722196789785137));
    approx.deepEqual(atanh(complex('i')), complex(0, pi / 4));

    approx.deepEqual(atanh(complex('2')), complex(0.54930614433405485, -pi / 2));
    _assert2.default.deepEqual(atanh(complex('1')), complex(Infinity, 0));
    _assert2.default.deepEqual(atanh(complex('0')), complex(0, 0));
    approx.deepEqual(atanh(complex('-2')), complex(-0.54930614433405485, pi / 2));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      atanh(unit('45deg'));
    });
    _assert2.default.throws(function () {
      atanh(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      atanh('string');
    });
  });

  it('should calculate the arctan element-wise for arrays and matrices', function () {
    var atanh101 = [-Infinity, 0, Infinity];
    _assert2.default.deepEqual(atanh([-1, 0, 1]), atanh101);
    _assert2.default.deepEqual(atanh(matrix([-1, 0, 1])), matrix(atanh101));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      atanh();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      atanh(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX atanh', function () {
    var expression = _index.indexjs.parse('atanh(0.5)');
    _assert2.default.equal(expression.toTex(), '\\tanh^{-1}\\left(0.5\\right)');
  });
});
