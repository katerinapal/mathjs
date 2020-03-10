import assert from "assert";
import * as liberrorindex_obj from "../../../lib/error/index";
import { index_obj } from "../../../index";
var error = liberrorindex_obj;
var math = index_obj;

describe('cross', function() {

  it('should calculate cross product for two arrays', function() {
    assert.deepEqual(index_obj.cross([1, 1, 0],  [0, 1, 1]), [1, -1, 1]);
    assert.deepEqual(index_obj.cross([3, -3, 1], [4, 9, 2]), [-15, -2, 39]);
    assert.deepEqual(index_obj.cross([2, 3, 4],  [5, 6, 7]), [-3, 6, -3]);
  });

  it('should calculate cross product for two matrices', function() {
    assert.deepEqual(index_obj.cross(index_obj.matrix([1, 1, 0]), index_obj.matrix([0, 1, 1])),
        index_obj.matrix([1, -1, 1]));
  });

  it('should calculate cross product for mixed arrays and matrices', function() {
    assert.deepEqual(index_obj.cross([1, 1, 0], index_obj.matrix([0, 1, 1])),
        index_obj.matrix([1, -1, 1]));
    assert.deepEqual(index_obj.cross(index_obj.matrix([1, 1, 0]), [0, 1, 1]),
        index_obj.matrix([1, -1, 1]));
  });

  it('should throw an error for unsupported types of arguments', function() {
    assert.throws(function () {index_obj.cross([2, 4, 1], 2)}, TypeError);
  });

  it('should throw an error for multi dimensional matrix input', function() {
    assert.throws(function () {index_obj.cross([[1,2],[3,4]], [[1,2],[3,4]])}, /Vectors with length 3 expected/);
  });

  it('should throw an error in case of vectors with unequal length', function() {
    assert.throws(function () {index_obj.cross([2, 3], [1,2,3])}, /Vectors with length 3 expected/);
  });

  it('should throw an error in case of empty vectors', function() {
    assert.throws(function () {index_obj.cross([], [])}, /Vectors with length 3 expected/);
  });

  it('should LaTeX cross', function () {
    var expression = index_obj.parse('cross([1],[2])');
    assert.equal(expression.toTex(), '\\left(\\begin{bmatrix}1\\\\\\end{bmatrix}\\right)\\times\\left(\\begin{bmatrix}2\\\\\\end{bmatrix}\\right)');
  });

});
