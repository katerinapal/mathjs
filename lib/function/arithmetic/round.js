import { isInteger as utilsnumber_isIntegerjs } from "../../utils/number";
import { toFixed as utilsnumber_toFixedjs } from "../../utils/number";
import { deepMapjs as utilscollectiondeepMap_deepMapjsjs } from "../../utils/collection/deepMap";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
import * as relationalequalScalar_obj from "../relational/equalScalar";
import * as matrixzeros_obj from "../matrix/zeros";
import * as typematrixutilsalgorithm11_obj from "../../type/matrix/utils/algorithm11";
import * as typematrixutilsalgorithm12_obj from "../../type/matrix/utils/algorithm12";
import * as typematrixutilsalgorithm14_obj from "../../type/matrix/utils/algorithm14";
'use strict';

var NO_INT = 'Number of decimals in function round must be an integer';

function factory (type, config, load, typed) {
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

    'number, number': function (x, n) {
      if (!utilsnumber_isIntegerjs)   {throw new TypeError(NO_INT);}
      if (n < 0 || n > 15) {throw new Error('Number of decimals in function round must be in te range of 0-15');}

      return _round(x, n);
    },

    'Complex': function (x) {
      return x.round();
    },

    'Complex, number': function (x, n) {
      if (n % 1) {throw new TypeError(NO_INT);}
      
      return x.round(n);
    },

    'Complex, BigNumber': function (x, n) {
      if (!n.isInteger()) {throw new TypeError(NO_INT);}

      var _n = n.toNumber();
      return x.round(_n);
    },

    'number, BigNumber': function (x, n) {
      if (!n.isInteger()) {throw new TypeError(NO_INT);}

      return new type.BigNumber(x).toDecimalPlaces(n.toNumber());
    },

    'BigNumber': function (x) {
      return x.toDecimalPlaces(0);
    },

    'BigNumber, BigNumber': function (x, n) {
      if (!n.isInteger()) {throw new TypeError(NO_INT);}

      return x.toDecimalPlaces(n.toNumber());
    },

    'Fraction': function (x) {
      return x.round();
    },

    'Fraction, number': function (x, n) {
      if (n % 1) {throw new TypeError(NO_INT);}
      return x.round(n);
    },

    'Array | Matrix': function (x) {
      // deep map collection, skip zeros since round(0) = 0
      return utilscollectiondeepMap_deepMapjsjs(x, round, true);
    },

    'Matrix, number | BigNumber': function (x, y) {
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

    'number | Complex | BigNumber, Matrix': function (x, y) {
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

    'Array, number | BigNumber': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, round, false).valueOf();
    },

    'number | Complex | BigNumber, Array': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, round, true).valueOf();
    }
  });

  round.toTex = {
    1: '\\left\\lfloor${args[0]}\\right\\rceil',
    2: undefined  // use default template
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
function _round (value, decimals) {
  return parseFloat(utilsnumber_toFixedjs);
}

var name_name = 'round';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
