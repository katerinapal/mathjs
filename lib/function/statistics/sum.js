"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepForEach = require("../../utils/collection/deepForEach");

var _addScalar = require("../arithmetic/addScalar");

var arithmeticaddScalar_obj = _interopRequireWildcard(_addScalar);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var add = load(arithmeticaddScalar_obj);

  /**
   * Compute the sum of a matrix or a list with values.
   * In case of a (multi dimensional) array or matrix, the sum of all
   * elements will be calculated.
   *
   * Syntax:
   *
   *     math.sum(a, b, c, ...)
   *     math.sum(A)
   *
   * Examples:
   *
   *     math.sum(2, 1, 4, 3);               // returns 10
   *     math.sum([2, 1, 4, 3]);             // returns 10
   *     math.sum([[2, 5], [4, 3], [1, 7]]); // returns 22
   *
   * See also:
   *
   *    mean, median, min, max, prod, std, var
   *
   * @param {... *} args  A single matrix or or multiple scalar values
   * @return {*} The sum of all values
   */
  var sum = typed('sum', {
    'Array | Matrix': function ArrayMatrix(args) {
      // sum([a, b, c, d, ...])
      return _sum(args);
    },

    'Array | Matrix, number | BigNumber': function ArrayMatrixNumberBigNumber() {
      // sum([a, b, c, d, ...], dim)
      // TODO: implement sum(A, dim)
      throw new Error('sum(A, dim) is not yet supported');
    },

    '...': function _(args) {
      // sum(a, b, c, d, ...)
      return _sum(args);
    }
  });

  sum.toTex = undefined; // use default template

  return sum;

  /**
   * Recursively calculate the sum of an n-dimensional array
   * @param {Array} array
   * @return {number} sum
   * @private
   */
  function _sum(array) {
    var sum = undefined;

    deepForEach(array, function (value) {
      sum = sum === undefined ? value : add(sum, value);
    });

    if (sum === undefined) {
      switch (config.number) {
        case 'number':
          return 0;
        case 'BigNumber':
          return new type.BigNumber(0);
        case 'Fraction':
          return new type.Fraction(0);
        default:
          return 0;
      }
    }

    return sum;
  }
}

var name_name = 'sum';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
