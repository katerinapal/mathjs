import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
var assert = {},
    math = indexjs,
    bignumber = indexjs.bignumber;

describe('diag', function() {

  it('should return a diagonal matrix on the default diagonal', function() {
    assert.deepEqual(indexjs.diag([1,2,3]), [[1,0,0],[0,2,0],[0,0,3]]);
    assert.deepEqual(indexjs.diag([[1,2,3],[4,5,6]]), [1,5]);
  });
  
  it('should return a diagonal matrix on the default diagonal, dense matrix', function() {
    assert.deepEqual(indexjs.diag([1,2,3], 'dense'), indexjs.matrix([[1,0,0],[0,2,0],[0,0,3]], 'dense'));
    assert.deepEqual(indexjs.diag(indexjs.matrix([[1,2,3],[4,5,6]], 'dense')), indexjs.matrix([1,5], 'dense'));
  });
  
  it('should return a diagonal matrix on the default diagonal, sparse matrix', function() {
    assert.deepEqual(indexjs.diag([1,2,3], 'sparse'), indexjs.matrix([[1,0,0],[0,2,0],[0,0,3]], 'sparse'));
    assert.deepEqual(indexjs.diag(indexjs.matrix([[1,2,3],[4,5,6]], 'sparse')), indexjs.matrix([1,5], 'sparse'));
  });

  it('should return a array output on array input', function() {
    assert.deepEqual(indexjs.diag([1,2]), [[1,0],[0,2]]);
  });

  it('should return a matrix output on matrix input', function() {
    assert.deepEqual(indexjs.diag(indexjs.matrix([1,2])), indexjs.matrix([[1,0],[0,2]]));
    assert.deepEqual(indexjs.diag(indexjs.matrix([[1,2], [3,4]])), indexjs.matrix([1,4]));
  });

  it('should put vector on given diagonal k in returned matrix', function() {
    assert.deepEqual(indexjs.diag([1,2,3], 1), [[0,1,0,0],[0,0,2,0],[0,0,0,3]]);
    assert.deepEqual(indexjs.diag([1,2,3], -1), [[0,0,0],[1,0,0],[0,2,0],[0,0,3]]);
  });

  it('should return diagonal k from a matrix', function() {
    assert.deepEqual(indexjs.diag([[1,2,3],[4,5,6]], 1), [2,6]);
    assert.deepEqual(indexjs.diag([[1,2,3],[4,5,6]],-1), [4]);
    assert.deepEqual(indexjs.diag([[1,2,3],[4,5,6]],-2), []);
  });

  it('should throw an error in case of invalid k', function() {
    assert.throws(function () {indexjs.diag([[1,2,3],[4,5,6]], 2.4);}, /Second parameter in function diag must be an integer/);
  });

  describe('bignumber', function () {
    var array123 = [bignumber(1),bignumber(2),bignumber(3)];
    var array123456 = [
      [bignumber(1),bignumber(2),bignumber(3)],
      [bignumber(4),bignumber(5),bignumber(6)]
    ];

    it('should return a diagonal matrix on the default diagonal', function() {
      assert.deepEqual(indexjs.diag(array123),
          [
            [bignumber(1),bignumber(0),bignumber(0)],
            [bignumber(0),bignumber(2),bignumber(0)],
            [bignumber(0),bignumber(0),bignumber(3)]
          ]);

      assert.deepEqual(indexjs.diag(array123456), [bignumber(1),bignumber(5)]);
    });

    it('should return a array output on array input', function() {
      assert.deepEqual(indexjs.diag([bignumber(1),bignumber(2)]),
          [
            [bignumber(1),bignumber(0)],
            [bignumber(0),bignumber(2)]
          ]);
    });

    it('should return a matrix output on matrix input', function() {
      assert.deepEqual(indexjs.diag(indexjs.matrix([bignumber(1),bignumber(2)])),
          indexjs.matrix([
            [bignumber(1),bignumber(0)],
            [bignumber(0),bignumber(2)]
          ]));
      assert.deepEqual(indexjs.diag(indexjs.matrix([
        [bignumber(1),bignumber(2)],
        [bignumber(3),bignumber(4)]
      ])), indexjs.matrix([bignumber(1),bignumber(4)]));
    });

    it('should put vector on given diagonal k in returned matrix', function() {
      assert.deepEqual(indexjs.diag(array123, bignumber(1)), [
        [bignumber(0),bignumber(1),bignumber(0),bignumber(0)],
        [bignumber(0),bignumber(0),bignumber(2),bignumber(0)],
        [bignumber(0),bignumber(0),bignumber(0),bignumber(3)]
      ]);
      assert.deepEqual(indexjs.diag(array123, bignumber(-1)), [
        [bignumber(0),bignumber(0),bignumber(0)],
        [bignumber(1),bignumber(0),bignumber(0)],
        [bignumber(0),bignumber(2),bignumber(0)],
        [bignumber(0),bignumber(0),bignumber(3)]
      ]);
    });

    it('should return diagonal k from a matrix', function() {
      assert.deepEqual(indexjs.diag(array123456, bignumber(1)), [bignumber(2),bignumber(6)]);
      assert.deepEqual(indexjs.diag(array123456, bignumber(-1)), [bignumber(4)]);
      assert.deepEqual(indexjs.diag(array123456, bignumber(-2)), []);
    });

  });

  it('should throw an error of the input matrix is not valid', function() {
    assert.throws(function () {indexjs.diag([[[1],[2]],[[3],[4]]]);});
    // TODO: test diag for all types of input (also scalar)
  });

  it('should throw an error in case of wrong number of arguments', function() {
    assert.throws(function () {indexjs.diag();}, /TypeError: Too few arguments/);
    assert.throws(function () {indexjs.diag([], 2, 3, 4);}, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function() {
    assert.throws(function () {indexjs.diag(2);}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {indexjs.diag([], new Date());}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX diag', function () {
    var expr1 = indexjs.parse('diag([1,2,3])');
    var expr2 = indexjs.parse('diag([1,2,3],1)');

    assert.equal(expr1.toTex(), '\\mathrm{diag}\\left(\\begin{bmatrix}1\\\\2\\\\3\\\\\\end{bmatrix}\\right)');
    assert.equal(expr2.toTex(), '\\mathrm{diag}\\left(\\begin{bmatrix}1\\\\2\\\\3\\\\\\end{bmatrix},1\\right)');
  });

});
