import { deepForEach as utilscollectiondeepForEach_deepForEach } from "../../utils/collection/deepForEach";
import * as arithmeticadd from "../arithmetic/add";
import * as arithmeticmultiply from "../arithmetic/multiply";
import * as arithmeticdivide from "../arithmetic/divide";
import * as probabilityfactorial from "../probability/factorial";
import * as utilsisInteger from "../utils/isInteger";
import * as utilsisPositive from "../utils/isPositive";
'use strict';

var deepForEach = utilscollectiondeepForEach_deepForEach;

function factory (type, config, load, typed) {
  var add = load(arithmeticadd);
  var multiply = load(arithmeticmultiply);
  var divide = load(arithmeticdivide);
  var factorial = load(probabilityfactorial);
  var isInteger = load(utilsisInteger);
  var isPositive = load(utilsisPositive);

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

      utilscollectiondeepForEach_deepForEach(a, function(ai) {
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

var name_exportedObj = 'multinomial';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
