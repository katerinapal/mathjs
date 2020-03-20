"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var bignumber = _index.indexjs.bignumber;

describe('diag', function () {

  it('should return a diagonal matrix on the default diagonal', function () {
    _assert2.default.deepEqual(_index.indexjs.diag([1, 2, 3]), [[1, 0, 0], [0, 2, 0], [0, 0, 3]]);
    _assert2.default.deepEqual(_index.indexjs.diag([[1, 2, 3], [4, 5, 6]]), [1, 5]);
  });

  it('should return a diagonal matrix on the default diagonal, dense matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.diag([1, 2, 3], 'dense'), _index.indexjs.matrix([[1, 0, 0], [0, 2, 0], [0, 0, 3]], 'dense'));
    _assert2.default.deepEqual(_index.indexjs.diag(_index.indexjs.matrix([[1, 2, 3], [4, 5, 6]], 'dense')), _index.indexjs.matrix([1, 5], 'dense'));
  });

  it('should return a diagonal matrix on the default diagonal, sparse matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.diag([1, 2, 3], 'sparse'), _index.indexjs.matrix([[1, 0, 0], [0, 2, 0], [0, 0, 3]], 'sparse'));
    _assert2.default.deepEqual(_index.indexjs.diag(_index.indexjs.matrix([[1, 2, 3], [4, 5, 6]], 'sparse')), _index.indexjs.matrix([1, 5], 'sparse'));
  });

  it('should return a array output on array input', function () {
    _assert2.default.deepEqual(_index.indexjs.diag([1, 2]), [[1, 0], [0, 2]]);
  });

  it('should return a matrix output on matrix input', function () {
    _assert2.default.deepEqual(_index.indexjs.diag(_index.indexjs.matrix([1, 2])), _index.indexjs.matrix([[1, 0], [0, 2]]));
    _assert2.default.deepEqual(_index.indexjs.diag(_index.indexjs.matrix([[1, 2], [3, 4]])), _index.indexjs.matrix([1, 4]));
  });

  it('should put vector on given diagonal k in returned matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.diag([1, 2, 3], 1), [[0, 1, 0, 0], [0, 0, 2, 0], [0, 0, 0, 3]]);
    _assert2.default.deepEqual(_index.indexjs.diag([1, 2, 3], -1), [[0, 0, 0], [1, 0, 0], [0, 2, 0], [0, 0, 3]]);
  });

  it('should return diagonal k from a matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.diag([[1, 2, 3], [4, 5, 6]], 1), [2, 6]);
    _assert2.default.deepEqual(_index.indexjs.diag([[1, 2, 3], [4, 5, 6]], -1), [4]);
    _assert2.default.deepEqual(_index.indexjs.diag([[1, 2, 3], [4, 5, 6]], -2), []);
  });

  it('should throw an error in case of invalid k', function () {
    _assert2.default.throws(function () {
      _index.indexjs.diag([[1, 2, 3], [4, 5, 6]], 2.4);
    }, /Second parameter in function diag must be an integer/);
  });

  describe('bignumber', function () {
    var array123 = [bignumber(1), bignumber(2), bignumber(3)];
    var array123456 = [[bignumber(1), bignumber(2), bignumber(3)], [bignumber(4), bignumber(5), bignumber(6)]];

    it('should return a diagonal matrix on the default diagonal', function () {
      _assert2.default.deepEqual(_index.indexjs.diag(array123), [[bignumber(1), bignumber(0), bignumber(0)], [bignumber(0), bignumber(2), bignumber(0)], [bignumber(0), bignumber(0), bignumber(3)]]);

      _assert2.default.deepEqual(_index.indexjs.diag(array123456), [bignumber(1), bignumber(5)]);
    });

    it('should return a array output on array input', function () {
      _assert2.default.deepEqual(_index.indexjs.diag([bignumber(1), bignumber(2)]), [[bignumber(1), bignumber(0)], [bignumber(0), bignumber(2)]]);
    });

    it('should return a matrix output on matrix input', function () {
      _assert2.default.deepEqual(_index.indexjs.diag(_index.indexjs.matrix([bignumber(1), bignumber(2)])), _index.indexjs.matrix([[bignumber(1), bignumber(0)], [bignumber(0), bignumber(2)]]));
      _assert2.default.deepEqual(_index.indexjs.diag(_index.indexjs.matrix([[bignumber(1), bignumber(2)], [bignumber(3), bignumber(4)]])), _index.indexjs.matrix([bignumber(1), bignumber(4)]));
    });

    it('should put vector on given diagonal k in returned matrix', function () {
      _assert2.default.deepEqual(_index.indexjs.diag(array123, bignumber(1)), [[bignumber(0), bignumber(1), bignumber(0), bignumber(0)], [bignumber(0), bignumber(0), bignumber(2), bignumber(0)], [bignumber(0), bignumber(0), bignumber(0), bignumber(3)]]);
      _assert2.default.deepEqual(_index.indexjs.diag(array123, bignumber(-1)), [[bignumber(0), bignumber(0), bignumber(0)], [bignumber(1), bignumber(0), bignumber(0)], [bignumber(0), bignumber(2), bignumber(0)], [bignumber(0), bignumber(0), bignumber(3)]]);
    });

    it('should return diagonal k from a matrix', function () {
      _assert2.default.deepEqual(_index.indexjs.diag(array123456, bignumber(1)), [bignumber(2), bignumber(6)]);
      _assert2.default.deepEqual(_index.indexjs.diag(array123456, bignumber(-1)), [bignumber(4)]);
      _assert2.default.deepEqual(_index.indexjs.diag(array123456, bignumber(-2)), []);
    });
  });

  it('should throw an error of the input matrix is not valid', function () {
    _assert2.default.throws(function () {
      _index.indexjs.diag([[[1], [2]], [[3], [4]]]);
    });
    // TODO: test diag for all types of input (also scalar)
  });

  it('should throw an error in case of wrong number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.diag();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.diag([], 2, 3, 4);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.diag(2);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      _index.indexjs.diag([], new Date());
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX diag', function () {
    var expr1 = _index.indexjs.parse('diag([1,2,3])');
    var expr2 = _index.indexjs.parse('diag([1,2,3],1)');

    _assert2.default.equal(expr1.toTex(), '\\mathrm{diag}\\left(\\begin{bmatrix}1\\\\2\\\\3\\\\\\end{bmatrix}\\right)');
    _assert2.default.equal(expr2.toTex(), '\\mathrm{diag}\\left(\\begin{bmatrix}1\\\\2\\\\3\\\\\\end{bmatrix},1\\right)');
  });
});
