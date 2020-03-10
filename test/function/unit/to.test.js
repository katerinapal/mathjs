import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
var assert = {},
    approx = approxjs,
    math = indexjs,
    matrix = indexjs.matrix,
    sparse = indexjs.sparse,
    Unit = indexjs.type.Unit,
    unit = indexjs.unit;

describe('to', function() {

  it('should perform the given unit conversion', function() {
    var a = indexjs.unit('500 cm'); a.fixPrefix = true;
    approxjs.deepEqual(indexjs.to(unit('5m'), unit('cm')), a);

    var b = indexjs.unit('1 foot'); b.fixPrefix = true;
    approxjs.deepEqual(indexjs.to(unit('12 inch'), unit('foot')), b);

    var c = indexjs.unit('1 inch'); c.fixPrefix = true;
    approxjs.deepEqual(indexjs.to(unit('2.54 cm'), unit('inch')), c);

    var d = indexjs.unit('68 fahrenheit'); d.fixPrefix = true;
    approxjs.deepEqual(indexjs.to(unit('20 celsius'), unit('fahrenheit')), d);

    var e = indexjs.unit('0.002 m3'); e.fixPrefix = true;
    approxjs.deepEqual(indexjs.to(unit('2 litre'), unit('m3')), e);
  });

  describe('Array', function () {
    
    it('should perform the given unit conversion, array - scalar', function () {      
      approxjs.deepEqual(indexjs.to([unit('1cm'), unit('2 inch'), unit('2km')], unit('foot')), [new Unit(0.032808, 'foot').to('foot'), new Unit(0.16667, 'foot').to('foot'), new Unit(6561.7, 'foot').to('foot')]);
      approxjs.deepEqual(indexjs.to(unit('1cm'), [unit('cm'), unit('foot'), unit('km'), unit('m')]), [new Unit(1, 'cm').to('cm'), new Unit(1, 'cm').to('foot'), new Unit(1, 'cm').to('km'), new Unit(1, 'cm').to('m')]);
    });
    
    it('should perform the given unit conversion, array - array', function () {      
      approxjs.deepEqual(indexjs.to([[unit('1cm'), unit('2 inch')], [unit('2km'), unit('1 foot')]], [[unit('foot'), unit('foot')], [unit('cm'), unit('foot')]]), [[unit('1cm').to('foot'), unit('2 inch').to('foot')], [unit('2km').to('cm'), unit('1 foot').to('foot')]]);
    });
    
    it('should perform the given unit conversion, array - dense matrix', function () {      
      approxjs.deepEqual(indexjs.to([[unit('1cm'), unit('2 inch')], [unit('2km'), unit('1 foot')]], matrix([[unit('foot'), unit('foot')], [unit('cm'), unit('foot')]])), matrix([[unit('1cm').to('foot'), unit('2 inch').to('foot')], [unit('2km').to('cm'), unit('1 foot').to('foot')]]));
    });
  });
  
  describe('DenseMatrix', function () {

    it('should perform the given unit conversion, dense matrix - scalar', function () {      
      approxjs.deepEqual(indexjs.to(matrix([unit('1cm'), unit('2 inch'), unit('2km')]), unit('foot')), matrix([new Unit(0.032808, 'foot').to('foot'), new Unit(0.16667, 'foot').to('foot'), new Unit(6561.7, 'foot').to('foot')]));
      approxjs.deepEqual(indexjs.to(unit('1cm'), matrix([unit('cm'), unit('foot'), unit('km'), unit('m')])), matrix([new Unit(1, 'cm').to('cm'), new Unit(1, 'cm').to('foot'), new Unit(1, 'cm').to('km'), new Unit(1, 'cm').to('m')]));
    });

    it('should perform the given unit conversion, dense matrix - array', function () {      
      approxjs.deepEqual(indexjs.to(matrix([[unit('1cm'), unit('2 inch')], [unit('2km'), unit('1 foot')]]), [[unit('foot'), unit('foot')], [unit('cm'), unit('foot')]]), matrix([[unit('1cm').to('foot'), unit('2 inch').to('foot')], [unit('2km').to('cm'), unit('1 foot').to('foot')]]));
    });

    it('should perform the given unit conversion, dense matrix - dense matrix', function () {      
      approxjs.deepEqual(indexjs.to(matrix([[unit('1cm'), unit('2 inch')], [unit('2km'), unit('1 foot')]]), matrix([[unit('foot'), unit('foot')], [unit('cm'), unit('foot')]])), matrix([[unit('1cm').to('foot'), unit('2 inch').to('foot')], [unit('2km').to('cm'), unit('1 foot').to('foot')]]));
    });
  });

  it('should throw an error if converting between incompatible units', function() {
    assert.throws(function () {indexjs.to(unit('20 kg'), unit('cm'));});
    assert.throws(function () {indexjs.to(unit('20 celsius'), unit('litre'));});
    assert.throws(function () {indexjs.to(unit('5 cm'), unit('2 m^2'));});
  });

  it('should throw an error if called with a wrong number of arguments', function() {
    assert.throws(function () {indexjs.to(unit('20 kg'));});
    assert.throws(function () {indexjs.to(unit('20 kg'), unit('m'), unit('cm'));});
  });

  it('should throw an error if called with a non-plain unit', function() {
    assert.throws( function () {indexjs.unit(5000, 'cm').to('5mm'); });
  });

  it('should throw an error if called with a number', function() {
    assert.throws(function () {indexjs.to(5, unit('m'));}, TypeError);
    assert.throws(function () {indexjs.to(unit('5cm'), 2);}, /SyntaxError: "2" contains no units/);
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {indexjs.to('5cm', unit('cm'));}, TypeError);
  });

  it('should LaTeX to', function () {
    var expression = indexjs.parse('to(2cm,m)');
    assert.equal(expression.toTex(), '\\left(2~\\mathrm{cm}\\rightarrow\\mathrm{m}\\right)');
  });
});
