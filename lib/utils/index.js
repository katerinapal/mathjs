"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.emitter = exports.types = exports.string = exports.object = exports.number = exports.array = undefined;

var _array = require("./array");

var _boolean = require("./boolean");

var _function = require("./function");

var _number = require("./number");

var _object = require("./object");

var _string = require("./string");

var _types = require("./types");

var _emitter = require("./emitter");

'use strict';

var array_array = _array.size;
exports['boolean'] = _boolean.isBoolean;
exports['function'] = _function.memoize;
var number_number = _number.isNumber;
var object_object = _object.clone;
var string_string = _string.isString;
var types_types = _types.type;
var emitter_emitter = _emitter.mixin;
exports.array = array_array;
exports.number = number_number;
exports.object = object_object;
exports.string = string_string;
exports.types = types_types;
exports.emitter = emitter_emitter;
