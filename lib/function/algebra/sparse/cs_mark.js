'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory(type, config, load) {

  var cs_flip = load(cs_flip_obj);

  /**
   * Marks the node at w[j]
   *
   * @param {Array}   w               The array
   * @param {Number}  j               The array index
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_mark = function cs_mark(w, j) {
    // mark w[j]
    w[j] = cs_flip(w[j]);
  };

  return cs_mark;
}

var name_name = 'cs_mark';
var path_path = 'sparse';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
