'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var approx = require('../../../tools/approx'),
    math = require('../../../index');

describe('trace', function () {

  it('should calculate correctly the trace of a NxN array', function () {
    _assert2.default.equal(math.trace([5]), 5);
    _assert2.default.equal(math.trace([[1, 2], [3, 4]]), 5);
    approx.equal(math.trace([[-2, 2, 3], [-1, 1, 3], [2, 0, -1]]), -2);
    approx.equal(math.trace([[1, 4, 7], [3, 0, 5], [-1, 9, 11]]), 12);
    approx.equal(math.trace([[1, 7, 4, 3, 7], [0, 7, 0, 3, 7], [0, 7, 4, 3, 0], [1, 7, 5, 9, 7], [2, 7, 4, 3, 7]]), 28);
  });

  it('should calculate correctly the trace of a NxN matrix', function () {
    _assert2.default.equal(math.trace(math.matrix([5])), 5);
    _assert2.default.equal(math.trace(math.matrix([[1, 2], [3, 4]])), 5);
    _assert2.default.equal(math.trace(math.matrix([[1, 2], [3, 4]])), 5);
    approx.equal(math.trace(math.matrix([[-2, 2, 3], [-1, 1, 3], [2, 0, -1]])), -2);
    approx.equal(math.trace(math.matrix([[1, 4, 7], [3, 0, 5], [-1, 9, 11]])), 12);
    approx.equal(math.trace(math.matrix([[1, 7, 4, 3, 7], [0, 7, 0, 3, 7], [0, 7, 4, 3, 0], [1, 7, 5, 9, 7], [2, 7, 4, 3, 7]])), 28);
    approx.equal(math.trace(math.diag([4, -5, 6])), 5);
  });

  it('should calculate correctly the trace of a NxN matrix, sparse', function () {
    _assert2.default.equal(math.trace(math.matrix([5], 'sparse')), 5);
    _assert2.default.equal(math.trace(math.matrix([[1, 2], [3, 4]], 'sparse')), 5);
    _assert2.default.equal(math.trace(math.matrix([[1, 2], [3, 4]], 'sparse')), 5);
    approx.equal(math.trace(math.matrix([[-2, 2, 3], [-1, 1, 3], [2, 0, -1]], 'sparse')), -2);
    approx.equal(math.trace(math.matrix([[1, 4, 7], [3, 0, 5], [-1, 9, 11]], 'sparse')), 12);
    approx.equal(math.trace(math.matrix([[1, 7, 4, 3, 7], [0, 7, 0, 3, 7], [0, 7, 4, 3, 0], [1, 7, 5, 9, 7], [2, 7, 4, 3, 7]], 'sparse')), 28);
  });

  it('should return N for the identity matrix', function () {
    _assert2.default.equal(math.trace(math.eye(7)), 7);
    _assert2.default.equal(math.trace(math.eye(2)), 2);
    _assert2.default.equal(math.trace(math.eye(1)), 1);
  });

  it('should calculate the trace for a scalar', function () {
    _assert2.default.equal(math.trace(7), 7);

    var c1 = math.complex(2, 3);
    var c2 = math.trace(c1);
    _assert2.default.deepEqual(c1, c2);

    // c2 should be a clone
    c1.re = 0;
    _assert2.default.equal(c1.re, 0);
    _assert2.default.equal(c2.re, 2);
  });

  it('should calculate the trace for a 1x1 array', function () {
    var c1 = math.complex(2, 3);
    var c2 = math.trace([[c1]]);
    _assert2.default.deepEqual(c1, c2);

    // c2 should be a clone
    c1.re = 0;
    _assert2.default.equal(c1.re, 0);
    _assert2.default.equal(c2.re, 2);
  });

  it('should calculate the trace for a 1x1 matrix', function () {
    var c1 = math.complex(2, 3);
    var c2 = math.trace(math.matrix([[c1]]));
    _assert2.default.deepEqual(c1, c2);

    // c2 should be a clone
    c1.re = 0;
    _assert2.default.equal(c1.re, 0);
    _assert2.default.equal(c2.re, 2);
  });

  it('should calculate the trace for a 1x1 matrix, sparse', function () {
    var c1 = math.complex(2, 3);
    var c2 = math.trace(math.matrix([[c1]], 'sparse'));
    _assert2.default.deepEqual(c1, c2);

    // c2 should be a clone
    c1.re = 0;
    _assert2.default.equal(c1.re, 0);
    _assert2.default.equal(c2.re, 2);
  });

  it('should calculate correctly the trace of a matrix with bignumbers', function () {
    var bignumber = math.bignumber;

    // 1x1
    _assert2.default.deepEqual(math.trace([bignumber(5)]), bignumber(5));

    // 2x2
    _assert2.default.deepEqual(math.trace([[bignumber(1), bignumber(2)], [bignumber(3), bignumber(4)]]), bignumber(5));

    // 3x3
    _assert2.default.deepEqual(math.trace([[bignumber(-2), bignumber(2), bignumber(3)], [bignumber(-1), bignumber(1), bignumber(3)], [bignumber(2), bignumber(0), bignumber(-1)]]), bignumber(-2));

    // the following would fail with regular Numbers due to a precision overflow
    _assert2.default.deepEqual(math.trace([[bignumber(1e10 + 1), bignumber(1e10)], [bignumber(1e10), bignumber(-1e10)]]), bignumber(1));
  });

  it('should calculate the trace of a matrix with mixed numbers and bignumbers', function () {
    var bignumber = math.bignumber;
    _assert2.default.deepEqual(math.trace([[bignumber(2), 1], [bignumber(3), 4]]), bignumber(6));
  });

  it('should not change the value of the initial matrix', function () {
    var m_test = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    math.trace(m_test);
    _assert2.default.deepEqual(m_test, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });

  it('should not accept a non-square matrix', function () {
    _assert2.default.throws(function () {
      math.trace([1, 2]);
    });
    _assert2.default.throws(function () {
      math.trace([[1, 2, 3], [1, 2, 3]]);
    });
    _assert2.default.throws(function () {
      math.trace([0, 1], [0, 1], [0, 1]);
    });
    _assert2.default.throws(function () {
      math.trace(math.matrix([[1, 2, 3], [1, 2, 3]]));
    });
    _assert2.default.throws(function () {
      math.trace(math.matrix([[1, 2, 3], [1, 2, 3]], 'sparse'));
    });
  });

  it('should not accept arrays with dimensions higher than 2', function () {
    _assert2.default.throws(function () {
      math.trace([[[1]]]);
    }, RangeError);
    _assert2.default.throws(function () {
      math.trace(math.matrix([[[1]]]));
    }, RangeError);
  });

  it('should LaTeX trace', function () {
    var expression = math.parse('trace([[1,2],[3,4]])');
    _assert2.default.equal(expression.toTex(), '\\mathrm{tr}\\left(\\begin{bmatrix}1&2\\\\3&4\\\\\\end{bmatrix}\\right)');
  });

  describe('DenseMatrix', function () {

    it('should calculate trace on a square matrix', function () {
      var m = math.matrix([[1, 2], [4, -2]]);
      _assert2.default.equal(math.trace(m), -1);

      m = math.matrix([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);
      _assert2.default.equal(math.trace(m), 0);

      m = math.matrix([[1, 0, 0, 0], [0, 0, 2, 0], [1, 0, 0, 0], [0, 0, 1, 9]]);
      _assert2.default.equal(math.trace(m), 10);
    });

    it('should throw an error for invalid matrix', function () {
      var m = math.matrix([[1, 2, 3], [4, 5, 6]]);
      _assert2.default.throws(function () {
        math.trace(m);
      });
    });
  });

  describe('SparseMatrix', function () {

    it('should calculate trace on a square matrix', function () {
      var m = math.matrix([[1, 2], [4, -2]], 'sparse');
      _assert2.default.equal(math.trace(m), -1);

      m = math.matrix([[0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]], 'sparse');
      _assert2.default.equal(math.trace(m), 0);

      m = math.matrix([[1, 0, 0, 0], [0, 0, 2, 0], [1, 0, 0, 0], [0, 0, 1, 9]], 'sparse');
      _assert2.default.equal(math.trace(m), 10);
    });

    it('should throw an error for invalid matrix', function () {
      var m = math.matrix([[1, 2, 3], [4, 5, 6]], 'sparse');
      _assert2.default.throws(function () {
        math.trace(m);
      });
    });
  });
});
