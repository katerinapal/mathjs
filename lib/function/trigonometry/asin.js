'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {

  /**
   * Calculate the inverse sine of a value.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.asin(x)
   *
   * Examples:
   *
   *    math.asin(0.5);           // returns number 0.5235987755982989
   *    math.asin(math.sin(1.5)); // returns number ~1.5
   *
   *    math.asin(2);             // returns Complex 1.5707963267948966 -1.3169578969248166 i
   *
   * See also:
   *
   *    sin, atan, acos
   *
   * @param {number | BigNumber | Complex | Array | Matrix} x   Function input
   * @return {number | BigNumber | Complex | Array | Matrix} The arc sine of x
   */
  var asin = typed('asin', {
    'number': function number(x) {
      if (x >= -1 && x <= 1 || config.predictable) {
        return Math.asin(x);
      } else {
        return new type.Complex(x, 0).asin();
      }
    },

    'Complex': function Complex(x) {
      return x.asin();
    },

    'BigNumber': function BigNumber(x) {
      return x.asin();
    },

    'Array | Matrix': function ArrayMatrix(x) {
      // deep map collection, skip zeros since asin(0) = 0
      return (0, _deepMap.deepMapjs)(x, asin, true);
    }
  });

  asin.toTex = { 1: '\\sin^{-1}\\left(${args[0]}\\right)' };

  return asin;
}

var name_exportedObj = 'asin';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
