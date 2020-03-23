import { deepMapjs as utilscollectiondeepMap_deepMapjsjs } from "../../utils/collection/deepMap";
'use strict';

var number = require('../../utils/number');

function factory (type, config, load, typed) {
  /**
   * Test whether a value is NaN (not a number).
   * The function supports types `number`, `BigNumber`, `Fraction`, `Unit` and `Complex`.
   *
   * The function is evaluated element-wise in case of Array or Matrix input.
   *
   * Syntax:
   *
   *     math.isNaN(x)
   *
   * Examples:
   *
   *    math.isNaN(3);                     // returns false
   *    math.isNaN(NaN);                   // returns true
   *    math.isNaN(0);                     // returns false
   *    math.isNaN(math.bignumber(NaN));   // returns true
   *    math.isNaN(math.bignumber(0));     // returns false
   *    math.isNaN(math.fraction(-2, 5));  // returns false
   *    math.isNaN('-2');                  // returns false
   *    math.isNaN([2, 0, -3, NaN]');      // returns [false, false, false, true]
   *
   * See also:
   *
   *    isNumeric, isNegative, isPositive, isZero, isInteger
   *
   * @param {number | BigNumber | Fraction | Unit | Array | Matrix} x  Value to be tested
   * @return {boolean}  Returns true when `x` is NaN.
   *                    Throws an error in case of an unknown data type.
   */
  var isNaN = typed('isNaN', {
    'number': function (x) {
      return Number.isNaN(x);
    },

    'BigNumber': function (x) {
      return x.isNaN();
    },

    'Fraction': function (x) {
      return false;
    },

    'Complex': function (x) {
      return Number.isNaN(x.re) && Number.isNaN(x.im);
    },

    'Unit': function (x) {
      return Number.isNaN(x.value);
    },

    'Array | Matrix': function (x) {
      return utilscollectiondeepMap_deepMapjsjs(x, Number.isNaN);
    }
  });

  return isNaN;
}

var name_name = 'isNaN';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
