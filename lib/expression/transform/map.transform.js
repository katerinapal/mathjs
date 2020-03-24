"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _map2 = require("../../function/matrix/map");

var functionmatrixmap_obj = _interopRequireWildcard(_map2);

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

var maxArgumentCount = null;

/**
 * Attach a transform function to math.map
 * Adds a property transform containing the transform function.
 *
 * This transform creates a one-based index instead of a zero-based index
 */
function factory(type, config, load, typed) {
  var map = load(functionmatrixmap_obj);
  var matrix = load(typematrixfunctionmatrix_obj);

  return typed('max', {
    'Array, function': function ArrayFunction(x, callback) {
      return _map(x, callback, x);
    },

    'Matrix, function': function MatrixFunction(x, callback) {
      return matrix(_map(x.valueOf(), callback, x));
    }
  });
}

/**
 * Map for a multi dimensional array. One-based indexes
 * @param {Array} array
 * @param {function} callback
 * @param {Array} orig
 * @return {Array}
 * @private
 */
function _map(array, callback, orig) {
  // figure out what number of arguments the callback function expects
  var args = maxArgumentCount(callback);

  function recurse(value, index) {
    if (Array.isArray(value)) {
      return value.map(function (child, i) {
        // we create a copy of the index array and append the new index value
        return recurse(child, index.concat(i + 1)); // one based index, hence i + 1
      });
    } else {
      // invoke the callback function with the right number of arguments
      if (args === 1) {
        return callback(value);
      } else if (args === 2) {
        return callback(value, index);
      } else {
        // 3 or -1
        return callback(value, index, orig);
      }
    }
  }

  return recurse(array, []);
}

var name_name = 'map';
var path_path = 'expression.transform';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
