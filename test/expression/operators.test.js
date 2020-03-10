import assert from "assert";
import { index_obj } from "../../index";
import { libexpressionoperators_obj } from "../../lib/expression/operators";

var math = index_obj;
var operators = libexpressionoperators_obj;
var OperatorNode = index_obj.expression.node.OperatorNode;
var AssignmentNode = index_obj.expression.node.AssignmentNode;
var SymbolNode = index_obj.expression.node.SymbolNode;
var ConstantNode = index_obj.expression.node.ConstantNode;
var Node = index_obj.expression.node.Node;
var ParenthesisNode = index_obj.expression.node.ParenthesisNode;

describe('operators', function () {
  it('should return the precedence of a node', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n1 = new AssignmentNode(new SymbolNode('a'), a);
    var n2 = new OperatorNode('or', 'or', [a, b]);

    assert.equal(libexpressionoperators_obj.getPrecedence(n1, 'keep'), 0);
    assert.equal(libexpressionoperators_obj.getPrecedence(n2, 'keep'), 2);
  });

  it('should return null if precedence is not defined for a node', function () {
    var n = new Node();

    assert.equal(libexpressionoperators_obj.getPrecedence(n, 'keep'), null);
  });

  it ('should return the precedence of a ParenthesisNode', function () {
    var c = new ConstantNode(1);

    var op = new OperatorNode('or', 'or', [c, c]);

    var p = new ParenthesisNode(op);

    assert.equal(libexpressionoperators_obj.getPrecedence(p, 'all'), libexpressionoperators_obj.getPrecedence(op, 'all'));
    assert.equal(libexpressionoperators_obj.getPrecedence(p, 'auto'), libexpressionoperators_obj.getPrecedence(op, 'all'));
    assert.equal(libexpressionoperators_obj.getPrecedence(p, 'keep'), null);
  });

  it('should return the associativity of a node', function () {
    var a = new ConstantNode(1);

    var n1 = new OperatorNode('+', 'add', [a, a]);
    var n2 = new OperatorNode('^', 'pow', [a, a]);
    var n3 = new OperatorNode('-', 'unaryMinus', [a]);
    var n4 = new OperatorNode('!', 'factorial', [a]);

    assert.equal(libexpressionoperators_obj.getAssociativity(n1, 'keep'), 'left');
    assert.equal(libexpressionoperators_obj.getAssociativity(n2, 'keep'), 'right');
    assert.equal(libexpressionoperators_obj.getAssociativity(n3, 'keep'), 'right');
    assert.equal(libexpressionoperators_obj.getAssociativity(n4, 'keep'), 'left');
  });

  it ('should return the associativity of a ParenthesisNode', function () {
    var c = new ConstantNode(1);

    var op = new OperatorNode('or', 'or', [c, c]);

    var p = new ParenthesisNode(op);

    assert.equal(libexpressionoperators_obj.getAssociativity(p, 'all'), libexpressionoperators_obj.getAssociativity(op, 'keep'));
    assert.equal(libexpressionoperators_obj.getAssociativity(p, 'auto'), libexpressionoperators_obj.getAssociativity(op, 'keep'));
    assert.equal(libexpressionoperators_obj.getAssociativity(p, 'keep'), null);
  });

  it('should return null if associativity is not defined for a node', function () {
    var a = new ConstantNode(1);

    var n1 = new Node();
    var n2 = new AssignmentNode(new SymbolNode('a'), a);

    assert.equal(libexpressionoperators_obj.getAssociativity(n1, 'keep'), null);
    assert.equal(libexpressionoperators_obj.getAssociativity(n2, 'keep'), null);
  });

  it('should return if a Node is associative with another Node', function () {
    var a = new ConstantNode(1);

    var n1 = new OperatorNode('+', 'add', [a, a]);
    var n2 = new OperatorNode('-', 'subtract', [a, a]);

    assert.equal(libexpressionoperators_obj.isAssociativeWith(n1, n1, 'keep'), true);
    assert.equal(libexpressionoperators_obj.isAssociativeWith(n1, n2, 'keep'), true);
    assert.equal(libexpressionoperators_obj.isAssociativeWith(n2, n2, 'keep'), false);
    assert.equal(libexpressionoperators_obj.isAssociativeWith(n2, n1, 'keep'), false);
  });

  it('should return null if the associativity between two Nodes is not defined', function () {
    var a = new ConstantNode(1);

    var n1 = new Node();
    var n2 = new AssignmentNode(new SymbolNode('a'), a);

    assert.equal(libexpressionoperators_obj.isAssociativeWith(n1, n1, 'keep'), null);
    assert.equal(libexpressionoperators_obj.isAssociativeWith(n1, n2, 'keep'), null);
    assert.equal(libexpressionoperators_obj.isAssociativeWith(n2, n2, 'keep'), null);
    assert.equal(libexpressionoperators_obj.isAssociativeWith(n2, n1, 'keep'), null);
  });

  it ('should return if a ParenthesisNode is associative with another Node', function () {
    var a = new ConstantNode(1);

    var add = new OperatorNode('+', 'add', [a, a]);
    var sub = new OperatorNode('-', 'subtract', [a, a]);

    var p = new ParenthesisNode(add);

    assert.equal(libexpressionoperators_obj.isAssociativeWith(p, sub, 'all'), true);
    assert.equal(libexpressionoperators_obj.isAssociativeWith(p, sub, 'auto'), true);
    assert.equal(libexpressionoperators_obj.isAssociativeWith(p, sub, 'keep'), null);
  });
});
