'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var BigNumber = math.type.BigNumber;
var Complex = math.type.Complex;
var DenseMatrix = math.type.DenseMatrix;
var Unit = math.type.Unit;
var sum = math.sum;

describe('sum', function () {

  it('should return the sum of numbers', function () {
    _assert2.default.equal(sum(5), 5);
    _assert2.default.equal(sum(3, 1), 4);
    _assert2.default.equal(sum(1, 3), 4);
    _assert2.default.equal(sum(1, 3, 5, 2), 11);
    _assert2.default.equal(sum(0, 0, 0, 0), 0);
  });

  it('should return the sum of big numbers', function () {
    _assert2.default.deepEqual(sum(new BigNumber(1), new BigNumber(3), new BigNumber(5), new BigNumber(2)), new BigNumber(11));
  });

  it('should return the sum of strings (convert them to numbers)', function () {
    _assert2.default.strictEqual(sum('2', '3', '4', '5'), 14);
    _assert2.default.strictEqual(sum([['2', '3'], ['4', '5']]), 14);
  });

  it('should return the sum of complex numbers', function () {
    _assert2.default.deepEqual(sum(new Complex(2, 3), new Complex(-1, 2)), new Complex(1, 5));
  });

  it('should return the sum of mixed numbers and complex numbers', function () {
    _assert2.default.deepEqual(sum(2, new Complex(-1, 3)), new Complex(1, 3));
  });

  it('should return the sum from an array', function () {
    _assert2.default.equal(sum([1, 3, 5, 2, -5]), 6);
  });

  it('should return the sum of units', function () {
    _assert2.default.deepEqual(sum([new Unit(5, 'mm'), new Unit(10, 'mm'), new Unit(15, 'mm')]), new Unit(30, 'mm'));
  });

  it('should return the sum from an 1d matrix', function () {
    _assert2.default.equal(sum(new DenseMatrix([1, 3, 5, 2, -5])), 6);
  });

  it('should return the sum element from a 2d array', function () {
    _assert2.default.deepEqual(sum([[1, 4, 7], [3, 0, 5], [-1, 11, 9]]), 39);
  });

  it('should return the sum element from a 2d matrix', function () {
    _assert2.default.deepEqual(sum(new DenseMatrix([[1, 4, 7], [3, 0, 5], [-1, 11, 9]])), 39);
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      sum();
    });
    _assert2.default.throws(function () {
      sum([], 2, 3);
    });
  });

  it('should throw an error if called with not yet supported argument dim', function () {
    _assert2.default.throws(function () {
      sum([], 2);
    }, /not yet supported/);
  });

  it('should return zero if called with an empty array', function () {
    var bigMath = math.create({ number: 'BigNumber' });
    var fracMath = math.create({ number: 'Fraction' });

    var big = bigMath.sum([]);
    var frac = fracMath.sum([]);

    _assert2.default.equal(sum([]), 0);
    _assert2.default.equal(big.type, 'BigNumber');
    _assert2.default.equal(frac.type, 'Fraction');
    _assert2.default.equal(math.equal(bigMath.sum([]), new BigNumber(0)).valueOf(), true);
    _assert2.default.equal(math.equal(fracMath.sum([]), new fracMath.type.Fraction(0)), true);
  });

  it('should LaTeX sum', function () {
    var expression = math.parse('sum(1,2,3)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{sum}\\left(1,2,3\\right)');
  });
});
