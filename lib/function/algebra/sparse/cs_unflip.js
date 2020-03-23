import * as cs_flip_obj from "./cs_flip";
'use strict';

function factory (type, config, load) {

  var cs_flip = load(cs_flip_obj);
  
  /**
   * Flips the value if it is negative of returns the same value otherwise.
   *
   * @param {Number}  i               The value to flip
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_unflip = function (i) {
    // flip the value if it is negative
    return i < 0 ? cs_flip(i) : i;
  };

  return cs_unflip;
}

var name_name = 'cs_unflip';
var path_path = 'sparse';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
