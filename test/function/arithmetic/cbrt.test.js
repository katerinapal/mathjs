"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');
var math = require('../../../index');
var cbrt = math.cbrt;
var bignumber = math.bignumber;
var complex = math.complex;

describe('cbrt', function () {
  it('should return the cubic root of a boolean', function () {
    _assert2.default.equal(cbrt(true), 1);
    _assert2.default.equal(cbrt(false), 0);
  });

  it('should return the cubic root of null', function () {
    _assert2.default.equal(cbrt(null), 0);
  });

  it('should return the cubic root of a positive number', function () {
    _assert2.default.equal(cbrt(0), 0);
    _assert2.default.equal(cbrt(1), 1);
    _assert2.default.equal(cbrt(8), 2);
    _assert2.default.equal(cbrt(27), 3);
    _assert2.default.equal(cbrt(64), 4);
    _assert2.default.equal(cbrt(125), 5);

    (0, _approx.equal)(cbrt(10), 2.1544346900318834);
  });

  it('should return the cubic root of a negative number', function () {
    _assert2.default.strictEqual(cbrt(-8), -2);
    _assert2.default.strictEqual(cbrt(-64), -4);
  });

  it('should return the cubic root of infinity', function () {
    _assert2.default.strictEqual(cbrt(Infinity), Infinity);
    _assert2.default.strictEqual(cbrt(-Infinity), -Infinity);
  });

  it('should return all cubic roots of a number', function () {
    (0, _approx.equal)(cbrt(8, true), math.matrix([complex('2'), complex('-1 + 1.7321i'), complex('-1 - 1.7321i')]));

    (0, _approx.equal)(cbrt(-8, true), math.matrix([complex('1 + 1.7321i'), complex('-2'), complex('1 - 1.7321i')]));
  });

  it('should return the cubic root of a positive bignumber', function () {
    _assert2.default.deepEqual(cbrt(bignumber(0)), bignumber(0));
    _assert2.default.deepEqual(cbrt(bignumber(1)), bignumber(1));
    _assert2.default.deepEqual(cbrt(bignumber(8)), bignumber(2));
    _assert2.default.deepEqual(cbrt(bignumber(27)), bignumber(3));
    _assert2.default.deepEqual(cbrt(bignumber(64)), bignumber(4));
    _assert2.default.deepEqual(cbrt(bignumber(125)), bignumber(5));

    _assert2.default.deepEqual(cbrt(bignumber(10)), bignumber('2.154434690031883721759293566519350495259344942192108582489235506'));
  });

  it('should return the cubic root of a negative bignumber', function () {
    _assert2.default.deepEqual(cbrt(bignumber(-8)), bignumber(-2));
    _assert2.default.deepEqual(cbrt(bignumber(-64)), bignumber(-4));
  });

  it('should return the cubic root of a complex number', function () {
    (0, _approx.equal)(cbrt(complex('2 + 3i')), complex('1.451856618352664928164697 + 0.493403534104004716735578i'));
    (0, _approx.equal)(cbrt(complex('-2 + 3i')), complex('1.15322830402742 + 1.01064294709397i'));
    (0, _approx.equal)(cbrt(complex('8i')), complex('1.73205080756888 + i'));
  });

  it('should return all three roots of a complex number', function () {
    (0, _approx.equal)(cbrt(complex('2 + 3i'), true), math.matrix([complex('1.4519 + 0.4934i'), complex('-1.1532 + 1.0106i'), complex('-0.2986 - 1.5040i')]));

    (0, _approx.equal)(cbrt(complex('8i'), true), math.matrix([complex(' 1.7321 + i'), complex('-1.7321 + i'), complex('-2i')]));

    math.config({ matrix: 'Array' });

    (0, _approx.equal)(cbrt(complex('8i'), true), [complex(' 1.7321 + i'), complex('-1.7321 + i'), complex('-2i')]);

    math.config({ matrix: 'Matrix' });
  });

  it('should return the cubic root of a unit', function () {
    _assert2.default.equal(cbrt(math.unit('27 m^3')).toString(), math.unit('3 m').toString());
    _assert2.default.equal(cbrt(math.unit('-27 m^3')).toString(), math.unit('-3 m').toString());

    (0, _assert2.default)(cbrt(math.unit(math.bignumber(27), 'm^3')).value.isBigNumber);
    _assert2.default.deepEqual(cbrt(math.unit(math.bignumber(27), 'm^3')).value, math.bignumber(3));
    (0, _assert2.default)(cbrt(math.unit(math.bignumber(-27), 'm^3')).value.isBigNumber);
    _assert2.default.deepEqual(cbrt(math.unit(math.bignumber(-27), 'm^3')).value, math.bignumber(-3));

    (0, _assert2.default)(cbrt(math.unit(math.complex(-46, 9), 's^3')).value.isComplex);
    (0, _approx.equal)(cbrt(math.unit(math.complex(-46, 9), 's^3')).value, math.complex(2, 3));
  });

  it('should throw an error when used with a string', function () {
    _assert2.default.throws(function () {
      cbrt('a string');
    });
  });

  it('should return the cubic root of each element of a matrix', function () {
    _assert2.default.deepEqual(cbrt([8, 27, 64, 125]), [2, 3, 4, 5]);
    _assert2.default.deepEqual(cbrt([[8, 27], [64, 125]]), [[2, 3], [4, 5]]);
    _assert2.default.deepEqual(cbrt(math.matrix([[8, 27], [64, 125]])), math.matrix([[2, 3], [4, 5]]));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      cbrt();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      cbrt(1, true, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX cbrt', function () {
    var expression = math.parse('cbrt(2)');
    _assert2.default.equal(expression.toTex(), '\\sqrt[3]{2}');
  });
});
