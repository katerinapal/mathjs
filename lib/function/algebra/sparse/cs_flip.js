'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory() {

  /**
   * This function "flips" its input about the integer -1.
   *
   * @param {Number}  i               The value to flip
   *
   * Reference: http://faculty.cse.tamu.edu/davis/publications.html
   */
  var cs_flip = function cs_flip(i) {
    // flip the value
    return -i - 2;
  };

  return cs_flip;
}

var name_exportedObj = 'cs_flip';
var path_exportedObj = 'sparse';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
