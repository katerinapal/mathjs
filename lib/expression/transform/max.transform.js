import * as errortransform from "./error.transform";
import { isCollection as utilscollectionisCollection_isCollection } from "../../utils/collection/isCollection";
import * as functionstatisticsmax from "../../function/statistics/max";
'use strict';

var errorTransform = errortransform.transform;
var isCollection = utilscollectionisCollection_isCollection;

/**
 * Attach a transform function to math.max
 * Adds a property transform containing the transform function.
 *
 * This transform changed the last `dim` parameter of function max
 * from one-based to zero based
 */
function factory (type, config, load, typed) {
  var max = load(functionstatisticsmax);

  return typed('max', {
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
        return max.apply(null, args);
      }
      catch (err) {
        throw errortransform(err);
      }
    }
  });
}

var name_exportedObj = 'max';
var path_exportedObj = 'expression.transform';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
