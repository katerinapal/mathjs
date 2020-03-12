"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test dotMultiply (element-wise multiply)
var math = require('../../../index'),
    error = require('../../../lib/error/index'),
    dotMultiply = math.dotMultiply,
    divide = math.divide,
    matrix = math.matrix,
    sparse = math.sparse,
    complex = math.complex,
    range = math.range,
    i = math.i,
    unit = math.unit;

describe('dotMultiply', function () {

  it('should multiply 2 numbers', function () {
    // number
    (0, _approx.equal)(dotMultiply(2, 3), 6);
    (0, _approx.equal)(dotMultiply(-2, 3), -6);
    (0, _approx.equal)(dotMultiply(-2, -3), 6);
    (0, _approx.equal)(dotMultiply(5, 0), 0);
    (0, _approx.equal)(dotMultiply(0, 5), 0);
  });

  it('should multiply booleans', function () {
    _assert2.default.equal(dotMultiply(true, true), 1);
    _assert2.default.equal(dotMultiply(true, false), 0);
    _assert2.default.equal(dotMultiply(false, true), 0);
    _assert2.default.equal(dotMultiply(false, false), 0);
  });

  it('should multiply mixed numbers and booleans', function () {
    _assert2.default.equal(dotMultiply(2, true), 2);
    _assert2.default.equal(dotMultiply(2, false), 0);
    _assert2.default.equal(dotMultiply(true, 2), 2);
    _assert2.default.equal(dotMultiply(false, 2), 0);
  });

  it('should multiply numbers and null', function () {
    _assert2.default.equal(dotMultiply(1, null), 0);
    _assert2.default.equal(dotMultiply(null, 1), 0);
  });

  it('should multiply 2 complex numbers', function () {
    // complex
    (0, _approx.equal)(dotMultiply(complex(2, 3), 2), complex(4, 6));
    (0, _approx.equal)(dotMultiply(complex(2, -3), 2), complex(4, -6));
    (0, _approx.equal)(dotMultiply(complex(0, 1), complex(2, 3)), complex(-3, 2));
    (0, _approx.equal)(dotMultiply(complex(2, 3), complex(2, 3)), complex(-5, 12));
    (0, _approx.equal)(dotMultiply(2, complex(2, 3)), complex(4, 6));
    (0, _approx.equal)(divide(complex(-5, 12), complex(2, 3)), complex(2, 3));
  });

  it('should multiply a unit by a number', function () {
    // unit
    _assert2.default.equal(dotMultiply(2, unit('5 mm')).toString(), '10 mm');
    _assert2.default.equal(dotMultiply(2, unit('5 mm')).toString(), '10 mm');
    _assert2.default.equal(dotMultiply(unit('5 mm'), 2).toString(), '10 mm');
    _assert2.default.equal(dotMultiply(unit('5 mm'), 0).toString(), '0 mm');
  });

  it('should throw an error with strings', function () {
    // string
    _assert2.default.throws(function () {
      dotMultiply("hello", "world");
    });
    _assert2.default.throws(function () {
      dotMultiply("hello", 2);
    });
  });

  describe('Array', function () {

    var a = [[1, 0], [3, 4]];
    var b = [[5, 6], [0, 8]];
    var c = [[5], [6]];
    var d = [[5, 6]];

    it('should multiply a all elements in a array by a number', function () {
      // matrix, array, range
      (0, _approx.equal)(dotMultiply(a, 3), [[3, 0], [9, 12]]);
      (0, _approx.equal)(dotMultiply(3, a), [[3, 0], [9, 12]]);
      (0, _approx.equal)(dotMultiply([1, 2, 3, 4], 2), [2, 4, 6, 8]);
      (0, _approx.equal)(dotMultiply(2, [1, 2, 3, 4]), [2, 4, 6, 8]);
    });

    it('should perform element-wise (array .* array) multiplication', function () {
      (0, _approx.equal)(dotMultiply(a, b), [[5, 0], [0, 32]]);
      (0, _approx.equal)(dotMultiply([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[5, 12], [21, 32]]);
    });

    it('should perform element-wise (array .* dense matrix) multiplication', function () {
      (0, _approx.equal)(dotMultiply([[1, 2], [3, 4]], matrix([[5, 6], [7, 8]])), matrix([[5, 12], [21, 32]]));
    });

    it('should perform element-wise (array .* sparse matrix) multiplication', function () {
      (0, _approx.equal)(dotMultiply([[1, 2], [3, 4]], sparse([[5, 6], [7, 8]])), sparse([[5, 12], [21, 32]]));
    });

    it('should throw an error if arrays are of different sizes', function () {
      _assert2.default.throws(function () {
        dotMultiply(a, c);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, a);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, b);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, c);
      });
      _assert2.default.throws(function () {
        dotMultiply(c, b);
      });
    });
  });

  describe('DenseMatrix', function () {

    var a = matrix([[1, 0], [3, 4]]);
    var b = matrix([[5, 6], [0, 8]]);
    var c = matrix([[5], [6]]);
    var d = matrix([[5, 6]]);

    it('should multiply a all elements in a dense matrix by a number', function () {
      // matrix, array, range
      (0, _approx.equal)(dotMultiply(a, 3), matrix([[3, 0], [9, 12]]));
      (0, _approx.equal)(dotMultiply(3, a), matrix([[3, 0], [9, 12]]));
      (0, _approx.equal)(dotMultiply(matrix([1, 2, 3, 4]), 2), matrix([2, 4, 6, 8]));
      (0, _approx.equal)(dotMultiply(2, matrix([1, 2, 3, 4])), matrix([2, 4, 6, 8]));
    });

    it('should perform element-wise (dense matrix .* array) multiplication', function () {
      (0, _approx.equal)(dotMultiply(a, [[5, 6], [0, 8]]), matrix([[5, 0], [0, 32]]));
      (0, _approx.equal)(dotMultiply(matrix([[1, 2], [3, 4]]), [[5, 6], [7, 8]]), matrix([[5, 12], [21, 32]]));
    });

    it('should perform element-wise (dense matrix .* dense matrix) multiplication', function () {
      (0, _approx.equal)(dotMultiply(matrix([[1, 2], [3, 4]]), matrix([[5, 6], [7, 8]])), matrix([[5, 12], [21, 32]]));
    });

    it('should perform element-wise (dense matrix .* sparse matrix) multiplication', function () {
      (0, _approx.equal)(dotMultiply(matrix([[1, 2], [3, 4]]), sparse([[5, 6], [7, 8]])), sparse([[5, 12], [21, 32]]));
    });

    it('should throw an error if arrays are of different sizes', function () {
      _assert2.default.throws(function () {
        dotMultiply(a, c);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, a);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, b);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, c);
      });
      _assert2.default.throws(function () {
        dotMultiply(c, b);
      });
    });
  });

  describe('SparseMatrix', function () {

    var a = sparse([[1, 0], [3, 4]]);
    var b = sparse([[5, 6], [0, 8]]);
    var c = sparse([[5], [6]]);
    var d = sparse([[5, 6]]);

    it('should multiply a all elements in a sparse matrix by a number', function () {
      // matrix, array, range
      (0, _approx.equal)(dotMultiply(a, 3), sparse([[3, 0], [9, 12]]));
      (0, _approx.equal)(dotMultiply(3, a), sparse([[3, 0], [9, 12]]));
      (0, _approx.equal)(dotMultiply(sparse([1, 2, 3, 4]), 2), sparse([2, 4, 6, 8]));
      (0, _approx.equal)(dotMultiply(2, sparse([1, 2, 3, 4])), sparse([2, 4, 6, 8]));
    });

    it('should perform element-wise (sparse matrix .* array) multiplication', function () {
      (0, _approx.equal)(dotMultiply(a, [[5, 6], [0, 8]]), sparse([[5, 0], [0, 32]]));
      (0, _approx.equal)(dotMultiply(sparse([[1, 2], [3, 4]]), [[5, 6], [7, 8]]), sparse([[5, 12], [21, 32]]));
    });

    it('should perform element-wise (sparse matrix .* dense matrix) multiplication', function () {
      (0, _approx.equal)(dotMultiply(sparse([[1, 2], [3, 4]]), matrix([[5, 6], [7, 8]])), sparse([[5, 12], [21, 32]]));
    });

    it('should perform element-wise (sparse matrix .* sparse matrix) multiplication', function () {
      (0, _approx.equal)(dotMultiply(sparse([[0, 2], [3, 4]]), sparse([[5, 6], [0, 8]])), sparse([[0, 12], [0, 32]]));
    });

    it('should throw an error if arrays are of different sizes', function () {
      _assert2.default.throws(function () {
        dotMultiply(a, c);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, a);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, b);
      });
      _assert2.default.throws(function () {
        dotMultiply(d, c);
      });
      _assert2.default.throws(function () {
        dotMultiply(c, b);
      });
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      dotMultiply(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      dotMultiply(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX dotMultiply', function () {
    var expression = math.parse('dotMultiply([1,2],[3,4])');
    _assert2.default.equal(expression.toTex(), '\\left(\\begin{bmatrix}1\\\\2\\\\\\end{bmatrix}.\\cdot\\begin{bmatrix}3\\\\4\\\\\\end{bmatrix}\\right)');
  });
});
