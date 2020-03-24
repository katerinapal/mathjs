"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var bigmath = "null"({ number: 'BigNumber' });
var Node = _index.indexjs.expression.node.Node;
var ConstantNode = _index.indexjs.expression.node.ConstantNode;
var OperatorNode = _index.indexjs.expression.node.OperatorNode;
var SymbolNode = _index.indexjs.expression.node.SymbolNode;
var AccessorNode = _index.indexjs.expression.node.AccessorNode;
var IndexNode = _index.indexjs.expression.node.IndexNode;
var RangeNode = _index.indexjs.expression.node.RangeNode;

describe('AccessorNode', function () {

  it('should create a AccessorNode', function () {
    var n = new AccessorNode(new Node(), new IndexNode([]));
    (0, _assert2.default)(n instanceof AccessorNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'AccessorNode');
  });

  it('should have isAccessorNode', function () {
    var node = new AccessorNode(new Node(), new IndexNode([]));
    (0, _assert2.default)(node.isAccessorNode);
  });

  it('should throw an error when calling with wrong arguments', function () {
    _assert2.default.throws(function () {
      new AccessorNode();
    }, TypeError);
    _assert2.default.throws(function () {
      new AccessorNode('a', new IndexNode([]));
    }, TypeError);
    _assert2.default.throws(function () {
      new AccessorNode(new Node(), new IndexNode([2, 3]));
    }, TypeError);
    _assert2.default.throws(function () {
      new AccessorNode(new Node(), new IndexNode([new Node(), 3]));
    }, TypeError);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      AccessorNode(new Node(), new IndexNode([]));
    }, SyntaxError);
  });

  it('should get the name of an AccessorNode', function () {
    var n = new AccessorNode(new SymbolNode('a'), new IndexNode([new ConstantNode('toString')]));
    _assert2.default.equal(n.name, 'toString');

    var n = new AccessorNode(new SymbolNode('a'), new IndexNode([new ConstantNode(1)]));
    _assert2.default.equal(n.name, '');
  });

  it('should compile a AccessorNode', function () {
    var a = new bigmath.expression.node.SymbolNode('a');
    var index = new IndexNode([new bigmath.expression.node.ConstantNode(2), new bigmath.expression.node.ConstantNode(1)]);
    var n = new bigmath.expression.node.AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: [[1, 2], [3, 4]]
    };
    _assert2.default.equal(expr.eval(scope), 3);
  });

  it('should compile a AccessorNode with range and context parameters', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(2), new RangeNode(new ConstantNode(1), new SymbolNode('end'))]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: [[1, 2], [3, 4]]
    };
    _assert2.default.deepEqual(expr.eval(scope), [[3, 4]]);
  });

  it('should compile a AccessorNode with a property', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode('b')]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: { b: 42 }
    };
    _assert2.default.deepEqual(expr.eval(scope), 42);
  });

  it('should throw a one-based index error when out of range (Array)', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(4)]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: [1, 2, 3]
    };
    _assert2.default.throws(function () {
      expr.eval(scope);
    }, /Index out of range \(4 > 3\)/);
  });

  it('should throw a one-based index error when out of range (Matrix)', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(4)]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: _index.indexjs.matrix([1, 2, 3])
    };
    _assert2.default.throws(function () {
      expr.eval(scope);
    }, /Index out of range \(4 > 3\)/);
  });

  it('should throw a one-based index error when out of range (string)', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(4)]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: 'hey'
    };
    _assert2.default.throws(function () {
      expr.eval(scope);
    }, /Index out of range \(4 > 3\)/);
  });

  it('should throw an error when applying a matrix index onto an object', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(4)]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: {}
    };
    _assert2.default.throws(function () {
      expr.eval(scope);
    }, /Cannot apply a numeric index as object property/);
  });

  it('should throw an error when applying an index onto a scalar', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(4)]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: 42
    };
    _assert2.default.throws(function () {
      expr.eval(scope);
    }, /Cannot apply index: unsupported type of object/);
  });

  it('should compile a AccessorNode with negative step range and context parameters', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(2), new RangeNode(new SymbolNode('end'), new ConstantNode(1), new ConstantNode(-1))]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: [[1, 2], [3, 4]]
    };
    _assert2.default.deepEqual(expr.eval(scope), [[4, 3]]);
  });

  it('should compile a AccessorNode with "end" both as value and in a range', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new SymbolNode('end'), new RangeNode(new ConstantNode(1), new SymbolNode('end'))]);
    var n = new AccessorNode(a, index);
    var expr = n.compile();

    var scope = {
      a: [[1, 2], [3, 4]]
    };
    _assert2.default.deepEqual(expr.eval(scope), [[3, 4]]);
  });

  it('should compile a AccessorNode with bignumber setting', function () {
    var a = new bigmath.expression.node.SymbolNode('a');
    var b = new bigmath.expression.node.ConstantNode(2);
    var c = new bigmath.expression.node.ConstantNode(1);
    var n = new bigmath.expression.node.AccessorNode(a, new IndexNode([b, c]));
    var expr = n.compile();

    var scope = {
      a: [[1, 2], [3, 4]]
    };
    _assert2.default.deepEqual(expr.eval(scope), 3);
  });

  it('should filter an AccessorNode', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var index = new IndexNode([b, c]);
    var n = new AccessorNode(a, index);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isAccessorNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isSymbolNode;
    }), [a]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isRangeNode;
    }), []);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isConstantNode;
    }), [b, c]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isConstantNode && node.value == '2';
    }), [b]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isConstantNode && node.value == '4';
    }), []);
  });

  it('should filter an empty AccessorNode', function () {
    var n = new AccessorNode(new SymbolNode('a'), new IndexNode([]));

    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isAccessorNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isConstantNode;
    }), []);
  });

  it('should run forEach on an AccessorNode', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var index = new IndexNode([b, c]);
    var n = new AccessorNode(a, index);

    var nodes = [];
    var paths = [];
    n.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], index);
    _assert2.default.deepEqual(paths, ['object', 'index']);
  });

  it('should map an AccessorNode', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var index = new IndexNode([b, c]);
    var n = new AccessorNode(a, index);

    var nodes = [];
    var paths = [];
    var e = new SymbolNode('c');
    var f = n.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);

      return node instanceof SymbolNode ? e : node;
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], index);
    _assert2.default.deepEqual(paths, ['object', 'index']);

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.object, e);
    _assert2.default.deepEqual(f.index.dimensions[0], b);
    _assert2.default.deepEqual(f.index.dimensions[1], c);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new AccessorNode(a, new IndexNode([b, c]));

    _assert2.default.throws(function () {
      n.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform an IndexNodes object', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new AccessorNode(a, new IndexNode([b, c]));

    var e = new SymbolNode('c');
    var f = n.transform(function (node) {
      return node instanceof SymbolNode ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.object, e);
    _assert2.default.deepEqual(f.index.dimensions[0], b);
    _assert2.default.deepEqual(f.index.dimensions[1], c);
  });

  it('should transform an IndexNodes (nested) parameters', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new AccessorNode(a, new IndexNode([b, c]));

    var e = new SymbolNode('c');
    var f = n.transform(function (node) {
      return node instanceof ConstantNode && node.value == '1' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.object, a);
    _assert2.default.deepEqual(f.index.dimensions[0], b);
    _assert2.default.deepEqual(f.index.dimensions[1], e);
  });

  it('should transform an AccessorNode itself', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new AccessorNode(a, new IndexNode([b, c]));

    var e = new ConstantNode(5);
    var f = n.transform(function (node) {
      return node instanceof AccessorNode ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f, e);
  });

  it('should clone an AccessorNode', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new AccessorNode(a, new IndexNode([b, c]));

    var d = n.clone();
    (0, _assert2.default)(d instanceof AccessorNode);
    _assert2.default.deepEqual(d, n);
    _assert2.default.notStrictEqual(d, n);
    _assert2.default.strictEqual(d.object, n.object);
    _assert2.default.strictEqual(d.index, n.index);
    _assert2.default.strictEqual(d.index.dimensions[0], n.index.dimensions[0]);
    _assert2.default.strictEqual(d.index.dimensions[1], n.index.dimensions[1]);
  });

  it('should stringify an AccessorNode', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(2), new ConstantNode(1)]);

    var n = new AccessorNode(a, index);
    _assert2.default.equal(n.toString(), 'a[2, 1]');

    var n2 = new AccessorNode(a, new IndexNode([]));
    _assert2.default.equal(n2.toString(), 'a[]');
  });

  it('should stringify an AccessorNode with parentheses', function () {
    var a = new SymbolNode('a');
    var b = new SymbolNode('b');
    var add = new OperatorNode('+', 'add', [a, b]);
    var bar = new AccessorNode(add, new IndexNode([new ConstantNode('bar')]));
    _assert2.default.equal(bar.toString(), '(a + b)["bar"]');
  });

  it('should stringify nested AccessorNode', function () {
    var a = new SymbolNode('a');
    var foo = new AccessorNode(a, new IndexNode([new ConstantNode('foo')]));
    var bar = new AccessorNode(foo, new IndexNode([new ConstantNode('bar')]));
    _assert2.default.equal(bar.toString(), 'a["foo"]["bar"]');
  });

  it('should stringigy an AccessorNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'AccessorNode') {
        var string = node.object.toString(options) + ' at ';
        node.index.dimensions.forEach(function (range) {
          string += range.toString(options) + ', ';
        });

        return string;
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new SymbolNode('a');
    var b = new ConstantNode(1);
    var c = new ConstantNode(2);

    var n = new AccessorNode(a, new IndexNode([b, c]));

    _assert2.default.equal(n.toString({ handler: customFunction }), 'a at const(1, number), const(2, number), ');
  });

  it('should LaTeX an AccessorNode', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(2), new ConstantNode(1)]);

    var n = new AccessorNode(a, index);
    _assert2.default.equal(n.toTex(), ' a_{2,1}');

    var n2 = new AccessorNode(a, new IndexNode([]));
    _assert2.default.equal(n2.toTex(), ' a_{}');
  });

  it('should LaTeX an AccessorNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'AccessorNode') {
        var latex = node.object.toTex(options) + ' at ';
        node.index.dimensions.forEach(function (range) {
          latex += range.toTex(options) + ', ';
        });

        return latex;
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new SymbolNode('a');
    var b = new ConstantNode(1);
    var c = new ConstantNode(2);

    var n = new AccessorNode(a, new IndexNode([b, c]));

    _assert2.default.equal(n.toTex({ handler: customFunction }), ' a at const\\left(1, number\\right), const\\left(2, number\\right), ');
  });
});
