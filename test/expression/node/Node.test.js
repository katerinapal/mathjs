"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = {};
var Node = _index.indexjs.expression.node.Node;

describe('Node', function () {
  function MyNode(value) {
    this.value = value;
  }
  MyNode.prototype = new Node();
  MyNode.prototype.forEach = function () {};
  MyNode.prototype.map = function () {
    return new MyNode(this.value);
  };

  it('should create a Node', function () {
    var n = new Node();
    (0, _assert2.default)(n instanceof Node);
  });

  it('should have isNode', function () {
    var node = new Node();
    (0, _assert2.default)(node.isNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      Node();
    }, SyntaxError);
  });

  it('should filter a Node', function () {
    var n = new MyNode(2);

    _assert2.default.deepEqual(n.filter(function () {
      return true;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof Node;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof Date;
    }), []);
  });

  it('should transform a Node', function () {
    var a = new MyNode(2);
    var b = new MyNode(3);
    var c = a.transform(function (node) {
      return b;
    });
    _assert2.default.deepEqual(c, b);

    // no match
    a = new MyNode(2);
    b = new MyNode(3);
    c = a.transform(function (node) {
      return node;
    });
    _assert2.default.deepEqual(c, a);
  });

  it('should transform a Node using a replacement function', function () {
    var a = new MyNode(2);
    var b = new MyNode(3);
    var c = a.transform(function (node) {
      _assert2.default.deepEqual(node, a);
      return b;
    });
    _assert2.default.deepEqual(c, b);
  });

  it('should throw an error when cloning a Node interface', function () {
    _assert2.default.throws(function () {
      var a = new Node();
      a.clone();
    }, /Cannot clone a Node interface/);
  });

  it('should throw an error when stringifying a Node interface', function () {
    _assert2.default.throws(function () {
      var node = new Node();
      node.toString();
    }, /_toString not implemented for Node/);
  });

  it('should throw an error when calling _toTex', function () {
    _assert2.default.throws(function () {
      var node = new Node();
      node._toTex();
    }, /_toTex not implemented for Node/);
  });

  it('should ignore custom toString if it returns nothing', function () {
    var callback1 = function callback1(node, callback) {};
    var callback2 = {
      bla: function bla(node, callbacks) {}
    };
    var mymath = _index.indexjs.create();
    mymath.expression.node.Node.prototype._toString = function () {
      return 'default';
    };
    var n1 = new mymath.expression.node.Node();
    var s = new mymath.expression.node.SymbolNode('bla');
    var n2 = new mymath.expression.node.FunctionNode(s, []);

    _assert2.default.equal(n1.toString(callback1), 'default');
    _assert2.default.equal(n2.toString(callback2), 'bla()');
  });

  it('should ignore custom toTex if it returns nothing', function () {
    var callback1 = function callback1(node, callback) {};
    var callback2 = {
      bla: function bla(node, callbacks) {}
    };
    var mymath = _index.indexjs.create();
    mymath.expression.node.Node.prototype._toTex = function () {
      return 'default';
    };
    var n1 = new mymath.expression.node.Node();
    var s = new mymath.expression.node.SymbolNode('bla');
    var n2 = new mymath.expression.node.FunctionNode(s, []);

    _assert2.default.equal(n1.toTex(callback1), 'default');
    _assert2.default.equal(n2.toTex(callback2), '\\mathrm{bla}\\left(\\right)');
  });

  it('should throw an error when compiling an abstract node', function () {
    var node = new Node();
    _assert2.default.throws(function () {
      node.compile();
    }, /Cannot compile a Node interface/);
  });

  it('should have an identifier', function () {
    var node = new Node();

    _assert2.default.equal(node.getIdentifier(), 'Node');
  });

  it('should get the content of a Node', function () {
    var c = new _index.indexjs.expression.node.ConstantNode(1);

    _assert2.default.equal(c.getContent(), c);
    _assert2.default.deepEqual(c.getContent(), c);
  });
});
