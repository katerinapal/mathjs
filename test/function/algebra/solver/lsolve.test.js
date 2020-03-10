import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../../tools/approx";
import { math as indexjs } from "../../../../index";
// test lsolve
var assert = {},
    approx = approxjs,
    math = indexjs;

describe('lsolve', function () {

  it('should solve linear system 4 x 4, arrays', function () {
    var m = 
        [
          [1, 0, 0, 0],
          [1, 1, 0, 0],
          [1, 1, 1, 0],
          [1, 1, 1, 1]
        ];
    var b = [1, 2, 3, 4];

    var x = indexjs.lsolve(m, b);

    approxjs.deepEqual(x, [1, 1, 1, 1]);
  });

  it('should solve linear system 4 x 4, array and column array', function () {
    var m = 
        [
          [1, 0, 0, 0],
          [1, 1, 0, 0],
          [1, 1, 1, 0],
          [1, 1, 1, 1]
        ];
    var b = [
      [1],
      [2], 
      [3],
      [4]
    ];
    var x = indexjs.lsolve(m, b);

    approxjs.deepEqual(x, [[1], [1], [1], [1]]);
  });

  it('should solve linear system 4 x 4, matrices', function () {
    var m = indexjs.matrix(
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ]);
    var b = indexjs.matrix([1, 2, 3, 4]);

    var x = indexjs.lsolve(m, b);

    assert(x instanceof indexjs.type.Matrix);
    approxjs.deepEqual(x, indexjs.matrix([[1], [1], [1], [1]]));
  });

  it('should solve linear system 4 x 4, sparse matrices', function () {
    var m = indexjs.sparse(
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ]);
    var b = indexjs.matrix([[1], [2], [3], [4]], 'sparse');

    var x = indexjs.lsolve(m, b);

    assert(x instanceof indexjs.type.Matrix);
    approxjs.deepEqual(x, indexjs.matrix([[1], [1], [1], [1]]));
  });

  it('should solve linear system 4 x 4, matrix and column matrix', function () {
    var m = indexjs.matrix(
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ]);
    var b = indexjs.matrix([
      [1],
      [2], 
      [3],
      [4]
    ]);

    var x = indexjs.lsolve(m, b);

    assert(x instanceof indexjs.type.Matrix);
    approxjs.deepEqual(x, indexjs.matrix([[1], [1], [1], [1]]));
  });

  it('should solve linear system 4 x 4, sparse matrix and column matrix', function () {
    var m = indexjs.matrix(
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ], 'sparse');
    var b = indexjs.matrix([
      [1],
      [2], 
      [3],
      [4]
    ], 'sparse');

    var x = indexjs.lsolve(m, b);

    assert(x instanceof indexjs.type.Matrix);
    approxjs.deepEqual(x, indexjs.matrix([[1], [1], [1], [1]]));
  });

  it('should throw exception when matrix is singular', function () {
    assert.throws(function () { indexjs.lsolve([[1, 1], [0, 0]], [1, 1]); }, /Error: Linear system cannot be solved since matrix is singular/);
    assert.throws(function () { indexjs.lsolve(indexjs.matrix([[1, 1], [0, 0]], 'dense'), [1, 1]); }, /Error: Linear system cannot be solved since matrix is singular/);
    assert.throws(function () { indexjs.lsolve(indexjs.matrix([[1, 1], [0, 0]], 'sparse'), [1, 1]); }, /Error: Linear system cannot be solved since matrix is singular/);
  });
});