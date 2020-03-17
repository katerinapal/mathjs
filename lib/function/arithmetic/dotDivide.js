'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory(type, config, load, typed) {

  var matrix = load(typematrixfunctionmatrix_obj);
  var divideScalar = load(divideScalar_obj);
  var latex = require('../../utils/latex');

  var algorithm02 = load(typematrixutilsalgorithm02_obj);
  var algorithm03 = load(typematrixutilsalgorithm03_obj);
  var algorithm07 = load(typematrixutilsalgorithm07_obj);
  var algorithm11 = load(typematrixutilsalgorithm11_obj);
  var algorithm12 = load(typematrixutilsalgorithm12_obj);
  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

  /**
   * Divide two matrices element wise. The function accepts both matrices and
   * scalar values.
   *
   * Syntax:
   *
   *    math.dotDivide(x, y)
   *
   * Examples:
   *
   *    math.dotDivide(2, 4);   // returns 0.5
   *
   *    a = [[9, 5], [6, 1]];
   *    b = [[3, 2], [5, 2]];
   *
   *    math.dotDivide(a, b);   // returns [[3, 2.5], [1.2, 0.5]]
   *    math.divide(a, b);      // returns [[1.75, 0.75], [-1.75, 2.25]]
   *
   * See also:
   *
   *    divide, multiply, dotMultiply
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x Numerator
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} y Denominator
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}                    Quotient, `x ./ y`
   */
  var dotDivide = typed('dotDivide', {

    'any, any': divideScalar,

    'Matrix, Matrix': function MatrixMatrix(x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse ./ sparse
              c = algorithm07(x, y, divideScalar, false);
              break;
            default:
              // sparse ./ dense
              c = algorithm02(y, x, divideScalar, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense ./ sparse
              c = algorithm03(x, y, divideScalar, false);
              break;
            default:
              // dense ./ dense
              c = algorithm13(x, y, divideScalar);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return dotDivide(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return dotDivide(matrix(x), y);
    },

    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return dotDivide(x, matrix(y));
    },

    'Matrix, any': function MatrixAny(x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm11(x, y, divideScalar, false);
          break;
        default:
          c = algorithm14(x, y, divideScalar, false);
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
          c = algorithm12(y, x, divideScalar, true);
          break;
        default:
          c = algorithm14(y, x, divideScalar, true);
          break;
      }
      return c;
    },

    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, divideScalar, false).valueOf();
    },

    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, divideScalar, true).valueOf();
    }
  });

  dotDivide.toTex = {
    2: '\\left(${args[0]}' + latex.operators['dotDivide'] + '${args[1]}\\right)'
  };

  return dotDivide;
}

var name_name = 'dotDivide';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
