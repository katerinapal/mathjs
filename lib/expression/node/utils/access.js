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
      } else if (object && typeof object.subset === 'function') {
        // Matrix
        return object.subset(index);
      } else if (typeof object === 'string') {
        // TODO: move getStringSubset into a separate util file, use that
        return subset(object, index);
      } else if ((typeof object === 'undefined' ? 'undefined' : _typeof(object)) === 'object') {
        if (!index.isObjectProperty()) {
          throw TypeError('Cannot apply a numeric index as object property');
        }
        return object[index.getObjectProperty()];
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
