import { object as objectjs } from "../../utils/object";
import { array as arrayjs } from "../../utils/array";
import * as matrixjs from "../../type/matrix/function/matrix";
'use strict';

var object = objectjs;
var array = arrayjs;

function factory (type, config, load, typed) {
  var matrix = load(matrixjs);

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
      return arrayjs.squeeze(objectjs.clone(x));
    },

    'Matrix': function (x) {
      var res = arrayjs.squeeze(x.toArray());
      // FIXME: return the same type of matrix as the input
      return Array.isArray(res) ? matrix(res) : res;
    },

    'any': function (x) {
      // scalar
      return objectjs.clone(x);
    }
  });

  squeeze.toTex = undefined; // use default template

  return squeeze;
}

var name_exportedObj = 'squeeze';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
