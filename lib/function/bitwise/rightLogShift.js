import { utilsnumber } from "../../utils/number";
import { utilslatex } from "../../utils/latex";
import * as typematrixfunctionmatrix from "../../type/matrix/function/matrix";
import * as relationalequalScalar from "../relational/equalScalar";
import * as matrixzeros from "../matrix/zeros";
import * as typematrixutilsalgorithm01 from "../../type/matrix/utils/algorithm01";
import * as typematrixutilsalgorithm02 from "../../type/matrix/utils/algorithm02";
import * as typematrixutilsalgorithm08 from "../../type/matrix/utils/algorithm08";
import * as typematrixutilsalgorithm10 from "../../type/matrix/utils/algorithm10";
import * as typematrixutilsalgorithm11 from "../../type/matrix/utils/algorithm11";
import * as typematrixutilsalgorithm13 from "../../type/matrix/utils/algorithm13";
import * as typematrixutilsalgorithm14 from "../../type/matrix/utils/algorithm14";
'use strict';

var isInteger = utilsnumber.isInteger;

function factory (type, config, load, typed) {
  var latex = utilslatex;

  var matrix = load(typematrixfunctionmatrix);
  var equalScalar = load(relationalequalScalar);
  var zeros = load(matrixzeros);

  var algorithm01 = load(typematrixutilsalgorithm01);
  var algorithm02 = load(typematrixutilsalgorithm02);
  var algorithm08 = load(typematrixutilsalgorithm08);
  var algorithm10 = load(typematrixutilsalgorithm10);
  var algorithm11 = load(typematrixutilsalgorithm11);
  var algorithm13 = load(typematrixutilsalgorithm13);
  var algorithm14 = load(typematrixutilsalgorithm14);
  
  /**
   * Bitwise right logical shift of value x by y number of bits, `x >>> y`.
   * For matrices, the function is evaluated element wise.
   * For units, the function is evaluated on the best prefix base.
   *
   * Syntax:
   *
   *    math.rightLogShift(x, y)
   *
   * Examples:
   *
   *    math.rightLogShift(4, 2);               // returns number 1
   *
   *    math.rightLogShift([16, -32, 64], 4);   // returns Array [1, 2, 3]
   *
   * See also:
   *
   *    bitAnd, bitNot, bitOr, bitXor, leftShift, rightLogShift
   *
   * @param  {number | Array | Matrix} x Value to be shifted
   * @param  {number} y Amount of shifts
   * @return {number | Array | Matrix} `x` zero-filled shifted right `y` times
   */

  var rightLogShift = typed('rightLogShift', {

    'number, number': function (x, y) {
      if (!utilsnumber(x) || !utilsnumber(y)) {
        throw new Error('Integers expected in function rightLogShift');
      }

      return x >>> y;
    },

    // 'BigNumber, BigNumber': ..., // TODO: implement BigNumber support for rightLogShift

    'Matrix, Matrix': function (x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse & sparse
              c = algorithm08(x, y, rightLogShift, false);
              break;
            default:
              // sparse & dense
              c = algorithm02(y, x, rightLogShift, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense & sparse
              c = algorithm01(x, y, rightLogShift, false);
              break;
            default:
              // dense & dense
              c = algorithm13(x, y, rightLogShift);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return rightLogShift(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return rightLogShift(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return rightLogShift(x, matrix(y));
    },

    'Matrix, number | BigNumber': function (x, y) {
      // check scalar
      if (!equalScalar(y, 0)) {
        // result
        var c;
        // check storage format
        switch (x.storage()) {
          case 'sparse':
            c = algorithm11(x, y, rightLogShift, false);
            break;
          default:
            c = algorithm14(x, y, rightLogShift, false);
            break;
        }
        return c;
      }
      return x.clone();
    },

    'number | BigNumber, Matrix': function (x, y) {
      // check scalar
      if (!equalScalar(x, 0)) {
        // result
        var c;
        // check storage format
        switch (y.storage()) {
          case 'sparse':
            c = algorithm10(y, x, rightLogShift, true);
            break;
          default:
            c = algorithm14(y, x, rightLogShift, true);
            break;
        }
        return c;
      }
      return zeros(y.size(), y.storage());
    },

    'Array, number | BigNumber': function (x, y) {
      // use matrix implementation
      return rightLogShift(matrix(x), y).valueOf();
    },

    'number | BigNumber, Array': function (x, y) {
      // use matrix implementation
      return rightLogShift(x, matrix(y)).valueOf();
    }
  });

  rightLogShift.toTex = {
    2: '\\left(${args[0]}' + utilslatex.operators['rightLogShift'] + '${args[1]}\\right)'
  };

  return rightLogShift;
}

var name_exportedObj = 'rightLogShift';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
