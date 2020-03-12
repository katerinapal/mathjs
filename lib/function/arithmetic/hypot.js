"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _array = require("../../utils/array");

var _abs = require("./abs");

var abs_obj = _interopRequireWildcard(_abs);

var _addScalar = require("./addScalar");

var addScalar_obj = _interopRequireWildcard(_addScalar);

var _divideScalar = require("./divideScalar");

var divideScalar_obj = _interopRequireWildcard(_divideScalar);

var _multiplyScalar = require("./multiplyScalar");

var multiplyScalar_obj = _interopRequireWildcard(_multiplyScalar);

var _sqrt = require("./sqrt");

var sqrt_obj = _interopRequireWildcard(_sqrt);

var _smaller = require("../relational/smaller");

var relationalsmaller_obj = _interopRequireWildcard(_smaller);

var _isPositive = require("../utils/isPositive");

var utilsisPositive_obj = _interopRequireWildcard(_isPositive);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var abs = load(abs_obj);
  var add = load(addScalar_obj);
  var divide = load(divideScalar_obj);
  var multiply = load(multiplyScalar_obj);
  var sqrt = load(sqrt_obj);
  var smaller = load(relationalsmaller_obj);
  var isPositive = load(utilsisPositive_obj);

  /**
   * Calculate the hypotenusa of a list with values. The hypotenusa is defined as:
   *
   *     hypot(a, b, c, ...) = sqrt(a^2 + b^2 + c^2 + ...)
   *
   * For matrix input, the hypotenusa is calculated for all values in the matrix.
   *
   * Syntax:
   *
   *     math.hypot(a, b, ...)
   *     math.hypot([a, b, c, ...])
   *
   * Examples:
   *
   *     math.hypot(3, 4);      // 5
   *     math.hypot(3, 4, 5);   // 7.0710678118654755
   *     math.hypot([3, 4, 5]); // 7.0710678118654755
   *     math.hypot(-2);        // 2
   *
   * See also:
   *
   *     abs, norm
   *
   * @param {... number | BigNumber} args
   * @return {number | BigNumber} Returns the hypothenusa of the input values.
   */
  var hypot = typed('hypot', {
    '... number | BigNumber': _hypot,

    'Array': function Array(x) {
      return hypot.apply(hypot, _array.size);
    },

    'Matrix': function Matrix(x) {
      return hypot.apply(hypot, _array.size);
    }
  });

  /**
   * Calculate the hypotenusa for an Array with values
   * @param {Array.<number | BigNumber>} args
   * @return {number | BigNumber} Returns the result
   * @private
   */
  function _hypot(args) {
    // code based on `hypot` from es6-shim:
    // https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L1619-L1633
    var result = 0;
    var largest = 0;

    for (var i = 0; i < args.length; i++) {
      var value = abs(args[i]);
      if (smaller(largest, value)) {
        result = multiply(result, multiply(divide(largest, value), divide(largest, value)));
        result = add(result, 1);
        largest = value;
      } else {
        result = add(result, isPositive(value) ? multiply(divide(value, largest), divide(value, largest)) : value);
      }
    }

    return multiply(largest, sqrt(result));
  }

  hypot.toTex = '\\hypot\\left(${args}\\right)';

  return hypot;
}

var name_exportedObj = 'hypot';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
