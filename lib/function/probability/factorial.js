import { deepMapjs as utilscollectiondeepMap_deepMapjsjs } from "../../utils/collection/deepMap";
import * as gamma_obj from "./gamma";
import { operators as utilslatex_operatorsjs } from "../../utils/latex";
'use strict';

function factory (type, config, load, typed) {
  var gamma = load(gamma_obj);

  /**
   * Compute the factorial of a value
   *
   * Factorial only supports an integer value as argument.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.factorial(n)
   *
   * Examples:
   *
   *    math.factorial(5);    // returns 120
   *    math.factorial(3);    // returns 6
   *
   * See also:
   *
   *    combinations, gamma, permutations
   *
   * @param {number | BigNumber | Array | Matrix} n   An integer number
   * @return {number | BigNumber | Array | Matrix}    The factorial of `n`
   */
  var factorial = typed('factorial', {
    'number': function (n) {
      if (n < 0) {
        throw new Error('Value must be non-negative');
      }

      return gamma(n + 1);
    },

    'BigNumber': function (n) {
      if (n.isNegative()) {
        throw new Error('Value must be non-negative');
      }

      return gamma(n.plus(1));
    },

    'Array | Matrix': function (n) {
      return utilscollectiondeepMap_deepMapjsjs(n, factorial);
    }
  });

  factorial.toTex = {
    1: '\\left(${args[0]}\\right)' + utilslatex_operatorsjs['factorial']
  };

  return factorial;
}

var name_name = 'factorial';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
