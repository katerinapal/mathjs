import * as cs_flip from "./cs_flip";
'use strict';

function factory (type, config, load) {

  var cs_flip = load(cs_flip);
  
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

var name_exportedObj = 'cs_unflip';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
