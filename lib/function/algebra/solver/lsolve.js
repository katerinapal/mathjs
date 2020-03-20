"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _matrix = require("../../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _divideScalar = require("../../arithmetic/divideScalar");

var _multiplyScalar = require("../../arithmetic/multiplyScalar");

var _subtract = require("../../arithmetic/subtract");

var arithmeticsubtract_obj = _interopRequireWildcard(_subtract);

var _equalScalar = require("../../relational/equalScalar");

var _solveValidation = require("./utils/solveValidation");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {

  var matrix = load(typematrixfunctionmatrix_obj);
  var divideScalar = load(_divideScalar.factory);
  var multiplyScalar = load(_multiplyScalar.factory);
  var subtract = load(arithmeticsubtract_obj);
  var equalScalar = load(_equalScalar.factory);

  var solveValidation = load(_solveValidation.factory);

  var DenseMatrix = type.DenseMatrix;

  /** 
   * Solves the linear equation system by forwards substitution. Matrix must be a lower triangular matrix.
   *
   * `L * x = b`
   *
   * Syntax:
   *
   *    math.lsolve(L, b);
   *
   * Examples:
   *
   *    var a = [[-2, 3], [2, 1]];
   *    var b = [11, 9];
   *    var x = lsolve(a, b);  // [[-5.5], [20]]
   *
   * See also:
   *
   *    lup, slu, usolve, lusolve
   *
   * @param {Matrix, Array} L       A N x N matrix or array (L)
   * @param {Matrix, Array} b       A column vector with the b values
   *
   * @return {DenseMatrix | Array}  A column vector with the linear system solution (x)
   */
  var lsolve = typed('lsolve', {

    'SparseMatrix, Array | Matrix': function SparseMatrixArrayMatrix(m, b) {
      // process matrix
      return _sparseForwardSubstitution(m, b);
    },

    'DenseMatrix, Array | Matrix': function DenseMatrixArrayMatrix(m, b) {
      // process matrix
      return _denseForwardSubstitution(m, b);
    },

    'Array, Array | Matrix': function ArrayArrayMatrix(a, b) {
      // create dense matrix from array
      var m = matrix(a);
      // use matrix implementation
      var r = _denseForwardSubstitution(m, b);
      // result
      return r.valueOf();
    }
  });

  var _denseForwardSubstitution = function _denseForwardSubstitution(m, b) {
    // validate matrix and vector, return copy of column vector b
    b = solveValidation(m, b, true);
    // column vector data
    var bdata = b._data;
    // rows & columns
    var rows = m._size[0];
    var columns = m._size[1];
    // result
    var x = [];
    // data
    var data = m._data;
    // forward solve m * x = b, loop columns
    for (var j = 0; j < columns; j++) {
      // b[j]
      var bj = bdata[j][0] || 0;
      // x[j]
      var xj;
      // forward substitution (outer product) avoids inner looping when bj == 0
      if (!equalScalar(bj, 0)) {
        // value @ [j, j]
        var vjj = data[j][j];
        // check vjj
        if (equalScalar(vjj, 0)) {
          // system cannot be solved
          throw new Error('Linear system cannot be solved since matrix is singular');
        }
        // calculate xj
        xj = divideScalar(bj, vjj);
        // loop rows
        for (var i = j + 1; i < rows; i++) {
          // update copy of b
          bdata[i] = [subtract(bdata[i][0] || 0, multiplyScalar(xj, data[i][j]))];
        }
      } else {
        // zero @ j
        xj = 0;
      }
      // update x
      x[j] = [xj];
    }
    // return vector
    return new DenseMatrix({
      data: x,
      size: [rows, 1]
    });
  };

  var _sparseForwardSubstitution = function _sparseForwardSubstitution(m, b) {
    // validate matrix and vector, return copy of column vector b
    b = solveValidation(m, b, true);
    // column vector data
    var bdata = b._data;
    // rows & columns
    var rows = m._size[0];
    var columns = m._size[1];
    // matrix arrays
    var values = m._values;
    var index = m._index;
    var ptr = m._ptr;
    // vars
    var i, k;
    // result
    var x = [];
    // forward solve m * x = b, loop columns
    for (var j = 0; j < columns; j++) {
      // b[j]
      var bj = bdata[j][0] || 0;
      // forward substitution (outer product) avoids inner looping when bj == 0
      if (!equalScalar(bj, 0)) {
        // value @ [j, j]
        var vjj = 0;
        // lower triangular matrix values & index (column j)
        var jvalues = [];
        var jindex = [];
        // last index in column
        var l = ptr[j + 1];
        // values in column, find value @ [j, j]
        for (k = ptr[j]; k < l; k++) {
          // row
          i = index[k];
          // check row (rows are not sorted!)
          if (i === j) {
            // update vjj
            vjj = values[k];
          } else if (i > j) {
            // store lower triangular
            jvalues.push(values[k]);
            jindex.push(i);
          }
        }
        // at this point we must have a value @ [j, j]
        if (equalScalar(vjj, 0)) {
          // system cannot be solved, there is no value @ [j, j]
          throw new Error('Linear system cannot be solved since matrix is singular');
        }
        // calculate xj
        var xj = divideScalar(bj, vjj);
        // loop lower triangular
        for (k = 0, l = jindex.length; k < l; k++) {
          // row
          i = jindex[k];
          // update copy of b
          bdata[i] = [subtract(bdata[i][0] || 0, multiplyScalar(xj, jvalues[k]))];
        }
        // update x
        x[j] = [xj];
      } else {
        // update x
        x[j] = [0];
      }
    }
    // return vector
    return new DenseMatrix({
      data: x,
      size: [rows, 1]
    });
  };

  return lsolve;
}

var name_name = 'lsolve';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
