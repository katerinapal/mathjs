"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {};
var BigNumber = _index.indexjs.type.BigNumber;
var Complex = _index.indexjs.type.Complex;
var DenseMatrix = _index.indexjs.type.DenseMatrix;
var det = _index.indexjs.det;
var diag = _index.indexjs.diag;
var eye = _index.indexjs.eye;

describe('det', function () {

  it('should calculate correctly the determinant of a NxN matrix', function () {
    _assert2.default.equal(det([5]), 5);
    _assert2.default.equal(det([[1, 2], [3, 4]]), -2);
    _assert2.default.equal(det(new DenseMatrix([[1, 2], [3, 4]])), -2);
    (0, _approx.equal)(det([[-2, 2, 3], [-1, 1, 3], [2, 0, -1]]), 6);
    (0, _approx.equal)(det([[1, 4, 7], [3, 0, 5], [-1, 9, 11]]), -8);
    (0, _approx.equal)(det([[1, 7, 4, 3, 7], [0, 7, 0, 3, 7], [0, 7, 4, 3, 0], [1, 7, 5, 9, 7], [2, 7, 4, 3, 7]]), -1176);
    (0, _approx.equal)(det(diag([4, -5, 6])), -120);
  });

  it('should return 1 for the identity matrix', function () {
    _assert2.default.equal(det(eye(7)), 1);
    _assert2.default.equal(det(eye(2)), 1);
    _assert2.default.equal(det(eye(1)), 1);
  });

  it('should return 0 for a singular matrix', function () {
    _assert2.default.equal(det([[1, 0], [0, 0]]), 0);
    _assert2.default.equal(det([[1, 0], [1, 0]]), 0);
    _assert2.default.equal(det([[2, 6], [1, 3]]), 0);
    _assert2.default.equal(det([[1, 0, 0], [0, 0, 0], [1, 0, 0]]), 0);
  });

  it('should calculate the determinant for a scalar', function () {
    _assert2.default.equal(det(7), 7);

    var c1 = new Complex(2, 3);
    var c2 = det(c1);
    _assert2.default.deepEqual(c1, c2);

    // c2 should be a clone
    c1.re = 0;
    _assert2.default.equal(c1.re, 0);
    _assert2.default.equal(c2.re, 2);
  });

  it('should calculate the determinant for a 1x1 matrix', function () {
    var c1 = new Complex(2, 3);
    var c2 = det([[c1]]);
    _assert2.default.deepEqual(c1, c2);

    // c2 should be a clone
    c1.re = 0;
    _assert2.default.equal(c1.re, 0);
    _assert2.default.equal(c2.re, 2);
  });

  it('should calculate correctly the determinant of a matrix with bignumbers', function () {
    // 1x1
    _assert2.default.deepEqual(det([new BigNumber(5)]), new BigNumber(5));

    // 2x2
    _assert2.default.deepEqual(det([[new BigNumber(1), new BigNumber(2)], [new BigNumber(3), new BigNumber(4)]]), new BigNumber(-2));

    // 3x3
    _assert2.default.deepEqual(det([[new BigNumber(-2), new BigNumber(2), new BigNumber(3)], [new BigNumber(-1), new BigNumber(1), new BigNumber(3)], [new BigNumber(2), new BigNumber(0), new BigNumber(-1)]]), new _index.indexjs.type.BigNumber(6));

    // the following would fail with regular Numbers due to a precision overflow
    _assert2.default.deepEqual(det([[new BigNumber(1e10 + 1), new BigNumber(1e10)], [new BigNumber(1e10), new BigNumber(1e10 - 1)]]), new BigNumber(-1));
  });

  it('should calculate the determinant of a matrix with mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(det([[1, new BigNumber(2)], [new BigNumber(3), 4]]), new _index.indexjs.type.BigNumber(-2));
  });

  it('should not change the value of the initial matrix', function () {
    var m_test = [[1, 2, 3], [4, 5, 6], [7, 8, 9]];
    det(m_test);
    _assert2.default.deepEqual(m_test, [[1, 2, 3], [4, 5, 6], [7, 8, 9]]);
  });

  it('should not accept a non-square matrix', function () {
    _assert2.default.throws(function () {
      det([1, 2]);
    });
    _assert2.default.throws(function () {
      det([[1, 2, 3], [1, 2, 3]]);
    });
    _assert2.default.throws(function () {
      det([0, 1], [0, 1], [0, 1]);
    });
  });

  it('should not accept arrays with dimensions higher than 2', function () {
    _assert2.default.throws(function () {
      det([[[1]]]);
    }, RangeError);
    _assert2.default.throws(function () {
      det(new DenseMatrix([[[1]]]));
    }, RangeError);
  });

  it('should LaTeX det', function () {
    var expression = _index.indexjs.parse('det([1])');
    _assert2.default.equal(expression.toTex(), '\\det\\left(\\begin{bmatrix}1\\\\\\end{bmatrix}\\right)');
  });
});
