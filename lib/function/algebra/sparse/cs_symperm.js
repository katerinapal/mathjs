"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _cs_cumsum = require("./cs_cumsum");

var cs_cumsum_obj = _interopRequireWildcard(_cs_cumsum);

var _conj = require("../../complex/conj");

var complexconj_obj = _interopRequireWildcard(_conj);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load) {

  var cs_cumsum = load(cs_cumsum_obj);
  var conj = load(complexconj_obj);

  var SparseMatrix = type.SparseMatrix;

  /**
   * Computes the symmetric permutation of matrix A accessing only
   * the upper triangular part of A.
   *
   * C = P * A * P'
   *
   * @param {Matrix}  a               The A matrix
   * @param {Array}   pinv            The inverse of permutation vector
   * @param {boolean} values          Process matrix values (true)
   *
   * @return {Matrix}                 The C matrix, C = P * A * P'
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_symperm = function cs_symperm(a, pinv, values) {
    // A matrix arrays
    var avalues = a._values;
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    // columns
    var n = asize[1];
    // C matrix arrays
    var cvalues = values && avalues ? [] : null;
    var cindex = []; // (nz);
    var cptr = []; // (n + 1);
    // variables    
    var i, i2, j, j2, p, p0, p1;
    // create workspace vector
    var w = []; // (n);
    // count entries in each column of C
    for (j = 0; j < n; j++) {
      // column j of A is column j2 of C
      j2 = pinv ? pinv[j] : j;
      // loop values in column j
      for (p0 = aptr[j], p1 = aptr[j + 1], p = p0; p < p1; p++) {
        // row
        i = aindex[p];
        // skip lower triangular part of A
        if (i > j) continue;
        // row i of A is row i2 of C
        i2 = pinv ? pinv[i] : i;
        // column count of C
        w[Math.max(i2, j2)]++;
      }
    }
    // compute column pointers of C
    cs_cumsum(cptr, w, n);
    // loop columns
    for (j = 0; j < n; j++) {
      // column j of A is column j2 of C
      j2 = pinv ? pinv[j] : j;
      // loop values in column j
      for (p0 = aptr[j], p1 = aptr[j + 1], p = p0; p < p1; p++) {
        // row
        i = aindex[p];
        // skip lower triangular part of A
        if (i > j) continue;
        // row i of A is row i2 of C
        i2 = pinv ? pinv[i] : i;
        // C index for column j2
        var q = w[Math.max(i2, j2)]++;
        // update C index for entry q
        cindex[q] = Math.min(i2, j2);
        // check we need to process values
        if (cvalues) cvalues[q] = i2 <= j2 ? avalues[p] : conj(avalues[p]);
      }
    }
    // return C matrix
    return new SparseMatrix({
      values: cvalues,
      index: cindex,
      ptr: cptr,
      size: [n, n]
    });
  };

  return cs_symperm;
}

var name_name = 'cs_symperm';
var path_path = 'sparse';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
