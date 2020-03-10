import { nearlyEqual as numberjs } from "../../utils/number";
import { bigNearlyEqual as nearlyEqual_bigNearlyEqualjs } from "../../utils/bignumber/nearlyEqual";
import * as matrixjs from "../../type/matrix/function/matrix";
import * as algorithm03js from "../../type/matrix/utils/algorithm03";
import * as algorithm07js from "../../type/matrix/utils/algorithm07";
import * as algorithm12js from "../../type/matrix/utils/algorithm12";
import * as algorithm13js from "../../type/matrix/utils/algorithm13";
import * as algorithm14js from "../../type/matrix/utils/algorithm14";
import { latex as latexjs } from "../../utils/latex";
'use strict';

var nearlyEqual = numberjs.nearlyEqual;
var bigNearlyEqual = nearlyEqual_bigNearlyEqualjs;

function factory (type, config, load, typed) {

  var matrix = load(matrixjs);

  var algorithm03 = load(algorithm03js);
  var algorithm07 = load(algorithm07js);
  var algorithm12 = load(algorithm12js);
  var algorithm13 = load(algorithm13js);
  var algorithm14 = load(algorithm14js);

  var latex = latexjs;

  /**
   * Test whether value x is smaller or equal to y.
   *
   * The function returns true when x is smaller than y or the relative
   * difference between x and y is smaller than the configured epsilon. The
   * function cannot be used to compare values smaller than approximately 2.22e-16.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.smallerEq(x, y)
   *
   * Examples:
   *
   *    math.smaller(1 + 2, 3);        // returns false
   *    math.smallerEq(1 + 2, 3);      // returns true
   *
   * See also:
   *
   *    equal, unequal, smaller, larger, largerEq, compare
   *
   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
   * @return {boolean | Array | Matrix} Returns true when the x is smaller than y, else returns false
   */
  var smallerEq = typed('smallerEq', {

    'boolean, boolean': function (x, y) {
      return x <= y;
    },

    'number, number': function (x, y) {
      return x <= y || numberjs(x, y, config.epsilon);
    },

    'BigNumber, BigNumber': function (x, y) {
      return x.lte(y) || nearlyEqual_bigNearlyEqualjs(x, y, config.epsilon);
    },

    'Fraction, Fraction': function (x, y) {
      return x.compare(y) !== 1;
    },

    'Complex, Complex': function () {
      throw new TypeError('No ordering relation is defined for complex numbers');
    },

    'Unit, Unit': function (x, y) {
      if (!x.equalBase(y)) {
        throw new Error('Cannot compare units with different base');
      }
      return smallerEq(x.value, y.value);
    },

    'string, string': function (x, y) {
      return x <= y;
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
              c = algorithm07(x, y, smallerEq);
              break;
            default:
              // sparse + dense
              c = algorithm03(y, x, smallerEq, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense + sparse
              c = algorithm03(x, y, smallerEq, false);
              break;
            default:
              // dense + dense
              c = algorithm13(x, y, smallerEq);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function (x, y) {
      // use matrix implementation
      return smallerEq(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function (x, y) {
      // use matrix implementation
      return smallerEq(matrix(x), y);
    },

    'Matrix, Array': function (x, y) {
      // use matrix implementation
      return smallerEq(x, matrix(y));
    },

    'Matrix, any': function (x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm12(x, y, smallerEq, false);
          break;
        default:
          c = algorithm14(x, y, smallerEq, false);
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
          c = algorithm12(y, x, smallerEq, true);
          break;
        default:
          c = algorithm14(y, x, smallerEq, true);
          break;
      }
      return c;
    },

    'Array, any': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, smallerEq, false).valueOf();
    },

    'any, Array': function (x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, smallerEq, true).valueOf();
    }
  });

  smallerEq.toTex = {
    2: '\\left(${args[0]}' + latexjs.operators['smallerEq'] + '${args[1]}\\right)'
  };

  return smallerEq;
}

var name_exportedObj = 'smallerEq';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
