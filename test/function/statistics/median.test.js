"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigNumber = math.type.BigNumber;
var Complex = math.type.Complex;
var DenseMatrix = math.type.DenseMatrix;
var Unit = math.type.Unit;
var median = math.median;

describe('median', function () {

  it('should return the median of an even number of numbers', function () {
    _assert2.default.equal(median(3, 1), 2);
    _assert2.default.equal(median(1, 3), 2);
    (0, _approx.equal)(median(1, 3, 5, 2), 2.5);
    _assert2.default.equal(median(0, 0, 0, 0), 0);
  });

  it('should return the median of an odd number of numbers', function () {
    _assert2.default.equal(median(0), 0);
    _assert2.default.equal(median(5), 5);
    (0, _approx.equal)(median(1, 3, 5, 2, -1), 2);
    _assert2.default.equal(median(0, 0, 0), 0);
  });

  it('should return the median of an even number of new BigNumbers', function () {
    _assert2.default.deepEqual(median(new BigNumber(1), new BigNumber(4), new BigNumber(5), new BigNumber(2)), new BigNumber(3));
  });

  it('should return the median of an odd number of new BigNumbers', function () {
    _assert2.default.deepEqual(median(new BigNumber(1), new BigNumber(4), new BigNumber(2)), new BigNumber(2));
  });

  it('should return the median of an even number of booleans', function () {
    _assert2.default.strictEqual(median(true, true, false, false), 0.5);
  });

  it('should return the median of an odd number of booleans', function () {
    _assert2.default.strictEqual(median(true, true, false), 1);
  });

  it('should return the median from an array', function () {
    _assert2.default.equal(median([1, 3, 5, 2, -5]), 2);
  });

  it('should return the median of units', function () {
    _assert2.default.deepEqual(median([new Unit(5, 'mm'), new Unit(15, 'mm'), new Unit(10, 'mm')]), new Unit(10, 'mm'));
    _assert2.default.deepEqual(median([new Unit(5, 'mm'), new Unit(30, 'mm'), new Unit(20, 'mm'), new Unit(10, 'mm')]), new Unit(15, 'mm'));
  });

  it('should return the median from an 1d matrix', function () {
    _assert2.default.equal(median(new DenseMatrix([1, 3, 5, 2, -5])), 2);
  });

  it('should return the median from a 2d array', function () {
    (0, _approx.equal)(median([[1, 4, 7], [3, 0, 5]]), 3.5);
  });

  it('should return the median from a 2d matrix', function () {
    (0, _approx.equal)(median(new DenseMatrix([[1, 4, 7], [3, 0, 5]])), 3.5);
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      median();
    });
    _assert2.default.throws(function () {
      median([], 2, 3);
    });
  });

  it('should throw an error when called multiple arrays or matrices', function () {
    _assert2.default.throws(function () {
      median([1, 2], [3, 4]);
    }, /Scalar values expected/);
    _assert2.default.throws(function () {
      median(math.matrix([1, 2]), math.matrix([3, 4]));
    }, /Scalar values expected/);
  });

  it('should throw an error if called with not yet supported argument dim', function () {
    _assert2.default.throws(function () {
      median([], 2);
    }, /not yet supported/);
  });

  it('should throw an error if called with unsupported type of arguments', function () {
    _assert2.default.throws(function () {
      median(new Date(), 2, 3);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      median(new Complex(2, 3), new Complex(-1, 2));
    }, /TypeError: No ordering relation is defined for complex numbers/);
  });

  it('should throw an error if called with an empty array', function () {
    _assert2.default.throws(function () {
      median([]);
    });
  });

  it('should not mutate the input', function () {
    var a = [3, 2, 1];
    var b = median(a);
    _assert2.default.deepEqual(a, [3, 2, 1]);
  });

  it('should LaTeX median', function () {
    var expression = math.parse('median(1,2,3,4)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{median}\\left(1,2,3,4\\right)');
  });
});
