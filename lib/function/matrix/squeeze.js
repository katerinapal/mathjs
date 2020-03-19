import { clone as utilsobject_clonejs } from "../../utils/object";
import { size as utilsarray_sizejs } from "../../utils/array";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
'use strict';

function factory (type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

  /**
   * Squeeze a matrix, remove inner and outer singleton dimensions from a matrix.
   *
   * Syntax:
   *
   *     math.squeeze(x)
   *
   * Examples:
   *
   *     math.squeeze([3]);           // returns 3
   *     math.squeeze([[3]]);         // returns 3
   *
   *     var A = math.zeros(3, 1);    // returns [[0], [0], [0]] (size 3x1)
   *     math.squeeze(A);             // returns [0, 0, 0] (size 3)
   *
   *     var B = math.zeros(1, 3);    // returns [[0, 0, 0]] (size 1x3)
   *     math.squeeze(B);             // returns [0, 0, 0] (size 3)
   *
   *     // only inner and outer dimensions are removed
   *     var C = math.zeros(2, 1, 3); // returns [[[0, 0, 0]], [[0, 0, 0]]] (size 2x1x3)
   *     math.squeeze(C);             // returns [[[0, 0, 0]], [[0, 0, 0]]] (size 2x1x3)
   *
   * See also:
   *
   *     subset
   *
   * @param {Matrix | Array} x      Matrix to be squeezed
   * @return {Matrix | Array} Squeezed matrix
   */
  var squeeze = typed('squeeze', {
    'Array': function (x) {
      return array.squeeze(utilsobject_clonejs(x));
    },

    'Matrix': function (x) {
      var res = array.squeeze(x.toArray());
      // FIXME: return the same type of matrix as the input
      return Array.isArray(res) ? matrix(res) : res;
    },

    'any': function (x) {
      // scalar
      return utilsobject_clonejs(x);
    }
  });

  squeeze.toTex = undefined; // use default template

  return squeeze;
}

var name_name = 'squeeze';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
