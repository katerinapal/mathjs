'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;
var IndexNode = math.expression.node.IndexNode;
var RangeNode = math.expression.node.RangeNode;

describe('IndexNode', function () {

  it('should create a IndexNode', function () {
    var n = new IndexNode([]);
    (0, _assert2.default)(n instanceof IndexNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'IndexNode');
  });

  it('should have isIndexNode', function () {
    var node = new IndexNode([]);
    (0, _assert2.default)(node.isIndexNode);
  });

  it('should throw an error when calling with wrong arguments', function () {
    _assert2.default.throws(function () {
      new IndexNode();
    }, TypeError);
    _assert2.default.throws(function () {
      new IndexNode('a');
    }, TypeError);
    _assert2.default.throws(function () {
      new IndexNode(new Node());
    }, TypeError);
    _assert2.default.throws(function () {
      new IndexNode([new Node(), 3]);
    }, TypeError);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      IndexNode([]);
    }, SyntaxError);
  });

  it('should filter an IndexNode', function () {
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new IndexNode([b, c]);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof IndexNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof RangeNode;
    }), []);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode;
    }), [b, c]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '2';
    }), [b]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '4';
    }), []);
  });

  it('should filter an empty IndexNode', function () {
    var n = new IndexNode([]);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof IndexNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode;
    }), []);
  });

  it('should run forEach on an IndexNode', function () {
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new IndexNode([b, c]);

    var nodes = [];
    var paths = [];
    n.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], b);
    _assert2.default.strictEqual(nodes[1], c);
    _assert2.default.deepEqual(paths, ['dimensions[0]', 'dimensions[1]']);
  });

  it('should map an IndexNode', function () {
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new IndexNode([b, c]);

    var nodes = [];
    var paths = [];
    var e = new ConstantNode(-1);
    var f = n.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);

      return node.isConstantNode && node.value === '1' ? e : node;
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], b);
    _assert2.default.strictEqual(nodes[1], c);
    _assert2.default.deepEqual(paths, ['dimensions[0]', 'dimensions[1]']);

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.dimensions[0], b);
    _assert2.default.deepEqual(f.dimensions[1], e);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new IndexNode([b, c]);

    _assert2.default.throws(function () {
      n.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform an IndexNodes (nested) parameters', function () {
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new IndexNode([b, c]);

    var e = new SymbolNode('c');
    var f = n.transform(function (node) {
      return node.isConstantNode && node.value === '1' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.dimensions[0], b);
    _assert2.default.deepEqual(f.dimensions[1], e);
  });

  it('should transform an IndexNode itself', function () {
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new IndexNode([b, c]);

    var e = new ConstantNode(5);
    var f = n.transform(function (node) {
      return node.isIndexNode ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f, e);
  });

  it('should clone an IndexNode', function () {
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new IndexNode([b, c]);

    var d = n.clone();
    (0, _assert2.default)(d.isIndexNode);
    _assert2.default.deepEqual(d, n);
    _assert2.default.notStrictEqual(d, n);
    _assert2.default.notStrictEqual(d.dimensions, n.dimensions);
    _assert2.default.strictEqual(d.dimensions[0], n.dimensions[0]);
    _assert2.default.strictEqual(d.dimensions[1], n.dimensions[1]);
  });

  it('should stringify an IndexNode', function () {
    var dimensions = [new ConstantNode(2), new ConstantNode(1)];

    var n = new IndexNode(dimensions);
    _assert2.default.equal(n.toString(), '[2, 1]');

    var n2 = new IndexNode([]);
    _assert2.default.equal(n2.toString(), '[]');
  });

  it('should stringify an IndexNode with dot notation', function () {
    var dimensions = [new ConstantNode('a')];

    var n = new IndexNode(dimensions, true);
    _assert2.default.equal(n.toString(), '.a');
  });

  it('should stringigy an IndexNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'IndexNode') {
        return node.dimensions.map(function (range) {
          return range.toString(options);
        }).join(', ');
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var b = new ConstantNode(1);
    var c = new ConstantNode(2);

    var n = new IndexNode([b, c]);

    _assert2.default.equal(n.toString({ handler: customFunction }), 'const(1, number), const(2, number)');
  });

  it('should LaTeX an IndexNode', function () {
    var dimensions = [new ConstantNode(2), new ConstantNode(1)];

    var n = new IndexNode(dimensions);
    _assert2.default.equal(n.toTex(), '_{2,1}');

    var n2 = new IndexNode([]);
    _assert2.default.equal(n2.toTex(), '_{}');
  });

  it('should LaTeX an IndexNode with dot notation', function () {
    var dimensions = [new ConstantNode('a')];

    var n = new IndexNode(dimensions, true);
    _assert2.default.equal(n.toString(), '.a');
  });

  it('should LaTeX an IndexNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'IndexNode') {
        return node.dimensions.map(function (range) {
          return range.toTex(options);
        }).join(', ');

        return latex;
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var b = new ConstantNode(1);
    var c = new ConstantNode(2);
    var n = new IndexNode([b, c]);

    _assert2.default.equal(n.toTex({ handler: customFunction }), 'const\\left(1, number\\right), const\\left(2, number\\right)');
  });
});
