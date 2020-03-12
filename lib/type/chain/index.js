"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _Chain = require("./Chain");

var Chain_obj = _interopRequireWildcard(_Chain);

var _chain = require("./function/chain");

var functionchain_obj = _interopRequireWildcard(_chain);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_exportedObj = [Chain_obj, functionchain_obj];

exports.indexjs = indexjs_exportedObj;
