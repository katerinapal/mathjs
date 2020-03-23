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
   * Unary plus operation.
   * Boolean values and strings will be converted to a number, numeric values will be returned as is.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.unaryPlus(x)
   *
   * Examples:
   *
   *    math.unaryPlus(3.5);      // returns 3.5
   *    math.unaryPlus(1);     // returns 1
   *
   * See also:
   *
   *    unaryMinus, add, subtract
   *
   * @param  {number | BigNumber | Fraction | string | Complex | Unit | Array | Matrix} x
   *            Input value
   * @return {number | BigNumber | Fraction | Complex | Unit | Array | Matrix}
   *            Returns the input value when numeric, converts to a number when input is non-numeric.
   */
  var unaryPlus = typed('unaryPlus', {
    'number': function number(x) {
      return x;
    },

    'Complex': function Complex(x) {
      return x; // complex numbers are immutable
    },

    'BigNumber': function BigNumber(x) {
      return x; // bignumbers are immutable
    },

    'Fraction': function Fraction(x) {
      return x; // fractions are immutable
    },

    'Unit': function Unit(x) {
      return x.clone();
    },

    'Array | Matrix': function ArrayMatrix(x) {
      // deep map collection, skip zeros since unaryPlus(0) = 0
      return (0, _deepMap.deepMapjs)(x, unaryPlus, true);
    },

    'boolean | string | null': function booleanStringNull(x) {
      // convert to a number or bignumber
      return config.number == 'BigNumber' ? new type.BigNumber(+x) : +x;
    }
  });

  unaryPlus.toTex = {
    1: _latex.operators['unaryPlus'] + '\\left(${args[0]}\\right)'
  };

  return unaryPlus;
}

var name_name = 'unaryPlus';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
