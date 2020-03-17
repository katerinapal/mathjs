'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _error = require('./error.transform');

'use strict';

/**
 * Attach a transform function to math.subset
 * Adds a property transform containing the transform function.
 *
 * This transform creates a range which includes the end value
 */
function factory(type, config, load, typed) {
  var subset = load(functionmatrixsubset_obj);

  return typed('subset', {
    '...any': function any(args) {
      try {
        return subset.apply(null, args);
      } catch (err) {
        throw (0, _error.transform)(err);
      }
    }
  });
}

var name_name = 'subset';
var path_path = 'expression.transform';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
