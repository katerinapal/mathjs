'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var BigNumber = math.type.BigNumber;
var Complex = math.type.Complex;
var DenseMatrix = math.type.DenseMatrix;
var Unit = math.type.Unit;
var variance = math['var'];

describe('variance', function () {

  it('should return the variance of numbers', function () {
    _assert2.default.equal(variance(5), 0);
    _assert2.default.equal(variance(2, 4, 6), 4);
  });

  it('should return the variance of big numbers', function () {
    _assert2.default.deepEqual(variance(new BigNumber(2), new BigNumber(4), new BigNumber(6)), new math.type.BigNumber(4));
  });

  it('should return the variance of complex numbers', function () {
    _assert2.default.deepEqual(variance(new Complex(2, 3), new Complex(-1, 2)), new Complex(4, 3));
  });

  it('should return the variance of mixed numbers and complex numbers', function () {
    _assert2.default.deepEqual(variance(2, new Complex(-1, 3)), new Complex(0, -9));
  });

  it('should return the variance from an array', function () {
    _assert2.default.equal(variance([2, 4, 6]), 4);
    _assert2.default.equal(variance([5]), 0);
  });

  it('should return the uncorrected variance from an array', function () {
    _assert2.default.equal(variance([2, 4], 'uncorrected'), 1);
    _assert2.default.equal(variance([2, 4, 6, 8], 'uncorrected'), 5);
  });

  it('should return the biased variance from an array', function () {
    _assert2.default.equal(variance([2, 8], 'biased'), 6);
    _assert2.default.equal(variance([2, 4, 6, 8], 'biased'), 4);
  });

  it('should throw an error in case of unknown type of normalization', function () {
    _assert2.default.throws(function () {
      variance([2, 8], 'foo');
    }, /Unknown normalization/);
  });

  it('should return the variance from an 1d matrix', function () {
    _assert2.default.equal(variance(new DenseMatrix([2, 4, 6])), 4);
    _assert2.default.equal(variance(new DenseMatrix([5])), 0);
  });

  it('should return the variance element from a 2d array', function () {
    _assert2.default.deepEqual(variance([[2, 4, 6], [1, 3, 5]]), 3.5);
  });

  it('should return the variance element from a 2d matrix', function () {
    _assert2.default.deepEqual(variance(new DenseMatrix([[2, 4, 6], [1, 3, 5]])), 3.5);
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      variance();
    });
    _assert2.default.throws(function () {
      variance([], 2, 3);
    });
  });

  it('should throw an error if called with invalid type of arguments', function () {
    _assert2.default.throws(function () {
      variance(new Date(), 2);
    }, /TypeError/);
    _assert2.default.throws(function () {
      variance(new Unit('5cm'), new Unit('10cm'));
    }, /TypeError/);
    _assert2.default.throws(function () {
      variance([2, 3, 4], 5);
    }, /Unknown normalization "5"/);
  });

  it('should throw an error if called with an empty array', function () {
    _assert2.default.throws(function () {
      variance([]);
    });
  });

  it('should LaTeX var', function () {
    var expression = math.parse('var(1,2,3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{Var}\\left(1,2,3\\right)');
  });
});
