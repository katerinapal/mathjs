'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;
var FunctionNode = math.expression.node.FunctionNode;
var OperatorNode = math.expression.node.OperatorNode;
var RangeNode = math.expression.node.RangeNode;
var IndexNode = math.expression.node.IndexNode;
var AccessorNode = math.expression.node.AccessorNode;

describe('FunctionNode', function () {

  it('should create a FunctionNode', function () {
    var c = new ConstantNode(4);
    var n = new FunctionNode(new SymbolNode('sqrt'), [c]);
    (0, _assert2.default)(n instanceof FunctionNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'FunctionNode');
  });

  it('should have isFunctionNode', function () {
    var c = new ConstantNode(1);
    var node = new FunctionNode(new SymbolNode('square'), [c]);
    (0, _assert2.default)(node.isFunctionNode);
  });

  it('should throw an error when calling without new operator', function () {
    var s = new SymbolNode('sqrt');
    var c = new ConstantNode(4);
    _assert2.default.throws(function () {
      FunctionNode(s, [c]);
    }, SyntaxError);
  });

  it('should throw an error when calling with wrong arguments', function () {
    var s = new SymbolNode('sqrt');
    var c = new ConstantNode(4);
    _assert2.default.throws(function () {
      new FunctionNode(new Date(), []);
    }, TypeError);
    _assert2.default.throws(function () {
      new FunctionNode(s, [2, 3]);
    }, TypeError);
    _assert2.default.throws(function () {
      new FunctionNode(s, [c, 3]);
    }, TypeError);
  });

  it('should get the name of a FunctionNode', function () {
    var n1 = new FunctionNode(new SymbolNode('sqrt'), [new ConstantNode(4)]);
    _assert2.default.equal(n1.name, 'sqrt');

    var n = new AccessorNode(new SymbolNode('a'), new IndexNode([new ConstantNode('toString')]));
    var n2 = new FunctionNode(n, [new ConstantNode(4)]);
    _assert2.default.equal(n2.name, 'toString');

    var n3 = new FunctionNode(new OperatorNode('+', 'add', []), [new ConstantNode(4)]);
    _assert2.default.equal(n3.name, '');
  });

  it('should compile a FunctionNode', function () {
    var s = new SymbolNode('sqrt');
    var c = new ConstantNode(4);
    var n = new FunctionNode(s, [c]);

    var scope = {};
    _assert2.default.equal(n.compile().eval(scope), 2);
  });

  it('should compile a FunctionNode containing an index', function () {
    var s = new SymbolNode('foo');
    var range = [new ConstantNode('bar')];
    var i = new IndexNode(range);
    var a = new AccessorNode(s, i);
    var c = new ConstantNode(4);
    var n = new FunctionNode(a, [c]);

    var scope = {
      foo: {
        bar: function bar(x) {
          return x * x;
        }
      }
    };
    _assert2.default.equal(n.compile().eval(scope), 16);
  });

  it('should execute a FunctionNode with the right context', function () {
    var s = new SymbolNode('foo');
    var i = new IndexNode([new ConstantNode('getCount')]);
    var a = new AccessorNode(s, i);
    var c = new ConstantNode(4);
    var n = new FunctionNode(a, [c]);

    var scope = {
      foo: {
        count: 42,
        getCount: function getCount() {
          return this.count;
        }
      }
    };
    _assert2.default.equal(n.compile().eval(scope), 42);
  });

  it('should compile a FunctionNode with a raw function', function () {
    var mymath = math.create();
    function myFunction(args, _math, _scope) {
      _assert2.default.equal(args.length, 2);
      (0, _assert2.default)(args[0] instanceof mymath.expression.node.Node);
      (0, _assert2.default)(args[1] instanceof mymath.expression.node.Node);
      _assert2.default.deepEqual(_math.__proto__, mymath);
      _assert2.default.strictEqual(_scope, scope);
      return 'myFunction(' + args.join(', ') + ')';
    }
    myFunction.rawArgs = true;
    mymath.import({ myFunction: myFunction });

    var s = new SymbolNode('myFunction');
    var a = new mymath.expression.node.ConstantNode(4);
    var b = new mymath.expression.node.ConstantNode(5);
    var n = new mymath.expression.node.FunctionNode(s, [a, b]);

    var scope = {};
    _assert2.default.equal(n.compile().eval(scope), 'myFunction(4, 5)');
  });

  it('should compile a FunctionNode containing an index resolving to a function with rawArgs', function () {
    var mymath = math.create();
    function myFunction(args, _math, _scope) {
      _assert2.default.equal(args.length, 2);
      (0, _assert2.default)(args[0] instanceof mymath.expression.node.Node);
      (0, _assert2.default)(args[1] instanceof mymath.expression.node.Node);
      _assert2.default.deepEqual(_math.__proto__, mymath);
      _assert2.default.strictEqual(_scope, scope);
      return 'myFunction(' + args.join(', ') + ')';
    }
    myFunction.rawArgs = true;

    var obj = new SymbolNode('obj');
    var prop = new ConstantNode('myFunction');
    var i = new IndexNode([prop]);
    var a = new AccessorNode(obj, i);
    var b = new mymath.expression.node.ConstantNode(4);
    var c = new mymath.expression.node.ConstantNode(5);
    var n = new mymath.expression.node.FunctionNode(a, [b, c]);

    var scope = {
      obj: {
        myFunction: myFunction
      }
    };
    _assert2.default.equal(n.compile().eval(scope), 'myFunction(4, 5)');
  });

  it('should compile a FunctionNode with overloaded a raw function', function () {
    var mymath = math.create();
    function myFunction(args, _math, _scope) {
      _assert2.default.ok(false, 'should not be executed');
    }
    myFunction.rawArgs = true;
    mymath.import({ myFunction: myFunction });

    var s = new SymbolNode('myFunction');
    var a = new mymath.expression.node.ConstantNode(4);
    var b = new mymath.expression.node.ConstantNode(5);
    var n = new mymath.expression.node.FunctionNode(s, [a, b]);

    var scope = {
      myFunction: function myFunction() {
        return 42;
      }
    };
    _assert2.default.equal(n.compile().eval(scope), 42);
  });

  it('should filter a FunctionNode', function () {
    var s = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var n = new FunctionNode(s, [b, c]);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof FunctionNode;
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

  it('should run forEach on a FunctionNode', function () {
    // multiply(x + 2, x)
    var s = new SymbolNode('multiply');
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [a, b]);
    var d = new SymbolNode('x');
    var f = new FunctionNode(s, [c, d]);

    var nodes = [];
    var paths = [];
    f.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, f);
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], c);
    _assert2.default.strictEqual(nodes[1], d);
    _assert2.default.deepEqual(paths, ['args[0]', 'args[1]']);
  });

  it('should map a FunctionNode', function () {
    // multiply(x + 2, x)
    var s = new SymbolNode('multiply');
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [a, b]);
    var d = new SymbolNode('x');
    var f = new FunctionNode(s, [c, d]);

    var nodes = [];
    var paths = [];
    var g = new ConstantNode(3);
    var h = f.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, f);

      return node instanceof SymbolNode && node.name == 'x' ? g : node;
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], c);
    _assert2.default.strictEqual(nodes[1], d);
    _assert2.default.deepEqual(paths, ['args[0]', 'args[1]']);

    _assert2.default.notStrictEqual(h, f);
    _assert2.default.strictEqual(h.args[0], c);
    _assert2.default.strictEqual(h.args[0].args[0], a);
    _assert2.default.strictEqual(h.args[0].args[1], b);
    _assert2.default.equal(h.fn.name, 'multiply');
    _assert2.default.strictEqual(h.args[1], g);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var s = new SymbolNode('factorial');
    var b = new ConstantNode(2);
    var f = new FunctionNode(s, [b]);

    _assert2.default.throws(function () {
      f.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform a FunctionNodes (nested) parameters', function () {
    // multiply(x + 2, x)
    var s = new SymbolNode('multiply');
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [a, b]);
    var d = new SymbolNode('x');
    var f = new FunctionNode(s, [c, d]);

    var g = new ConstantNode(3);
    var h = f.transform(function (node) {
      return node instanceof SymbolNode && node.name == 'x' ? g : node;
    });

    _assert2.default.notStrictEqual(h, f);
    _assert2.default.deepEqual(h.args[0].args[0], g);
    _assert2.default.deepEqual(h.args[0].args[1], b);
    _assert2.default.deepEqual(h.name, 'multiply');
    _assert2.default.deepEqual(h.args[1], g);
  });

  it('should transform a FunctionNodes name', function () {
    // add(2, 3)
    var s = new SymbolNode('add');
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new FunctionNode(s, [b, c]);

    var f = d.transform(function (node) {
      if (node instanceof FunctionNode) {
        node.fn = new SymbolNode('subtract');
      }
      return node;
    });

    _assert2.default.notStrictEqual(f, d);
    _assert2.default.deepEqual(f.name, 'subtract');
  });

  it('should transform a FunctionNode itself', function () {
    // add(2, 3)
    var s = new SymbolNode('add');
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new FunctionNode(s, [b, c]);

    var e = new ConstantNode(5);
    var f = d.transform(function (node) {
      return node instanceof FunctionNode ? e : node;
    });

    _assert2.default.deepEqual(f, e);
  });

  it('should traverse a FunctionNode', function () {
    // add(2, 3)
    var s = new SymbolNode('add');
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new FunctionNode(s, [b, c]);

    var count = 0;
    d.traverse(function (node, path, parent) {
      count++;

      switch (count) {
        case 1:
          _assert2.default.strictEqual(node, d);
          _assert2.default.strictEqual(path, null);
          _assert2.default.strictEqual(parent, null);
          break;

        case 2:
          _assert2.default.strictEqual(node, b);
          _assert2.default.strictEqual(path, 'args[0]');
          _assert2.default.strictEqual(parent, d);
          break;

        case 3:
          _assert2.default.strictEqual(node, c);
          _assert2.default.strictEqual(path, 'args[1]');
          _assert2.default.strictEqual(parent, d);
          break;
      }
    });

    _assert2.default.equal(count, 3);
  });

  it('should clone a FunctionNode', function () {
    // add(2, 3)
    var s = new SymbolNode('add');
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);
    var d = new FunctionNode(s, [b, c]);

    var e = d.clone();
    (0, _assert2.default)(e instanceof FunctionNode);
    _assert2.default.deepEqual(e, d);
    _assert2.default.notStrictEqual(e, d);
    _assert2.default.equal(e.name, d.name);
    _assert2.default.notStrictEqual(e.args, d.args);
    _assert2.default.strictEqual(e.args[0], d.args[0]);
    _assert2.default.strictEqual(e.args[1], d.args[1]);
  });

  it('should stringify a FunctionNode', function () {
    var s = new SymbolNode('sqrt');
    var c = new ConstantNode(4);
    var n = new FunctionNode(s, [c]);

    _assert2.default.equal(n.toString(), 'sqrt(4)');
  });

  it('should pass options when stringifying a FunctionNode', function () {
    var s = new SymbolNode('sqrt');
    var a = new ConstantNode(2);
    var b = new SymbolNode('x');
    var c = new OperatorNode('*', 'multiply', [a, b], true); // implicit
    var n = new FunctionNode(s, [c]);

    _assert2.default.equal(n.toString(), 'sqrt(2 x)');
    var options = { implicit: 'show' };
    _assert2.default.equal(n.toString(options), 'sqrt(2 * x)');
  });

  it('should stringify a FunctionNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'FunctionNode') {
        var string = '[' + node.name + '](';
        node.args.forEach(function (arg) {
          string += arg.toString(options) + ', ';
        });
        string += ')';
        return string;
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n1 = new FunctionNode(new SymbolNode('add'), [a, b]);
    var n2 = new FunctionNode(new SymbolNode('subtract'), [a, b]);

    _assert2.default.equal(n1.toString({ handler: customFunction }), '[add](const(1, number), const(2, number), )');
    _assert2.default.equal(n2.toString({ handler: customFunction }), '[subtract](const(1, number), const(2, number), )');
  });

  it('should stringify a FunctionNode with custom toString for a single function', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = {
      'add': function add(node, options) {
        return node.args[0].toString(options) + ' ' + node.name + ' ' + node.args[1].toString(options);
      }
    };

    var s = new SymbolNode('add');
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var n = new FunctionNode(s, [a, b]);

    _assert2.default.equal(n.toString({ handler: customFunction }), '1 add 2');
  });

  it('should LaTeX a FunctionNode', function () {
    var s = new SymbolNode('sqrt');
    var c1 = new ConstantNode(4);
    var c2 = new ConstantNode(5);
    var n = new FunctionNode(s, [c1]);
    _assert2.default.equal(n.toTex(), '\\sqrt{4}');

    // test permutations
    var n2 = new FunctionNode(new SymbolNode('permutations'), [c1]);
    _assert2.default.equal(n2.toTex(), '\\mathrm{permutations}\\left(4\\right)');

    var o = new OperatorNode('+', 'add', [c1, c2]);
    var n3 = new FunctionNode(new SymbolNode('permutations'), [o]);
    _assert2.default.equal(n3.toTex(), '\\mathrm{permutations}\\left(4+5\\right)');
  });

  it('should have an identifier', function () {
    var s = new SymbolNode('factorial');
    var a = new ConstantNode(2);
    var n = new FunctionNode(s, [a]);

    _assert2.default.equal(n.getIdentifier(), 'FunctionNode:factorial');
  });

  it('should LaTeX a FunctionNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'FunctionNode') {
        var latex = '\\mbox{' + node.name + '}\\left(';
        node.args.forEach(function (arg) {
          latex += arg.toTex(options) + ', ';
        });
        latex += '\\right)';
        return latex;
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n1 = new FunctionNode(new SymbolNode('add'), [a, b]);
    var n2 = new FunctionNode(new SymbolNode('subtract'), [a, b]);

    _assert2.default.equal(n1.toTex({ handler: customFunction }), '\\mbox{add}\\left(const\\left(1, number\\right), const\\left(2, number\\right), \\right)');
    _assert2.default.equal(n2.toTex({ handler: customFunction }), '\\mbox{subtract}\\left(const\\left(1, number\\right), const\\left(2, number\\right), \\right)');
  });

  it('should LaTeX a FunctionNode with custom toTex for a single function', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = {
      'add': function add(node, options) {
        return node.args[0].toTex(options) + ' ' + node.name + ' ' + node.args[1].toTex(options);
      }
    };

    var s = new SymbolNode('add');
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var n = new FunctionNode(s, [a, b]);

    _assert2.default.equal(n.toTex({ handler: customFunction }), '1 add 2');
  });

  it('should LaTeX a FunctionNode with callback attached to the function', function () {
    var customMath = math.create();
    customMath.add.toTex = function (node, options) {
      return node.args[0].toTex(options) + ' plus ' + node.args[1].toTex(options);
    };

    _assert2.default.equal(customMath.parse('add(1,2)').toTex(), '1 plus 2');
  });

  it('should LaTeX a FunctionNode with template string attached to the function', function () {
    var customMath = math.create();
    customMath.add.toTex = '${args[0]} plus ${args[1]}';

    _assert2.default.equal(customMath.parse('add(1,2)').toTex(), '1 plus 2');
  });

  it('should LaTeX a FunctionNode with object of callbacks attached to the function', function () {
    var customMath = math.create();
    customMath.sum.toTex = {
      2: "${args[0]}+${args[1]}",
      3: function _(node, options) {
        return node.args[0] + '+' + node.args[1] + '+' + node.args[2];
      }
    };

    _assert2.default.equal(customMath.parse('sum(1,2)').toTex(), '1+2');
    _assert2.default.equal(customMath.parse('sum(1,2,3)').toTex(), '1+2+3');
  });

  it('should LaTeX templates with string properties', function () {
    var customMath = math.create();
    customMath.add.toTex = '${name}';

    _assert2.default.equal(customMath.parse('add(1,2)').toTex(), 'add');
  });

  it('should LaTeX templates with node properties', function () {
    var customMath = math.create();
    customMath.add.toTex = '${args[0]} plus ${args[1]}';

    _assert2.default.equal(customMath.parse('add(1,2)').toTex(), '1 plus 2');
  });

  it('should LaTeX templates with properties that are arrays of Nodes', function () {
    var customMath = math.create();
    customMath.add.toTex = '${args}';

    _assert2.default.equal(customMath.parse('add(1,2)').toTex(), '1,2');
  });

  it('should throw an Error for templates with properties that don\'t exist', function () {
    var customMath = math.create();
    customMath.add.toTex = '${some_property}';

    _assert2.default.throws(function () {
      customMath.parse('add(1,2)').toTex();
    }, ReferenceError);
  });

  it('should throw an Error for templates with properties that aren\'t Nodes or Strings or Arrays of Nodes', function () {
    var customMath = math.create();
    customMath.add.toTex = '${some_property}';
    var tree = customMath.parse('add(1,2)');

    tree.some_property = {};
    _assert2.default.throws(function () {
      tree.toTex();
    }, TypeError);

    customMath.add.prototype.some_property = 1;
    tree.some_property = 1;
    _assert2.default.throws(function () {
      tree.toTex();
    }, TypeError);
  });

  it('should throw an Error for templates with properties that are arrays of non Nodes', function () {
    var customMath = math.create();
    customMath.add.toTex = '${some_property}';
    var tree = customMath.parse('add(1,2)');
    tree.some_property = [1, 2];

    _assert2.default.throws(function () {
      tree.toTex();
    }, TypeError);
  });
});
