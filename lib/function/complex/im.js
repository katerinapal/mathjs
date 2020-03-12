import { deepMapjs as utilscollectiondeepMap_deepMapjsjs } from "../../utils/collection/deepMap";
'use strict';

function factory (type, config, load, typed) {
  /**
   * Get the imaginary part of a complex number.
   * For a complex number `a + bi`, the function returns `b`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.im(x)
   *
   * Examples:
   *
   *    var a = math.complex(2, 3);
   *    math.re(a);                     // returns number 2
   *    math.im(a);                     // returns number 3
   *
   *    math.re(math.complex('-5.2i')); // returns number -5.2
   *    math.re(math.complex(2.4));     // returns number 0
   *
   * See also:
   *
   *    re, conj, abs, arg
   *
   * @param {number | BigNumber | Complex | Array | Matrix} x
   *            A complex number or array with complex numbers
   * @return {number | BigNumber | Array | Matrix} The imaginary part of x
   */
  var im = typed('im', {
    'number': function (x) {
      return 0;
    },

    'BigNumber': function (x) {
      return new type.BigNumber(0);
    },

    'Complex': function (x) {
      return x.im;
    },

    'Array | Matrix': function (x) {
      return utilscollectiondeepMap_deepMapjsjs(x, im);
    }
  });

  im.toTex = {1: '\\Im\\left\\lbrace${args[0]}\\right\\rbrace'};

  return im;
}

var name_exportedObj = 'im';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
