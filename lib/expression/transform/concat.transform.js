'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _concat = require('../../function/matrix/concat');

var functionmatrixconcat_obj = _interopRequireWildcard(_concat);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

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
        throw errorTransform(err);
      }
    }
  });
}

var name_exportedObj = 'concat';
var path_exportedObj = 'expression.transform';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
