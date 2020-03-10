import { utilsnumber } from "../../utils/number";
import { bigBitAnd as utilsbignumberbitAnd_bigBitAnd } from "../../utils/bignumber/bitAnd";
import { utilslatex } from "../../utils/latex";
import * as typematrixfunctionmatrix from "../../type/matrix/function/matrix";
import * as typematrixutilsalgorithm02 from "../../type/matrix/utils/algorithm02";
import * as typematrixutilsalgorithm06 from "../../type/matrix/utils/algorithm06";
import * as typematrixutilsalgorithm11 from "../../type/matrix/utils/algorithm11";
import * as typematrixutilsalgorithm13 from "../../type/matrix/utils/algorithm13";
import * as typematrixutilsalgorithm14 from "../../type/matrix/utils/algorithm14";
'use strict';

var isInteger = utilsnumber.isInteger;
var bigBitAnd = utilsbignumberbitAnd_bigBitAnd;

function factory (type, config, load, typed) {
  var latex = utilslatex;

  var matrix = load(typematrixfunctionmatrix);

  var algorithm02 = load(typematrixutilsalgorithm02);
  var algorithm06 = load(typematrixutilsalgorithm06);
  var algorithm11 = load(typematrixutilsalgorithm11);
  var algorithm13 = load(typematrixutilsalgorithm13);
  var algorithm14 = load(typematrixutilsalgorithm14);
  
  /**
   * Bitwise AND two values, `x & y`.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.bitAnd(x, y)
   *
   * Examples:
   *
   *    math.bitAnd(53, 131);               // returns number 1
   *
   *    math.bitAnd([1, 12, 31], 42);       // returns Array [0, 8, 10]
   *
   * See also:
   *
   *    bitNot, bitOr, bitXor, leftShift, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x First value to and
   * @param  {number | BigNumber | Array | Matrix} y Second value to and
   * @return {number | BigNumber | Array | Matrix} AND of `x` and `y`
   */
  var bitAnd = typed('bitAnd', {

    'number, number': function (x, y) {
      if (!utilsnumber(x) || !utilsnumber(y)) {
        throw new Error('Integers expected in function bitAnd');
      }

      return x & y;
    },

    'BigNumber, BigNumber': utilsbignumberbitAnd_bigBitAnd,

    'Matrix, Matrix': function (x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse & sparse
              c = algorithm06(x, y, bitAnd, false);
              break;
            default:
              // sparse & dense
              c = algorithm02(y, x, bitAnd, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense & sparse
              c = algorithm02(x, y, bitAnd, false);
              break;
            default:
              // dense & dense
              c = algorithm13(x, y, bitAnd);
              break;
          }
          break;
      }
      return c;
    },
    
    'Array, Array': function (x, y) {
      // use matrix implementation
      return bitAnd(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return bitAnd(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return bitAnd(x, matrix(y));
    },
    
    'Matrix, any': function (x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm11(x, y, bitAnd, false);
          break;
        default:
          c = algorithm14(x, y, bitAnd, false);
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
          c = algorithm11(y, x, bitAnd, true);
          break;
        default:
          c = algorithm14(y, x, bitAnd, true);
          break;
      }
      return c;
    },

    'Array, any': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, bitAnd, false).valueOf();
    },

    'any, Array': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, bitAnd, true).valueOf();
    }
  });

  bitAnd.toTex = {
    2: '\\left(${args[0]}' + utilslatex.operators['bitAnd'] + '${args[1]}\\right)'
  };

  return bitAnd;
}

var name_exportedObj = 'bitAnd';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
