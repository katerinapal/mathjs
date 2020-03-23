"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var Node = _index.indexjs.expression.node.Node;
var ConstantNode = _index.indexjs.expression.node.ConstantNode;
var SymbolNode = _index.indexjs.expression.node.SymbolNode;
var OperatorNode = _index.indexjs.expression.node.OperatorNode;

describe('SymbolNode', function () {

  it('should create a SymbolNode', function () {
    var n = new SymbolNode('sqrt');
    (0, _assert2.default)(n instanceof SymbolNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'SymbolNode');
  });

  it('should have isSymbolNode', function () {
    var node = new SymbolNode('a');
    (0, _assert2.default)(node.isSymbolNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      SymbolNode('sqrt');
    }, SyntaxError);
  });

  it('should throw an error when calling with wrong arguments', function () {
    _assert2.default.throws(function () {
      new SymbolNode();
    }, TypeError);
    _assert2.default.throws(function () {
      new SymbolNode(2);
    }, TypeError);
  });

  it('should throw an error when evaluating an undefined symbol', function () {
    var scope = {};
    var s = new SymbolNode('foo');
    _assert2.default.throws(function () {
      s.compile().eval(scope);
    }, Error);
  });

  it('should compile a SymbolNode', function () {
    var s = new SymbolNode('a');

    var expr = s.compile();
    var scope = { a: 5 };
    _assert2.default.equal(expr.eval(scope), 5);
    _assert2.default.throws(function () {
      expr.eval({});
    }, Error);

    var s2 = new SymbolNode('sqrt');
    var expr2 = s2.compile();
    var scope2 = {};
    _assert2.default.strictEqual(expr2.eval(scope2), _index.indexjs.sqrt);
  });

  it('should filter a SymbolNode', function () {
    var n = new SymbolNode('x');
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof SymbolNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.name == 'x';
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.name == 'q';
    }), []);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode;
    }), []);
  });

  it('should run forEach on a SymbolNode', function () {
    var a = new SymbolNode('a');
    a.forEach(function () {
      _assert2.default.ok(false, 'should not execute, symbol has no childs');
    });
  });

  it('should map a SymbolNode', function () {
    var a = new SymbolNode('a');
    var c = new SymbolNode('c');
    var b = a.map(function () {
      _assert2.default.ok(false, 'should not execute, symbol has no childs');
    });

    _assert2.default.notStrictEqual(b, a);
    _assert2.default.deepEqual(b, a);
  });

  it('should transform a SymbolNode', function () {
    var a = new SymbolNode('x');
    var b = new SymbolNode('y');
    var c = a.transform(function (node) {
      return node instanceof SymbolNode && node.name == 'x' ? b : node;
    });
    _assert2.default.deepEqual(c, b);

    // no match should leave the symbol as is
    var d = a.transform(function (node) {
      return node instanceof SymbolNode && node.name == 'q' ? b : node;
    });
    _assert2.default.deepEqual(d, a);
  });

  it('should clone a SymbolNode', function () {
    var a = new SymbolNode('x');
    var b = a.clone();

    (0, _assert2.default)(b instanceof SymbolNode);
    _assert2.default.deepEqual(a, b);
    _assert2.default.notStrictEqual(a, b);
    _assert2.default.equal(a.name, b.name);
  });

  it('should stringify a SymbolNode', function () {
    var s = new SymbolNode('foo');

    _assert2.default.equal(s.toString(), 'foo');
  });

  it('should stringigy a SymbolNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'SymbolNode') {
        return 'symbol(' + node.name + ')';
      }
    };

    var n = new SymbolNode('a');

    _assert2.default.equal(n.toString({ handler: customFunction }), 'symbol(a)');
  });

  it('should LaTeX a SymbolNode', function () {
    var s = new SymbolNode('foo');

    _assert2.default.equal(s.toTex(), ' foo');
  });

  it('should LaTeX a SymbolNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'SymbolNode') {
        return 'symbol(' + node.name + ')';
      }
    };

    var n = new SymbolNode('a');

    _assert2.default.equal(n.toTex({ handler: customFunction }), 'symbol(a)');
  });

  it('should LaTeX a SymbolNode without breaking \\cdot', function () {
    var a = new ConstantNode(1);
    var b = new SymbolNode('Epsilon');

    var mult = new OperatorNode('*', 'multiply', [a, b]);

    _assert2.default.equal(mult.toTex(), '1\\cdot E');
  });
});
