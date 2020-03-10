import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
// test exp
var assert = {},
    approx = approxjs,
    math = indexjs,
    complex = indexjs.complex,
    matrix = indexjs.matrix,
    sparse = indexjs.sparse,
    unit = indexjs.unit,
    dotPow = indexjs.dotPow;

describe('dotPow', function() {

  it('should elevate a number to the given power', function() {
    approxjs.deepEqual(dotPow(2,3), 8);
    approxjs.deepEqual(dotPow(2,4), 16);
    approxjs.deepEqual(dotPow(-2,2), 4);
    approxjs.deepEqual(dotPow(3,3), 27);
    approxjs.deepEqual(dotPow(3,-2), 0.111111111111111);
    approxjs.deepEqual(dotPow(-3,-2), 0.111111111111111);
    approxjs.deepEqual(dotPow(3,-3), 0.0370370370370370);
    approxjs.deepEqual(dotPow(-3,-3), -0.0370370370370370);
    approxjs.deepEqual(dotPow(2,1.5), 2.82842712474619);
    approxjs.deepEqual(dotPow(-2,1.5), complex(0, -2.82842712474619));
  });

  it('should elevate booleans to the given power', function() {
    assert.equal(dotPow(true, true), 1);
    assert.equal(dotPow(true, false), 1);
    assert.equal(dotPow(false, true), 0);
    assert.equal(dotPow(false, false), 1);
  });

  it('should exponentiate mixed numbers and booleans', function() {
    assert.equal(dotPow(2, true), 2);
    assert.equal(dotPow(2, false), 1);
    assert.equal(dotPow(true, 2), 1);
    assert.equal(dotPow(false, 2), 0);
  });

  it('should exponentiate numbers and null', function () {
    assert.equal(dotPow(1, null), 1);
    assert.equal(dotPow(null, 1), 0);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {dotPow(1);}, /TypeError: Too few arguments/);
    assert.throws(function () {dotPow(1, 2, 3);}, /TypeError: Too many arguments/);
  });

  it('should elevate a complex number to the given power', function() {
    approxjs.deepEqual(dotPow(complex(-1,-1),complex(-1,-1)), complex('-0.0284750589322119 +  0.0606697332231795i'));
    approxjs.deepEqual(dotPow(complex(-1,-1),complex(-1,1)), complex('-6.7536199239765713 +  3.1697803027015614i'));
    approxjs.deepEqual(dotPow(complex(-1,-1),complex(0,-1)), complex('0.0891447921553914 - 0.0321946742909677i'));
    approxjs.deepEqual(dotPow(complex(-1,-1),complex(0,1)), complex('9.92340022667813 + 3.58383962127501i'));
    approxjs.deepEqual(dotPow(complex(-1,-1),complex(1,-1)), complex('-0.1213394664463591 -  0.0569501178644237i'));
    approxjs.deepEqual(dotPow(complex(-1,-1),complex(1,1)), complex('-6.3395606054031211 - 13.5072398479531426i'));
    approxjs.deepEqual(dotPow(complex(-1,1),complex(-1,-1)), complex('-6.7536199239765713 -  3.1697803027015614i'));
    approxjs.deepEqual(dotPow(complex(-1,1),complex(-1,1)), complex('-0.0284750589322119 -  0.0606697332231795i'));
    approxjs.deepEqual(dotPow(complex(-1,1),complex(0,-1)), complex('9.92340022667813 - 3.58383962127501i'));
    approxjs.deepEqual(dotPow(complex(-1,1),complex(0,1)), complex('0.0891447921553914 + 0.0321946742909677i'));
    approxjs.deepEqual(dotPow(complex(-1,1),complex(1,-1)), complex('-6.3395606054031211 + 13.5072398479531426i'));
    approxjs.deepEqual(dotPow(complex(-1,1),complex(1,1)), complex('-0.1213394664463591 +  0.0569501178644237i'));

    approxjs.deepEqual(dotPow(complex(0,-1),complex(-1,-1)), complex('0.000000000000000 + 0.207879576350762i'));
    approxjs.deepEqual(dotPow(complex(0,-1),complex(-1,1)), complex('0.000000000000000 + 4.810477380965351i'));
    approxjs.deepEqual(dotPow(complex(0,-1),complex(1,-1)), complex('0.000000000000000 - 0.207879576350762i'));
    approxjs.deepEqual(dotPow(complex(0,-1),complex(1,1)), complex('0.000000000000000 - 4.810477380965351i'));
    approxjs.deepEqual(dotPow(complex(0,1),complex(-1,-1)), complex('0.000000000000000 - 4.810477380965351i'));
    approxjs.deepEqual(dotPow(complex(0,1),complex(-1,1)), complex('0.000000000000000 - 0.207879576350762i'));
    approxjs.deepEqual(dotPow(complex(0,1),complex(1,-1)), complex('0.000000000000000 + 4.810477380965351i'));
    approxjs.deepEqual(dotPow(complex(0,1),complex(1,1)), complex('0.000000000000000 + 0.207879576350762i'));

    approxjs.deepEqual(dotPow(complex(1,-1),complex(-1,-1)), complex('0.2918503793793073 +  0.1369786269150605i'));
    approxjs.deepEqual(dotPow(complex(1,-1),complex(-1,1)), complex('0.6589325864505904 +  1.4039396486303144i'));
    approxjs.deepEqual(dotPow(complex(1,-1),complex(0,-1)), complex('0.428829006294368 - 0.154871752464247i'));
    approxjs.deepEqual(dotPow(complex(1,-1),complex(0,1)), complex('2.062872235080905 + 0.745007062179724i'));
    approxjs.deepEqual(dotPow(complex(1,-1),complex(1,-1)), complex('0.2739572538301211 -  0.5837007587586147i'));
    approxjs.deepEqual(dotPow(complex(1,-1),complex(1,1)), complex('2.8078792972606288 -  1.3178651729011805i'));
    approxjs.deepEqual(dotPow(complex(1,1),complex(-1,-1)), complex('0.6589325864505904 -  1.4039396486303144i'));
    approxjs.deepEqual(dotPow(complex(1,1),complex(-1,1)), complex('0.2918503793793073 -  0.1369786269150605i'));
    approxjs.deepEqual(dotPow(complex(1,1),complex(0,-1)), complex('2.062872235080905 - 0.745007062179724i'));
    approxjs.deepEqual(dotPow(complex(1,1),complex(0,1)), complex('0.428829006294368 + 0.154871752464247i'));
    approxjs.deepEqual(dotPow(complex(1,1),complex(1,-1)), complex('2.8078792972606288 +  1.3178651729011805i'));
    approxjs.deepEqual(dotPow(complex(1,1),complex(1,1)), complex('0.2739572538301211 +  0.5837007587586147i'));
  });

  it('should throw an error with units', function() {
    assert.throws(function () {dotPow(unit('5cm'));});
  });

  it('should throw an error with strings', function() {
    assert.throws(function () {dotPow('text');});
  });

  describe('Array', function () {
    
    it('should elevate array .^ scalar', function () {
      approxjs.deepEqual(dotPow([[1,2],[0,4]], 2), [[1,4],[0,16]]);
      approxjs.deepEqual(dotPow([[1,2],[0,4]], 2.5), [[1,5.65685424949238], [0, 32]]);
      approxjs.deepEqual(dotPow([[1,2,3],[4,5,0]], 2), [[1,4,9],[16,25,0]]);
    });
    
    it('should elevate scalar .^ array', function () {
      approxjs.deepEqual(dotPow(2, [[1,2],[0,4]]), [[2,4],[1,16]]);
      approxjs.deepEqual(dotPow(2.5, [[1,2],[0,4]]), [[2.5, 6.25], [1, 39.0625]]);
      approxjs.deepEqual(dotPow(2, [[1,2,3],[4,5,0]]), [[2,4,8],[16,32,1]]);
    });
    
    it('should elevate array .^ array', function () {
      approxjs.deepEqual(dotPow([[1,2,0],[0,1,4]], [[2,1,0],[4,1,0]]), [[1,2,1],[0,1,1]]);
    });
    
    it('should elevate array .^ dense matrix', function () {
      approxjs.deepEqual(dotPow([[1,2,0],[0,1,4]], matrix([[2,1,0],[4,1,0]])), matrix([[1,2,1],[0,1,1]]));
    });
    
    it('should elevate array .^ sparse matrix', function () {
      approxjs.deepEqual(dotPow([[1,2,0],[0,1,4]], sparse([[2,1,0],[4,1,0]])), matrix([[1,2,1],[0,1,1]]));
    });
  });
  
  describe('DenseMatrix', function () {

    it('should elevate dense matrix .^ scalar', function () {
      approxjs.deepEqual(dotPow(matrix([[1,2],[0,4]]), 2), matrix([[1,4],[0,16]]));
      approxjs.deepEqual(dotPow(matrix([[1,2],[0,4]]), 2.5), matrix([[1,5.65685424949238], [0, 32]]));
      approxjs.deepEqual(dotPow(matrix([[1,2,3],[4,5,0]]), 2), matrix([[1,4,9],[16,25,0]]));
    });

    it('should elevate scaler .^ dense matrix', function () {
      approxjs.deepEqual(dotPow(2, matrix([[1,2],[0,4]])), matrix([[2,4],[1,16]]));
      approxjs.deepEqual(dotPow(2.5, matrix([[1,2],[0,4]])), matrix([[2.5, 6.25], [1, 39.0625]]));
      approxjs.deepEqual(dotPow(2, matrix([[1,2,3],[4,5,0]])), matrix([[2,4,8],[16,32,1]]));
    });

    it('should elevate dense matrix .^ array', function () {
      approxjs.deepEqual(dotPow(matrix([[1,2,0],[0,1,4]]), [[2,1,0],[4,1,0]]), matrix([[1,2,1],[0,1,1]]));
    });

    it('should elevate dense matrix .^ dense matrix', function () {
      approxjs.deepEqual(dotPow(matrix([[1,2,0],[0,1,4]]), matrix([[2,1,0],[4,1,0]])), matrix([[1,2,1],[0,1,1]]));
    });

    it('should elevate dense matrix .^ sparse matrix', function () {
      approxjs.deepEqual(dotPow(matrix([[1,2,0],[0,1,4]]), sparse([[2,1,0],[4,1,0]])), matrix([[1,2,1],[0,1,1]]));
    });
  });
  
  describe('SparseMatrix', function () {

    it('should elevate sparse matrix .^ scalar', function () {
      approxjs.deepEqual(dotPow(sparse([[1,2],[0,4]]), 2), sparse([[1,4],[0,16]]));
      approxjs.deepEqual(dotPow(sparse([[1,2],[0,4]]), 2.5), sparse([[1,5.65685424949238], [0, 32]]));
      approxjs.deepEqual(dotPow(sparse([[1,2,3],[4,5,0]]), 2), sparse([[1,4,9],[16,25,0]]));
    });

    it('should elevate scalar .^ sparse matrix', function () {
      approxjs.deepEqual(dotPow(2, sparse([[1,2],[0,4]])), matrix([[2,4],[1,16]]));
      approxjs.deepEqual(dotPow(2.5, sparse([[1,2],[0,4]])), matrix([[2.5, 6.25], [1, 39.0625]]));
      approxjs.deepEqual(dotPow(2, sparse([[1,2,3],[4,5,0]])), matrix([[2,4,8],[16,32,1]]));
    });

    it('should elevate sparse matrix .^ array', function () {
      approxjs.deepEqual(dotPow(sparse([[1,2,0],[0,1,4]]), [[2,1,0],[4,1,0]]), matrix([[1,2,1],[0,1,1]]));
    });

    it('should elevate sparse matrix .^ dense matrix', function () {
      approxjs.deepEqual(dotPow(sparse([[1,2,0],[0,1,4]]), matrix([[2,1,0],[4,1,0]])), matrix([[1,2,1],[0,1,1]]));
    });

    it('should elevate sparse matrix .^ sparse matrix', function () {
      approxjs.deepEqual(dotPow(sparse([[1,2,0],[0,1,4]]), sparse([[2,1,0],[4,1,0]])), matrix([[1,2,1],[0,1,1]]));
    });
  });

  it('should LaTeX dotPow', function () {
    var expression = indexjs.parse('dotPow([1,2],[3,4])');
    assert.equal(expression.toTex(), '\\left(\\begin{bmatrix}1\\\\2\\\\\\end{bmatrix}.^\\wedge\\begin{bmatrix}3\\\\4\\\\\\end{bmatrix}\\right)');
  });
});
