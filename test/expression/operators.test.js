import assert_moduleDefault from "assert";
import { math as indexjs } from "../../index";
import { operators as operatorsjs } from "../../lib/expression/operators";
var assert = {};

var math = indexjs;
var operators = operatorsjs;
var OperatorNode = indexjs.expression.node.OperatorNode;
var AssignmentNode = indexjs.expression.node.AssignmentNode;
var SymbolNode = indexjs.expression.node.SymbolNode;
var ConstantNode = indexjs.expression.node.ConstantNode;
var Node = indexjs.expression.node.Node;
var ParenthesisNode = indexjs.expression.node.ParenthesisNode;

describe('operators', function () {
  it('should return the precedence of a node', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n1 = new AssignmentNode(new SymbolNode('a'), a);
    var n2 = new OperatorNode('or', 'or', [a, b]);

    assert.equal(operatorsjs.getPrecedence(n1, 'keep'), 0);
    assert.equal(operatorsjs.getPrecedence(n2, 'keep'), 2);
  });

  it('should return null if precedence is not defined for a node', function () {
    var n = new Node();

    assert.equal(operatorsjs.getPrecedence(n, 'keep'), null);
  });

  it ('should return the precedence of a ParenthesisNode', function () {
    var c = new ConstantNode(1);

    var op = new OperatorNode('or', 'or', [c, c]);

    var p = new ParenthesisNode(op);

    assert.equal(operatorsjs.getPrecedence(p, 'all'), operatorsjs.getPrecedence(op, 'all'));
    assert.equal(operatorsjs.getPrecedence(p, 'auto'), operatorsjs.getPrecedence(op, 'all'));
    assert.equal(operatorsjs.getPrecedence(p, 'keep'), null);
  });

  it('should return the associativity of a node', function () {
    var a = new ConstantNode(1);

    var n1 = new OperatorNode('+', 'add', [a, a]);
    var n2 = new OperatorNode('^', 'pow', [a, a]);
    var n3 = new OperatorNode('-', 'unaryMinus', [a]);
    var n4 = new OperatorNode('!', 'factorial', [a]);

    assert.equal(operatorsjs.getAssociativity(n1, 'keep'), 'left');
    assert.equal(operatorsjs.getAssociativity(n2, 'keep'), 'right');
    assert.equal(operatorsjs.getAssociativity(n3, 'keep'), 'right');
    assert.equal(operatorsjs.getAssociativity(n4, 'keep'), 'left');
  });

  it ('should return the associativity of a ParenthesisNode', function () {
    var c = new ConstantNode(1);

    var op = new OperatorNode('or', 'or', [c, c]);

    var p = new ParenthesisNode(op);

    assert.equal(operatorsjs.getAssociativity(p, 'all'), operatorsjs.getAssociativity(op, 'keep'));
    assert.equal(operatorsjs.getAssociativity(p, 'auto'), operatorsjs.getAssociativity(op, 'keep'));
    assert.equal(operatorsjs.getAssociativity(p, 'keep'), null);
  });

  it('should return null if associativity is not defined for a node', function () {
    var a = new ConstantNode(1);

    var n1 = new Node();
    var n2 = new AssignmentNode(new SymbolNode('a'), a);

    assert.equal(operatorsjs.getAssociativity(n1, 'keep'), null);
    assert.equal(operatorsjs.getAssociativity(n2, 'keep'), null);
  });

  it('should return if a Node is associative with another Node', function () {
    var a = new ConstantNode(1);

    var n1 = new OperatorNode('+', 'add', [a, a]);
    var n2 = new OperatorNode('-', 'subtract', [a, a]);

    assert.equal(operatorsjs.isAssociativeWith(n1, n1, 'keep'), true);
    assert.equal(operatorsjs.isAssociativeWith(n1, n2, 'keep'), true);
    assert.equal(operatorsjs.isAssociativeWith(n2, n2, 'keep'), false);
    assert.equal(operatorsjs.isAssociativeWith(n2, n1, 'keep'), false);
  });

  it('should return null if the associativity between two Nodes is not defined', function () {
    var a = new ConstantNode(1);

    var n1 = new Node();
    var n2 = new AssignmentNode(new SymbolNode('a'), a);

    assert.equal(operatorsjs.isAssociativeWith(n1, n1, 'keep'), null);
    assert.equal(operatorsjs.isAssociativeWith(n1, n2, 'keep'), null);
    assert.equal(operatorsjs.isAssociativeWith(n2, n2, 'keep'), null);
    assert.equal(operatorsjs.isAssociativeWith(n2, n1, 'keep'), null);
  });

  it ('should return if a ParenthesisNode is associative with another Node', function () {
    var a = new ConstantNode(1);

    var add = new OperatorNode('+', 'add', [a, a]);
    var sub = new OperatorNode('-', 'subtract', [a, a]);

    var p = new ParenthesisNode(add);

    assert.equal(operatorsjs.isAssociativeWith(p, sub, 'all'), true);
    assert.equal(operatorsjs.isAssociativeWith(p, sub, 'auto'), true);
    assert.equal(operatorsjs.isAssociativeWith(p, sub, 'keep'), null);
  });
});
