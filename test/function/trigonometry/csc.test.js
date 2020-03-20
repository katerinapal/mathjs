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
    csc = _index.indexjs.csc,
    bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 20 }),
    biggermath = _index.indexjs.create({ number: 'BigNumber', precision: 21 });

describe('csc', function () {
  it('should return the cosecant of a boolean', function () {
    (0, _approx.equal)(csc(true), 1.18839510577812);
    (0, _approx.equal)(csc(false), Infinity);
  });

  it('should return the cosecant of null', function () {
    (0, _approx.equal)(csc(null), Infinity);
  });

  it('should return the cosecant of a number', function () {
    (0, _approx.equal)(1 / csc(0), 0);
    (0, _approx.equal)(1 / csc(pi * 1 / 4), 0.707106781186548);
    (0, _approx.equal)(1 / csc(pi * 1 / 8), 0.382683432365090);
    (0, _approx.equal)(1 / csc(pi * 2 / 4), 1);
    (0, _approx.equal)(1 / csc(pi * 3 / 4), 0.707106781186548);
    (0, _approx.equal)(1 / csc(pi * 4 / 4), 0);
    (0, _approx.equal)(1 / csc(pi * 5 / 4), -0.707106781186548);
    (0, _approx.equal)(1 / csc(pi * 6 / 4), -1);
    (0, _approx.equal)(1 / csc(pi * 7 / 4), -0.707106781186548);
    (0, _approx.equal)(1 / csc(pi * 8 / 4), 0);
    (0, _approx.equal)(1 / csc(pi / 4), _index.indexjs.sqrt(2) / 2);
  });

  it('should return the cosecant of a bignumber', function () {
    var Big = bigmath.bignumber;
    var bigPi = bigmath.pi;
    var sqrt2 = bigmath.SQRT2.toString();

    _assert2.default.deepEqual(bigmath.csc(Big(0)).toString(), 'Infinity');
    _assert2.default.deepEqual(bigmath.csc(bigPi.div(8)).toString(), '2.6131259297527530557');
    _assert2.default.deepEqual(bigmath.csc(bigPi.div(4)).toString(), sqrt2);
    _assert2.default.deepEqual(bigmath.csc(bigPi.div(2)).toString(), '1');
    _assert2.default.deepEqual(bigmath.csc(bigPi), Big('-26769019461318409709')); // large number (about infinity)
    _assert2.default.deepEqual(bigmath.csc(bigPi.times(3).div(2)).toString(), '-1');
  });

  it('should return the cosecant of a complex number', function () {
    var re = 0.0904732097532074;
    var im = 0.0412009862885741;
    approx.deepEqual(csc(complex('2+3i')), complex(re, im));
    approx.deepEqual(csc(complex('2-3i')), complex(re, -im));
    approx.deepEqual(csc(complex('-2+3i')), complex(-re, im));
    approx.deepEqual(csc(complex('-2-3i')), complex(-re, -im));
    approx.deepEqual(csc(complex('i')), complex(0, -0.850918128239322));
    approx.deepEqual(csc(complex('1')), complex(1.18839510577812, 0));
    approx.deepEqual(csc(complex('1+i')), complex(0.621518017170428, -0.303931001628426));
  });

  it('should return the cosecant of an angle', function () {
    (0, _approx.equal)(csc(unit('45deg')), 1.41421356237310);
    (0, _approx.equal)(csc(unit('-45deg')), -1.41421356237310);

    (0, _assert2.default)(csc(unit(_index.indexjs.bignumber(45), 'deg')).isBigNumber);
    (0, _approx.equal)(csc(unit(_index.indexjs.bignumber(45), 'deg')).toNumber(), 1.41421356237310);

    approx.deepEqual(csc(unit(complex('1+i'), 'rad')), complex(0.621518017170428, -0.303931001628426));
  });

  it('should throw an error if called with an invalid unit', function () {
    _assert2.default.throws(function () {
      csc(unit('5 celsius'));
    });
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      csc('string');
    });
  });

  var csc123 = [1.18839510577812, 1.09975017029462, 7.08616739573719];

  it('should return the cosecant of each element of an array', function () {
    approx.deepEqual(csc([1, 2, 3]), csc123);
  });

  it('should return the cosecant of each element of a matrix', function () {
    approx.deepEqual(csc(matrix([1, 2, 3])), matrix(csc123));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      csc();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      csc(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX csc', function () {
    var expression = _index.indexjs.parse('csc(1)');
    _assert2.default.equal(expression.toTex(), '\\csc\\left(1\\right)');
  });
});
