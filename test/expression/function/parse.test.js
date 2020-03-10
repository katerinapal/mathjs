import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
// test parse
var assert = {};
var error = indexjs;
var math = indexjs;
var Node = indexjs.expression.node.Node;

describe('parse', function() {

  it('should parse an expression', function() {
    var node = indexjs.parse('(5+3)/4');
    assert.ok(node instanceof Node);
    assert.equal(node.compile().eval(), 2);
  });

  it('should parse multiple expressions', function() {
    var nodes = indexjs.parse(['2+3', '4+5']);
    assert.ok(Array.isArray(nodes));
    assert.equal(nodes.length, 2);

    assert.ok(nodes[0] instanceof Node);
    assert.ok(nodes[1] instanceof Node);
    assert.equal(nodes[0].compile().eval(), 5);
    assert.equal(nodes[1].compile().eval(), 9);
  });

  it('should LaTeX parse', function () {
    var expression = indexjs.parse('parse(expr,options)');
    assert.equal(expression.toTex(), '\\mathrm{parse}\\left( expr, options\\right)');
  });

});
