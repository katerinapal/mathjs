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
var ArrayNode = math.expression.node.ArrayNode;

describe('ArrayNode', function () {

  it('should create an ArrayNode', function () {
    var c = new ConstantNode(1);
    var a = new ArrayNode([c]);
    var b = new ArrayNode([]);
    (0, _assert2.default)(a instanceof ArrayNode);
    (0, _assert2.default)(b instanceof ArrayNode);
    _assert2.default.equal(a.type, 'ArrayNode');
    _assert2.default.equal(b.type, 'ArrayNode');
  });

  it('should have isArrayNode', function () {
    var node = new ArrayNode([]);

    (0, _assert2.default)(node.isArrayNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      ArrayNode();
    }, SyntaxError);
  });

  it('should throw an error on wrong constructor arguments', function () {
    _assert2.default.throws(function () {
      new ArrayNode(2);
    }, TypeError);
    _assert2.default.throws(function () {
      new ArrayNode([2, 3]);
    }, TypeError);
  });

  it('should evaluate an ArrayNode', function () {
    var c = new ConstantNode(1);
    var a = new ArrayNode([c]);
    var b = new ArrayNode();

    _assert2.default.deepEqual(a.compile().eval(), math.matrix([1]));
    _assert2.default.deepEqual(b.compile().eval(), math.matrix([]));
  });

  it('should compile an ArrayNode and evaluate as Matrix', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new ConstantNode(4);
    var n = new ArrayNode([a, b, c, d]);

    var expr = n.compile();
    _assert2.default.deepEqual(expr.eval(), math.matrix([1, 2, 3, 4]));
  });

  it('should compile an ArrayNode and evaluate as Array', function () {
    var mathArray = math.create({ matrix: 'Array' });
    var a = new mathArray.expression.node.ConstantNode(1);
    var b = new mathArray.expression.node.ConstantNode(2);
    var c = new mathArray.expression.node.ConstantNode(3);
    var d = new mathArray.expression.node.ConstantNode(4);
    var n = new mathArray.expression.node.ArrayNode([a, b, c, d]);
    var expr = n.compile();
    _assert2.default.deepEqual(expr.eval(), [1, 2, 3, 4]);
  });

  it('should compile nested ArrayNodes', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new ConstantNode(4);

    var n2 = new ArrayNode([a, b]);
    var n3 = new ArrayNode([c, d]);
    var n4 = new ArrayNode([n2, n3]);

    var expr = n4.compile();
    _assert2.default.deepEqual(expr.eval(), math.matrix([[1, 2], [3, 4]]));
  });

  it('should find an ArrayNode', function () {
    var a = new ConstantNode(1);
    var b = new SymbolNode('x');
    var c = new ConstantNode(2);
    var d = new ArrayNode([a, b, c]);

    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof ArrayNode;
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

  it('should run forEach on an ArrayNode', function () {
    // [x, 2]
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ArrayNode([a, b]);

    var d = new ConstantNode(3);
    var nodes = [];
    var paths = [];
    c.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, c);
    });

    _assert2.default.deepEqual(paths, ['items[0]', 'items[1]']);
    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], b);
  });

  it('should map an ArrayNode', function () {
    // [x, 2]
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ArrayNode([a, b]);

    var d = new ConstantNode(3);
    var nodes = [];
    var paths = [];
    var e = c.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, c);

      return node instanceof SymbolNode && node.name == 'x' ? d : node;
    });

    _assert2.default.deepEqual(paths, ['items[0]', 'items[1]']);
    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], b);

    _assert2.default.notStrictEqual(e, c);
    _assert2.default.deepEqual(e.items[0], d);
    _assert2.default.deepEqual(e.items[1], b);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ArrayNode([a, b]);

    _assert2.default.throws(function () {
      c.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform an ArrayNodes parameters', function () {
    // [x, 2]
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ArrayNode([a, b]);

    var d = new ConstantNode(3);
    var e = c.transform(function (node) {
      return node instanceof SymbolNode && node.name == 'x' ? d : node;
    });

    _assert2.default.notStrictEqual(e, c);
    _assert2.default.deepEqual(e.items[0], d);
    _assert2.default.deepEqual(e.items[1], b);
  });

  it('should transform an ArrayNode itself', function () {
    // [x, 2]
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ArrayNode([a, b]);

    var d = new ConstantNode(3);
    var e = c.transform(function (node) {
      return node instanceof ArrayNode ? d : node;
    });

    _assert2.default.notStrictEqual(e, c);
    _assert2.default.deepEqual(e, d);
  });

  it('should traverse an ArrayNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ArrayNode([a, b]);

    var count = 0;
    c.traverse(function (node, path, parent) {
      count++;

      switch (count) {
        case 1:
          _assert2.default.strictEqual(node, c);
          _assert2.default.strictEqual(path, null);
          _assert2.default.strictEqual(parent, null);
          break;

        case 2:
          _assert2.default.strictEqual(node, a);
          _assert2.default.strictEqual(path, 'items[0]');
          _assert2.default.strictEqual(parent, c);
          break;

        case 3:
          _assert2.default.strictEqual(node, b);
          _assert2.default.strictEqual(path, 'items[1]');
          _assert2.default.strictEqual(parent, c);
          break;
      }
    });

    _assert2.default.equal(count, 3);
  });

  it('should clone an ArrayNode', function () {
    // [x, 2]
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new ArrayNode([a, b]);

    var d = c.clone();
    (0, _assert2.default)(d instanceof ArrayNode);
    _assert2.default.deepEqual(c, d);
    _assert2.default.notStrictEqual(c, d);
    _assert2.default.strictEqual(c.items[0], d.items[0]);
    _assert2.default.strictEqual(c.items[1], d.items[1]);
  });

  it('should stringify an ArrayNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new ConstantNode(4);
    var n = new ArrayNode([a, b, c, d]);

    _assert2.default.equal(n.toString(), '[1, 2, 3, 4]');
  });

  it('should stringify an ArrayNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ArrayNode') {
        var string = '[';
        node.items.forEach(function (item) {
          string += item.toString(options) + ', ';
        });

        string += ']';
        return string;
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n = new ArrayNode([a, b]);

    _assert2.default.equal(n.toString({ handler: customFunction }), '[const(1, number), const(2, number), ]');
  });

  it('should LaTeX an ArrayNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new ConstantNode(4);
    var v1 = new ArrayNode([a, b]);
    var v2 = new ArrayNode([c, d]);
    var n = new ArrayNode([v1, v2]);

    _assert2.default.equal(n.toTex(), '\\begin{bmatrix}1&2\\\\3&4\\\\\\end{bmatrix}');
  });

  it('should LaTeX an ArrayNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ArrayNode') {
        var latex = '\\left[';
        node.items.forEach(function (item) {
          latex += item.toTex(options) + ', ';
        });

        latex += '\\right]';
        return latex;
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n = new ArrayNode([a, b]);

    _assert2.default.equal(n.toTex({ handler: customFunction }), '\\left[const\\left(1, number\\right), const\\left(2, number\\right), \\right]');
  });
});
