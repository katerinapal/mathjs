"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    pi = math.pi,
    complex = math.complex,
    matrix = math.matrix,
    unit = math.unit,
    tan = math.tan,
    piBigmath = math.create({ number: 'BigNumber', precision: 21 }),
    bigmath = math.create({ precision: 20 }),
    Big = bigmath.bignumber,
    bigTan = bigmath.tan;

describe('tan', function () {
  it('should return the tangent of a boolean', function () {
    (0, _approx.equal)(tan(true), 1.55740772465490);
    (0, _approx.equal)(tan(false), 0);
  });

  it('should return the tangent of null', function () {
    (0, _approx.equal)(tan(null), 0);
  });

  it('should return the tangent of a number', function () {
    (0, _approx.equal)(tan(0), 0);
    (0, _approx.equal)(tan(pi * 1 / 4), 1);
    (0, _approx.equal)(tan(pi * 1 / 8), 0.414213562373095);
    _assert2.default.ok(tan(pi * 2 / 4) > 1e10);
    (0, _approx.equal)(tan(pi * 3 / 4), -1);
    (0, _approx.equal)(tan(pi * 4 / 4), 0);
    (0, _approx.equal)(tan(pi * 5 / 4), 1);
    _assert2.default.ok(tan(pi * 6 / 4) > 1e10);
    (0, _approx.equal)(tan(pi * 7 / 4), -1);
    (0, _approx.equal)(tan(pi * 8 / 4), 0);
  });

  it('should return the tangent of a bignumber', function () {
    var bigPi = piBigmath.pi;

    _assert2.default.deepEqual(bigTan(Big(0)), Big(0));
    _assert2.default.deepEqual(bigTan(Big(-1)), Big('-1.5574077246549022305'));

    _assert2.default.deepEqual(bigTan(bigPi.div(8)).toString(), '0.414213562373095048802');
    // Wolfram:                                        0.414213562373095048801688724209698078569671875376948073176
    _assert2.default.deepEqual(bigTan(bigPi.div(4)).toString(), '0.999999999999999999999');
  });

  it('should return the tangent of a complex number', function () {
    var re = 0.00376402564150425,
        im = 1.00323862735360980;
    approx.deepEqual(tan(complex('2+3i')), complex(-re, im));
    approx.deepEqual(tan(complex('2-3i')), complex(-re, -im));
    approx.deepEqual(tan(complex('-2+3i')), complex(re, im));
    approx.deepEqual(tan(complex('-2-3i')), complex(re, -im));
    approx.deepEqual(tan(complex('i')), complex(0, 0.761594155955765));
    approx.deepEqual(tan(complex('1')), complex(1.55740772465490, 0));
    approx.deepEqual(tan(complex('1+i')), complex(0.271752585319512, 1.083923327338695));
  });

  it('should return the tangent of an angle', function () {
    (0, _approx.equal)(tan(unit(' 60deg')), math.sqrt(3));
    (0, _approx.equal)(tan(unit('-135deg')), 1);

    (0, _assert2.default)(tan(unit(math.bignumber(60), 'deg')).isBigNumber);
    (0, _approx.equal)(tan(unit(math.bignumber(60), 'deg')).toNumber(), math.sqrt(3));

    approx.deepEqual(tan(unit(complex('1+i'), 'rad')), complex(0.271752585319512, 1.083923327338695));
  });

  it('should throw an error if called with an invalid unit', function () {
    _assert2.default.throws(function () {
      tan(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      tan('string');
    });
  });

  var tan123 = [1.557407724654902, -2.185039863261519, -0.142546543074278];

  it('should return the tan of each element of an array', function () {
    approx.deepEqual(tan([1, 2, 3]), tan123);
  });

  it('should return the tan of each element of a matrix', function () {
    approx.deepEqual(tan(matrix([1, 2, 3])), matrix(tan123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      tan();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      tan(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX tan', function () {
    var expression = math.parse('tan(1)');
    _assert2.default.equal(expression.toTex(), '\\tan\\left(1\\right)');
  });
});
