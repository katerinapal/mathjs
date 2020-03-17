"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _number = require("../../utils/number");

var _nearlyEqual = require("../../utils/bignumber/nearlyEqual");

'use strict';

function factory(type, config, load, typed) {

  var matrix = load(typematrixfunctionmatrix_obj);

  var algorithm03 = load(typematrixutilsalgorithm03_obj);
  var algorithm07 = load(typematrixutilsalgorithm07_obj);
  var algorithm12 = load(typematrixutilsalgorithm12_obj);
  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

  var latex = require('../../utils/latex');

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

    'boolean, boolean': function booleanBoolean(x, y) {
      return x <= y;
    },

    'number, number': function numberNumber(x, y) {
      return x <= y || _number.nearlyEqual;
    },

    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.lte(y) || (0, _nearlyEqual.nearlyEqualjs)(x, y, config.epsilon);
    },

    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.compare(y) !== 1;
    },

    'Complex, Complex': function ComplexComplex() {
      throw new TypeError('No ordering relation is defined for complex numbers');
    },

    'Unit, Unit': function UnitUnit(x, y) {
      if (!x.equalBase(y)) {
        throw new Error('Cannot compare units with different base');
      }
      return smallerEq(x.value, y.value);
    },

    'string, string': function stringString(x, y) {
      return x <= y;
    },

    'Matrix, Matrix': function MatrixMatrix(x, y) {
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

    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return smallerEq(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return smallerEq(matrix(x), y);
    },

    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return smallerEq(x, matrix(y));
    },

    'Matrix, any': function MatrixAny(x, y) {
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

    'any, Matrix': function anyMatrix(x, y) {
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

    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, smallerEq, false).valueOf();
    },

    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, smallerEq, true).valueOf();
    }
  });

  smallerEq.toTex = {
    2: '\\left(${args[0]}' + latex.operators['smallerEq'] + '${args[1]}\\right)'
  };

  return smallerEq;
}

var name_name = 'smallerEq';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
