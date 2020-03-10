import * as errortransformjs from "./error.transform";
import * as concatjs from "../../function/matrix/concat";
'use strict';

var errorTransform = errortransformjs.transform;

/**
 * Attach a transform function to math.range
 * Adds a property transform containing the transform function.
 *
 * This transform changed the last `dim` parameter of function concat
 * from one-based to zero based
 */
function factory (type, config, load, typed) {
  var concat = load(concatjs);

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
        throw errortransformjs(err);
      }
    }
  });
}

var name_exportedObj = 'concat';
var path_exportedObj = 'expression.transform';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { path_exportedObj as path };
export { factory_exportedObj as factory };
