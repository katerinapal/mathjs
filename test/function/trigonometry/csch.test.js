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
    csch = math.csch,
    bigmath = math.create({ precision: 20 }),
    biggermath = math.create({ number: 'BigNumber', precision: 22 });

describe('csch', function () {
  it('should return the csch of a boolean', function () {
    (0, _approx.equal)(csch(true), 0.85091812823932);
    (0, _approx.equal)(csch(false), Number.POSITIVE_INFINITY);
  });

  it('should return the csch of null', function () {
    (0, _approx.equal)(csch(null), Number.POSITIVE_INFINITY);
  });

  it('should return the csch of a number', function () {
    (0, _approx.equal)(csch(0), Number.POSITIVE_INFINITY);
    (0, _approx.equal)(csch(pi), 0.086589537530047);
    (0, _approx.equal)(csch(1), 0.85091812823932);
    (0, _approx.equal)(csch(2), 0.27572056477178);
    (0, _approx.equal)(csch(3), 0.099821569668823);
    (0, _approx.equal)(csch(1e-22), Number.POSITIVE_INFINITY);
    (0, _approx.equal)(csch(-1e-22), Number.NEGATIVE_INFINITY);
  });

  it('should return the csch of a bignumber', function () {
    var cschBig = bigmath.csch;
    var Big = bigmath.bignumber;

    _assert2.default.deepEqual(cschBig(Big(0)).toString(), 'Infinity');
    _assert2.default.deepEqual(cschBig(Big(1)), Big('0.85091812823932154512'));
    _assert2.default.deepEqual(cschBig(Big(2)), Big('0.27572056477178320776'));
    _assert2.default.deepEqual(cschBig(Big(3)), Big('0.099821569668822732851'));

    /* Pass in extra digits to pi. */
    _assert2.default.deepEqual(cschBig(biggermath.pi).toString(), '0.086589537530046941828');
  });

  it('should return the csch of a complex number', function () {
    approx.deepEqual(csch(complex('1')), complex(0.85091812823932, 0));
    approx.deepEqual(csch(complex('i')), complex(0, -1.1883951057781));
    approx.deepEqual(csch(complex('2 + i')), complex(0.14136302161241, -0.22837506559969));
  });

  it('should return the csch of an angle', function () {
    (0, _approx.equal)(csch(unit('90deg')), 0.4345372080947);
    (0, _approx.equal)(csch(unit('-45deg')), -1.1511838709208);

    (0, _assert2.default)(csch(unit(math.bignumber(90), 'deg')).isBigNumber);
    (0, _approx.equal)(csch(unit(math.bignumber(90), 'deg')).toNumber(), 0.4345372080947);

    approx.deepEqual(csch(unit(complex('2 + i'), 'rad')), complex(0.14136302161241, -0.22837506559969));
  });

  it('should throw an error if called with an invalid unit', function () {
    _assert2.default.throws(function () {
      csch(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      csch('string');
    });
  });

  var csch123 = [0.85091812823932, 0.27572056477178, 0.099821569668823];

  it('should return the csch of each element of an array', function () {
    approx.deepEqual(csch([1, 2, 3]), csch123);
  });

  it('should return the csch of each element of a matrix', function () {
    approx.deepEqual(csch(matrix([1, 2, 3])), matrix(csch123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      csch();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      csch(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX csch', function () {
    var expression = math.parse('csch(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{csch}\\left(1\\right)');
  });
});
