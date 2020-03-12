'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {
  /**
   * Get the real part of a complex number.
   * For a complex number `a + bi`, the function returns `a`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.re(x)
   *
   * Examples:
   *
   *    var a = math.complex(2, 3);
   *    math.re(a);                     // returns number 2
   *    math.im(a);                     // returns number 3
   *
   *    math.re(math.complex('-5.2i')); // returns number 0
   *    math.re(math.complex(2.4));     // returns number 2.4
   *
   * See also:
   *
   *    im, conj, abs, arg
   *
   * @param {number | BigNumber | Complex | Array | Matrix} x
   *            A complex number or array with complex numbers
   * @return {number | BigNumber | Array | Matrix} The real part of x
   */
  var re = typed('re', {
    'number': function number(x) {
      return x;
    },

    'BigNumber': function BigNumber(x) {
      return x;
    },

    'Complex': function Complex(x) {
      return x.re;
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, re);
    }
  });

  re.toTex = { 1: '\\Re\\left\\lbrace${args[0]}\\right\\rbrace' };

  return re;
}

var name_exportedObj = 're';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
