import { DimensionError as DimensionError_DimensionErrorjs } from "../../error/DimensionError";
import { ArgumentsError as ArgumentsError_ArgumentsErrorjs } from "../../error/ArgumentsError";
import { isInteger as numberjs } from "../../utils/number";
import { format as stringjs } from "../../utils/string";
import { clone as objectjs } from "../../utils/object";
import { array as arrayjs } from "../../utils/array";
import * as matrixjs from "../../type/matrix/function/matrix";
'use strict';

var DimensionError = DimensionError_DimensionErrorjs;
var ArgumentsError = ArgumentsError_ArgumentsErrorjs;

var isInteger = numberjs.isInteger;
var format = stringjs.format;
var clone = objectjs.clone;
var array = arrayjs;

function factory (type, config, load, typed) {
  var matrix = load(matrixjs);

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
  var resize = function resize (x, size, defaultValue) {
    if (arguments.length != 2 && arguments.length != 3) {
      throw new ArgumentsError_ArgumentsErrorjs('resize', arguments.length, 2, 3);
    }

    if (size && size.isMatrix === true) {
      size = size.valueOf(); // get Array
    }

    if (size.length && size[0] && size[0].isBigNumber === true) {
      // convert bignumbers to numbers
      size = size.map(function (value) {
        return (value && value.isBigNumber === true) ? value.toNumber() : value;
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
    var asMatrix = Array.isArray(x) ? false : (config.matrix !== 'Array');

    if (size.length == 0) {
      // output a scalar
      while (Array.isArray(x)) {
        x = x[0];
      }

      return objectjs(x);
    }
    else {
      // output an array/matrix
      if (!Array.isArray(x)) {
        x = [x];
      }
      x = objectjs(x);

      var res = arrayjs.resize(x, size, defaultValue);
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
    }
    else {
      defaultChar = ' ';
    }

    if (size.length !== 1) {
      throw new DimensionError_DimensionErrorjs(size.length, 1);
    }
    var len = size[0];
    if (typeof len !== 'number' || !numberjs(len)) {
      throw new TypeError('Invalid size, must contain positive integers ' +
          '(size: ' + stringjs(size) + ')');
    }

    if (str.length > len) {
      return str.substring(0, len);
    }
    else if (str.length < len) {
      var res = str;
      for (var i = 0, ii = len - str.length; i < ii; i++) {
        res += defaultChar;
      }
      return res;
    }
    else {
      return str;
    }
  }
}

var name_exportedObj = 'resize';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
