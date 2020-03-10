import { latex as latexjs } from "../../utils/latex";
import * as matrixjs from "../../type/matrix/function/matrix";
import * as algorithm03js from "../../type/matrix/utils/algorithm03";
import * as algorithm05js from "../../type/matrix/utils/algorithm05";
import * as algorithm12js from "../../type/matrix/utils/algorithm12";
import * as algorithm13js from "../../type/matrix/utils/algorithm13";
import * as algorithm14js from "../../type/matrix/utils/algorithm14";
'use strict';

function factory (type, config, load, typed) {
  var latex = latexjs;

  var matrix = load(matrixjs);

  var algorithm03 = load(algorithm03js);
  var algorithm05 = load(algorithm05js);
  var algorithm12 = load(algorithm12js);
  var algorithm13 = load(algorithm13js);
  var algorithm14 = load(algorithm14js);
  
  /**
   * Logical `or`. Test if at least one value is defined with a nonzero/nonempty value.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.or(x, y)
   *
   * Examples:
   *
   *    math.or(2, 4);   // returns true
   *
   *    a = [2, 5, 0];
   *    b = [0, 22, 0];
   *    c = 0;
   *
   *    math.or(a, b);   // returns [true, true, false]
   *    math.or(b, c);   // returns [false, true, false]
   *
   * See also:
   *
   *    and, not, xor
   *
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} x First value to check
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} y Second value to check
   * @return {boolean | Array | Matrix}
   *            Returns true when one of the inputs is defined with a nonzero/nonempty value.
   */
  var or = typed('or', {

    'number, number': function (x, y) {
      return !!(x || y);
    },

    'Complex, Complex': function (x, y) {
      return (x.re !== 0 || x.im !== 0) || (y.re !== 0 || y.im !== 0);
    },

    'BigNumber, BigNumber': function (x, y) {
      return (!x.isZero() && !x.isNaN()) || (!y.isZero() && !y.isNaN());
    },

    'Unit, Unit': function (x, y) {
      return or(x.value, y.value);
    },

    'Matrix, Matrix': function (x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse + sparse
              c = algorithm05(x, y, or);
              break;
            default:
              // sparse + dense
              c = algorithm03(y, x, or, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense + sparse
              c = algorithm03(x, y, or, false);
              break;
            default:
              // dense + dense
              c = algorithm13(x, y, or);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return or(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return or(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return or(x, matrix(y));
    },

    'Matrix, any': function (x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm12(x, y, or, false);
          break;
        default:
          c = algorithm14(x, y, or, false);
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
          c = algorithm12(y, x, or, true);
          break;
        default:
          c = algorithm14(y, x, or, true);
          break;
      }
      return c;
    },

    'Array, any': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, or, false).valueOf();
    },

    'any, Array': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, or, true).valueOf();
    }
  });

  or.toTex = {
    2: '\\left(${args[0]}' + latexjs.operators['or'] + '${args[1]}\\right)'
  };

  return or;
}

var name_exportedObj = 'or';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
