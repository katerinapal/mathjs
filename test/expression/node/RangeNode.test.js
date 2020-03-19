'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;
var RangeNode = math.expression.node.RangeNode;
var OperatorNode = math.expression.node.OperatorNode;

describe('RangeNode', function () {

  it('should create a RangeNode', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var n = new RangeNode(start, end);
    (0, _assert2.default)(n instanceof RangeNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'RangeNode');
  });

  it('should have isRangeNode', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var node = new RangeNode(start, end);

    (0, _assert2.default)(node.isRangeNode);
  });

  it('should throw an error when calling without new operator', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    _assert2.default.throws(function () {
      RangeNode([start, end]);
    }, SyntaxError);
  });

  it('should throw an error creating a RangeNode with wrong number or type of arguments', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);

    _assert2.default.throws(function () {
      new RangeNode();
    }, TypeError);
    _assert2.default.throws(function () {
      new RangeNode(start);
    }, TypeError);
    _assert2.default.throws(function () {
      new RangeNode([]);
    }, TypeError);
    _assert2.default.throws(function () {
      new RangeNode(start, end, start, end);
    }, Error);
    _assert2.default.throws(function () {
      new RangeNode(0, 10);
    }, TypeError);
  });

  it('should compile a RangeNode', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    var expr = n.compile();
    _assert2.default.deepEqual(expr.eval(), math.matrix([0, 2, 4, 6, 8, 10]));
  });

  it('should filter a RangeNode', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof RangeNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof SymbolNode;
    }), []);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode;
    }), [start, end, step]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '2';
    }), [step]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '4';
    }), []);
  });

  it('should run forEach on a RangeNode', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    var nodes = [];
    var paths = [];
    n.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);
    });

    _assert2.default.equal(nodes.length, 3);
    _assert2.default.strictEqual(nodes[0], start);
    _assert2.default.strictEqual(nodes[1], end);
    _assert2.default.strictEqual(nodes[2], step);
    _assert2.default.deepEqual(paths, ['start', 'end', 'step']);
  });

  it('should map a RangeNode', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    var nodes = [];
    var paths = [];
    var e = new ConstantNode(3);
    var f = n.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);

      return node instanceof ConstantNode && node.value == '0' ? e : node;
    });

    _assert2.default.equal(nodes.length, 3);
    _assert2.default.strictEqual(nodes[0], start);
    _assert2.default.strictEqual(nodes[1], end);
    _assert2.default.strictEqual(nodes[2], step);
    _assert2.default.deepEqual(paths, ['start', 'end', 'step']);

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.start, e);
    _assert2.default.deepEqual(f.end, end);
    _assert2.default.deepEqual(f.step, step);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    _assert2.default.throws(function () {
      n.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform a RangeNodes start', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    var e = new ConstantNode(3);
    var f = n.transform(function (node) {
      return node instanceof ConstantNode && node.value == '0' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.start, e);
    _assert2.default.deepEqual(f.end, end);
    _assert2.default.deepEqual(f.step, step);
  });

  it('should transform a RangeNodes end', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    var e = new ConstantNode(3);
    var f = n.transform(function (node) {
      return node instanceof ConstantNode && node.value == '10' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.start, start);
    _assert2.default.deepEqual(f.end, e);
    _assert2.default.deepEqual(f.step, step);
  });

  it('should transform a RangeNodes step', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    var e = new ConstantNode(3);
    var f = n.transform(function (node) {
      return node instanceof ConstantNode && node.value == '2' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.start, start);
    _assert2.default.deepEqual(f.end, end);
    _assert2.default.deepEqual(f.step, e);
  });

  it('should transform a RangeNodes without step', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var n = new RangeNode(start, end);

    var e = new ConstantNode(3);
    var f = n.transform(function (node) {
      return node instanceof ConstantNode && node.value == '10' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.start, start);
    _assert2.default.deepEqual(f.end, e);
  });

  it('should transform a RangeNode itself', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    var e = new ConstantNode(5);
    var f = n.transform(function (node) {
      return node instanceof RangeNode ? e : node;
    });

    _assert2.default.deepEqual(f, e);
  });

  it('should clone a RangeNode', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var c = new RangeNode(start, end, step);

    var d = c.clone();

    _assert2.default.deepEqual(d, c);
    _assert2.default.notStrictEqual(d, c);
    _assert2.default.strictEqual(d.start, c.start);
    _assert2.default.strictEqual(d.end, c.end);
    _assert2.default.strictEqual(d.step, c.step);
  });

  it('should clone a RangeNode without step', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var c = new RangeNode(start, end);

    var d = c.clone();

    (0, _assert2.default)(d instanceof RangeNode);
    _assert2.default.deepEqual(d, c);
    _assert2.default.notStrictEqual(d, c);
    _assert2.default.strictEqual(d.start, c.start);
    _assert2.default.strictEqual(d.end, c.end);
    _assert2.default.strictEqual(d.step, c.step);
    _assert2.default.strictEqual(d.step, null);
  });

  it('should stringify a RangeNode without step', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var n = new RangeNode(start, end);

    _assert2.default.equal(n.toString(), '0:10');
  });

  it('should stringify a RangeNode with step', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    _assert2.default.equal(n.toString(), '0:2:10');
  });

  it('should stringify a RangeNode with an OperatorNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var o1 = new OperatorNode('+', 'add', [a, b]);
    var o2 = new OperatorNode('<', 'smaller', [a, b]);

    var n = new RangeNode(o1, o1, o2);

    _assert2.default.equal(n.toString(), '1 + 2:(1 < 2):1 + 2');
  });

  it('should stringify a RangeNode with a RangeNode', function () {
    var start1 = new ConstantNode(0);
    var end1 = new ConstantNode(10);
    var step2 = new ConstantNode(2);
    var end2 = new ConstantNode(100);

    var start2 = new RangeNode(start1, end1);
    var n = new RangeNode(start2, end2, step2);

    _assert2.default.equal(n.toString(), '(0:10):2:100');
  });

  it('should stringify a RangeNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'RangeNode') {
        return 'from ' + node.start.toString(options) + ' to ' + node.end.toString(options) + ' with steps of ' + node.step.toString(options);
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);

    var n = new RangeNode(a, b, c);

    _assert2.default.equal(n.toString({ handler: customFunction }), 'from const(1, number) to const(2, number) with steps of const(3, number)');
  });

  it('should respect the \'all\' parenthesis option', function () {
    _assert2.default.equal(math.parse('1:2:3').toString({ parenthesis: 'all' }), '(1):(2):(3)');
    _assert2.default.equal(math.parse('1:2:3').toTex({ parenthesis: 'all' }), '\\left(1\\right):\\left(2\\right):\\left(3\\right)');
  });

  it('should LaTeX a RangeNode without step', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var n = new RangeNode(start, end);

    _assert2.default.equal(n.toTex(), '0:10');
  });

  it('should LaTeX a RangeNode with step', function () {
    var start = new ConstantNode(0);
    var end = new ConstantNode(10);
    var step = new ConstantNode(2);
    var n = new RangeNode(start, end, step);

    _assert2.default.equal(n.toTex(), '0:2:10');
  });

  it('should LaTeX a RangeNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'RangeNode') {
        return 'from ' + node.start.toTex(options) + ' to ' + node.end.toTex(options) + ' with steps of ' + node.step.toTex(options);
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);

    var n = new RangeNode(a, b, c);

    _assert2.default.equal(n.toTex({ handler: customFunction }), 'from const\\left(1, number\\right) to const\\left(2, number\\right) with steps of const\\left(3, number\\right)');
  });
});
