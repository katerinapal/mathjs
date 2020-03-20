"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = _index.indexjs.bignumber;
var subtract = _index.indexjs.subtract;

describe('subtract', function () {

  it('should subtract two numbers correctly', function () {
    _assert2.default.deepEqual(subtract(4, 2), 2);
    _assert2.default.deepEqual(subtract(4, -4), 8);
    _assert2.default.deepEqual(subtract(-4, -4), 0);
    _assert2.default.deepEqual(subtract(-4, 4), -8);
    _assert2.default.deepEqual(subtract(2, 4), -2);
    _assert2.default.deepEqual(subtract(3, 0), 3);
    _assert2.default.deepEqual(subtract(0, 3), -3);
    _assert2.default.deepEqual(subtract(0, 3), -3);
    _assert2.default.deepEqual(subtract(0, 3), -3);
  });

  it('should subtract booleans', function () {
    _assert2.default.equal(subtract(true, true), 0);
    _assert2.default.equal(subtract(true, false), 1);
    _assert2.default.equal(subtract(false, true), -1);
    _assert2.default.equal(subtract(false, false), 0);
  });

  it('should subtract mixed numbers and booleans', function () {
    _assert2.default.equal(subtract(2, true), 1);
    _assert2.default.equal(subtract(2, false), 2);
    _assert2.default.equal(subtract(true, 2), -1);
    _assert2.default.equal(subtract(false, 2), -2);
  });

  it('should subtract numbers and null', function () {
    _assert2.default.equal(subtract(1, null), 1);
    _assert2.default.equal(subtract(null, 1), -1);
  });

  it('should subtract bignumbers', function () {
    _assert2.default.deepEqual(subtract(bignumber(0.3), bignumber(0.2)), bignumber(0.1));
    _assert2.default.deepEqual(subtract(bignumber('2.3e5001'), bignumber('3e5000')), bignumber('2e5001'));
    _assert2.default.deepEqual(subtract(bignumber('1e19'), bignumber('1')), bignumber('9999999999999999999'));
  });

  it('should subtract mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(subtract(bignumber(0.3), 0.2), bignumber(0.1));
    _assert2.default.deepEqual(subtract(0.3, bignumber(0.2)), bignumber(0.1));

    _assert2.default.throws(function () {
      subtract(1 / 3, bignumber(1).div(3));
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    _assert2.default.throws(function () {
      subtract(bignumber(1).div(3), 1 / 3);
    }, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should subtract mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(subtract(bignumber(1.1), true), bignumber(0.1));
    _assert2.default.deepEqual(subtract(bignumber(1.1), false), bignumber(1.1));
    _assert2.default.deepEqual(subtract(false, bignumber(0.2)), bignumber(-0.2));
    _assert2.default.deepEqual(subtract(true, bignumber(0.2)), bignumber(0.8));
  });

  it('should subtract two complex numbers correctly', function () {
    _assert2.default.deepEqual(subtract(_index.indexjs.complex(3, 2), _index.indexjs.complex(8, 4)), _index.indexjs.complex('-5 - 2i'));
    _assert2.default.deepEqual(subtract(_index.indexjs.complex(6, 3), _index.indexjs.complex(-2, -2)), _index.indexjs.complex('8 + 5i'));
    _assert2.default.deepEqual(subtract(_index.indexjs.complex(3, 4), 10), _index.indexjs.complex('-7 + 4i'));
    _assert2.default.deepEqual(subtract(_index.indexjs.complex(3, 4), -2), _index.indexjs.complex('5 + 4i'));
    _assert2.default.deepEqual(subtract(_index.indexjs.complex(-3, -4), 10), _index.indexjs.complex('-13 - 4i'));
    _assert2.default.deepEqual(subtract(10, _index.indexjs.complex(3, 4)), _index.indexjs.complex('7 - 4i'));
    _assert2.default.deepEqual(subtract(10, _index.indexjs.i), _index.indexjs.complex('10 - i'));
    _assert2.default.deepEqual(subtract(0, _index.indexjs.i), _index.indexjs.complex('-i'));
    _assert2.default.deepEqual(subtract(10, _index.indexjs.complex(0, 1)), _index.indexjs.complex('10 - i'));
  });

  it('should throw an error for mixed complex numbers and big numbers', function () {
    _assert2.default.deepEqual(subtract(_index.indexjs.complex(3, 4), _index.indexjs.bignumber(10)), _index.indexjs.complex(-7, 4));
    _assert2.default.deepEqual(subtract(_index.indexjs.bignumber(10), _index.indexjs.complex(3, 4)), _index.indexjs.complex(7, -4));
  });

  it('should subtract two fractions', function () {
    var a = _index.indexjs.fraction(1, 3);
    _assert2.default.equal(subtract(a, _index.indexjs.fraction(1, 6)).toString(), '0.1(6)');
    _assert2.default.equal(a.toString(), '0.(3)');

    _assert2.default.equal(subtract(_index.indexjs.fraction(3, 5), _index.indexjs.fraction(1, 5)).toString(), '0.4');
    _assert2.default.equal(subtract(_index.indexjs.fraction(1), _index.indexjs.fraction(1, 3)).toString(), '0.(6)');
  });

  it('should subtract mixed fractions and numbers', function () {
    _assert2.default.deepEqual(subtract(1, _index.indexjs.fraction(1, 3)), _index.indexjs.fraction(2, 3));
    _assert2.default.deepEqual(subtract(_index.indexjs.fraction(1, 3), 1), _index.indexjs.fraction(-2, 3));
  });

  it('should subtract two quantities of the same unit', function () {
    (0, _approx.deepEqual)(subtract(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'mile')), _index.indexjs.unit(-155.93, 'km'));

    _assert2.default.deepEqual(subtract(_index.indexjs.unit(_index.indexjs.bignumber(5), 'km'), _index.indexjs.unit(_index.indexjs.bignumber(2), 'km')), _index.indexjs.unit(_index.indexjs.bignumber(3), 'km'));

    _assert2.default.deepEqual(subtract(_index.indexjs.unit(_index.indexjs.complex(10, 10), 'K'), _index.indexjs.unit(_index.indexjs.complex(3, 4), 'K')), _index.indexjs.unit(_index.indexjs.complex(7, 6), 'K'));
    _assert2.default.deepEqual(subtract(_index.indexjs.unit(_index.indexjs.complex(10, 10), 'K'), _index.indexjs.unit(3, 'K')), _index.indexjs.unit(_index.indexjs.complex(7, 10), 'K'));
  });

  it('should throw an error if subtracting two quantities of different units', function () {
    _assert2.default.throws(function () {
      subtract(_index.indexjs.unit(5, 'km'), _index.indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error when one of the two units has undefined value', function () {
    _assert2.default.throws(function () {
      subtract(_index.indexjs.unit('km'), _index.indexjs.unit('5gram'));
    }, /Parameter x contains a unit with undefined value/);
    _assert2.default.throws(function () {
      subtract(_index.indexjs.unit('5 km'), _index.indexjs.unit('gram'));
    }, /Parameter y contains a unit with undefined value/);
  });

  it('should throw an error if subtracting numbers from units', function () {
    _assert2.default.throws(function () {
      subtract(_index.indexjs.unit(5, 'km'), 2);
    }, TypeError);
    _assert2.default.throws(function () {
      subtract(2, _index.indexjs.unit(5, 'km'));
    }, TypeError);
  });

  it('should throw an error if subtracting numbers from units', function () {
    _assert2.default.throws(function () {
      subtract(_index.indexjs.unit(5, 'km'), bignumber(2));
    }, TypeError);
    _assert2.default.throws(function () {
      subtract(bignumber(2), _index.indexjs.unit(5, 'km'));
    }, TypeError);
  });

  it('should throw an error when used with a string', function () {
    _assert2.default.throws(function () {
      subtract('hello ', 'world');
    });
    _assert2.default.throws(function () {
      subtract('str', 123);
    });
    _assert2.default.throws(function () {
      subtract(123, 'str');
    });
  });

  describe('Array', function () {

    it('should subtract arrays correctly', function () {
      var a2 = [[10, 20], [30, 40]];
      var a3 = [[5, 6], [7, 8]];
      var a4 = subtract(a2, a3);
      _assert2.default.deepEqual(a4, [[5, 14], [23, 32]]);
    });

    it('should subtract a scalar and an array correctly', function () {
      _assert2.default.deepEqual(subtract(2, [3, 4]), [-1, -2]);
      _assert2.default.deepEqual(subtract(2, [3, 0]), [-1, 2]);
      _assert2.default.deepEqual(subtract([3, 4], 2), [1, 2]);
      _assert2.default.deepEqual(subtract([3, 0], 2), [1, -2]);
    });

    it('should subtract array and dense matrix correctly', function () {
      var a = [1, 2, 3];
      var b = _index.indexjs.matrix([3, 2, 1]);
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof _index.indexjs.type.Matrix);
      _assert2.default.deepEqual(c, _index.indexjs.matrix([-2, 0, 2]));
    });

    it('should subtract array and dense matrix correctly', function () {
      var a = [[1, 2, 3], [4, 5, 6]];
      var b = _index.indexjs.sparse([[6, 5, 4], [3, 2, 1]]);
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof _index.indexjs.type.Matrix);
      _assert2.default.deepEqual(c, _index.indexjs.matrix([[-5, -3, -1], [1, 3, 5]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should subtract matrices correctly', function () {
      var a2 = _index.indexjs.matrix([[10, 20], [30, 40]]);
      var a3 = _index.indexjs.matrix([[5, 6], [7, 8]]);
      var a4 = subtract(a2, a3);
      _assert2.default.ok(a4 instanceof _index.indexjs.type.Matrix);
      _assert2.default.deepEqual(a4.size(), [2, 2]);
      _assert2.default.deepEqual(a4.valueOf(), [[5, 14], [23, 32]]);
    });

    it('should subtract a scalar and a matrix correctly', function () {
      _assert2.default.deepEqual(subtract(2, _index.indexjs.matrix([3, 4])), _index.indexjs.matrix([-1, -2]));
      _assert2.default.deepEqual(subtract(_index.indexjs.matrix([3, 4]), 2), _index.indexjs.matrix([1, 2]));
    });

    it('should subtract matrix and array correctly', function () {
      var a = _index.indexjs.matrix([1, 2, 3]);
      var b = [3, 2, 1];
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof _index.indexjs.type.Matrix);
      _assert2.default.deepEqual(c, _index.indexjs.matrix([-2, 0, 2]));
    });

    it('should subtract dense and sparse matrices correctly', function () {
      var a = _index.indexjs.matrix([[1, 2, 3], [1, 0, 0]]);
      var b = _index.indexjs.sparse([[3, 2, 1], [0, 0, 1]]);
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof _index.indexjs.type.Matrix);
      _assert2.default.deepEqual(c, _index.indexjs.matrix([[-2, 0, 2], [1, 0, -1]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should subtract matrices correctly', function () {
      var a2 = _index.indexjs.matrix([[10, 20], [30, 0]], 'sparse');
      var a3 = _index.indexjs.matrix([[5, 6], [30, 8]], 'sparse');
      var a4 = subtract(a2, a3);
      _assert2.default.ok(a4 instanceof _index.indexjs.type.Matrix);
      _assert2.default.deepEqual(a4, _index.indexjs.sparse([[5, 14], [0, -8]]));
    });

    it('should subtract a scalar and a matrix correctly', function () {
      _assert2.default.deepEqual(subtract(2, _index.indexjs.matrix([[3, 4], [5, 6]], 'sparse')).valueOf(), [[-1, -2], [-3, -4]]);
      _assert2.default.deepEqual(subtract(2, _index.indexjs.matrix([[3, 4], [0, 6]], 'sparse')).valueOf(), [[-1, -2], [2, -4]]);
      _assert2.default.deepEqual(subtract(_index.indexjs.matrix([[3, 4], [5, 6]], 'sparse'), 2).valueOf(), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual(subtract(_index.indexjs.matrix([[3, 4], [0, 6]], 'sparse'), 2).valueOf(), [[1, 2], [-2, 4]]);
    });

    it('should subtract matrix and array correctly', function () {
      var a = _index.indexjs.matrix([[1, 2, 3], [1, 0, 0]], 'sparse');
      var b = [[3, 2, 1], [0, 0, 1]];
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof _index.indexjs.type.Matrix);
      _assert2.default.deepEqual(c.valueOf(), [[-2, 0, 2], [1, 0, -1]]);
    });

    it('should subtract sparse and dense matrices correctly', function () {
      var a = _index.indexjs.sparse([[1, 2, 3], [1, 0, 0]]);
      var b = _index.indexjs.matrix([[3, 2, 1], [0, 0, 1]]);
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof _index.indexjs.type.Matrix);
      _assert2.default.deepEqual(c, _index.indexjs.matrix([[-2, 0, 2], [1, 0, -1]]));
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      subtract(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      subtract(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX subtract', function () {
    var expression = _index.indexjs.parse('subtract(2,1)');
    _assert2.default.equal(expression.toTex(), '\\left(2-1\\right)');
  });
});
