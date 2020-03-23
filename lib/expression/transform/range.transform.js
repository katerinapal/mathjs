'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _range = require('../../function/matrix/range');

var functionmatrixrange_obj = _interopRequireWildcard(_range);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

/**
 * Attach a transform function to math.range
 * Adds a property transform containing the transform function.
 *
 * This transform creates a range which includes the end value
 */
function factory(type, config, load, typed) {
  var range = load(functionmatrixrange_obj);

  return typed('range', {
    '...any': function any(args) {
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
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
