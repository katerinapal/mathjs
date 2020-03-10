import { utilsarray_obj } from "../../utils/array";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
'use strict';

var array = utilsarray_obj;

function factory (type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

  /**
   * Calculate the size of a matrix or scalar.
   *
   * Syntax:
   *
   *     math.size(x)
   *
   * Examples:
   *
   *     math.size(2.3);                  // returns []
   *     math.size('hello world');        // returns [11]
   *
   *     var A = [[1, 2, 3], [4, 5, 6]];
   *     math.size(A);                    // returns [2, 3]
   *     math.size(math.range(1,6));      // returns [5]
   *
   * See also:
   *
   *     resize, squeeze, subset
   *
   * @param {boolean | number | Complex | Unit | string | Array | Matrix} x  A matrix
   * @return {Array | Matrix} A vector with size of `x`.
   */
  var size = typed('size', {
    'Matrix': function (x) {
      // TODO: return the same matrix type as the input
      return matrix(x.size());
    },

    'Array': utilsarray_obj.size,

    'string': function (x) {
      return (config.matrix === 'Array') ? [x.length] : matrix([x.length]);
    },

    'number | Complex | BigNumber | Unit | boolean | null': function (x) {
      // scalar
      return (config.matrix === 'Array') ? [] : matrix([]);
    }
  });

  size.toTex = undefined; // use default template

  return size;
}

var name_exportedObj = 'size';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
