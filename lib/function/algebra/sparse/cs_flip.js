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

var name_exportedObj = 'cs_flip';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
