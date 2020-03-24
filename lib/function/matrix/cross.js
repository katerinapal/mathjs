"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _subtract = require("../arithmetic/subtract");

var arithmeticsubtract_obj = _interopRequireWildcard(_subtract);

var _multiply = require("../arithmetic/multiply");

var arithmeticmultiply_obj = _interopRequireWildcard(_multiply);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

var size = null;

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);
  var subtract = load(arithmeticsubtract_obj);
  var multiply = load(arithmeticmultiply_obj);

  /**
   * Calculate the cross product for two vectors in three dimensional space.
   * The cross product of `A = [a1, a2, a3]` and `B =[b1, b2, b3]` is defined
   * as:
   *
   *    cross(A, B) = [
   *      a2 * b3 - a3 * b2,
   *      a3 * b1 - a1 * b3,
   *      a1 * b2 - a2 * b1
   *    ]
   *
   * Syntax:
   *
   *    math.cross(x, y)
   *
   * Examples:
   *
   *    math.cross([1, 1, 0],  [0, 1, 1]);  // Returns [1, -1, 1]
   *    math.cross([3, -3, 1], [4, 9, 2]);  // Returns [-15, -2, 39]
   *    math.cross([2, 3, 4],  [5, 6, 7]);  // Returns [-3, 6, -3]
   *
   * See also:
   *
   *    dot, multiply
   *
   * @param  {Array | Matrix} x   First vector
   * @param  {Array | Matrix} y   Second vector
   * @return {Array | Matrix}     Returns the cross product of `x` and `y`
   */
  var cross = typed('cross', {
    'Matrix, Matrix': function MatrixMatrix(x, y) {
      return matrix(_cross(x.toArray(), y.toArray()));
    },

    'Matrix, Array': function MatrixArray(x, y) {
      return matrix(_cross(x.toArray(), y));
    },

    'Array, Matrix': function ArrayMatrix(x, y) {
      return matrix(_cross(x, y.toArray()));
    },

    'Array, Array': _cross
  });

  cross.toTex = {
    2: '\\left(${args[0]}\\right)\\times\\left(${args[1]}\\right)'
  };

  return cross;

  /**
   * Calculate the cross product for two arrays
   * @param {Array} x  First vector
   * @param {Array} y  Second vector
   * @returns {Array} Returns the cross product of x and y
   * @private
   */
  function _cross(x, y) {
    var xSize = size(x);
    var ySize = size(y);

    if (xSize.length != 1 || ySize.length != 1 || xSize[0] != 3 || ySize[0] != 3) {
      throw new RangeError('Vectors with length 3 expected ' + '(Size A = [' + xSize.join(', ') + '], B = [' + ySize.join(', ') + '])');
    }

    return [subtract(multiply(x[1], y[2]), multiply(x[2], y[1])), subtract(multiply(x[2], y[0]), multiply(x[0], y[2])), subtract(multiply(x[0], y[1]), multiply(x[1], y[0]))];
  }
}

var name_name = 'cross';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
