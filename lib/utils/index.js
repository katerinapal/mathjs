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

var array_exportedObj = _array.size;
exports['boolean'] = _boolean.isBoolean;
exports['function'] = _function.memoize;
var number_exportedObj = _number.isNumber;
var object_exportedObj = _object.clone;
var string_exportedObj = _string.isString;
var types_exportedObj = _types.type;
var emitter_exportedObj = _emitter.mixin;
exports.array = array_exportedObj;
exports.number = number_exportedObj;
exports.object = object_exportedObj;
exports.string = string_exportedObj;
exports.types = types_exportedObj;
exports.emitter = emitter_exportedObj;
