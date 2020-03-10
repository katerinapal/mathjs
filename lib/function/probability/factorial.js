import { deepMap as deepMap_deepMapjs } from "../../utils/collection/deepMap";
import * as gammajs from "./gamma";
import { latex as latexjs } from "../../utils/latex";
'use strict';

var deepMap = deepMap_deepMapjs;

function factory (type, config, load, typed) {
  var gamma = load(gammajs);
  var latex = latexjs;

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
      return deepMap_deepMapjs(n, factorial);
    }
  });

  factorial.toTex = {
    1: '\\left(${args[0]}\\right)' + latexjs.operators['factorial']
  };

  return factorial;
}

var name_exportedObj = 'factorial';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
