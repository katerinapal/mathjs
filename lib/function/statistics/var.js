"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepForEach = require("../../utils/collection/deepForEach");

var _addScalar = require("../arithmetic/addScalar");

var arithmeticaddScalar_obj = _interopRequireWildcard(_addScalar);

var _subtract = require("../arithmetic/subtract");

var arithmeticsubtract_obj = _interopRequireWildcard(_subtract);

var _multiplyScalar = require("../arithmetic/multiplyScalar");

var arithmeticmultiplyScalar_obj = _interopRequireWildcard(_multiplyScalar);

var _divideScalar = require("../arithmetic/divideScalar");

var arithmeticdivideScalar_obj = _interopRequireWildcard(_divideScalar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

var DEFAULT_NORMALIZATION = 'unbiased';

function factory(type, config, load, typed) {
  var add = load(arithmeticaddScalar_obj);
  var subtract = load(arithmeticsubtract_obj);
  var multiply = load(arithmeticmultiplyScalar_obj);
  var divide = load(arithmeticdivideScalar_obj);

  /**
   * Compute the variance of a matrix or a  list with values.
   * In case of a (multi dimensional) array or matrix, the variance over all
   * elements will be calculated.
   *
   * Optionally, the type of normalization can be specified as second
   * parameter. The parameter `normalization` can be one of the following values:
   *
   * - 'unbiased' (default) The sum of squared errors is divided by (n - 1)
   * - 'uncorrected'        The sum of squared errors is divided by n
   * - 'biased'             The sum of squared errors is divided by (n + 1)
   *
   * Note that older browser may not like the variable name `var`. In that
   * case, the function can be called as `math['var'](...)` instead of
   * `math.var(...)`.
   *
   * Syntax:
   *
   *     math.var(a, b, c, ...)
   *     math.var(A)
   *     math.var(A, normalization)
   *
   * Examples:
   *
   *     math.var(2, 4, 6);                     // returns 4
   *     math.var([2, 4, 6, 8]);                // returns 6.666666666666667
   *     math.var([2, 4, 6, 8], 'uncorrected'); // returns 5
   *     math.var([2, 4, 6, 8], 'biased');      // returns 4
   *
   *     math.var([[1, 2, 3], [4, 5, 6]]);      // returns 3.5
   *
   * See also:
   *
   *    mean, median, max, min, prod, std, sum
   *
   * @param {Array | Matrix} array
   *                        A single matrix or or multiple scalar values
   * @param {string} [normalization='unbiased']
   *                        Determines how to normalize the variance.
   *                        Choose 'unbiased' (default), 'uncorrected', or 'biased'.
   * @return {*} The variance
   */
  var variance = typed('variance', {
    // var([a, b, c, d, ...])
    'Array | Matrix': function ArrayMatrix(array) {
      return _var(array, DEFAULT_NORMALIZATION);
    },

    // var([a, b, c, d, ...], normalization)
    'Array | Matrix, string': _var,

    // var(a, b, c, d, ...)
    '...': function _(args) {
      return _var(args, DEFAULT_NORMALIZATION);
    }
  });

  variance.toTex = '\\mathrm{Var}\\left(${args}\\right)';

  return variance;

  /**
   * Recursively calculate the variance of an n-dimensional array
   * @param {Array} array
   * @param {string} normalization
   *                        Determines how to normalize the variance:
   *                        - 'unbiased'    The sum of squared errors is divided by (n - 1)
   *                        - 'uncorrected' The sum of squared errors is divided by n
   *                        - 'biased'      The sum of squared errors is divided by (n + 1)
   * @return {number | BigNumber} variance
   * @private
   */
  function _var(array, normalization) {
    var sum = 0;
    var num = 0;

    if (array.length == 0) {
      throw new SyntaxError('Function var requires one or more parameters (0 provided)');
    }

    // calculate the mean and number of elements
    (0, _deepForEach.deepForEachjs)(array, function (value) {
      sum = add(sum, value);
      num++;
    });
    if (num === 0) throw new Error('Cannot calculate var of an empty array');

    var mean = divide(sum, num);

    // calculate the variance
    sum = 0;
    (0, _deepForEach.deepForEachjs)(array, function (value) {
      var diff = subtract(value, mean);
      sum = add(sum, multiply(diff, diff));
    });

    switch (normalization) {
      case 'uncorrected':
        return divide(sum, num);

      case 'biased':
        return divide(sum, num + 1);

      case 'unbiased':
        var zero = sum && sum.isBigNumber === true ? new type.BigNumber(0) : 0;
        return num == 1 ? zero : divide(sum, num - 1);

      default:
        throw new Error('Unknown normalization "' + normalization + '". ' + 'Choose "unbiased" (default), "uncorrected", or "biased".');
    }
  }
}

var name_exportedObj = 'var';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
