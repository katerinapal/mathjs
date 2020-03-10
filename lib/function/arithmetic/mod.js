import * as matrixjs from "../../type/matrix/function/matrix";
import { latex as latexjs } from "../../utils/latex";
import * as algorithm02js from "../../type/matrix/utils/algorithm02";
import * as algorithm03js from "../../type/matrix/utils/algorithm03";
import * as algorithm05js from "../../type/matrix/utils/algorithm05";
import * as algorithm11js from "../../type/matrix/utils/algorithm11";
import * as algorithm12js from "../../type/matrix/utils/algorithm12";
import * as algorithm13js from "../../type/matrix/utils/algorithm13";
import * as algorithm14js from "../../type/matrix/utils/algorithm14";
'use strict';

function factory (type, config, load, typed) {

  var matrix = load(matrixjs);
  var latex = latexjs;

  var algorithm02 = load(algorithm02js);
  var algorithm03 = load(algorithm03js);
  var algorithm05 = load(algorithm05js);
  var algorithm11 = load(algorithm11js);
  var algorithm12 = load(algorithm12js);
  var algorithm13 = load(algorithm13js);
  var algorithm14 = load(algorithm14js);
  
  /**
   * Calculates the modulus, the remainder of an integer division.
   *
   * For matrices, the function is evaluated element wise.
   *
   * The modulus is defined as:
   *
   *     x - y * floor(x / y)
   *
   * See http://en.wikipedia.org/wiki/Modulo_operation.
   *
   * Syntax:
   *
   *    math.mod(x, y)
   *
   * Examples:
   *
   *    math.mod(8, 3);                // returns 2
   *    math.mod(11, 2);               // returns 1
   *
   *    function isOdd(x) {
   *      return math.mod(x, 2) != 0;
   *    }
   *
   *    isOdd(2);                      // returns false
   *    isOdd(3);                      // returns true
   *
   * See also:
   *
   *    divide
   *
   * @param  {number | BigNumber | Fraction | Array | Matrix} x Dividend
   * @param  {number | BigNumber | Fraction | Array | Matrix} y Divisor
   * @return {number | BigNumber | Fraction | Array | Matrix} Returns the remainder of `x` divided by `y`.
   */
  var mod = typed('mod', {

    'number, number': _mod,

    'BigNumber, BigNumber': function (x, y) {
      return y.isZero() ? x : x.mod(y);
    },

    'Fraction, Fraction': function (x, y) {
      return x.mod(y);
    },

    'Matrix, Matrix': function (x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // mod(sparse, sparse)
              c = algorithm05(x, y, mod, false);
              break;
            default:
              // mod(sparse, dense)
              c = algorithm02(y, x, mod, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // mod(dense, sparse)
              c = algorithm03(x, y, mod, false);
              break;
            default:
              // mod(dense, dense)
              c = algorithm13(x, y, mod);
              break;
          }
          break;
      }
      return c;
    },
    
    'Array, Array': function (x, y) {
      // use matrix implementation
      return mod(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return mod(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return mod(x, matrix(y));
    },

    'Matrix, any': function (x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm11(x, y, mod, false);
          break;
        default:
          c = algorithm14(x, y, mod, false);
          break;
      }
      return c;
    },

    'any, Matrix': function (x, y) {
      // result
      var c;
      // check storage format
      switch (y.storage()) {
        case 'sparse':
          c = algorithm12(y, x, mod, true);
          break;
        default:
          c = algorithm14(y, x, mod, true);
          break;
      }
      return c;
    },

    'Array, any': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, mod, false).valueOf();
    },

    'any, Array': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, mod, true).valueOf();
    }
  });

  mod.toTex = {
    2: '\\left(${args[0]}' + latexjs.operators['mod'] + '${args[1]}\\right)'
  };

  return mod;

  /**
   * Calculate the modulus of two numbers
   * @param {number} x
   * @param {number} y
   * @returns {number} res
   * @private
   */
  function _mod(x, y) {
    if (y > 0) {
      // We don't use JavaScript's % operator here as this doesn't work
      // correctly for x < 0 and x == 0
      // see http://en.wikipedia.org/wiki/Modulo_operation
      return x - y * Math.floor(x / y);
    }
    else if (y === 0) {
      return x;
    }
    else { // y < 0
      // TODO: implement mod for a negative divisor
      throw new Error('Cannot calculate mod for a negative divisor');
    }
  }
}

var name_exportedObj = 'mod';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
