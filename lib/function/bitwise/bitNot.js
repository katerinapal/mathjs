import { deepMap as deepMap_deepMapjs } from "../../utils/collection/deepMap";
import { bigBitNot as bitNot_bigBitNotjs } from "../../utils/bignumber/bitNot";
import { isInteger as numberjs } from "../../utils/number";
import { latex as latexjs } from "../../utils/latex";
'use strict';

var deepMap = deepMap_deepMapjs;
var bigBitNot = bitNot_bigBitNotjs;
var isInteger = numberjs.isInteger;

function factory (type, config, load, typed) {
  var latex = latexjs;

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
      if (!numberjs(x)) {
        throw new Error('Integer expected in function bitNot');
      }

      return ~x;
    },

    'BigNumber': bitNot_bigBitNotjs,

    'Array | Matrix': function (x) {
      return deepMap_deepMapjs(x, bitNot);
    }
  });

  bitNot.toTex = {
    1: latexjs.operators['bitNot'] + '\\left(${args[0]}\\right)'
  };

  return bitNot;
}

var name_exportedObj = 'bitNot';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
