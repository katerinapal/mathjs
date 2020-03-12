'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var type_exportedObj = function type_exportedObj(x) {
  var type = typeof x === 'undefined' ? 'undefined' : _typeof(x);

  if (type === 'object') {
    if (x === null) return 'null';
    if (x instanceof Boolean) return 'boolean';
    if (x instanceof Number) return 'number';
    if (x instanceof String) return 'string';
    if (Array.isArray(x)) return 'Array';
    if (x instanceof Date) return 'Date';
    if (x instanceof RegExp) return 'RegExp';

    return 'Object';
  }

  if (type === 'function') return 'Function';

  return type;
};

var isScalar_exportedObj = function isScalar_exportedObj(x) {
  return !(x && x.isMatrix || Array.isArray(x));
};

exports.type = type_exportedObj;
exports.isScalar = isScalar_exportedObj;
