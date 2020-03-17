import { flatten as utilsarray_flattenjs } from "../../utils/array";
import * as abs_obj from "./abs";
import { factory as addScalar_obj } from "./addScalar";
import { factory as divideScalar_obj } from "./divideScalar";
import { factory as multiplyScalar_obj } from "./multiplyScalar";
import * as sqrt_obj from "./sqrt";
import * as relationalsmaller_obj from "../relational/smaller";
import * as utilsisPositive_obj from "../utils/isPositive";
'use strict';

function factory (type, config, load, typed) {
  var abs = load(abs_obj);
  var add = load(addScalar_obj);
  var divide = load(divideScalar_obj);
  var multiply = load(multiplyScalar_obj);
  var sqrt = load(sqrt_obj);
  var smaller = load(relationalsmaller_obj);
  var isPositive = load(utilsisPositive_obj);

  /**
   * Calculate the hypotenusa of a list with values. The hypotenusa is defined as:
   *
   *     hypot(a, b, c, ...) = sqrt(a^2 + b^2 + c^2 + ...)
   *
   * For matrix input, the hypotenusa is calculated for all values in the matrix.
   *
   * Syntax:
   *
   *     math.hypot(a, b, ...)
   *     math.hypot([a, b, c, ...])
   *
   * Examples:
   *
   *     math.hypot(3, 4);      // 5
   *     math.hypot(3, 4, 5);   // 7.0710678118654755
   *     math.hypot([3, 4, 5]); // 7.0710678118654755
   *     math.hypot(-2);        // 2
   *
   * See also:
   *
   *     abs, norm
   *
   * @param {... number | BigNumber} args
   * @return {number | BigNumber} Returns the hypothenusa of the input values.
   */
  var hypot = typed('hypot', {
    '... number | BigNumber': _hypot,

    'Array': function (x) {
      return hypot.apply(hypot, utilsarray_flattenjs);
    },

    'Matrix': function (x) {
      return hypot.apply(hypot, utilsarray_flattenjs);
    }
  });

  /**
   * Calculate the hypotenusa for an Array with values
   * @param {Array.<number | BigNumber>} args
   * @return {number | BigNumber} Returns the result
   * @private
   */
  function _hypot (args) {
    // code based on `hypot` from es6-shim:
    // https://github.com/paulmillr/es6-shim/blob/master/es6-shim.js#L1619-L1633
    var result = 0;
    var largest = 0;

    for (var i = 0; i < args.length; i++) {
      var value = abs(args[i]);
      if (smaller(largest, value)) {
        result = multiply(result, multiply(divide(largest, value), divide(largest, value)));
        result = add(result, 1);
        largest = value;
      } else {
        result = add(result, isPositive(value) ? multiply(divide(value, largest), divide(value, largest)) : value);
      }
    }

    return multiply(largest, sqrt(result));
  }

  hypot.toTex = '\\hypot\\left(${args}\\right)';

  return hypot;
}

var name_name = 'hypot';
var factory_factory = factory;
export { name_name as name };
export { factory_factory as factory };
