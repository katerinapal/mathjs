"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require("../../utils/collection/deepMap");

var _gamma = require("./gamma");

var gamma_obj = _interopRequireWildcard(_gamma);

var _latex = require("../../utils/latex");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var gamma = load(gamma_obj);

  /**
   * Compute the factorial of a value
   *
   * Factorial only supports an integer value as argument.
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.factorial(n)
   *
   * Examples:
   *
   *    math.factorial(5);    // returns 120
   *    math.factorial(3);    // returns 6
   *
   * See also:
   *
   *    combinations, gamma, permutations
   *
   * @param {number | BigNumber | Array | Matrix} n   An integer number
   * @return {number | BigNumber | Array | Matrix}    The factorial of `n`
   */
  var factorial = typed('factorial', {
    'number': function number(n) {
      if (n < 0) {
        throw new Error('Value must be non-negative');
      }

      return gamma(n + 1);
    },

    'BigNumber': function BigNumber(n) {
      if (n.isNegative()) {
        throw new Error('Value must be non-negative');
      }

      return gamma(n.plus(1));
    },

    'Array | Matrix': function ArrayMatrix(n) {
      return (0, _deepMap.deepMapjs)(n, factorial);
    }
  });

  factorial.toTex = {
    1: '\\left(${args[0]}\\right)' + _latex.operators['factorial']
  };

  return factorial;
}

var name_exportedObj = 'factorial';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
