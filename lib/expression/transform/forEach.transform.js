"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _function = require("../../utils/function");

var _forEach = require("../../function/matrix/forEach");

var functionmatrixforEach_obj = _interopRequireWildcard(_forEach);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

/**
 * Attach a transform function to math.forEach
 * Adds a property transform containing the transform function.
 *
 * This transform creates a one-based index instead of a zero-based index
 */
function factory(type, config, load, typed) {
  var forEach = load(functionmatrixforEach_obj);

  return typed('forEach', {
    'Array | Matrix, function': function ArrayMatrixFunction(array, callback) {
      // figure out what number of arguments the callback function expects
      var args = (0, _function.maxArgumentCount)(callback);

      var recurse = function recurse(value, index) {
        if (Array.isArray(value)) {
          value.forEach(function (child, i) {
            // we create a copy of the index array and append the new index value
            recurse(child, index.concat(i + 1)); // one based index, hence i+1
          });
        } else {
          // invoke the callback function with the right number of arguments
          if (args === 1) {
            callback(value);
          } else if (args === 2) {
            callback(value, index);
          } else {
            // 3 or -1
            callback(value, index, array);
          }
        }
      };
      recurse(array.valueOf(), []); // pass Array
    }
  });
}

var name_name = 'forEach';
var path_path = 'expression.transform';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
