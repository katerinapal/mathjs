import { deepMapjs as utilscollectiondeepMap_deepMapjsjs } from "../../utils/collection/deepMap";
import { bitNotjs as utilsbignumberbitNot_bitNotjsjs } from "../../utils/bignumber/bitNot";
import { operators as utilslatex_operatorsjs } from "../../utils/latex";
'use strict';

var isInteger = null;

function factory (type, config, load, typed) {
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
      if (!isInteger(x)) {
        throw new Error('Integer expected in function bitNot');
      }

      return ~x;
    },

    'BigNumber': utilsbignumberbitNot_bitNotjsjs,

    'Array | Matrix': function (x) {
      return utilscollectiondeepMap_deepMapjsjs(x, bitNot);
    }
  });

  bitNot.toTex = {
    1: utilslatex_operatorsjs['bitNot'] + '\\left(${args[0]}\\right)'
  };

  return bitNot;
}

var name_name = 'bitNot';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
