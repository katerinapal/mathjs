'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _error = require('../../transform/error.transform');

'use strict';

function factory(type, config, load, typed) {
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
      } else if (object && typeof object.subset === 'function') {
        // Matrix
        return object.subset(index, value);
      } else if (typeof object === 'string') {
        // TODO: move setStringSubset into a separate util file, use that
        return subset(object, index, value);
      } else if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
        if (!index.isObjectProperty()) {
          throw TypeError('Cannot apply a numeric index as object property');
        }
        object[index.getObjectProperty()] = value;
        return object;
      } else {
        throw new TypeError('Cannot apply index: unsupported type of object');
      }
    } catch (err) {
      throw (0, _error.transform)(err);
    }
  };
}

var factory_factory = factory;
exports.factory = factory_factory;
