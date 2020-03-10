import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
// test typeof
var assert = {};
var math = indexjs;
var Index = indexjs.type.Index;
var Range = indexjs.type.Range;
var Matrix = indexjs.type.Matrix;
var Help = indexjs.type.Help;
var Unit = indexjs.type.Unit;
var Complex = indexjs.type.Complex;
var Fraction = indexjs.type.Fraction;

describe('typeof', function() {

  it('should return number type for a number', function() {
    assert.equal(indexjs.typeof(2), 'number');
    assert.equal(indexjs.typeof(new Number(2)), 'number');
  });

  it('should return bignumber type for a bignumber', function() {
    assert.equal(indexjs.typeof(indexjs.bignumber(0.1)), 'BigNumber');
    assert.equal(indexjs.typeof(new indexjs.type.BigNumber('0.2')), 'BigNumber');
  });

  it('should return string type for a string', function() {
    assert.equal(indexjs.typeof('hello there'), 'string');
    assert.equal(indexjs.typeof(new String('hello there')), 'string');
  });

  it('should return complex type for a complex number', function() {
    assert.equal(indexjs.typeof(new Complex(2,3)), 'Complex');
    assert.equal(indexjs.typeof(indexjs.complex(2,3)), 'Complex');
  });

  it('should return complex type for a fraction', function() {
    assert.equal(indexjs.typeof(new Fraction(2,3)), 'Fraction');
    assert.equal(indexjs.typeof(indexjs.fraction(2,3)), 'Fraction');
  });

  it('should return array type for an array', function() {  
    assert.equal(indexjs.typeof([1,2,3]), 'Array');
    assert.equal(indexjs.typeof(new Array()), 'Array');
  });

  it('should return array type for an array', function() {
    assert.equal(indexjs.typeof([1,2,3]), 'Array');
    assert.equal(indexjs.typeof(new Array()), 'Array');
  });

  it('should return matrix type for a matrix', function() {  
    assert.equal(indexjs.typeof(indexjs.matrix()), 'Matrix');
    assert.equal(indexjs.typeof(indexjs.matrix()), 'Matrix');
  });

  it('should return unit type for a unit', function() {
    assert.equal(indexjs.typeof(new Unit(5, 'cm')), 'Unit');
    assert.equal(indexjs.typeof(indexjs.unit('5cm')), 'Unit');
  });

  it('should return boolean type for a boolean', function() {  
    assert.equal(indexjs.typeof(true), 'boolean');
    assert.equal(indexjs.typeof(false), 'boolean');
    assert.equal(indexjs.typeof(new Boolean(true)), 'boolean');
  });

  it('should return null type for null', function() {  
    assert.equal(indexjs.typeof(null), 'null');
  });

  it('should return undefined type for undefined', function() {  
    assert.equal(indexjs.typeof(undefined), 'undefined');
  });

  it('should return date type for a Date', function() {  
    assert.equal(indexjs.typeof(new Date()), 'Date');
  });

  it('should return function type for a function', function() {  
    assert.equal(indexjs.typeof(function () {}), 'Function');
    assert.equal(indexjs.typeof(new Function ()), 'Function');
  });

  it('should return function type for a chain', function() {
    assert.equal(indexjs.typeof(indexjs.chain(3)), 'Chain');
  });

  it('should return function type for an index', function() {
    assert.equal(indexjs.typeof(new Index([0, 10])), 'Index');
  });

  it('should return function type for a range', function() {
    assert.equal(indexjs.typeof(new Range(0, 10)), 'Range');
  });

  it('should return function type for a help object', function() {
    assert.equal(indexjs.typeof(new Help({}, {})), 'Help');
  });

  it('should return object type for an object', function() {  
    assert.equal(indexjs.typeof({}), 'Object');
    assert.equal(indexjs.typeof(new Object()), 'Object');
  });

  it('should throw an error if called with a wrong number of arguments', function() {
    assert.throws(function() {indexjs.typeof(); });
    assert.throws(function() {indexjs.typeof(1,2); });
  });

  it('should LaTeX typeof', function () {
    var expression = indexjs.parse('typeof(1)');
    assert.equal(expression.toTex(), '\\mathrm{typeof}\\left(1\\right)');
  });

});
