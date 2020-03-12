'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require('../../utils/collection/deepMap');

'use strict';

var number = require('../../utils/number');

function factory(type, config, load, typed) {
  /**
   * Test whether a value is zero.
   * The function can check for zero for types `number`, `BigNumber`, `Fraction`,
   * `Complex`, and `Unit`.
   *
   * The function is evaluated element-wise in case of Array or Matrix input.
   *
   * Syntax:
   *
   *     math.isZero(x)
   *
   * Examples:
   *
   *    math.isZero(0);                     // returns true
   *    math.isZero(2);                     // returns false
   *    math.isZero(0.5);                   // returns false
   *    math.isZero(math.bignumber(0));     // returns true
   *    math.isZero(math.fraction(0));      // returns true
   *    math.isZero(math.fraction(1,3));    // returns false
   *    math.isZero(math.complex('2 - 4i'); // returns false
   *    math.isZero(math.complex('0i');     // returns true
   *    math.isZero('0');                   // returns true
   *    math.isZero('2');                   // returns false
   *    math.isZero([2, 0, -3]');           // returns [false, true, false]
   *
   * See also:
   *
   *    isNumeric, isPositive, isNegative, isInteger
   *
   * @param {number | BigNumber | Complex | Fraction | Unit | Array | Matrix} x       Value to be tested
   * @return {boolean}  Returns true when `x` is zero.
   *                    Throws an error in case of an unknown data type.
   */
  var isZero = typed('isZero', {
    'number': function number(x) {
      return x === 0;
    },

    'BigNumber': function BigNumber(x) {
      return x.isZero();
    },

    'Complex': function Complex(x) {
      return x.re === 0 && x.im === 0;
    },

    'Fraction': function Fraction(x) {
      return x.d === 1 && x.n === 0;
    },

    'Unit': function Unit(x) {
      return isZero(x.value);
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, isZero);
    }
  });

  return isZero;
}

var name_exportedObj = 'isZero';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
