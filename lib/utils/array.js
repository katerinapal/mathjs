"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isArray = exports.flatten = exports.unsqueeze = exports.squeeze = exports.resize = exports.validateIndex = exports.validate = exports.size = exports.UNINITIALIZED = undefined;

var _number = require("./number");

var number_numberjsjs = _interopRequireWildcard(_number);

var _string = require("./string");

var _DimensionError = require("../error/DimensionError");

var _IndexError = require("../error/IndexError");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

var size_size = function size_size(x) {
  var s = [];

  while (Array.isArray(x)) {
    s.push(x.length);
    x = x[0];
  }

  return s;
};

/**
 * Recursively validate whether each element in a multi dimensional array
 * has a size corresponding to the provided size array.
 * @param {Array} array    Array to be validated
 * @param {number[]} size  Array with the size of each dimension
 * @param {number} dim   Current dimension
 * @throws DimensionError
 * @private
 */
function _validate(array, size, dim) {
  var i;
  var len = array.length;

  if (len != size[dim]) {
    throw new _DimensionError.DimensionError(len, size[dim]);
  }

  if (dim < size.length - 1) {
    // recursively validate each child array
    var dimNext = dim + 1;
    for (i = 0; i < len; i++) {
      var child = array[i];
      if (!Array.isArray(child)) {
        throw new _DimensionError.DimensionError(size.length - 1, size.length, '<');
      }
      _validate(array[i], size, dimNext);
    }
  } else {
    // last dimension. none of the childs may be an array
    for (i = 0; i < len; i++) {
      if (Array.isArray(array[i])) {
        throw new _DimensionError.DimensionError(size.length + 1, size.length, '>');
      }
    }
  }
}

var validate_validate = function validate_validate(array, size) {
  var isScalar = size.length == 0;
  if (isScalar) {
    // scalar
    if (Array.isArray(array)) {
      throw new _DimensionError.DimensionError(array.length, 0);
    }
  } else {
    // array
    _validate(array, size, 0);
  }
};

var validateIndex_validateIndex = function validateIndex_validateIndex(index, length) {
  if (!number_numberjsjs.isNumber(index) || !number_numberjsjs.isInteger(index)) {
    throw new TypeError('Index must be an integer (value: ' + index + ')');
  }
  if (index < 0 || typeof length === 'number' && index >= length) {
    throw new _IndexError.IndexError(index, length);
  }
};

var UNINITIALIZED_UNINITIALIZED = {};

var resize_resize = function resize_resize(array, size, defaultValue) {
  // TODO: add support for scalars, having size=[] ?

  // check the type of the arguments
  if (!Array.isArray(array) || !Array.isArray(size)) {
    throw new TypeError('Array expected');
  }
  if (size.length === 0) {
    throw new Error('Resizing to scalar is not supported');
  }

  // check whether size contains positive integers
  size.forEach(function (value) {
    if (!number_numberjsjs.isNumber(value) || !number_numberjsjs.isInteger(value) || value < 0) {
      throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + (0, _string.format)(size) + ')');
    }
  });

  // recursively resize the array
  var _defaultValue = defaultValue !== undefined ? defaultValue : 0;
  _resize(array, size, 0, _defaultValue);

  return array;
};

/**
 * Recursively resize a multi dimensional array
 * @param {Array} array         Array to be resized
 * @param {number[]} size       Array with the size of each dimension
 * @param {number} dim          Current dimension
 * @param {*} [defaultValue]    Value to be filled in in new entries,
 *                              undefined by default.
 * @private
 */
