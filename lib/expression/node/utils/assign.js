import { transform as transformerrortransform_transformjs } from "../../transform/error.transform";
import * as functionmatrixsubset_obj from "../../../function/matrix/subset";
import * as typematrixfunctionmatrix_obj from "../../../type/matrix/function/matrix";
'use strict';

function factory (type, config, load, typed) {
  var subset = load(functionmatrixsubset_obj);
  var matrix = load(typematrixfunctionmatrix_obj);

  /**
   * Replace part of an object:
   *
   * - Assign a property to an object
   * - Replace a part of a string
   * - Replace a matrix subset
   *
   * @param {Object | Array | Matrix | string} object
   * @param {Index} index
   * @param {*} value
   * @return {Object | Array | Matrix | string} Returns the original object
   *                                            except in case of a string
   */
  return function assign(object, index, value) {
    try {
      if (Array.isArray(object)) {
        return matrix(object).subset(index, value).valueOf();
      }
      else if (object && typeof object.subset === 'function') { // Matrix
        return object.subset(index, value);
      }
      else if (typeof object === 'string') {
        // TODO: move setStringSubset into a separate util file, use that
        return subset(object, index, value);
      }
      else if (typeof object === 'object') {
        if (!index.isObjectProperty()) {
          throw TypeError('Cannot apply a numeric index as object property');
        }
        object[index.getObjectProperty()] = value;
        return object;
      }
      else {
        throw new TypeError('Cannot apply index: unsupported type of object');
      }
    }
    catch (err) {
        throw transformerrortransform_transformjs(err);
    }
  };
}

var factory_factory = factory;
export { factory_factory as factory };
