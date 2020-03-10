import * as addjs from "../arithmetic/add";
import * as subtractjs from "../arithmetic/subtract";
import * as multiplyjs from "../arithmetic/multiply";
import * as dividejs from "../arithmetic/divide";
import * as powjs from "../arithmetic/pow";
import * as factorialjs from "../probability/factorial";
import * as combinationsjs from "../probability/combinations";
import * as isNegativejs from "../utils/isNegative";
import * as isIntegerjs from "../utils/isInteger";
import * as largerjs from "../relational/larger";
'use strict';

function factory (type, config, load, typed) {
  var add = load(addjs);
  var subtract = load(subtractjs);
  var multiply = load(multiplyjs);
  var divide = load(dividejs);
  var pow = load(powjs);
  var factorial = load(factorialjs);
  var combinations = load(combinationsjs);
  var isNegative = load(isNegativejs);
  var isInteger = load(isIntegerjs);
  var larger = load(largerjs);

  /**
   * The Stirling numbers of the second kind, counts the number of ways to partition
   * a set of n labelled objects into k nonempty unlabelled subsets.
   * stirlingS2 only takes integer arguments.
   * The following condition must be enforced: k <= n.
   *
   *  If n = k or k = 1, then s(n,k) = 1
   *
   * Syntax:
   *
   *   math.stirlingS2(n, k)
   *
   * Examples:
   *
   *    math.stirlingS2(5, 3); //returns 25
   *
   * See also:
   *
   *    Bell numbers
   *
   * @param {Number | BigNumber} n    Total number of objects in the set
   * @param {Number | BigNumber} k    Number of objects in the subset
   * @return {Number | BigNumber}     S(n,k)
   */
  var stirlingS2 = typed('stirlingS2', {
    'number | BigNumber, number | BigNumber': function (n, k) {
      if (!isInteger(n) || isNegative(n) || !isInteger(k) || isNegative(k)) {
        throw new TypeError('Non-negative integer value expected in function stirlingS2');
      }
      else if (larger(k, n)) {
        throw new TypeError('k must be less than or equal to n in function stirlingS2');
      }

      // 1/k! Sum(i=0 -> k) [(-1)^(k-i)*C(k,j)* i^n]
      var kFactorial = factorial(k);
      var result = 0;
      for(var i = 0; i <= k; i++) {
        var negativeOne = pow(-1, subtract(k,i));
        var kChooseI = combinations(k,i);
        var iPower = pow(i,n);

        result = add(result, multiply(multiply(kChooseI, iPower), negativeOne));
      }

      return divide(result, kFactorial);
    }
  });

  stirlingS2.toTex = {2: '\\mathrm{S}\\left(${args}\\right)'};

  return stirlingS2;
}

var name_exportedObj = 'stirlingS2';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
