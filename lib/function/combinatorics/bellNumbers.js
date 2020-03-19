"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _add = require("../arithmetic/add");

var arithmeticadd_obj = _interopRequireWildcard(_add);

var _stirlingS = require("./stirlingS2");

var stirlingS2_obj = _interopRequireWildcard(_stirlingS);

var _isNegative = require("../utils/isNegative");

var utilsisNegative_obj = _interopRequireWildcard(_isNegative);

var _isInteger = require("../utils/isInteger");

var utilsisInteger_obj = _interopRequireWildcard(_isInteger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var add = load(arithmeticadd_obj);
  var stirlingS2 = load(stirlingS2_obj);
  var isNegative = load(utilsisNegative_obj);
  var isInteger = load(utilsisInteger_obj);

  /**
   * The Bell Numbers count the number of partitions of a set. A partition is a pairwise disjoint subset of S whose union is S.
   * bellNumbers only takes integer arguments.
   * The following condition must be enforced: n >= 0
   *
   * Syntax:
   *
   *   math.bellNumbers(n)
   *
   * Examples:
   *
   *    math.bellNumbers(3); // returns 5;
   *    math.bellNumbers(8); // returns 4140;
   *
   * See also:
   *
   *    stirlingS2
   *
   * @param {Number | BigNumber} n    Total number of objects in the set
   * @return {Number | BigNumber}     B(n)
   */
  var bellNumbers = typed('bellNumbers', {
    'number | BigNumber': function numberBigNumber(n) {

      if (!isInteger(n) || isNegative(n)) {
        throw new TypeError('Non-negative integer value expected in function bellNumbers');
      }

      // Sum (k=0, n) S(n,k).
      var result = 0;
      for (var i = 0; i <= n; i++) {
        result = add(result, stirlingS2(n, i));
      }

      return result;
    }
  });

  bellNumbers.toTex = { 1: '\\mathrm{B}_{${args[0]}}' };

  return bellNumbers;
}

var name_name = 'bellNumbers';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
