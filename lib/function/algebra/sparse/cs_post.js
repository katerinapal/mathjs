'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _cs_tdfs = require('./cs_tdfs');

var cs_tdfs_obj = _interopRequireWildcard(_cs_tdfs);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load) {

  var cs_tdfs = load(cs_tdfs_obj);

  /**
   * Post order a tree of forest
   *
   * @param {Array}   parent          The tree or forest
   * @param {Number}  n               Number of columns
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_post = function cs_post(parent, n) {
    // check inputs
    if (!parent) return null;
    // vars 
    var k = 0;
    var j;
    // allocate result
    var post = []; // (n);
    // workspace, head: first n entries, next: next n entries, stack: last n entries
    var w = []; // (3 * n);
    var head = 0;
    var next = n;
    var stack = 2 * n;
    // initialize workspace
    for (j = 0; j < n; j++) {
      // empty linked lists
      w[head + j] = -1;
    }
    // traverse nodes in reverse order
    for (j = n - 1; j >= 0; j--) {
      // check j is a root
      if (parent[j] == -1) continue;
      // add j to list of its parent
      w[next + j] = w[head + parent[j]];
      w[head + parent[j]] = j;
    }
    // loop nodes
    for (j = 0; j < n; j++) {
      // skip j if it is not a root
      if (parent[j] != -1) continue;
      // depth-first search
      k = cs_tdfs(j, k, w, head, next, post, stack);
    }
    return post;
  };

  return cs_post;
}

var name_exportedObj = 'cs_post';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
