"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var pi = math.pi;
var complex = math.complex;
var matrix = math.matrix;
var unit = math.unit;
var asin = math.asin;
var sin = math.sin;
var bigmath = math.create({ number: 'BigNumber', precision: 20 });
var biggermath = math.create({ precision: 21 });
var predmath = math.create({ predictable: true });
var asinBig = bigmath.asin;
var Big = bigmath.bignumber;

describe('asin', function () {
  it('should return the arcsin of a boolean', function () {
    (0, _approx.equal)(asin(true), 0.5 * pi);
    _assert2.default.equal(asin(false), 0);
  });

  it('should return the arcsin of null', function () {
    _assert2.default.equal(asin(null), 0);
  });

  it('should return the arcsin of a number', function () {
    (0, _approx.equal)(asin(-1) / pi, -0.5);
    (0, _approx.equal)(asin(-0.5) / pi, -1 / 6);
    (0, _approx.equal)(asin(0) / pi, 0);
    (0, _approx.equal)(asin(0.5) / pi, 1 / 6);
    (0, _approx.equal)(asin(1) / pi, 0.5);

    approx.deepEqual(asin(-2), complex('-1.57079632679490 + 1.31695789692482i'));
    approx.deepEqual(asin(2), complex('1.57079632679490 - 1.31695789692482i'));
  });

  it('should return the arccos of a number when predictable:true', function () {
    _assert2.default.equal(_typeof(predmath.asin(-2)), 'number');
    (0, _assert2.default)(isNaN(predmath.asin(-2)));
  });

  it('should return the arcsin of a bignumber', function () {
    var arg1 = Big(-1);
    var arg2 = Big(-0.581);
    var arg3 = Big(-0.5);

    _assert2.default.deepEqual(asinBig(arg1), Big('-1.5707963267948966192'));
    _assert2.default.deepEqual(asinBig(arg2), Big('-0.61995679945225370036'));
    _assert2.default.deepEqual(asinBig(arg3), Big('-0.52359877559829887308'));
    _assert2.default.deepEqual(asinBig(Big(0)), Big(0));
    _assert2.default.deepEqual(asinBig(Big(0.5)), Big('0.52359877559829887308'));
    _assert2.default.deepEqual(asinBig(Big(0.581)), Big('0.61995679945225370036'));
    _assert2.default.deepEqual(asinBig(Big(1)), Big('1.5707963267948966192'));

    // Make sure args were not changed
    _assert2.default.deepEqual(arg1, Big(-1));
    _assert2.default.deepEqual(arg2, Big(-0.581));
    _assert2.default.deepEqual(arg3, Big(-0.5));

    // Hit Newton's method case
    bigmath.config({ precision: 61 });

    var arg4 = Big(0.00000001);
    _assert2.default.deepEqual(asinBig(arg4), Big('1.00000000000000001666666666666666741666666666666671130952381e-8'));
    _assert2.default.deepEqual(arg4, Big(0.00000001));
  });

  it('should be the inverse function of sin', function () {
    (0, _approx.equal)(asin(sin(-1)), -1);
    (0, _approx.equal)(asin(sin(0)), 0);
    (0, _approx.equal)(asin(sin(0.1)), 0.1);
    (0, _approx.equal)(asin(sin(0.5)), 0.5);
    (0, _approx.equal)(asin(sin(2)), 1.14159265358979);
  });

  it('should be the inverse function of bignumber sin', function () {
    // More Newton's method test cases
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(-2))), Big('-1.141592653589793238462643383279502884197169399375105820974945'));
    // Wolfram:                                         - 1.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(-0.5))), Big('-0.5'));
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(-0.1))), Big('-0.1'));
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(0.1))), Big('0.1'));
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(0.5))), Big('0.5'));
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(2))), Big('1.141592653589793238462643383279502884197169399375105820974945'));

    // Full decimal Taylor test cases
    bigmath.config({ precision: 20 });
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(0))), Big(0));
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(0.1))), Big(0.1));
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(0.5))), Big(0.5));
    _assert2.default.deepEqual(asinBig(bigmath.sin(Big(2))), Big('1.1415926535897932385'));

    _assert2.default.deepEqual(asinBig(biggermath.sin(Big(-1))), Big('-1'));

    // outside of real range
    _assert2.default.ok(asin(Big(1.1)).isNaN());
  });

  it('should return the arcsin of a complex number', function () {
    var re = 0.570652784321099;
    var im = 1.983387029916536;
    approx.deepEqual(asin(complex('2+3i')), complex(re, im));
    approx.deepEqual(asin(complex('2-3i')), complex(re, -im));
    approx.deepEqual(asin(complex('-2+3i')), complex(-re, im));
    approx.deepEqual(asin(complex('-2-3i')), complex(-re, -im));
    approx.deepEqual(asin(complex('i')), complex(0, 0.881373587019543));
    approx.deepEqual(asin(complex('1')), complex(1.57079632679490, 0));
    approx.deepEqual(asin(complex('1+i')), complex(0.666239432492515, 1.061275061905036));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      asin(unit('45deg'));
    });
    _assert2.default.throws(function () {
      asin(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      asin('string');
    });
  });

  it('should calculate the arcsin element-wise for arrays and matrices', function () {
    // note: the results of asin(2) and asin(3) differs in octave
    // the next tests are verified with mathematica
    var asin123 = [1.57079632679490, complex(1.57079632679490, -1.31695789692482), complex(1.57079632679490, -1.76274717403909)];
    approx.deepEqual(asin([1, 2, 3]), asin123);
    approx.deepEqual(asin(matrix([1, 2, 3])), matrix(asin123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      asin();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      asin(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX asin', function () {
    var expression = math.parse('asin(0.5)');
    _assert2.default.equal(expression.toTex(), '\\sin^{-1}\\left(0.5\\right)');
  });
});
