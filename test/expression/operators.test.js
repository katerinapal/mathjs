"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _operators = require("../../lib/expression/operators");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../index');
var OperatorNode = math.expression.node.OperatorNode;
var AssignmentNode = math.expression.node.AssignmentNode;
var SymbolNode = math.expression.node.SymbolNode;
var ConstantNode = math.expression.node.ConstantNode;
var Node = math.expression.node.Node;
var ParenthesisNode = math.expression.node.ParenthesisNode;

describe('operators', function () {
    it('should return the precedence of a node', function () {
        var a = new ConstantNode(1);
        var b = new ConstantNode(2);

        var n1 = new AssignmentNode(new SymbolNode('a'), a);
        var n2 = new OperatorNode('or', 'or', [a, b]);

        _assert2.default.equal((0, _operators.getPrecedence)(n1, 'keep'), 0);
        _assert2.default.equal((0, _operators.getPrecedence)(n2, 'keep'), 2);
    });

    it('should return null if precedence is not defined for a node', function () {
        var n = new Node();

        _assert2.default.equal((0, _operators.getPrecedence)(n, 'keep'), null);
    });

    it('should return the precedence of a ParenthesisNode', function () {
        var c = new ConstantNode(1);

        var op = new OperatorNode('or', 'or', [c, c]);

        var p = new ParenthesisNode(op);

        _assert2.default.equal((0, _operators.getPrecedence)(p, 'all'), (0, _operators.getPrecedence)(op, 'all'));
        _assert2.default.equal((0, _operators.getPrecedence)(p, 'auto'), (0, _operators.getPrecedence)(op, 'all'));
        _assert2.default.equal((0, _operators.getPrecedence)(p, 'keep'), null);
    });

    it('should return the associativity of a node', function () {
        var a = new ConstantNode(1);

        var n1 = new OperatorNode('+', 'add', [a, a]);
        var n2 = new OperatorNode('^', 'pow', [a, a]);
        var n3 = new OperatorNode('-', 'unaryMinus', [a]);
        var n4 = new OperatorNode('!', 'factorial', [a]);

        _assert2.default.equal((0, _operators.getPrecedence)(n1, 'keep'), 'left');
        _assert2.default.equal((0, _operators.getPrecedence)(n2, 'keep'), 'right');
        _assert2.default.equal((0, _operators.getPrecedence)(n3, 'keep'), 'right');
        _assert2.default.equal((0, _operators.getPrecedence)(n4, 'keep'), 'left');
    });

    it('should return the associativity of a ParenthesisNode', function () {
        var c = new ConstantNode(1);

        var op = new OperatorNode('or', 'or', [c, c]);

        var p = new ParenthesisNode(op);

        _assert2.default.equal((0, _operators.getPrecedence)(p, 'all'), (0, _operators.getPrecedence)(op, 'keep'));
        _assert2.default.equal((0, _operators.getPrecedence)(p, 'auto'), (0, _operators.getPrecedence)(op, 'keep'));
        _assert2.default.equal((0, _operators.getPrecedence)(p, 'keep'), null);
    });

    it('should return null if associativity is not defined for a node', function () {
        var a = new ConstantNode(1);

        var n1 = new Node();
        var n2 = new AssignmentNode(new SymbolNode('a'), a);

        _assert2.default.equal((0, _operators.getPrecedence)(n1, 'keep'), null);
        _assert2.default.equal((0, _operators.getPrecedence)(n2, 'keep'), null);
    });

    it('should return if a Node is associative with another Node', function () {
        var a = new ConstantNode(1);

        var n1 = new OperatorNode('+', 'add', [a, a]);
        var n2 = new OperatorNode('-', 'subtract', [a, a]);

        _assert2.default.equal((0, _operators.getPrecedence)(n1, n1, 'keep'), true);
        _assert2.default.equal((0, _operators.getPrecedence)(n1, n2, 'keep'), true);
        _assert2.default.equal((0, _operators.getPrecedence)(n2, n2, 'keep'), false);
        _assert2.default.equal((0, _operators.getPrecedence)(n2, n1, 'keep'), false);
    });

    it('should return null if the associativity between two Nodes is not defined', function () {
        var a = new ConstantNode(1);

        var n1 = new Node();
        var n2 = new AssignmentNode(new SymbolNode('a'), a);

        _assert2.default.equal((0, _operators.getPrecedence)(n1, n1, 'keep'), null);
        _assert2.default.equal((0, _operators.getPrecedence)(n1, n2, 'keep'), null);
        _assert2.default.equal((0, _operators.getPrecedence)(n2, n2, 'keep'), null);
        _assert2.default.equal((0, _operators.getPrecedence)(n2, n1, 'keep'), null);
    });

    it('should return if a ParenthesisNode is associative with another Node', function () {
        var a = new ConstantNode(1);

        var add = new OperatorNode('+', 'add', [a, a]);
        var sub = new OperatorNode('-', 'subtract', [a, a]);

        var p = new ParenthesisNode(add);

        _assert2.default.equal((0, _operators.getPrecedence)(p, sub, 'all'), true);
        _assert2.default.equal((0, _operators.getPrecedence)(p, sub, 'auto'), true);
        _assert2.default.equal((0, _operators.getPrecedence)(p, sub, 'keep'), null);
    });
});
