"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = _index.indexjs.bignumber;
var fraction = _index.indexjs.fraction;
var complex = _index.indexjs.complex;

describe('unaryMinus', function () {
  it('should return unary minus of a boolean', function () {
    _assert2.default.equal(_index.indexjs.unaryMinus(true), -1);
    _assert2.default.equal(_index.indexjs.unaryMinus(false), 0);
  });

  // TODO: unary minus should return bignumber on boolean input when configured for bignumber
  it.skip('should return bignumber unary minus of a boolean', function () {
    var bigmath = _index.indexjs.create({ number: 'BigNumber' });
    _assert2.default.deepEqual(bigmath.unaryMinus(true), bigmath.bignumber(-1));
    _assert2.default.deepEqual(bigmath.unaryMinus(false), bigmath.bignumber(0));
  });

  it('should return unary minus of null', function () {
    _assert2.default.equal(_index.indexjs.unaryMinus(null), 0);
  });

  it('should perform unary minus of a number', function () {
    _assert2.default.deepEqual(_index.indexjs.unaryMinus(2), -2);
    _assert2.default.deepEqual(_index.indexjs.unaryMinus(-2), 2);
    _assert2.default.deepEqual(_index.indexjs.unaryMinus(0), 0);
  });

  it('should perform unary minus of a big number', function () {
    _assert2.default.deepEqual(_index.indexjs.unaryMinus(bignumber(2)), bignumber(-2));
    _assert2.default.deepEqual(_index.indexjs.unaryMinus(bignumber(-2)), bignumber(2));
    _assert2.default.deepEqual(_index.indexjs.unaryMinus(bignumber(0)).toString(), '0');
  });

  it('should perform unary minus of a fraction', function () {
    var a = fraction(0.5);
    (0, _assert2.default)(_index.indexjs.unaryMinus(a) instanceof _index.indexjs.type.Fraction);
    _assert2.default.equal(a.toString(), '0.5');

    _assert2.default.equal(_index.indexjs.unaryMinus(fraction(0.5)).toString(), '-0.5');
    _assert2.default.equal(_index.indexjs.unaryMinus(fraction(-0.5)).toString(), '0.5');
  });

  it('should perform unary minus of a complex number', function () {
    _assert2.default.equal(_index.indexjs.unaryMinus(_index.indexjs.complex(3, 2)), '-3 - 2i');
    _assert2.default.equal(_index.indexjs.unaryMinus(_index.indexjs.complex(3, -2)), '-3 + 2i');
    _assert2.default.equal(_index.indexjs.unaryMinus(_index.indexjs.complex(-3, 2)), '3 - 2i');
    _assert2.default.equal(_index.indexjs.unaryMinus(_index.indexjs.complex(-3, -2)), '3 + 2i');
  });

  it('should perform unary minus of a unit', function () {
    _assert2.default.equal(_index.indexjs.unaryMinus(_index.indexjs.unit(5, 'km')).toString(), '-5 km');
    _assert2.default.equal(_index.indexjs.unaryMinus(_index.indexjs.unit(fraction(2 / 3), 'km')).toString(), '-2/3 km');
    _assert2.default.equal(_index.indexjs.unaryMinus(_index.indexjs.unit(complex(2, -4), 'gal')).toString(), '(-2 + 4i) gal');
  });

  it('should perform element-wise unary minus on a matrix', function () {
    a2 = _index.indexjs.matrix([[1, 2], [3, 4]]);
    var a7 = _index.indexjs.unaryMinus(a2);
    _assert2.default.ok(a7 instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(a7.size(), [2, 2]);
    _assert2.default.deepEqual(a7.valueOf(), [[-1, -2], [-3, -4]]);
    _assert2.default.deepEqual(_index.indexjs.unaryMinus([[1, 2], [3, 4]]), [[-1, -2], [-3, -4]]);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.unaryMinus();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.unaryMinus(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of argument', function () {
    _assert2.default.throws(function () {
      _index.indexjs.unaryMinus(new Date());
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX unaryMinus', function () {
    var expression = _index.indexjs.parse('unaryMinus(1)');
    _assert2.default.equal(expression.toTex(), '-\\left(1\\right)');
  });
});
