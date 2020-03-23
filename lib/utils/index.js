"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitter = exports.types = exports.string = exports.object = exports.number = exports.function = exports.boolean = exports.array = undefined;

var _array = require("./array");

var array_arrayjsjs = _interopRequireWildcard(_array);

var _boolean = require("./boolean");

var _function = require("./function");

var function_functionjsjs = _interopRequireWildcard(_function);

var _number = require("./number");

var number_numberjsjs = _interopRequireWildcard(_number);

var _object = require("./object");

var object_objectjsjs = _interopRequireWildcard(_object);

var _string = require("./string");

var string_stringjsjs = _interopRequireWildcard(_string);

var _types = require("./types");

var types_typesjsjs = _interopRequireWildcard(_types);

var _emitter = require("./emitter");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

var array_array = array_arrayjsjs;
var boolean_boolean = _boolean.isBoolean;
var function_function = function_functionjsjs;
var number_number = number_numberjsjs;
var object_object = object_objectjsjs;
var string_string = string_stringjsjs;
var types_types = types_typesjsjs;
var emitter_emitter = _emitter.mixin;
exports.array = array_array;
exports.boolean = boolean_boolean;
exports.function = function_function;
exports.number = number_number;
exports.object = object_object;
exports.string = string_string;
exports.types = types_types;
exports.emitter = emitter_emitter;
