import { isInteger as utilsnumber_isIntegerjs } from "../../utils/number";
import { leftShiftjs as utilsbignumberleftShift_leftShiftjsjs } from "../../utils/bignumber/leftShift";
import { operators as utilslatex_operatorsjs } from "../../utils/latex";
import * as typematrixfunctionmatrix_obj from "../../type/matrix/function/matrix";
import * as relationalequalScalar_obj from "../relational/equalScalar";
import * as matrixzeros_obj from "../matrix/zeros";
import * as typematrixutilsalgorithm01_obj from "../../type/matrix/utils/algorithm01";
import * as typematrixutilsalgorithm02_obj from "../../type/matrix/utils/algorithm02";
import * as typematrixutilsalgorithm08_obj from "../../type/matrix/utils/algorithm08";
import * as typematrixutilsalgorithm10_obj from "../../type/matrix/utils/algorithm10";
import * as typematrixutilsalgorithm11_obj from "../../type/matrix/utils/algorithm11";
import * as typematrixutilsalgorithm13_obj from "../../type/matrix/utils/algorithm13";
import * as typematrixutilsalgorithm14_obj from "../../type/matrix/utils/algorithm14";
'use strict';

function factory (type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);
  var equalScalar = load(relationalequalScalar_obj);
  var zeros = load(matrixzeros_obj);

  var algorithm01 = load(typematrixutilsalgorithm01_obj);
  var algorithm02 = load(typematrixutilsalgorithm02_obj);
  var algorithm08 = load(typematrixutilsalgorithm08_obj);
  var algorithm10 = load(typematrixutilsalgorithm10_obj);
  var algorithm11 = load(typematrixutilsalgorithm11_obj);
  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

  /**
   * Bitwise left logical shift of a value x by y number of bits, `x << y`.
   * For matrices, the function is evaluated element wise.
   * For units, the function is evaluated on the best prefix base.
   *
   * Syntax:
   *
   *    math.leftShift(x, y)
   *
   * Examples:
   *
   *    math.leftShift(1, 2);               // returns number 4
   *
   *    math.leftShift([1, 2, 3], 4);       // returns Array [16, 32, 64]
   *
   * See also:
   *
   *    leftShift, bitNot, bitOr, bitXor, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x Value to be shifted
   * @param  {number | BigNumber} y Amount of shifts
   * @return {number | BigNumber | Array | Matrix} `x` shifted left `y` times
   */
  var leftShift = typed('leftShift', {
    
    'number, number': function (x, y) {
      if (!utilsnumber_isIntegerjs(x) || !utilsnumber_isIntegerjs(y)) {
        throw new Error('Integers expected in function leftShift');
      }

      return x << y;
    },

    'BigNumber, BigNumber': utilsbignumberleftShift_leftShiftjsjs,

    'Matrix, Matrix': function (x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse & sparse
              c = algorithm08(x, y, leftShift, false);
              break;
            default:
              // sparse & dense
              c = algorithm02(y, x, leftShift, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense & sparse
              c = algorithm01(x, y, leftShift, false);
              break;
            default:
              // dense & dense
              c = algorithm13(x, y, leftShift);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return leftShift(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return leftShift(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return leftShift(x, matrix(y));
    },

    'Matrix, number | BigNumber': function (x, y) {
      // check scalar
      if (!equalScalar(y, 0)) {
        // result
        var c;
        // check storage format
        switch (x.storage()) {
          case 'sparse':
            c = algorithm11(x, y, leftShift, false);
            break;
          default:
            c = algorithm14(x, y, leftShift, false);
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
            c = algorithm10(y, x, leftShift, true);
            break;
          default:
            c = algorithm14(y, x, leftShift, true);
            break;
        }
        return c;
      }
      return zeros(y.size(), y.storage());
    },

    'Array, number | BigNumber': function (x, y) {
      // use matrix implementation
      return leftShift(matrix(x), y).valueOf();
    },

    'number | BigNumber, Array': function (x, y) {
      // use matrix implementation
      return leftShift(x, matrix(y)).valueOf();
    }
  });

  leftShift.toTex = {
    2: '\\left(${args[0]}' + utilslatex_operatorsjs['leftShift'] + '${args[1]}\\right)'
  };

  return leftShift;
}

var name_name = 'leftShift';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
