import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;
var unit = index_obj.unit;
var bignumber = index_obj.bignumber;
var fraction = index_obj.fraction;
var matrix = index_obj.matrix;
var range = index_obj.range;
var cube = index_obj.cube;

describe('cube', function() {
  it('should return the cube of a boolean', function () {
    assert.equal(cube(true), 1);
    assert.equal(cube(false), 0);
  });

  it('should return the cube of null', function () {
    assert.equal(index_obj.ceil(null), 0);
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
    assert(cube(a) instanceof index_obj.type.Fraction);
    assert.equal(cube(a).toString(), '0.125');
    assert.equal(a.toString(), '0.5');
  });

  it('should return the cube of a complex number', function() {
    assert.deepEqual(cube(index_obj.complex('2i')), index_obj.complex('-8i'));
    assert.deepEqual(cube(index_obj.complex('2+3i')), index_obj.complex('-46+9i'));
    assert.deepEqual(cube(index_obj.complex('2')), index_obj.complex('8'));
  });

  it('should return the cube of a unit', function() {
    assert.equal(cube(index_obj.unit('4 cm')).toString(), '64 cm^3');
    assert.equal(cube(index_obj.unit('-2 cm')).toString(), '-8 cm^3');
    assert.equal(cube(index_obj.unit('0 cm')).toString(), '0 cm^3');
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
    var expression = index_obj.parse('cube(2)');
    assert.equal(expression.toTex(), '\\left(2\\right)^3');
  });

});
