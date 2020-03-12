"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _and = require("./and");

var and_obj = _interopRequireWildcard(_and);

var _not = require("./not");

var not_obj = _interopRequireWildcard(_not);

var _or = require("./or");

var or_obj = _interopRequireWildcard(_or);

var _xor = require("./xor");

var xor_obj = _interopRequireWildcard(_xor);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_exportedObj = [and_obj, not_obj, or_obj, xor_obj];

exports.indexjs = indexjs_exportedObj;
