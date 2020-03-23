import * as functionmatrixrange_obj from "../../function/matrix/range";
'use strict';

/**
 * Attach a transform function to math.range
 * Adds a property transform containing the transform function.
 *
 * This transform creates a range which includes the end value
 */
function factory (type, config, load, typed) {
  var range = load(functionmatrixrange_obj);

  return typed('range', {
    '...any': function (args) {
      var lastIndex = args.length - 1;
      var last = args[lastIndex];
      if (typeof last !== 'boolean') {
        // append a parameter includeEnd=true
        args.push(true);
      }

      return range.apply(null, args);
    }
  });
}

var name_name = 'range';
var path_path = 'expression.transform';
var factory_factory = factory;
export { name_name as name };
export { path_path as path };
export { factory_factory as factory };
