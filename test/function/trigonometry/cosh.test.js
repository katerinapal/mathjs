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
    cosh = math.cosh,
    bigmath = math.create({ number: 'BigNumber', precision: 20 });

describe('cosh', function () {
  it('should return the cosh of a boolean', function () {
    approx.equal(cosh(true), 1.5430806348152);
    approx.equal(cosh(false), 1);
  });

  it('should return the cosh of null', function () {
    approx.equal(cosh(null), 1);
  });

  it('should return the cosh of a number', function () {
    approx.equal(cosh(0), 1);
    approx.equal(cosh(pi), 11.591953275522);
    approx.equal(cosh(1), 1.5430806348152);
    approx.equal(cosh(2), 3.7621956910836);
    approx.equal(cosh(3), 10.067661995778);
  });

  it('should return the cosh of a bignumber', function () {
    var coshBig = bigmath.cosh;
    var Big = bigmath.bignumber;

    var arg1 = Big(-3);
    var arg9 = Big(Infinity);
    var arg10 = Big(-Infinity);
    _assert2.default.deepEqual(coshBig(arg1), Big('10.067661995777765842'));
    _assert2.default.deepEqual(coshBig(Big(-2)), Big('3.7621956910836314596'));
    _assert2.default.deepEqual(coshBig(Big(-1)), Big('1.5430806348152437785'));
    _assert2.default.deepEqual(coshBig(Big(0)), Big(1));
    _assert2.default.deepEqual(coshBig(Big(1)), Big('1.5430806348152437785'));
    _assert2.default.deepEqual(coshBig(Big(2)), Big('3.7621956910836314596'));
    _assert2.default.deepEqual(coshBig(Big(3)), Big('10.067661995777765842'));
    _assert2.default.deepEqual(coshBig(bigmath.pi).toString(), '11.591953275521520628');
    _assert2.default.deepEqual(coshBig(arg9).toString(), 'Infinity');
    _assert2.default.deepEqual(coshBig(arg10).toString(), 'Infinity');

    // Ensure args were not changed
    _assert2.default.deepEqual(arg1, Big(-3));
    _assert2.default.deepEqual(arg9.toString(), 'Infinity');
    _assert2.default.deepEqual(arg10.toString(), '-Infinity');
  });

  it('should return the cosh of a complex number', function () {
    approx.deepEqual(cosh(complex('1')), complex(1.5430806348152, 0));
    approx.deepEqual(cosh(complex('i')), complex(0.54030230586814, 0));
    approx.deepEqual(cosh(complex('2 + i')), complex(2.0327230070197, 3.0518977991518));
  });

  it('should return the cosh of an angle', function () {
    approx.equal(cosh(unit('90deg')), 2.5091784786581);
    approx.equal(cosh(unit('-45deg')), 1.324609089252);

    (0, _assert2.default)(cosh(unit(math.bignumber(90), 'deg')).isBigNumber);
    approx.equal(cosh(unit(math.bignumber(90), 'deg')).toNumber(), 2.5091784786581);

    approx.deepEqual(cosh(math.unit(complex('2 + i'), 'rad')), complex(2.0327230070197, 3.0518977991518));
  });

  it('should throw an error if called with an invalid unit', function () {
    _assert2.default.throws(function () {
      cosh(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      cosh('string');
    });
  });

  var cosh123 = [1.5430806348152, 3.7621956910836, 10.067661995778];

  it('should return the cosh of each element of an array', function () {
    approx.deepEqual(cosh([1, 2, 3]), cosh123);
  });

  it('should return the cosh of each element of a matrix', function () {
    approx.deepEqual(cosh(matrix([1, 2, 3])), matrix(cosh123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      cosh();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      cosh(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX cosh', function () {
    var expression = math.parse('cosh(1)');
    _assert2.default.equal(expression.toTex(), '\\cosh\\left(1\\right)');
  });
});
