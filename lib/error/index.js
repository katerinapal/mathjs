"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.indexjs = undefined;

var _ArgumentsError = require("./ArgumentsError");

var _DimensionError = require("./DimensionError");

var _IndexError = require("./IndexError");

'use strict';

var indexjs_indexjs = [{
  name: 'ArgumentsError', path: 'error',
  factory: function factory() {
    return _ArgumentsError.ArgumentsError;
  }
}, {
  name: 'DimensionError',
  path: 'error',
  factory: function factory() {
    return _DimensionError.DimensionError;
  }
}, {
  name: 'IndexError',
  path: 'error',
  factory: function factory() {
    return _IndexError.IndexError;
  }
}];

exports.indexjs = indexjs_indexjs;
