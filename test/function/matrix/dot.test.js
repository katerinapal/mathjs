import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";

describe('dot', function() {

  it('should calculate dot product for two arrays', function() {
    assert.equal(index_indexjsjs.dot([2, 4, 1], [2, 2, 3]), 15);
    assert.equal(index_indexjsjs.dot([7, 3], [2, 4]), 26);
  });

  it('should calculate dot product for two matrices', function() {
    assert.equal(index_indexjsjs.dot(index_indexjsjs.matrix([2, 4, 1]), index_indexjsjs.matrix([2, 2, 3])), 15);
    assert.equal(index_indexjsjs.dot(index_indexjsjs.matrix([7, 3]), index_indexjsjs.matrix([2, 4])), 26);
  });

  it('should calculate dot product for mixed arrays and matrices', function() {
    assert.equal(index_indexjsjs.dot([2, 4, 1], index_indexjsjs.matrix([2, 2, 3])), 15);
    assert.equal(index_indexjsjs.dot(index_indexjsjs.matrix([7, 3]), [2, 4]), 26);
  });

  it('should throw an error for unsupported types of arguments', function() {
    assert.throws(function () {index_indexjsjs.dot([2, 4, 1], 2)}, TypeError);
  });

  it('should throw an error for multi dimensional matrix input', function() {
    assert.throws(function () {index_indexjsjs.dot([[1,2],[3,4]], [[1,2],[3,4]])}, /Vector expected/);
  });

  it('should throw an error in case of vectors with unequal length', function() {
    assert.throws(function () {index_indexjsjs.dot([2, 3], [1,2,3])}, /Vectors must have equal length \(2 != 3\)/);
  });

  it('should throw an error in case of empty vectors', function() {
    assert.throws(function () {index_indexjsjs.dot([], [])}, /Cannot calculate the dot product of empty vectors/);
  });

  it('should LaTeX dot', function () {
    var expression = index_indexjsjs.parse('dot([1,2],[3,4])');
    assert.equal(expression.toTex(), '\\left(\\begin{bmatrix}1\\\\2\\\\\\end{bmatrix}\\cdot\\begin{bmatrix}3\\\\4\\\\\\end{bmatrix}\\right)');
  });

});
