"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var cbrt = _index.indexjs.cbrt;
var bignumber = _index.indexjs.bignumber;
var complex = _index.indexjs.complex;

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
    approx.deepEqual(cbrt(8, true), _index.indexjs.matrix([complex('2'), complex('-1 + 1.7321i'), complex('-1 - 1.7321i')]));

    approx.deepEqual(cbrt(-8, true), _index.indexjs.matrix([complex('1 + 1.7321i'), complex('-2'), complex('1 - 1.7321i')]));
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
    approx.deepEqual(cbrt(complex('2 + 3i')), complex('1.451856618352664928164697 + 0.493403534104004716735578i'));
    approx.deepEqual(cbrt(complex('-2 + 3i')), complex('1.15322830402742 + 1.01064294709397i'));
    approx.deepEqual(cbrt(complex('8i')), complex('1.73205080756888 + i'));
  });

  it('should return all three roots of a complex number', function () {
    approx.deepEqual(cbrt(complex('2 + 3i'), true), _index.indexjs.matrix([complex('1.4519 + 0.4934i'), complex('-1.1532 + 1.0106i'), complex('-0.2986 - 1.5040i')]));

    approx.deepEqual(cbrt(complex('8i'), true), _index.indexjs.matrix([complex(' 1.7321 + i'), complex('-1.7321 + i'), complex('-2i')]));

    _index.indexjs.config({ matrix: 'Array' });

    approx.deepEqual(cbrt(complex('8i'), true), [complex(' 1.7321 + i'), complex('-1.7321 + i'), complex('-2i')]);

    _index.indexjs.config({ matrix: 'Matrix' });
  });

  it('should return the cubic root of a unit', function () {
    _assert2.default.equal(cbrt(_index.indexjs.unit('27 m^3')).toString(), _index.indexjs.unit('3 m').toString());
    _assert2.default.equal(cbrt(_index.indexjs.unit('-27 m^3')).toString(), _index.indexjs.unit('-3 m').toString());

    (0, _assert2.default)(cbrt(_index.indexjs.unit(_index.indexjs.bignumber(27), 'm^3')).value.isBigNumber);
    _assert2.default.deepEqual(cbrt(_index.indexjs.unit(_index.indexjs.bignumber(27), 'm^3')).value, _index.indexjs.bignumber(3));
    (0, _assert2.default)(cbrt(_index.indexjs.unit(_index.indexjs.bignumber(-27), 'm^3')).value.isBigNumber);
    _assert2.default.deepEqual(cbrt(_index.indexjs.unit(_index.indexjs.bignumber(-27), 'm^3')).value, _index.indexjs.bignumber(-3));

    (0, _assert2.default)(cbrt(_index.indexjs.unit(_index.indexjs.complex(-46, 9), 's^3')).value.isComplex);
    approx.deepEqual(cbrt(_index.indexjs.unit(_index.indexjs.complex(-46, 9), 's^3')).value, _index.indexjs.complex(2, 3));
  });

  it('should throw an error when used with a string', function () {
    _assert2.default.throws(function () {
      cbrt('a string');
    });
  });

  it('should return the cubic root of each element of a matrix', function () {
    _assert2.default.deepEqual(cbrt([8, 27, 64, 125]), [2, 3, 4, 5]);
    _assert2.default.deepEqual(cbrt([[8, 27], [64, 125]]), [[2, 3], [4, 5]]);
    _assert2.default.deepEqual(cbrt(_index.indexjs.matrix([[8, 27], [64, 125]])), _index.indexjs.matrix([[2, 3], [4, 5]]));
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
    var expression = _index.indexjs.parse('cbrt(2)');
    _assert2.default.equal(expression.toTex(), '\\sqrt[3]{2}');
  });
});
