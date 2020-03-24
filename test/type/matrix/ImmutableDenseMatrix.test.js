"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Matrix = _index.indexjs.type.Matrix;
var DenseMatrix = _index.indexjs.type.DenseMatrix;
var ImmutableDenseMatrix = _index.indexjs.type.ImmutableDenseMatrix;
var SparseMatrix = _index.indexjs.type.SparseMatrix;
var Complex = _index.indexjs.type.Complex;
var Range = _index.indexjs.type.Range;

var index = _index.indexjs.index;

describe('ImmutableDenseMatrix', function () {

  describe('constructor', function () {

    it('should create empty matrix if called with no argument', function () {
      var m = new ImmutableDenseMatrix();
      _assert2.default.deepEqual(m._size, [0]);
      _assert2.default.deepEqual(m._data, []);
    });

    it('should create a ImmutableDenseMatrix from an array', function () {
      var m = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
      _assert2.default.deepEqual(m._size, [4, 3]);
      _assert2.default.deepEqual(m._data, [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
    });

    it('should create a ImmutableDenseMatrix from another ImmutableDenseMatrix', function () {
      var m1 = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
      var m2 = new ImmutableDenseMatrix(m1);
      _assert2.default.deepEqual(m1._size, m2._size);
      _assert2.default.deepEqual(m1._data, m2._data);
    });

    it('should create a ImmutableDenseMatrix from a DenseMatrix', function () {
      var m1 = new DenseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
      var m2 = new ImmutableDenseMatrix(m1);
      _assert2.default.deepEqual(m1._size, m2._size);
      _assert2.default.deepEqual(m1._data, m2._data);
    });

    it('should create a ImmutableDenseMatrix from a SparseMatrix', function () {
      var m1 = new SparseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
      var m2 = new ImmutableDenseMatrix(m1);
      _assert2.default.deepEqual(m1.size(), m2.size());
      _assert2.default.deepEqual(m1.toArray(), m2.toArray());
    });

    it('should have a property isMatrix', function () {
      var a = new ImmutableDenseMatrix();
      _assert2.default.strictEqual(a.isMatrix, true);
    });

    it('should have a property isDenseMatrix', function () {
      var a = new ImmutableDenseMatrix();
      _assert2.default.strictEqual(a.isDenseMatrix, true);
    });

    it('should have a property isImmutableDenseMatrix', function () {
      var a = new ImmutableDenseMatrix();
      _assert2.default.strictEqual(a.isImmutableDenseMatrix, true);
    });

    it('should have a property type', function () {
      var a = new ImmutableDenseMatrix();
      _assert2.default.strictEqual(a.type, 'ImmutableDenseMatrix');
    });

    it('should throw an error when called without new keyword', function () {
      _assert2.default.throws(function () {
        ImmutableDenseMatrix();
      }, /Constructor must be called with the new operator/);
    });

    it('should throw an error when called with invalid datatype', function () {
      _assert2.default.throws(function () {
        new ImmutableDenseMatrix([], 1);
      });
    });
  });

  describe('size', function () {

    it('should return the expected size', function () {
      _assert2.default.deepEqual(new ImmutableDenseMatrix().size(), [0]);
      _assert2.default.deepEqual(new ImmutableDenseMatrix([[23]]).size(), [1, 1]);
      _assert2.default.deepEqual(new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6]]).size(), [2, 3]);
      _assert2.default.deepEqual(new ImmutableDenseMatrix([1, 2, 3]).size(), [3]);
      _assert2.default.deepEqual(new ImmutableDenseMatrix([[1], [2], [3]]).size(), [3, 1]);
      _assert2.default.deepEqual(new ImmutableDenseMatrix([[[1], [2], [3]]]).size(), [1, 3, 1]);
      _assert2.default.deepEqual(new ImmutableDenseMatrix([[[3]]]).size(), [1, 1, 1]);
      _assert2.default.deepEqual(new ImmutableDenseMatrix([[]]).size(), [1, 0]);
    });
  });

  describe('toString', function () {

    it('should return string representation of matrix', function () {
      _assert2.default.equal(new ImmutableDenseMatrix([[1, 2], [3, 4]]).toString(), '[[1, 2], [3, 4]]');
      _assert2.default.equal(new ImmutableDenseMatrix([[1, 2], [3, 1 / 3]]).toString(), '[[1, 2], [3, 0.3333333333333333]]');
    });
  });

  describe('toJSON', function () {

    it('should serialize Matrix', function () {
      _assert2.default.deepEqual(new ImmutableDenseMatrix([[1, 2], [3, 4]]).toJSON(), {
        mathjs: 'ImmutableDenseMatrix',
        data: [[1, 2], [3, 4]],
        size: [2, 2],
        datatype: undefined
      });
    });

    it('should serialize Matrix, number datatype', function () {
      _assert2.default.deepEqual(new ImmutableDenseMatrix([[1, 2], [3, 4]], 'number').toJSON(), {
        mathjs: 'ImmutableDenseMatrix',
        data: [[1, 2], [3, 4]],
        size: [2, 2],
        datatype: 'number'
      });
    });
  });

  describe('fromJSON', function () {

    it('should deserialize Matrix', function () {
      var json = {
        mathjs: 'ImmutableDenseMatrix',
        data: [[1, 2], [3, 4]],
        size: [2, 2]
      };
      var m = ImmutableDenseMatrix.fromJSON(json);
      _assert2.default.ok(m instanceof Matrix);

      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.strictEqual(m._data[0][0], 1);
      _assert2.default.strictEqual(m._data[0][1], 2);
      _assert2.default.strictEqual(m._data[1][0], 3);
      _assert2.default.strictEqual(m._data[1][1], 4);
    });

    it('should deserialize Matrix, number datatype', function () {
      var json = {
        mathjs: 'ImmutableDenseMatrix',
        data: [[1, 2], [3, 4]],
        size: [2, 2],
        datatype: 'number'
      };
      var m = ImmutableDenseMatrix.fromJSON(json);
      _assert2.default.ok(m instanceof Matrix);

      _assert2.default.deepEqual(m._size, [2, 2]);
      _assert2.default.strictEqual(m._data[0][0], 1);
      _assert2.default.strictEqual(m._data[0][1], 2);
      _assert2.default.strictEqual(m._data[1][0], 3);
      _assert2.default.strictEqual(m._data[1][1], 4);
      _assert2.default.strictEqual(m._datatype, 'number');
    });
  });

  describe('format', function () {
    it('should format matrix', function () {
      _assert2.default.equal(new ImmutableDenseMatrix([[1, 2], [3, 1 / 3]]).format(), '[[1, 2], [3, 0.3333333333333333]]');
      _assert2.default.equal(new ImmutableDenseMatrix([[1, 2], [3, 1 / 3]]).format(3), '[[1, 2], [3, 0.333]]');
      _assert2.default.equal(new ImmutableDenseMatrix([[1, 2], [3, 1 / 3]]).format(4), '[[1, 2], [3, 0.3333]]');
    });
  });

  describe('resize', function () {

    it('should throw an exception on resize', function () {
      var m = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6]]);
      _assert2.default.throws(function () {
        m.resize([2, 4]);
      }, /Cannot invoke resize on an Immutable Matrix instance/);
    });
  });

  describe('get', function () {

    var m = new ImmutableDenseMatrix([[0, 1], [2, 3]]);

    it('should get a value from the matrix', function () {
      _assert2.default.equal(m.get([1, 0]), 2);
      _assert2.default.equal(m.get([0, 1]), 1);
    });

    it('should throw an error when getting a value out of range', function () {
      _assert2.default.throws(function () {
        m.get([3, 0]);
      });
      _assert2.default.throws(function () {
        m.get([1, 5]);
      });
      _assert2.default.throws(function () {
        m.get([1]);
      });
      _assert2.default.throws(function () {
        m.get([]);
      });
    });

    it('should throw an error in case of dimension mismatch', function () {
      _assert2.default.throws(function () {
        m.get([0, 2, 0, 2, 0, 2]);
      }, /Dimension mismatch/);
    });

    it('should throw an error when getting a value given a invalid index', function () {
      _assert2.default.throws(function () {
        m.get([1.2, 2]);
      });
      _assert2.default.throws(function () {
        m.get([1, -2]);
      });
      _assert2.default.throws(function () {
        m.get(1, 1);
      });
      _assert2.default.throws(function () {
        m.get(_index.indexjs.index(1, 1));
      });
      _assert2.default.throws(function () {
        m.get([[1, 1]]);
      });
    });
  });

  describe('set', function () {

    it('should throw an exception on set', function () {
      var m = new ImmutableDenseMatrix([[0, 0], [0, 0]]);
      _assert2.default.throws(function () {
        m.set([1, 0], 5);
      }, /Cannot invoke set on an Immutable Matrix instance/);
    });
  });

  describe('get subset', function () {

    it('should get the right subset of the matrix', function () {
      var m;

      // get 1-dimensional
      m = new ImmutableDenseMatrix(_index.indexjs.range(0, 10));
      _assert2.default.deepEqual(m.size(), [10]);
      _assert2.default.deepEqual(m.subset(index(new Range(2, 5))).valueOf(), [2, 3, 4]);

      // get 2-dimensional
      m = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
      _assert2.default.deepEqual(m.size(), [3, 3]);
      _assert2.default.deepEqual(m.subset(index(1, 1)), 5);
      _assert2.default.deepEqual(m.subset(index(new Range(0, 2), new Range(0, 2))).valueOf(), [[1, 2], [4, 5]]);
      _assert2.default.deepEqual(m.subset(index(1, new Range(1, 3))).valueOf(), [[5, 6]]);
      _assert2.default.deepEqual(m.subset(index(0, new Range(1, 3))).valueOf(), [[2, 3]]);
      _assert2.default.deepEqual(m.subset(index(new Range(1, 3), 1)).valueOf(), [[5], [8]]);
      _assert2.default.deepEqual(m.subset(index(new Range(1, 3), 2)).valueOf(), [[6], [9]]);

      // get n-dimensional
      m = new ImmutableDenseMatrix([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]);
      _assert2.default.deepEqual(m.size(), [2, 2, 2]);
      _assert2.default.deepEqual(m.subset(index(new Range(0, 2), new Range(0, 2), new Range(0, 2))).valueOf(), m.valueOf());
      _assert2.default.deepEqual(m.subset(index(0, 0, 0)), 1);
      _assert2.default.deepEqual(m.subset(index(1, 1, 1)).valueOf(), 8);
      _assert2.default.deepEqual(m.subset(index(1, 1, new Range(0, 2))).valueOf(), [[[7, 8]]]);
      _assert2.default.deepEqual(m.subset(index(1, new Range(0, 2), 1)).valueOf(), [[[6], [8]]]);
      _assert2.default.deepEqual(m.subset(index(new Range(0, 2), 1, 1)).valueOf(), [[[4]], [[8]]]);
    });

    it('should squeeze the output when index contains a scalar', function () {
      var m = new ImmutableDenseMatrix(_index.indexjs.range(0, 10));
      _assert2.default.deepEqual(m.subset(index(1)), 1);
      _assert2.default.deepEqual(m.subset(index(new Range(1, 2))), new ImmutableDenseMatrix([1]));

      m = new ImmutableDenseMatrix([[1, 2], [3, 4]]);
      _assert2.default.deepEqual(m.subset(index(1, 1)), 4);
      _assert2.default.deepEqual(m.subset(index(new Range(1, 2), 1)), new ImmutableDenseMatrix([[4]]));
      _assert2.default.deepEqual(m.subset(index(1, new Range(1, 2))), new ImmutableDenseMatrix([[4]]));
      _assert2.default.deepEqual(m.subset(index(new Range(1, 2), new Range(1, 2))), new ImmutableDenseMatrix([[4]]));
    });

    it('should throw an error if the given subset is invalid', function () {
      var m = new ImmutableDenseMatrix();
      _assert2.default.throws(function () {
        m.subset([-1]);
      });

      m = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6]]);
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

    it('should throw an error in case of wrong number of arguments', function () {
      var m = new ImmutableDenseMatrix();
      _assert2.default.throws(function () {
        m.subset();
      }, /Wrong number of arguments/);
      _assert2.default.throws(function () {
        m.subset(1, 2, 3, 4);
      }, /Wrong number of arguments/);
    });

    it('should throw an error in case of dimension mismatch', function () {
      var m = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6]]);
      _assert2.default.throws(function () {
        m.subset(index(new Range(0, 2)));
      }, /Dimension mismatch/);
    });
  });

  describe('set subset', function () {

    it('should throw an exception on set subset', function () {
      var m = new ImmutableDenseMatrix([[0, 0], [0, 0]]);
      _assert2.default.throws(function () {
        m.subset(index(0, new Range(0, 2)), [1, 1]);
      }, /Cannot invoke set subset on an Immutable Matrix instance/);
    });
  });

  describe('map', function () {

    it('should apply the given function to all elements in the matrix', function () {
      var m = new ImmutableDenseMatrix([[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]], [[13, 14], [15, 16]]]);
      var m2 = m.map(function (value) {
        return value * 2;
      });
      _assert2.default.deepEqual(m2.valueOf(), [[[2, 4], [6, 8]], [[10, 12], [14, 16]], [[18, 20], [22, 24]], [[26, 28], [30, 32]]]);

      m = new ImmutableDenseMatrix([1]);
      m2 = m.map(function (value) {
        return value * 2;
      });
      _assert2.default.deepEqual(m2.valueOf(), [2]);

      m = new ImmutableDenseMatrix([1, 2, 3]);
      m2 = m.map(function (value) {
        return value * 2;
      });
      _assert2.default.deepEqual(m2.valueOf(), [2, 4, 6]);
    });

    it('should work on empty matrices', function () {
      var m = new ImmutableDenseMatrix([]);
      var m2 = m.map(function (value) {
        return value * 2;
      });
      _assert2.default.deepEqual(m2.toArray(), []);
    });

    it('should invoke callback with parameters value, index, obj', function () {
      var m = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6]]);
      var m2 = m.map(function (value, index, obj) {
        return _index.indexjs.clone([value, index, obj === m]);
      });

      _assert2.default.deepEqual(m2.toArray(), [[[1, [0, 0], true], [2, [0, 1], true], [3, [0, 2], true]], [[4, [1, 0], true], [5, [1, 1], true], [6, [1, 2], true]]]);
    });
  });

  describe('forEach', function () {

    it('should run on all elements of the matrix, last dimension first', function () {
      var m, output;

      m = new ImmutableDenseMatrix([[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]], [[13, 14], [15, 16]]]);
      output = [];
      m.forEach(function (value) {
        output.push(value);
      });
      _assert2.default.deepEqual(output, [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16]);

      m = new ImmutableDenseMatrix([1]);
      output = [];
      m.forEach(function (value) {
        output.push(value);
      });
      _assert2.default.deepEqual(output, [1]);

      m = new ImmutableDenseMatrix([1, 2, 3]);
      output = [];
      m.forEach(function (value) {
        output.push(value);
      });
      _assert2.default.deepEqual(output, [1, 2, 3]);
    });

    it('should work on empty matrices', function () {
      var m = new ImmutableDenseMatrix([]);
      var output = [];
      m.forEach(function (value) {
        output.push(value);
      });
      _assert2.default.deepEqual(output, []);
    });

    it('should invoke callback with parameters value, index, obj', function () {
      var m = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6]]);
      var output = [];
      m.forEach(function (value, index, obj) {
        output.push(_index.indexjs.clone([value, index, obj === m]));
      });
      _assert2.default.deepEqual(output, [[1, [0, 0], true], [2, [0, 1], true], [3, [0, 2], true], [4, [1, 0], true], [5, [1, 1], true], [6, [1, 2], true]]);
    });
  });

  describe('clone', function () {

    it('should clone the matrix properly', function () {
      var m1 = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6]]);

      var m2 = m1.clone();

      _assert2.default.deepEqual(m1._data, m2._data);
    });
  });

  describe('toArray', function () {

    it('should return array', function () {
      var m = new ImmutableDenseMatrix({
        data: [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]],
        size: [4, 3]
      });

      var a = m.toArray();

      _assert2.default.deepEqual(a, [[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
    });

    it('should return array, complex numbers', function () {
      var m = new ImmutableDenseMatrix({
        data: [new Complex(1, 1), new Complex(4, 4), new Complex(5, 5), new Complex(2, 2), new Complex(3, 3), new Complex(6, 6)],
        size: [1, 6]
      });

      var a = m.toArray();

      _assert2.default.deepEqual(a, [new Complex(1, 1), new Complex(4, 4), new Complex(5, 5), new Complex(2, 2), new Complex(3, 3), new Complex(6, 6)]);
    });
  });

  describe('diagonal', function () {

    it('should get matrix diagonal (n x n)', function () {

      var m = new ImmutableDenseMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]);

      _assert2.default.deepEqual(m.diagonal(), new DenseMatrix([1, 1, 1]));
    });

    it('should get matrix diagonal (n x n), k > 0', function () {

      var m = new ImmutableDenseMatrix([[1, 2, 0], [0, 1, 3], [0, 0, 1]]);

      _assert2.default.deepEqual(m.diagonal(1), new DenseMatrix([2, 3]));
    });

    it('should get matrix diagonal (n x n), k < 0', function () {

      var m = new ImmutableDenseMatrix([[1, 0, 0], [2, 1, 0], [0, 3, 1]]);

      _assert2.default.deepEqual(m.diagonal(-1), new DenseMatrix([2, 3]));
    });

    it('should get matrix diagonal (m x n), m > n', function () {

      var m = new ImmutableDenseMatrix([[1, 0, 0], [0, 1, 0], [0, 0, 1], [0, 0, 0]]);

      _assert2.default.deepEqual(m.diagonal(), new DenseMatrix([1, 1, 1]));
    });

    it('should get matrix diagonal (m x n), m > n, k > 0', function () {

      var m = new ImmutableDenseMatrix([[1, 2, 0], [0, 1, 3], [0, 0, 1], [0, 0, 0]]);

      _assert2.default.deepEqual(m.diagonal(1), new DenseMatrix([2, 3]));
    });

    it('should get matrix diagonal (m x n), m > n, k < 0', function () {

      var m = new ImmutableDenseMatrix([[1, 0, 0], [2, 1, 0], [0, 3, 1], [0, 0, 4]]);

      _assert2.default.deepEqual(m.diagonal(-1), new DenseMatrix([2, 3, 4]));
    });

    it('should get matrix diagonal (m x n), m < n', function () {

      var m = new ImmutableDenseMatrix([[1, 0, 0, 0], [0, 1, 0, 0], [0, 0, 1, 0]]);

      _assert2.default.deepEqual(m.diagonal(), new DenseMatrix([1, 1, 1]));
    });

    it('should get matrix diagonal (m x n), m < n, k > 0', function () {

      var m = new ImmutableDenseMatrix([[1, 2, 0, 0], [0, 1, 3, 0], [0, 0, 1, 4]]);

      _assert2.default.deepEqual(m.diagonal(1), new DenseMatrix([2, 3, 4]));
    });

    it('should get matrix diagonal (m x n), m < n, k < 0', function () {

      var m = new ImmutableDenseMatrix([[1, 0, 0, 0], [2, 1, 0, 0], [4, 3, 1, 0]]);

      _assert2.default.deepEqual(m.diagonal(-1), new DenseMatrix([2, 3]));

      _assert2.default.deepEqual(m.diagonal(-2), new DenseMatrix([4]));
    });
  });

  describe('swapRows', function () {

    it('should throw an exception on set subset', function () {
      var m = new ImmutableDenseMatrix([[1, 2, 3], [4, 5, 6], [7, 8, 9], [10, 11, 12]]);
      _assert2.default.throws(function () {
        m.swapRows(1, 2);
      }, /Cannot invoke swapRows on an Immutable Matrix instance/);
    });
  });
});
