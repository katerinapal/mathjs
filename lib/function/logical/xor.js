import { utilslatex } from "../../utils/latex";
import * as typematrixfunctionmatrix from "../../type/matrix/function/matrix";
import * as typematrixutilsalgorithm03 from "../../type/matrix/utils/algorithm03";
import * as typematrixutilsalgorithm07 from "../../type/matrix/utils/algorithm07";
import * as typematrixutilsalgorithm12 from "../../type/matrix/utils/algorithm12";
import * as typematrixutilsalgorithm13 from "../../type/matrix/utils/algorithm13";
import * as typematrixutilsalgorithm14 from "../../type/matrix/utils/algorithm14";
'use strict';

function factory (type, config, load, typed) {
  var latex = utilslatex;

  var matrix = load(typematrixfunctionmatrix);

  var algorithm03 = load(typematrixutilsalgorithm03);
  var algorithm07 = load(typematrixutilsalgorithm07);
  var algorithm12 = load(typematrixutilsalgorithm12);
  var algorithm13 = load(typematrixutilsalgorithm13);
  var algorithm14 = load(typematrixutilsalgorithm14);
  
  /**
   * Logical `xor`. Test whether one and only one value is defined with a nonzero/nonempty value.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.xor(x, y)
   *
   * Examples:
   *
   *    math.xor(2, 4);   // returns false
   *
   *    a = [2, 0, 0];
   *    b = [2, 7, 0];
   *    c = 0;
   *
   *    math.xor(a, b);   // returns [false, true, false]
   *    math.xor(a, c);   // returns [true, false, false]
   *
   * See also:
   *
   *    and, not, or
   *
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} x First value to check
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} y Second value to check
   * @return {boolean | Array | Matrix}
   *            Returns true when one and only one input is defined with a nonzero/nonempty value.
   */
  var xor = typed('xor', {
 
    'number, number': function (x, y) {
      return !!(!!x ^ !!y);
    },

    'Complex, Complex': function (x, y) {
      return ((x.re !== 0 || x.im !== 0) !== (y.re !== 0 || y.im !== 0));
    },

    'BigNumber, BigNumber': function (x, y) {
      return ((!x.isZero() && !x.isNaN()) !== (!y.isZero() && !y.isNaN()));
    },

    'Unit, Unit': function (x, y) {
      return xor(x.value, y.value);
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
              c = algorithm07(x, y, xor);
              break;
            default:
              // sparse + dense
              c = algorithm03(y, x, xor, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense + sparse
              c = algorithm03(x, y, xor, false);
              break;
            default:
              // dense + dense
              c = algorithm13(x, y, xor);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return xor(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return xor(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return xor(x, matrix(y));
    },

    'Matrix, any': function (x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm12(x, y, xor, false);
          break;
        default:
          c = algorithm14(x, y, xor, false);
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
          c = algorithm12(y, x, xor, true);
          break;
        default:
          c = algorithm14(y, x, xor, true);
          break;
      }
      return c;
    },

    'Array, any': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, xor, false).valueOf();
    },

    'any, Array': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, xor, true).valueOf();
    }
  });

  xor.toTex = {
    2: '\\left(${args[0]}' + utilslatex.operators['xor'] + '${args[1]}\\right)'
  };

  return xor;
}

var name_exportedObj = 'xor';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
