'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory(type, config, load, typed) {
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
    'number | BigNumber': function numberBigNumber(n) {

      if (!isInteger(n) || isNegative(n)) {
        throw new TypeError('Non-negative integer value expected in function catalan');
      }

      return divide(combinations(multiply(n, 2), n), add(n, 1));
    }
  });

  catalan.toTex = { 1: '\\mathrm{C}_{${args[0]}}' };

  return catalan;
}

var name_name = 'catalan';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
