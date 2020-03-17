'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
function factory(type, config, load, typed) {
  var parse = load(parse_obj);

  /**
   * Parse an expression. Returns a node tree, which can be evaluated by
   * invoking node.eval();
   *
   * Syntax:
   *
   *     math.parse(expr)
   *     math.parse(expr, options)
   *     math.parse([expr1, expr2, expr3, ...])
   *     math.parse([expr1, expr2, expr3, ...], options)
   *
   * Example:
   *
   *     var node = math.parse('sqrt(3^2 + 4^2)');
   *     node.compile().eval(); // 5
   *
   *     var scope = {a:3, b:4}
   *     var node = math.parse('a * b'); // 12
   *     var code = node.compile();
   *     code.eval(scope); // 12
   *     scope.a = 5;
   *     code.eval(scope); // 20
   *
   *     var nodes = math.parse(['a = 3', 'b = 4', 'a * b']);
   *     nodes[2].compile().eval(); // 12
   *
   * See also:
   *
   *     eval, compile
   *
   * @param {string | string[] | Matrix} expr          Expression to be parsed
   * @param {{nodes: Object<string, Node>}} [options]  Available options:
   *                                                   - `nodes` a set of custom nodes
   * @return {Node | Node[]} node
   * @throws {Error}
   */
  return typed('parse', {
    'string | Array | Matrix': parse,
    'string | Array | Matrix, Object': parse
  });
}

var name_name = 'parse';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
