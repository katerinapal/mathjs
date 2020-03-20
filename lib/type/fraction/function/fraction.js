'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {
  /**
   * Create a fraction convert a value to a fraction.
   *
   * Syntax:
   *     math.fraction(numerator, denominator)
   *     math.fraction({n: numerator, d: denominator})
   *     math.fraction(matrix: Array | Matrix)         Turn all matrix entries
   *                                                   into fractions
   *
   * Examples:
   *
   *     math.fraction(1, 3);
   *     math.fraction('2/3');
   *     math.fraction({n: 2, d: 3});
   *     math.fraction([0.2, 0.25, 1.25]);
   *
   * See also:
   *
   *    bignumber, number, string, unit
   *
   * @param {number | string | Fraction | BigNumber | Array | Matrix} [args]
   *            Arguments specifying the numerator and denominator of
   *            the fraction
   * @return {Fraction | Array | Matrix} Returns a fraction
   */
  var fraction = typed('fraction', {
    'number': function number(x) {
      if (!isFinite(x) || isNaN(x)) {
        throw new Error(x + ' cannot be represented as a fraction');
      }

      return new type.Fraction(x);
    },

    'string': function string(x) {
      return new type.Fraction(x);
    },

    'number, number': function numberNumber(numerator, denominator) {
      return new type.Fraction(numerator, denominator);
    },

    'BigNumber': function BigNumber(x) {
      return new type.Fraction(x.toString());
    },

    'Fraction': function Fraction(x) {
      return x; // fractions are immutable
    },

    'Object': function Object(x) {
      return new type.Fraction(x);
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, fraction);
    }
  });

  return fraction;
}

var name_name = 'fraction';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
