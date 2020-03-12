'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {
  /**
   * Calculate the cotangent of a value. Defined as `cot(x) = 1 / tan(x)`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.cot(x)
   *
   * Examples:
   *
   *    math.cot(2);      // returns number -0.45765755436028577
   *    1 / math.tan(2);  // returns number -0.45765755436028577
   *
   * See also:
   *
   *    tan, sec, csc
   *
   * @param {number | Complex | Unit | Array | Matrix} x  Function input
   * @return {number | Complex | Array | Matrix} Cotangent of x
   */
  var cot = typed('cot', {
    'number': function number(x) {
      return 1 / Math.tan(x);
    },

    'Complex': function Complex(x) {
      return x.cot();
    },

    'BigNumber': function BigNumber(x) {
      return new type.BigNumber(1).div(x.tan());
    },

    'Unit': function Unit(x) {
      if (!x.hasBase(type.Unit.BASE_UNITS.ANGLE)) {
        throw new TypeError('Unit in function cot is no angle');
      }
      return cot(x.value);
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, cot);
    }
  });

  cot.toTex = { 1: '\\cot\\left(${args[0]}\\right)' };

  return cot;
}

var name_exportedObj = 'cot';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