function _resize(array, size, dim, defaultValue) {
  var i;
  var elem;
  var oldLen = array.length;
  var newLen = size[dim];
  var minLen = Math.min(oldLen, newLen);

  // apply new length
  array.length = newLen;

  if (dim < size.length - 1) {
    // non-last dimension
    var dimNext = dim + 1;

    // resize existing child arrays
    for (i = 0; i < minLen; i++) {
      // resize child array
      elem = array[i];
      if (!Array.isArray(elem)) {
        elem = [elem]; // add a dimension
        array[i] = elem;
      }
      _resize(elem, size, dimNext, defaultValue);
    }

    // create new child arrays
    for (i = minLen; i < newLen; i++) {
      // get child array
      elem = [];
      array[i] = elem;

      // resize new child array
      _resize(elem, size, dimNext, defaultValue);
    }
  } else {
    // last dimension

    // remove dimensions of existing values
    for (i = 0; i < minLen; i++) {
      while (Array.isArray(array[i])) {
        array[i] = array[i][0];
      }
    }

    if (defaultValue !== UNINITIALIZED_UNINITIALIZED) {
      // fill new elements with the default value
      for (i = minLen; i < newLen; i++) {
        array[i] = defaultValue;
      }
    }
  }
}

var squeeze_squeeze = function squeeze_squeeze(array, size) {
  var s = size || size_size(array);

  // squeeze outer dimensions
  while (Array.isArray(array) && array.length === 1) {
    array = array[0];
    s.shift();
  }

  // find the first dimension to be squeezed
  var dims = s.length;
  while (s[dims - 1] === 1) {
    dims--;
  }

  // squeeze inner dimensions
  if (dims < s.length) {
    array = _squeeze(array, dims, 0);
    s.length = dims;
  }

  return array;
};

/**
 * Recursively squeeze a multi dimensional array
 * @param {Array} array
 * @param {number} dims Required number of dimensions
 * @param {number} dim  Current dimension
 * @returns {Array | *} Returns the squeezed array
 * @private
 */
function _squeeze(array, dims, dim) {
  var i, ii;

  if (dim < dims) {
    var next = dim + 1;
    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _squeeze(array[i], dims, next);
    }
  } else {
    while (Array.isArray(array)) {
      array = array[0];
    }
  }

  return array;
}

var unsqueeze_unsqueeze = function unsqueeze_unsqueeze(array, dims, outer, size) {
  var s = size || size_size(array);

  // unsqueeze outer dimensions
  if (outer) {
    for (var i = 0; i < outer; i++) {
      array = [array];
      s.unshift(1);
    }
  }

  // unsqueeze inner dimensions
  array = _unsqueeze(array, dims, 0);
  while (s.length < dims) {
    s.push(1);
  }

  return array;
};

/**
 * Recursively unsqueeze a multi dimensional array
 * @param {Array} array
 * @param {number} dims Required number of dimensions
 * @param {number} dim  Current dimension
 * @returns {Array | *} Returns the squeezed array
 * @private
 */
function _unsqueeze(array, dims, dim) {
  var i, ii;

  if (Array.isArray(array)) {
    var next = dim + 1;
    for (i = 0, ii = array.length; i < ii; i++) {
      array[i] = _unsqueeze(array[i], dims, next);
    }
  } else {
    for (var d = dim; d < dims; d++) {
      array = [array];
    }
  }

  return array;
}

var flatten_flatten = function flatten_flatten(array) {
  if (!Array.isArray(array)) {
    //if not an array, return as is
    return array;
  }
  var flat = [];

  array.forEach(function callback(value) {
    if (Array.isArray(value)) {
      value.forEach(callback); //traverse through sub-arrays recursively
    } else {
      flat.push(value);
    }
  });

  return flat;
};

var isArray_isArray = Array.isArray;
exports.UNINITIALIZED = UNINITIALIZED_UNINITIALIZED;
exports.size = size_size;
exports.validate = validate_validate;
exports.validateIndex = validateIndex_validateIndex;
exports.resize = resize_resize;
exports.squeeze = squeeze_squeeze;
exports.unsqueeze = unsqueeze_unsqueeze;
exports.flatten = flatten_flatten;
exports.isArray = isArray_isArray;
