import { isInteger as numberjs } from "../../utils/number";
import { bigBitXor as bitXor_bigBitXorjs } from "../../utils/bignumber/bitXor";
import { latex as latexjs } from "../../utils/latex";
import * as matrixjs from "../../type/matrix/function/matrix";
import * as algorithm03js from "../../type/matrix/utils/algorithm03";
import * as algorithm07js from "../../type/matrix/utils/algorithm07";
import * as algorithm12js from "../../type/matrix/utils/algorithm12";
import * as algorithm13js from "../../type/matrix/utils/algorithm13";
import * as algorithm14js from "../../type/matrix/utils/algorithm14";
'use strict';

var isInteger = numberjs.isInteger;
var bigBitXor = bitXor_bigBitXorjs;

function factory (type, config, load, typed) {
  var latex = latexjs;

  var matrix = load(matrixjs);

  var algorithm03 = load(algorithm03js);
  var algorithm07 = load(algorithm07js);
  var algorithm12 = load(algorithm12js);
  var algorithm13 = load(algorithm13js);
  var algorithm14 = load(algorithm14js);

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
      if (!numberjs(x) || !numberjs(y)) {
        throw new Error('Integers expected in function bitXor');
      }

      return x ^ y;
    },

    'BigNumber, BigNumber': bitXor_bigBitXorjs,

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
    2: '\\left(${args[0]}' + latexjs.operators['bitXor'] + '${args[1]}\\right)'
  };

  return bitXor;
}

var name_exportedObj = 'bitXor';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
