'use strict';

function factory (type, config, load) {

  var cs_flip = load(cs_flip_obj);

  /**
   * Marks the node at w[j]
   *
   * @param {Array}   w               The array
   * @param {Number}  j               The array index
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_mark = function (w, j) {
    // mark w[j]
    w[j] = cs_flip(w [j]);
  };

  return cs_mark;
}

var name_name = 'cs_mark';
var path_path = 'sparse';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
