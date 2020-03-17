'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory(type, config, load, typed) {
  var add = load(arithmeticadd_obj);
  var subtract = load(arithmeticsubtract_obj);
  var multiply = load(arithmeticmultiply_obj);
  var divide = load(arithmeticdivide_obj);
  var pow = load(arithmeticpow_obj);
  var factorial = load(probabilityfactorial_obj);
  var combinations = load(probabilitycombinations_obj);
  var isNegative = load(utilsisNegative_obj);
  var isInteger = load(utilsisInteger_obj);
  var larger = load(relationallarger_obj);

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
    'number | BigNumber, number | BigNumber': function numberBigNumberNumberBigNumber(n, k) {
      if (!isInteger(n) || isNegative(n) || !isInteger(k) || isNegative(k)) {
        throw new TypeError('Non-negative integer value expected in function stirlingS2');
      } else if (larger(k, n)) {
        throw new TypeError('k must be less than or equal to n in function stirlingS2');
      }

      // 1/k! Sum(i=0 -> k) [(-1)^(k-i)*C(k,j)* i^n]
      var kFactorial = factorial(k);
      var result = 0;
      for (var i = 0; i <= k; i++) {
        var negativeOne = pow(-1, subtract(k, i));
        var kChooseI = combinations(k, i);
        var iPower = pow(i, n);

        result = add(result, multiply(multiply(kChooseI, iPower), negativeOne));
      }

      return divide(result, kFactorial);
    }
  });

  stirlingS2.toTex = { 2: '\\mathrm{S}\\left(${args}\\right)' };

  return stirlingS2;
}

var name_name = 'stirlingS2';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
