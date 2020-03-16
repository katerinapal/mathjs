import { transform as errortransform_transformjs } from "./error.transform";
import * as functionmatrixconcat_obj from "../../function/matrix/concat";
'use strict';

/**
 * Attach a transform function to math.range
 * Adds a property transform containing the transform function.
 *
 * This transform changed the last `dim` parameter of function concat
 * from one-based to zero based
 */
function factory (type, config, load, typed) {
  var concat = load(functionmatrixconcat_obj);

  // @see: comment of concat itself
 return typed('concat', {
    '...any': function (args) {
      // change last argument from one-based to zero-based
      var lastIndex = args.length - 1;
      var last = args[lastIndex];
      if (typeof last === 'number') {
        args[lastIndex] = last - 1;
      }
      else if (last && last.isBigNumber === true) {
        args[lastIndex] = last.minus(1);
      }

      try {
        return concat.apply(null, args);
      }
      catch (err) {
        throw errortransform_transformjs(err);
      }
    }
  });
}

var name_name = 'concat';
var path_path = 'expression.transform';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
