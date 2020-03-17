import { transform as errortransform_transformjs } from "./error.transform";
import { isCollectionjs as utilscollectionisCollection_isCollectionjsjs } from "../../utils/collection/isCollection";
'use strict';

/**
 * Attach a transform function to math.max
 * Adds a property transform containing the transform function.
 *
 * This transform changed the last `dim` parameter of function max
 * from one-based to zero based
 */
function factory (type, config, load, typed) {
  var max = load(functionstatisticsmax_obj);

  return typed('max', {
    '...any': function (args) {
      // change last argument dim from one-based to zero-based
      if (args.length == 2 && utilscollectionisCollection_isCollectionjsjs(args[0])) {
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
        throw errortransform_transformjs(err);
      }
    }
  });
}

var name_name = 'max';
var path_path = 'expression.transform';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
