"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _intersect = require("./intersect");

var intersect_obj = _interopRequireWildcard(_intersect);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_exportedObj = [intersect_obj, require('./distance')];

exports.indexjs = indexjs_exportedObj;
