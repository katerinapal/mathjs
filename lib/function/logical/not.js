"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require("../../utils/collection/deepMap");

var _latex = require("../../utils/latex");

'use strict';

function factory(type, config, load, typed) {
  /**
   * Logical `not`. Flips boolean value of a given parameter.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.not(x)
   *
   * Examples:
   *
   *    math.not(2);      // returns false
   *    math.not(0);      // returns true
   *    math.not(true);   // returns false
   *
   *    a = [2, -7, 0];
   *    math.not(a);      // returns [false, false, true]
   *
   * See also:
   *
   *    and, or, xor
   *
   * @param  {number | BigNumber | Complex | Unit | Array | Matrix} x First value to check
   * @return {boolean | Array | Matrix}
   *            Returns true when input is a zero or empty value.
   */
  var not = typed('not', {
    'number': function number(x) {
      return !x;
    },

    'Complex': function Complex(x) {
      return x.re === 0 && x.im === 0;
    },

    'BigNumber': function BigNumber(x) {
      return x.isZero() || x.isNaN();
    },

    'Unit': function Unit(x) {
      return not(x.value);
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, not);
    }
  });

  not.toTex = {
    1: _latex.operators['not'] + '\\left(${args[0]}\\right)'
  };

  return not;
}

var name_exportedObj = 'not';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
