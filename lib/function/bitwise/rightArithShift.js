import { isInteger as numberjs } from "../../utils/number";
import { bigRightArithShift as rightArithShift_bigRightArithShiftjs } from "../../utils/bignumber/rightArithShift";
import { latex as latexjs } from "../../utils/latex";
import * as matrixjs from "../../type/matrix/function/matrix";
import * as equalScalarjs from "../relational/equalScalar";
import * as zerosjs from "../matrix/zeros";
import * as algorithm01js from "../../type/matrix/utils/algorithm01";
import * as algorithm02js from "../../type/matrix/utils/algorithm02";
import * as algorithm08js from "../../type/matrix/utils/algorithm08";
import * as algorithm10js from "../../type/matrix/utils/algorithm10";
import * as algorithm11js from "../../type/matrix/utils/algorithm11";
import * as algorithm13js from "../../type/matrix/utils/algorithm13";
import * as algorithm14js from "../../type/matrix/utils/algorithm14";
'use strict';

var isInteger = numberjs.isInteger;
var bigRightArithShift = rightArithShift_bigRightArithShiftjs;

function factory (type, config, load, typed) {
  var latex = latexjs;
  
  var matrix = load(matrixjs);
  var equalScalar = load(equalScalarjs);
  var zeros = load(zerosjs);

  var algorithm01 = load(algorithm01js);
  var algorithm02 = load(algorithm02js);
  var algorithm08 = load(algorithm08js);
  var algorithm10 = load(algorithm10js);
  var algorithm11 = load(algorithm11js);
  var algorithm13 = load(algorithm13js);
  var algorithm14 = load(algorithm14js);

  /**
   * Bitwise right arithmetic shift of a value x by y number of bits, `x >> y`.
   * For matrices, the function is evaluated element wise.
   * For units, the function is evaluated on the best prefix base.
   *
   * Syntax:
   *
   *    math.rightArithShift(x, y)
   *
   * Examples:
   *
   *    math.rightArithShift(4, 2);               // returns number 1
   *
   *    math.rightArithShift([16, -32, 64], 4);   // returns Array [1, -2, 3]
   *
   * See also:
   *
   *    bitAnd, bitNot, bitOr, bitXor, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x Value to be shifted
   * @param  {number | BigNumber} y Amount of shifts
   * @return {number | BigNumber | Array | Matrix} `x` sign-filled shifted right `y` times
   */
  var rightArithShift = typed('rightArithShift', {

    'number, number': function (x, y) {
      if (!numberjs(x) || !numberjs(y)) {
        throw new Error('Integers expected in function rightArithShift');
      }

      return x >> y;
    },

    'BigNumber, BigNumber': rightArithShift_bigRightArithShiftjs,

    'Matrix, Matrix': function (x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse & sparse
              c = algorithm08(x, y, rightArithShift, false);
              break;
            default:
              // sparse & dense
              c = algorithm02(y, x, rightArithShift, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense & sparse
              c = algorithm01(x, y, rightArithShift, false);
              break;
            default:
              // dense & dense
              c = algorithm13(x, y, rightArithShift);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return rightArithShift(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return rightArithShift(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return rightArithShift(x, matrix(y));
    },

    'Matrix, number | BigNumber': function (x, y) {
      // check scalar
      if (!equalScalar(y, 0)) {
        // result
        var c;
        // check storage format
        switch (x.storage()) {
          case 'sparse':
            c = algorithm11(x, y, rightArithShift, false);
            break;
          default:
            c = algorithm14(x, y, rightArithShift, false);
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
            c = algorithm10(y, x, rightArithShift, true);
            break;
          default:
            c = algorithm14(y, x, rightArithShift, true);
            break;
        }
        return c;
      }
      return zeros(y.size(), y.storage());
    },

    'Array, number | BigNumber': function (x, y) {
      // use matrix implementation
      return rightArithShift(matrix(x), y).valueOf();
    },

    'number | BigNumber, Array': function (x, y) {
      // use matrix implementation
      return rightArithShift(x, matrix(y)).valueOf();
    }
  });

  rightArithShift.toTex = {
    2: '\\left(${args[0]}' + latexjs.operators['rightArithShift'] + '${args[1]}\\right)'
  };

  return rightArithShift;
}

var name_exportedObj = 'rightArithShift';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
