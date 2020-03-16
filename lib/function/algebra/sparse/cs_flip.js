'use strict';

function factory () {

  /**
   * This function "flips" its input about the integer -1.
   *
   * @param {Number}  i               The value to flip
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_flip = function (i) {
    // flip the value
    return -i - 2;
  };

  return cs_flip;
}

var name_name = 'cs_flip';
var path_path = 'sparse';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
