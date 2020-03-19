'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;
var RangeNode = math.expression.node.RangeNode;
var AssignmentNode = math.expression.node.AssignmentNode;
var OperatorNode = math.expression.node.OperatorNode;
var BlockNode = math.expression.node.BlockNode;
var ResultSet = math.type.ResultSet;

describe('BlockNode', function () {

  it('should create a BlockNode', function () {
    var n = new BlockNode([]);
    (0, _assert2.default)(n instanceof BlockNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'BlockNode');
  });

  it('should have isBlockNode', function () {
    var node = new BlockNode([]);
    (0, _assert2.default)(node.isBlockNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      BlockNode();
    }, SyntaxError);
  });

  it('should throw an error when adding invalid blocks', function () {
    _assert2.default.throws(function () {
      new BlockNode();
    }, /Array expected/);
    _assert2.default.throws(function () {
      new BlockNode([2]);
    }, /Property "node" must be a Node/);
    _assert2.default.throws(function () {
      new BlockNode([{ node: 2, visible: true }]);
    }, /Property "node" must be a Node/);
    _assert2.default.throws(function () {
      new BlockNode([{ node: new Node(), visible: 2 }]);
    }, /Property "visible" must be a boolean/);
  });

  it('should compile and evaluate a BlockNode', function () {
    var n = new BlockNode([{
      node: new ConstantNode(5),
      visible: true
    }, {
      node: new AssignmentNode(new SymbolNode('foo'), new ConstantNode(3)),
      visible: false
    }, {
      node: new SymbolNode('foo'),
      visible: true
    }]);

    var scope = {};
    _assert2.default.deepEqual(n.compile().eval(scope), new ResultSet([5, 3]));
    _assert2.default.deepEqual(scope, { foo: 3 });
  });

  it('expressions should be visible by default', function () {
    var n = new BlockNode([{ node: new ConstantNode(5) }]);

    _assert2.default.deepEqual(n.compile().eval(), new ResultSet([5]));
  });

  it('should filter a BlockNode', function () {
    var a = new ConstantNode(5);
    var b2 = new ConstantNode(3);
    var foo = new SymbolNode('foo');
    var b = new AssignmentNode(foo, b2);
    var c = new SymbolNode('foo');
    var d = new BlockNode([{ node: a, visible: true }, { node: b, visible: false }, { node: c, visible: true }]);

    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof BlockNode;
    }), [d]);
    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof SymbolNode;
    }), [foo, c]);
    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof RangeNode;
    }), []);
    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof ConstantNode;
    }), [a, b2]);
    _assert2.default.deepEqual(d.filter(function (node) {
      return node instanceof ConstantNode && node.value == '3';
    }), [b2]);
  });

  it('should run forEach on a BlockNode', function () {
    // [x, 2]
    var x = new SymbolNode('x');
    var two = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [two, x]);
    var a = new BlockNode([{ node: x }, { node: c }]);

    var nodes = [];
    var paths = [];
    a.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, a);
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], x);
    _assert2.default.strictEqual(nodes[1], c);
    _assert2.default.deepEqual(paths, ['blocks[0].node', 'blocks[1].node']);
  });

  it('should map a BlockNode', function () {
    // [x, 2]
    var x = new SymbolNode('x');
    var two = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [two, x]);
    var a = new BlockNode([{ node: x }, { node: c }]);

    var nodes = [];
    var paths = [];
    var d = new ConstantNode(3);
    var e = a.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, a);
      return node instanceof SymbolNode && node.name == 'x' ? d : node;
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], x);
    _assert2.default.strictEqual(nodes[1], c);
    _assert2.default.deepEqual(paths, ['blocks[0].node', 'blocks[1].node']);

    _assert2.default.notStrictEqual(e, a);
    _assert2.default.strictEqual(e.blocks[0].node, d);
    _assert2.default.strictEqual(e.blocks[1].node, c);

    // should not touch nested nodes
    _assert2.default.strictEqual(e.blocks[1].node.args[0], two);
    _assert2.default.strictEqual(e.blocks[1].node.args[1], x);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var x = new SymbolNode('x');
    var two = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [two, x]);
    var a = new BlockNode([{ node: x }, { node: c }]);

    _assert2.default.throws(function () {
      a.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform a BlockNodes parameters', function () {
    // [x, 2]
    var b = new SymbolNode('x');
    var c = new ConstantNode(2);
    var a = new BlockNode([{ node: b }, { node: c }]);

    var d = new ConstantNode(3);
    var e = a.transform(function (node) {
      return node instanceof SymbolNode && node.name == 'x' ? d : node;
    });

    _assert2.default.notStrictEqual(e, a);
    _assert2.default.deepEqual(e.blocks[0].node, d);
    _assert2.default.deepEqual(e.blocks[1].node, c);
  });

  it('should transform a BlockNode itself', function () {
    // [x, 2]
    var a = new BlockNode([]);

    var d = new ConstantNode(3);
    var e = a.transform(function (node) {
      return node instanceof BlockNode ? d : node;
    });

    _assert2.default.notStrictEqual(e, a);
    _assert2.default.deepEqual(e, d);
  });

  it('should traverse a BlockNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new BlockNode([{ node: a, visible: true }, { node: b, visible: true }]);

    var count = 0;
    c.traverse(function (node, index, parent) {
      count++;

      switch (count) {
        case 1:
          _assert2.default.strictEqual(node, c);
          _assert2.default.strictEqual(index, null);
          _assert2.default.strictEqual(parent, null);
          break;

        case 2:
          _assert2.default.strictEqual(node, a);
          _assert2.default.strictEqual(index, 'blocks[0].node');
          _assert2.default.strictEqual(parent, c);
          break;

        case 3:
          _assert2.default.strictEqual(node, b);
          _assert2.default.strictEqual(index, 'blocks[1].node');
          _assert2.default.strictEqual(parent, c);
          break;
      }
    });

    _assert2.default.equal(count, 3);
  });

  it('should clone a BlockNode', function () {
    // [x, 2]
    var b = new SymbolNode('x');
    var c = new ConstantNode(2);
    var a = new BlockNode([{ node: b }, { node: c }]);

    var d = a.clone();
    (0, _assert2.default)(d instanceof BlockNode);
    _assert2.default.deepEqual(a, d);
    _assert2.default.notStrictEqual(a, d);
    _assert2.default.notStrictEqual(a.blocks, d.blocks);
    _assert2.default.notStrictEqual(a.blocks[0], d.blocks[0]);
    _assert2.default.notStrictEqual(a.blocks[1], d.blocks[1]);
    _assert2.default.strictEqual(a.blocks[0].node, d.blocks[0].node);
    _assert2.default.strictEqual(a.blocks[1].node, d.blocks[1].node);
  });

  it('should stringify a BlockNode', function () {
    var n = new BlockNode([{ node: new ConstantNode(5), visible: true }, { node: new AssignmentNode(new SymbolNode('foo'), new ConstantNode(3)), visible: false }, { node: new SymbolNode('foo'), visible: true }]);

    _assert2.default.equal(n.toString(), '5\nfoo = 3;\nfoo');
  });

  it('should stringify a BlockNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'BlockNode') {
        var string = '';
        node.blocks.forEach(function (block) {
          string += block.node.toString(options) + '; ';
        });

        return string;
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n = new BlockNode([{ node: a }, { node: b }]);

    _assert2.default.equal(n.toString({ handler: customFunction }), 'const(1, number); const(2, number); ');
  });

  it('should LaTeX a BlockNode', function () {
    var n = new BlockNode([{ node: new ConstantNode(5), visible: true }, { node: new AssignmentNode(new SymbolNode('foo'), new ConstantNode(3)), visible: false }, { node: new SymbolNode('foo'), visible: true }]);

    _assert2.default.equal(n.toTex(), '5\\;\\;\n foo:=3;\\;\\;\n foo');
  });

  it('should LaTeX a BlockNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'BlockNode') {
        var latex = '';
        node.blocks.forEach(function (block) {
          latex += block.node.toTex(options) + '; ';
        });

        return latex;
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n = new BlockNode([{ node: a }, { node: b }]);

    _assert2.default.equal(n.toTex({ handler: customFunction }), 'const\\left(1, number\\right); const\\left(2, number\\right); ');
  });
});
