import * as errortransformjs from "../../transform/error.transform";
import * as subsetjs from "../../../function/matrix/subset";
import * as matrixjs from "../../../type/matrix/function/matrix";
'use strict';

var errorTransform = errortransformjs.transform;

function factory (type, config, load, typed) {
  var subset = load(subsetjs);
  var matrix = load(matrixjs);

  /**
   * Retrieve part of an object:
   *
   * - Retrieve a property from an object
   * - Retrieve a part of a string
   * - Retrieve a matrix subset
   *
   * @param {Object | Array | Matrix | string} object
   * @param {Index} index
   * @return {Object | Array | Matrix | string} Returns the subset
   */
  return function access(object, index) {
    try {
      if (Array.isArray(object)) {
        return matrix(object).subset(index).valueOf();
      }
      else if (object && typeof object.subset === 'function') { // Matrix
        return object.subset(index);
      }
      else if (typeof object === 'string') {
        // TODO: move getStringSubset into a separate util file, use that
        return subset(object, index);
      }
      else if (typeof object === 'object') {
        if (!index.isObjectProperty()) {
          throw TypeError('Cannot apply a numeric index as object property');
        }
        return object[index.getObjectProperty()];
      }
      else {
        throw new TypeError('Cannot apply index: unsupported type of object');
      }
    }
    catch (err) {
      throw errortransformjs(err);
    }
  };
}

var factory_exportedObj = factory;
export { factory_exportedObj as factory };
