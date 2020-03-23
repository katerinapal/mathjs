"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _latex = require("../../utils/latex");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _algorithm = require("../../type/matrix/utils/algorithm03");

var typematrixutilsalgorithm03_obj = _interopRequireWildcard(_algorithm);

var _algorithm2 = require("../../type/matrix/utils/algorithm05");

var typematrixutilsalgorithm05_obj = _interopRequireWildcard(_algorithm2);

var _algorithm3 = require("../../type/matrix/utils/algorithm12");

var typematrixutilsalgorithm12_obj = _interopRequireWildcard(_algorithm3);

var _algorithm4 = require("../../type/matrix/utils/algorithm13");

var typematrixutilsalgorithm13_obj = _interopRequireWildcard(_algorithm4);

var _algorithm5 = require("../../type/matrix/utils/algorithm14");

var typematrixutilsalgorithm14_obj = _interopRequireWildcard(_algorithm5);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

  var algorithm03 = load(typematrixutilsalgorithm03_obj);
  var algorithm05 = load(typematrixutilsalgorithm05_obj);
  var algorithm12 = load(typematrixutilsalgorithm12_obj);
  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

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

    'number, number': function numberNumber(x, y) {
      return !!(x || y);
    },

    'Complex, Complex': function ComplexComplex(x, y) {
      return x.re !== 0 || x.im !== 0 || y.re !== 0 || y.im !== 0;
    },

    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return !x.isZero() && !x.isNaN() || !y.isZero() && !y.isNaN();
    },

    'Unit, Unit': function UnitUnit(x, y) {
      return or(x.value, y.value);
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

    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return or(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return or(matrix(x), y);
    },

    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return or(x, matrix(y));
    },

    'Matrix, any': function MatrixAny(x, y) {
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

    'any, Matrix': function anyMatrix(x, y) {
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

    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, or, false).valueOf();
    },

    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, or, true).valueOf();
    }
  });

  or.toTex = {
    2: '\\left(${args[0]}' + _latex.operators['or'] + '${args[1]}\\right)'
  };

  return or;
}

var name_name = 'or';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
