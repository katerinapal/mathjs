'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deepEqual = exports.equal = undefined;

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var EPSILON = 0.0001;

/**
 * Test whether a value is a number
 * @param {*} value
 * @returns {boolean}
 */
function isNumber(value) {
  return value instanceof Number || typeof value === 'number';
}

var equal_exportedObj = function equal(a, b, epsilon) {
  if (epsilon === undefined) {
    epsilon = EPSILON;
  }

  if (isNumber(a) && isNumber(b)) {
    if (a === b) {
      // great, we're done :)
    } else if (isNaN(a)) {
      _assert2.default.equal(a.toString(), b.toString());
    } else if (a === 0) {
      _assert2.default.ok(Math.abs(b) < epsilon, a + ' ~= ' + b);
    } else if (b === 0) {
      _assert2.default.ok(Math.abs(a) < epsilon, a + ' ~= ' + b);
    } else {
      var diff = Math.abs(a - b);
      var max = Math.max(a, b);
      var max_diff = Math.abs(max * epsilon);
      _assert2.default.ok(diff <= max_diff, a + ' ~= ' + b);
    }
  } else {
    _assert2.default.equal(a, b);
  }
};

var deepEqual_exportedObj = function deepEqual(a, b) {
  var prop, i, len;

  if (Array.isArray(a) && Array.isArray(b)) {
    _assert2.default.equal(a.length, b.length, a + ' ~= ' + b);
    for (i = 0, len = a.length; i < len; i++) {
      deepEqual(a[i], b[i]);
    }
  } else if (a instanceof Object && b instanceof Object) {
    for (prop in a) {
      if (a.hasOwnProperty(prop)) {
        _assert2.default.ok(b.hasOwnProperty(prop), a[prop] + ' ~= ' + b[prop]);
        deepEqual(a[prop], b[prop]);
      }
    }

    for (prop in b) {
      if (b.hasOwnProperty(prop)) {
        _assert2.default.ok(a.hasOwnProperty(prop), a[prop] + ' ~= ' + b[prop]);
        deepEqual(a[prop], b[prop]);
      }
    }
  } else {
    equal_exportedObj(a, b);
  }
};

exports.equal = equal_exportedObj;
exports.deepEqual = deepEqual_exportedObj;
