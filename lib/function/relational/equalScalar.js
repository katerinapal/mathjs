"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = undefined;

var _number = require("../../utils/number");

var _nearlyEqual = require("../../utils/bignumber/nearlyEqual");

'use strict';

function factory(type, config, load, typed) {

  /**
   * Test whether two values are equal.
   *
   * @param  {number | BigNumber | Fraction | boolean | Complex | Unit} x   First value to compare
   * @param  {number | BigNumber | Fraction | boolean | Complex} y          Second value to compare
   * @return {boolean}                                                  Returns true when the compared values are equal, else returns false
   * @private
   */
  var equalScalar = typed('equalScalar', {

    'boolean, boolean': function booleanBoolean(x, y) {
      return x === y;
    },

    'number, number': function numberNumber(x, y) {
      return x === y || _number.nearlyEqual;
    },

    'BigNumber, BigNumber': function BigNumberBigNumber(x, y) {
      return x.eq(y) || (0, _nearlyEqual.nearlyEqualjs)(x, y, config.epsilon);
    },

    'Fraction, Fraction': function FractionFraction(x, y) {
      return x.equals(y);
    },

    'Complex, Complex': function ComplexComplex(x, y) {
      return x.equals(y);
    },

    'Unit, Unit': function UnitUnit(x, y) {
      if (!x.equalBase(y)) {
        throw new Error('Cannot compare units with different base');
      }
      return equalScalar(x.value, y.value);
    },

    'string, string': function stringString(x, y) {
      return x === y;
    }
  });

  return equalScalar;
}

var factory_factory = factory;
exports.factory = factory_factory;
