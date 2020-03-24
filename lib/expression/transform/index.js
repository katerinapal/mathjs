"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _concat = require("./concat.transform");

var concattransform_obj = _interopRequireWildcard(_concat);

var _filter = require("./filter.transform");

var filtertransform_obj = _interopRequireWildcard(_filter);

var _forEach = require("./forEach.transform");

var forEachtransform_obj = _interopRequireWildcard(_forEach);

var _index = require("./index.transform");

var indextransform_obj = _interopRequireWildcard(_index);

var _map = require("./map.transform");

var maptransform_obj = _interopRequireWildcard(_map);

var _max = require("./max.transform");

var maxtransform_obj = _interopRequireWildcard(_max);

var _mean = require("./mean.transform");

var meantransform_obj = _interopRequireWildcard(_mean);

var _min = require("./min.transform");

var mintransform_obj = _interopRequireWildcard(_min);

var _range = require("./range.transform");

var rangetransform_obj = _interopRequireWildcard(_range);

var _subset = require("./subset.transform");

var subsettransform_obj = _interopRequireWildcard(_subset);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_indexjs = [concattransform_obj, filtertransform_obj, forEachtransform_obj, indextransform_obj, maptransform_obj, maxtransform_obj, meantransform_obj, mintransform_obj, rangetransform_obj, subsettransform_obj];

exports.indexjs = indexjs_indexjs;
