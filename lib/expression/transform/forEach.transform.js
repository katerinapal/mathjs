import * as functionjs from "../../utils/function";
import * as forEachjs from "../../function/matrix/forEach";
'use strict';

var maxArgumentCount = functionjs.maxArgumentCount;

/**
 * Attach a transform function to math.forEach
 * Adds a property transform containing the transform function.
 *
 * This transform creates a one-based index instead of a zero-based index
 */
function factory (type, config, load, typed) {
  var forEach = load(forEachjs);

  return typed('forEach', {
    'Array | Matrix, function': function (array, callback) {
      // figure out what number of arguments the callback function expects
      var args = functionjs(callback);

      var recurse = function (value, index) {
        if (Array.isArray(value)) {
          value.forEach(function (child, i) {
            // we create a copy of the index array and append the new index value
            recurse(child, index.concat(i + 1)); // one based index, hence i+1
          });
        }
        else {
          // invoke the callback function with the right number of arguments
          if (args === 1) {
            callback(value);
          }
          else if (args === 2) {
            callback(value, index);
          }
          else { // 3 or -1
            callback(value, index, array);
          }
        }
      };
      recurse(array.valueOf(), []); // pass Array
    }
  });
}

var name_exportedObj = 'forEach';
var path_exportedObj = 'expression.transform';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
