'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

function factory(type, config, load, typed) {
  var gamma = load(gamma_obj);
  var latex = require('../../utils/latex');

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
    1: '\\left(${args[0]}\\right)' + latex.operators['factorial']
  };

  return factorial;
}

var name_name = 'factorial';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
