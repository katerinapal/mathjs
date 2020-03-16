"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _combinations = require("../probability/combinations");

var probabilitycombinations_obj = _interopRequireWildcard(_combinations);

var _addScalar = require("../arithmetic/addScalar");

var arithmeticaddScalar_obj = _interopRequireWildcard(_addScalar);

var _isPositive = require("../utils/isPositive");

var utilsisPositive_obj = _interopRequireWildcard(_isPositive);

var _isInteger = require("../utils/isInteger");

var utilsisInteger_obj = _interopRequireWildcard(_isInteger);

var _larger = require("../relational/larger");

var relationallarger_obj = _interopRequireWildcard(_larger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var combinations = load(probabilitycombinations_obj);
  var add = load(arithmeticaddScalar_obj);
  var isPositive = load(utilsisPositive_obj);
  var isInteger = load(utilsisInteger_obj);
  var larger = load(relationallarger_obj);

  /**
   * The composition counts of n into k parts.
   *
   * composition only takes integer arguments.
   * The following condition must be enforced: k <= n.
   *
   * Syntax:
   *
   *   math.composition(n, k)
   *
   * Examples:
   *
   *    math.composition(5, 3); // returns 6
   *
   * See also:
   *
   *    combinations
   *
   * @param {Number | BigNumber} n    Total number of objects in the set
   * @param {Number | BigNumber} k    Number of objects in the subset
   * @return {Number | BigNumber}     Returns the composition counts of n into k parts.
   */
  var composition = typed('composition', {
    'number | BigNumber, number | BigNumber': function numberBigNumberNumberBigNumber(n, k) {
      if (!isInteger(n) || !isPositive(n) || !isInteger(k) || !isPositive(k)) {
        throw new TypeError('Positive integer value expected in function composition');
      } else if (larger(k, n)) {
        throw new TypeError('k must be less than or equal to n in function composition');
      }

      return combinations(add(n, -1), add(k, -1));
    }
  });

  composition.toTex = undefined; // use default template

  return composition;
}

var name_name = 'composition';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
