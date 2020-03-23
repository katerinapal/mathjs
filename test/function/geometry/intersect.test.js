import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
var error = require('../../../lib/error/index');

describe('intersect', function() {
  it('should calculate the intersection point of two 2D lines', function() {
    assert.deepEqual(index_indexjsjs.intersect([0, 0], [10, 10], [10, 0], [0, 10]), [5, 5]);
    assert.deepEqual(index_indexjsjs.intersect(index_indexjsjs.matrix([0, 0]), [10, 10], index_indexjsjs.matrix([10, 0]), index_indexjsjs.matrix([0, 10])), index_indexjsjs.matrix([5, 5]));
    assert.deepEqual(index_indexjsjs.intersect(index_indexjsjs.matrix([0, 0]), index_indexjsjs.matrix([10, 10]), index_indexjsjs.matrix([10, 0]), index_indexjsjs.matrix([0, 10])), index_indexjsjs.matrix([5, 5]));
    assert.deepEqual(index_indexjsjs.intersect([300, 90], [400, 97], [300, 130], [400, 125]), [633.3333333333334, 113.33333333333334]);
  });

  it('should calculate the intersection point of two 3D lines', function() {
    assert.deepEqual(index_indexjsjs.intersect([0, 0, 0], [10, 10, 0], [10, 0, 0], [0, 10, 0]), [5, 5, 0]);
    assert.deepEqual(index_indexjsjs.intersect(index_indexjsjs.matrix([0, 0, 0]), [10, 10, 0], [10, 0, 0], index_indexjsjs.matrix([0, 10, 0])), index_indexjsjs.matrix([5, 5, 0]));
    assert.deepEqual(index_indexjsjs.intersect(index_indexjsjs.matrix([0, 0, 0]), index_indexjsjs.matrix([10, 10, 0]), index_indexjsjs.matrix([10, 0, 0]), index_indexjsjs.matrix([0, 10, 0])), index_indexjsjs.matrix([5, 5, 0]));
  });

  it('should calculate the intersection point of a line and a plane', function() {
    assert.deepEqual(index_indexjsjs.intersect([1, 0, 1], [4, -2, 2], [1, 1, 1, 6]), [7, -4, 3]);
    assert.deepEqual(index_indexjsjs.intersect(index_indexjsjs.matrix([1, 0, 1]), [4, -2, 2], index_indexjsjs.matrix([1, 1, 1, 6])), index_indexjsjs.matrix([7, -4, 3]));
    assert.deepEqual(index_indexjsjs.intersect(index_indexjsjs.matrix([1, 0, 1]), index_indexjsjs.matrix([4, -2, 2]), index_indexjsjs.matrix([1, 1, 1, 6])), index_indexjsjs.matrix([7, -4, 3]));
  });
  
  it('should return null if the points do not intersect', function() {
    assert.deepEqual(index_indexjsjs.intersect([0, 1, 0], [0, 0, 0], [1, 1, 0], [1, 0, 0]), null);
    assert.deepEqual(index_indexjsjs.intersect([0, 1], [0, 0], [1, 1], [1, 0]), null);
  });

  it('should throw an error when number of arguments are other than 3 or 4', function() {
    assert.throws(function () {index_indexjsjs.intersect([2, 0, 1], [1, 1, 1, 6])}, /TypeError: Too few arguments in function intersect/);
    assert.throws(function () {index_indexjsjs.intersect([2, 0, 1], [1, 1, 6], [2, 0, 1], [1, 1, 6], [0, 8, 1])}, /TypeError: Too many arguments in function intersect/);
  });
  
  it('should throw an error for incompatible parameter types', function() {
    assert.throws(function () {index_indexjsjs.intersect(2, 3, 6)}, /TypeError: Unexpected type of argument in function intersect/);
    assert.throws(function () {index_indexjsjs.intersect([2, 0, 1], [1, 1, 1], [5, 1, 10])}, /TypeError: Array with 4 numbers expected as third argument/);
    assert.throws(function () {index_indexjsjs.intersect([], [], [], [])}, /TypeError: Arrays with two or thee dimensional points expected/);
    assert.throws(function () {index_indexjsjs.intersect([2, 8, 9], 3, 6)}, /TypeError: Unexpected type of argument in function intersect/);
    assert.throws(function () {index_indexjsjs.intersect('a', 'b', 'c', 'd')}, /TypeError: Unexpected type of argument in function intersect/);
  });
});
