'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepForEach = require('../../utils/collection/deepForEach');

'use strict';

function factory(type, config, load, typed) {
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
    'Array | Matrix': function ArrayMatrix(a) {
      var sum = 0;
      var denom = 1;

      (0, _deepForEach.deepForEachjs)(a, function (ai) {
        if (!isInteger(ai) || !isPositive(ai)) {
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
exports.name = name_name;
exports.factory = factory_factory;
