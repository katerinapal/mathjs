import { transform as errortransform_transformjs } from "./error.transform";
import * as functionmatrixsubset_obj from "../../function/matrix/subset";
'use strict';

/**
 * Attach a transform function to math.subset
 * Adds a property transform containing the transform function.
 *
 * This transform creates a range which includes the end value
 */
function factory (type, config, load, typed) {
  var subset = load(functionmatrixsubset_obj);

  return typed('subset', {
    '...any': function (args) {
      try {
        return subset.apply(null, args);
      }
      catch (err) {
        throw errortransform_transformjs(err);
      }
    }
  });
}

var name_name = 'subset';
var path_path = 'expression.transform';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
