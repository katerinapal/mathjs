"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require("../../utils/collection/deepMap");

var _parse = require("../parse");

var parse_obj = _interopRequireWildcard(_parse);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var parse = load(parse_obj);

  /**
   * Evaluate an expression.
   *
   * Syntax:
   *
   *     math.eval(expr)
   *     math.eval(expr, scope)
   *     math.eval([expr1, expr2, expr3, ...])
   *     math.eval([expr1, expr2, expr3, ...], scope)
   *
   * Example:
   *
   *     math.eval('(2+3)/4');                // 1.25
   *     math.eval('sqrt(3^2 + 4^2)');        // 5
   *     math.eval('sqrt(-4)');               // 2i
   *     math.eval(['a=3', 'b=4', 'a*b']);,   // [3, 4, 12]
   *
   *     var scope = {a:3, b:4};
   *     math.eval('a * b', scope);           // 12
   *
   * See also:
   *
   *    parse, compile
   *
   * @param {string | string[] | Matrix} expr   The expression to be evaluated
   * @param {Object} [scope]                    Scope to read/write variables
   * @return {*} The result of the expression
   * @throws {Error}
   */
  return typed('compile', {
    'string': function string(expr) {
      var scope = {};
      return parse(expr).compile().eval(scope);
    },

    'string, Object': function stringObject(expr, scope) {
      return parse(expr).compile().eval(scope);
    },

    'Array | Matrix': function ArrayMatrix(expr) {
      var scope = {};
      return (0, _deepMap.deepMapjs)(expr, function (entry) {
        return parse(entry).compile().eval(scope);
      });
    },

    'Array | Matrix, Object': function ArrayMatrixObject(expr, scope) {
      return (0, _deepMap.deepMapjs)(expr, function (entry) {
        return parse(entry).compile().eval(scope);
      });
    }
  });
}

var name_name = 'eval';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
