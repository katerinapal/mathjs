'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    approx = require('../../../tools/approx'),
    pi = math.pi,
    complex = math.complex,
    matrix = math.matrix,
    unit = math.unit,
    sech = math.sech,
    bigmath = math.create({ precision: 20 }),
    biggermath = math.create({ number: 'BigNumber', precision: 21 });

describe('sech', function () {
  it('should return the sech of a boolean', function () {
    approx.equal(sech(true), 0.64805427366389);
    approx.equal(sech(false), 1);
  });

  it('should return the sech of null', function () {
    approx.equal(sech(null), 1);
  });

  it('should return the sech of a number', function () {
    approx.equal(sech(0), 1);
    approx.equal(sech(pi), 0.086266738334054);
    approx.equal(sech(1), 0.64805427366389);
    approx.equal(sech(2), 0.26580222883408);
    approx.equal(sech(3), 0.099327927419433);
  });

  it('should return the sech of a bignumber', function () {
    var sechBig = bigmath.sech;
    var Big = bigmath.bignumber;

    _assert2.default.deepEqual(sechBig(Big(0)), Big(1));
    _assert2.default.deepEqual(sechBig(Big(1)), Big('0.64805427366388539957'));
    _assert2.default.deepEqual(sechBig(Big(2)), Big('0.26580222883407969212'));
    _assert2.default.deepEqual(sechBig(Big(3)), Big('0.099327927419433207829'));

    /* Pass in extra digits to pi. */
    _assert2.default.deepEqual(sechBig(biggermath.pi), Big('0.086266738334054414697'));
  });

  it('should return the sech of a complex number', function () {
    approx.deepEqual(sech(complex('1')), complex(0.64805427366389, 0));
    approx.deepEqual(sech(complex('i')), complex(1.8508157176809, 0));
    approx.deepEqual(sech(complex('2 + i')), complex(0.15117629826558, -0.22697367539372));
  });

  it('should return the sech of an angle', function () {
    approx.equal(sech(unit('90deg')), 0.39853681533839);
    approx.equal(sech(unit('-45deg')), 0.75493970871413);

    (0, _assert2.default)(sech(unit(math.bignumber(90), 'deg')).isBigNumber);
    approx.equal(sech(unit(math.bignumber(90), 'deg')).toNumber(), 0.39853681533839);

    approx.deepEqual(sech(unit(complex('2 + i'), 'rad')), complex(0.15117629826558, -0.22697367539372));
  });

  it('should throw an error if called with an invalid unit', function () {
    _assert2.default.throws(function () {
      sech(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      sech('string');
    });
  });

  var sech123 = [0.64805427366389, 0.26580222883408, 0.099327927419433];

  it('should return the sech of each element of an array', function () {
    approx.deepEqual(sech([1, 2, 3]), sech123);
  });

  it('should return the sech of each element of a matrix', function () {
    approx.deepEqual(sech(matrix([1, 2, 3])), matrix(sech123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      sech();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      sech(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX sech', function () {
    var expression = math.parse('sech(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{sech}\\left(1\\right)');
  });
});
