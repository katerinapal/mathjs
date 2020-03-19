'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var type_type = function type_type(x) {
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

var isScalar_isScalar = function isScalar_isScalar(x) {
  return !(x && x.isMatrix || Array.isArray(x));
};

exports.type = type_type;
exports.isScalar = isScalar_isScalar;
