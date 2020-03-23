"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _matrix = require("../../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _lup = require("../decomposition/lup");

var decompositionlup_obj = _interopRequireWildcard(_lup);

var _slu = require("../decomposition/slu");

var decompositionslu_obj = _interopRequireWildcard(_slu);

var _cs_ipvec = require("../sparse/cs_ipvec");

var sparsecs_ipvec_obj = _interopRequireWildcard(_cs_ipvec);

var _solveValidation = require("./utils/solveValidation");

var _usolve = require("./usolve");

var usolve_obj = _interopRequireWildcard(_usolve);

var _lsolve = require("./lsolve");

var lsolve_obj = _interopRequireWildcard(_lsolve);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

var isArray = Array.isArray;

function factory(type, config, load, typed) {

  var matrix = load(typematrixfunctionmatrix_obj);
  var lup = load(decompositionlup_obj);
  var slu = load(decompositionslu_obj);
  var cs_ipvec = load(sparsecs_ipvec_obj);

  var solveValidation = load(_solveValidation.factory);

  var usolve = load(usolve_obj);
  var lsolve = load(lsolve_obj);

  /**
   * Solves the linear system `A * x = b` where `A` is an [n x n] matrix and `b` is a [n] column vector.
   *
   * Syntax:
   *
   *    math.lusolve(A, b)     // returns column vector with the solution to the linear system A * x = b
   *    math.lusolve(lup, b)   // returns column vector with the solution to the linear system A * x = b, lup = math.lup(A)
   *
   * Examples:
   *
   *    var m = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]];
   *
   *    var x = math.lusolve(m, [-1, -1, -1, -1]);        // x = [[-1], [-0.5], [-1/3], [-0.25]]
   *
   *    var f = math.lup(m);
   *    var x1 = math.lusolve(f, [-1, -1, -1, -1]);       // x1 = [[-1], [-0.5], [-1/3], [-0.25]]
   *    var x2 = math.lusolve(f, [1, 2, 1, -1]);          // x2 = [[1], [1], [1/3], [-0.25]]
   *
   *    var a = [[-2, 3], [2, 1]];
   *    var b = [11, 9];
   *    var x = lusolve(a, b);  // [[-5.5], [20]]
   *
   * See also:
   *
   *    lup, slu, lsolve, usolve
   *
   * @param {Matrix | Array | Object} A      Invertible Matrix or the Matrix LU decomposition
   * @param {Matrix | Array} b               Column Vector
   * @param {number} [order]                 The Symbolic Ordering and Analysis order, see slu for details. Matrix must be a SparseMatrix
   * @param {Number} [threshold]             Partial pivoting threshold (1 for partial pivoting), see slu for details. Matrix must be a SparseMatrix.
   *
   * @return {DenseMatrix | Array}           Column vector with the solution to the linear system A * x = b
   */
  var lusolve = typed('lusolve', {

    'Array, Array | Matrix': function ArrayArrayMatrix(a, b) {
      // convert a to matrix
      a = matrix(a);
      // matrix lup decomposition
      var d = lup(a);
      // solve
      var x = _lusolve(d.L, d.U, d.p, null, b);
      // convert result to array
      return x.valueOf();
    },

    'DenseMatrix, Array | Matrix': function DenseMatrixArrayMatrix(a, b) {
      // matrix lup decomposition
      var d = lup(a);
      // solve
      return _lusolve(d.L, d.U, d.p, null, b);
    },

    'SparseMatrix, Array | Matrix': function SparseMatrixArrayMatrix(a, b) {
      // matrix lup decomposition
      var d = lup(a);
      // solve
      return _lusolve(d.L, d.U, d.p, null, b);
    },

    'SparseMatrix, Array | Matrix, number, number': function SparseMatrixArrayMatrixNumberNumber(a, b, order, threshold) {
      // matrix lu decomposition
      var d = slu(a, order, threshold);
      // solve
      return _lusolve(d.L, d.U, d.p, d.q, b);
    },

    'Object, Array | Matrix': function ObjectArrayMatrix(d, b) {
      // solve
      return _lusolve(d.L, d.U, d.p, d.q, b);
    }
  });

  var _toMatrix = function _toMatrix(a) {
    // check it is a matrix
    if (a && a.isMatrix === true) return a;
    // check array
    if (isArray(a)) return matrix(a);
    // throw
    throw new TypeError('Invalid Matrix LU decomposition');
  };

  var _lusolve = function _lusolve(l, u, p, q, b) {
    // verify L, U, P
    l = _toMatrix(l);
    u = _toMatrix(u);
    // validate matrix and vector
    b = solveValidation(l, b, false);
    // apply row permutations if needed (b is a DenseMatrix)
    if (p) b._data = cs_ipvec(p, b._data);
    // use forward substitution to resolve L * y = b
    var y = lsolve(l, b);
    // use backward substitution to resolve U * x = y
    var x = usolve(u, y);
    // apply column permutations if needed (x is a DenseMatrix)
    if (q) x._data = cs_ipvec(q, x._data);
    // return solution
    return x;
  };

  return lusolve;
}

var name_name = 'lusolve';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
