import { deepMap as deepMap_deepMapjs } from "../../utils/collection/deepMap";
'use strict';

var deepMap = deepMap_deepMapjs;

function factory (type, config, load, typed) {
  /**
   * Round a value towards zero.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.fix(x)
   *
   * Examples:
   *
   *    math.fix(3.2);                // returns number 3
   *    math.fix(3.8);                // returns number 3
   *    math.fix(-4.2);               // returns number -4
   *    math.fix(-4.7);               // returns number -4
   *
   *    var c = math.complex(3.2, -2.7);
   *    math.fix(c);                  // returns Complex 3 - 2i
   *
   *    math.fix([3.2, 3.8, -4.7]);   // returns Array [3, 3, -4]
   *
   * See also:
   *
   *    ceil, floor, round
   *
   * @param {number | BigNumber | Fraction | Complex | Array | Matrix} x Number to be rounded
   * @return {number | BigNumber | Fraction | Complex | Array | Matrix}            Rounded value
   */
  var fix = typed('fix', {
    'number': function (x) {
      return (x > 0) ? Math.floor(x) : Math.ceil(x);
    },

    'Complex': function (x) {
      return new type.Complex(
          (x.re > 0) ? Math.floor(x.re) : Math.ceil(x.re),
          (x.im > 0) ? Math.floor(x.im) : Math.ceil(x.im)
      );
    },

    'BigNumber': function (x) {
      return x.isNegative() ? x.ceil() : x.floor();
    },

    'Fraction': function (x) {
      return x.s < 0 ? x.ceil() : x.floor();
    },

    'Array | Matrix': function (x) {
      // deep map collection, skip zeros since fix(0) = 0
      return deepMap_deepMapjs(x, fix, true);
    }
  });

  fix.toTex = {1: '\\mathrm{${name}}\\left(${args[0]}\\right)'};

  return fix;
}

var name_exportedObj = 'fix';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
