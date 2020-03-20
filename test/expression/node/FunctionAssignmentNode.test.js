"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node = _index.indexjs.expression.node.Node;
var ConstantNode = _index.indexjs.expression.node.ConstantNode;
var SymbolNode = _index.indexjs.expression.node.SymbolNode;
var AssignmentNode = _index.indexjs.expression.node.AssignmentNode;
var ConditionalNode = _index.indexjs.expression.node.ConditionalNode;
var OperatorNode = _index.indexjs.expression.node.OperatorNode;
var FunctionNode = _index.indexjs.expression.node.FunctionNode;
var FunctionAssignmentNode = _index.indexjs.expression.node.FunctionAssignmentNode;
var RangeNode = _index.indexjs.expression.node.RangeNode;

describe('FunctionAssignmentNode', function () {

  it('should create a FunctionAssignmentNode', function () {
    var n = new FunctionAssignmentNode('f', ['x'], new ConstantNode(2));
    (0, _assert2.default)(n instanceof FunctionAssignmentNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'FunctionAssignmentNode');
  });

  it('should have isFunctionAssignmentNode', function () {
    var node = new FunctionAssignmentNode('f', ['x'], new ConstantNode(2));
    (0, _assert2.default)(node.isFunctionAssignmentNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      FunctionAssignmentNode('f', ['x'], new ConstantNode(2));
    }, SyntaxError);
  });

  it('should throw an error on wrong constructor arguments', function () {
    _assert2.default.throws(function () {
      new FunctionAssignmentNode();
    }, TypeError);
    _assert2.default.throws(function () {
      new FunctionAssignmentNode('a');
    }, TypeError);
    _assert2.default.throws(function () {
      new FunctionAssignmentNode('a', ['x']);
    }, TypeError);
    _assert2.default.throws(function () {
      new FunctionAssignmentNode(null, ['x'], new ConstantNode(2));
    }, TypeError);
  });

  it('should compile a FunctionAssignmentNode', function () {
    var a = new ConstantNode(2);
    var x = new SymbolNode('x');
    var o = new OperatorNode('+', 'add', [a, x]);
    var n = new FunctionAssignmentNode('f', ['x'], o);

    var expr = n.compile();
    var scope = {};
    var f = expr.eval(scope);
    _assert2.default.equal(_typeof(scope.f), 'function');
    _assert2.default.equal(scope.f(3), 5);
    _assert2.default.equal(scope.f(5), 7);
  });

  it('should compile a typed FunctionAssignmentNode', function () {
    var a = new ConstantNode(2);
    var x = new SymbolNode('x');
    var o = new OperatorNode('+', 'add', [a, x]);
    var n = new FunctionAssignmentNode('f', [{ name: 'x', type: 'number' }], o);

    var expr = n.compile();
    var scope = {};
    var f = expr.eval(scope);
    _assert2.default.equal(_typeof(scope.f), 'function');
    _assert2.default.equal(scope.f(3), 5);
    _assert2.default.equal(scope.f(5), 7);
    _assert2.default.throws(function () {
      scope.f(new Date());
    }, /Unexpected type of argument in function f/);
    _assert2.default.throws(function () {
      scope.f(2, 2);
    }, /Too many arguments in function f/);
    _assert2.default.throws(function () {
      scope.f();
    }, /Too few arguments in function f/);
  });

  it('should eval a recursive FunctionAssignmentNode', function () {
    var x = new SymbolNode('x');
    var one = new ConstantNode(1);
    var condition = new OperatorNode('<=', 'smallerEq', [x, one]);
    var truePart = one;
    var falsePart = new OperatorNode('*', 'multiply', [x, new FunctionNode(new SymbolNode('factorial'), [new OperatorNode('-', 'subtract', [x, one])])]);
    var n1 = new ConditionalNode(condition, truePart, falsePart);

    var n2 = new FunctionAssignmentNode('factorial', ['x'], n1);

    var expr = n2.compile();
    var scope = {};
    var factorial = expr.eval(scope);
    _assert2.default.equal(_typeof(scope.factorial), 'function');
    _assert2.default.equal(factorial(3), 6);
    _assert2.default.equal(factorial(5), 120);
  });

  it('should eval a recursive FunctionAssignmentNode with two recursive calls', function () {
    var x = new SymbolNode('x');
    var zero = new ConstantNode(0);
    var one = new ConstantNode(1);
    var two = new ConstantNode(2);

    var n1 = new ConditionalNode(new OperatorNode('<=', 'smallerEq', [x, zero]), zero, new ConditionalNode(new OperatorNode('<=', 'smallerEq', [x, two]), one, new OperatorNode('+', 'add', [new FunctionNode(new SymbolNode('fib'), [new OperatorNode('-', 'subtract', [x, one])]), new FunctionNode(new SymbolNode('fib'), [new OperatorNode('-', 'subtract', [x, two])])])));

    var n2 = new FunctionAssignmentNode('fib', ['x'], n1);
    //var n2 = math.parse('fib(x) = (x <= 0) ? 0 : ((x <= 2) ? 1 : (fib(x - 1) + f(fib - 2)))');

    var expr = n2.compile();
    var scope = {};
    var fib = expr.eval(scope);

    _assert2.default.equal(typeof fib === "undefined" ? "undefined" : _typeof(fib), 'function');
    _assert2.default.equal(fib(0), 0);
    _assert2.default.equal(fib(1), 1);
    _assert2.default.equal(fib(2), 1);
    _assert2.default.equal(fib(3), 2);
    _assert2.default.equal(fib(4), 3);
    _assert2.default.equal(fib(5), 5);
    _assert2.default.equal(fib(6), 8);
    _assert2.default.equal(fib(7), 13);
    _assert2.default.equal(fib(8), 21);
  });

  it('should filter a FunctionAssignmentNode', function () {
    var a = new ConstantNode(2);
    var x = new SymbolNode('x');
    var o = new OperatorNode('+', 'add', [a, x]);
    var n = new FunctionAssignmentNode('f', ['x'], o);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof FunctionAssignmentNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof SymbolNode;
    }), [x]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof RangeNode;
    }), []);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode;
    }), [a]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '2';
    }), [a]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '4';
    }), []);
  });

  it('should throw an error when creating a FunctionAssignmentNode with a reserved keyword', function () {
    _assert2.default.throws(function () {
      new FunctionAssignmentNode('end', ['x'], new ConstantNode(2));
    }, /Illegal function name/);
  });

  it('should filter a FunctionAssignmentNode without expression', function () {
    var e = new FunctionAssignmentNode('f', ['x'], new ConstantNode(2));

    _assert2.default.deepEqual(e.filter(function (node) {
      return node instanceof FunctionAssignmentNode;
    }), [e]);
    _assert2.default.deepEqual(e.filter(function (node) {
      return node instanceof SymbolNode;
    }), []);
  });

  it('should run forEach on a FunctionAssignmentNode', function () {
    var a = new ConstantNode(2);
    var n = new FunctionAssignmentNode('f', ['x'], a);

    var nodes = [];
    var paths = [];
    n.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);
    });

    _assert2.default.equal(nodes.length, 1);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.deepEqual(paths, ['expr']);
  });

  it('should map a FunctionAssignmentNode', function () {
    var a = new ConstantNode(2);
    var n = new FunctionAssignmentNode('f', ['x'], a);

    var nodes = [];
    var paths = [];
    var e = new ConstantNode(3);
    var f = n.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);

      return node instanceof SymbolNode && node.name == 'x' ? e : node;
    });

    _assert2.default.equal(nodes.length, 1);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.deepEqual(paths, ['expr']);

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.expr, a);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var a = new ConstantNode(2);
    var n = new FunctionAssignmentNode('f', ['x'], a);

    _assert2.default.throws(function () {
      n.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform a FunctionAssignmentNodes (nested) parameters', function () {
    // f(x) = 2 + x
    var a = new ConstantNode(2);
    var x = new SymbolNode('x');
    var c = new OperatorNode('+', 'add', [a, x]);
    var n = new FunctionAssignmentNode('f', ['x'], c);

    var e = new ConstantNode(3);
    var f = n.transform(function (node) {
      return node instanceof SymbolNode && node.name == 'x' ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.expr.args[0], a);
    _assert2.default.deepEqual(f.expr.args[1], e);
  });

  it('should transform a FunctionAssignmentNode itself', function () {
    // f(x) = 2 + x
    var a = new ConstantNode(2);
    var x = new SymbolNode('x');
    var c = new OperatorNode('+', 'add', [a, x]);
    var n = new FunctionAssignmentNode('f', ['x'], c);

    var e = new ConstantNode(5);
    var f = n.transform(function (node) {
      return node instanceof FunctionAssignmentNode ? e : node;
    });

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f, e);
  });

  it('should clone a FunctionAssignmentNode', function () {
    // f(x) = 2 + x
    var a = new ConstantNode(2);
    var x = new SymbolNode('x');
    var c = new OperatorNode('+', 'add', [a, x]);
    var d = new FunctionAssignmentNode('f', ['x'], c);

    var e = d.clone();
    (0, _assert2.default)(e instanceof FunctionAssignmentNode);
    _assert2.default.deepEqual(e, d);
    _assert2.default.notStrictEqual(e, d);
    _assert2.default.strictEqual(e.expr, d.expr);
  });

  it('should respect the \'all\' parenthesis option', function () {
    var expr = _index.indexjs.parse('f(x)=x+1');
    _assert2.default.equal(expr.toString({ parenthesis: 'all' }), 'function f(x) = (x + 1)');
    _assert2.default.equal(expr.toTex({ parenthesis: 'all' }), '\\mathrm{f}\\left(x\\right):=\\left( x+1\\right)');
  });

  it('should stringify a FunctionAssignmentNode', function () {
    var a = new ConstantNode(2);
    var x = new SymbolNode('x');
    var o = new OperatorNode('+', 'add', [a, x]);
    var n = new FunctionAssignmentNode('f', ['x'], o);

    _assert2.default.equal(n.toString(), 'function f(x) = 2 + x');
  });

  it('should stringify a FunctionAssignmentNode conataining an AssignmentNode', function () {
    var a = new ConstantNode(2);

    var n1 = new AssignmentNode(new SymbolNode('a'), a);
    var n = new FunctionAssignmentNode('f', ['x'], n1);

    _assert2.default.equal(n.toString(), 'function f(x) = (a = 2)');
  });

  it('should stringify a FunctionAssignmentNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'FunctionAssignmentNode') {
        var string = '[' + node.name + '](';
        node.params.forEach(function (param) {
          string += param + ', ';
        });

        string += ')=' + node.expr.toString(options);
        return string;
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);

    var n = new FunctionAssignmentNode('func', ['x'], a);

    _assert2.default.equal(n.toString({ handler: customFunction }), '[func](x, )=const(1, number)');
  });

  it('should LaTeX a FunctionAssignmentNode', function () {
    var a = new ConstantNode(2);
    var x = new SymbolNode('x');
    var o = new OperatorNode('/', 'divide', [x, a]);
    var p = new OperatorNode('^', 'pow', [o, a]);
    var n = new FunctionAssignmentNode('f', ['x'], p);

    _assert2.default.equal(n.toTex(), '\\mathrm{f}\\left(x\\right):=\\left({\\frac{ x}{2}}\\right)^{2}');
  });

  it('should LaTeX a FunctionAssignmentNode containing an AssignmentNode', function () {
    var a = new ConstantNode(2);

    var n1 = new AssignmentNode(new SymbolNode('a'), a);
    var n = new FunctionAssignmentNode('f', ['x'], n1);

    _assert2.default.equal(n.toTex(), '\\mathrm{f}\\left(x\\right):=\\left( a:=2\\right)');
  });

  it('should LaTeX a FunctionAssignmentNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'FunctionAssignmentNode') {
        var latex = '\\mbox{' + node.name + '}\\left(';
        node.params.forEach(function (param) {
          latex += param + ', ';
        });

        latex += '\\right)=' + node.expr.toTex(options);
        return latex;
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);

    var n = new FunctionAssignmentNode('func', ['x'], a);

    _assert2.default.equal(n.toTex({ handler: customFunction }), '\\mbox{func}\\left(x, \\right)=const\\left(1, number\\right)');
  });
});
