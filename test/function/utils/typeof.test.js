import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;
var Index = index_obj.type.Index;
var Range = index_obj.type.Range;
var Matrix = index_obj.type.Matrix;
var Help = index_obj.type.Help;
var Unit = index_obj.type.Unit;
var Complex = index_obj.type.Complex;
var Fraction = index_obj.type.Fraction;

describe('typeof', function() {

  it('should return number type for a number', function() {
    assert.equal(index_obj.typeof(2), 'number');
    assert.equal(index_obj.typeof(new Number(2)), 'number');
  });

  it('should return bignumber type for a bignumber', function() {
    assert.equal(index_obj.typeof(index_obj.bignumber(0.1)), 'BigNumber');
    assert.equal(index_obj.typeof(new index_obj.type.BigNumber('0.2')), 'BigNumber');
  });

  it('should return string type for a string', function() {
    assert.equal(index_obj.typeof('hello there'), 'string');
    assert.equal(index_obj.typeof(new String('hello there')), 'string');
  });

  it('should return complex type for a complex number', function() {
    assert.equal(index_obj.typeof(new Complex(2,3)), 'Complex');
    assert.equal(index_obj.typeof(index_obj.complex(2,3)), 'Complex');
  });

  it('should return complex type for a fraction', function() {
    assert.equal(index_obj.typeof(new Fraction(2,3)), 'Fraction');
    assert.equal(index_obj.typeof(index_obj.fraction(2,3)), 'Fraction');
  });

  it('should return array type for an array', function() {  
    assert.equal(index_obj.typeof([1,2,3]), 'Array');
    assert.equal(index_obj.typeof(new Array()), 'Array');
  });

  it('should return array type for an array', function() {
    assert.equal(index_obj.typeof([1,2,3]), 'Array');
    assert.equal(index_obj.typeof(new Array()), 'Array');
  });

  it('should return matrix type for a matrix', function() {  
    assert.equal(index_obj.typeof(index_obj.matrix()), 'Matrix');
    assert.equal(index_obj.typeof(index_obj.matrix()), 'Matrix');
  });

  it('should return unit type for a unit', function() {
    assert.equal(index_obj.typeof(new Unit(5, 'cm')), 'Unit');
    assert.equal(index_obj.typeof(index_obj.unit('5cm')), 'Unit');
  });

  it('should return boolean type for a boolean', function() {  
    assert.equal(index_obj.typeof(true), 'boolean');
    assert.equal(index_obj.typeof(false), 'boolean');
    assert.equal(index_obj.typeof(new Boolean(true)), 'boolean');
  });

  it('should return null type for null', function() {  
    assert.equal(index_obj.typeof(null), 'null');
  });

  it('should return undefined type for undefined', function() {  
    assert.equal(index_obj.typeof(undefined), 'undefined');
  });

  it('should return date type for a Date', function() {  
    assert.equal(index_obj.typeof(new Date()), 'Date');
  });

  it('should return function type for a function', function() {  
    assert.equal(index_obj.typeof(function () {}), 'Function');
    assert.equal(index_obj.typeof(new Function ()), 'Function');
  });

  it('should return function type for a chain', function() {
    assert.equal(index_obj.typeof(index_obj.chain(3)), 'Chain');
  });

  it('should return function type for an index', function() {
    assert.equal(index_obj.typeof(new Index([0, 10])), 'Index');
  });

  it('should return function type for a range', function() {
    assert.equal(index_obj.typeof(new Range(0, 10)), 'Range');
  });

  it('should return function type for a help object', function() {
    assert.equal(index_obj.typeof(new Help({}, {})), 'Help');
  });

  it('should return object type for an object', function() {  
    assert.equal(index_obj.typeof({}), 'Object');
    assert.equal(index_obj.typeof(new Object()), 'Object');
  });

  it('should throw an error if called with a wrong number of arguments', function() {
    assert.throws(function() {index_obj.typeof(); });
    assert.throws(function() {index_obj.typeof(1,2); });
  });

  it('should LaTeX typeof', function () {
    var expression = index_obj.parse('typeof(1)');
    assert.equal(expression.toTex(), '\\mathrm{typeof}\\left(1\\right)');
  });

});
