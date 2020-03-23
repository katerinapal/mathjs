import { deepMapjs as utilscollectiondeepMap_deepMapjsjs } from "../../utils/collection/deepMap";
import { operators as utilslatex_operatorsjs } from "../../utils/latex";
'use strict';

function factory (type, config, load, typed) {
  /**
   * Inverse the sign of a value, apply a unary minus operation.
   *
   * For matrices, the function is evaluated element wise. Boolean values and
   * strings will be converted to a number. For complex numbers, both real and
   * complex value are inverted.
   *
   * Syntax:
   *
   *    math.unaryMinus(x)
   *
   * Examples:
   *
   *    math.unaryMinus(3.5);      // returns -3.5
   *    math.unaryMinus(-4.2);     // returns 4.2
   *
   * See also:
   *
   *    add, subtract, unaryPlus
   *
   * @param  {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} x Number to be inverted.
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix} Returns the value with inverted sign.
   */
  var unaryMinus = typed('unaryMinus', {
    'number': function (x) {
      return -x;
    },

    'Complex': function (x) {
      return x.neg();
    },

    'BigNumber': function (x) {
      return x.neg();
    },

    'Fraction': function (x) {
      return x.neg();
    },

    'Unit': function (x) {
      var res = x.clone();
      res.value = unaryMinus(x.value);
      return res;
    },

    'Array | Matrix': function (x) {
      // deep map collection, skip zeros since unaryMinus(0) = 0
      return utilscollectiondeepMap_deepMapjsjs(x, unaryMinus, true);
    }

    // TODO: add support for string
  });

  unaryMinus.toTex = {
    1: utilslatex_operatorsjs['unaryMinus'] + '\\left(${args[0]}\\right)'
  };

  return unaryMinus;
}

var name_name = 'unaryMinus';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
