'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.format = exports.endsWith = exports.isString = undefined;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _number = require('./number');

'use strict';

var isString_exportedObj = function isString_exportedObj(value) {
  return typeof value === 'string';
};

var endsWith_exportedObj = function endsWith_exportedObj(text, search) {
  var start = text.length - search.length;
  var end = text.length;
  return text.substring(start, end) === search;
};

var format_exportedObj = function format_exportedObj(value, options) {
  if (typeof value === 'number') {
    return _number.isNumber;
  }

  if (value && value.isBigNumber === true) {
    return formatBigNumber(value, options);
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

  if (isString_exportedObj(value)) {
    return '"' + value + '"';
  }

  if (typeof value === 'function') {
    return value.syntax ? String(value.syntax) : 'function';
  }

  if (value && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
    if (typeof value.format === 'function') {
      return value.format(options);
    } else if (value && value.toString() !== {}.toString()) {
      // this object has a non-native toString method, use that one
      return value.toString();
    } else {
      var entries = [];

      for (var key in value) {
        if (value.hasOwnProperty(key)) {
          entries.push('"' + key + '": ' + format_exportedObj(value[key], options));
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
    return format_exportedObj(array, options);
  }
}
exports.isString = isString_exportedObj;
exports.endsWith = endsWith_exportedObj;
exports.format = format_exportedObj;
