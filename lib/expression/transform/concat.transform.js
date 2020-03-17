'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _error = require('./error.transform');

'use strict';

/**
 * Attach a transform function to math.range
 * Adds a property transform containing the transform function.
 *
 * This transform changed the last `dim` parameter of function concat
 * from one-based to zero based
 */
function factory(type, config, load, typed) {
  var concat = load(functionmatrixconcat_obj);

  // @see: comment of concat itself
  return typed('concat', {
    '...any': function any(args) {
      // change last argument from one-based to zero-based
      var lastIndex = args.length - 1;
      var last = args[lastIndex];
      if (typeof last === 'number') {
        args[lastIndex] = last - 1;
      } else if (last && last.isBigNumber === true) {
        args[lastIndex] = last.minus(1);
      }

      try {
        return concat.apply(null, args);
      } catch (err) {
        throw (0, _error.transform)(err);
      }
    }
  });
}

var name_name = 'concat';
var path_path = 'expression.transform';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
