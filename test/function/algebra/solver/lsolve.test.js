import assert from "assert";
import { deepEqual as toolsapprox_deepEqualjs } from "../../../../tools/approx";
// test lsolve
var math = require('../../../../index');

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

    var x = math.lsolve(m, b);

    toolsapprox_deepEqualjs(x, [1, 1, 1, 1]);
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
    var x = math.lsolve(m, b);

    toolsapprox_deepEqualjs(x, [[1], [1], [1], [1]]);
  });

  it('should solve linear system 4 x 4, matrices', function () {
    var m = math.matrix(
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ]);
    var b = math.matrix([1, 2, 3, 4]);

    var x = math.lsolve(m, b);

    assert(x instanceof math.type.Matrix);
    toolsapprox_deepEqualjs(x, math.matrix([[1], [1], [1], [1]]));
  });

  it('should solve linear system 4 x 4, sparse matrices', function () {
    var m = math.sparse(
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ]);
    var b = math.matrix([[1], [2], [3], [4]], 'sparse');

    var x = math.lsolve(m, b);

    assert(x instanceof math.type.Matrix);
    toolsapprox_deepEqualjs(x, math.matrix([[1], [1], [1], [1]]));
  });

  it('should solve linear system 4 x 4, matrix and column matrix', function () {
    var m = math.matrix(
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ]);
    var b = math.matrix([
      [1],
      [2], 
      [3],
      [4]
    ]);

    var x = math.lsolve(m, b);

    assert(x instanceof math.type.Matrix);
    toolsapprox_deepEqualjs(x, math.matrix([[1], [1], [1], [1]]));
  });

  it('should solve linear system 4 x 4, sparse matrix and column matrix', function () {
    var m = math.matrix(
      [
        [1, 0, 0, 0],
        [1, 1, 0, 0],
        [1, 1, 1, 0],
        [1, 1, 1, 1]
      ], 'sparse');
    var b = math.matrix([
      [1],
      [2], 
      [3],
      [4]
    ], 'sparse');

    var x = math.lsolve(m, b);

    assert(x instanceof math.type.Matrix);
    toolsapprox_deepEqualjs(x, math.matrix([[1], [1], [1], [1]]));
  });

  it('should throw exception when matrix is singular', function () {
    assert.throws(function () { math.lsolve([[1, 1], [0, 0]], [1, 1]); }, /Error: Linear system cannot be solved since matrix is singular/);
    assert.throws(function () { math.lsolve(math.matrix([[1, 1], [0, 0]], 'dense'), [1, 1]); }, /Error: Linear system cannot be solved since matrix is singular/);
    assert.throws(function () { math.lsolve(math.matrix([[1, 1], [0, 0]], 'sparse'), [1, 1]); }, /Error: Linear system cannot be solved since matrix is singular/);
  });
});