"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _number = require("../../utils/number");

var _nearlyEqual = require("../../utils/bignumber/nearlyEqual");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _algorithm = require("../../type/matrix/utils/algorithm03");

var typematrixutilsalgorithm03_obj = _interopRequireWildcard(_algorithm);

var _algorithm2 = require("../../type/matrix/utils/algorithm07");

var typematrixutilsalgorithm07_obj = _interopRequireWildcard(_algorithm2);

var _algorithm3 = require("../../type/matrix/utils/algorithm12");

var typematrixutilsalgorithm12_obj = _interopRequireWildcard(_algorithm3);

var _algorithm4 = require("../../type/matrix/utils/algorithm13");

var typematrixutilsalgorithm13_obj = _interopRequireWildcard(_algorithm4);

var _algorithm5 = require("../../type/matrix/utils/algorithm14");

var typematrixutilsalgorithm14_obj = _interopRequireWildcard(_algorithm5);

var _latex = require("../../utils/latex");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

  var algorithm03 = load(typematrixutilsalgorithm03_obj);
  var algorithm07 = load(typematrixutilsalgorithm07_obj);
  var algorithm12 = load(typematrixutilsalgorithm12_obj);
  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

  /**
   * Test whether value x is larger than y.
   *
   * The function returns true when x is larger than y and the relative
   * difference between x and y is larger than the configured epsilon. The
   * function cannot be used to compare values smaller than approximately 2.22e-16.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.larger(x, y)
   *
   * Examples:
   *
   *    math.larger(2, 3);             // returns false
   *    math.larger(5, 2 + 2);         // returns true
   *
   *    var a = math.unit('5 cm');
   *    var b = math.unit('2 inch');
   *    math.larger(a, b);             // returns false
   *
   * See also:
   *
   *    equal, unequal, smaller, smallerEq, largerEq, compare
   *
   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} x First value to compare
   * @param  {number | BigNumber | Fraction | boolean | Unit | string | Array | Matrix} y Second value to compare
   * @return {boolean | Array | Matrix} Returns true when the x is larger than y, else returns false
   */
  var larger = typed('larger', {

    'boolean, boolean': function booleanBoolean(x, y) {
      return x > y;
    },

    'number, number': function numberNumber(x, y) {
      return x > y && !(0, _number.nearlyEqual)(x, y, config.epsilon);
    },

    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.gt(y) && !(0, _nearlyEqual.nearlyEqualjs)(x, y, config.epsilon);
    },

    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.compare(y) === 1;
    },

    'Complex, Complex': function ComplexComplex() {
      throw new TypeError('No ordering relation is defined for complex numbers');
    },

    'Unit, Unit': function UnitUnit(x, y) {
      if (!x.equalBase(y)) {
        throw new Error('Cannot compare units with different base');
      }
      return larger(x.value, y.value);
    },

    'string, string': function stringString(x, y) {
      return x > y;
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
              c = algorithm07(x, y, larger);
              break;
            default:
              // sparse + dense
              c = algorithm03(y, x, larger, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense + sparse
              c = algorithm03(x, y, larger, false);
              break;
            default:
              // dense + dense
              c = algorithm13(x, y, larger);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return larger(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return larger(matrix(x), y);
    },

    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return larger(x, matrix(y));
    },

    'Matrix, any': function MatrixAny(x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm12(x, y, larger, false);
          break;
        default:
          c = algorithm14(x, y, larger, false);
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
          c = algorithm12(y, x, larger, true);
          break;
        default:
          c = algorithm14(y, x, larger, true);
          break;
      }
      return c;
    },

    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, larger, false).valueOf();
    },

    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, larger, true).valueOf();
    }
  });

  larger.toTex = {
    2: '\\left(${args[0]}' + _latex.operators['larger'] + '${args[1]}\\right)'
  };

  return larger;
}

var name_name = 'larger';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
