"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _isCollection = require("../../utils/collection/isCollection");

var _mean = require("../../function/statistics/mean");

var functionstatisticsmean_obj = _interopRequireWildcard(_mean);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

/**
 * Attach a transform function to math.mean
 * Adds a property transform containing the transform function.
 *
 * This transform changed the last `dim` parameter of function mean
 * from one-based to zero based
 */
function factory(type, config, load, typed) {
  var mean = load(functionstatisticsmean_obj);

  return typed('mean', {
    '...any': function any(args) {
      // change last argument dim from one-based to zero-based
      if (args.length == 2 && (0, _isCollection.isCollectionjs)(args[0])) {
        var dim = args[1];
        if (typeof dim === 'number') {
          args[1] = dim - 1;
        } else if (dim && dim.isBigNumber === true) {
          args[1] = dim.minus(1);
        }
      }

      try {
        return mean.apply(null, args);
      } catch (err) {
        throw errorTransform(err);
      }
    }
  });
}

var name_exportedObj = 'mean';
var path_exportedObj = 'expression.transform';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.path = path_exportedObj;
exports.factory = factory_exportedObj;
