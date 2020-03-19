"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _bellNumbers = require("./bellNumbers");

var bellNumbers_obj = _interopRequireWildcard(_bellNumbers);

var _composition = require("./composition");

var composition_obj = _interopRequireWildcard(_composition);

var _stirlingS = require("./stirlingS2");

var stirlingS2_obj = _interopRequireWildcard(_stirlingS);

var _catalan = require("./catalan");

var catalan_obj = _interopRequireWildcard(_catalan);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_indexjs = [bellNumbers_obj, composition_obj, stirlingS2_obj, catalan_obj];

exports.indexjs = indexjs_indexjs;
