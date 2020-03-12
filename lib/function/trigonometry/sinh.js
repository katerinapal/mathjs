'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {
  /**
   * Calculate the hyperbolic sine of a value,
   * defined as `sinh(x) = 1/2 * (exp(x) - exp(-x))`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.sinh(x)
   *
   * Examples:
   *
   *    math.sinh(0.5);       // returns number 0.5210953054937474
   *
   * See also:
   *
   *    cosh, tanh
   *
   * @param {number | BigNumber | Complex | Unit | Array | Matrix} x  Function input
   * @return {number | BigNumber | Complex | Array | Matrix} Hyperbolic sine of x
   */
  var sinh = typed('sinh', {
    'number': _sinh,

    'Complex': function Complex(x) {
      return x.sinh();
    },

    'BigNumber': function BigNumber(x) {
      return x.sinh();
    },

    'Unit': function Unit(x) {
      if (!x.hasBase(type.Unit.BASE_UNITS.ANGLE)) {
        throw new TypeError('Unit in function sinh is no angle');
      }
      return sinh(x.value);
    },

    'Array | Matrix': function ArrayMatrix(x) {
      // deep map collection, skip zeros since sinh(0) = 0
      return (0, _deepMap.deepMapjs)(x, sinh, true);
    }
  });

  sinh.toTex = { 1: '\\sinh\\left(${args[0]}\\right)' };

  return sinh;
}

/**
 * Calculate the hyperbolic sine of a number
 * @param {number} x
 * @returns {number}
 * @private
 */
var _sinh = Math.sinh || function (x) {
  return (Math.exp(x) - Math.exp(-x)) / 2;
};

var name_exportedObj = 'sinh';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
