'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {

  /**
   * Calculate the inverse secant of a value. Defined as `asec(x) = acos(1/x)`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.asec(x)
   *
   * Examples:
   *
   *    math.asec(0.5);           // returns 1.0471975511965979
   *    math.asec(math.sec(1.5)); // returns 1.5
   *
   *    math.asec(2);             // returns 0 + 1.3169578969248166 i
   *
   * See also:
   *
   *    acos, acot, acsc
   *
   * @param {number | Complex | Array | Matrix} x  Function input
   * @return {number | Complex | Array | Matrix} The arc secant of x
   */
  var asec = typed('asec', {
    'number': function number(x) {
      if (x <= -1 || x >= 1 || config.predictable) {
        return Math.acos(1 / x);
      }
      return new type.Complex(x, 0).asec();
    },

    'Complex': function Complex(x) {
      return x.asec();
    },

    'BigNumber': function BigNumber(x) {
      return new type.BigNumber(1).div(x).acos();
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, asec);
    }
  });

  asec.toTex = { 1: '\\sec^{-1}\\left(${args[0]}\\right)' };

  return asec;
}

var name_name = 'asec';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
