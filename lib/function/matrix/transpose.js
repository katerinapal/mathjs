"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _object = require("../../utils/object");

var _string = require("../../utils/string");

var _latex = require("../../utils/latex");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

  var DenseMatrix = type.DenseMatrix,
      SparseMatrix = type.SparseMatrix;

  /**
   * Transpose a matrix. All values of the matrix are reflected over its
   * main diagonal. Only two dimensional matrices are supported.
   *
   * Syntax:
   *
   *     math.transpose(x)
   *
   * Examples:
   *
   *     var A = [[1, 2, 3], [4, 5, 6]];
   *     math.transpose(A);               // returns [[1, 4], [2, 5], [3, 6]]
   *
   * See also:
   *
   *     diag, inv, subset, squeeze
   *
   * @param {Array | Matrix} x  Matrix to be transposed
   * @return {Array | Matrix}   The transposed matrix
   */
  var transpose = typed('transpose', {

    'Array': function Array(x) {
      // use dense matrix implementation
      return transpose(matrix(x)).valueOf();
    },

    'Matrix': function Matrix(x) {
      // matrix size
      var size = x.size();

      // result
      var c;

      // process dimensions
      switch (size.length) {
        case 1:
          // vector
          c = x.clone();
          break;

        case 2:
          // rows and columns
          var rows = size[0];
          var columns = size[1];

          // check columns
          if (columns === 0) {
            // throw exception
            throw new RangeError('Cannot transpose a 2D matrix with no columns (size: ' + (0, _string.format)(size) + ')');
          }

          // process storage format
          switch (x.storage()) {
            case 'dense':
              c = _denseTranspose(x, rows, columns);
              break;
            case 'sparse':
              c = _sparseTranspose(x, rows, columns);
              break;
          }
          break;

        default:
          // multi dimensional
          throw new RangeError('Matrix must be a vector or two dimensional (size: ' + (0, _string.format)(this._size) + ')');
      }
      return c;
    },

    // scalars
    'any': function any(x) {
      return (0, _object.clone)(x);
    }
  });

  var _denseTranspose = function _denseTranspose(m, rows, columns) {
    // matrix array
    var data = m._data;
    // transposed matrix data
    var transposed = [];
    var transposedRow;
    // loop columns
    for (var j = 0; j < columns; j++) {
      // initialize row
      transposedRow = transposed[j] = [];
      // loop rows
      for (var i = 0; i < rows; i++) {
        // set data
        transposedRow[i] = (0, _object.clone)(data[i][j]);
      }
    }
    // return matrix
    return new DenseMatrix({
      data: transposed,
      size: [columns, rows],
      datatype: m._datatype
    });
  };

  var _sparseTranspose = function _sparseTranspose(m, rows, columns) {
    // matrix arrays
    var values = m._values;
    var index = m._index;
    var ptr = m._ptr;
    // result matrices
    var cvalues = values ? [] : undefined;
    var cindex = [];
    var cptr = [];
    // row counts
    var w = [];
    for (var x = 0; x < rows; x++) {
      w[x] = 0;
    } // vars
    var p, l, j;
    // loop values in matrix
    for (p = 0, l = index.length; p < l; p++) {
      // number of values in row
      w[index[p]]++;
    }
    // cumulative sum
    var sum = 0;
    // initialize cptr with the cummulative sum of row counts
    for (var i = 0; i < rows; i++) {
      // update cptr
      cptr.push(sum);
      // update sum
      sum += w[i];
      // update w
      w[i] = cptr[i];
    }
    // update cptr
    cptr.push(sum);
    // loop columns
    for (j = 0; j < columns; j++) {
      // values & index in column
      for (var k0 = ptr[j], k1 = ptr[j + 1], k = k0; k < k1; k++) {
        // C values & index
        var q = w[index[k]]++;
        // C[j, i] = A[i, j]
        cindex[q] = j;
        // check we need to process values (pattern matrix)
        if (values) cvalues[q] = (0, _object.clone)(values[k]);
      }
    }
    // return matrix
    return new SparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [columns, rows],
      datatype: m._datatype
    });
  };

  transpose.toTex = { 1: '\\left(${args[0]}\\right)' + _latex.operators['transpose'] };

  return transpose;
}

var name_name = 'transpose';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
