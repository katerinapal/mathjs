"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var BigNumber = math.type.BigNumber;
var Complex = math.type.Complex;
var DenseMatrix = math.type.DenseMatrix;
var Unit = math.type.Unit;
var std = math.std;

describe('std', function () {

  it('should return the standard deviation of numbers', function () {
    _assert2.default.equal(std(5), 0);
    _assert2.default.equal(std(2, 4, 6), 2);
  });

  it('should return the standard deviation of big numbers', function () {
    _assert2.default.deepEqual(std(new BigNumber(2), new BigNumber(4), new BigNumber(6)), new math.type.BigNumber(2));
  });

  it('should return the standard deviation of complex numbers', function () {
    //
    (0, _approx.deepEqual)(std(new Complex(2, 4), new Complex(4, 2)), new Complex(1.41421, -1.41421));
  });

  it('should return the standard deviation of mixed numbers and complex numbers', function () {
    (0, _approx.deepEqual)(std(2, new Complex(6, 4)), new Complex(2.82842, 2.82842));
  });

  it('should return the standard deviation from an array', function () {
    _assert2.default.equal(std([2, 4, 6]), 2);
    _assert2.default.equal(std([5]), 0);
  });

  it('should return the uncorrected variance from an array', function () {
    _assert2.default.equal(std([2, 4], 'uncorrected'), 1);
    _assert2.default.equal(std([2, 4, 6, 8], 'uncorrected'), Math.sqrt(5));
  });

  it('should return the biased standard deviation from an array', function () {
    _assert2.default.equal(std([2, 8], 'biased'), Math.sqrt(6));
    _assert2.default.equal(std([2, 4, 6, 8], 'biased'), 2);
  });

  it('should throw an error in case of unknown type of normalization', function () {
    _assert2.default.throws(function () {
      std([2, 8], 'foo');
    }, /Unknown normalization/);
  });

  it('should return the standard deviation from an 1d matrix', function () {
    _assert2.default.equal(std(new DenseMatrix([2, 4, 6])), 2);
    _assert2.default.equal(std(new DenseMatrix([5])), 0);
  });

  it('should return the standard deviation element from a 2d array', function () {
    _assert2.default.deepEqual(std([[2, 4, 6], [1, 3, 5]]), Math.sqrt(3.5));
  });

  it('should return the standard deviation element from a 2d matrix', function () {
    _assert2.default.deepEqual(std(new DenseMatrix([[2, 4, 6], [1, 3, 5]])), Math.sqrt(3.5));
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      std();
    });
    _assert2.default.throws(function () {
      std([], 2, 3);
    });
  });

  it('should throw an error if called with invalid type of arguments', function () {
    _assert2.default.throws(function () {
      std(new Date(), 2);
    }, TypeError);
    _assert2.default.throws(function () {
      std(new Unit('5cm'), new Unit('10cm'));
    }, TypeError);
    _assert2.default.throws(function () {
      std([2, 3, 4], 5);
    }, /Unknown normalization "5"/);
  });

  it('should throw an error if called with an empty array', function () {
    _assert2.default.throws(function () {
      std([]);
    });
  });

  it('should LaTeX std', function () {
    var expression = math.parse('std(1,2,3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{std}\\left(1,2,3\\right)');
  });
});
