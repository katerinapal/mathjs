"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

var index_obj = _interopRequireWildcard(_index);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx');
var math = require('../../../index');
var bigmath = index_obj.create({ number: 'BigNumber' });
var Node = math.expression.node.Node;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;

describe('ConstantNode', function () {

  it('should create a ConstantNode with value type', function () {
    var a = new ConstantNode('3', 'number');
    (0, _assert2.default)(a instanceof Node);
    _assert2.default.equal(a.type, 'ConstantNode');
  });

  it('should create a ConstantNode without value type', function () {
    var a = new ConstantNode(3);
    (0, _assert2.default)(a instanceof Node);
    _assert2.default.equal(a.type, 'ConstantNode');
    // TODO: extensively test each of the supported types

    _assert2.default.deepEqual(new ConstantNode(3), new ConstantNode('3', 'number'));
    _assert2.default.deepEqual(new ConstantNode('hello'), new ConstantNode('hello', 'string'));
    _assert2.default.deepEqual(new ConstantNode(true), new ConstantNode('true', 'boolean'));
    _assert2.default.deepEqual(new ConstantNode(false), new ConstantNode('false', 'boolean'));
    _assert2.default.deepEqual(new ConstantNode(null), new ConstantNode('null', 'null'));
    _assert2.default.deepEqual(new ConstantNode(undefined), new ConstantNode('undefined', 'undefined'));
  });

  it('should have isConstantNode', function () {
    var node = new ConstantNode(1);
    (0, _assert2.default)(node.isConstantNode);
  });

  it('should throw an error when calling without new operator', function () {
    _assert2.default.throws(function () {
      ConstantNode('3', 'number');
    }, SyntaxError);
  });

  it('should throw an error in case of wrong construction arguments', function () {
    _assert2.default.throws(function () {
      new ConstantNode(3, 'number');
    }, TypeError);
    _assert2.default.throws(function () {
      new ConstantNode(new Date());
    }, TypeError);
    _assert2.default.throws(function () {
      new ConstantNode('3', Number);
    }, TypeError);
  });

  it('should throw an error in case of unknown type of constant', function () {
    _assert2.default.throws(function () {
      new ConstantNode('3', 'bla').compile();
    }, TypeError);
  });

  it('should compile a ConstantNode', function () {
    var expr = new ConstantNode('2.3', 'number').compile();
    _assert2.default.strictEqual(expr.eval(), 2.3);

    expr = new ConstantNode('002.3', 'number').compile();
    _assert2.default.strictEqual(expr.eval(), 2.3);

    expr = new ConstantNode('hello', 'string').compile();
    _assert2.default.strictEqual(expr.eval(), 'hello');

    expr = new ConstantNode('true', 'boolean').compile();
    _assert2.default.strictEqual(expr.eval(), true);

    expr = new ConstantNode('undefined', 'undefined').compile();
    _assert2.default.strictEqual(expr.eval(), undefined);

    expr = new ConstantNode('null', 'null').compile();
    _assert2.default.strictEqual(expr.eval(), null);
  });

  it('should compile a ConstantNode with bigmath', function () {
    var expr = new index_obj.expression.node.ConstantNode('2.3', 'number').compile();
    _assert2.default.deepEqual(expr.eval(), new index_obj.type.BigNumber(2.3));
  });

  it('should find a ConstantNode', function () {
    var a = new ConstantNode('2', 'number');
    _assert2.default.deepEqual(a.filter(function (node) {
      return node instanceof ConstantNode;
    }), [a]);
    _assert2.default.deepEqual(a.filter(function (node) {
      return node instanceof SymbolNode;
    }), []);
  });

  it('should run forEach on a ConstantNode', function () {
    var a = new ConstantNode(2);
    a.forEach(function () {
      _assert2.default.ok(false, 'should not execute, constant has no childs');
    });
  });

  it('should map a ConstantNode', function () {
    var a = new ConstantNode(2);
    var b = a.map(function () {
      _assert2.default.ok(false, 'should not execute, constant has no childs');
    });

    _assert2.default.notStrictEqual(b, a);
    _assert2.default.deepEqual(b, a);
  });

  it('should transform a ConstantNode', function () {
    var a = new ConstantNode(2);
    var b = new ConstantNode(3);
    var c = a.transform(function (node) {
      return node instanceof ConstantNode && node.value == '2' ? b : node;
    });
    _assert2.default.deepEqual(c, b);

    // no match should leave the node as is
    var d = a.transform(function (node) {
      return node instanceof ConstantNode && node.value == '99' ? b : node;
    });
    _assert2.default.notStrictEqual(d, a);
    _assert2.default.deepEqual(d, a);
  });

  it('should clone a ConstantNode', function () {
    var a = new ConstantNode(2);
    var b = a.clone();

    (0, _assert2.default)(b instanceof ConstantNode);
    _assert2.default.deepEqual(a, b);
    _assert2.default.notStrictEqual(a, b);
    _assert2.default.equal(a.value, b.value);
    _assert2.default.equal(a.valueType, b.valueType);
  });

  it('should stringify a ConstantNode', function () {
    _assert2.default.equal(new ConstantNode('3', 'number').toString(), '3');
    _assert2.default.deepEqual(new ConstantNode('3', 'number').toString(), '3');
    _assert2.default.equal(new ConstantNode('hi', 'string').toString(), '"hi"');
    _assert2.default.equal(new ConstantNode('true', 'boolean').toString(), 'true');
    _assert2.default.equal(new ConstantNode('false', 'boolean').toString(), 'false');
    _assert2.default.equal(new ConstantNode('undefined', 'undefined').toString(), 'undefined');
    _assert2.default.equal(new ConstantNode('null', 'null').toString(), 'null');
  });

  it('should stringify a ConstantNode with custom toString', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ConstantNode') {
        return 'const(' + node.value + ', ' + node.valueType + ')';
      }
    };

    var n = new ConstantNode(1);

    _assert2.default.equal(n.toString({ handler: customFunction }), 'const(1, number)');
  });

  it('should LaTeX a ConstantNode', function () {
    _assert2.default.equal(new ConstantNode('3', 'number').toTex(), '3');
    _assert2.default.deepEqual(new ConstantNode('3', 'number').toTex(), '3');
    _assert2.default.equal(new ConstantNode('hi', 'string').toTex(), '\\mathtt{"hi"}');
    _assert2.default.equal(new ConstantNode('true', 'boolean').toTex(), 'true');
    _assert2.default.equal(new ConstantNode('false', 'boolean').toTex(), 'false');
    _assert2.default.equal(new ConstantNode('undefined', 'undefined').toTex(), 'undefined');
    _assert2.default.equal(new ConstantNode('null', 'null').toTex(), 'null');
  });

  it('should LaTeX a ConstantNode in exponential notation', function () {
    var n = new ConstantNode('1e10', 'number');
    _assert2.default.equal(n.toTex(), '1\\cdot10^{10}');
  });

  it('should LaTeX a ConstantNode with custom toTex', function () {
    //Also checks if the custom functions get passed on to the children
    var customFunction = function customFunction(node, options) {
      if (node.type === 'ConstantNode') {
        return 'const\\left(' + node.value + ', ' + node.valueType + '\\right)';
      }
    };

    var n = new ConstantNode(1);

    _assert2.default.equal(n.toTex({ handler: customFunction }), 'const\\left(1, number\\right)');
  });
});
