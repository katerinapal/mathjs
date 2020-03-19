"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = math.bignumber;
var subtract = math.subtract;

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
    _assert2.default.deepEqual(subtract(math.complex(3, 2), math.complex(8, 4)), math.complex('-5 - 2i'));
    _assert2.default.deepEqual(subtract(math.complex(6, 3), math.complex(-2, -2)), math.complex('8 + 5i'));
    _assert2.default.deepEqual(subtract(math.complex(3, 4), 10), math.complex('-7 + 4i'));
    _assert2.default.deepEqual(subtract(math.complex(3, 4), -2), math.complex('5 + 4i'));
    _assert2.default.deepEqual(subtract(math.complex(-3, -4), 10), math.complex('-13 - 4i'));
    _assert2.default.deepEqual(subtract(10, math.complex(3, 4)), math.complex('7 - 4i'));
    _assert2.default.deepEqual(subtract(10, math.i), math.complex('10 - i'));
    _assert2.default.deepEqual(subtract(0, math.i), math.complex('-i'));
    _assert2.default.deepEqual(subtract(10, math.complex(0, 1)), math.complex('10 - i'));
  });

  it('should throw an error for mixed complex numbers and big numbers', function () {
    _assert2.default.deepEqual(subtract(math.complex(3, 4), math.bignumber(10)), math.complex(-7, 4));
    _assert2.default.deepEqual(subtract(math.bignumber(10), math.complex(3, 4)), math.complex(7, -4));
  });

  it('should subtract two fractions', function () {
    var a = math.fraction(1, 3);
    _assert2.default.equal(subtract(a, math.fraction(1, 6)).toString(), '0.1(6)');
    _assert2.default.equal(a.toString(), '0.(3)');

    _assert2.default.equal(subtract(math.fraction(3, 5), math.fraction(1, 5)).toString(), '0.4');
    _assert2.default.equal(subtract(math.fraction(1), math.fraction(1, 3)).toString(), '0.(6)');
  });

  it('should subtract mixed fractions and numbers', function () {
    _assert2.default.deepEqual(subtract(1, math.fraction(1, 3)), math.fraction(2, 3));
    _assert2.default.deepEqual(subtract(math.fraction(1, 3), 1), math.fraction(-2, 3));
  });

  it('should subtract two quantities of the same unit', function () {
    (0, _approx.deepEqual)(subtract(math.unit(5, 'km'), math.unit(100, 'mile')), math.unit(-155.93, 'km'));

    _assert2.default.deepEqual(subtract(math.unit(math.bignumber(5), 'km'), math.unit(math.bignumber(2), 'km')), math.unit(math.bignumber(3), 'km'));

    _assert2.default.deepEqual(subtract(math.unit(math.complex(10, 10), 'K'), math.unit(math.complex(3, 4), 'K')), math.unit(math.complex(7, 6), 'K'));
    _assert2.default.deepEqual(subtract(math.unit(math.complex(10, 10), 'K'), math.unit(3, 'K')), math.unit(math.complex(7, 10), 'K'));
  });

  it('should throw an error if subtracting two quantities of different units', function () {
    _assert2.default.throws(function () {
      subtract(math.unit(5, 'km'), math.unit(100, 'gram'));
    });
  });

  it('should throw an error when one of the two units has undefined value', function () {
    _assert2.default.throws(function () {
      subtract(math.unit('km'), math.unit('5gram'));
    }, /Parameter x contains a unit with undefined value/);
    _assert2.default.throws(function () {
      subtract(math.unit('5 km'), math.unit('gram'));
    }, /Parameter y contains a unit with undefined value/);
  });

  it('should throw an error if subtracting numbers from units', function () {
    _assert2.default.throws(function () {
      subtract(math.unit(5, 'km'), 2);
    }, TypeError);
    _assert2.default.throws(function () {
      subtract(2, math.unit(5, 'km'));
    }, TypeError);
  });

  it('should throw an error if subtracting numbers from units', function () {
    _assert2.default.throws(function () {
      subtract(math.unit(5, 'km'), bignumber(2));
    }, TypeError);
    _assert2.default.throws(function () {
      subtract(bignumber(2), math.unit(5, 'km'));
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
      var b = math.matrix([3, 2, 1]);
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof math.type.Matrix);
      _assert2.default.deepEqual(c, math.matrix([-2, 0, 2]));
    });

    it('should subtract array and dense matrix correctly', function () {
      var a = [[1, 2, 3], [4, 5, 6]];
      var b = math.sparse([[6, 5, 4], [3, 2, 1]]);
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof math.type.Matrix);
      _assert2.default.deepEqual(c, math.matrix([[-5, -3, -1], [1, 3, 5]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should subtract matrices correctly', function () {
      var a2 = math.matrix([[10, 20], [30, 40]]);
      var a3 = math.matrix([[5, 6], [7, 8]]);
      var a4 = subtract(a2, a3);
      _assert2.default.ok(a4 instanceof math.type.Matrix);
      _assert2.default.deepEqual(a4.size(), [2, 2]);
      _assert2.default.deepEqual(a4.valueOf(), [[5, 14], [23, 32]]);
    });

    it('should subtract a scalar and a matrix correctly', function () {
      _assert2.default.deepEqual(subtract(2, math.matrix([3, 4])), math.matrix([-1, -2]));
      _assert2.default.deepEqual(subtract(math.matrix([3, 4]), 2), math.matrix([1, 2]));
    });

    it('should subtract matrix and array correctly', function () {
      var a = math.matrix([1, 2, 3]);
      var b = [3, 2, 1];
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof math.type.Matrix);
      _assert2.default.deepEqual(c, math.matrix([-2, 0, 2]));
    });

    it('should subtract dense and sparse matrices correctly', function () {
      var a = math.matrix([[1, 2, 3], [1, 0, 0]]);
      var b = math.sparse([[3, 2, 1], [0, 0, 1]]);
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof math.type.Matrix);
      _assert2.default.deepEqual(c, math.matrix([[-2, 0, 2], [1, 0, -1]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should subtract matrices correctly', function () {
      var a2 = math.matrix([[10, 20], [30, 0]], 'sparse');
      var a3 = math.matrix([[5, 6], [30, 8]], 'sparse');
      var a4 = subtract(a2, a3);
      _assert2.default.ok(a4 instanceof math.type.Matrix);
      _assert2.default.deepEqual(a4, math.sparse([[5, 14], [0, -8]]));
    });

    it('should subtract a scalar and a matrix correctly', function () {
      _assert2.default.deepEqual(subtract(2, math.matrix([[3, 4], [5, 6]], 'sparse')).valueOf(), [[-1, -2], [-3, -4]]);
      _assert2.default.deepEqual(subtract(2, math.matrix([[3, 4], [0, 6]], 'sparse')).valueOf(), [[-1, -2], [2, -4]]);
      _assert2.default.deepEqual(subtract(math.matrix([[3, 4], [5, 6]], 'sparse'), 2).valueOf(), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual(subtract(math.matrix([[3, 4], [0, 6]], 'sparse'), 2).valueOf(), [[1, 2], [-2, 4]]);
    });

    it('should subtract matrix and array correctly', function () {
      var a = math.matrix([[1, 2, 3], [1, 0, 0]], 'sparse');
      var b = [[3, 2, 1], [0, 0, 1]];
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof math.type.Matrix);
      _assert2.default.deepEqual(c.valueOf(), [[-2, 0, 2], [1, 0, -1]]);
    });

    it('should subtract sparse and dense matrices correctly', function () {
      var a = math.sparse([[1, 2, 3], [1, 0, 0]]);
      var b = math.matrix([[3, 2, 1], [0, 0, 1]]);
      var c = subtract(a, b);

      _assert2.default.ok(c instanceof math.type.Matrix);
      _assert2.default.deepEqual(c, math.matrix([[-2, 0, 2], [1, 0, -1]]));
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
    var expression = math.parse('subtract(2,1)');
    _assert2.default.equal(expression.toTex(), '\\left(2-1\\right)');
  });
});
