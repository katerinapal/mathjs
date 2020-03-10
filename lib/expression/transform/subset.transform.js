import * as errortransform from "./error.transform";
import * as functionmatrixsubset from "../../function/matrix/subset";
'use strict';

var errorTransform = errortransform.transform;

/**
 * Attach a transform function to math.subset
 * Adds a property transform containing the transform function.
 *
 * This transform creates a range which includes the end value
 */
function factory (type, config, load, typed) {
  var subset = load(functionmatrixsubset);

  return typed('subset', {
    '...any': function (args) {
      try {
        return subset.apply(null, args);
      }
      catch (err) {
        throw errortransform(err);
      }
    }
  });
}

var name_exportedObj = 'subset';
var path_exportedObj = 'expression.transform';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
