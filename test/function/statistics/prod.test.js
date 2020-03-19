'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigNumber = math.type.BigNumber;
var Complex = math.type.Complex;
var DenseMatrix = math.type.DenseMatrix;
var Unit = math.type.Unit;
var prod = math.prod;

describe('prod', function () {

  it('should return the product of numbers', function () {
    _assert2.default.equal(prod(5), 5);
    _assert2.default.equal(prod(3, 2), 6);
    _assert2.default.equal(prod(1, 3, 5, 2), 30);
    _assert2.default.equal(prod(1, 3, 0, 2), 0);
    _assert2.default.equal(prod(0, 0, 0, 0), 0);
  });

  it('should return the product of big numbers', function () {
    _assert2.default.deepEqual(prod(new BigNumber(1), new BigNumber(3), new BigNumber(5), new BigNumber(2)), new BigNumber(30));
  });

  it('should return the product of complex numbers', function () {
    _assert2.default.deepEqual(prod(new Complex(2, 3), new Complex(-1, 2)), new Complex(-8, 1));
  });

  it('should return the product of mixed numbers and complex numbers', function () {
    _assert2.default.deepEqual(prod(2, new Complex(2, 3)), new Complex(4, 6));
  });

  it('should return the prod from an array', function () {
    _assert2.default.equal(prod([1, 3, 5, 2]), 30);
  });

  it('should return the prod from an 1d matrix', function () {
    _assert2.default.equal(prod(new DenseMatrix([1, 3, 5, 2])), 30);
  });

  it('should return the prod element from a 2d array', function () {
    _assert2.default.deepEqual(prod([[1, 7, 2], [3, 5, 4]]), 840);
  });

  it('should return the prod element from a 2d matrix', function () {
    _assert2.default.deepEqual(prod(new DenseMatrix([[1, 7, 2], [3, 5, 4]])), 840);
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      prod();
    });
    _assert2.default.throws(function () {
      prod([], 2, 3);
    });
  });

  it('should throw an error if called with not yet supported argument dim', function () {
    _assert2.default.throws(function () {
      prod([], 2);
    }, /not yet supported/);
  });

  it('should throw an error if called with an empty array', function () {
    _assert2.default.throws(function () {
      prod([]);
    });
  });

  it('should LaTeX prod', function () {
    var expression = math.parse('prod(1,2,3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{prod}\\left(1,2,3\\right)');
  });
});
