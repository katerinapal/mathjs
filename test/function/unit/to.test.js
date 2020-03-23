"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var matrix = _index.indexjs.matrix,
    sparse = _index.indexjs.sparse,
    Unit = _index.indexjs.type.Unit,
    unit = _index.indexjs.unit;

describe('to', function () {

  it('should perform the given unit conversion', function () {
    var a = _index.indexjs.unit('500 cm');a.fixPrefix = true;
    (0, _approx.deepEqual)(_index.indexjs.to(unit('5m'), unit('cm')), a);

    var b = _index.indexjs.unit('1 foot');b.fixPrefix = true;
    (0, _approx.deepEqual)(_index.indexjs.to(unit('12 inch'), unit('foot')), b);

    var c = _index.indexjs.unit('1 inch');c.fixPrefix = true;
    (0, _approx.deepEqual)(_index.indexjs.to(unit('2.54 cm'), unit('inch')), c);

    var d = _index.indexjs.unit('68 fahrenheit');d.fixPrefix = true;
    (0, _approx.deepEqual)(_index.indexjs.to(unit('20 celsius'), unit('fahrenheit')), d);

    var e = _index.indexjs.unit('0.002 m3');e.fixPrefix = true;
    (0, _approx.deepEqual)(_index.indexjs.to(unit('2 litre'), unit('m3')), e);
  });

  describe('Array', function () {

    it('should perform the given unit conversion, array - scalar', function () {
      (0, _approx.deepEqual)(_index.indexjs.to([unit('1cm'), unit('2 inch'), unit('2km')], unit('foot')), [new Unit(0.032808, 'foot').to('foot'), new Unit(0.16667, 'foot').to('foot'), new Unit(6561.7, 'foot').to('foot')]);
      (0, _approx.deepEqual)(_index.indexjs.to(unit('1cm'), [unit('cm'), unit('foot'), unit('km'), unit('m')]), [new Unit(1, 'cm').to('cm'), new Unit(1, 'cm').to('foot'), new Unit(1, 'cm').to('km'), new Unit(1, 'cm').to('m')]);
    });

    it('should perform the given unit conversion, array - array', function () {
      (0, _approx.deepEqual)(_index.indexjs.to([[unit('1cm'), unit('2 inch')], [unit('2km'), unit('1 foot')]], [[unit('foot'), unit('foot')], [unit('cm'), unit('foot')]]), [[unit('1cm').to('foot'), unit('2 inch').to('foot')], [unit('2km').to('cm'), unit('1 foot').to('foot')]]);
    });

    it('should perform the given unit conversion, array - dense matrix', function () {
      (0, _approx.deepEqual)(_index.indexjs.to([[unit('1cm'), unit('2 inch')], [unit('2km'), unit('1 foot')]], matrix([[unit('foot'), unit('foot')], [unit('cm'), unit('foot')]])), matrix([[unit('1cm').to('foot'), unit('2 inch').to('foot')], [unit('2km').to('cm'), unit('1 foot').to('foot')]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should perform the given unit conversion, dense matrix - scalar', function () {
      (0, _approx.deepEqual)(_index.indexjs.to(matrix([unit('1cm'), unit('2 inch'), unit('2km')]), unit('foot')), matrix([new Unit(0.032808, 'foot').to('foot'), new Unit(0.16667, 'foot').to('foot'), new Unit(6561.7, 'foot').to('foot')]));
      (0, _approx.deepEqual)(_index.indexjs.to(unit('1cm'), matrix([unit('cm'), unit('foot'), unit('km'), unit('m')])), matrix([new Unit(1, 'cm').to('cm'), new Unit(1, 'cm').to('foot'), new Unit(1, 'cm').to('km'), new Unit(1, 'cm').to('m')]));
    });

    it('should perform the given unit conversion, dense matrix - array', function () {
      (0, _approx.deepEqual)(_index.indexjs.to(matrix([[unit('1cm'), unit('2 inch')], [unit('2km'), unit('1 foot')]]), [[unit('foot'), unit('foot')], [unit('cm'), unit('foot')]]), matrix([[unit('1cm').to('foot'), unit('2 inch').to('foot')], [unit('2km').to('cm'), unit('1 foot').to('foot')]]));
    });

    it('should perform the given unit conversion, dense matrix - dense matrix', function () {
      (0, _approx.deepEqual)(_index.indexjs.to(matrix([[unit('1cm'), unit('2 inch')], [unit('2km'), unit('1 foot')]]), matrix([[unit('foot'), unit('foot')], [unit('cm'), unit('foot')]])), matrix([[unit('1cm').to('foot'), unit('2 inch').to('foot')], [unit('2km').to('cm'), unit('1 foot').to('foot')]]));
    });
  });

  it('should throw an error if converting between incompatible units', function () {
    _assert2.default.throws(function () {
      _index.indexjs.to(unit('20 kg'), unit('cm'));
    });
    _assert2.default.throws(function () {
      _index.indexjs.to(unit('20 celsius'), unit('litre'));
    });
    _assert2.default.throws(function () {
      _index.indexjs.to(unit('5 cm'), unit('2 m^2'));
    });
  });

  it('should throw an error if called with a wrong number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.to(unit('20 kg'));
    });
    _assert2.default.throws(function () {
      _index.indexjs.to(unit('20 kg'), unit('m'), unit('cm'));
    });
  });

  it('should throw an error if called with a non-plain unit', function () {
    _assert2.default.throws(function () {
      _index.indexjs.unit(5000, 'cm').to('5mm');
    });
  });

  it('should throw an error if called with a number', function () {
    _assert2.default.throws(function () {
      _index.indexjs.to(5, unit('m'));
    }, TypeError);
    _assert2.default.throws(function () {
      _index.indexjs.to(unit('5cm'), 2);
    }, /SyntaxError: "2" contains no units/);
  });

  it('should throw an error if called with a string', function () {
    _assert2.default.throws(function () {
      _index.indexjs.to('5cm', unit('cm'));
    }, TypeError);
  });

  it('should LaTeX to', function () {
    var expression = _index.indexjs.parse('to(2cm,m)');
    _assert2.default.equal(expression.toTex(), '\\left(2~\\mathrm{cm}\\rightarrow\\mathrm{m}\\right)');
  });
});
