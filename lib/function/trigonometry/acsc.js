'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {

  /**
   * Calculate the inverse cosecant of a value, defined as `acsc(x) = asin(1/x)`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.acsc(x)
   *
   * Examples:
   *
   *    math.acsc(0.5);           // returns number 0.5235987755982989
   *    math.acsc(math.csc(1.5)); // returns number ~1.5
   *
   *    math.acsc(2);             // returns Complex 1.5707963267948966 -1.3169578969248166 i
   *
   * See also:
   *
   *    csc, asin, asec
   *
   * @param {number | Complex | Array | Matrix} x   Function input
   * @return {number | Complex | Array | Matrix} The arc cosecant of x
   */
  var acsc = typed('acsc', {
    'number': function number(x) {
      if (x <= -1 || x >= 1 || config.predictable) {
        return Math.asin(1 / x);
      }
      return new type.Complex(x, 0).acsc();
    },

    'Complex': function Complex(x) {
      return x.acsc();
    },

    'BigNumber': function BigNumber(x) {
      return new type.BigNumber(1).div(x).asin();
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return deepMap(x, acsc);
    }
  });

  acsc.toTex = { 1: '\\csc^{-1}\\left(${args[0]}\\right)' };

  return acsc;
}

var name_name = 'acsc';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
