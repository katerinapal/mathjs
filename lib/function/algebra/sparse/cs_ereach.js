"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _cs_marked = require("./cs_marked");

var cs_marked_obj = _interopRequireWildcard(_cs_marked);

var _cs_mark = require("./cs_mark");

var cs_mark_obj = _interopRequireWildcard(_cs_mark);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load) {

  var cs_marked = load(cs_marked_obj);
  var cs_mark = load(cs_mark_obj);

  /**
   * Find nonzero pattern of Cholesky L(k,1:k-1) using etree and triu(A(:,k))
   *
   * @param {Matrix}  a               The A matrix
   * @param {Number}  k               The kth column in A
   * @param {Array}   parent          The parent vector from the symbolic analysis result
   * @param {Array}   w               The nonzero pattern xi[top] .. xi[n - 1], an array of size = 2 * n
   *                                  The first n entries is the nonzero pattern, the last n entries is the stack
   *
   * @return {Number}                 The index for the nonzero pattern
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_ereach = function cs_ereach(a, k, parent, w) {
    // a arrays
    var aindex = a._index;
    var aptr = a._ptr;
    var asize = a._size;
    // columns
    var n = asize[1];
    // initialize top    
    var top = n;
    // vars
    var p, p0, p1, len;
    // mark node k as visited
    cs_mark(w, k);
    // loop values & index for column k
    for (p0 = aptr[k], p1 = aptr[k + 1], p = p0; p < p1; p++) {
      // A(i,k) is nonzero
      var i = aindex[p];
      // only use upper triangular part of A
      if (i > k) continue;
      // traverse up etree
      for (len = 0; !cs_marked(w, i); i = parent[i]) {
        // L(k,i) is nonzero, last n entries in w
        w[n + len++] = i;
        // mark i as visited
        cs_mark(w, i);
      }
      while (len > 0) {
        // decrement top & len
        --top;
        --len;
        // push path onto stack, last n entries in w
        w[n + top] = w[n + len];
      }
    }
    // unmark all nodes
    for (p = top; p < n; p++) {
      // use stack value, last n entries in w
      cs_mark(w, w[n + p]);
    }
    // unmark node k
    cs_mark(w, k);
    // s[top..n-1] contains pattern of L(k,:)
    return top;
  };

  return cs_ereach;
}

var name_name = 'cs_ereach';
var path_path = 'sparse';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
