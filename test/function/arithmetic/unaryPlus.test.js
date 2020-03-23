"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');
var bignumber = _index.indexjs.bignumber;
var fraction = _index.indexjs.fraction;

describe('unaryPlus', function () {
  it('should return unary plus of a boolean', function () {
    _assert2.default.equal(_index.indexjs.unaryPlus(true), 1);
    _assert2.default.equal(_index.indexjs.unaryPlus(false), 0);
  });

  it('should return unary plus of null', function () {
    _assert2.default.equal(_index.indexjs.unaryPlus(null), 0);
  });

  it.skip('should return bignumber unary plus of a boolean', function () {
    var bigmath = _index.indexjs.create({ number: 'BigNumber' });
    _assert2.default.deepEqual(bigmath.unaryPlus(true), bigmath.bignumber(1));
    _assert2.default.deepEqual(bigmath.unaryPlus(false), bigmath.bignumber(0));
  });

  // TODO: this is temporary until the test above works again
  it('should return bignumber unary plus of a boolean', function () {
    var bigmath = _index.indexjs.create({ number: 'BigNumber' });
    var a = bigmath.unaryPlus(true);
    (0, _assert2.default)(a instanceof _index.indexjs.type.BigNumber);
    _assert2.default.deepEqual(a.toString(), '1');

    var b = bigmath.unaryPlus(false);
    (0, _assert2.default)(b instanceof _index.indexjs.type.BigNumber);
    _assert2.default.deepEqual(b.toString(), '0');
  });

  it('should return unary plus on a string', function () {
    _assert2.default.equal(_index.indexjs.unaryPlus('2'), 2);
    _assert2.default.equal(_index.indexjs.unaryPlus('-2'), -2);
  });

  it.skip('should return bignumber unary plus on a string', function () {
    var bigmath = _index.indexjs.create({ number: 'BigNumber' });
    _assert2.default.deepEqual(bigmath.unaryPlus('2'), bigmath.bignumber(2));
    _assert2.default.deepEqual(bigmath.unaryPlus('-2'), bigmath.bignumber(-2));
  });

  // TODO: this is temporary until the test above works again
  it('should return bignumber unary plus on a string', function () {
    var bigmath = _index.indexjs.create({ number: 'BigNumber' });
    var a = bigmath.unaryPlus('2');
    (0, _assert2.default)(a instanceof _index.indexjs.type.BigNumber);
    _assert2.default.deepEqual(a.toString(), '2');

    var b = bigmath.unaryPlus('-2');
    (0, _assert2.default)(b instanceof _index.indexjs.type.BigNumber);
    _assert2.default.deepEqual(b.toString(), '-2');
  });

  it('should perform unary plus of a number', function () {
    _assert2.default.deepEqual(_index.indexjs.unaryPlus(2), 2);
    _assert2.default.deepEqual(_index.indexjs.unaryPlus(-2), -2);
    _assert2.default.deepEqual(_index.indexjs.unaryPlus(0), 0);
  });

  it('should perform unary plus of a big number', function () {
    _assert2.default.deepEqual(_index.indexjs.unaryPlus(bignumber(2)), bignumber(2));
    _assert2.default.deepEqual(_index.indexjs.unaryPlus(bignumber(-2)), bignumber(-2));
    _assert2.default.deepEqual(_index.indexjs.unaryPlus(bignumber(0)).valueOf(), bignumber(0).valueOf());
  });

  it('should perform unary plus of a fraction', function () {
    var a = fraction(0.5);
    (0, _assert2.default)(_index.indexjs.unaryPlus(a) instanceof _index.indexjs.type.Fraction);
    _assert2.default.equal(a.toString(), '0.5');

    _assert2.default.equal(_index.indexjs.unaryPlus(fraction(0.5)).toString(), '0.5');
    _assert2.default.equal(_index.indexjs.unaryPlus(fraction(-0.5)).toString(), '-0.5');
  });

  it('should perform unary plus of a complex number', function () {
    _assert2.default.equal(_index.indexjs.unaryPlus(_index.indexjs.complex(3, 2)), '3 + 2i');
    _assert2.default.equal(_index.indexjs.unaryPlus(_index.indexjs.complex(3, -2)), '3 - 2i');
    _assert2.default.equal(_index.indexjs.unaryPlus(_index.indexjs.complex(-3, 2)), '-3 + 2i');
    _assert2.default.equal(_index.indexjs.unaryPlus(_index.indexjs.complex(-3, -2)), '-3 - 2i');
  });

  it('should perform unary plus of a unit', function () {
    _assert2.default.equal(_index.indexjs.unaryPlus(_index.indexjs.unit(5, 'km')).toString(), '5 km');
  });

  it('should perform element-wise unary plus on a matrix', function () {
    a2 = _index.indexjs.matrix([[1, 2], [3, 4]]);
    var a7 = _index.indexjs.unaryPlus(a2);
    _assert2.default.ok(a7 instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(a7.size(), [2, 2]);
    _assert2.default.deepEqual(a7.valueOf(), [[1, 2], [3, 4]]);
    _assert2.default.deepEqual(_index.indexjs.unaryPlus([[1, 2], [3, 4]]), [[1, 2], [3, 4]]);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.unaryPlus();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.unaryPlus(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of argument', function () {
    _assert2.default.throws(function () {
      _index.indexjs.unaryPlus(new Date());
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX unaryPlus', function () {
    var expression = _index.indexjs.parse('unaryPlus(1)');
    _assert2.default.equal(expression.toTex(), '+\\left(1\\right)');
  });
});
