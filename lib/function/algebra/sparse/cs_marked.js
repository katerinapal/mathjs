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

var name_name = 'cs_marked';
var path_path = 'sparse';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
