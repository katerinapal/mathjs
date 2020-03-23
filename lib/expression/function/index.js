"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _compile = require("./compile");

var compile_obj = _interopRequireWildcard(_compile);

var _eval = require("./eval");

var eval_obj = _interopRequireWildcard(_eval);

var _help = require("./help");

var help_obj = _interopRequireWildcard(_help);

var _parse = require("./parse");

var parse_obj = _interopRequireWildcard(_parse);

var _parser = require("./parser");

var parser_obj = _interopRequireWildcard(_parser);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

var indexjs_indexjs = [compile_obj, eval_obj, help_obj, parse_obj, parser_obj];

exports.indexjs = indexjs_indexjs;
