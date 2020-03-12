'use strict';

function factory () {

  /**
   * Checks if the node at w[j] is marked
   *
   * @param {Array}   w               The array
   * @param {Number}  j               The array index
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_marked = function (w, j) {
    // check node is marked
    return w[j] < 0;
  };

  return cs_marked;
}

var name_exportedObj = 'cs_marked';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
