"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    pi = _index.indexjs.pi,
    complex = _index.indexjs.complex,
    matrix = _index.indexjs.matrix,
    unit = _index.indexjs.unit,
    cot = _index.indexjs.cot,
    bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 }),
    biggermath = _index.indexjs.create({ number: 'BigNumber', precision: 22 });

describe('cot', function () {
  it('should return the cotan of a boolean', function () {
    approx.equal(cot(true), 0.642092615934331);
    approx.equal(cot(false), Infinity);
  });

  it('should return the cotan of null', function () {
    approx.equal(cot(null), Infinity);
  });

  it('should return the cotan of a number', function () {
    approx.equal(cot(0), Infinity);
    approx.equal(1 / cot(pi * 1 / 8), 0.414213562373095);
    approx.equal(1 / cot(pi * 1 / 4), 1);
    approx.equal(cot(pi * 2 / 4), 0);
    approx.equal(1 / cot(pi * 3 / 4), -1);
    approx.equal(1 / cot(pi * 4 / 4), 0);
    approx.equal(1 / cot(pi * 5 / 4), 1);
    approx.equal(cot(pi * 6 / 4), 0);
    approx.equal(1 / cot(pi * 7 / 4), -1);
    approx.equal(1 / cot(pi * 8 / 4), 0);
  });

  it('should return the cotan of a bignumber', function () {
    var Big = bigmath.bignumber;
    var bigPi = bigmath.pi;
    var sqrt2 = bigmath.SQRT2.toString();

    var arg1 = Big(0);
    var result1 = bigmath.cot(arg1);
    _assert2.default.ok(!result1.isFinite());
    _assert2.default.equal(result1.constructor.precision, 20);
    _assert2.default.deepEqual(arg1, Big(0));

    var result2 = bigmath.cot(bigPi.div(8));
    _assert2.default.deepEqual(result2.toString(), '2.4142135623730950488');
    _assert2.default.equal(result2.constructor.precision, 20);
    _assert2.default.equal(bigPi.constructor.precision, 20);

    _assert2.default.deepEqual(bigmath.cot(bigPi.div(2)), Big('-1.4142135623730950488e-15')); // about zero
    _assert2.default.deepEqual(bigmath.cot(bigPi), Big('26769019461318409709')); // about infinity
  });

  it('should return the cotan of a complex number', function () {
    var re = 0.00373971037633696;
    var im = 0.99675779656935837;
    approx.deepEqual(cot(complex('2+3i')), complex(-re, -im));
    approx.deepEqual(cot(complex('2-3i')), complex(-re, im));
    approx.deepEqual(cot(complex('-2+3i')), complex(re, -im));
    approx.deepEqual(cot(complex('-2-3i')), complex(re, im));
    approx.deepEqual(cot(complex('i')), complex(0, -1.313035285499331));
    approx.deepEqual(cot(complex('1')), complex(0.642092615934331, 0));
    approx.deepEqual(cot(complex('1+i')), complex(0.217621561854403, -0.868014142895925));
  });

  it('should return the cotan of an angle', function () {
    approx.equal(cot(unit('45deg')), 1);
    approx.equal(cot(unit('-45deg')), -1);

    (0, _assert2.default)(cot(unit(_index.indexjs.bignumber(45), 'deg')).isBigNumber);
    approx.equal(cot(unit(_index.indexjs.bignumber(45), 'deg')).toNumber(), 1);

    approx.deepEqual(cot(_index.indexjs.unit(complex('1+i'), 'rad')), complex(0.217621561854403, -0.868014142895925));
  });

  it('should throw an error if called with an invalid unit', function () {
    _assert2.default.throws(function () {
      cot(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      cot('string');
    });
  });

  var cot123 = [0.642092615934331, -0.457657554360286, -7.015252551434534];

  it('should return the cotan of each element of an array', function () {
    approx.deepEqual(cot([1, 2, 3]), cot123);
  });

  it('should return the cotan of each element of a matrix', function () {
    approx.deepEqual(cot(matrix([1, 2, 3])), matrix(cot123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      cot();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      cot(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX cot', function () {
    var expression = _index.indexjs.parse('cot(1)');
    _assert2.default.equal(expression.toTex(), '\\cot\\left(1\\right)');
  });
});
