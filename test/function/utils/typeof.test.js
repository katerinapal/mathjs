import assert from "assert";
import { index } from "../../../index";
var math = index;
var Index = index.type.Index;
var Range = index.type.Range;
var Matrix = index.type.Matrix;
var Help = index.type.Help;
var Unit = index.type.Unit;
var Complex = index.type.Complex;
var Fraction = index.type.Fraction;

describe('typeof', function() {

  it('should return number type for a number', function() {
    assert.equal(index.typeof(2), 'number');
    assert.equal(index.typeof(new Number(2)), 'number');
  });

  it('should return bignumber type for a bignumber', function() {
    assert.equal(index.typeof(index.bignumber(0.1)), 'BigNumber');
    assert.equal(index.typeof(new index.type.BigNumber('0.2')), 'BigNumber');
  });

  it('should return string type for a string', function() {
    assert.equal(index.typeof('hello there'), 'string');
    assert.equal(index.typeof(new String('hello there')), 'string');
  });

  it('should return complex type for a complex number', function() {
    assert.equal(index.typeof(new Complex(2,3)), 'Complex');
    assert.equal(index.typeof(index.complex(2,3)), 'Complex');
  });

  it('should return complex type for a fraction', function() {
    assert.equal(index.typeof(new Fraction(2,3)), 'Fraction');
    assert.equal(index.typeof(index.fraction(2,3)), 'Fraction');
  });

  it('should return array type for an array', function() {  
    assert.equal(index.typeof([1,2,3]), 'Array');
    assert.equal(index.typeof(new Array()), 'Array');
  });

  it('should return array type for an array', function() {
    assert.equal(index.typeof([1,2,3]), 'Array');
    assert.equal(index.typeof(new Array()), 'Array');
  });

  it('should return matrix type for a matrix', function() {  
    assert.equal(index.typeof(index.matrix()), 'Matrix');
    assert.equal(index.typeof(index.matrix()), 'Matrix');
  });

  it('should return unit type for a unit', function() {
    assert.equal(index.typeof(new Unit(5, 'cm')), 'Unit');
    assert.equal(index.typeof(index.unit('5cm')), 'Unit');
  });

  it('should return boolean type for a boolean', function() {  
    assert.equal(index.typeof(true), 'boolean');
    assert.equal(index.typeof(false), 'boolean');
    assert.equal(index.typeof(new Boolean(true)), 'boolean');
  });

  it('should return null type for null', function() {  
    assert.equal(index.typeof(null), 'null');
  });

  it('should return undefined type for undefined', function() {  
    assert.equal(index.typeof(undefined), 'undefined');
  });

  it('should return date type for a Date', function() {  
    assert.equal(index.typeof(new Date()), 'Date');
  });

  it('should return function type for a function', function() {  
    assert.equal(index.typeof(function () {}), 'Function');
    assert.equal(index.typeof(new Function ()), 'Function');
  });

  it('should return function type for a chain', function() {
    assert.equal(index.typeof(index.chain(3)), 'Chain');
  });

  it('should return function type for an index', function() {
    assert.equal(index.typeof(new Index([0, 10])), 'Index');
  });

  it('should return function type for a range', function() {
    assert.equal(index.typeof(new Range(0, 10)), 'Range');
  });

  it('should return function type for a help object', function() {
    assert.equal(index.typeof(new Help({}, {})), 'Help');
  });

  it('should return object type for an object', function() {  
    assert.equal(index.typeof({}), 'Object');
    assert.equal(index.typeof(new Object()), 'Object');
  });

  it('should throw an error if called with a wrong number of arguments', function() {
    assert.throws(function() {index.typeof(); });
    assert.throws(function() {index.typeof(1,2); });
  });

  it('should LaTeX typeof', function () {
    var expression = index.parse('typeof(1)');
    assert.equal(expression.toTex(), '\\mathrm{typeof}\\left(1\\right)');
  });

});
