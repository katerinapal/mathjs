import { utilsobject_obj } from "../../utils/object";
import { utilsarray_obj } from "../../utils/array";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
'use strict';

var clone = utilsobject_obj.clone;
var _flatten = utilsarray_obj.flatten;

function factory (type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

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
      return utilsarray_obj(utilsobject_obj(x));
    },

    'Matrix': function (x) {
      var flat = utilsarray_obj(utilsobject_obj(x.toArray()));
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
