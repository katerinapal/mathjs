"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require("../../utils/collection/deepMap");

var _bitNot = require("../../utils/bignumber/bitNot");

var _number = require("../../utils/number");

var _latex = require("../../utils/latex");

'use strict';

function factory(type, config, load, typed) {
  /**
   * Bitwise NOT value, `~x`.
   * For matrices, the function is evaluated element wise.
   * For units, the function is evaluated on the best prefix base.
   *
   * Syntax:
   *
   *    math.bitNot(x)
   *
   * Examples:
   *
   *    math.bitNot(1);               // returns number -2
   *
   *    math.bitNot([2, -3, 4]);      // returns Array [-3, 2, 5]
   *
   * See also:
   *
   *    bitAnd, bitOr, bitXor, leftShift, rightArithShift, rightLogShift
   *
   * @param  {number | BigNumber | Array | Matrix} x Value to not
   * @return {number | BigNumber | Array | Matrix} NOT of `x`
   */
  var bitNot = typed('bitNot', {
    'number': function number(x) {
      if (!_number.isNumber) {
        throw new Error('Integer expected in function bitNot');
      }

      return ~x;
    },

    'BigNumber': _bitNot.bitNotjs,

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, bitNot);
    }
  });

  bitNot.toTex = {
    1: _latex.operators['bitNot'] + '\\left(${args[0]}\\right)'
  };

  return bitNot;
}

var name_exportedObj = 'bitNot';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
