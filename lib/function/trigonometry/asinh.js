import { deepMapjs as utilscollectiondeepMap_deepMapjsjs } from "../../utils/collection/deepMap";
'use strict';

function factory (type, config, load, typed) {

  /**
   * Calculate the hyperbolic arcsine of a value,
   * defined as `asinh(x) = ln(x + sqrt(x^2 + 1))`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.asinh(x)
   *
   * Examples:
   *
   *    math.asinh(0.5);       // returns 0.48121182505960347
   *
   * See also:
   *
   *    acosh, atanh
   *
   * @param {number | Complex | Array | Matrix} x  Function input
   * @return {number | Complex | Array | Matrix} Hyperbolic arcsine of x
   */
  var asinh = typed('asinh', {
    'number': Math.asinh || function (x) {
      return Math.log(Math.sqrt(x*x + 1) + x);
    },

    'Complex': function (x) {
        return x.asinh();
    },

    'BigNumber': function (x) {
      return x.asinh();
    },

    'Array | Matrix': function (x) {
      // deep map collection, skip zeros since asinh(0) = 0
      return deepMap(x, asinh, true);
    }
  });

  asinh.toTex = {1: '\\sinh^{-1}\\left(${args[0]}\\right)'};

  return asinh;
}

var name_name = 'asinh';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
