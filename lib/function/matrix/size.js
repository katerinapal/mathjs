"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _array = require("../../utils/array");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

  /**
   * Calculate the size of a matrix or scalar.
   *
   * Syntax:
   *
   *     math.size(x)
   *
   * Examples:
   *
   *     math.size(2.3);                  // returns []
   *     math.size('hello world');        // returns [11]
   *
   *     var A = [[1, 2, 3], [4, 5, 6]];
   *     math.size(A);                    // returns [2, 3]
   *     math.size(math.range(1,6));      // returns [5]
   *
   * See also:
   *
   *     resize, squeeze, subset
   *
   * @param {boolean | number | Complex | Unit | string | Array | Matrix} x  A matrix
   * @return {Array | Matrix} A vector with size of `x`.
   */
  var size = typed('size', {
    'Matrix': function Matrix(x) {
      // TODO: return the same matrix type as the input
      return matrix(x.size());
    },

    'Array': _array.size,

    'string': function string(x) {
      return config.matrix === 'Array' ? [x.length] : matrix([x.length]);
    },

    'number | Complex | BigNumber | Unit | boolean | null': function numberComplexBigNumberUnitBooleanNull(x) {
      // scalar
      return config.matrix === 'Array' ? [] : matrix([]);
    }
  });

  size.toTex = undefined; // use default template

  return size;
}

var name_name = 'size';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
