import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
// test subtract
var assert = {};
var approx = approxjs;
var math = indexjs;
var bignumber = indexjs.bignumber;
var subtract = indexjs.subtract;

describe('subtract', function() {

  it('should subtract two numbers correctly', function() {
    assert.deepEqual(subtract(4, 2), 2);
    assert.deepEqual(subtract(4, -4), 8);
    assert.deepEqual(subtract(-4, -4), 0);
    assert.deepEqual(subtract(-4, 4), -8);
    assert.deepEqual(subtract(2, 4), -2);
    assert.deepEqual(subtract(3, 0), 3);
    assert.deepEqual(subtract(0, 3), -3);
    assert.deepEqual(subtract(0, 3), -3);
    assert.deepEqual(subtract(0, 3), -3);
  });

  it('should subtract booleans', function() {
    assert.equal(subtract(true, true), 0);
    assert.equal(subtract(true, false), 1);
    assert.equal(subtract(false, true), -1);
    assert.equal(subtract(false, false), 0);
  });

  it('should subtract mixed numbers and booleans', function() {
    assert.equal(subtract(2, true), 1);
    assert.equal(subtract(2, false), 2);
    assert.equal(subtract(true, 2), -1);
    assert.equal(subtract(false, 2), -2);
  });

  it('should subtract numbers and null', function () {
    assert.equal(subtract(1, null), 1);
    assert.equal(subtract(null, 1), -1);
  });

  it('should subtract bignumbers', function() {
    assert.deepEqual(subtract(bignumber(0.3), bignumber(0.2)), bignumber(0.1));
    assert.deepEqual(subtract(bignumber('2.3e5001'), bignumber('3e5000')), bignumber('2e5001'));
    assert.deepEqual(subtract(bignumber('1e19'), bignumber('1')), bignumber('9999999999999999999'));
  });

  it('should subtract mixed numbers and bignumbers', function() {
    assert.deepEqual(subtract(bignumber(0.3), 0.2), bignumber(0.1));
    assert.deepEqual(subtract(0.3, bignumber(0.2)), bignumber(0.1));

    assert.throws(function () {subtract(1/3, bignumber(1).div(3));}, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    assert.throws(function () {subtract(bignumber(1).div(3), 1/3);}, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should subtract mixed booleans and bignumbers', function() {
    assert.deepEqual(subtract(bignumber(1.1), true), bignumber(0.1));
    assert.deepEqual(subtract(bignumber(1.1), false), bignumber(1.1));
    assert.deepEqual(subtract(false, bignumber(0.2)), bignumber(-0.2));
    assert.deepEqual(subtract(true, bignumber(0.2)), bignumber(0.8));
  });

  it('should subtract two complex numbers correctly', function() {
    assert.deepEqual(subtract(indexjs.complex(3, 2), indexjs.complex(8, 4)), indexjs.complex('-5 - 2i'));
    assert.deepEqual(subtract(indexjs.complex(6, 3), indexjs.complex(-2, -2)), indexjs.complex('8 + 5i'));
    assert.deepEqual(subtract(indexjs.complex(3, 4), 10), indexjs.complex('-7 + 4i'));
    assert.deepEqual(subtract(indexjs.complex(3, 4), -2), indexjs.complex('5 + 4i'));
    assert.deepEqual(subtract(indexjs.complex(-3, -4), 10), indexjs.complex('-13 - 4i'));
    assert.deepEqual(subtract(10, indexjs.complex(3, 4)), indexjs.complex('7 - 4i'));
    assert.deepEqual(subtract(10, indexjs.i), indexjs.complex('10 - i'));
    assert.deepEqual(subtract(0, indexjs.i), indexjs.complex('-i'));
    assert.deepEqual(subtract(10, indexjs.complex(0, 1)), indexjs.complex('10 - i'));
  });

  it('should throw an error for mixed complex numbers and big numbers', function() {
    assert.deepEqual(subtract(indexjs.complex(3, 4), indexjs.bignumber(10)), indexjs.complex(-7, 4));
    assert.deepEqual(subtract(indexjs.bignumber(10), indexjs.complex(3, 4)), indexjs.complex(7, -4));
  });

  it('should subtract two fractions', function() {
    var a = indexjs.fraction(1,3);
    assert.equal(subtract(a, indexjs.fraction(1,6)).toString(), '0.1(6)');
    assert.equal(a.toString(), '0.(3)');

    assert.equal(subtract(indexjs.fraction(3,5), indexjs.fraction(1,5)).toString(), '0.4');
    assert.equal(subtract(indexjs.fraction(1), indexjs.fraction(1,3)).toString(), '0.(6)');
  });

  it('should subtract mixed fractions and numbers', function() {
    assert.deepEqual(subtract(1, indexjs.fraction(1,3)), indexjs.fraction(2,3));
    assert.deepEqual(subtract(indexjs.fraction(1,3), 1), indexjs.fraction(-2,3));
  });

  it('should subtract two quantities of the same unit', function() {
    approxjs.deepEqual(subtract(indexjs.unit(5, 'km'), indexjs.unit(100, 'mile')), indexjs.unit(-155.93, 'km'));

    assert.deepEqual(subtract(indexjs.unit(indexjs.bignumber(5), 'km'), indexjs.unit(indexjs.bignumber(2), 'km')), indexjs.unit(indexjs.bignumber(3), 'km'));

    assert.deepEqual(subtract(indexjs.unit(indexjs.complex(10,10), 'K'), indexjs.unit(indexjs.complex(3,4), 'K')), indexjs.unit(indexjs.complex(7,6), 'K'));
    assert.deepEqual(subtract(indexjs.unit(indexjs.complex(10,10), 'K'), indexjs.unit(3, 'K')), indexjs.unit(indexjs.complex(7,10), 'K'));
  });

  it('should throw an error if subtracting two quantities of different units', function() {
    assert.throws(function () {
      subtract(indexjs.unit(5, 'km'), indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error when one of the two units has undefined value', function() {
    assert.throws(function () {
      subtract(indexjs.unit('km'), indexjs.unit('5gram'));
    }, /Parameter x contains a unit with undefined value/);
    assert.throws(function () {
      subtract(indexjs.unit('5 km'), indexjs.unit('gram'));
    }, /Parameter y contains a unit with undefined value/);
  });

  it('should throw an error if subtracting numbers from units', function() {
    assert.throws(function () { subtract(indexjs.unit(5, 'km'), 2); }, TypeError);
    assert.throws(function () { subtract(2, indexjs.unit(5, 'km')); }, TypeError);
  });

  it('should throw an error if subtracting numbers from units', function() {
    assert.throws(function () { subtract(indexjs.unit(5, 'km'), bignumber(2)); }, TypeError);
    assert.throws(function () { subtract(bignumber(2), indexjs.unit(5, 'km')); }, TypeError);
  });

  it('should throw an error when used with a string', function() {
    assert.throws(function () {subtract('hello ', 'world'); });
    assert.throws(function () {subtract('str', 123);});
    assert.throws(function () {subtract(123, 'str');});
  });

  describe('Array', function () {

    it('should subtract arrays correctly', function() {
      var a2 = [[10,20],[30,40]];
      var a3 = [[5,6],[7,8]];
      var a4 = subtract(a2, a3);
      assert.deepEqual(a4, [[5,14],[23,32]]);
    });

    it('should subtract a scalar and an array correctly', function() {
      assert.deepEqual(subtract(2, [3,4]), [-1,-2]);
      assert.deepEqual(subtract(2, [3,0]), [-1,2]);
      assert.deepEqual(subtract([3,4], 2), [1,2]);
      assert.deepEqual(subtract([3,0], 2), [1,-2]);
    });

    it('should subtract array and dense matrix correctly', function() {
      var a = [1,2,3];
      var b = indexjs.matrix([3,2,1]);
      var c = subtract(a, b);

      assert.ok(c instanceof indexjs.type.Matrix);
      assert.deepEqual(c, indexjs.matrix([-2,0,2]));
    });
    
    it('should subtract array and dense matrix correctly', function() {
      var a = [[1,2,3],[4,5,6]];
      var b = indexjs.sparse([[6,5,4],[ 3, 2, 1]]);
      var c = subtract(a, b);

      assert.ok(c instanceof indexjs.type.Matrix);
      assert.deepEqual(c, indexjs.matrix([[-5,-3,-1],[1,3,5]]));
    });
  });
  
  describe('DenseMatrix', function () {

    it('should subtract matrices correctly', function() {
      var a2 = indexjs.matrix([[10,20],[30,40]]);
      var a3 = indexjs.matrix([[5,6],[7,8]]);
      var a4 = subtract(a2, a3);
      assert.ok(a4 instanceof indexjs.type.Matrix);
      assert.deepEqual(a4.size(), [2,2]);
      assert.deepEqual(a4.valueOf(), [[5,14],[23,32]]);
    });

    it('should subtract a scalar and a matrix correctly', function() {
      assert.deepEqual(subtract(2, indexjs.matrix([3,4])), indexjs.matrix([-1,-2]));
      assert.deepEqual(subtract(indexjs.matrix([3,4]), 2), indexjs.matrix([1,2]));
    });

    it('should subtract matrix and array correctly', function() {
      var a = indexjs.matrix([1,2,3]);
      var b = [3,2,1];
      var c = subtract(a, b);

      assert.ok(c instanceof indexjs.type.Matrix);
      assert.deepEqual(c, indexjs.matrix([-2,0,2]));
    });
    
    it('should subtract dense and sparse matrices correctly', function() {
      var a = indexjs.matrix([[1,2,3],[1,0,0]]);
      var b = indexjs.sparse([[3,2,1],[0,0,1]]);
      var c = subtract(a, b);

      assert.ok(c instanceof indexjs.type.Matrix);
      assert.deepEqual(c, indexjs.matrix([[-2,0,2],[1,0,-1]]));
    });
  });
  
  describe('SparseMatrix', function () {

    it('should subtract matrices correctly', function() {
      var a2 = indexjs.matrix([[10,20],[30,0]], 'sparse');
      var a3 = indexjs.matrix([[5,6],[30,8]], 'sparse');
      var a4 = subtract(a2, a3);
      assert.ok(a4 instanceof indexjs.type.Matrix);
      assert.deepEqual(a4, indexjs.sparse([[5,14],[0,-8]]));
    });

    it('should subtract a scalar and a matrix correctly', function() {
      assert.deepEqual(subtract(2, indexjs.matrix([[3,4],[5,6]], 'sparse')).valueOf(), [[-1,-2],[-3,-4]]);
      assert.deepEqual(subtract(2, indexjs.matrix([[3,4],[0,6]], 'sparse')).valueOf(), [[-1,-2],[2,-4]]);
      assert.deepEqual(subtract(indexjs.matrix([[3,4],[5,6]], 'sparse'), 2).valueOf(), [[1,2],[3,4]]);
      assert.deepEqual(subtract(indexjs.matrix([[3,4],[0,6]], 'sparse'), 2).valueOf(), [[1,2],[-2,4]]);
    });

    it('should subtract matrix and array correctly', function() {
      var a = indexjs.matrix([[1,2,3],[1,0,0]], 'sparse');
      var b = [[3,2,1],[0,0,1]];
      var c = subtract(a, b);

      assert.ok(c instanceof indexjs.type.Matrix);
      assert.deepEqual(c.valueOf(), [[-2,0,2],[1,0,-1]]);
    });
    
    it('should subtract sparse and dense matrices correctly', function() {
      var a = indexjs.sparse([[1,2,3],[1,0,0]]);
      var b = indexjs.matrix([[3,2,1],[0,0,1]]);
      var c = subtract(a, b);

      assert.ok(c instanceof indexjs.type.Matrix);
      assert.deepEqual(c, indexjs.matrix([[-2,0,2],[1,0,-1]]));
    });
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {subtract(1);}, /TypeError: Too few arguments/);
    assert.throws(function () {subtract(1, 2, 3);}, /TypeError: Too many arguments/);
  });

  it('should LaTeX subtract', function () {
    var expression = indexjs.parse('subtract(2,1)');
    assert.equal(expression.toTex(), '\\left(2-1\\right)');
  });
});
