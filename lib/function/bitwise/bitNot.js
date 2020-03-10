import { deepMap as utilscollectiondeepMap_deepMap } from "../../utils/collection/deepMap";
import { bigBitNot as utilsbignumberbitNot_bigBitNot } from "../../utils/bignumber/bitNot";
import { utilsnumber_obj } from "../../utils/number";
import { utilslatex_obj } from "../../utils/latex";
'use strict';

var deepMap = utilscollectiondeepMap_deepMap;
var bigBitNot = utilsbignumberbitNot_bigBitNot;
var isInteger = utilsnumber_obj.isInteger;

function factory (type, config, load, typed) {
  var latex = utilslatex_obj;

  /**
   * Bitwise NOT value, `~x`.
   * For matrices, the function is evaluated element wise.
   * For units, the function is evaluated on the best prefix base.
   *
   * Syntax:
   *
   *    math.bitNot(x)
   *
   * Examples:
   *
   *    math.bitNot(1);               // returns number -2
   *
   *    math.bitNot([2, -3, 4]);      // returns Array [-3, 2, 5]
   *
   * See also:
   *
   *    bitAnd, bitOr, bitXor, leftShift, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x Value to not
   * @return {number | BigNumber | Array | Matrix} NOT of `x`
   */
  var bitNot = typed('bitNot', {
    'number': function (x) {
      if (!utilsnumber_obj(x)) {
        throw new Error('Integer expected in function bitNot');
      }

      return ~x;
    },

    'BigNumber': utilsbignumberbitNot_bigBitNot,

    'Array | Matrix': function (x) {
      return utilscollectiondeepMap_deepMap(x, bitNot);
    }
  });

  bitNot.toTex = {
    1: utilslatex_obj.operators['bitNot'] + '\\left(${args[0]}\\right)'
  };

  return bitNot;
}

var name_exportedObj = 'bitNot';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
