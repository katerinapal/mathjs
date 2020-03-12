"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _number = require("../../utils/number");

var _deepMap = require("../../utils/collection/deepMap");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _equalScalar = require("../relational/equalScalar");

var relationalequalScalar_obj = _interopRequireWildcard(_equalScalar);

var _zeros = require("../matrix/zeros");

var matrixzeros_obj = _interopRequireWildcard(_zeros);

var _algorithm = require("../../type/matrix/utils/algorithm11");

var typematrixutilsalgorithm11_obj = _interopRequireWildcard(_algorithm);

var _algorithm2 = require("../../type/matrix/utils/algorithm12");

var typematrixutilsalgorithm12_obj = _interopRequireWildcard(_algorithm2);

var _algorithm3 = require("../../type/matrix/utils/algorithm14");

var typematrixutilsalgorithm14_obj = _interopRequireWildcard(_algorithm3);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

var NO_INT = 'Number of decimals in function round must be an integer';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);
  var equalScalar = load(relationalequalScalar_obj);
  var zeros = load(matrixzeros_obj);

  var algorithm11 = load(typematrixutilsalgorithm11_obj);
  var algorithm12 = load(typematrixutilsalgorithm12_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

  /**
   * Round a value towards the nearest integer.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.round(x)
   *    math.round(x, n)
   *
   * Examples:
   *
   *    math.round(3.2);              // returns number 3
   *    math.round(3.8);              // returns number 4
   *    math.round(-4.2);             // returns number -4
   *    math.round(-4.7);             // returns number -5
   *    math.round(math.pi, 3);       // returns number 3.142
   *    math.round(123.45678, 2);     // returns number 123.46
   *
   *    var c = math.complex(3.2, -2.7);
   *    math.round(c);                // returns Complex 3 - 3i
   *
   *    math.round([3.2, 3.8, -4.7]); // returns Array [3, 4, -5]
   *
   * See also:
   *
   *    ceil, fix, floor
   *
   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix} x  Number to be rounded
   * @param  {number | BigNumber | Array} [n=0]                            Number of decimals
   * @return {number | BigNumber | Fraction | Complex | Array | Matrix} Rounded value
   */
  var round = typed('round', {

    'number': Math.round,

    'number, number': function numberNumber(x, n) {
      if (!_number.isNumber) {
        throw new TypeError(NO_INT);
      }
      if (n < 0 || n > 15) {
        throw new Error('Number of decimals in function round must be in te range of 0-15');
      }

      return _round(x, n);
    },

    'Complex': function Complex(x) {
      return x.round();
    },

    'Complex, number': function ComplexNumber(x, n) {
      if (n % 1) {
        throw new TypeError(NO_INT);
      }

      return x.round(n);
    },

    'Complex, BigNumber': function ComplexBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }

      var _n = n.toNumber();
      return x.round(_n);
    },

    'number, BigNumber': function numberBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }

      return new type.BigNumber(x).toDecimalPlaces(n.toNumber());
    },

    'BigNumber': function BigNumber(x) {
      return x.toDecimalPlaces(0);
    },

    'BigNumber, BigNumber': function BigNumberBigNumber(x, n) {
      if (!n.isInteger()) {
        throw new TypeError(NO_INT);
      }

      return x.toDecimalPlaces(n.toNumber());
    },

    'Fraction': function Fraction(x) {
      return x.round();
    },

    'Fraction, number': function FractionNumber(x, n) {
      if (n % 1) {
        throw new TypeError(NO_INT);
      }
      return x.round(n);
    },

    'Array | Matrix': function ArrayMatrix(x) {
      // deep map collection, skip zeros since round(0) = 0
      return (0, _deepMap.deepMapjs)(x, round, true);
    },

    'Matrix, number | BigNumber': function MatrixNumberBigNumber(x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm11(x, y, round, false);
          break;
        default:
          c = algorithm14(x, y, round, false);
          break;
      }
      return c;
    },

    'number | Complex | BigNumber, Matrix': function numberComplexBigNumberMatrix(x, y) {
      // check scalar is zero
      if (!equalScalar(x, 0)) {
        // result
        var c;
        // check storage format
        switch (y.storage()) {
          case 'sparse':
            c = algorithm12(y, x, round, true);
            break;
          default:
            c = algorithm14(y, x, round, true);
            break;
        }
        return c;
      }
      // do not execute algorithm, result will be a zero matrix
      return zeros(y.size(), y.storage());
    },

    'Array, number | BigNumber': function ArrayNumberBigNumber(x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, round, false).valueOf();
    },

    'number | Complex | BigNumber, Array': function numberComplexBigNumberArray(x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, round, true).valueOf();
    }
  });

  round.toTex = {
    1: '\\left\\lfloor${args[0]}\\right\\rceil',
    2: undefined // use default template
  };

  return round;
}

/**
 * round a number to the given number of decimals, or to zero if decimals is
 * not provided
 * @param {number} value
 * @param {number} decimals       number of decimals, between 0 and 15 (0 by default)
 * @return {number} roundedValue
 * @private
 */
function _round(value, decimals) {
  return parseFloat(_number.isNumber);
}

var name_exportedObj = 'round';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
