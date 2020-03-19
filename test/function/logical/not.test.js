'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = math.bignumber;
var complex = math.complex;
var matrix = math.matrix;
var unit = math.unit;
var not = math.not;
var FunctionNode = math.expression.node.FunctionNode;
var ConstantNode = math.expression.node.ConstantNode;
var SymbolNode = math.expression.node.SymbolNode;

describe('not', function () {

  it('should not numbers correctly', function () {
    _assert2.default.strictEqual(not(1), false);
    _assert2.default.strictEqual(not(-1), false);
    _assert2.default.strictEqual(not(1.23e+100), false);
    _assert2.default.strictEqual(not(-1.0e-100), false);
    _assert2.default.strictEqual(not(1.0e-100), false);
    _assert2.default.strictEqual(not(Infinity), false);
    _assert2.default.strictEqual(not(-Infinity), false);
    _assert2.default.strictEqual(not(0), true);
    _assert2.default.strictEqual(not(NaN), true);
  });

  it('should not complex numbers', function () {
    _assert2.default.strictEqual(not(complex(1, 1)), false);
    _assert2.default.strictEqual(not(complex(0, 1)), false);
    _assert2.default.strictEqual(not(complex(1, 0)), false);
    _assert2.default.strictEqual(not(complex(0, 0)), true);
    _assert2.default.strictEqual(not(complex()), true);
    _assert2.default.strictEqual(not(complex(0)), true);
    _assert2.default.strictEqual(not(complex(1)), false);
  });

  it('should not booleans', function () {
    _assert2.default.strictEqual(not(true), false);
    _assert2.default.strictEqual(not(false), true);
  });

  it('should not null', function () {
    _assert2.default.strictEqual(not(null), true);
  });

  it('should not bignumbers', function () {
    _assert2.default.strictEqual(not(bignumber(1)), false);
    _assert2.default.strictEqual(not(bignumber(-1)), false);
    _assert2.default.strictEqual(not(bignumber(0)), true);
    _assert2.default.strictEqual(not(bignumber(NaN)), true);
    _assert2.default.strictEqual(not(bignumber('1e+10')), false);
    _assert2.default.strictEqual(not(bignumber('-1.0e-100')), false);
    _assert2.default.strictEqual(not(bignumber('1.0e-100')), false);
    _assert2.default.strictEqual(not(bignumber(Infinity)), false);
    _assert2.default.strictEqual(not(bignumber(-Infinity)), false);
  });

  it('should not units', function () {
    _assert2.default.strictEqual(not(unit('100cm')), false);
    _assert2.default.strictEqual(not(unit('0 inch')), true);
    _assert2.default.strictEqual(not(unit('1m')), false);
    _assert2.default.strictEqual(not(unit('m')), true);
    _assert2.default.strictEqual(not(unit('-10inch')), false);

    _assert2.default.strictEqual(not(unit(bignumber(1), 'm')), false);
    _assert2.default.strictEqual(not(unit(bignumber(0), 'm')), true);
  });

  it('should not arrays', function () {
    _assert2.default.deepEqual(not([0, 10]), [true, false]);
    _assert2.default.deepEqual(not([]), []);
  });

  it('should not matrices', function () {
    _assert2.default.deepEqual(not(matrix([0, 10])), matrix([true, false]));
    _assert2.default.deepEqual(not(matrix([])), matrix([]));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      not();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      not(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type if arguments', function () {
    _assert2.default.throws(function () {
      not(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      not({});
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX not', function () {
    var c = new ConstantNode(1);
    var node = new FunctionNode(new SymbolNode('not'), [c]);
    _assert2.default.equal(node.toTex(), '\\neg\\left(1\\right)');
  });
});
