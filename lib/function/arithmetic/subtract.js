"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _DimensionError = require("../../error/DimensionError");

var _latex = require("../../utils/latex");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _addScalar = require("./addScalar");

var _unaryMinus = require("./unaryMinus");

var unaryMinus_obj = _interopRequireWildcard(_unaryMinus);

var _algorithm = require("../../type/matrix/utils/algorithm01");

var typematrixutilsalgorithm01_obj = _interopRequireWildcard(_algorithm);

var _algorithm2 = require("../../type/matrix/utils/algorithm03");

var typematrixutilsalgorithm03_obj = _interopRequireWildcard(_algorithm2);

var _algorithm3 = require("../../type/matrix/utils/algorithm05");

var typematrixutilsalgorithm05_obj = _interopRequireWildcard(_algorithm3);

var _algorithm4 = require("../../type/matrix/utils/algorithm10");

var typematrixutilsalgorithm10_obj = _interopRequireWildcard(_algorithm4);

var _algorithm5 = require("../../type/matrix/utils/algorithm13");

var typematrixutilsalgorithm13_obj = _interopRequireWildcard(_algorithm5);

var _algorithm6 = require("../../type/matrix/utils/algorithm14");

var typematrixutilsalgorithm14_obj = _interopRequireWildcard(_algorithm6);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);
  var addScalar = load(_addScalar.factory);
  var unaryMinus = load(unaryMinus_obj);

  var algorithm01 = load(typematrixutilsalgorithm01_obj);
  var algorithm03 = load(typematrixutilsalgorithm03_obj);
  var algorithm05 = load(typematrixutilsalgorithm05_obj);
  var algorithm10 = load(typematrixutilsalgorithm10_obj);
  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

  // TODO: split function subtract in two: subtract and subtractScalar

  /**
   * Subtract two values, `x - y`.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.subtract(x, y)
   *
   * Examples:
   *
   *    math.subtract(5.3, 2);        // returns number 3.3
   *
   *    var a = math.complex(2, 3);
   *    var b = math.complex(4, 1);
   *    math.subtract(a, b);          // returns Complex -2 + 2i
   *
   *    math.subtract([5, 7, 4], 4);  // returns Array [1, 3, 0]
   *
   *    var c = math.unit('2.1 km');
   *    var d = math.unit('500m');
   *    math.subtract(c, d);          // returns Unit 1.6 km
   *
   * See also:
   *
   *    add
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x
   *            Initial value
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y
   *            Value to subtract from `x`
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}
   *            Subtraction of `x` and `y`
   */
  var subtract = typed('subtract', {

    'number, number': function numberNumber(x, y) {
      return x - y;
    },

    'Complex, Complex': function ComplexComplex(x, y) {
      return x.sub(y);
    },

    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.minus(y);
    },

    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.sub(y);
    },

    'Unit, Unit': function UnitUnit(x, y) {
      if (x.value == null) {
        throw new Error('Parameter x contains a unit with undefined value');
      }

      if (y.value == null) {
        throw new Error('Parameter y contains a unit with undefined value');
      }

      if (!x.equalBase(y)) {
        throw new Error('Units do not match');
      }

      var res = x.clone();
      res.value = subtract(res.value, y.value);
      res.fixPrefix = false;

      return res;
    },

    'Matrix, Matrix': function MatrixMatrix(x, y) {
      // matrix sizes
      var xsize = x.size();
      var ysize = y.size();

      // check dimensions
      if (xsize.length !== ysize.length) throw new _DimensionError.DimensionError(xsize.length, ysize.length);

      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse - sparse
              c = algorithm05(x, y, subtract);
              break;
            default:
              // sparse - dense
              c = algorithm03(y, x, subtract, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense - sparse
              c = algorithm01(x, y, subtract, false);
              break;
            default:
              // dense - dense
              c = algorithm13(x, y, subtract);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return subtract(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return subtract(matrix(x), y);
    },

    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return subtract(x, matrix(y));
    },

    'Matrix, any': function MatrixAny(x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          // algorithm 7 is faster than 9 since it calls f() for nonzero items only!
          c = algorithm10(x, unaryMinus(y), addScalar);
          break;
        default:
          c = algorithm14(x, y, subtract);
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
          c = algorithm10(y, x, subtract, true);
          break;
        default:
          c = algorithm14(y, x, subtract, true);
          break;
      }
      return c;
    },

    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, subtract, false).valueOf();
    },

    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, subtract, true).valueOf();
    }
  });

  subtract.toTex = {
    2: '\\left(${args[0]}' + _latex.operators['subtract'] + '${args[1]}\\right)'
  };

  return subtract;
}

var name_name = 'subtract';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
