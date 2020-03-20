"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test bitAnd
var bignumber = _index.indexjs.bignumber,
    bitAnd = _index.indexjs.bitAnd;

describe('bitAnd', function () {

  it('should bitwise and two numbers', function () {
    _assert2.default.equal(bitAnd(53, 131), 1);
    _assert2.default.equal(bitAnd(2, 3), 2);
    _assert2.default.equal(bitAnd(-2, 3), 2);
    _assert2.default.equal(bitAnd(2, -3), 0);
    _assert2.default.equal(bitAnd(-5, -3), -7);
  });

  it('should bitwise and booleans', function () {
    _assert2.default.equal(bitAnd(true, true), 1);
    _assert2.default.equal(bitAnd(true, false), 0);
    _assert2.default.equal(bitAnd(false, true), 0);
    _assert2.default.equal(bitAnd(false, false), 0);
  });

  it('should bitwise and numbers and null', function () {
    _assert2.default.equal(_index.indexjs.bitAnd(null, null), 0);
    _assert2.default.equal(_index.indexjs.bitAnd(null, 1), 0);
    _assert2.default.equal(_index.indexjs.bitAnd(1, null), 0);
  });

  it('should bitwise and mixed numbers and booleans', function () {
    _assert2.default.equal(bitAnd(1, true), 1);
    _assert2.default.equal(bitAnd(1, false), 0);
    _assert2.default.equal(bitAnd(true, 1), 1);
    _assert2.default.equal(bitAnd(false, 1), 0);
  });

  it('should bitwise and bignumbers', function () {
    _assert2.default.deepEqual(bitAnd(bignumber(1), bignumber(2)), bignumber(0));
    _assert2.default.deepEqual(bitAnd(bignumber('-1.0e+31'), bignumber('-1.0e+32')), bignumber('-101273397985285317082036849082368'));
    _assert2.default.deepEqual(bitAnd(bignumber('1.0e+31'), bignumber('1.0e+32')), bignumber('8726602014714682917961003433984'));
    _assert2.default.deepEqual(bitAnd(bignumber('-1.0e+31'), bignumber('1.0e+32')), bignumber('91273397985285317082038996566016'));
    _assert2.default.deepEqual(bitAnd(bignumber('1.0e+31'), bignumber('-1.0e+32')), bignumber('1273397985285317082036849082368'));
    _assert2.default.deepEqual(bitAnd(bignumber('2.1877409333271352879E+75'), bignumber('-3.220131224058161211554E+42')), bignumber('2187740933327135287899999999999996863578490213829130431270426161710498840576'));
  });

  it('should bitwise and mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(bitAnd(bignumber(1), 2), bignumber(0));
    _assert2.default.deepEqual(bitAnd(1, bignumber(2)), bignumber(0));
    _assert2.default.deepEqual(bitAnd(bignumber(7), 9), bignumber(1));
    _assert2.default.deepEqual(bitAnd(7, bignumber(9)), bignumber(1));
  });

  it('should bitwise and mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(bitAnd(bignumber(1), true), bignumber(1));
    _assert2.default.deepEqual(bitAnd(bignumber(1), false), bignumber(0));
    _assert2.default.deepEqual(bitAnd(false, bignumber(3)), bignumber(0));
    _assert2.default.deepEqual(bitAnd(true, bignumber(3)), bignumber(1));
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      bitAnd(_index.indexjs.unit('5cm'), 2);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitAnd(2, _index.indexjs.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitAnd(_index.indexjs.unit('2cm'), _index.indexjs.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error if the parameters are not integers', function () {
    _assert2.default.throws(function () {
      bitAnd(1.1, 1);
    }, /Integers expected in function bitAnd/);
    _assert2.default.throws(function () {
      bitAnd(1, 1.1);
    }, /Integers expected in function bitAnd/);
    _assert2.default.throws(function () {
      bitAnd(1.1, 1.1);
    }, /Integers expected in function bitAnd/);
    _assert2.default.throws(function () {
      bitAnd(bignumber(1.1), 1);
    }, /Integers expected in function bitAnd/);
    _assert2.default.throws(function () {
      bitAnd(1, bignumber(1.1));
    }, /Integers expected in function bitAnd/);
    _assert2.default.throws(function () {
      bitAnd(bignumber(1.1), bignumber(1));
    }, /Integers expected in function bitAnd/);
    _assert2.default.throws(function () {
      bitAnd(bignumber(1), bignumber(1.1));
    }, /Integers expected in function bitAnd/);
  });

  it('should bitwise and arrays correctly', function () {
    var a = [[1, 4], [3, 2]];

    // array - array
    var b = [[5, 8], [7, 6]];
    var c = bitAnd(a, b);
    _assert2.default.deepEqual(c, [[1, 0], [3, 2]]);

    // array - dense
    b = _index.indexjs.matrix([[5, 8], [7, 6]]);
    c = bitAnd(a, b);
    _assert2.default.deepEqual(c, _index.indexjs.matrix([[1, 0], [3, 2]]));

    // array - sparse
    b = _index.indexjs.sparse([[5, 8], [7, 6]]);
    c = bitAnd(a, b);
    _assert2.default.deepEqual(c, _index.indexjs.sparse([[1, 0], [3, 2]]));
  });

  it('should bitwise and dense matrix correctly', function () {
    var a = _index.indexjs.matrix([[1, 4], [3, 2]]);

    // dense - array
    var b = [[5, 8], [7, 6]];
    var c = bitAnd(a, b);
    _assert2.default.deepEqual(c, _index.indexjs.matrix([[1, 0], [3, 2]]));

    // dense - dense
    b = _index.indexjs.matrix([[5, 8], [7, 6]]);
    c = bitAnd(a, b);
    _assert2.default.deepEqual(c, _index.indexjs.matrix([[1, 0], [3, 2]]));

    // dense - sparse
    b = _index.indexjs.sparse([[5, 8], [7, 6]]);
    c = bitAnd(a, b);
    _assert2.default.deepEqual(c, _index.indexjs.sparse([[1, 0], [3, 2]]));
  });

  it('should bitwise and sparse matrix correctly', function () {
    var a = _index.indexjs.sparse([[1, 4], [3, 2]]);

    // sparse - array
    var b = [[5, 8], [7, 6]];
    var c = bitAnd(a, b);
    _assert2.default.deepEqual(c, _index.indexjs.sparse([[1, 0], [3, 2]]));

    // sparse - dense
    b = _index.indexjs.matrix([[5, 8], [7, 6]]);
    c = bitAnd(a, b);
    _assert2.default.deepEqual(c, _index.indexjs.sparse([[1, 0], [3, 2]]));

    // sparse - sparse
    b = _index.indexjs.sparse([[5, 8], [7, 6]]);
    c = bitAnd(a, b);
    _assert2.default.deepEqual(c, _index.indexjs.sparse([[1, 0], [3, 2]]));

    // sparse - sparse pattern
    b = new _index.indexjs.type.SparseMatrix({
      index: [0, 1],
      ptr: [0, 1, 2],
      size: [2, 2]
    });
    c = bitAnd(a, b);
    _assert2.default.deepEqual(c, new _index.indexjs.type.SparseMatrix({
      index: [0, 1],
      ptr: [0, 1, 2],
      size: [2, 2]
    }));

    // sparse pattern - sparse
    c = bitAnd(b, a);
    _assert2.default.deepEqual(c, new _index.indexjs.type.SparseMatrix({
      index: [0, 1],
      ptr: [0, 1, 2],
      size: [2, 2]
    }));
  });

  it('should bitwise and matrices correctly', function () {
    var a2 = _index.indexjs.matrix([[1, 2], [3, 4]]);
    var a3 = _index.indexjs.matrix([[5, 6], [7, 8]]);
    var a4 = bitAnd(a2, a3);
    _assert2.default.ok(a4 instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(a4.size(), [2, 2]);
    _assert2.default.deepEqual(a4.valueOf(), [[1, 2], [3, 0]]);
    var a5 = _index.indexjs.pow(a2, 2);
    _assert2.default.ok(a5 instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(a5.size(), [2, 2]);
    _assert2.default.deepEqual(a5.valueOf(), [[7, 10], [15, 22]]);
  });

  it('should bitwise and a scalar and a matrix correctly', function () {
    _assert2.default.deepEqual(bitAnd(12, _index.indexjs.matrix([3, 9])), _index.indexjs.matrix([0, 8]));
    _assert2.default.deepEqual(bitAnd(_index.indexjs.matrix([3, 9]), 12), _index.indexjs.matrix([0, 8]));
  });

  it('should bitwise and a scalar and an array correctly', function () {
    _assert2.default.deepEqual(bitAnd(12, [3, 9]), [0, 8]);
    _assert2.default.deepEqual(bitAnd([3, 9], 12), [0, 8]);
  });

  it('should bitwise and a matrix and an array correctly', function () {
    var a = [6, 4, 28];
    var b = _index.indexjs.matrix([13, 92, 101]);
    var c = bitAnd(a, b);

    _assert2.default.ok(c instanceof _index.indexjs.type.Matrix);
    _assert2.default.deepEqual(c, _index.indexjs.matrix([4, 4, 4]));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      bitAnd(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      bitAnd(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      bitAnd(new Date(), true);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitAnd(true, new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitAnd(true, undefined);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitAnd(undefined, true);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX bitAnd', function () {
    var expression = _index.indexjs.parse('bitAnd(4,2)');
    _assert2.default.equal(expression.toTex(), '\\left(4\\&2\\right)');
  });
});
