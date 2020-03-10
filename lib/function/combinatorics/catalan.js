import * as arithmeticadd from "../arithmetic/add";
import * as arithmeticdivide from "../arithmetic/divide";
import * as arithmeticmultiply from "../arithmetic/multiply";
import * as probabilitycombinations from "../probability/combinations";
import * as utilsisNegative from "../utils/isNegative";
import * as utilsisInteger from "../utils/isInteger";
'use strict';

function factory (type, config, load, typed) {
  var add = load(arithmeticadd);
  var divide = load(arithmeticdivide);
  var multiply = load(arithmeticmultiply);
  var combinations = load(probabilitycombinations);
  var isNegative = load(utilsisNegative);
  var isInteger = load(utilsisInteger);


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

var name_exportedObj = 'catalan';
var factory_exportedObj = factory;
export { name_exportedObj as name };
export { factory_exportedObj as factory };
