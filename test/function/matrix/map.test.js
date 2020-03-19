import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";

describe('map', function() {

  it('should apply map to all elements of the matrix', function() {
    var m = index_indexjsjs.matrix([[1,2,3], [4,5,6]]);
    var m2 = index_indexjsjs.map(m, function (value) { return value * 2; });
    assert.deepEqual(m2.valueOf(), [[2,4,6],[8,10,12]]);
    assert.ok(m2 instanceof index_indexjsjs.type.Matrix);
  });

  it('should apply deep-map to all elements in the array', function() {
    var arr = [[1,2,3], [4,5,6]];
    var arr2 = index_indexjsjs.map(arr, function (value) { return value * 2; });
    assert.deepEqual(arr2, [[2,4,6],[8,10,12]]);
    assert.ok(Array.isArray(arr2));
  });

  it('should invoke callback with parameters value, index, obj', function() {
    var arr = [[1,2,3], [4,5,6]];

    assert.deepEqual(index_indexjsjs.map(arr, function (value, index, obj) {
      // we don't clone index here, this should return a copy with every iteration
      return [value, index, obj === arr];
    }).valueOf(), [
      [
        [1, [0, 0], true ],
        [2, [0, 1], true ],
        [3, [0, 2], true ]
      ],
      [
        [4, [1, 0], true ],
        [5, [1, 1], true ],
        [6, [1, 2], true ]
      ]
    ]);

  });

  it('should invoke a typed function with correct number of arguments (1)', function() {
    var output = index_indexjsjs.map([1,2,3], index_indexjsjs.typed('callback', {
      'number': function (value) {
        return value + 2
      }
    }));
    assert.deepEqual(output, [3,4,5]);
  });

  it('should invoke a typed function with correct number of arguments (2)', function() {
    var output = index_indexjsjs.map([1,2,3], index_indexjsjs.typed('callback', {
      'number, Array': function (value, index) {
        return value + 2
      }
    }));
    assert.deepEqual(output, [3,4,5]);
  });

  it('should invoke a typed function with correct number of arguments (3)', function() {
    var output = index_indexjsjs.map([1,2,3], index_indexjsjs.typed('callback', {
      'number, Array, Array': function (value, index, array) {
        return value + 2
      }
    }));
    assert.deepEqual(output, [3,4,5]);
  });

  it('should throw an error if called with unsupported type', function() {
    assert.throws(function() { index_indexjsjs.map(1, function() {}) });
    assert.throws(function() { index_indexjsjs.map('arr', function() {}) });
  });

  it('should throw an error if called with invalid number of arguments', function() {
    assert.throws(function() { index_indexjsjs.map([1, 2, 3]) });
  });

  it('should LaTeX map', function () {
    var expression = index_indexjsjs.parse('map([1,2,3],callback)');
    assert.equal(expression.toTex(), '\\mathrm{map}\\left(\\begin{bmatrix}1\\\\2\\\\3\\\\\\end{bmatrix}, callback\\right)');
  });

});
