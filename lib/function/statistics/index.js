"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _max = require("./max");

var max_obj = _interopRequireWildcard(_max);

var _mean = require("./mean");

var mean_obj = _interopRequireWildcard(_mean);

var _median = require("./median");

var median_obj = _interopRequireWildcard(_median);

var _min = require("./min");

var min_obj = _interopRequireWildcard(_min);

var _mode = require("./mode");

var mode_obj = _interopRequireWildcard(_mode);

var _prod = require("./prod");

var prod_obj = _interopRequireWildcard(_prod);

var _quantileSeq = require("./quantileSeq");

var quantileSeq_obj = _interopRequireWildcard(_quantileSeq);

var _std = require("./std");

var std_obj = _interopRequireWildcard(_std);

var _sum = require("./sum");

var sum_obj = _interopRequireWildcard(_sum);

var _var = require("./var");

var var_obj = _interopRequireWildcard(_var);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_exportedObj = [max_obj, mean_obj, median_obj, min_obj, mode_obj, prod_obj, quantileSeq_obj, std_obj, sum_obj, var_obj];

exports.indexjs = indexjs_exportedObj;
