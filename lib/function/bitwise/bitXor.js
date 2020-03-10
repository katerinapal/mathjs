import { utilsnumber } from "../../utils/number";
import { bigBitXor as utilsbignumberbitXor_bigBitXor } from "../../utils/bignumber/bitXor";
import { utilslatex } from "../../utils/latex";
import * as typematrixfunctionmatrix from "../../type/matrix/function/matrix";
import * as typematrixutilsalgorithm03 from "../../type/matrix/utils/algorithm03";
import * as typematrixutilsalgorithm07 from "../../type/matrix/utils/algorithm07";
import * as typematrixutilsalgorithm12 from "../../type/matrix/utils/algorithm12";
import * as typematrixutilsalgorithm13 from "../../type/matrix/utils/algorithm13";
import * as typematrixutilsalgorithm14 from "../../type/matrix/utils/algorithm14";
'use strict';

var isInteger = utilsnumber.isInteger;
var bigBitXor = utilsbignumberbitXor_bigBitXor;

function factory (type, config, load, typed) {
  var latex = utilslatex;

  var matrix = load(typematrixfunctionmatrix);

  var algorithm03 = load(typematrixutilsalgorithm03);
  var algorithm07 = load(typematrixutilsalgorithm07);
  var algorithm12 = load(typematrixutilsalgorithm12);
  var algorithm13 = load(typematrixutilsalgorithm13);
  var algorithm14 = load(typematrixutilsalgorithm14);

  /**
   * Bitwise XOR two values, `x ^ y`.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.bitXor(x, y)
   *
   * Examples:
   *
   *    math.bitXor(1, 2);               // returns number 3
   *
   *    math.bitXor([2, 3, 4], 4);       // returns Array [6, 7, 0]
   *
   * See also:
   *
   *    bitAnd, bitNot, bitOr, leftShift, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x First value to xor
   * @param  {number | BigNumber | Array | Matrix} y Second value to xor
   * @return {number | BigNumber | Array | Matrix} XOR of `x` and `y`
   */
  var bitXor = typed('bitXor', {

    'number, number': function (x, y) {
      if (!utilsnumber(x) || !utilsnumber(y)) {
        throw new Error('Integers expected in function bitXor');
      }

      return x ^ y;
    },

    'BigNumber, BigNumber': utilsbignumberbitXor_bigBitXor,

    'Matrix, Matrix': function (x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse + sparse
              c = algorithm07(x, y, bitXor);
              break;
            default:
              // sparse + dense
              c = algorithm03(y, x, bitXor, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense + sparse
              c = algorithm03(x, y, bitXor, false);
              break;
            default:
              // dense + dense
              c = algorithm13(x, y, bitXor);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return bitXor(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return bitXor(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return bitXor(x, matrix(y));
    },

    'Matrix, any': function (x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm12(x, y, bitXor, false);
          break;
        default:
          c = algorithm14(x, y, bitXor, false);
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
          c = algorithm12(y, x, bitXor, true);
          break;
        default:
          c = algorithm14(y, x, bitXor, true);
          break;
      }
      return c;
    },

    'Array, any': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, bitXor, false).valueOf();
    },

    'any, Array': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, bitXor, true).valueOf();
    }
  });

  bitXor.toTex = {
    2: '\\left(${args[0]}' + utilslatex.operators['bitXor'] + '${args[1]}\\right)'
  };

  return bitXor;
}

var name_exportedObj = 'bitXor';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
