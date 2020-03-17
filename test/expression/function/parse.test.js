'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index');
var math = require('../../../index');
var Node = math.expression.node.Node;

describe('parse', function () {

  it('should parse an expression', function () {
    var node = math.parse('(5+3)/4');
    _assert2.default.ok(node instanceof Node);
    _assert2.default.equal(node.compile().eval(), 2);
  });

  it('should parse multiple expressions', function () {
    var nodes = math.parse(['2+3', '4+5']);
    _assert2.default.ok(Array.isArray(nodes));
    _assert2.default.equal(nodes.length, 2);

    _assert2.default.ok(nodes[0] instanceof Node);
    _assert2.default.ok(nodes[1] instanceof Node);
    _assert2.default.equal(nodes[0].compile().eval(), 5);
    _assert2.default.equal(nodes[1].compile().eval(), 9);
  });

  it('should LaTeX parse', function () {
    var expression = math.parse('parse(expr,options)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{parse}\\left( expr, options\\right)');
  });
});
