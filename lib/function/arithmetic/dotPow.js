import * as typematrixfunctionmatrix from "../../type/matrix/function/matrix";
import * as pow from "./pow";
import { utilslatex } from "../../utils/latex";
import * as typematrixutilsalgorithm03 from "../../type/matrix/utils/algorithm03";
import * as typematrixutilsalgorithm07 from "../../type/matrix/utils/algorithm07";
import * as typematrixutilsalgorithm11 from "../../type/matrix/utils/algorithm11";
import * as typematrixutilsalgorithm12 from "../../type/matrix/utils/algorithm12";
import * as typematrixutilsalgorithm13 from "../../type/matrix/utils/algorithm13";
import * as typematrixutilsalgorithm14 from "../../type/matrix/utils/algorithm14";
'use strict';

function factory (type, config, load, typed) {

  var matrix = load(typematrixfunctionmatrix);
  var pow = load(pow);
  var latex = utilslatex;

  var algorithm03 = load(typematrixutilsalgorithm03);
  var algorithm07 = load(typematrixutilsalgorithm07);
  var algorithm11 = load(typematrixutilsalgorithm11);
  var algorithm12 = load(typematrixutilsalgorithm12);
  var algorithm13 = load(typematrixutilsalgorithm13);
  var algorithm14 = load(typematrixutilsalgorithm14);

  /**
   * Calculates the power of x to y element wise.
   *
   * Syntax:
   *
   *    math.dotPow(x, y)
   *
   * Examples:
   *
   *    math.dotPow(2, 3);            // returns number 8
   *
   *    var a = [[1, 2], [4, 3]];
   *    math.dotPow(a, 2);            // returns Array [[1, 4], [16, 9]]
   *    math.pow(a, 2);               // returns Array [[9, 8], [16, 17]]
   *
   * See also:
   *
   *    pow, sqrt, multiply
   *
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} x  The base
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} y  The exponent
   * @return {number | BigNumber | Complex | Unit | Array | Matrix}                     The value of `x` to the power `y`
   */
  var dotPow = typed('dotPow', {
    
    'any, any': pow,
    
    'Matrix, Matrix': function (x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse .^ sparse
              c = algorithm07(x, y, pow, false);
              break;
            default:
              // sparse .^ dense
              c = algorithm03(y, x, pow, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense .^ sparse
              c = algorithm03(x, y, pow, false);
              break;
            default:
              // dense .^ dense
              c = algorithm13(x, y, pow);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return dotPow(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return dotPow(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return dotPow(x, matrix(y));
    },

    'Matrix, any': function (x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm11(x, y, dotPow, false);
          break;
        default:
          c = algorithm14(x, y, dotPow, false);
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
          c = algorithm12(y, x, dotPow, true);
          break;
        default:
          c = algorithm14(y, x, dotPow, true);
          break;
      }
      return c;
    },

    'Array, any': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, dotPow, false).valueOf();
    },

    'any, Array': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, dotPow, true).valueOf();
    }
  });

  dotPow.toTex = {
    2: '\\left(${args[0]}' + utilslatex.operators['dotPow'] + '${args[1]}\\right)'
  };
  
  return dotPow;
}

var name_exportedObj = 'dotPow';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
