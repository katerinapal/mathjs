"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _number = require("../../utils/number");

var _bitXor = require("../../utils/bignumber/bitXor");

var _latex = require("../../utils/latex");

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
   * Bitwise XOR two values, `x ^ y`.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.bitXor(x, y)
   *
   * Examples:
   *
   *    math.bitXor(1, 2);               // returns number 3
   *
   *    math.bitXor([2, 3, 4], 4);       // returns Array [6, 7, 0]
   *
   * See also:
   *
   *    bitAnd, bitNot, bitOr, leftShift, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x First value to xor
   * @param  {number | BigNumber | Array | Matrix} y Second value to xor
   * @return {number | BigNumber | Array | Matrix} XOR of `x` and `y`
   */
  var bitXor = typed('bitXor', {

    'number, number': function numberNumber(x, y) {
      if (!_number.isNumber || !_number.isNumber) {
        throw new Error('Integers expected in function bitXor');
      }

      return x ^ y;
    },

    'BigNumber, BigNumber': _bitXor.bitXorjs,

    'Matrix, Matrix': function MatrixMatrix(x, y) {
      // result
      var c;

      // process matrix storage
      switch (x.storage()) {
        case 'sparse':
          switch (y.storage()) {
            case 'sparse':
              // sparse + sparse
              c = algorithm07(x, y, bitXor);
              break;
            default:
              // sparse + dense
              c = algorithm03(y, x, bitXor, true);
              break;
          }
          break;
        default:
          switch (y.storage()) {
            case 'sparse':
              // dense + sparse
              c = algorithm03(x, y, bitXor, false);
              break;
            default:
              // dense + dense
              c = algorithm13(x, y, bitXor);
              break;
          }
          break;
      }
      return c;
    },

    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return bitXor(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return bitXor(matrix(x), y);
    },

    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return bitXor(x, matrix(y));
    },

    'Matrix, any': function MatrixAny(x, y) {
      // result
      var c;
      // check storage format
      switch (x.storage()) {
        case 'sparse':
          c = algorithm12(x, y, bitXor, false);
          break;
        default:
          c = algorithm14(x, y, bitXor, false);
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
          c = algorithm12(y, x, bitXor, true);
          break;
        default:
          c = algorithm14(y, x, bitXor, true);
          break;
      }
      return c;
    },

    'Array, any': function ArrayAny(x, y) {
      // use matrix implementation
      return algorithm14(matrix(x), y, bitXor, false).valueOf();
    },

    'any, Array': function anyArray(x, y) {
      // use matrix implementation
      return algorithm14(matrix(y), x, bitXor, true).valueOf();
    }
  });

  bitXor.toTex = {
    2: '\\left(${args[0]}' + _latex.operators['bitXor'] + '${args[1]}\\right)'
  };

  return bitXor;
}

var name_exportedObj = 'bitXor';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
