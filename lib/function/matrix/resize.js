"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _DimensionError = require("../../error/DimensionError");

var _ArgumentsError = require("../../error/ArgumentsError");

var _number = require("../../utils/number");

var _string = require("../../utils/string");

var _object = require("../../utils/object");

var _array = require("../../utils/array");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

  /**
   * Resize a matrix
   *
   * Syntax:
   *
   *     math.resize(x, size)
   *     math.resize(x, size, defaultValue)
   *
   * Examples:
   *
   *     math.resize([1, 2, 3, 4, 5], [3]); // returns Array  [1, 2, 3]
   *     math.resize([1, 2, 3], [5], 0);    // returns Array  [1, 2, 3, 0, 0]
   *     math.resize(2, [2, 3], 0);         // returns Matrix [[2, 0, 0], [0, 0, 0]]
   *     math.resize("hello", [8], "!");    // returns string 'hello!!!'
   *
   * See also:
   *
   *     size, squeeze, subset
   *
   * @param {Array | Matrix | *} x             Matrix to be resized
   * @param {Array | Matrix} size              One dimensional array with numbers
   * @param {number | string} [defaultValue=0] Zero by default, except in
   *                                           case of a string, in that case
   *                                           defaultValue = ' '
   * @return {* | Array | Matrix} A resized clone of matrix `x`
   */
  // TODO: rework resize to a typed-function
  var resize = function resize(x, size, defaultValue) {
    if (arguments.length != 2 && arguments.length != 3) {
      throw new _ArgumentsError.ArgumentsError('resize', arguments.length, 2, 3);
    }

    if (size && size.isMatrix === true) {
      size = size.valueOf(); // get Array
    }

    if (size.length && size[0] && size[0].isBigNumber === true) {
      // convert bignumbers to numbers
      size = size.map(function (value) {
        return value && value.isBigNumber === true ? value.toNumber() : value;
      });
    }

    // check x is a Matrix
    if (x && x.isMatrix === true) {
      // use optimized matrix implementation, return copy
      return x.resize(size, defaultValue, true);
    }

    if (typeof x === 'string') {
      // resize string
      return _resizeString(x, size, defaultValue);
    }

    // check result should be a matrix
    var asMatrix = Array.isArray(x) ? false : config.matrix !== 'Array';

    if (size.length == 0) {
      // output a scalar
      while (Array.isArray(x)) {
        x = x[0];
      }

      return (0, _object.clone)(x);
    } else {
      // output an array/matrix
      if (!Array.isArray(x)) {
        x = [x];
      }
      x = (0, _object.clone)(x);

      var res = (0, _array.resize)(x, size, defaultValue);
      return asMatrix ? matrix(res) : res;
    }
  };

  resize.toTex = undefined; // use default template

  return resize;

  /**
   * Resize a string
   * @param {string} str
   * @param {number[]} size
   * @param {string} [defaultChar=' ']
   * @private
   */
  function _resizeString(str, size, defaultChar) {
    if (defaultChar !== undefined) {
      if (typeof defaultChar !== 'string' || defaultChar.length !== 1) {
        throw new TypeError('Single character expected as defaultValue');
      }
    } else {
      defaultChar = ' ';
    }

    if (size.length !== 1) {
      throw new _DimensionError.DimensionError(size.length, 1);
    }
    var len = size[0];
    if (typeof len !== 'number' || !(0, _number.isInteger)(len)) {
      throw new TypeError('Invalid size, must contain positive integers ' + '(size: ' + (0, _string.format)(size) + ')');
    }

    if (str.length > len) {
      return str.substring(0, len);
    } else if (str.length < len) {
      var res = str;
      for (var i = 0, ii = len - str.length; i < ii; i++) {
        res += defaultChar;
      }
      return res;
    } else {
      return str;
    }
  }
}

var name_name = 'resize';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
