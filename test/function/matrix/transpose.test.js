"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test transpose
var transpose = _index.indexjs.transpose;

describe('transpose', function () {

  it('should transpose a scalar', function () {
    _assert2.default.deepEqual(transpose(3), 3);
  });

  it('should transpose a vector', function () {
    _assert2.default.deepEqual(transpose([1, 2, 3]), [1, 2, 3]);
    _assert2.default.deepEqual(transpose(_index.indexjs.matrix([1, 2, 3]).toArray()), [1, 2, 3]);
  });

  it('should transpose a 2d matrix', function () {
    _assert2.default.deepEqual(transpose([[1, 2, 3], [4, 5, 6]]), [[1, 4], [2, 5], [3, 6]]);
    _assert2.default.deepEqual(transpose(_index.indexjs.matrix([[1, 2, 3], [4, 5, 6]]).toArray()), [[1, 4], [2, 5], [3, 6]]);
    _assert2.default.deepEqual(transpose([[1, 2], [3, 4]]), [[1, 3], [2, 4]]);
    _assert2.default.deepEqual(transpose([[1, 2, 3, 4]]), [[1], [2], [3], [4]]);
  });

  it('should throw an error for invalid matrix transpose', function () {
    _assert2.default.throws(function () {
      _assert2.default.deepEqual(transpose([[]]), [[]]); // size [2,0]
    });
    _assert2.default.throws(function () {
      transpose([[[1], [2]], [[3], [4]]]); // size [2,2,1]
    });
  });

  it('should throw an error if called with an invalid number of arguments', function () {
    _assert2.default.throws(function () {
      transpose();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      transpose([1, 2], 2);
    }, /TypeError: Too many arguments/);
  });

  describe('DenseMatrix', function () {

    it('should transpose a 2d matrix', function () {
      var m = _index.indexjs.matrix([[1, 2, 3], [4, 5, 6]]);
      var t = transpose(m);
      _assert2.default.deepEqual(t.valueOf(), [[1, 4], [2, 5], [3, 6]]);

      m = _index.indexjs.matrix([[1, 4], [2, 5], [3, 6]]);
      t = transpose(m);
      _assert2.default.deepEqual(t.toArray(), [[1, 2, 3], [4, 5, 6]]);

      m = _index.indexjs.matrix([[1, 2], [3, 4]]);
      t = transpose(m);
      _assert2.default.deepEqual(t.valueOf(), [[1, 3], [2, 4]]);

      m = _index.indexjs.matrix([[1, 2, 3, 4]]);
      t = transpose(m);
      _assert2.default.deepEqual(t.valueOf(), [[1], [2], [3], [4]]);

      m = _index.indexjs.matrix([[1, 2, 3, 4]], 'dense', 'number');
      t = transpose(m);
      _assert2.default.deepEqual(t.valueOf(), [[1], [2], [3], [4]]);
      _assert2.default.ok(t.datatype() === 'number');
    });

    it('should throw an error for invalid matrix transpose', function () {
      var m = _index.indexjs.matrix([[]]);
      _assert2.default.throws(function () {
        transpose(m);
      });

      m = _index.indexjs.matrix([[[1], [2]], [[3], [4]]]);
      _assert2.default.throws(function () {
        transpose(m);
      });
    });
  });

  describe('SparseMatrix', function () {

    it('should transpose a 2d matrix', function () {
      var m = _index.indexjs.sparse([[1, 2, 3], [4, 5, 6]]);
      var t = transpose(m);
      _assert2.default.deepEqual(t.valueOf(), [[1, 4], [2, 5], [3, 6]]);

      m = _index.indexjs.sparse([[1, 4], [2, 5], [3, 6]]);
      t = transpose(m);
      _assert2.default.deepEqual(t.toArray(), [[1, 2, 3], [4, 5, 6]]);

      m = _index.indexjs.sparse([[1, 2], [3, 4]]);
      t = transpose(m);
      _assert2.default.deepEqual(t.valueOf(), [[1, 3], [2, 4]]);

      m = _index.indexjs.sparse([[1, 2, 3, 4]], 'number');
      t = transpose(m);
      _assert2.default.deepEqual(t.valueOf(), [[1], [2], [3], [4]]);
      _assert2.default.ok(t.datatype() === 'number');
    });

    it('should throw an error for invalid matrix transpose', function () {
      var m = _index.indexjs.matrix([[]], 'sparse');
      _assert2.default.throws(function () {
        transpose(m);
      });
    });
  });

  it('should LaTeX transpose', function () {
    var expression = _index.indexjs.parse('transpose([[1,2],[3,4]])');
    _assert2.default.equal(expression.toTex(), '\\left(\\begin{bmatrix}1&2\\\\3&4\\\\\\end{bmatrix}\\right)^\\top');
  });
});
