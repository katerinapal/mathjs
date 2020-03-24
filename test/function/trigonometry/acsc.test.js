"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');
var pi = _index.indexjs.pi;
var complex = _index.indexjs.complex;
var matrix = _index.indexjs.matrix;
var unit = _index.indexjs.unit;
var acsc = _index.indexjs.acsc;
var csc = _index.indexjs.csc;
var bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 });
var biggermath = _index.indexjs.create({ precision: 21 });
var predmath = _index.indexjs.create({ predictable: true });
var acscBig = bigmath.acsc;
var Big = bigmath.bignumber;

describe('acsc', function () {
  it('should return the arccsc of a boolean', function () {
    approx.equal(acsc(true), pi / 2);
    _assert2.default.deepEqual(acsc(false), complex(pi / 2, Infinity));
    //assert.ok(isNaN(acsc(false)));
  });

  it('should return the arccsc of null', function () {
    _assert2.default.deepEqual(acsc(null), complex(pi / 2, Infinity));
    //assert.ok(isNaN(acsc(null)));
  });

  it('should return the arccsc of a number', function () {
    approx.equal(acsc(-2) / pi, -1 / 6);
    approx.equal(acsc(-1) / pi, -0.5);
    _assert2.default.deepEqual(acsc(0), complex(pi / 2, Infinity));
    //assert.ok(isNaN(acsc(0)));
    approx.equal(acsc(1) / pi, 0.5);
    approx.equal(acsc(2) / pi, 1 / 6);
  });

  it('should return the arccsc of a number when predictable:true', function () {
    _assert2.default.equal(_typeof(predmath.acsc(0)), 'number');
    (0, _assert2.default)(isNaN(predmath.acsc(0)));
  });

  it('should return the arccsc of a bignumber', function () {
    var arg1 = Big(-2);
    var arg2 = Big(-1.71);
    var arg3 = Big(-1);

    _assert2.default.deepEqual(acscBig(arg1), Big('-0.52359877559829887308'));
    // wolfram:                          -0.52359877559829887307710723054658381403286156656251763682915743205130273438103483310467247089035284466369134775
    _assert2.default.deepEqual(acscBig(arg2), Big('-0.62462771332471601304'));
    _assert2.default.deepEqual(acscBig(arg3), Big('-1.5707963267948966192'));
    _assert2.default.deepEqual(acscBig(Big(1)), Big('1.5707963267948966192'));
    _assert2.default.deepEqual(acscBig(Big(1.71)), Big('0.62462771332471601304'));
    _assert2.default.deepEqual(acscBig(Big(2)), Big('0.52359877559829887308'));

    // Make sure args were not changed
    _assert2.default.deepEqual(arg1, Big(-2));
    _assert2.default.deepEqual(arg2, Big(-1.71));
    _assert2.default.deepEqual(arg3, Big(-1));

    // Hit Newton's method case
    bigmath.config({ precision: 61 });

    var arg4 = Big(1.00000001);
    _assert2.default.deepEqual(acscBig(arg4), Big('1.570654905439248565373629613450057180739125884090554026623514'));
    // wolfram 1.5706549054392485653736296134500571807391258840905540266235145245693842219005187990359787187421573662444504948773
    _assert2.default.deepEqual(arg4, Big(1.00000001));

    _assert2.default.ok(acscBig(Big(0.5)).isNaN());
    _assert2.default.ok(acscBig(Big(-0.5)).isNaN());
  });

  it('should be the inverse function of csc', function () {
    approx.equal(acsc(csc(-1)), -1);
    approx.equal(acsc(csc(0)), 0);
    approx.equal(acsc(csc(0.1)), 0.1);
    approx.equal(acsc(csc(0.5)), 0.5);
    approx.equal(acsc(csc(2)), 1.14159265358979);
  });

  it('should be the inverse function of bignumber csc', function () {
    bigmath.config({ precision: 61 });
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(-2))), Big('-1.141592653589793238462643383279502884197169399375105820974946'));
    // wolfram:                                          -1.1415926535897932384626433832795028841971693993751058209749445923078164062862089986280348253421170679821480865132
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(-0.5))), Big('-0.4999999999999999999999999999999999999999999999999999999999999'));
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(-0.1))), Big(-0.1));
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(0.1))), Big(0.1));
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(0.5))), Big('0.4999999999999999999999999999999999999999999999999999999999999'));
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(2))), Big('1.141592653589793238462643383279502884197169399375105820974946'));

    // Full decimal Taylor test cases
    bigmath.config({ precision: 20 });
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(0))), Big(0));
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(0.1))), Big('0.099999999999999999997'));
    _assert2.default.deepEqual(acscBig(bigmath.csc(Big(0.5))), Big(0.5));

    // Pass in an extra digit
    _assert2.default.deepEqual(acscBig(biggermath.csc(Big(-1))), Big('-1'));
    _assert2.default.deepEqual(acscBig(biggermath.csc(Big(2))), Big('1.1415926535897932385'));
  });

  it('should return the arccsc of a complex number', function () {
    var re = 0.150385604327861963;
    var im = 0.231334698573973315;
    approx.deepEqual(acsc(complex('2+3i')), complex(re, -im));
    approx.deepEqual(acsc(complex('2-3i')), complex(re, im));
    approx.deepEqual(acsc(complex('-2+3i')), complex(-re, -im));
    approx.deepEqual(acsc(complex('-2-3i')), complex(-re, im));
    approx.deepEqual(acsc(complex('1+i')), complex(0.4522784471511907, -0.53063753095251783));
    approx.deepEqual(acsc(complex('i')), complex(0, -0.881373587019543));

    approx.deepEqual(acsc(complex('-1')), complex(-pi / 2, 0));
    approx.deepEqual(acsc(complex('-0.5')), complex(-pi / 2, 1.3169578969248));
    _assert2.default.deepEqual(acsc(complex('0')), complex(pi / 2, Infinity));
    approx.deepEqual(acsc(complex('0.5')), complex(pi / 2, -1.3169578969248));
    approx.deepEqual(acsc(complex('1')), complex(pi / 2, 0));
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      acsc(unit('45deg'));
    });
    _assert2.default.throws(function () {
      acsc(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      acsc('string');
    });
  });

  it('should calculate the arccsc element-wise for arrays and matrices', function () {
    var acsc123 = [pi / 2, pi / 6, 0.339836909454];
    approx.deepEqual(acsc([1, 2, 3]), acsc123);
    approx.deepEqual(acsc(matrix([1, 2, 3])), matrix(acsc123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      acsc();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      acsc(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTex acsc', function () {
    var expression = _index.indexjs.parse('acsc(2)');
    _assert2.default.equal(expression.toTex(), '\\csc^{-1}\\left(2\\right)');
  });
});
