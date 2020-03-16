import { deepForEachjs as utilscollectiondeepForEach_deepForEachjsjs } from "../../utils/collection/deepForEach";
import * as arithmeticadd_obj from "../arithmetic/add";
import * as arithmeticmultiply_obj from "../arithmetic/multiply";
import * as arithmeticdivide_obj from "../arithmetic/divide";
import * as probabilityfactorial_obj from "../probability/factorial";
import * as utilsisInteger_obj from "../utils/isInteger";
import * as utilsisPositive_obj from "../utils/isPositive";
'use strict';

function factory (type, config, load, typed) {
  var add = load(arithmeticadd_obj);
  var multiply = load(arithmeticmultiply_obj);
  var divide = load(arithmeticdivide_obj);
  var factorial = load(probabilityfactorial_obj);
  var isInteger = load(utilsisInteger_obj);
  var isPositive = load(utilsisPositive_obj);

  /**
   * Multinomial Coefficients compute the number of ways of picking a1, a2, ..., ai unordered outcomes from `n` possibilities.
   *
   * multinomial takes one array of integers as an argument.
   * The following condition must be enforced: every ai <= 0
   *
   * Syntax:
   *
   *     math.multinomial(a) // a is an array type
   *
   * Examples:
   *
   *    math.multinomial([1,2,1]); // returns 12
   *
   * See also:
   *
   *    combinations, factorial
   *
   * @param {number[] | BigNumber[]} a    Integer numbers of objects in the subset
   * @return {Number | BigNumber}         Multinomial coefficient.
   */
  return typed('multinomial', {
    'Array | Matrix': function (a) {
      var sum = 0;
      var denom = 1;

      deepForEach(a, function(ai) {
        if(!isInteger(ai) || !isPositive(ai)) {
          throw new TypeError('Positive integer value expected in function multinomial');
        }
        sum = add(sum, ai);
        denom = multiply(denom, factorial(ai));
      });

      return divide(factorial(sum), denom);
    }
  });
}

var name_name = 'multinomial';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
