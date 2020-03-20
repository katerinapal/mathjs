import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";

describe('sort', function() {

  it('should sort an array with numbers', function() {
    assert.deepEqual(index_indexjsjs.sort([5,10,1]), [1,5, 10]);
  });

  it('should sort an array with strings', function() {
    assert.deepEqual(index_indexjsjs.sort(['C', 'B', 'A', 'D']), ['A', 'B', 'C', 'D']);
  });

  it('should sort a Matrix', function() {
    assert.deepEqual(index_indexjsjs.sort(index_indexjsjs.matrix([5,10,1])), index_indexjsjs.matrix([1,5, 10]));
  });

  it('should sort an array in ascending order', function() {
    assert.deepEqual(index_indexjsjs.sort([5,10,1], 'asc'), [1,5,10]);
  });

  it('should sort an array in descending order', function() {
    assert.deepEqual(index_indexjsjs.sort([5,10,1], 'desc'), [10,5,1]);
  });

  it('should sort an array with a custom compare function', function() {
    function sortByLength (a, b) {
      return a.length - b.length;
    }
    assert.deepEqual(index_indexjsjs.sort(['Langdon', 'Tom', 'Sara'], sortByLength),
      ['Tom', 'Sara', 'Langdon']);
  });

  it('should throw an error if called with a multi dimensional matrix', function() {
    assert.throws(function() { index_indexjsjs.sort(index_indexjsjs.matrix([[1,2],[3,4]])) }, /One dimensional matrix expected/);
  });

  it('should throw an error if called with unsupported type', function() {
    assert.throws(function() { index_indexjsjs.sort(2) });
    assert.throws(function() { index_indexjsjs.sort('string') });
    assert.throws(function() { index_indexjsjs.sort([], 'string') }, /String "asc" or "desc" expected/);
    assert.throws(function() { index_indexjsjs.sort([], {}) });
  });

  it('should throw an error if called with invalid number of arguments', function() {
    assert.throws(function() { index_indexjsjs.sort([], 'asc', 'foo') });
    assert.throws(function() { index_indexjsjs.sort() });
  });

  it('should LaTeX sort', function () {
    var expression = index_indexjsjs.parse('sort([3,2,1])');
    assert.equal(expression.toTex(), '\\mathrm{sort}\\left(\\begin{bmatrix}3\\\\2\\\\1\\\\\\end{bmatrix}\\right)');
  });

});
