import { deepForEach as deepForEach_deepForEachjs } from "../../utils/collection/deepForEach";
import * as addjs from "../arithmetic/add";
import * as multiplyjs from "../arithmetic/multiply";
import * as dividejs from "../arithmetic/divide";
import * as factorialjs from "../probability/factorial";
import * as isIntegerjs from "../utils/isInteger";
import * as isPositivejs from "../utils/isPositive";
'use strict';

var deepForEach = deepForEach_deepForEachjs;

function factory (type, config, load, typed) {
  var add = load(addjs);
  var multiply = load(multiplyjs);
  var divide = load(dividejs);
  var factorial = load(factorialjs);
  var isInteger = load(isIntegerjs);
  var isPositive = load(isPositivejs);

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

      deepForEach_deepForEachjs(a, function(ai) {
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
