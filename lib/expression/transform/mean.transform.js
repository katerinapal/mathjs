"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _error = require("./error.transform");

var _isCollection = require("../../utils/collection/isCollection");

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
        throw (0, _error.transform)(err);
      }
    }
  });
}

var name_name = 'mean';
var path_path = 'expression.transform';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
