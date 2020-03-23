"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = _index.indexjs.bignumber;
var fraction = _index.indexjs.fraction;
var complex = _index.indexjs.complex;

describe('sign', function () {
  it('should calculate the sign of a boolean', function () {
    _assert2.default.equal(_index.indexjs.sign(true), 1);
    _assert2.default.equal(_index.indexjs.sign(false), 0);
  });

  it('should calculate the sign of null', function () {
    _assert2.default.equal(_index.indexjs.sign(null), 0);
  });

  it('should calculate the sign of a number', function () {
    _assert2.default.equal(_index.indexjs.sign(3), 1);
    _assert2.default.equal(_index.indexjs.sign(-3), -1);
    _assert2.default.equal(_index.indexjs.sign(0), 0);
  });

  it('should calculate the sign of a big number', function () {
    _assert2.default.deepEqual(_index.indexjs.sign(bignumber(3)), bignumber(1));
    _assert2.default.deepEqual(_index.indexjs.sign(bignumber(-3)), bignumber(-1));
    _assert2.default.deepEqual(_index.indexjs.sign(bignumber(0)), bignumber(0));
  });

  it('should calculate the sign of a fraction', function () {
    var a = fraction(0.5);
    (0, _assert2.default)(_index.indexjs.sign(a) instanceof _index.indexjs.type.Fraction);
    _assert2.default.equal(_index.indexjs.sign(a).toString(), '1');
    _assert2.default.equal(_index.indexjs.sign(fraction(-0.5)).toString(), '-1');
    _assert2.default.equal(a.toString(), '0.5');
  });

  it('should calculate the sign of a complex value', function () {
    (0, _approx.deepEqual)(_index.indexjs.sign(_index.indexjs.complex(2, -3)), _index.indexjs.complex(0.554700196225229, -0.832050294337844));
  });

  it('should calculate the sign of a unit', function () {
    _assert2.default.equal(_index.indexjs.sign(_index.indexjs.unit('5 cm')), 1);
    _assert2.default.equal(_index.indexjs.sign(_index.indexjs.unit('-5 kg')), -1);
    _assert2.default.equal(_index.indexjs.sign(_index.indexjs.unit('0 mol/s')), 0);
    _assert2.default.equal(_index.indexjs.sign(_index.indexjs.unit('-283.15 degC')), -1);
    _assert2.default.equal(_index.indexjs.sign(_index.indexjs.unit('-273.15 degC')), 0);
    _assert2.default.equal(_index.indexjs.sign(_index.indexjs.unit('-263.15 degC')), 1);

    _assert2.default.deepEqual(_index.indexjs.sign(_index.indexjs.unit(bignumber(5), 'cm')), bignumber(1));
    _assert2.default.deepEqual(_index.indexjs.sign(_index.indexjs.unit(bignumber(-5), 'cm')), bignumber(-1));
    _assert2.default.deepEqual(_index.indexjs.sign(_index.indexjs.unit(fraction(5), 'cm')), fraction(1));
    _assert2.default.deepEqual(_index.indexjs.sign(_index.indexjs.unit(fraction(-5), 'cm')), fraction(-1));

    _assert2.default.deepEqual(_index.indexjs.sign(_index.indexjs.unit(complex(3, 4), 'mi')), complex(0.6, 0.8));
  });

  it('should throw an error when used with a string', function () {
    _assert2.default.throws(function () {
      _index.indexjs.sign("hello world");
    });
  });

  it('should return a matrix of the signs of each elements in the given array', function () {
    _assert2.default.deepEqual(_index.indexjs.sign([-2, -1, 0, 1, 2]), [-1, -1, 0, 1, 1]);
  });

  it('should return a matrix of the signs of each elements in the given matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.sign(_index.indexjs.matrix([-2, -1, 0, 1, 2])), _index.indexjs.matrix([-1, -1, 0, 1, 1]));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.sign();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.sign(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX sign', function () {
    var expression = _index.indexjs.parse('sign(-4)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{sign}\\left(-4\\right)');
  });
});
