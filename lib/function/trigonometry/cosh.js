import { deepMapjs as utilscollectiondeepMap_deepMapjsjs } from "../../utils/collection/deepMap";
'use strict';

function factory (type, config, load, typed) {
  /**
   * Calculate the hyperbolic cosine of a value,
   * defined as `cosh(x) = 1/2 * (exp(x) + exp(-x))`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.cosh(x)
   *
   * Examples:
   *
   *    math.cosh(0.5);       // returns number 1.1276259652063807
   *
   * See also:
   *
   *    sinh, tanh
   *
   * @param {number | BigNumber | Complex | Unit | Array | Matrix} x  Function input
   * @return {number | BigNumber | Complex | Array | Matrix} Hyperbolic cosine of x
   */
  var cosh = typed('cosh', {
    'number': _cosh,

    'Complex': function (x) {
      return x.cosh();
    },

    'BigNumber': function (x) {
      return x.cosh();
    },

    'Unit': function (x) {
      if (!x.hasBase(type.Unit.BASE_UNITS.ANGLE)) {
        throw new TypeError ('Unit in function cosh is no angle');
      }
      return cosh(x.value);
    },

    'Array | Matrix': function (x) {
      return utilscollectiondeepMap_deepMapjsjs(x, cosh);
    }
  });

  cosh.toTex = {1: '\\cosh\\left(${args[0]}\\right)'};

  return cosh;
}

/**
 * Calculate the hyperbolic cosine of a number
 * @param {number} x
 * @returns {number}
 * @private
 */
var _cosh = Math.cosh || function (x) {
  return (Math.exp(x) + Math.exp(-x)) / 2;
};

var name_exportedObj = 'cosh';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
