import { clone } from "../../utils/object";
import { size as _flatten } from "../../utils/array";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
'use strict';

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
      return _flatten;
    },

    'Matrix': function (x) {
      var flat = _flatten;
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
