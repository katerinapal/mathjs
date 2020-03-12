"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _number = require("../../utils/number");

var _rightArithShift = require("../../utils/bignumber/rightArithShift");

var _latex = require("../../utils/latex");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _equalScalar = require("../relational/equalScalar");

var relationalequalScalar_obj = _interopRequireWildcard(_equalScalar);

var _zeros = require("../matrix/zeros");

var matrixzeros_obj = _interopRequireWildcard(_zeros);

var _algorithm = require("../../type/matrix/utils/algorithm01");

var typematrixutilsalgorithm01_obj = _interopRequireWildcard(_algorithm);

var _algorithm2 = require("../../type/matrix/utils/algorithm02");

var typematrixutilsalgorithm02_obj = _interopRequireWildcard(_algorithm2);

var _algorithm3 = require("../../type/matrix/utils/algorithm08");

var typematrixutilsalgorithm08_obj = _interopRequireWildcard(_algorithm3);

var _algorithm4 = require("../../type/matrix/utils/algorithm10");

var typematrixutilsalgorithm10_obj = _interopRequireWildcard(_algorithm4);

var _algorithm5 = require("../../type/matrix/utils/algorithm11");

var typematrixutilsalgorithm11_obj = _interopRequireWildcard(_algorithm5);

var _algorithm6 = require("../../type/matrix/utils/algorithm13");

var typematrixutilsalgorithm13_obj = _interopRequireWildcard(_algorithm6);

var _algorithm7 = require("../../type/matrix/utils/algorithm14");

var typematrixutilsalgorithm14_obj = _interopRequireWildcard(_algorithm7);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);
  var equalScalar = load(relationalequalScalar_obj);
  var zeros = load(matrixzeros_obj);

  var algorithm01 = load(typematrixutilsalgorithm01_obj);
  var algorithm02 = load(typematrixutilsalgorithm02_obj);
  var algorithm08 = load(typematrixutilsalgorithm08_obj);
  var algorithm10 = load(typematrixutilsalgorithm10_obj);
  var algorithm11 = load(typematrixutilsalgorithm11_obj);
  var algorithm13 = load(typematrixutilsalgorithm13_obj);
  var algorithm14 = load(typematrixutilsalgorithm14_obj);

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

    'number, number': function numberNumber(x, y) {
      if (!_number.isNumber || !_number.isNumber) {
        throw new Error('Integers expected in function rightArithShift');
      }

      return x >> y;
    },

    'BigNumber, BigNumber': _rightArithShift.rightArithShiftjs,

    'Matrix, Matrix': function MatrixMatrix(x, y) {
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

    'Array, Array': function ArrayArray(x, y) {
      // use matrix implementation
      return rightArithShift(matrix(x), matrix(y)).valueOf();
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      // use matrix implementation
      return rightArithShift(matrix(x), y);
    },

    'Matrix, Array': function MatrixArray(x, y) {
      // use matrix implementation
      return rightArithShift(x, matrix(y));
    },

    'Matrix, number | BigNumber': function MatrixNumberBigNumber(x, y) {
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

    'number | BigNumber, Matrix': function numberBigNumberMatrix(x, y) {
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

    'Array, number | BigNumber': function ArrayNumberBigNumber(x, y) {
      // use matrix implementation
      return rightArithShift(matrix(x), y).valueOf();
    },

    'number | BigNumber, Array': function numberBigNumberArray(x, y) {
      // use matrix implementation
      return rightArithShift(x, matrix(y)).valueOf();
    }
  });

  rightArithShift.toTex = {
    2: '\\left(${args[0]}' + _latex.operators['rightArithShift'] + '${args[1]}\\right)'
  };

  return rightArithShift;
}

var name_exportedObj = 'rightArithShift';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
