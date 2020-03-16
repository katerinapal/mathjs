'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;
var OperatorNode = math.expression.node.OperatorNode;
var ConditionalNode = math.expression.node.ConditionalNode;

describe('OperatorNode', function () {

  it('should create an OperatorNode', function () {
    var n = new OperatorNode('op', 'fn', []);
    (0, _assert2.default)(n instanceof OperatorNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'OperatorNode');
  });

  it('should have isOperatorNode', function () {
    var node = new OperatorNode('op', 'fn', []);
    (0, _assert2.default)(node.isOperatorNode);
  });

  it('should throw an error when calling without new operator', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    _assert2.default.throws(function () {
      OperatorNode('+', 'add', [a, b]);
    }, SyntaxError);
  });

  it('should compile an OperatorNode', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new OperatorNode('+', 'add', [a, b]);

    var expr = n.compile();

    _assert2.default.equal(expr.eval(), 5);
  });

  it('should throw an error in case of unresolved operator function', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new OperatorNode('***', 'foo', [a, b]);

    _assert2.default.throws(function () {
      n.compile();
    }, /Function foo missing in provided namespace/);
  });

  it('should filter an OperatorNode', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var n = new OperatorNode('+', 'add', [a, b]);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof OperatorNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof SymbolNode;
    }), []);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode;
    }), [a, b]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '2';
    }), [a]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof ConstantNode && node.value == '4';
    }), []);
  });

  it('should filter an OperatorNode without contents', function () {
    var n = new OperatorNode('op', 'fn', []);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof OperatorNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node instanceof SymbolNode;
    }), []);
  });

  it('should run forEach on an OperatorNode', function () {
    // x^2-x
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('^', 'pow', [a, b]);
    var d = new SymbolNode('x');
    var e = new OperatorNode('-', 'subtract', [c, d]);

    var nodes = [];
    var paths = [];
    e.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, e);
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], c);
    _assert2.default.strictEqual(nodes[1], d);
    _assert2.default.deepEqual(paths, ['args[0]', 'args[1]']);
  });

  it('should map an OperatorNode', function () {
    // x^2-x
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('^', 'pow', [a, b]);
    var d = new SymbolNode('x');
    var e = new OperatorNode('-', 'subtract', [c, d]);

    var nodes = [];
    var paths = [];
    var f = new ConstantNode(3);
    var g = e.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, e);

      return node instanceof SymbolNode && node.name == 'x' ? f : node;
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], c);
    _assert2.default.strictEqual(nodes[1], d);
    _assert2.default.deepEqual(paths, ['args[0]', 'args[1]']);

    _assert2.default.notStrictEqual(g, e);
    _assert2.default.strictEqual(g.args[0], e.args[0]);
    _assert2.default.strictEqual(g.args[0].args[0], a); // nested x is not replaced
    _assert2.default.deepEqual(g.args[0].args[1], b);
    _assert2.default.deepEqual(g.args[1], f);
  });

  it('should throw an error when the map callback does not return a node', function () {
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('^', 'pow', [a, b]);

    _assert2.default.throws(function () {
      c.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform an OperatorNodes parameters', function () {
    // x^2-x
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('^', 'pow', [a, b]);
    var d = new SymbolNode('x');
    var e = new OperatorNode('-', 'subtract', [c, d]);

    var f = new ConstantNode(3);
    var g = e.transform(function (node) {
      return node instanceof SymbolNode && node.name == 'x' ? f : node;
    });

    _assert2.default.deepEqual(g.args[1], f);
  });

  it('should transform an OperatorNode itself', function () {
    // x^2-x
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [a, b]);

    var f = new ConstantNode(3);
    var g = c.transform(function (node) {
      return node instanceof OperatorNode ? f : node;
    });

    _assert2.default.notStrictEqual(g, c);
    _assert2.default.deepEqual(g, f);
  });

  it('should clone an OperatorNode', function () {
    // x^2-x
    var a = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [a, b]);

    var d = c.clone();
    (0, _assert2.default)(d instanceof OperatorNode);
    _assert2.default.deepEqual(d, c);
    _assert2.default.notStrictEqual(d, c);
    _assert2.default.notStrictEqual(d.args, c.args);
    _assert2.default.strictEqual(d.args[0], c.args[0]);
    _assert2.default.strictEqual(d.args[1], c.args[1]);
  });

  describe('toString', function () {
    it('should stringify an OperatorNode', function () {
      var a = new ConstantNode(2);
      var b = new ConstantNode(3);
      var c = new ConstantNode(4);

      var n = new OperatorNode('+', 'add', [a, b]);
      _assert2.default.equal(n.toString(), '2 + 3');
    });

    it('should stringify an OperatorNode with factorial', function () {
      var a = new ConstantNode(2);
      var n = new OperatorNode('!', 'factorial', [a]);
      _assert2.default.equal(n.toString(), '2!');
    });

    it('should stringify an OperatorNode with unary minus', function () {
      var a = new ConstantNode(2);
      var n = new OperatorNode('-', 'unaryMinus', [a]);
      _assert2.default.equal(n.toString(), '-2');
    });

    it('should stringify an OperatorNode with zero arguments', function () {
      var n = new OperatorNode('foo', 'foo', []);
      _assert2.default.equal(n.toString(), 'foo()');
    });

    it('should stringify an OperatorNode with more than two operators', function () {
      var a = new ConstantNode(2);
      var b = new ConstantNode(3);
      var c = new ConstantNode(4);

      var n = new OperatorNode('foo', 'foo', [a, b, c]);
      _assert2.default.equal(n.toString(), 'foo(2, 3, 4)');
    });

    it('should stringify an OperatorNode with nested operator nodes', function () {
      var a = new ConstantNode(2);
      var b = new ConstantNode(3);
      var c = new ConstantNode(4);
      var d = new ConstantNode(5);

      var n1 = new OperatorNode('+', 'add', [a, b]);
      var n2 = new OperatorNode('-', 'subtract', [c, d]);
      var n3 = new OperatorNode('*', 'multiply', [n1, n2]);

      _assert2.default.equal(n1.toString(), '2 + 3');
      _assert2.default.equal(n2.toString(), '4 - 5');
      _assert2.default.equal(n3.toString(), '(2 + 3) * (4 - 5)');
    });

    it('should stringify left associative OperatorNodes that are associative with another Node', function () {
      _assert2.default.equal(math.parse('(a+b)+c').toString({ parenthesis: 'auto' }), 'a + b + c');
      _assert2.default.equal(math.parse('a+(b+c)').toString({ parenthesis: 'auto' }), 'a + b + c');
      _assert2.default.equal(math.parse('(a+b)-c').toString({ parenthesis: 'auto' }), 'a + b - c');
      _assert2.default.equal(math.parse('a+(b-c)').toString({ parenthesis: 'auto' }), 'a + b - c');

      _assert2.default.equal(math.parse('(a*b)*c').toString({ parenthesis: 'auto' }), 'a * b * c');
      _assert2.default.equal(math.parse('a*(b*c)').toString({ parenthesis: 'auto' }), 'a * b * c');
      _assert2.default.equal(math.parse('(a*b)/c').toString({ parenthesis: 'auto' }), 'a * b / c');
      _assert2.default.equal(math.parse('a*(b/c)').toString({ parenthesis: 'auto' }), 'a * b / c');
    });

    it('should stringify left associative OperatorNodes that are not associative with another Node', function () {
      _assert2.default.equal(math.parse('(a-b)-c').toString({ parenthesis: 'auto' }), 'a - b - c');
      _assert2.default.equal(math.parse('a-(b-c)').toString({ parenthesis: 'auto' }), 'a - (b - c)');
      _assert2.default.equal(math.parse('(a-b)+c').toString({ parenthesis: 'auto' }), 'a - b + c');
      _assert2.default.equal(math.parse('a-(b+c)').toString({ parenthesis: 'auto' }), 'a - (b + c)');

      _assert2.default.equal(math.parse('(a/b)/c').toString({ parenthesis: 'auto' }), 'a / b / c');
      _assert2.default.equal(math.parse('a/(b/c)').toString({ parenthesis: 'auto' }), 'a / (b / c)');
      _assert2.default.equal(math.parse('(a/b)*c').toString({ parenthesis: 'auto' }), 'a / b * c');
      _assert2.default.equal(math.parse('a/(b*c)').toString({ parenthesis: 'auto' }), 'a / (b * c)');
    });

    it('should stringify right associative OperatorNodes that are not associative with another Node', function () {
      _assert2.default.equal(math.parse('(a^b)^c').toString({ parenthesis: 'auto' }), '(a ^ b) ^ c');
      _assert2.default.equal(math.parse('a^(b^c)').toString({ parenthesis: 'auto' }), 'a ^ b ^ c');
    });

    it('should stringify unary OperatorNodes containing a binary OperatorNode', function () {
      _assert2.default.equal(math.parse('(a*b)!').toString(), '(a * b)!');
      _assert2.default.equal(math.parse('-(a*b)').toString(), '-(a * b)');
      _assert2.default.equal(math.parse('-(a+b)').toString(), '-(a + b)');
    });

    it('should stringify unary OperatorNodes containing a unary OperatorNode', function () {
      _assert2.default.equal(math.parse('(-a)!').toString({ parenthesis: 'auto' }), '(-a)!');
      _assert2.default.equal(math.parse('-(a!)').toString({ parenthesis: 'auto' }), '-a!');
      _assert2.default.equal(math.parse('-(-a)').toString({ parenthesis: 'auto' }), '-(-a)');
    });
  });

  it('should stringify an OperatorNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'OperatorNode') {
        return node.op + node.fn + '(' + node.args[0].toString(options) + ', ' + node.args[1].toString(options) + ')';
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n1 = new OperatorNode('+', 'add', [a, b]);
    var n2 = new OperatorNode('-', 'subtract', [a, b]);

    _assert2.default.equal(n1.toString({ handler: customFunction }), '+add(const(1, number), const(2, number))');
    _assert2.default.equal(n2.toString({ handler: customFunction }), '-subtract(const(1, number), const(2, number))');
  });

  it('should stringify an OperatorNode with custom toString for a single operator', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'OperatorNode' && node.fn === 'add') {
        return node.args[0].toString(options) + node.op + node.fn + node.op + node.args[1].toString(options);
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n = new OperatorNode('+', 'add', [a, b]);

    _assert2.default.equal(n.toString({ handler: customFunction }), 'const(1, number)+add+const(2, number)');
  });

  it('should respect the \'all\' parenthesis option', function () {
    _assert2.default.equal(math.parse('1+1+1').toString({ parenthesis: 'all' }), '(1 + 1) + 1');
    _assert2.default.equal(math.parse('1+1+1').toTex({ parenthesis: 'all' }), '\\left(1+1\\right)+1');
  });

  it('should correctly LaTeX fractions in \'all\' parenthesis mode', function () {
    _assert2.default.equal(math.parse('1/2/3').toTex({ parenthesis: 'all' }), '\\frac{\\left(\\frac{1}{2}\\right)}{3}');
  });

  it('should LaTeX an OperatorNode', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var c = new ConstantNode(4);

    var n = new OperatorNode('+', 'add', [a, b]);
    _assert2.default.equal(n.toTex(), '2+3');
  });

  it('should LaTeX an OperatorNode with factorial', function () {
    var a = new ConstantNode(2);
    var n = new OperatorNode('!', 'factorial', [a]);
    _assert2.default.equal(n.toTex(), '2!');
  });

  it('should LaTeX an OperatorNode with factorial of an OperatorNode', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);

    var sub = new OperatorNode('-', 'subtract', [a, b]);
    var add = new OperatorNode('+', 'add', [a, b]);
    var mult = new OperatorNode('*', 'multiply', [a, b]);
    var div = new OperatorNode('/', 'divide', [a, b]);

    var n1 = new OperatorNode('!', 'factorial', [sub]);
    var n2 = new OperatorNode('!', 'factorial', [add]);
    var n3 = new OperatorNode('!', 'factorial', [mult]);
    var n4 = new OperatorNode('!', 'factorial', [div]);
    _assert2.default.equal(n1.toTex(), '\\left(2-3\\right)!');
    _assert2.default.equal(n2.toTex(), '\\left(2+3\\right)!');
    _assert2.default.equal(n3.toTex(), '\\left(2\\cdot3\\right)!');
    _assert2.default.equal(n4.toTex(), '\\frac{2}{3}!');
  });

  it('should LaTeX an OperatorNode with unary minus', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);

    var sub = new OperatorNode('-', 'subtract', [a, b]);
    var add = new OperatorNode('+', 'add', [a, b]);

    var n1 = new OperatorNode('-', 'unaryMinus', [a]);
    var n2 = new OperatorNode('-', 'unaryMinus', [sub]);
    var n3 = new OperatorNode('-', 'unaryMinus', [add]);

    _assert2.default.equal(n1.toTex(), '-2');
    _assert2.default.equal(n2.toTex(), '-\\left(2-3\\right)');
    _assert2.default.equal(n3.toTex(), '-\\left(2+3\\right)');
  });

  it('should LaTeX an OperatorNode that subtracts an OperatorNode', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);
    var c = new ConstantNode(3);

    var sub = new OperatorNode('-', 'subtract', [b, c]);
    var add = new OperatorNode('+', 'add', [b, c]);

    var n1 = new OperatorNode('-', 'subtract', [a, sub]);
    var n2 = new OperatorNode('-', 'subtract', [a, add]);

    _assert2.default.equal(n1.toTex(), '1-\\left(2-3\\right)');
    _assert2.default.equal(n2.toTex(), '1-\\left(2+3\\right)');
  });

  it('should LaTeX an OperatorNode with zero arguments', function () {
    var n = new OperatorNode('foo', 'foo', []);
    _assert2.default.equal(n.toTex(), '\\mathrm{foo}\\left(\\right)');
  });

  it('should LaTeX an OperatorNode with more than two operators', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var c = new ConstantNode(4);

    var n = new OperatorNode('foo', 'foo', [a, b, c]);
    _assert2.default.equal(n.toTex(), '\\mathrm{foo}\\left(2,3,4\\right)');
  });

  it('should LaTeX an OperatorNode with nested operator nodes', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var c = new ConstantNode(4);
    var d = new ConstantNode(5);

    var n1 = new OperatorNode('+', 'add', [a, b]);
    var n2 = new OperatorNode('-', 'subtract', [c, d]);
    var n3 = new OperatorNode('*', 'multiply', [n1, n2]);

    var m2 = new OperatorNode('*', 'multiply', [n1, c]);
    var m3 = new OperatorNode('-', 'subtract', [m2, d]);

    _assert2.default.equal(n1.toTex(), '2+3');
    _assert2.default.equal(n2.toTex(), '4-5');
    _assert2.default.equal(n3.toTex(), '\\left(2+3\\right)\\cdot\\left(4-5\\right)');
    _assert2.default.equal(m3.toTex(), '\\left(2+3\\right)\\cdot4-5');
  });

  it('should LaTeX fractions with operators that are enclosed in parenthesis', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var add = new OperatorNode('+', 'add', [a, a]);
    var frac = new OperatorNode('/', 'divide', [add, b]);
    _assert2.default.equal(frac.toTex(), '\\frac{1+1}{2}');
  });

  it('should have an identifier', function () {
    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n = new OperatorNode('+', 'add', [a, b]);

    _assert2.default.equal(n.getIdentifier(), 'OperatorNode:add');
  });

  it('should LaTeX an OperatorNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'OperatorNode') {
        return node.op + node.fn + '(' + node.args[0].toTex(options) + ', ' + node.args[1].toTex(options) + ')';
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n1 = new OperatorNode('+', 'add', [a, b]);
    var n2 = new OperatorNode('-', 'subtract', [a, b]);

    _assert2.default.equal(n1.toTex({ handler: customFunction }), '+add(const\\left(1, number\\right), const\\left(2, number\\right))');
    _assert2.default.equal(n2.toTex({ handler: customFunction }), '-subtract(const\\left(1, number\\right), const\\left(2, number\\right))');
  });

  it('should LaTeX an OperatorNode with custom toTex for a single operator', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'OperatorNode' && node.fn === 'add') {
        return node.args[0].toTex(options) + node.op + node.fn + node.op + node.args[1].toTex(options);
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var a = new ConstantNode(1);
    var b = new ConstantNode(2);

    var n = new OperatorNode('+', 'add', [a, b]);

    _assert2.default.equal(n.toTex({ handler: customFunction }), 'const\\left(1, number\\right)+add+const\\left(2, number\\right)');
  });

  it('should LaTeX powers of fractions with parentheses', function () {
    var a = new ConstantNode(1);
    var frac = new OperatorNode('/', 'divide', [a, a]);
    var pow = new OperatorNode('^', 'pow', [frac, a]);

    _assert2.default.equal(pow.toTex(), '\\left({\\frac{1}{1}}\\right)^{1}');
  });

  it('should LaTeX powers of conditions with parentheses', function () {
    var a = new ConstantNode(1);
    var cond = new ConditionalNode(a, a, a);
    var pow = new OperatorNode('^', 'pow', [cond, a]);

    _assert2.default.equal(pow.toTex(), '\\left({\\begin{cases} {1}, &\\quad{\\text{if }\\;1}\\\\{1}, &\\quad{\\text{otherwise}}\\end{cases}}\\right)^{1}');
  });

  it('should LaTeX simple expressions in \'auto\' mode', function () {
    //this covers a bug that was triggered previously
    _assert2.default.equal(math.parse('1+(1+1)').toTex({ parenthesis: 'auto' }), '1+1+1');
  });

  it('should stringify implicit multiplications', function () {
    var a = math.parse('4a');
    var b = math.parse('4 a');
    var c = math.parse('a b');
    var d = math.parse('2a b');
    var e = math.parse('a b c');
    var f = math.parse('(2+3)a');
    var g = math.parse('(2+3)2');
    var h = math.parse('2(3+4)');

    _assert2.default.equal(a.toString(), a.toString({ implicit: 'hide' }));
    _assert2.default.equal(a.toString({ implicit: 'hide' }), '4 a');
    _assert2.default.equal(a.toString({ implicit: 'show' }), '4 * a');

    _assert2.default.equal(b.toString(), b.toString({ implicit: 'hide' }));
    _assert2.default.equal(b.toString({ implicit: 'hide' }), '4 a');
    _assert2.default.equal(b.toString({ implicit: 'show' }), '4 * a');

    _assert2.default.equal(c.toString(), c.toString({ implicit: 'hide' }));
    _assert2.default.equal(c.toString({ implicit: 'hide' }), 'a b');
    _assert2.default.equal(c.toString({ implicit: 'show' }), 'a * b');

    _assert2.default.equal(d.toString(), d.toString({ implicit: 'hide' }));
    _assert2.default.equal(d.toString({ implicit: 'hide' }), '2 a b');
    _assert2.default.equal(d.toString({ implicit: 'show' }), '2 * a * b');

    _assert2.default.equal(e.toString(), e.toString({ implicit: 'hide' }));
    _assert2.default.equal(e.toString({ implicit: 'hide' }), 'a b c');
    _assert2.default.equal(e.toString({ implicit: 'show' }), 'a * b * c');

    _assert2.default.equal(f.toString(), f.toString({ implicit: 'hide' }));
    _assert2.default.equal(f.toString({ implicit: 'hide' }), '(2 + 3) a');
    _assert2.default.equal(f.toString({ implicit: 'show' }), '(2 + 3) * a');

    _assert2.default.equal(g.toString(), g.toString({ implicit: 'hide' }));
    _assert2.default.equal(g.toString({ implicit: 'hide' }), '(2 + 3) 2');
    _assert2.default.equal(g.toString({ implicit: 'show' }), '(2 + 3) * 2');

    _assert2.default.equal(h.toString(), h.toString({ implicit: 'hide' }));
    _assert2.default.equal(h.toString({ implicit: 'hide' }), '2 (3 + 4)');
    _assert2.default.equal(h.toString({ implicit: 'show' }), '2 * (3 + 4)');
  });

  it('should LaTeX implicit multiplications', function () {
    var a = math.parse('4a');
    var b = math.parse('4 a');
    var c = math.parse('a b');
    var d = math.parse('2a b');
    var e = math.parse('a b c');
    var f = math.parse('(2+3)a');
    var g = math.parse('(2+3)2');
    var h = math.parse('2(3+4)');

    _assert2.default.equal(a.toTex(), a.toTex({ implicit: 'hide' }));
    _assert2.default.equal(a.toTex({ implicit: 'hide' }), '4~ a');
    _assert2.default.equal(a.toTex({ implicit: 'show' }), '4\\cdot a');

    _assert2.default.equal(b.toTex(), b.toTex({ implicit: 'hide' }));
    _assert2.default.equal(b.toTex({ implicit: 'hide' }), '4~ a');
    _assert2.default.equal(b.toTex({ implicit: 'show' }), '4\\cdot a');

    _assert2.default.equal(c.toTex(), c.toTex({ implicit: 'hide' }));
    _assert2.default.equal(c.toTex({ implicit: 'hide' }), ' a~\\mathrm{b}');
    _assert2.default.equal(c.toTex({ implicit: 'show' }), ' a\\cdot\\mathrm{b}');

    _assert2.default.equal(d.toTex(), d.toTex({ implicit: 'hide' }));
    _assert2.default.equal(d.toTex({ implicit: 'hide' }), '2~ a~\\mathrm{b}');
    _assert2.default.equal(d.toTex({ implicit: 'show' }), '2\\cdot a\\cdot\\mathrm{b}');

    _assert2.default.equal(e.toTex(), e.toTex({ implicit: 'hide' }));
    _assert2.default.equal(e.toTex({ implicit: 'hide' }), ' a~\\mathrm{b}~ c');
    _assert2.default.equal(e.toTex({ implicit: 'show' }), ' a\\cdot\\mathrm{b}\\cdot c');

    _assert2.default.equal(f.toTex(), f.toTex({ implicit: 'hide' }));
    _assert2.default.equal(f.toTex({ implicit: 'hide' }), '\\left(2+3\\right)~ a');
    _assert2.default.equal(f.toTex({ implicit: 'show' }), '\\left(2+3\\right)\\cdot a');

    _assert2.default.equal(g.toTex(), g.toTex({ implicit: 'hide' }));
    _assert2.default.equal(g.toTex({ implicit: 'hide' }), '\\left(2+3\\right)~2');
    _assert2.default.equal(g.toTex({ implicit: 'show' }), '\\left(2+3\\right)\\cdot2');

    _assert2.default.equal(h.toTex(), h.toTex({ implicit: 'hide' }));
    _assert2.default.equal(h.toTex({ implicit: 'hide' }), '2~\\left(3+4\\right)');
    _assert2.default.equal(h.toTex({ implicit: 'show' }), '2\\cdot\\left(3+4\\right)');
  });
});
