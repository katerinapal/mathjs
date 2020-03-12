'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory() {

  /**
   * Permutes a vector; x = P'b. In MATLAB notation, x(p)=b.
   *
   * @param {Array} p           The permutation vector of length n. null value denotes identity
   * @param {Array} b           The input vector
   *
   * @return {Array}            The output vector x = P'b
   */
  var cs_ipvec = function cs_ipvec(p, b, n) {
    // vars 
    var k;
    var n = b.length;
    var x = [];
    // check permutation vector was provided, p = null denotes identity
    if (p) {
      // loop vector
      for (k = 0; k < n; k++) {
        // apply permutation
        x[p[k]] = b[k];
      }
    } else {
      // loop vector
      for (k = 0; k < n; k++) {
        // x[i] = b[i]
        x[k] = b[k];
      }
    }
    return x;
  };

  return cs_ipvec;
}

var name_exportedObj = 'cs_ipvec';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
