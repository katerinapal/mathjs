import { utilsnumber } from "../../utils/number";
import { bigNearlyEqual as utilsbignumbernearlyEqual_bigNearlyEqual } from "../../utils/bignumber/nearlyEqual";
'use strict';

var nearlyEqual = utilsnumber.nearlyEqual;
var bigNearlyEqual = utilsbignumbernearlyEqual_bigNearlyEqual;

function factory (type, config, load, typed) {
  
  /**
   * Test whether two values are equal.
   *
   * @param  {number | BigNumber | Fraction | boolean | Complex | Unit} x   First value to compare
   * @param  {number | BigNumber | Fraction | boolean | Complex} y          Second value to compare
   * @return {boolean}                                                  Returns true when the compared values are equal, else returns false
   * @private
   */
  var equalScalar = typed('equalScalar', {

    'boolean, boolean': function (x, y) {
      return x === y;
    },

    'number, number': function (x, y) {
      return x === y || utilsnumber(x, y, config.epsilon);
    },

    'BigNumber, BigNumber': function (x, y) {
      return x.eq(y) || utilsbignumbernearlyEqual_bigNearlyEqual(x, y, config.epsilon);
    },

    'Fraction, Fraction': function (x, y) {
      return x.equals(y);
    },

    'Complex, Complex': function (x, y) {
      return x.equals(y);
    },

    'Unit, Unit': function (x, y) {
      if (!x.equalBase(y)) {
        throw new Error('Cannot compare units with different base');
      }
      return equalScalar(x.value, y.value);
    },

    'string, string': function (x, y) {
      return x === y;
    }
  });
  
  return equalScalar;
}

var factory_exportedObj = factory;
export { factory_exportedObj as factory };
