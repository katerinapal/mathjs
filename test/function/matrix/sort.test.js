import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
var assert = {},
    error = indexjs,
    math = indexjs;

describe('sort', function() {

  it('should sort an array with numbers', function() {
    assert.deepEqual(indexjs.sort([5,10,1]), [1,5, 10]);
  });

  it('should sort an array with strings', function() {
    assert.deepEqual(indexjs.sort(['C', 'B', 'A', 'D']), ['A', 'B', 'C', 'D']);
  });

  it('should sort a Matrix', function() {
    assert.deepEqual(indexjs.sort(indexjs.matrix([5,10,1])), indexjs.matrix([1,5, 10]));
  });

  it('should sort an array in ascending order', function() {
    assert.deepEqual(indexjs.sort([5,10,1], 'asc'), [1,5,10]);
  });

  it('should sort an array in descending order', function() {
    assert.deepEqual(indexjs.sort([5,10,1], 'desc'), [10,5,1]);
  });

  it('should sort an array with a custom compare function', function() {
    function sortByLength (a, b) {
      return a.length - b.length;
    }
    assert.deepEqual(indexjs.sort(['Langdon', 'Tom', 'Sara'], sortByLength),
      ['Tom', 'Sara', 'Langdon']);
  });

  it('should throw an error if called with a multi dimensional matrix', function() {
    assert.throws(function() { indexjs.sort(indexjs.matrix([[1,2],[3,4]])) }, /One dimensional matrix expected/);
  });

  it('should throw an error if called with unsupported type', function() {
    assert.throws(function() { indexjs.sort(2) });
    assert.throws(function() { indexjs.sort('string') });
    assert.throws(function() { indexjs.sort([], 'string') }, /String "asc" or "desc" expected/);
    assert.throws(function() { indexjs.sort([], {}) });
  });

  it('should throw an error if called with invalid number of arguments', function() {
    assert.throws(function() { indexjs.sort([], 'asc', 'foo') });
    assert.throws(function() { indexjs.sort() });
  });

  it('should LaTeX sort', function () {
    var expression = indexjs.parse('sort([3,2,1])');
    assert.equal(expression.toTex(), '\\mathrm{sort}\\left(\\begin{bmatrix}3\\\\2\\\\1\\\\\\end{bmatrix}\\right)');
  });

});
