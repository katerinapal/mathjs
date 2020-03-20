"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Node = _index.indexjs.expression.node.Node;
var AccessorNode = _index.indexjs.expression.node.AccessorNode;
var ConstantNode = _index.indexjs.expression.node.ConstantNode;
var SymbolNode = _index.indexjs.expression.node.SymbolNode;
var RangeNode = _index.indexjs.expression.node.RangeNode;
var ArrayNode = _index.indexjs.expression.node.ArrayNode;
var AssignmentNode = _index.indexjs.expression.node.AssignmentNode;
var OperatorNode = _index.indexjs.expression.node.OperatorNode;
var IndexNode = _index.indexjs.expression.node.IndexNode;

describe('AssignmentNode', function () {

  it('should create an AssignmentNode', function () {
    var n = new AssignmentNode(new SymbolNode('a'), new Node());
    (0, _assert2.default)(n instanceof AssignmentNode);
    (0, _assert2.default)(n instanceof Node);
    _assert2.default.equal(n.type, 'AssignmentNode');
  });

  it('should have isAssignmentNode', function () {
    var node = new AssignmentNode(new SymbolNode('a'), new Node());
    (0, _assert2.default)(node.isAssignmentNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      AssignmentNode(new SymbolNode('a'), new Node());
    }, SyntaxError);
  });

  it('should throw an error when creating an AssignmentNode with a reserved keyword', function () {
    _assert2.default.throws(function () {
      new AssignmentNode(new SymbolNode('end'), new Node());
    }, /Cannot assign to symbol "end"/);
  });

  it('should throw an error on wrong constructor arguments', function () {
    _assert2.default.throws(function () {
      new AssignmentNode();
    }, TypeError);
    _assert2.default.throws(function () {
      new AssignmentNode(new Node(), new Node());
    }, TypeError);
    _assert2.default.throws(function () {
      new AssignmentNode('a', new Node());
    }, TypeError);
    _assert2.default.throws(function () {
      new AssignmentNode(2, new Node());
    }, TypeError);
    _assert2.default.throws(function () {
      new AssignmentNode(new Node(), new Node(), new Node());
    }, TypeError);
  });

  it('should get the name of an AssignmentNode', function () {
    var n = new AssignmentNode(new SymbolNode('a'), new ConstantNode(1));
    _assert2.default.equal(n.name, 'a');

    var n2 = new AccessorNode(new SymbolNode('a'), new IndexNode([new ConstantNode('b')]));
    var n3 = new AssignmentNode(n2, new ConstantNode(1));
    _assert2.default.equal(n3.name, 'b');

    var n4 = new AssignmentNode(new SymbolNode('a'), new IndexNode([new ConstantNode('b')]), new ConstantNode(1));
    _assert2.default.equal(n4.name, 'b');

    var n5 = new AssignmentNode(new SymbolNode('a'), new IndexNode([new ConstantNode(1)]), new ConstantNode(1));
    _assert2.default.equal(n5.name, '');
  });

  it('should compile an AssignmentNode without index', function () {
    var n = new AssignmentNode(new SymbolNode('b'), new ConstantNode(3));

    var expr = n.compile();

    var scope = {};
    _assert2.default.equal(expr.eval(scope), 3);
    _assert2.default.equal(scope.b, 3);
  });

  it('should compile an AssignmentNode with property index', function () {
    var object = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode('b')]);
    var value = new ConstantNode(3);
    var n = new AssignmentNode(object, index, value);

    var expr = n.compile();

    var scope = {
      a: {}
    };
    _assert2.default.equal(expr.eval(scope), 3);
    _assert2.default.deepEqual(scope, { a: { b: 3 } });
  });

  it('should compile an AssignmentNode with nested property index', function () {
    var a = new SymbolNode('a');
    var object = new AccessorNode(a, new IndexNode([new ConstantNode('b')]));
    var index = new IndexNode([new ConstantNode('c')]);
    var value = new ConstantNode(3);
    var n = new AssignmentNode(object, index, value);

    var expr = n.compile();

    var scope = {
      a: {
        b: {}
      }
    };
    _assert2.default.equal(expr.eval(scope), 3);
    _assert2.default.deepEqual(scope, { a: { b: { c: 3 } } });
  });

  it('should compile an AssignmentNode with matrix index', function () {
    var object = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(2), new ConstantNode(1)]);
    var value = new ConstantNode(5);
    var n = new AssignmentNode(object, index, value);
    var expr = n.compile();

    var scope = {
      a: [[0, 0], [0, 0]]
    };
    _assert2.default.strictEqual(expr.eval(scope), 5);
    _assert2.default.deepEqual(scope, {
      a: [[0, 0], [5, 0]]
    });
  });

  it('should compile an AssignmentNode with range and context parameters', function () {
    var object = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(2), new RangeNode(new ConstantNode(1), new SymbolNode('end'))]);
    var value = new SymbolNode('b');
    var n = new AssignmentNode(object, index, value);
    var expr = n.compile();

    var scope = {
      a: [[0, 0], [0, 0]],
      b: [5, 6]
    };
    _assert2.default.deepEqual(expr.eval(scope), [5, 6]);
    _assert2.default.deepEqual(scope, {
      a: [[0, 0], [5, 6]],
      b: [5, 6]
    });
  });

  it('should compile an AssignmentNode with bignumber setting', function () {
    var bigmath = _index.indexjs.create({ number: 'BigNumber' });

    var object = new SymbolNode('a');
    var index = new bigmath.expression.node.IndexNode([new bigmath.expression.node.ConstantNode(2), new bigmath.expression.node.ConstantNode(1)]);
    var value = new bigmath.expression.node.ConstantNode(5);
    var n = new bigmath.expression.node.AssignmentNode(object, index, value);
    var expr = n.compile();

    var scope = {
      a: [[0, 0], [0, 0]]
    };
    _assert2.default.deepEqual(expr.eval(scope), bigmath.bignumber(5));
    _assert2.default.deepEqual(scope, {
      a: [[0, 0], [bigmath.bignumber(5), 0]]
    });
  });

  it('should throw an error when applying an index onto a scalar', function () {
    var a = new SymbolNode('a');
    var index = new IndexNode([new ConstantNode(4)]);
    var value = new ConstantNode(2);
    var n = new AssignmentNode(a, index, value);
    var expr = n.compile();

    var scope = {
      a: 42
    };
    _assert2.default.throws(function () {
      expr.eval(scope);
    }, /Cannot apply index: unsupported type of object/);
  });

  it('should filter an AssignmentNode', function () {
    var a = new SymbolNode('a');
    var b = new ConstantNode(2);
    var c = new ConstantNode(1);
    var i = new IndexNode([b, c]);
    var v = new ConstantNode(2);
    var n = new AssignmentNode(a, i, v);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isAssignmentNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isSymbolNode;
    }), [a]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isConstantNode;
    }), [b, c, v]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.value === '1';
    }), [c]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.value === '2';
    }), [b, v]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.name === 'q';
    }), []);
  });

  it('should filter an AssignmentNode without index', function () {
    var a = new SymbolNode('a');
    var v = new ConstantNode(2);
    var n = new AssignmentNode(a, v);

    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isAssignmentNode;
    }), [n]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isSymbolNode;
    }), [a]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.isConstantNode;
    }), [v]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.value === '2';
    }), [v]);
    _assert2.default.deepEqual(n.filter(function (node) {
      return node.name === 'q';
    }), []);
  });

  it('should run forEach on an AssignmentNode', function () {
    // A[1, x] = 3
    var a = new SymbolNode('A');
    var b = new ConstantNode(2);
    var c = new SymbolNode('x');
    var i = new IndexNode([b, c]);
    var v = new ConstantNode(3);
    var n = new AssignmentNode(a, i, v);

    var nodes = [];
    var paths = [];
    n.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);
    });

    _assert2.default.equal(nodes.length, 3);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], i);
    _assert2.default.strictEqual(nodes[2], v);
    _assert2.default.deepEqual(paths, ['object', 'index', 'value']);
  });

  it('should run forEach on an AssignmentNode without index', function () {
    // A[1, x] = 3
    var a = new SymbolNode('A');
    var v = new ConstantNode(3);
    var n = new AssignmentNode(a, v);

    var nodes = [];
    var paths = [];
    n.forEach(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], v);
    _assert2.default.deepEqual(paths, ['object', 'value']);
  });

  it('should map an AssignmentNode', function () {
    // A[1, x] = 3
    var a = new SymbolNode('A');
    var b = new ConstantNode(2);
    var c = new SymbolNode('x');
    var i = new IndexNode([b, c]);
    var v = new ConstantNode(3);
    var n = new AssignmentNode(a, i, v);

    var nodes = [];
    var paths = [];
    var e = new ConstantNode(4);
    var f = n.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, n);

      return node instanceof SymbolNode && node.name == 'x' ? e : node;
    });

    _assert2.default.equal(nodes.length, 3);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], i);
    _assert2.default.strictEqual(nodes[2], v);
    _assert2.default.deepEqual(paths, ['object', 'index', 'value']);

    _assert2.default.notStrictEqual(f, n);
    _assert2.default.deepEqual(f.object, a);
    _assert2.default.deepEqual(f.index.dimensions[0], b);
    _assert2.default.deepEqual(f.index.dimensions[1], c); // not replaced, is nested
    _assert2.default.deepEqual(f.value, v);
  });

  it('should map an AssignmentNode without index', function () {
    // a = x + 2
    var a = new SymbolNode('a');
    var x = new SymbolNode('x');
    var d = new AssignmentNode(a, x);

    var e = new ConstantNode(3);
    var nodes = [];
    var paths = [];
    var f = d.map(function (node, path, parent) {
      nodes.push(node);
      paths.push(path);
      _assert2.default.strictEqual(parent, d);
      return node instanceof SymbolNode && node.name == 'x' ? e : node;
    });

    _assert2.default.equal(nodes.length, 2);
    _assert2.default.strictEqual(nodes[0], a);
    _assert2.default.strictEqual(nodes[1], x);
    _assert2.default.deepEqual(paths, ['object', 'value']);

    _assert2.default.notStrictEqual(f, d);
    _assert2.default.strictEqual(d.value, x);
    _assert2.default.strictEqual(f.value, e);
  });

  it('should throw an error when the map callback does not return a node', function () {
    // A[1, x] = 3
    var a = new SymbolNode('A');
    var b = new ConstantNode(2);
    var c = new SymbolNode('x');
    var i = new IndexNode([b, c]);
    var v = new ConstantNode(3);
    var n = new AssignmentNode(a, i, v);

    _assert2.default.throws(function () {
      n.map(function () {});
    }, /Callback function must return a Node/);
  });

  it('should transform an AssignmentNodes (nested) parameters', function () {
    // a = x + 2
    var object = new SymbolNode('a');
    var x = new SymbolNode('x');
    var index = new IndexNode([x]);
    var b = new ConstantNode(2);
    var value = new OperatorNode('+', 'add', [x, b]);
    var d = new AssignmentNode(object, index, value);

    var e = new ConstantNode(3);
    var f = d.transform(function (node) {
      return node.isSymbolNode && node.name == 'x' ? e : node;
    });

    _assert2.default.notStrictEqual(f, d);
    _assert2.default.deepEqual(f.index.dimensions[0], e);
    _assert2.default.deepEqual(f.value.args[0], e);
    _assert2.default.deepEqual(f.value.args[1], b);
  });

  it('should transform an AssignmentNode itself', function () {
    // a = x + 2
    var object = new SymbolNode('a');
    var x = new SymbolNode('x');
    var b = new ConstantNode(2);
    var c = new OperatorNode('+', 'add', [x, b]);
    var d = new AssignmentNode(object, c);

    var e = new ConstantNode(5);
    var f = d.transform(function (node) {
      return node instanceof AssignmentNode ? e : node;
    });

    _assert2.default.notStrictEqual(f, d);
    _assert2.default.deepEqual(f, e);
  });

  it('should traverse an AssignmentNode', function () {
    var object = new SymbolNode('a');
    var i = new IndexNode([]);
    var value = new ConstantNode(2);
    var a = new AssignmentNode(object, i, value);

    var count = 0;
    a.traverse(function (node, index, parent) {
      count++;

      switch (count) {
        case 1:
          _assert2.default.strictEqual(node, a);
          _assert2.default.strictEqual(index, null);
          _assert2.default.strictEqual(parent, null);
          break;

        case 2:
          _assert2.default.strictEqual(node, object);
          _assert2.default.strictEqual(index, 'object');
          _assert2.default.strictEqual(parent, a);
          break;

        case 3:
          _assert2.default.strictEqual(node, i);
          _assert2.default.strictEqual(index, 'index');
          _assert2.default.strictEqual(parent, a);
          break;

        case 4:
          _assert2.default.strictEqual(node, value);
          _assert2.default.strictEqual(index, 'value');
          _assert2.default.strictEqual(parent, a);
          break;
      }
    });

    _assert2.default.equal(count, 4);
  });

  it('should clone an AssignmentNode without index', function () {
    var object = new SymbolNode('a');
    var value = new ConstantNode(2);
    var a = new AssignmentNode(object, value);

    var b = a.clone();
    (0, _assert2.default)(b instanceof AssignmentNode);
    _assert2.default.deepEqual(b, a);
    _assert2.default.notStrictEqual(b, a);
    _assert2.default.strictEqual(b.object, a.object);
    _assert2.default.strictEqual(b.index, a.index);
    _assert2.default.strictEqual(b.value, a.value);
  });

  it('should clone an AssignmentNode', function () {
    // A[1, x] = 3
    var a = new SymbolNode('A');
    var b = new ConstantNode(2);
    var c = new SymbolNode('x');
    var i = new IndexNode([b, c]);
    var v = new ConstantNode(3);
    var d = new AssignmentNode(a, i, v);

    var e = d.clone();

    (0, _assert2.default)(e instanceof AssignmentNode);
    _assert2.default.deepEqual(e, d);
    _assert2.default.notStrictEqual(e, d);
    _assert2.default.strictEqual(e.object, d.object);
    _assert2.default.strictEqual(e.index, d.index);
    _assert2.default.strictEqual(e.value, d.value);
  });

  it('should respect the \'all\' parenthesis option', function () {
    var object = new SymbolNode('a');
    var value = new ConstantNode(1);
    var n = new AssignmentNode(object, value);

    _assert2.default.equal(n.toString({ parenthesis: 'all' }), 'a = (1)');
    _assert2.default.equal(n.toTex({ parenthesis: 'all' }), ' a:=\\left(1\\right)');
  });

  it('should stringify a AssignmentNode', function () {
    var object = new SymbolNode('b');
    var value = new ConstantNode(3);
    var n = new AssignmentNode(object, value);

    _assert2.default.equal(n.toString(), 'b = 3');
  });

  it('should stringify an AssignmentNode containing an AssignmentNode', function () {
    var value = new ConstantNode(2);
    var a = new AssignmentNode(new SymbolNode('a'), value);
    var n = new AssignmentNode(new SymbolNode('b'), a);

    _assert2.default.equal(n.toString(), 'b = (a = 2)');
  });

  it('should stringify an AssignmentNode with custom toString', function () {
    //Also checks if custom funcions get passed to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'AssignmentNode') {
        return node.object.toString(options) + (node.index ? node.index.toString(options) : '') + ' equals ' + node.value.toString(options);
      } else if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var object = new SymbolNode('a');
    var value = new ConstantNode(1);
    var n = new AssignmentNode(object, value);

    _assert2.default.equal(n.toString({ handler: customFunction }), 'a equals const(1, number)');
  });

  it('should LaTeX a AssignmentNode', function () {
    var value = new ConstantNode(2);
    var a = new AssignmentNode(new SymbolNode('a'), value);

    _assert2.default.equal(a.toTex(), ' a:=2');
  });

  it('should LaTeX an AssignmentNode containing an AssignmentNode', function () {
    var value = new ConstantNode(2);
    var a = new AssignmentNode(new SymbolNode('a'), value);
    var q = new AssignmentNode(new SymbolNode('q'), a);

    _assert2.default.equal(q.toTex(), ' q:=\\left( a:=2\\right)');
  });

  it('should LaTeX an AssignmentNode with custom toTex', function () {
    //Also checks if custom funcions get passed to the children
    var customFunction = function customFunction(node, options) {
      if (node.isAssignmentNode) {
        return node.object.toTex(options) + (node.index ? node.index.toTex(options) : '') + '\\mbox{equals}' + node.value.toTex(options);
      } else if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var object = new SymbolNode('a');
    var value = new ConstantNode(1);
    var n = new AssignmentNode(object, value);

    _assert2.default.equal(n.toTex({ handler: customFunction }), ' a\\mbox{equals}const\\left(1, number\\right)');
  });
});
