'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _subset = require('../../function/matrix/subset');

var functionmatrixsubset_obj = _interopRequireWildcard(_subset);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        throw errorTransform(err);
      }
    }
  });
}

var name_exportedObj = 'subset';
var path_exportedObj = 'expression.transform';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
