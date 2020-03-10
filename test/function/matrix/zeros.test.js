import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
// test zeros
var assert = {},
    math = indexjs,
    zeros = indexjs.zeros,
    matrix = indexjs.matrix;

describe('zeros', function() {

  it('should create an empty matrix', function () {
    assert.deepEqual(zeros(), matrix());
    assert.deepEqual(zeros([]), []);
    assert.deepEqual(zeros(matrix([])), matrix());
  });
    
  it('should create an empty matrix, sparse', function () {
    assert.deepEqual(zeros('sparse'), matrix('sparse'));
    assert.deepEqual(zeros([], 'sparse'), matrix([], 'sparse'));
    assert.deepEqual(zeros(matrix([]), 'sparse'), matrix('sparse'));
  });
  
  it('should create a vector with zeros', function () {
    assert.deepEqual(zeros(3), matrix([0,0,0]));
    assert.deepEqual(zeros(matrix([4])), matrix([0,0,0,0]));
    assert.deepEqual(zeros([4]), [0,0,0,0]);
    assert.deepEqual(zeros(0), matrix([]));
  });

  it('should create a matrix with bignumber zeros', function () {
    var zero = indexjs.bignumber(0);
    var three = indexjs.bignumber(3);
    assert.deepEqual(zeros(three), matrix([zero,zero,zero]));
    assert.deepEqual(zeros([three]), [zero,zero,zero]);
  });

  it('should create a 2D matrix with zeros from an array', function () {
    assert.deepEqual(zeros(2,3), matrix([[0,0,0],[0,0,0]]));
    assert.deepEqual(zeros(3,2), matrix([[0,0],[0,0],[0,0]]));
    assert.deepEqual(zeros([3,2]), [[0,0],[0,0],[0,0]]);
  });

  it('should create a matrix with zeros from a matrix', function () {
    assert.deepEqual(zeros(matrix([3])), matrix([0,0,0]));
    assert.deepEqual(zeros(matrix([3,2])), matrix([[0,0],[0,0],[0,0]]));
  });

  it('should create a 3D matrix with zeros', function () {
    var res = [
      [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ],
      [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
      ]
    ];

    assert.deepEqual(zeros(2,3,4), matrix(res));
    assert.deepEqual(zeros(matrix([2,3,4])), matrix(res));
    assert.deepEqual(zeros([2,3,4]), res);
  });

  // TODO: test setting `matrix`

  it('should create a matrix with zeros with the same size as original matrix', function () {
    var a = matrix([[1, 2, 3], [4, 5, 6]]);
    assert.deepEqual(zeros(indexjs.size(a)).size(), a.size());
  });

  // TODO: test with invalid input

  it('should LaTeX zeros', function () {
    var expression = indexjs.parse('zeros(2,3)');
    assert.equal(expression.toTex(), '\\mathrm{zeros}\\left(2,3\\right)');
  });
});
