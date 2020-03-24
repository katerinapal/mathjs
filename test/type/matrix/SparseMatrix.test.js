"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = _index.indexjs.index;
var Matrix = _index.indexjs.type.Matrix;
var SparseMatrix = _index.indexjs.type.SparseMatrix;
var DenseMatrix = _index.indexjs.type.DenseMatrix;
var Complex = _index.indexjs.type.Complex;
var Range = _index.indexjs.type.Range;

describe('SparseMatrix', function () {

  describe('constructor', function () {

    it('should create empty matrix if called with no argument', function () {
      var m = new SparseMatrix();
      _assert2.default.deepEqual(m._size, [0, 0]);
      _assert2.default.deepEqual(m._values, []);
      _assert2.default.deepEqual(m._index, []);
      _assert2.default.deepEqual(m._ptr, [0]);
    });

    it('should create a Sparse Matrix from an array', function () {
      var m = new SparseMatrix([[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]]);
      _assert2.default.deepEqual(m._size, [6, 6]);
      _assert2.default.deepEqual(m._values, [10, 3, 3, 9, 7, 8, 4, 8, 8, 7, 7, 9, -2, 5, 9, 2, 3, 13, -1]);
      _assert2.default.deepEqual(m._index, [0, 1, 3, 1, 2, 4, 5, 2, 3, 2, 3, 4, 0, 3, 4, 5, 1, 4, 5]);
      _assert2.default.deepEqual(m._ptr, [0, 3, 7, 9, 12, 16, 19]);
      (0, _assert2.default)(typeof m._datatype === 'undefined');
    });

    it('should create a Sparse Matrix from an array, number datatype', function () {
      var m = new SparseMatrix([[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]], 'number');
      _assert2.default.deepEqual(m._size, [6, 6]);
      _assert2.default.deepEqual(m._values, [10, 3, 3, 9, 7, 8, 4, 8, 8, 7, 7, 9, -2, 5, 9, 2, 3, 13, -1]);
      _assert2.default.deepEqual(m._index, [0, 1, 3, 1, 2, 4, 5, 2, 3, 2, 3, 4, 0, 3, 4, 5, 1, 4, 5]);
      _assert2.default.deepEqual(m._ptr, [0, 3, 7, 9, 12, 16, 19]);
      (0, _assert2.default)(m._datatype === 'number');
    });

    it('should create a Sparse Matrix from an array, empty column', function () {
      var m = new SparseMatrix([[1, 0, 0], [0, 0, 1]]);
      _assert2.default.deepEqual(m._size, [2, 3]);
      _assert2.default.deepEqual(m._values, [1, 1]);
      _assert2.default.deepEqual(m._index, [0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 1, 2]);
    });

    it('should create a Sparse Matrix from an array, empty row', function () {
      var m = new SparseMatrix([[1, 0], [0, 0], [0, 1]]);
      _assert2.default.deepEqual(m._size, [3, 2]);
      _assert2.default.deepEqual(m._values, [1, 1]);
      _assert2.default.deepEqual(m._index, [0, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2]);
    });

    it('should create an empty Sparse Matrix from an array', function () {
      var m = new SparseMatrix([]);
      _assert2.default.deepEqual(m._size, [0, 0]);
      _assert2.default.deepEqual(m._values, []);
      _assert2.default.deepEqual(m._index, []);
      _assert2.default.deepEqual(m._ptr, [0]);
    });

    it('should create a Sparse Matrix from a vector', function () {
      var m = new SparseMatrix([1, 2, 3]);
      _assert2.default.deepEqual(m._size, [3, 1]);
      _assert2.default.deepEqual(m._values, [1, 2, 3]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 3]);
    });

    it('should create a Sparse Matrix from another Sparse Matrix', function () {
      var m1 = new SparseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
      var m2 = new SparseMatrix(m1);
      _assert2.default.deepEqual(m1._size, m2._size);
      _assert2.default.deepEqual(m1._values, m2._values);
      _assert2.default.deepEqual(m1._index, m2._index);
      _assert2.default.deepEqual(m1._ptr, m2._ptr);
    });

    it('should create a Sparse Matrix from another Sparse Matrix, number datatype', function () {
      var m1 = new SparseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], 'number');
      var m2 = new SparseMatrix(m1);
      _assert2.default.deepEqual(m1._size, m2._size);
      _assert2.default.deepEqual(m1._values, m2._values);
      _assert2.default.deepEqual(m1._index, m2._index);
      _assert2.default.deepEqual(m1._ptr, m2._ptr);
      _assert2.default.deepEqual(m1._datatype, m2._datatype);
    });

    it('should create a Sparse Matrix from a Dense Matrix', function () {
      var m1 = _index.indexjs.matrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
      var m2 = new SparseMatrix(m1);
      _assert2.default.deepEqual(m1.size(), m2.size());
      _assert2.default.deepEqual(m1.toArray(), m2.toArray());
    });

    it('should create a Sparse Matrix from a Dense Matrix, number datatype', function () {
      var m1 = new DenseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]], 'number');
      var m2 = new SparseMatrix(m1);
      _assert2.default.deepEqual(m1.size(), m2.size());
      _assert2.default.deepEqual(m1.toArray(), m2.toArray());
      _assert2.default.deepEqual(m1._datatype, m2._datatype);
    });

    it('should have a property isMatrix', function () {
      var a = new SparseMatrix();
      _assert2.default.strictEqual(a.isMatrix, true);
    });

    it('should have a property isSparseMatrix', function () {
      var a = new SparseMatrix();
      _assert2.default.strictEqual(a.isSparseMatrix, true);
    });

    it('should have a property type', function () {
      var a = new SparseMatrix();
      _assert2.default.strictEqual(a.type, 'SparseMatrix');
    });

    // TODO: add some more input validations to SparseMatrix
    it.skip('should throw an error when input array does not have two dimensions', function () {
      _assert2.default.throws(function () {
        new SparseMatrix([1, 2, 3]);
      }, /DimensionError: Two dimensional array expected/);
      _assert2.default.throws(function () {
        new SparseMatrix([[[1]], [[2]], [[3]]]);
      }, /DimensionError: Two dimensional array expected/);
    });

    // TODO: add some more input validations to SparseMatrix
    it.skip('should throw an error when the dimensions of the input array are invalid', function () {
      _assert2.default.throws(function () {
        new SparseMatrix([[1, 2], [4, 5, 6]]);
      }, /DimensionError: Dimension mismatch \(3 != 2\)/);
    });

    it('should create a SparseMatrix using method create', function () {
      var a = new SparseMatrix([[1, 2, 3]]);

      var b = a.create([[4, 5, 6]]);
      _assert2.default.equal(b.isSparseMatrix, true);
      _assert2.default.deepEqual(b, new SparseMatrix([[4, 5, 6]]));

      var c = a.create([[7, 8, 9]], 'number');
      _assert2.default.deepEqual(c, new SparseMatrix([[7, 8, 9]], 'number'));
    });

    it('should throw an error when called without new keyword', function () {
      _assert2.default.throws(function () {
        SparseMatrix();
      }, /Constructor must be called with the new operator/);
    });

    it('should throw an error when called with invalid datatype', function () {
      _assert2.default.throws(function () {
        new SparseMatrix([], 1);
      });
    });
  });

  describe('size', function () {

    it('should return the expected size', function () {
      _assert2.default.deepEqual(new SparseMatrix([[23]]).size(), [1, 1]);
      _assert2.default.deepEqual(new SparseMatrix([[1, 2, 3], [4, 5, 6]]).size(), [2, 3]);
      _assert2.default.deepEqual(new SparseMatrix([[1], [2], [3]]).size(), [3, 1]);
      _assert2.default.deepEqual(new SparseMatrix([[]]).size(), [1, 0]);
    });
  });

  describe('toString', function () {
    it('should return string representation of matrix', function () {
      _assert2.default.equal(new SparseMatrix([[1, 2], [3, 4]]).toString(), '[[1, 2], [3, 4]]');
      _assert2.default.equal(new SparseMatrix([[1, 2], [3, 1 / 3]]).toString(), '[[1, 2], [3, 0.3333333333333333]]');
    });
  });

  describe('toJSON', function () {

    it('should serialize Matrix', function () {
      _assert2.default.deepEqual(new SparseMatrix([[1, 2], [3, 4]]).toJSON(), {
        mathjs: 'SparseMatrix',
        values: [1, 3, 2, 4],
        index: [0, 1, 0, 1],
        ptr: [0, 2, 4],
        size: [2, 2],
        datatype: undefined
      });
    });

    it('should serialize Matrix, number datatype', function () {
      _assert2.default.deepEqual(new SparseMatrix([[1, 2], [3, 4]], 'number').toJSON(), {
        mathjs: 'SparseMatrix',
        values: [1, 3, 2, 4],
        index: [0, 1, 0, 1],
        ptr: [0, 2, 4],
        size: [2, 2],
        datatype: 'number'
      });
    });
  });

  describe('fromJSON', function () {

    it('should deserialize Matrix', function () {
      var json = {
        mathjs: 'SparseMatrix',
        values: [1, 3, 2, 4],
        index: [0, 1, 0, 1],
        ptr: [0, 2, 4],
        size: [2, 2]
      };
      var m = SparseMatrix.fromJSON(json);
      _assert2.default.ok(m instanceof Matrix);

      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [3, 4]]);
    });

    it('should deserialize Matrix, number datatype', function () {
      var json = {
        mathjs: 'SparseMatrix',
        values: [1, 3, 2, 4],
        index: [0, 1, 0, 1],
        ptr: [0, 2, 4],
        size: [2, 2],
        datatype: 'number'
      };
      var m = SparseMatrix.fromJSON(json);
      _assert2.default.ok(m instanceof Matrix);

      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [3, 4]]);
      _assert2.default.strictEqual(m._datatype, 'number');
    });

    it('should deserialize Pattern Matrix', function () {
      var json = {
        mathjs: 'SparseMatrix',
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      };
      var m = SparseMatrix.fromJSON(json);
      _assert2.default.ok(m instanceof Matrix);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m.valueOf(), [[1, 0, 1], [1, 0, 0], [0, 1, 0]]);
    });
  });

  describe('format', function () {
    it('should format matrix', function () {
      var m = new SparseMatrix([[0, 0], [0, 1 / 3]]);
      _assert2.default.equal(m.format(), 'Sparse Matrix [2 x 2] density: 0.25\n\n    (1, 1) ==> 0.3333333333333333');

      m = new SparseMatrix([[0, 0], [0, 1 / 3]]);
      _assert2.default.equal(m.format(3), 'Sparse Matrix [2 x 2] density: 0.25\n\n    (1, 1) ==> 0.333');

      m = new SparseMatrix([[0, 0], [0, 1 / 3]]);
      _assert2.default.equal(m.format(4), 'Sparse Matrix [2 x 2] density: 0.25\n\n    (1, 1) ==> 0.3333');
    });

    it('should format pattern matrix', function () {
      var m = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });

      _assert2.default.equal(m.format(3), 'Sparse Matrix [3 x 3] density: 0.444\n\n    (0, 0) ==> X\n    (1, 0) ==> X\n    (2, 1) ==> X\n    (0, 2) ==> X');
    });
  });

  describe('resize', function () {

    it('should increase columns as needed, zero value', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);
      m.resize([2, 4]);
      _assert2.default.deepEqual(m._size, [2, 4]);
      _assert2.default.deepEqual(m._values, [1, 4, 2, 5, 3, 6]);
      _assert2.default.deepEqual(m._index, [0, 1, 0, 1, 0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 2, 4, 6, 6]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, 3, 0], [4, 5, 6, 0]]);
    });

    it('should increase columns as needed, non zero value', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);
      m.resize([2, 4], 100);
      _assert2.default.deepEqual(m._size, [2, 4]);
      _assert2.default.deepEqual(m._values, [1, 4, 2, 5, 3, 6, 100, 100]);
      _assert2.default.deepEqual(m._index, [0, 1, 0, 1, 0, 1, 0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 2, 4, 6, 8]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, 3, 100], [4, 5, 6, 100]]);
    });

    it('should increase rows as needed, zero value', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);
      m.resize([3, 3]);
      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 4, 2, 5, 3, 6]);
      _assert2.default.deepEqual(m._index, [0, 1, 0, 1, 0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 2, 4, 6]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, 3], [4, 5, 6], [0, 0, 0]]);
    });

    it('should increase rows as needed, non zero value', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);
      m.resize([3, 3], 100);
      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 4, 100, 2, 5, 100, 3, 6, 100]);
      _assert2.default.deepEqual(m._index, [0, 1, 2, 0, 1, 2, 0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 3, 6, 9]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, 3], [4, 5, 6], [100, 100, 100]]);
    });

    it('should increase rows & columns as needed, zero value, empty Sparse Matrix', function () {
      var m = new SparseMatrix([]);
      m.resize([2, 2]);
      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.deepEqual(m._values, []);
      _assert2.default.deepEqual(m._index, []);
      _assert2.default.deepEqual(m._ptr, [0, 0, 0]);
      _assert2.default.deepEqual(m.toArray(), [[0, 0], [0, 0]]);
    });

    it('should increase rows & columns as needed, non zero value, empty Sparse Matrix', function () {
      var m = new SparseMatrix([]);
      m.resize([2, 2], 100);
      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.deepEqual(m._values, [100, 100, 100, 100]);
      _assert2.default.deepEqual(m._index, [0, 1, 0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 2, 4]);
      _assert2.default.deepEqual(m.toArray(), [[100, 100], [100, 100]]);
    });

    it('should decrease columns as needed', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);
      m.resize([2, 2]);
      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.deepEqual(m._values, [1, 4, 2, 5]);
      _assert2.default.deepEqual(m._index, [0, 1, 0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 2, 4]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [4, 5]]);
    });

    it('should decrease columns as needed, zero matrix', function () {
      var m = new SparseMatrix([[0, 0, 0], [0, 0, 0]]);
      m.resize([2, 2]);
      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.deepEqual(m._values, []);
      _assert2.default.deepEqual(m._index, []);
      _assert2.default.deepEqual(m._ptr, [0, 0, 0]);
      _assert2.default.deepEqual(m.toArray(), [[0, 0], [0, 0]]);
    });

    it('should decrease rows as needed', function () {
      var m = new SparseMatrix([[1, 2], [3, 4]]);
      m.resize([1, 2]);
      _assert2.default.deepEqual(m._size, [1, 2]);
      _assert2.default.deepEqual(m._values, [1, 2]);
      _assert2.default.deepEqual(m._index, [0, 0]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2]]);
    });

    it('should decrease rows as needed, zero Sparse Matrix', function () {
      var m = new SparseMatrix([[0, 0], [0, 0]]);
      m.resize([1, 2]);
      _assert2.default.deepEqual(m._size, [1, 2]);
      _assert2.default.deepEqual(m._values, []);
      _assert2.default.deepEqual(m._index, []);
      _assert2.default.deepEqual(m._ptr, [0, 0, 0]);
      _assert2.default.deepEqual(m.toArray(), [[0, 0]]);
    });

    it('should decrease rows & columns as needed, zero Sparse Matrix', function () {
      var m = new SparseMatrix([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
      m.resize([2, 2]);
      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.deepEqual(m._values, []);
      _assert2.default.deepEqual(m._index, []);
      _assert2.default.deepEqual(m._ptr, [0, 0, 0]);
      _assert2.default.deepEqual(m.toArray(), [[0, 0], [0, 0]]);
    });

    it('should return a different matrix when copy=true', function () {
      var m1 = new SparseMatrix([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
      var m2 = m1.resize([2, 2], 0, true);
      (0, _assert2.default)(m1 !== m2);
      // original matrix cannot be modified
      _assert2.default.deepEqual(m1._size, [4, 4]);
      _assert2.default.deepEqual(m1._values, []);
      _assert2.default.deepEqual(m1._index, []);
      _assert2.default.deepEqual(m1._ptr, [0, 0, 0, 0, 0]);
      _assert2.default.deepEqual(m1.toArray(), [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
      // new matrix should have correct size
      _assert2.default.deepEqual(m2._size, [2, 2]);
      _assert2.default.deepEqual(m2._values, []);
      _assert2.default.deepEqual(m2._index, []);
      _assert2.default.deepEqual(m2._ptr, [0, 0, 0]);
      _assert2.default.deepEqual(m2.toArray(), [[0, 0], [0, 0]]);
    });
  });

  describe('get', function () {

    it('should throw on invalid element position', function () {
      var m = new SparseMatrix([[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]]);

      _assert2.default.throws(function () {
        m.get([-1, 0]);
      }, /Index out of range \(-1 < 0\)/);
      _assert2.default.throws(function () {
        m.get([10, 0]);
      }, /Index out of range \(10 > 5\)/);
      _assert2.default.throws(function () {
        m.get([0, -1]);
      }, /Index out of range \(-1 < 0\)/);
      _assert2.default.throws(function () {
        m.get([0, 10]);
      }, /Index out of range \(10 > 5\)/);
    });

    it('should throw an error in case of dimension mismatch', function () {
      var m = new SparseMatrix([[0, 1], [2, 3]]);
      _assert2.default.throws(function () {
        m.get([0, 2, 0, 2, 0, 2]);
      }, /Dimension mismatch/);
    });

    it('should throw an error when invoked on a pattern matrix', function () {
      var m = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });
      _assert2.default.throws(function () {
        m.get([0, 1]);
      }, /Cannot invoke get on a Pattern only matrix/);
    });

    it('should get matrix element', function () {
      var m = new SparseMatrix([[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]]);

      _assert2.default.equal(m.get([0, 0]), 10);
      _assert2.default.equal(m.get([3, 1]), 0);
      _assert2.default.equal(m.get([5, 1]), 4);
      _assert2.default.equal(m.get([5, 5]), -1);
    });

    it('should get matrix element - Issue #450', function () {
      var m = new SparseMatrix({
        mathjs: 'SparseMatrix',
        values: [3, 10, 3, 9, 7, 4, 8, 8, 8, 7, 7, 9, -2, 5, 9, 2, 3, -1, 13],
        index: [1, 0, 3, 1, 2, 5, 4, 2, 3, 2, 3, 4, 0, 3, 4, 5, 1, 5, 4],
        ptr: [0, 3, 7, 9, 12, 16, 19],
        size: [6, 6],
        datatype: undefined
      });

      _assert2.default.equal(m.get([0, 0]), 10);
      _assert2.default.equal(m.get([1, 0]), 3);
      _assert2.default.equal(m.get([4, 1]), 8);
      _assert2.default.equal(m.get([5, 1]), 4);
      _assert2.default.equal(m.get([4, 5]), 13);
      _assert2.default.equal(m.get([5, 5]), -1);
    });
  });

  describe('set', function () {

    it('should throw on invalid element position', function () {
      var m = new SparseMatrix([[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]]);

      _assert2.default.throws(function () {
        m.set([-1, 0]);
      }, /Index out of range \(-1 < 0\)/);
      _assert2.default.throws(function () {
        m.set([0, -1]);
      }, /Index out of range \(-1 < 0\)/);
      _assert2.default.throws(function () {
        m.set([0, 1.5]);
      }, /Index must be an integer \(value: 1\.5\)/);
    });

    it('should remove matrix element', function () {
      var m = new SparseMatrix([[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]]);

      m.set([0, 0], 0);
      m.set([0, 4], 0);
      m.set([5, 1], 0);

      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, 0, 0, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 0, 0, 0, 2, -1]]);
    });

    it('should update matrix element (non zero)', function () {
      var m = new SparseMatrix([[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]]);

      m.set([0, 0], 15);
      m.set([0, 4], 10);
      m.set([5, 1], 20);

      _assert2.default.deepEqual(m.toArray(), [[15, 0, 0, 0, 10, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 20, 0, 0, 2, -1]]);
    });

    it('should update matrix element (zero)', function () {
      var m = new SparseMatrix([[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]]);

      m.set([0, 1], 15);
      m.set([0, 5], 10);
      m.set([5, 0], 20);

      _assert2.default.deepEqual(m.toArray(), [[10, 15, 0, 0, -2, 10], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [20, 4, 0, 0, 2, -1]]);
    });

    it('should add rows as meeded', function () {
      var m = new SparseMatrix([[1, 2], [3, 4]]);

      m.set([3, 1], 22);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [3, 4], [0, 0], [0, 22]]);

      m.set([4, 0], 33);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [3, 4], [0, 0], [0, 22], [33, 0]]);
    });

    it('should add columns as meeded', function () {
      var m = new SparseMatrix([[1, 2], [3, 4]]);

      m.set([1, 3], 22);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, 0, 0], [3, 4, 0, 22]]);

      m.set([0, 4], 33);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, 0, 0, 33], [3, 4, 0, 22, 0]]);
    });

    it('should add rows & columns as meeded', function () {
      var m = new SparseMatrix([[1, 2], [3, 4]]);

      m.set([3, 3], 22);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, 0, 0], [3, 4, 0, 0], [0, 0, 0, 0], [0, 0, 0, 22]]);

      m.set([4, 4], 33);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, 0, 0, 0], [3, 4, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 22, 0], [0, 0, 0, 0, 33]]);
    });

    it('should add rows as meeded, non zero default', function () {
      var m = new SparseMatrix([[1, 2], [3, 4]]);

      m.set([3, 1], 22, -1);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [3, 4], [-1, -1], [-1, 22]]);

      m.set([4, 0], 33, -2);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [3, 4], [-1, -1], [-1, 22], [33, -2]]);
    });

    it('should add columns as meeded, non zero default', function () {
      var m = new SparseMatrix([[1, 2], [3, 4]]);

      m.set([1, 3], 22, -1);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, -1, -1], [3, 4, -1, 22]]);

      m.set([0, 4], 33, -2);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, -1, -1, 33], [3, 4, -1, 22, -2]]);
    });

    it('should add rows & columns as meeded, non zero default', function () {
      var m = new SparseMatrix([[1, 2], [3, 4]]);

      m.set([3, 3], 22, -1);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, -1, -1], [3, 4, -1, -1], [-1, -1, -1, -1], [-1, -1, -1, 22]]);

      m.set([4, 4], 33, -2);
      _assert2.default.deepEqual(m.toArray(), [[1, 2, -1, -1, -2], [3, 4, -1, -1, -2], [-1, -1, -1, -1, -2], [-1, -1, -1, 22, -2], [-2, -2, -2, -2, 33]]);
    });

    it('should throw an error when invoked on a pattern matrix', function () {
      var m = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });
      _assert2.default.throws(function () {
        m.set([0, 1], 1);
      }, /Cannot invoke set on a Pattern only matrix/);
    });
  });

  describe('get subset', function () {

    it('should get the right subset of the matrix', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      _assert2.default.deepEqual(m.size(), [3, 3]);
      _assert2.default.deepEqual(m.subset(index(1, 1)), 5);
      _assert2.default.deepEqual(m.subset(index(new Range(0, 2), new Range(0, 2))).toArray(), [[1, 2], [4, 5]]);
      _assert2.default.deepEqual(m.subset(index(1, new Range(1, 3))).toArray(), [[5, 6]]);
      _assert2.default.deepEqual(m.subset(index(0, new Range(1, 3))).toArray(), [[2, 3]]);
      _assert2.default.deepEqual(m.subset(index(new Range(1, 3), 1)).toArray(), [[5], [8]]);
      _assert2.default.deepEqual(m.subset(index(new Range(1, 3), 2)).toArray(), [[6], [9]]);
      _assert2.default.deepEqual(m.subset(index(new Range(1, 3, 2), 2)).toArray(), [[6]]);
      _assert2.default.deepEqual(m.subset(index([0, 1], [2, 1])).toArray(), [[3, 2], [6, 5]]);
      _assert2.default.deepEqual(m.subset(index([0, 1, 2], [2, 1, 0])).toArray(), [[3, 2, 1], [6, 5, 4], [9, 8, 7]]);
      _assert2.default.deepEqual(m.subset(index([2, 1, 0], [0, 1, 2])).toArray(), [[7, 8, 9], [4, 5, 6], [1, 2, 3]]);
      _assert2.default.deepEqual(m.subset(index([2, 1, 0], [2, 1, 0])).toArray(), [[9, 8, 7], [6, 5, 4], [3, 2, 1]]);
    });

    /* TODO: implement!
    it('should squeeze the output when index contains a scalar', function() {
      var m = new SparseMatrix(math.range(0, 10));
      // assert.deepEqual(m.subset(index(1)), 1);
      assert.deepEqual(m.subset(index([1, 2])), new SparseMatrix([1]));
        m = new SparseMatrix([[1,2], [3, 4]]);
      assert.deepEqual(m.subset(index(1, 1)), 4);
      assert.deepEqual(m.subset(index([1, 2], 1)), new SparseMatrix([[4]]));
      assert.deepEqual(m.subset(index(1, [1, 2])), new SparseMatrix([[4]]));
      assert.deepEqual(m.subset(index([1, 2], [1, 2])), new SparseMatrix([[4]]));
    });
    */
    it('should throw an error if the given subset is invalid', function () {
      var m = new SparseMatrix();
      _assert2.default.throws(function () {
        m.subset([-1]);
      });

      m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);
      _assert2.default.throws(function () {
        m.subset([1, 2, 3]);
      });
      _assert2.default.throws(function () {
        m.subset([3, 0]);
      });
      _assert2.default.throws(function () {
        m.subset([1]);
      });
    });

    /* TODO: implement!
    it('should throw an error in case of wrong number of arguments', function() {
      var m = new SparseMatrix();
      assert.throws(function () { m.subset();}, /Wrong number of arguments/);
      assert.throws(function () { m.subset(1, 2, 3, 4); }, /Wrong number of arguments/);
    });
    */
    it('should throw an error in case of dimension mismatch', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);
      _assert2.default.throws(function () {
        m.subset(index([0, 2]));
      }, /Dimension mismatch/);
    });

    it('should throw an error when invoked on a pattern matrix', function () {
      var m = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });
      _assert2.default.throws(function () {
        m.subset(index(1, 1));
      }, /Cannot invoke subset on a Pattern only matrix/);
    });
  });

  describe('set subset', function () {

    it('should set scalar value', function () {
      var m = new SparseMatrix([[0, 0], [0, 0]]);

      m.subset(index(1, 1), 1);
      _assert2.default.deepEqual(m.toArray(), [[0, 0], [0, 1]]);

      m.subset(index(0, 0), 2);
      _assert2.default.deepEqual(m.toArray(), [[2, 0], [0, 1]]);
    });

    it('should set scalar value growing matrix', function () {
      var m = new SparseMatrix([[0, 0], [0, 1]]);

      m.subset(index(2, 2), 2);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0], [0, 1, 0], [0, 0, 2]]);
    });

    it('should set scalar value growing matrix, default value', function () {
      var m = new SparseMatrix([[0, 0], [0, 1]]);

      m.subset(index(2, 2), 2, 1);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 1], [0, 1, 1], [1, 1, 2]]);
    });

    it('should set vector value', function () {
      var m = new SparseMatrix([[0, 0], [0, 0]]);

      m.subset(index(0, [0, 2]), [1, 2]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [0, 0]]);

      m.subset(index(1, [0, 2]), [3, 4]);
      _assert2.default.deepEqual(m.toArray(), [[1, 2], [3, 4]]);
    });

    it('should set subset', function () {
      // set 2-dimensional
      var m = new SparseMatrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

      m.subset(index(new Range(1, 3), new Range(1, 3)), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0], [0, 1, 2], [0, 3, 4]]);

      m.subset(index(0, new Range(0, 3)), [5, 6, 7]);
      _assert2.default.deepEqual(m.toArray(), [[5, 6, 7], [0, 1, 2], [0, 3, 4]]);

      m.subset(index(new Range(0, 3), 0), [8, 9, 10]);
      _assert2.default.deepEqual(m.toArray(), [[8, 6, 7], [9, 1, 2], [10, 3, 4]]);
    });

    it('should set subset growing matrix', function () {
      // set 2-dimensional
      var m = new SparseMatrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

      m.subset(index(new Range(2, 4), new Range(2, 4)), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 2], [0, 0, 3, 4]]);

      m.subset(index(4, new Range(0, 3)), [5, 6, 7]);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 1, 2], [0, 0, 3, 4], [5, 6, 7, 0]]);

      m.subset(index(new Range(0, 3), 4), [8, 9, 10]);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, 0, 8], [0, 0, 0, 0, 9], [0, 0, 1, 2, 10], [0, 0, 3, 4, 0], [5, 6, 7, 0, 0]]);
    });

    it('should set subset growing matrix, default value', function () {
      // set 2-dimensional
      var m = new SparseMatrix([[0, 0, 0], [0, 0, 0], [0, 0, 0]]);

      m.subset(index([2, 4], [2, 4]), [[1, 2], [3, 4]], -1);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, -1], [0, 0, 0, -1], [0, 0, 1, 2], [-1, -1, 3, 4]]);

      m.subset(index(4, new Range(0, 3)), [5, 6, 7], -2);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, -1], [0, 0, 0, -1], [0, 0, 1, 2], [-1, -1, 3, 4], [5, 6, 7, -2]]);

      m.subset(index(new Range(0, 3), 4), [8, 9, 10], -3);
      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, -1, 8], [0, 0, 0, -1, 9], [0, 0, 1, 2, 10], [-1, -1, 3, 4, -3], [5, 6, 7, -2, -3]]);
    });

    it('should throw an error in case of wrong type of index', function () {
      _assert2.default.throws(function () {
        new SparseMatrix().subset('no index', 2);
      }, /Invalid index/);
    });

    it('should throw an error in case of wrong size of submatrix', function () {
      _assert2.default.throws(function () {
        new SparseMatrix().subset(index(0), [2, 3]);
      }, /Scalar expected/);
    });

    it('should throw an error when invoked on a pattern matrix', function () {
      var m = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });
      _assert2.default.throws(function () {
        m.subset(index([2, 4], [2, 4]), [[1, 2], [3, 4]], -1);
      }, /Cannot invoke subset on a Pattern only matrix/);
    });
  });

  describe('map', function () {

    it('should apply the given function to all elements in the matrix', function () {
      var m, m2;

      m = new SparseMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]);
      m2 = m.map(function (value) {
        return value * 2;
      });
      _assert2.default.deepEqual(m2.toArray(), [[2, 4, 6, 8], [10, 12, 14, 16], [18, 20, 22, 24], [26, 28, 30, 32]]);

      m = new SparseMatrix([1]);
      m2 = m.map(function (value) {
        return value * 2;
      });
      _assert2.default.deepEqual(m2.toArray(), [[2]]);

      m = new SparseMatrix([1, 2, 3]);
      m2 = m.map(function (value) {
        return value * 2;
      });
      _assert2.default.deepEqual(m2.toArray(), [[2], [4], [6]]);
    });

    it('should work on empty matrices', function () {
      var m = new SparseMatrix([]);
      var m2 = m.map(function (value) {
        return value * 2;
      });
      _assert2.default.deepEqual(m2.toArray(), []);
    });

    it('should process all values (zero and non-zero)', function () {
      var m = new SparseMatrix([[0, 0], [0, 0]]);
      var m2 = m.map(function (value) {
        return value + 2;
      });
      _assert2.default.deepEqual(m2.toArray(), [[2, 2], [2, 2]]);
    });

    it('should process non-zero values', function () {
      var m = new SparseMatrix([[1, 0], [0, 0]]);
      var counter = 0;

      var m2 = m.map(function (value) {
        counter++;
        return value + 2;
      }, m, true);

      (0, _assert2.default)(counter === 1);
      _assert2.default.deepEqual(m2.toArray(), [[3, 0], [0, 0]]);
    });

    it('should invoke callback with parameters value, index, obj', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);

      var m2 = m.map(function (value, index, obj) {
        return value + index[0] * 100 + index[1] * 10 + (obj === m ? 1000 : 0);
      });

      _assert2.default.deepEqual(m2.toArray(), [[1001, 1012, 1023], [1104, 1115, 1126]]);
    });

    it('should throw an error when invoked on a pattern matrix', function () {
      var m = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });
      _assert2.default.throws(function () {
        m.map(function () {}, m, true);
      }, /Cannot invoke map on a Pattern only matrix/);
    });
  });

  describe('forEach', function () {

    it('should run on all elements of the matrix', function () {
      var m, output;

      m = new SparseMatrix([[1, 2, 3, 4], [5, 6, 7, 8], [9, 10, 11, 12], [13, 14, 15, 16]]);
      output = [];
      m.forEach(function (value) {
        output.push(value);
      });
      _assert2.default.deepEqual(output, [1, 5, 9, 13, 2, 6, 10, 14, 3, 7, 11, 15, 4, 8, 12, 16]);

      m = new SparseMatrix([1]);
      output = [];
      m.forEach(function (value) {
        output.push(value);
      });
      _assert2.default.deepEqual(output, [1]);

      m = new SparseMatrix([1, 2, 3]);
      output = [];
      m.forEach(function (value) {
        output.push(value);
      });
      _assert2.default.deepEqual(output, [1, 2, 3]);
    });

    it('should work on empty matrices', function () {
      var m = new SparseMatrix([]);
      var output = [];
      m.forEach(function (value) {
        output.push(value);
      });
      _assert2.default.deepEqual(output, []);
    });

    it('should process non-zero values', function () {
      var m = new SparseMatrix([[1, 0], [0, 0]]);
      var counter = 0;

      m.forEach(function () {
        counter++;
      }, true);
      (0, _assert2.default)(counter === 1);
    });

    it('should invoke callback with parameters value, index, obj', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);
      var output = [];
      m.forEach(function (value, index, obj) {
        output.push(value + index[0] * 100 + index[1] * 10 + (obj === m ? 1000 : 0));
      });
      _assert2.default.deepEqual(output, [1001, 1104, 1012, 1115, 1023, 1126]);
    });

    it('should throw an error when invoked on a pattern matrix', function () {
      var m = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });
      _assert2.default.throws(function () {
        m.forEach(function () {});
      }, /Cannot invoke forEach on a Pattern only matrix/);
    });
  });

  describe('clone', function () {

    it('should clone the matrix properly', function () {
      var m1 = new SparseMatrix([[1, 2, 3], [4, 5, 6]]);

      var m2 = m1.clone();

      _assert2.default.deepEqual(m1.toArray(), m2.toArray());
    });

    it('should clone pattern matrix', function () {
      var m1 = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });

      var m2 = m1.clone();

      _assert2.default.deepEqual(m1.toArray(), m2.toArray());
    });
  });

  describe('toArray', function () {

    it('should return array', function () {
      var m = new SparseMatrix({
        values: [10, 3, 3, 9, 7, 8, 4, 8, 8, 7, 7, 9, -2, 5, 9, 2, 3, 13, -1],
        index: [0, 1, 3, 1, 2, 4, 5, 2, 3, 2, 3, 4, 0, 3, 4, 5, 1, 4, 5],
        ptr: [0, 3, 7, 9, 12, 16, 19],
        size: [6, 6]
      });

      var a = m.toArray();

      _assert2.default.deepEqual(a, [[10, 0, 0, 0, -2, 0], [3, 9, 0, 0, 0, 3], [0, 7, 8, 7, 0, 0], [3, 0, 8, 7, 5, 0], [0, 8, 0, 9, 9, 13], [0, 4, 0, 0, 2, -1]]);
    });

    it('should return array, empty column', function () {
      var m = new SparseMatrix({
        values: [1, 1],
        index: [0, 1],
        ptr: [0, 1, 1, 2],
        size: [2, 3]
      });

      var a = m.toArray();

      _assert2.default.deepEqual(a, [[1, 0, 0], [0, 0, 1]]);
    });

    it('should return array, complex numbers', function () {
      var m = new SparseMatrix({
        values: [new Complex(1, 1), new Complex(4, 4), new Complex(5, 5), new Complex(2, 2), new Complex(3, 3), new Complex(6, 6)],
        index: [0, 2, 2, 0, 1, 2],
        ptr: [0, 2, 3, 6],
        size: [3, 3]
      });

      var a = m.toArray();

      _assert2.default.deepEqual(a, [[new Complex(1, 1), 0, new Complex(2, 2)], [0, 0, new Complex(3, 3)], [new Complex(4, 4), new Complex(5, 5), new Complex(6, 6)]]);
    });
  });

  describe('diagonal', function () {

    it('should create Sparse Matrix (n x n)', function () {

      var m = SparseMatrix.diagonal([3, 3], 1);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 1, 1]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    });

    it('should create Sparse Matrix (n x n), k > 0', function () {

      var m = SparseMatrix.diagonal([3, 3], 1, 1);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 1]);
      _assert2.default.deepEqual(m._index, [0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 0, 1, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 1, 0], [0, 0, 1], [0, 0, 0]]);
    });

    it('should create Sparse Matrix (n x n), k < 0', function () {

      var m = SparseMatrix.diagonal([3, 3], 1, -1);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 1]);
      _assert2.default.deepEqual(m._index, [1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0], [1, 0, 0], [0, 1, 0]]);
    });

    it('should create Sparse Matrix (n x n), vector value', function () {

      var m = SparseMatrix.diagonal([3, 3], [1, 2, 3]);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 2, 3]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[1, 0, 0], [0, 2, 0], [0, 0, 3]]);
    });

    it('should create Sparse Matrix (n x n), vector value, k > 0', function () {

      var m = SparseMatrix.diagonal([3, 3], [1, 2], 1);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 2]);
      _assert2.default.deepEqual(m._index, [0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 0, 1, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 1, 0], [0, 0, 2], [0, 0, 0]]);
    });

    it('should create Sparse Matrix (n x n), vector value, k < 0', function () {

      var m = SparseMatrix.diagonal([3, 3], [1, 2], -1);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 2]);
      _assert2.default.deepEqual(m._index, [1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0], [1, 0, 0], [0, 2, 0]]);
    });

    it('should create Sparse Matrix (n x n), matrix vector value', function () {

      var m = SparseMatrix.diagonal([3, 3], _index.indexjs.matrix([1, 2, 3]));

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 2, 3]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[1, 0, 0], [0, 2, 0], [0, 0, 3]]);
    });

    it('should create Sparse Matrix (n x n), matrix vector value, k > 0', function () {

      var m = SparseMatrix.diagonal([3, 3], _index.indexjs.matrix([1, 2]), 1);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 2]);
      _assert2.default.deepEqual(m._index, [0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 0, 1, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 1, 0], [0, 0, 2], [0, 0, 0]]);
    });

    it('should create Sparse Matrix (n x n), matrix vector value, k < 0', function () {

      var m = SparseMatrix.diagonal([3, 3], _index.indexjs.matrix([1, 2]), -1);

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [1, 2]);
      _assert2.default.deepEqual(m._index, [1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0], [1, 0, 0], [0, 2, 0]]);
    });

    it('should create Sparse Matrix (n x n), complex number', function () {

      var m = SparseMatrix.diagonal([3, 3], new Complex(1, 1));

      _assert2.default.deepEqual(m._size, [3, 3]);
      _assert2.default.deepEqual(m._values, [new Complex(1, 1), new Complex(1, 1), new Complex(1, 1)]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3]);
    });

    it('should create Sparse Matrix (m x n), m > n', function () {

      var m = SparseMatrix.diagonal([4, 3], 1);

      _assert2.default.deepEqual(m._size, [4, 3]);
      _assert2.default.deepEqual(m._values, [1, 1, 1]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 0]]);
    });

    it('should create Sparse Matrix (m x n), m > n, k > 0', function () {

      var m = SparseMatrix.diagonal([4, 3], 1, 1);

      _assert2.default.deepEqual(m._size, [4, 3]);
      _assert2.default.deepEqual(m._values, [1, 1]);
      _assert2.default.deepEqual(m._index, [0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 0, 1, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 1, 0], [0, 0, 1], [0, 0, 0], [0, 0, 0]]);
    });

    it('should create Sparse Matrix (m x n), m > n, k < 0', function () {

      var m = SparseMatrix.diagonal([4, 3], 1, -1);

      _assert2.default.deepEqual(m._size, [4, 3]);
      _assert2.default.deepEqual(m._values, [1, 1, 1]);
      _assert2.default.deepEqual(m._index, [1, 2, 3]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0], [1, 0, 0], [0, 1, 0], [0, 0, 1]]);
    });

    it('should create Sparse Matrix (m x n), m > n, vector value', function () {

      var m = SparseMatrix.diagonal([4, 3], [1, 2, 3]);

      _assert2.default.deepEqual(m._size, [4, 3]);
      _assert2.default.deepEqual(m._values, [1, 2, 3]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[1, 0, 0], [0, 2, 0], [0, 0, 3], [0, 0, 0]]);
    });

    it('should create Sparse Matrix (m x n), m > n, vector value, k > 0', function () {

      var m = SparseMatrix.diagonal([4, 3], [1, 2], 1);

      _assert2.default.deepEqual(m._size, [4, 3]);
      _assert2.default.deepEqual(m._values, [1, 2]);
      _assert2.default.deepEqual(m._index, [0, 1]);
      _assert2.default.deepEqual(m._ptr, [0, 0, 1, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 1, 0], [0, 0, 2], [0, 0, 0], [0, 0, 0]]);
    });

    it('should create Sparse Matrix (m x n), m > n, vector value, k < 0', function () {

      var m = SparseMatrix.diagonal([4, 3], [1, 2, 3], -1);

      _assert2.default.deepEqual(m._size, [4, 3]);
      _assert2.default.deepEqual(m._values, [1, 2, 3]);
      _assert2.default.deepEqual(m._index, [1, 2, 3]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0], [1, 0, 0], [0, 2, 0], [0, 0, 3]]);
    });

    it('should create Sparse Matrix (m x n), m < n', function () {

      var m = SparseMatrix.diagonal([3, 4], 1);

      _assert2.default.deepEqual(m._size, [3, 4]);
      _assert2.default.deepEqual(m._values, [1, 1, 1]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3, 3]);

      _assert2.default.deepEqual(m.toArray(), [[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]]);
    });

    it('should create Sparse Matrix (m x n), m < n, k > 0', function () {

      var m = SparseMatrix.diagonal([3, 4], 1, 1);

      _assert2.default.deepEqual(m._size, [3, 4]);
      _assert2.default.deepEqual(m._values, [1, 1, 1]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[0, 1, 0, 0], [0, 0, 1, 0], [0, 0, 0, 1]]);
    });

    it('should create Sparse Matrix (m x n), m < n, k < 0', function () {

      var m = SparseMatrix.diagonal([3, 4], 1, -1);

      _assert2.default.deepEqual(m._size, [3, 4]);
      _assert2.default.deepEqual(m._values, [1, 1]);
      _assert2.default.deepEqual(m._index, [1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 2, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, 0], [1, 0, 0, 0], [0, 1, 0, 0]]);
    });

    it('should create Sparse Matrix (m x n), m < n, vector value', function () {

      var m = SparseMatrix.diagonal([3, 4], [1, 2, 3]);

      _assert2.default.deepEqual(m._size, [3, 4]);
      _assert2.default.deepEqual(m._values, [1, 2, 3]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 3, 3]);

      _assert2.default.deepEqual(m.toArray(), [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0]]);
    });

    it('should create Sparse Matrix (m x n), m < n, vector value, k > 0', function () {

      var m = SparseMatrix.diagonal([3, 4], [1, 2, 3], 1);

      _assert2.default.deepEqual(m._size, [3, 4]);
      _assert2.default.deepEqual(m._values, [1, 2, 3]);
      _assert2.default.deepEqual(m._index, [0, 1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 0, 1, 2, 3]);

      _assert2.default.deepEqual(m.toArray(), [[0, 1, 0, 0], [0, 0, 2, 0], [0, 0, 0, 3]]);
    });

    it('should create Sparse Matrix (m x n), m < n, vector value, k < 0', function () {

      var m = SparseMatrix.diagonal([3, 4], [1, 2], -1);

      _assert2.default.deepEqual(m._size, [3, 4]);
      _assert2.default.deepEqual(m._values, [1, 2]);
      _assert2.default.deepEqual(m._index, [1, 2]);
      _assert2.default.deepEqual(m._ptr, [0, 1, 2, 2, 2]);

      _assert2.default.deepEqual(m.toArray(), [[0, 0, 0, 0], [1, 0, 0, 0], [0, 2, 0, 0]]);
    });

    it('should get Sparse Matrix diagonal (n x n)', function () {

      var m = new SparseMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

      _assert2.default.deepEqual(m.diagonal(), new SparseMatrix([1, 1, 1]));
    });

    it('should get Sparse Matrix diagonal (n x n), k > 0', function () {

      var m = new SparseMatrix([[1, 2, 0], [0, 1, 3], [0, 0, 1]]);

      _assert2.default.deepEqual(m.diagonal(1), new SparseMatrix([2, 3]));
    });

    it('should get Sparse Matrix diagonal (n x n), k < 0', function () {

      var m = new SparseMatrix([[1, 0, 0], [2, 1, 0], [0, 3, 1]]);

      _assert2.default.deepEqual(m.diagonal(-1), new SparseMatrix([2, 3]));
    });

    it('should get Sparse Matrix diagonal (m x n), m > n', function () {

      var m = new SparseMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 0]]);

      _assert2.default.deepEqual(m.diagonal(), new SparseMatrix([1, 1, 1]));
    });

    it('should get Sparse Matrix diagonal (m x n), m > n, k > 0', function () {

      var m = new SparseMatrix([[1, 2, 0], [0, 1, 3], [0, 0, 1], [0, 0, 0]]);

      _assert2.default.deepEqual(m.diagonal(1), new SparseMatrix([2, 3]));
    });

    it('should get Sparse Matrix diagonal (m x n), m > n, k < 0', function () {

      var m = new SparseMatrix([[1, 0, 0], [2, 1, 0], [0, 3, 1], [0, 0, 4]]);

      _assert2.default.deepEqual(m.diagonal(-1), new SparseMatrix([2, 3, 4]));
    });

    it('should get Sparse Matrix diagonal (m x n), m < n', function () {

      var m = new SparseMatrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]]);

      _assert2.default.deepEqual(m.diagonal(), new SparseMatrix([1, 1, 1]));
    });

    it('should get Sparse Matrix diagonal (m x n), m < n, k > 0', function () {

      var m = new SparseMatrix([[1, 2, 0, 0], [0, 1, 3, 0], [0, 0, 1, 4]]);

      _assert2.default.deepEqual(m.diagonal(1), new SparseMatrix([2, 3, 4]));
    });

    it('should get Sparse Matrix diagonal (m x n), m < n, k < 0', function () {

      var m = new SparseMatrix([[1, 0, 0, 0], [2, 1, 0, 0], [4, 3, 1, 0]]);

      _assert2.default.deepEqual(m.diagonal(-1), new SparseMatrix([2, 3]));

      _assert2.default.deepEqual(m.diagonal(-2), new SparseMatrix([4]));
    });
  });

  describe('swapRows', function () {

    it('should swap rows with values', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
      m.swapRows(1, 2);
      _assert2.default.deepEqual(m.valueOf(), [[1, 2, 3], [7, 8, 9], [4, 5, 6], [10, 11, 12]]);
    });

    it('should swap row with value and no values', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6], [0, 0, 0], [10, 11, 12]]);
      m.swapRows(1, 2);
      _assert2.default.deepEqual(m.valueOf(), [[1, 2, 3], [0, 0, 0], [4, 5, 6], [10, 11, 12]]);
    });

    it('should swap row with no value and values', function () {
      var m = new SparseMatrix([[1, 2, 3], [4, 5, 6], [0, 0, 0], [10, 11, 12]]);
      m.swapRows(2, 1);
      _assert2.default.deepEqual(m.valueOf(), [[1, 2, 3], [0, 0, 0], [4, 5, 6], [10, 11, 12]]);
    });

    it('should swap rows with missing values', function () {
      var m = new SparseMatrix([[1, 2, 3], [0, 5, 0], [7, 0, 9], [10, 11, 12]]);
      m.swapRows(2, 1);
      _assert2.default.deepEqual(m.valueOf(), [[1, 2, 3], [7, 0, 9], [0, 5, 0], [10, 11, 12]]);
    });

    it('should swap last row with another row', function () {
      var m = new SparseMatrix([[1, 2, 3], [0, 5, 0], [7, 0, 9], [10, 11, 12]]);
      m.swapRows(3, 1);
      _assert2.default.deepEqual(m.valueOf(), [[1, 2, 3], [10, 11, 12], [7, 0, 9], [0, 5, 0]]);
    });

    it('should swap first row with another row', function () {
      var m = new SparseMatrix([[0, 2, 0], [0, 5, 0], [7, 0, 9], [10, 0, 0]]);
      m.swapRows(0, 2);
      _assert2.default.deepEqual(m.valueOf(), [[7, 0, 9], [0, 5, 0], [0, 2, 0], [10, 0, 0]]);
    });

    it('should swap rows on a pattern matrix', function () {
      var m = new SparseMatrix({
        values: undefined,
        index: [0, 1, 2, 0],
        ptr: [0, 2, 3, 4],
        size: [3, 3]
      });

      m.swapRows(0, 2);

      _assert2.default.deepEqual(m.valueOf(), [[0, 1, 0], [1, 0, 0], [1, 0, 1]]);
    });
  });
});
