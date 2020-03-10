import { deepMap as utilscollectiondeepMap_deepMap } from "../../utils/collection/deepMap";
import { utilslatex_obj } from "../../utils/latex";
'use strict';

var deepMap = utilscollectiondeepMap_deepMap;

function factory (type, config, load, typed) {
  var latex = utilslatex_obj;

  /**
   * Logical `not`. Flips boolean value of a given parameter.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.not(x)
   *
   * Examples:
   *
   *    math.not(2);      // returns false
   *    math.not(0);      // returns true
   *    math.not(true);   // returns false
   *
   *    a = [2, -7, 0];
   *    math.not(a);      // returns [false, false, true]
   *
   * See also:
   *
   *    and, or, xor
   *
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} x First value to check
   * @return {boolean | Array | Matrix}
   *            Returns true when input is a zero or empty value.
   */
  var not = typed('not', {
    'number': function (x) {
      return !x;
    },

    'Complex': function (x) {
      return x.re === 0 && x.im === 0;
    },

    'BigNumber': function (x) {
      return x.isZero() || x.isNaN();
    },

    'Unit': function (x) {
      return not(x.value);
    },

    'Array | Matrix': function (x) {
      return utilscollectiondeepMap_deepMap(x, not);
    }
  });

  not.toTex = {
    1: utilslatex_obj.operators['not'] + '\\left(${args[0]}\\right)'
  };

  return not;
}

var name_exportedObj = 'not';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
