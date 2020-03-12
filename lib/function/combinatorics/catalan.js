"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _add = require("../arithmetic/add");

var arithmeticadd_obj = _interopRequireWildcard(_add);

var _divide = require("../arithmetic/divide");

var arithmeticdivide_obj = _interopRequireWildcard(_divide);

var _multiply = require("../arithmetic/multiply");

var arithmeticmultiply_obj = _interopRequireWildcard(_multiply);

var _combinations = require("../probability/combinations");

var probabilitycombinations_obj = _interopRequireWildcard(_combinations);

var _isNegative = require("../utils/isNegative");

var utilsisNegative_obj = _interopRequireWildcard(_isNegative);

var _isInteger = require("../utils/isInteger");

var utilsisInteger_obj = _interopRequireWildcard(_isInteger);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var add = load(arithmeticadd_obj);
  var divide = load(arithmeticdivide_obj);
  var multiply = load(arithmeticmultiply_obj);
  var combinations = load(probabilitycombinations_obj);
  var isNegative = load(utilsisNegative_obj);
  var isInteger = load(utilsisInteger_obj);

  /**
   * The Catalan Numbers enumerate combinatorial structures of many different types.
   * catalan only takes integer arguments.
   * The following condition must be enforced: n >= 0
   *
   * Syntax:
   *
   *   math.catalan(n)
   *
   * Examples:
   *
   *    math.catalan(3); // returns 5;
   *    math.catalan(8); // returns 1430;
   *
   * See also:
   *
   *    bellNumbers
   *
   * @param {Number | BigNumber} n    nth Catalan number
   * @return {Number | BigNumber}     Cn(n)
   */
  var catalan = typed('catalan', {
    'number | BigNumber': function numberBigNumber(n) {

      if (!isInteger(n) || isNegative(n)) {
        throw new TypeError('Non-negative integer value expected in function catalan');
      }

      return divide(combinations(multiply(n, 2), n), add(n, 1));
    }
  });

  catalan.toTex = { 1: '\\mathrm{C}_{${args[0]}}' };

  return catalan;
}

var name_exportedObj = 'catalan';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
