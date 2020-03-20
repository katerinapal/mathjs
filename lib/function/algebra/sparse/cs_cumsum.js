'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory() {

  /**
   * It sets the p[i] equal to the sum of c[0] through c[i-1].
   *
   * @param {Array}   ptr             The Sparse Matrix ptr array
   * @param {Array}   c               The Sparse Matrix ptr array
   * @param {Number}  n               The number of columns
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_cumsum = function cs_cumsum(ptr, c, n) {
    // variables
    var i;
    var nz = 0;

    for (i = 0; i < n; i++) {
      // initialize ptr @ i
      ptr[i] = nz;
      // increment number of nonzeros
      nz += c[i];
      // also copy p[0..n-1] back into c[0..n-1]
      c[i] = ptr[i];
    }
    // finalize ptr
    ptr[n] = nz;
    // return sum (c [0..n-1])
    return nz;
  };

  return cs_cumsum;
}

var name_name = 'cs_cumsum';
var path_path = 'sparse';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
