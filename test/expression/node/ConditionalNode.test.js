'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;
var AssignmentNode = math.expression.node.AssignmentNode;
var ConditionalNode = math.expression.node.ConditionalNode;

describe('ConditionalNode', function () {
  var condition = new ConstantNode(true);
  var zero = new ConstantNode(0);
  var one = new ConstantNode(1);
  var two = new ConstantNode(2);
  var three = new ConstantNode(3);
  var a = new AssignmentNode(new SymbolNode('a'), two);
  var b = new AssignmentNode(new SymbolNode('b'), three);

  it('should create a ConditionalNode', function () {
    var n = new ConditionalNode(condition, a, b);
    (0, _assert2.default)(n instanceof ConditionalNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'ConditionalNode');
  });

  it('should have isConditionalNode', function () {
    var node = new ConditionalNode(condition, a, b);
    (0, _assert2.default)(node.isConditionalNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      ConditionalNode();
    }, SyntaxError);
  });

  it('should throw an error when creating without arguments', function () {
    _assert2.default.throws(function () {
      new ConditionalNode();
    }, TypeError);
    _assert2.default.throws(function () {
      new ConditionalNode(condition);
    }, TypeError);
    _assert2.default.throws(function () {
      new ConditionalNode(condition, a);
    }, TypeError);
    _assert2.default.throws(function () {
      new ConditionalNode(condition, null, b);
    }, TypeError);
  });

  it('should lazy evaluate a ConditionalNode', function () {
    var n = new ConditionalNode(condition, a, b);
    var expr = n.compile();
    var scope = {};
    _assert2.default.equal(expr.eval(scope), 2);
    _assert2.default.deepEqual(scope, { a: 2 });
  });

  describe('evaluate', function () {
    var condition = new ConditionalNode(new SymbolNode('a'), one, zero);

    it('should evaluate boolean conditions', function () {
      _assert2.default.equal(condition.compile().eval({ a: true }), 1);
      _assert2.default.equal(condition.compile().eval({ a: false }), 0);
    });

    it('should evaluate number conditions', function () {
      _assert2.default.equal(condition.compile().eval({ a: 1 }), 1);
      _assert2.default.equal(condition.compile().eval({ a: 4 }), 1);
      _assert2.default.equal(condition.compile().eval({ a: -1 }), 1);
      _assert2.default.equal(condition.compile().eval({ a: 0 }), 0);
    });

    it('should evaluate bignumber conditions', function () {
      _assert2.default.equal(condition.compile().eval({ a: math.bignumber(1) }), 1);
      _assert2.default.equal(condition.compile().eval({ a: math.bignumber(4) }), 1);
      _assert2.default.equal(condition.compile().eval({ a: math.bignumber(-1) }), 1);
      _assert2.default.equal(condition.compile().eval({ a: math.bignumber(0) }), 0);
    });

    it('should evaluate complex number conditions', function () {
      _assert2.default.equal(condition.compile().eval({ a: math.complex(2, 3) }), 1);
      _assert2.default.equal(condition.compile().eval({ a: math.complex(2, 0) }), 1);
      _assert2.default.equal(condition.compile().eval({ a: math.complex(0, 3) }), 1);
      _assert2.default.equal(condition.compile().eval({ a: math.complex(0, 0) }), 0);
    });

    it('should evaluate string conditions', function () {
      _assert2.default.equal(condition.compile().eval({ a: 'hello' }), 1);
      _assert2.default.equal(condition.compile().eval({ a: '' }), 0);
    });

    it('should evaluate unit conditions', function () {
      _assert2.default.equal(condition.compile().eval({ a: math.unit('5cm') }), 1);
      _assert2.default.equal(condition.compile().eval({ a: math.unit('0 inch') }), 0);
      _assert2.default.equal(condition.compile().eval({ a: math.unit('meter') }), 0);
    });

    it('should evaluate null conditions', function () {
      _assert2.default.equal(condition.compile().eval({ a: null }), 0);
    });

    it('should evaluate undefined conditions', function () {
      _assert2.default.equal(condition.compile().eval({ a: undefined }), 0);
    });

    it('should throw an error in case of unsupported type of conditions', function () {
      _assert2.default.throws(function () {
        condition.compile().eval({ a: {} });
      });
      _assert2.default.throws(function () {
        condition.compile().eval({ a: [] });
      });
      _assert2.default.throws(function () {
        condition.compile().eval({ a: math.matrix() });
      });
    });
  });

  it('should filter a ConditionalNode', function () {
    var n = new ConditionalNode(condition, a, b);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConditionalNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode;
    }), [condition, two, three]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '2';
    }), [two]);
  });

  it('should run forEach on a ConditionalNode', function () {
    var condition = new ConstantNode(1);
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new ConditionalNode(condition, a, b);

    var nodes = [];
    var paths = [];
    n.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);
    });

    _assert2.default.equal(nodes.length, 3);
    _assert2.default.strictEqual(nodes[0], condition);
    _assert2.default.strictEqual(nodes[1], a);
    _assert2.default.strictEqual(nodes[2], b);
    _assert2.default.deepEqual(paths, ['condition', 'trueExpr', 'falseExpr']);
  });

  it('should map a ConditionalNode', function () {
    var condition = new ConstantNode(1);
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new ConditionalNode(condition, a, b);

    var nodes = [];
    var paths = [];
    var e = new ConstantNode(4);
    var f = n.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);

      return node instanceof ConstantNode && node.value == '1' ? e : node;
    });

    _assert2.default.equal(nodes.length, 3);
    _assert2.default.strictEqual(nodes[0], condition);
    _assert2.default.strictEqual(nodes[1], a);
    _assert2.default.strictEqual(nodes[2], b);
    _assert2.default.deepEqual(paths, ['condition', 'trueExpr', 'falseExpr']);

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.strictEqual(f.condition, e);
    _assert2.default.strictEqual(f.trueExpr, a);
    _assert2.default.strictEqual(f.falseExpr, b);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var condition = new ConstantNode(1);
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new ConditionalNode(condition, a, b);

    _assert2.default.throws(function () {
      n.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform a ConditionalNodes condition', function () {
    var condition = new ConstantNode(1);
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new ConditionalNode(condition, a, b);

    var e = new ConstantNode(4);
    var f = n.transform(function (node) {
      return node instanceof ConstantNode && node.value == '1' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.condition, e);
    _assert2.default.deepEqual(f.trueExpr, a);
    _assert2.default.deepEqual(f.falseExpr, b);
  });

  it('should transform a ConditionalNodes trueExpr', function () {
    var condition = new ConstantNode(1);
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new ConditionalNode(condition, a, b);

    var e = new ConstantNode(4);
    var f = n.transform(function (node) {
      return node instanceof ConstantNode && node.value == '2' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.condition, condition);
    _assert2.default.deepEqual(f.trueExpr, e);
    _assert2.default.deepEqual(f.falseExpr, b);
  });

  it('should transform a ConditionalNodes falseExpr', function () {
    var condition = new ConstantNode(1);
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new ConditionalNode(condition, a, b);

    var e = new ConstantNode(4);
    var f = n.transform(function (node) {
      return node instanceof ConstantNode && node.value == '3' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.condition, condition);
    _assert2.default.deepEqual(f.trueExpr, a);
    _assert2.default.deepEqual(f.falseExpr, e);
  });

  it('should transform a ConditionalNode itself', function () {
    var condition = new ConstantNode(1);
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new ConditionalNode(condition, a, b);

    var e = new ConstantNode(5);
    var f = n.transform(function (node) {
      return node instanceof ConditionalNode ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f, e);
  });

  it('should clone a ConditionalNode itself', function () {
    var condition = new ConstantNode(1);
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var c = new ConditionalNode(condition, a, b);

    var d = c.clone();

    (0, _assert2.default)(d instanceof ConditionalNode);
    _assert2.default.deepEqual(d, c);
    _assert2.default.notStrictEqual(d, c);
    _assert2.default.strictEqual(d.condition, c.condition);
    _assert2.default.strictEqual(d.trueExpr, c.trueExpr);
    _assert2.default.strictEqual(d.falseExpr, c.falseExpr);
  });

  it('should respect the \'all\' parenthesis option', function () {
    _assert2.default.equal(math.parse('a?b:c').toString({ parenthesis: 'all' }), '(a) ? (b) : (c)');
  });

  it('should stringify a ConditionalNode', function () {
    var n = new ConditionalNode(condition, a, b);

    _assert2.default.equal(n.toString(), 'true ? (a = 2) : (b = 3)');
  });

  it('should stringify a ConditionalNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ConditionalNode') {
        return 'if ' + node.condition.toString(options) + ' then ' + node.trueExpr.toString(options) + ' else ' + node.falseExpr.toString(options);
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);

    var n = new ConditionalNode(a, b, c);

    _assert2.default.equal(n.toString({ handler: customFunction }), 'if const(1, number) then const(2, number) else const(3, number)');
  });

  it('should LaTeX a ConditionalNode', function () {
    var n = new ConditionalNode(condition, a, b);

    // note that b is enclosed in \\mathrm{...} since it's a unit
    _assert2.default.equal(n.toTex(), '\\begin{cases} { a:=2}, &\\quad{\\text{if }\\;true}\\\\{\\mathrm{b}:=3}, &\\quad{\\text{otherwise}}\\end{cases}');
  });

  it('should LaTeX a ConditionalNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ConditionalNode') {
        return 'if ' + node.condition.toTex(options) + ' then ' + node.trueExpr.toTex(options) + ' else ' + node.falseExpr.toTex(options);
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);

    var n = new ConditionalNode(a, b, c);

    _assert2.default.equal(n.toTex({ handler: customFunction }), 'if const\\left(1, number\\right) then const\\left(2, number\\right) else const\\left(3, number\\right)');
  });
});
