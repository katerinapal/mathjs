'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory() {

  /**
   * Checks if the node at w[j] is marked
   *
   * @param {Array}   w               The array
   * @param {Number}  j               The array index
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_marked = function cs_marked(w, j) {
    // check node is marked
    return w[j] < 0;
  };

  return cs_marked;
}

var name_exportedObj = 'cs_marked';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
