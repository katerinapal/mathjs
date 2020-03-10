import { utilsobject } from "../../utils/object";
import { utilsarray } from "../../utils/array";
import * as typematrixfunctionmatrix from "../../type/matrix/function/matrix";
'use strict';

var clone = utilsobject.clone;
var _flatten = utilsarray.flatten;

function factory (type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix);

  /**
   * Flatten a multi dimensional matrix into a single dimensional matrix.
   *
   * Syntax:
   *
   *    math.flatten(x)
   *
   * Examples:
   *
   *    math.flatten([[1,2], [3,4]]);   // returns [1, 2, 3, 4]
   *
   * See also:
   *
   *    concat, resize, size, squeeze
   *
   * @param {Matrix | Array} x   Matrix to be flattened
   * @return {Matrix | Array} Returns the flattened matrix
   */
  var flatten = typed('flatten', {
    'Array': function (x) {
      return utilsarray(utilsobject(x));
    },

    'Matrix': function (x) {
      var flat = utilsarray(utilsobject(x.toArray()));
      // TODO: return the same matrix type as x
      return matrix(flat);
    }
  });

  flatten.toTex = undefined; // use default template

  return flatten;
}

var name_exportedObj = 'flatten';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
