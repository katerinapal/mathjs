"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.endsWith = exports.isString = exports.format = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _number = require("./number");

var _formatter = require("./bignumber/formatter");

'use strict';

var isString_isString = function isString_isString(value) {
  return typeof value === 'string';
};

var endsWith_endsWith = function endsWith_endsWith(text, search) {
  var start = text.length - search.length;
  var end = text.length;
  return text.substring(start, end) === search;
};

var format_format = function format_format(value, options) {
  if (typeof value === 'number') {
    return (0, _number.format)(value, options);
  }

  if (value && value.isBigNumber === true) {
    return (0, _formatter.format)(value, options);
  }

  if (value && value.isFraction === true) {
    if (!options || options.fraction !== 'decimal') {
      // output as ratio, like '1/3'
      return value.s * value.n + '/' + value.d;
    } else {
      // output as decimal, like '0.(3)'
      return value.toString();
    }
  }

  if (Array.isArray(value)) {
    return formatArray(value, options);
  }

  if (isString_isString(value)) {
    return '"' + value + '"';
  }

  if (typeof value === 'function') {
    return value.syntax ? String(value.syntax) : 'function';
  }

  if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
    if (typeof value.format === 'function') {
      return value.format(options);
    } else if (value && value.toString() !== {}.toString()) {
      // this object has a non-native toString method, use that one
      return value.toString();
    } else {
      var entries = [];

      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          entries.push('"' + key + '": ' + exports.format(value[key], options));
        }
      }

      return '{' + entries.join(', ') + '}';
    }
  }

  return String(value);
};

/**
 * Recursively format an n-dimensional matrix
 * Example output: "[[1, 2], [3, 4]]"
 * @param {Array} array
 * @param {Object | number | Function} [options]  Formatting options. See
 *                                                lib/utils/number:format for a
 *                                                description of the available
 *                                                options.
 * @returns {string} str
 */
function formatArray(array, options) {
  if (Array.isArray(array)) {
    var str = '[';
    var len = array.length;
    for (var i = 0; i < len; i++) {
      if (i != 0) {
        str += ', ';
      }
      str += formatArray(array[i], options);
    }
    str += ']';
    return str;
  } else {
    return format_format(array, options);
  }
}
exports.format = format_format;
exports.isString = isString_isString;
exports.endsWith = endsWith_endsWith;
