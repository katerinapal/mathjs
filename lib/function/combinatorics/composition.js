'use strict';

function factory (type, config, load, typed) {
  var combinations = load(probabilitycombinations_obj);
  var add = load(arithmeticaddScalar_obj);
  var isPositive = load(utilsisPositive_obj);
  var isInteger = load(utilsisInteger_obj);
  var larger = load(relationallarger_obj);

  /**
   * The composition counts of n into k parts.
   *
   * composition only takes integer arguments.
   * The following condition must be enforced: k <= n.
   *
   * Syntax:
   *
   *   math.composition(n, k)
   *
   * Examples:
   *
   *    math.composition(5, 3); // returns 6
   *
   * See also:
   *
   *    combinations
   *
   * @param {Number | BigNumber} n    Total number of objects in the set
   * @param {Number | BigNumber} k    Number of objects in the subset
   * @return {Number | BigNumber}     Returns the composition counts of n into k parts.
   */
  var composition =  typed('composition', {
    'number | BigNumber, number | BigNumber': function (n, k) {
      if (!isInteger(n) || !isPositive(n) || !isInteger(k) || !isPositive(k)) {
        throw new TypeError('Positive integer value expected in function composition');
      }
      else if (larger(k, n)) {
        throw new TypeError('k must be less than or equal to n in function composition');
      }

      return combinations(add(n, -1), add(k, -1));
    }
  });

  composition.toTex = undefined; // use default template

  return composition;
}

var name_name = 'composition';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
