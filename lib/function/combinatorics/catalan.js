import * as arithmeticadd_obj from "../arithmetic/add";
import * as arithmeticdivide_obj from "../arithmetic/divide";
import * as arithmeticmultiply_obj from "../arithmetic/multiply";
import * as probabilitycombinations_obj from "../probability/combinations";
import * as utilsisNegative_obj from "../utils/isNegative";
import * as utilsisInteger_obj from "../utils/isInteger";
'use strict';

function factory (type, config, load, typed) {
  var add = load(arithmeticadd_obj);
  var divide = load(arithmeticdivide_obj);
  var multiply = load(arithmeticmultiply_obj);
  var combinations = load(probabilitycombinations_obj);
  var isNegative = load(utilsisNegative_obj);
  var isInteger = load(utilsisInteger_obj);


  /**
   * The Catalan Numbers enumerate combinatorial structures of many different types.
   * catalan only takes integer arguments.
   * The following condition must be enforced: n >= 0
   *
   * Syntax:
   *
   *   math.catalan(n)
   *
   * Examples:
   *
   *    math.catalan(3); // returns 5;
   *    math.catalan(8); // returns 1430;
   *
   * See also:
   *
   *    bellNumbers
   *
   * @param {Number | BigNumber} n    nth Catalan number
   * @return {Number | BigNumber}     Cn(n)
   */
  var catalan = typed('catalan', {
    'number | BigNumber': function (n) {

      if (!isInteger(n) || isNegative(n)) {
        throw new TypeError('Non-negative integer value expected in function catalan');
      }
       
      return divide(combinations(multiply(n,2), n), add(n,1));

    }
  });

  catalan.toTex = {1: '\\mathrm{C}_{${args[0]}}'};

  return catalan;
}

var name_name = 'catalan';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
