import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
import { approxjs as toolsapprox_approxjsjs } from "../../../tools/approx";
// test dotDivide (element-wise divide)
var dotDivide = index_indexjsjs.dotDivide, complex = index_indexjsjs.complex;

describe('dotDivide', function() {

  it('should divide two numbers', function() {
    assert.equal(dotDivide(4, 2), 2);
    assert.equal(dotDivide(-4, 2), -2);
    assert.equal(dotDivide(4, -2), -2);
    assert.equal(dotDivide(-4, -2), 2);
    assert.equal(dotDivide(4, 0), Infinity);
    assert.equal(dotDivide(0, -5), 0);
    assert.ok(isNaN(dotDivide(0, 0)));
  });

  it('should divide booleans', function() {
    assert.equal(dotDivide(true, true), 1);
    assert.equal(dotDivide(true, false), Infinity);
    assert.equal(dotDivide(false, true), 0);
    assert.ok(isNaN(dotDivide(false, false)));
  });

  it('should add mixed numbers and booleans', function() {
    assert.equal(dotDivide(2, true), 2);
    assert.equal(dotDivide(2, false), Infinity);
    approx.equal(dotDivide(true, 2), 0.5);
    assert.equal(dotDivide(false, 2), 0);
  });

  it('should divide numbers and null', function () {
    assert.equal(dotDivide(1, null), Infinity);
    assert.equal(dotDivide(null, 1), 0);
  });

  it('should throw an error if there\'s wrong number of arguments', function() {
    assert.throws(function () {dotDivide(2,3,4); });
    assert.throws(function () {dotDivide(2); });
  });

  it('should divide two complex numbers', function() {
    approx.deepEqual(dotDivide(complex('2+3i'), 2), complex('1+1.5i'));
    approx.deepEqual(dotDivide(complex('2+3i'), complex('4i')), complex('0.75 - 0.5i'));
    approx.deepEqual(dotDivide(complex('2i'), complex('4i')), 0.5);
    approx.deepEqual(dotDivide(4, complex('1+2i')), complex('0.8 - 1.6i'));
  });

  it('should divide a unit by a number', function() {
    assert.equal(dotDivide(index_indexjsjs.unit('5 m'), 10).toString(), '500 mm');
  });

  it('should divide a number by a unit', function() {
    assert.equal(dotDivide(10, index_indexjsjs.unit('5 m')).toString(), '2 m^-1');
  });

  /*
  // This is supported not --ericman314
  it('should throw an error if dividing a number by a unit', function() {
    assert.throws(function () {dotDivide(10, math.unit('5 m')).toString();});
  });
  */

  describe('Array', function () {

    it('should divide all the elements of a array by one number', function() {
      assert.deepEqual(dotDivide([2,4,6], 2), [1,2,3]);
      var a = [[1,2],[3,4]];
      assert.deepEqual(dotDivide(a, 2), [[0.5,1],[1.5,2]]);
      assert.deepEqual(dotDivide([], 2), []);
    });

    it('should divide 1 over a array element-wise', function() {
      approx.deepEqual(dotDivide(1, [[1, 4, 7], [ 3, 0, 5], [-1, 9, 11]]), [[1, 0.25, 1/7],[1/3, Infinity, 0.2], [-1, 1/9, 1/11]]);
    });
  
    it('should perform (array ./ array) element-wise matrix division', function() {
      var a = [[1,2],[3,4]];
      var b = [[5,6],[7,8]];
      assert.deepEqual(dotDivide(a, b), [[1/5, 2/6], [3/7,4/8]]);
    });
    
    it('should perform (array ./ dense matrix) element-wise matrix division', function() {
      var a = [[1,2],[3,4]];
      var b = index_indexjsjs.matrix([[5,6],[7,8]]);
      assert.deepEqual(dotDivide(a, b), index_indexjsjs.matrix([[1/5, 2/6], [3/7,4/8]]));
    });
    
    it('should perform (array ./ sparse matrix) element-wise matrix division', function() {
      var a = [[1,2],[3,4]];
      var b = index_indexjsjs.sparse([[5,0],[7,8]]);
      assert.deepEqual(dotDivide(a, b), index_indexjsjs.matrix([[1/5, Infinity], [3/7,4/8]]));
    });
    
    it('should throw an error when dividing element-wise with differing size', function() {
      assert.throws(function () {dotDivide([[1,2],[3,4]], [[1]]);});
    });
  });
  
  describe('DenseMatrix', function () {
    
    it('should divide all the elements of a dense matrix by one number', function() {
      assert.deepEqual(dotDivide(index_indexjsjs.matrix([2,4,6]), 2), index_indexjsjs.matrix([1,2,3]));
      var a = index_indexjsjs.matrix([[1,2],[3,4]]);
      assert.deepEqual(dotDivide(a, 2), index_indexjsjs.matrix([[0.5,1],[1.5,2]]));
      assert.deepEqual(dotDivide(index_indexjsjs.matrix([]), 2), index_indexjsjs.matrix([]));
    });

    it('should divide 1 over a dense matrix element-wise', function() {
      approx.deepEqual(dotDivide(1, index_indexjsjs.matrix([[1, 4, 7], [ 3, 0, 5], [-1, 9, 11]])), index_indexjsjs.matrix([[1, 0.25, 1/7],[1/3, Infinity, 0.2], [-1, 1/9, 1/11]]));
    });

    it('should perform (dense matrix ./ array) element-wise matrix division', function() {
      var a = index_indexjsjs.matrix([[1,2],[3,4]]);
      var b = [[5,6],[7,8]];
      assert.deepEqual(dotDivide(a, b), index_indexjsjs.matrix([[1/5, 2/6], [3/7,4/8]]));
    });

    it('should perform (dense matrix ./ dense matrix) element-wise matrix division', function() {
      var a = index_indexjsjs.matrix([[1,2],[3,4]]);
      var b = index_indexjsjs.matrix([[5,6],[7,8]]);
      assert.deepEqual(dotDivide(a, b), index_indexjsjs.matrix([[1/5, 2/6], [3/7,4/8]]));
    });

    it('should perform (dense matrix ./ sparse matrix) element-wise matrix division', function() {
      var a = index_indexjsjs.matrix([[1,2],[3,4]]);
      var b = index_indexjsjs.sparse([[5,0],[7,8]]);
      assert.deepEqual(dotDivide(a, b), index_indexjsjs.matrix([[1/5, Infinity], [3/7,4/8]]));
    });
    
    it('should throw an error when dividing element-wise with differing size', function() {
      assert.throws(function () {dotDivide(index_indexjsjs.matrix([[1,2],[3,4]]), index_indexjsjs.matrix([[1]]));});
    });
  });
  
  describe('SparseMatrix', function () {

    it('should divide all the elements of a sparse matrix by one number', function() {
      assert.deepEqual(dotDivide(index_indexjsjs.sparse([[2,0,6],[8,10,12]]), 2), index_indexjsjs.sparse([[1,0,3],[4,5,6]]));
      var a = index_indexjsjs.sparse([[1,2],[3,4]]);
      assert.deepEqual(dotDivide(a, 2), index_indexjsjs.sparse([[0.5,1],[1.5,2]]));
      assert.deepEqual(dotDivide(index_indexjsjs.sparse(), 2), index_indexjsjs.sparse());
    });

    it('should divide 1 over a sparse matrix element-wise', function() {
      approx.deepEqual(dotDivide(1, index_indexjsjs.sparse([[1, 4, 7], [ 3, 0, 5], [-1, 9, 11]])), index_indexjsjs.matrix([[1, 0.25, 1/7],[1/3, Infinity, 0.2], [-1, 1/9, 1/11]]));
    });

    it('should perform (sparse matrix ./ array) element-wise matrix division', function() {
      var a = index_indexjsjs.sparse([[1,2],[3,4]]);
      var b = [[5,6],[7,8]];
      assert.deepEqual(dotDivide(a, b), index_indexjsjs.sparse([[1/5, 2/6], [3/7,4/8]]));
    });

    it('should perform (sparse matrix ./ dense matrix) element-wise matrix division', function() {
      var a = index_indexjsjs.sparse([[1,2],[3,4]]);
      var b = index_indexjsjs.matrix([[5,6],[7,8]]);
      assert.deepEqual(dotDivide(a, b), index_indexjsjs.sparse([[1/5, 2/6], [3/7,4/8]]));
    });

    it('should perform (sparse matrix ./ sparse matrix) element-wise matrix division', function() {
      var a = index_indexjsjs.sparse([[1,2],[0,4]]);
      var b = index_indexjsjs.sparse([[5,0],[7,8]]);
      assert.deepEqual(dotDivide(a, b), index_indexjsjs.matrix([[1/5, Infinity], [0,4/8]]));
    });

    it('should throw an error when dividing element-wise with differing size', function() {
      assert.throws(function () {dotDivide(index_indexjsjs.sparse([[1,2],[3,4]]), index_indexjsjs.sparse([[1]]));});
    });
  });

  it('should LaTeX dotDivide', function () {
    var expression = index_indexjsjs.parse('dotDivide([1,2],[3,4])');
    assert.equal(expression.toTex(), '\\left(\\begin{bmatrix}1\\\\2\\\\\\end{bmatrix}.:\\begin{bmatrix}3\\\\4\\\\\\end{bmatrix}\\right)');
  });
});
