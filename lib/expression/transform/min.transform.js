import * as errortransform_obj from "./error.transform";
import { isCollection as utilscollectionisCollection_isCollection } from "../../utils/collection/isCollection";
import * as functionstatisticsmin_obj from "../../function/statistics/min";
'use strict';

var errorTransform = errortransform_obj.transform;
var isCollection = utilscollectionisCollection_isCollection;

/**
 * Attach a transform function to math.min
 * Adds a property transform containing the transform function.
 *
 * This transform changed the last `dim` parameter of function min
 * from one-based to zero based
 */
function factory (type, config, load, typed) {
  var min = load(functionstatisticsmin_obj);

  return typed('min', {
    '...any': function (args) {
      // change last argument dim from one-based to zero-based
      if (args.length == 2 && utilscollectionisCollection_isCollection(args[0])) {
        var dim = args[1];
        if (typeof dim === 'number') {
          args[1] = dim - 1;
        }
        else if (dim && dim.isBigNumber === true) {
          args[1] = dim.minus(1);
        }
      }

      try {
        return min.apply(null, args);
      }
      catch (err) {
        throw errortransform_obj(err);
      }
    }
  });
}

var name_exportedObj = 'min';
var path_exportedObj = 'expression.transform';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
