import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
// test cube
var assert = {};
var math = indexjs;
var unit = indexjs.unit;
var bignumber = indexjs.bignumber;
var fraction = indexjs.fraction;
var matrix = indexjs.matrix;
var range = indexjs.range;
var cube = indexjs.cube;

describe('cube', function() {
  it('should return the cube of a boolean', function () {
    assert.equal(cube(true), 1);
    assert.equal(cube(false), 0);
  });

  it('should return the cube of null', function () {
    assert.equal(indexjs.ceil(null), 0);
  });

  it('should return the cube of a number', function() {
    assert.equal(cube(4), 64);
    assert.equal(cube(-2), -8);
    assert.equal(cube(0), 0);
  });

  it('should return the cube of a big number', function() {
    assert.deepEqual(cube(bignumber(4)), bignumber(64));
    assert.deepEqual(cube(bignumber(-2)), bignumber(-8));
    assert.deepEqual(cube(bignumber(0)), bignumber(0));
  });

  it('should return the cube of a fraction', function() {
    var a = fraction(0.5);
    assert(cube(a) instanceof indexjs.type.Fraction);
    assert.equal(cube(a).toString(), '0.125');
    assert.equal(a.toString(), '0.5');
  });

  it('should return the cube of a complex number', function() {
    assert.deepEqual(cube(indexjs.complex('2i')), indexjs.complex('-8i'));
    assert.deepEqual(cube(indexjs.complex('2+3i')), indexjs.complex('-46+9i'));
    assert.deepEqual(cube(indexjs.complex('2')), indexjs.complex('8'));
  });

  it('should return the cube of a unit', function() {
    assert.equal(cube(indexjs.unit('4 cm')).toString(), '64 cm^3');
    assert.equal(cube(indexjs.unit('-2 cm')).toString(), '-8 cm^3');
    assert.equal(cube(indexjs.unit('0 cm')).toString(), '0 cm^3');
  });

  it('should throw an error with strings', function() {
    assert.throws(function () {cube('text')});
  });

  it('should throw an error if there\'s wrong number of args', function() {
    assert.throws(function () {cube()}, /TypeError: Too few arguments/);
    assert.throws(function () {cube(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should cube each element in a matrix, array or range', function() {
    // array, matrix, range
    // arrays are evaluated element wise
    assert.deepEqual(cube([2,3,4,5]), [8,27,64,125]);
    assert.deepEqual(cube(matrix([2,3,4,5])), matrix([8,27,64,125]));
    assert.deepEqual(cube(matrix([[1,2],[3,4]])), matrix([[1,8],[27,64]]));
  });

  it('should LaTeX cube', function () {
    var expression = indexjs.parse('cube(2)');
    assert.equal(expression.toTex(), '\\left(2\\right)^3');
  });

});
