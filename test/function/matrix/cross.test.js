import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
var assert = {};
var error = indexjs;
var math = indexjs;

describe('cross', function() {

  it('should calculate cross product for two arrays', function() {
    assert.deepEqual(indexjs.cross([1, 1, 0],  [0, 1, 1]), [1, -1, 1]);
    assert.deepEqual(indexjs.cross([3, -3, 1], [4, 9, 2]), [-15, -2, 39]);
    assert.deepEqual(indexjs.cross([2, 3, 4],  [5, 6, 7]), [-3, 6, -3]);
  });

  it('should calculate cross product for two matrices', function() {
    assert.deepEqual(indexjs.cross(indexjs.matrix([1, 1, 0]), indexjs.matrix([0, 1, 1])),
        indexjs.matrix([1, -1, 1]));
  });

  it('should calculate cross product for mixed arrays and matrices', function() {
    assert.deepEqual(indexjs.cross([1, 1, 0], indexjs.matrix([0, 1, 1])),
        indexjs.matrix([1, -1, 1]));
    assert.deepEqual(indexjs.cross(indexjs.matrix([1, 1, 0]), [0, 1, 1]),
        indexjs.matrix([1, -1, 1]));
  });

  it('should throw an error for unsupported types of arguments', function() {
    assert.throws(function () {indexjs.cross([2, 4, 1], 2)}, TypeError);
  });

  it('should throw an error for multi dimensional matrix input', function() {
    assert.throws(function () {indexjs.cross([[1,2],[3,4]], [[1,2],[3,4]])}, /Vectors with length 3 expected/);
  });

  it('should throw an error in case of vectors with unequal length', function() {
    assert.throws(function () {indexjs.cross([2, 3], [1,2,3])}, /Vectors with length 3 expected/);
  });

  it('should throw an error in case of empty vectors', function() {
    assert.throws(function () {indexjs.cross([], [])}, /Vectors with length 3 expected/);
  });

  it('should LaTeX cross', function () {
    var expression = indexjs.parse('cross([1],[2])');
    assert.equal(expression.toTex(), '\\left(\\begin{bmatrix}1\\\\\\end{bmatrix}\\right)\\times\\left(\\begin{bmatrix}2\\\\\\end{bmatrix}\\right)');
  });

});
