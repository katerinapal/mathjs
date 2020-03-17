'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;
var RangeNode = math.expression.node.RangeNode;
var ObjectNode = math.expression.node.ObjectNode;

// FIXME: a lot of tests depend on order of object keys, whilst the order is officially undeterministic

describe('ObjectNode', function () {

  it('should create an ObjectNode', function () {
    var c = new ConstantNode(1);
    var a = new ObjectNode({ c: c });
    var b = new ObjectNode();
    (0, _assert2.default)(a instanceof ObjectNode);
    (0, _assert2.default)(b instanceof ObjectNode);
    _assert2.default.equal(a.type, 'ObjectNode');
    _assert2.default.equal(b.type, 'ObjectNode');
  });

  it('should have isObjectNode', function () {
    var node = new ObjectNode({});

    (0, _assert2.default)(node.isObjectNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      ObjectNode();
    }, SyntaxError);
  });

  it('should throw an error on wrong constructor arguments', function () {
    _assert2.default.throws(function () {
      new ObjectNode(2);
    }, TypeError);
    _assert2.default.throws(function () {
      new ObjectNode({ a: 2, b: 3 });
    }, TypeError);
  });

  it('should evaluate an ObjectNode', function () {
    var c = new ConstantNode(1);
    var a = new ObjectNode({ c: c });
    var b = new ObjectNode();

    _assert2.default.deepEqual(a.compile().eval(), { c: 1 });
    _assert2.default.deepEqual(b.compile().eval(), {});
  });

  it('should compile nested ObjectNodes', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new ConstantNode(4);

    var n2 = new ObjectNode({ a: a, b: b });
    var n3 = new ObjectNode({ c: c, d: d });
    var n4 = new ObjectNode({ n2: n2, n3: n3 });

    var expr = n4.compile();
    _assert2.default.deepEqual(expr.eval(), { n2: { a: 1, b: 2 }, n3: { c: 3, d: 4 } });
  });

  it('should filter an ObjectNode', function () {
    var a = new ConstantNode(1);
    var b = new SymbolNode('x');
    var c = new ConstantNode(2);
    var d = new ObjectNode({ a: a, b: b, c: c });

    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof ObjectNode;
    }), [d]);
    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof SymbolNode;
    }), [b]);
    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof RangeNode;
    }), []);
    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof ConstantNode;
    }), [a, c]);
    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof ConstantNode && node.value == '2';
    }), [c]);
  });

  it('should run forEach on an ObjectNode', function () {
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ObjectNode({ a: a, b: b });

    var nodes = [];
    var paths = [];
    c.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, c);
    });

    _assert2.default.deepEqual(paths, ['properties["a"]', 'properties["b"]']);
    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], b);
  });

  it('should map an ObjectNode', function () {
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ObjectNode({ a: a, b: b });

    var d = new ConstantNode(3);
    var nodes = [];
    var paths = [];
    var e = c.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, c);

      return node instanceof SymbolNode && node.name == 'x' ? d : node;
    });

    _assert2.default.deepEqual(paths, ['properties["a"]', 'properties["b"]']);
    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], b);

    _assert2.default.notStrictEqual(e, c);
    _assert2.default.deepEqual(e.properties["a"], d);
    _assert2.default.deepEqual(e.properties["b"], b);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ObjectNode({ a: a, b: b });

    _assert2.default.throws(function () {
      c.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform an ObjectNodes parameters', function () {
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ObjectNode({ a: a, b: b });

    var d = new ConstantNode(3);
    var e = c.transform(function (node) {
      return node instanceof SymbolNode && node.name == 'x' ? d : node;
    });

    _assert2.default.notStrictEqual(e, c);
    _assert2.default.deepEqual(e.properties["a"], d);
    _assert2.default.deepEqual(e.properties["b"], b);
  });

  it('should transform an ObjectNode itself', function () {
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ObjectNode({ a: a, b: b });

    var d = new ConstantNode(3);
    var e = c.transform(function (node) {
      return node instanceof ObjectNode ? d : node;
    });

    _assert2.default.notStrictEqual(e, c);
    _assert2.default.deepEqual(e, d);
  });

  it('should traverse an ObjectNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new ObjectNode({ a: a, b: b });
    var e = new ObjectNode({ c: c, d: d });

    var count = 0;
    e.traverse(function (node, path, parent) {
      count++;

      switch (count) {
        case 1:
          _assert2.default.strictEqual(path, null);
          _assert2.default.strictEqual(node, e);
          _assert2.default.strictEqual(parent, null);
          break;

        case 2:
          _assert2.default.strictEqual(path, 'properties["c"]');
          _assert2.default.strictEqual(node, c);
          _assert2.default.strictEqual(parent, e);
          break;

        case 3:
          _assert2.default.strictEqual(path, 'properties["d"]');
          _assert2.default.strictEqual(node, d);
          _assert2.default.strictEqual(parent, e);
          break;

        case 4:
          _assert2.default.strictEqual(path, 'properties["a"]');
          _assert2.default.strictEqual(node, a);
          _assert2.default.strictEqual(parent, d);
          break;

        case 5:
          _assert2.default.strictEqual(path, 'properties["b"]');
          _assert2.default.strictEqual(node, b);
          _assert2.default.strictEqual(parent, d);
          break;
      }
    });

    _assert2.default.equal(count, 5);
  });

  it('should clone an ObjectNode', function () {
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ObjectNode({ a: a, b: b });

    var d = c.clone();
    (0, _assert2.default)(d instanceof ObjectNode);
    _assert2.default.deepEqual(c, d);
    _assert2.default.notStrictEqual(c, d);
    _assert2.default.strictEqual(c.properties["a"], d.properties["a"]);
    _assert2.default.strictEqual(c.properties["b"], d.properties["b"]);
  });

  it('should stringify an ObjectNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var n1 = new ObjectNode({ a: a, b: b });
    var n2 = new ObjectNode({ c: c, n1: n1 });

    _assert2.default.equal(n2.toString(), '{"c": 3, "n1": {"a": 1, "b": 2}}');
  });

  it('should stringify an ObjectNode with custom toString', function () {
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var n = new ObjectNode({ a: a, b: b });

    _assert2.default.equal(n.toString({ handler: customFunction }), '{"a": const(1, number), "b": const(2, number)}');
  });

  it('should LaTeX an ObjectNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var n1 = new ObjectNode({ a: a, b: b });
    var n2 = new ObjectNode({ c: c, n1: n1 });

    _assert2.default.equal(n2.toTex(), '\\left\\{\\begin{array}{ll}\\mathbf{c:} & 3\\\\\n\\mathbf{n1:} & \\left\\{\\begin{array}{ll}\\mathbf{a:} & 1\\\\\n\\mathbf{b:} & 2\\\\\\end{array}\\right\\}\\\\\\end{array}\\right\\}');
  });

  it('should LaTeX an ObjectNode with custom toTex', function () {
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var n = new ObjectNode({ a: a, b: b });

    _assert2.default.equal(n.toTex({ handler: customFunction }), '\\left\\{\\begin{array}{ll}\\mathbf{a:} & const\\left(1, number\\right)\\\\\n\\mathbf{b:} & const\\left(2, number\\right)\\\\\\end{array}\\right\\}');
  });
});
