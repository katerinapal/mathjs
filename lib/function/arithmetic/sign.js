"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _number = require("../../utils/number");

var _deepMap = require("../../utils/collection/deepMap");

'use strict';

function factory(type, config, load, typed) {
  /**
   * Compute the sign of a value. The sign of a value x is:
   *
   * -  1 when x > 1
   * - -1 when x < 0
   * -  0 when x == 0
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.sign(x)
   *
   * Examples:
   *
   *    math.sign(3.5);               // returns 1
   *    math.sign(-4.2);              // returns -1
   *    math.sign(0);                 // returns 0
   *
   *    math.sign([3, 5, -2, 0, 2]);  // returns [1, 1, -1, 0, 1]
   *
   * See also:
   *
   *    abs
   *
   * @param  {number | BigNumber | Fraction | Complex | Array | Matrix | Unit} x
   *            The number for which to determine the sign
   * @return {number | BigNumber | Fraction | Complex | Array | Matrix | Unit}e
   *            The sign of `x`
   */
  var sign = typed('sign', {
    'number': number.sign,

    'Complex': function Complex(x) {
      return x.sign();
    },

    'BigNumber': function BigNumber(x) {
      return new type.BigNumber(x.cmp(0));
    },

    'Fraction': function Fraction(x) {
      return new type.Fraction(x.s, 1);
    },

    'Array | Matrix': function ArrayMatrix(x) {
      // deep map collection, skip zeros since sign(0) = 0
      return deepMap(x, sign, true);
    },

    'Unit': function Unit(x) {
      return sign(x.value);
    }
  });

  sign.toTex = { 1: '\\mathrm{${name}}\\left(${args[0]}\\right)' };

  return sign;
}

var name_name = 'sign';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
