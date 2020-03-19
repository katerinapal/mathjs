"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _compare = require("./compare");

var compare_obj = _interopRequireWildcard(_compare);

var _deepEqual = require("./deepEqual");

var deepEqual_obj = _interopRequireWildcard(_deepEqual);

var _equal = require("./equal");

var equal_obj = _interopRequireWildcard(_equal);

var _larger = require("./larger");

var larger_obj = _interopRequireWildcard(_larger);

var _largerEq = require("./largerEq");

var largerEq_obj = _interopRequireWildcard(_largerEq);

var _smaller = require("./smaller");

var smaller_obj = _interopRequireWildcard(_smaller);

var _smallerEq = require("./smallerEq");

var smallerEq_obj = _interopRequireWildcard(_smallerEq);

var _unequal = require("./unequal");

var unequal_obj = _interopRequireWildcard(_unequal);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_indexjs = [compare_obj, deepEqual_obj, equal_obj, larger_obj, largerEq_obj, smaller_obj, smallerEq_obj, unequal_obj];

exports.indexjs = indexjs_indexjs;
