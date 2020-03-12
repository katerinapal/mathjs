'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var OperatorNode = math.expression.node.OperatorNode;
var ParenthesisNode = math.expression.node.ParenthesisNode;

describe('ParenthesisNode', function () {

  it('should create a ParenthesisNode', function () {
    var a = new ConstantNode(1);

    var n = new ParenthesisNode(a);
    (0, _assert2.default)(n instanceof ParenthesisNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'ParenthesisNode');
  });

  it('should throw an error when calling without new operator', function () {
    var a = new ConstantNode(1);
    _assert2.default.throws(function () {
      ParenthesisNode(a);
    }, SyntaxError);
  });

  it('should throw an error when calling with wrong arguments', function () {
    _assert2.default.throws(function () {
      new ParenthesisNode();
    }, TypeError);
    _assert2.default.throws(function () {
      new ParenthesisNode(2);
    }, TypeError);
  });

  it('should compile a ParenthesisNode', function () {
    var a = new ConstantNode(1);
    var n = new ParenthesisNode(a);

    _assert2.default.equal(n.compile().eval.toString(), a.compile().eval.toString());
  });

  it('should filter a ParenthesisNode', function () {
    var a = new ConstantNode(1);
    var n = new ParenthesisNode(a);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ParenthesisNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.content instanceof ConstantNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return typeof node.content !== 'undefined' && node.content.value == '1';
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return typeof node.content !== 'undefined' && node.content.type == 'ConstantNode';
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode;
    }), [a]);
  });

  it('should run forEach on a ParenthesisNode', function () {
    var count = 0;
    var a = new ConstantNode(1);

    var n = new ParenthesisNode(a);
    n.forEach(function (node, path, _parent) {
      _assert2.default.equal(node.type, 'ConstantNode');
      _assert2.default.equal(path, 'content');
      _assert2.default.deepEqual(_parent, n);
      count++;
    });

    _assert2.default.equal(count, 1);
  });

  it('should map a ParenthesisNode', function () {
    var a = new ConstantNode(1);
    var b = new ParenthesisNode(a);

    var count = 0;

    var c = b.map(function (node, path, _parent) {
      count++;
      _assert2.default.equal(node.type, 'ConstantNode');
      _assert2.default.equal(node.value, 1);
      return new ConstantNode(2);
    });

    _assert2.default.equal(count, 1);
    _assert2.default.equal(c.content.value, 2);
  });

  it('should transform a ParenthesisNode', function () {
    var c1 = new ConstantNode(1);
    var c2 = new ConstantNode(2);

    var a = new ParenthesisNode(c1);
    var b = new ParenthesisNode(c2);

    var c = a.transform(function (node) {
      return node instanceof ParenthesisNode && node.content.value == 1 ? b : node;
    });
    _assert2.default.deepEqual(c, b);

    // no match should leave the constant as is
    var d = a.transform(function (node) {
      return node instanceof ParenthesisNode && node.name == 2 ? b : node;
    });
    _assert2.default.deepEqual(d, a);
  });

  it('should clone a ParenthesisNode', function () {
    var a = new ConstantNode(1);
    var n = new ParenthesisNode(a);
    var clone = n.clone();

    (0, _assert2.default)(clone instanceof ParenthesisNode);
    _assert2.default.deepEqual(n, clone);
    _assert2.default.notStrictEqual(n, clone);
    _assert2.default.equal(n.content, clone.content);
  });

  it('should get the content of a ParenthesisNode', function () {
    var c = new math.expression.node.ConstantNode(1);
    var p1 = new math.expression.node.ParenthesisNode(c);
    var p2 = new math.expression.node.ParenthesisNode(p1);

    _assert2.default.equal(p1.content, c);
    _assert2.default.equal(p1.getContent(), c);
    _assert2.default.deepEqual(p1.getContent(), c);
    _assert2.default.equal(p2.getContent(), c);
    _assert2.default.deepEqual(p2.getContent(), c);
  });

  it('should stringify a ParenthesisNode', function () {
    var a = new ConstantNode(1);
    var n = new ParenthesisNode(a);

    _assert2.default.equal(n.toString(), '(1)');
    _assert2.default.equal(n.toString({}), '(1)');
  });

  it('should stringify a ParenthesisNode when not in keep mode', function () {
    var c = new math.expression.node.ConstantNode(1);

    var p = new math.expression.node.ParenthesisNode(c);

    _assert2.default.equal(p.toString({ parenthesis: 'all' }), '1');
    _assert2.default.equal(p.toString({ parenthesis: 'auto' }), '1');
  });

  it('should stringify a ParenthesisNode with custom toString', function () {
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ParenthesisNode') {
        return '[' + node.content.toString(options) + ']';
      }
    };

    var c = new math.expression.node.ConstantNode(1);
    var n = new math.expression.node.ParenthesisNode(c);

    _assert2.default.equal(n.toString({ handler: customFunction }), '[1]');
  });

  it('should LaTeX a ParenthesisNode', function () {
    var a = new ConstantNode(1);
    var n = new ParenthesisNode(a);

    _assert2.default.equal(n.toTex(), '\\left(1\\right)');
    _assert2.default.equal(n.toTex({}), '\\left(1\\right)');
  });

  it('should LaTeX a ParenthesisNode when not in keep mode', function () {
    var c = new math.expression.node.ConstantNode(1);

    var p = new math.expression.node.ParenthesisNode(c);

    _assert2.default.equal(p.toTex({ parenthesis: 'all' }), '1');
    _assert2.default.equal(p.toTex({ parenthesis: 'auto' }), '1');
  });

  it('should LaTeX a ParenthesisNode with custom toTex', function () {
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ParenthesisNode') {
        return '\\left[' + node.content.toTex(options) + '\\right]';
      }
    };

    var c = new math.expression.node.ConstantNode(1);
    var n = new math.expression.node.ParenthesisNode(c);

    _assert2.default.equal(n.toTex({ handler: customFunction }), '\\left[1\\right]');
  });
});
