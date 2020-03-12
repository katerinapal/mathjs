'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {

  /**
   * Calculate the hyperbolic arccotangent of a value,
   * defined as `acoth(x) = atanh(1/x) = (ln((x+1)/x) + ln(x/(x-1))) / 2`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.acoth(x)
   *
   * Examples:
   *
   *    math.acoth(0.5);       // returns 0.8047189562170503
   *
   * See also:
   *
   *    acsch, asech
   *
   * @param {number | Complex | Array | Matrix} x  Function input
   * @return {number | Complex | Array | Matrix} Hyperbolic arccotangent of x
   */
  var acoth = typed('acoth', {
    'number': function number(x) {
      if (x >= 1 || x <= -1 || config.predictable) {
        return isFinite(x) ? (Math.log((x + 1) / x) + Math.log(x / (x - 1))) / 2 : 0;
      }
      return new type.Complex(x, 0).acoth();
    },

    'Complex': function Complex(x) {
      return x.acoth();
    },

    'BigNumber': function BigNumber(x) {
      return new type.BigNumber(1).div(x).atanh();
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, acoth);
    }
  });

  acoth.toTex = { 1: '\\coth^{-1}\\left(${args[0]}\\right)' };

  return acoth;
}

var name_exportedObj = 'acoth';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
