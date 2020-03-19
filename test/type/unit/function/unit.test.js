"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unit = _index.indexjs.unit;
var Unit = _index.indexjs.type.Unit;

describe('unit', function () {

  it('should construct a unit', function () {
    var u = unit('5 cm');
    _assert2.default.deepEqual(u, new Unit(5, 'cm'));
  });

  it('should parse a valid string to a unit', function () {
    _assert2.default.deepEqual(unit('5 cm').toString(), '50 mm');
    _assert2.default.deepEqual(unit('5000 cm').toString(), '50 m');
    _assert2.default.deepEqual(unit('10 kg').toString(), '10 kg');
  });

  it('should clone a unit', function () {
    var a = _index.indexjs.unit('5cm');
    var b = _index.indexjs.unit(a);
    _assert2.default.deepEqual(b.toString(), '50 mm');
  });

  it('should create units from all elements in an array', function () {
    _assert2.default.deepEqual(_index.indexjs.unit(['5 cm', '3kg']), [_index.indexjs.unit('5cm'), _index.indexjs.unit('3kg')]);
  });

  it('should create units from all elements in an array', function () {
    _assert2.default.deepEqual(_index.indexjs.unit(_index.indexjs.matrix(['5 cm', '3kg'])), _index.indexjs.matrix([_index.indexjs.unit('5cm'), _index.indexjs.unit('3kg')]));
  });

  it('should throw an error if called with an invalid string', function () {
    _assert2.default.throws(function () {
      unit('invalid unit');
    }, SyntaxError);
  });

  it('should throw an error if called with a number', function () {
    _assert2.default.throws(function () {
      unit(2);
    }, /SyntaxError: "2" contains no units/);
  });

  it('should throw an error if called with a complex', function () {
    _assert2.default.throws(function () {
      unit(_index.indexjs.complex(2, 3));
    }, TypeError);
  });

  it('should take a number as the quantity and a string as the unit', function () {
    _assert2.default.deepEqual(unit(5, 'cm').toString(), '50 mm');
    _assert2.default.deepEqual(unit(10, 'kg').toString(), '10 kg');
  });

  it('should take a bignumber as the quantity and a string as the unit', function () {
    _assert2.default.deepEqual(unit(_index.indexjs.bignumber(5).plus(1e-24), 'cm').toString(), '50.00000000000000000000001 mm');
  });

  it('should take a fraction as the quantity and a string as the unit', function () {
    _assert2.default.deepEqual(unit(_index.indexjs.fraction(1, 3), 'cm').toString(), '10/3 mm');
  });

  it('should convert a string to number with 2 strings', function () {
    _assert2.default.deepEqual(unit('5', 'cm').toString(), '50 mm');
  });

  it('should throw an error if called with an invalid argument', function () {
    _assert2.default.throws(function () {
      unit(2, _index.indexjs.complex(2, 3));
    }, TypeError);
    _assert2.default.throws(function () {
      unit(true);
    }, TypeError);
  });

  it('should throw an error if called with no argument', function () {
    _assert2.default.throws(function () {
      unit();
    }, /TypeError: Too few arguments/);
  });

  it('should throw an error if called with an invalid number of arguments', function () {
    _assert2.default.throws(function () {
      unit(1, 'cm', 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX unit', function () {
    var expr1 = _index.indexjs.parse('unit(cm)');
    var expr2 = _index.indexjs.parse('unit(1,cm)');

    _assert2.default.equal(expr1.toTex(), '\\left(\\mathrm{cm}\\right)');
    _assert2.default.equal(expr2.toTex(), '\\left(\\left(1\\right)\\mathrm{cm}\\right)');
  });
});
