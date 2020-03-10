import { deepMap as utilscollectiondeepMap_deepMap } from "../../utils/collection/deepMap";
'use strict';

var deepMap = utilscollectiondeepMap_deepMap;

function factory (type, config, load, typed) {
  /**
   * Calculate the cosecant of a value, defined as `csc(x) = 1/sin(x)`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.csc(x)
   *
   * Examples:
   *
   *    math.csc(2);      // returns number 1.099750170294617
   *    1 / math.sin(2);  // returns number 1.099750170294617
   *
   * See also:
   *
   *    sin, sec, cot
   *
   * @param {number | Complex | Unit | Array | Matrix} x  Function input
   * @return {number | Complex | Array | Matrix} Cosecant of x
   */
  var csc = typed('csc', {
    'number': function (x) {
      return 1 / Math.sin(x);
    },

    'Complex': function (x) {
      return x.csc();
    },

    'BigNumber': function (x) {
      return new type.BigNumber(1).div(x.sin());
    },

    'Unit': function (x) {
      if (!x.hasBase(type.Unit.BASE_UNITS.ANGLE)) {
        throw new TypeError ('Unit in function csc is no angle');
      }
      return csc(x.value);
    },

    'Array | Matrix': function (x) {
      return utilscollectiondeepMap_deepMap(x, csc);
    }
  });

  csc.toTex = {1: '\\csc\\left(${args[0]}\\right)'};

  return csc;
}

var name_exportedObj = 'csc';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
