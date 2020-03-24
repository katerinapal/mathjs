"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _filter = require("../../function/matrix/filter");

var functionmatrixfilter_obj = _interopRequireWildcard(_filter);

var _SymbolNode = require("../node/SymbolNode");

var nodeSymbolNode_obj = _interopRequireWildcard(_SymbolNode);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

var maxArgumentCount = null;

/**
 * Attach a transform function to math.filter
 * Adds a property transform containing the transform function.
 *
 * This transform adds support for equations as test function for math.filter,
 * so you can do something like 'filter([3, -2, 5], x > 0)'.
 */
function factory(type, config, load, typed) {
  var filter = load(functionmatrixfilter_obj);
  var SymbolNode = load(nodeSymbolNode_obj);

  function filterTransform(args, math, scope) {
    var x, test;

    if (args[0]) {
      x = args[0].compile().eval(scope);
    }

    if (args[1]) {
      if (args[1] && args[1].isSymbolNode) {
        // a function pointer, like filter([3, -2, 5], myTestFunction);
        test = args[1].compile().eval(scope);
      } else {
        // an equation like filter([3, -2, 5], x > 0)

        // find an undefined symbol
        var _scope = scope || {};
        var symbol = args[1].filter(function (node) {
          return node && node.isSymbolNode && !(node.name in math) && !(node.name in _scope);
        })[0];

        // create a test function for this equation
        var sub = Object.create(_scope);
        var eq = args[1].compile();
        if (symbol) {
          var name = symbol.name;
          test = function test(x) {
            sub[name] = x;
            return eq.eval(sub);
          };
        } else {
          throw new Error('No undefined variable found in filter equation');
        }
      }
    }

    return filter(x, test);
  }

  filterTransform.rawArgs = true;

  return filterTransform;
}

var name_name = 'filter';
var path_path = 'expression.transform';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
