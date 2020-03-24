"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../../tools/approx");

var _index = require("../../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('lusolve', function () {

  it('should solve linear system 4 x 4, arrays', function () {
    var m = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]];
    var b = [-1, -1, -1, -1];

    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, [-1, -0.5, -1 / 3, -0.25]);
  });

  it('should solve linear system 4 x 4, array and column array', function () {
    var m = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]];
    var b = [[-1], [-1], [-1], [-1]];
    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, [[-1], [-0.5], [-1 / 3], [-0.25]]);
  });

  it('should solve linear system 4 x 4, matrices', function () {
    var m = _index.indexjs.matrix([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]]);
    var b = _index.indexjs.matrix([-1, -1, -1, -1]);

    var x = _index.indexjs.lusolve(m, b);

    (0, _assert2.default)(x instanceof _index.indexjs.type.Matrix);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-0.5], [-1 / 3], [-0.25]]));
  });

  it('should solve linear system 4 x 4, sparse matrices', function () {
    var m = _index.indexjs.matrix([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]], 'sparse');
    var b = _index.indexjs.matrix([[-1], [-1], [-1], [-1]], 'sparse');

    var x = _index.indexjs.lusolve(m, b);

    (0, _assert2.default)(x instanceof _index.indexjs.type.Matrix);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-0.5], [-1 / 3], [-0.25]]));
  });

  it('should solve linear system 4 x 4, matrix and column matrix', function () {
    var m = _index.indexjs.matrix([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]]);
    var b = _index.indexjs.matrix([[-1], [-1], [-1], [-1]]);

    var x = _index.indexjs.lusolve(m, b);

    (0, _assert2.default)(x instanceof _index.indexjs.type.Matrix);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-0.5], [-1 / 3], [-0.25]]));
  });

  it('should solve linear system 4 x 4, sparse matrix and column matrix', function () {
    var m = _index.indexjs.matrix([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]], 'sparse');
    var b = _index.indexjs.matrix([[-1], [-1], [-1], [-1]], 'sparse');

    var x = _index.indexjs.lusolve(m, b);

    (0, _assert2.default)(x instanceof _index.indexjs.type.Matrix);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-0.5], [-1 / 3], [-0.25]]));
  });

  it('should solve linear system 4 x 4, LUP decomposition (array)', function () {
    var m = [[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]];
    var lup = _index.indexjs.lup(m);

    var x = _index.indexjs.lusolve(lup, [-1, -1, -1, -1]);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-0.5], [-1 / 3], [-0.25]]));

    var y = _index.indexjs.lusolve(lup, [1, 2, 1, -1]);
    (0, _approx.deepEqual)(y, _index.indexjs.matrix([[1], [1], [1 / 3], [-0.25]]));
  });

  it('should solve linear system 4 x 4, LUP decomposition (matrix)', function () {
    var m = _index.indexjs.matrix([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]]);
    var lup = _index.indexjs.lup(m);

    var x = _index.indexjs.lusolve(lup, [-1, -1, -1, -1]);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-0.5], [-1 / 3], [-0.25]]));

    var y = _index.indexjs.lusolve(lup, [1, 2, 1, -1]);
    (0, _approx.deepEqual)(y, _index.indexjs.matrix([[1], [1], [1 / 3], [-0.25]]));
  });

  it('should solve linear system 4 x 4, LUP decomposition (sparse matrix)', function () {
    var m = _index.indexjs.matrix([[1, 0, 0, 0], [0, 2, 0, 0], [0, 0, 3, 0], [0, 0, 0, 4]], 'sparse');
    var lup = _index.indexjs.lup(m);

    var x = _index.indexjs.lusolve(lup, [-1, -1, -1, -1]);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-0.5], [-1 / 3], [-0.25]]));

    var y = _index.indexjs.lusolve(lup, [1, 2, 1, -1]);
    (0, _approx.deepEqual)(y, _index.indexjs.matrix([[1], [1], [1 / 3], [-0.25]]));
  });

  it('should solve linear system 3 x 3, no permutations, arrays', function () {
    var m = [[2, 1, 1], [1, 2, -1], [1, 2, 1]];
    var b = [-2, 4, 2];

    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, [[-5 / 3], [7 / 3], [-1]]);
  });

  it('should solve linear system 3 x 3, no permutations, matrix', function () {
    var m = _index.indexjs.matrix([[2, 1, 1], [1, 2, -1], [1, 2, 1]]);
    var b = [-2, 4, 2];

    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-5 / 3], [7 / 3], [-1]]));
  });

  it('should solve linear system 3 x 3, no permutations, sparse matrix', function () {
    var m = _index.indexjs.matrix([[2, 1, 1], [1, 2, -1], [1, 2, 1]], 'sparse');
    var b = [-2, 4, 2];

    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-5 / 3], [7 / 3], [-1]]));
  });

  it('should solve linear system 3 x 3, permutations, arrays', function () {
    var m = [[1, 2, -1], [2, 1, 1], [1, 2, 1]];
    var b = [4, -2, 2];

    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, [[-5 / 3], [7 / 3], [-1]]);
  });

  it('should solve linear system 4 x 4, permutations, matrix - Issue 437', function () {
    var m = _index.indexjs.matrix([[-1, 1, -1, 1], [0, 0, 0, 1], [1, 1, 1, 1], [8, 4, 2, 1]]);

    var b = [0.1, 0.2, 0.15, 0.1];

    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[0.025], [-0.075], [0], [0.2]]));
  });

  it('should solve linear system 4 x 4, permutations, sparse - Issue 437', function () {
    var m = _index.indexjs.sparse([[-1, 1, -1, 1], [0, 0, 0, 1], [1, 1, 1, 1], [8, 4, 2, 1]]);

    var b = [0.1, 0.2, 0.15, 0.1];

    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[0.025], [-0.075], [0], [0.2]]));
  });

  it('should solve linear system 3 x 3, permutations, sparse matrix', function () {
    var m = _index.indexjs.matrix([[1, 2, -1], [2, 1, 1], [1, 2, 1]], 'sparse');
    var b = [4, -2, 2];

    var x = _index.indexjs.lusolve(m, b);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-5 / 3], [7 / 3], [-1]]));
  });

  it('should solve linear system 4 x 4, natural ordering (order=0), partial pivoting, sparse matrix', function () {
    var m = _index.indexjs.sparse([[4.5, 0, 3.2, 0], [3.1, 2.9, 0, 0.9], [0, 1.7, 3, 0], [3.5, 0.4, 0, 1]]);

    var b = [1.000000, 1.250000, 1.500000, 1.750000];

    var x = _index.indexjs.lusolve(m, b, 0, 1);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-0.186372], [-0.131621], [0.574586], [2.454950]]));
  });

  it('should solve linear system 4 x 4, amd(A+A\') (order=1), partial pivoting, sparse matrix', function () {
    var m = _index.indexjs.sparse([[4.5, 0, 3.2, 0], [3.1, 2.9, 0, 0.9], [0, 1.7, 3, 0], [3.5, 0.4, 0, 1]]);

    var b = [1.000000, 1.250000, 1.500000, 1.750000];

    var x = _index.indexjs.lusolve(m, b, 1, 1);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-0.186372], [-0.131621], [0.574586], [2.454950]]));
  });

  it('should solve linear system 4 x 4, amd(A\'*A) (order=2), partial pivoting, sparse matrix', function () {
    var m = _index.indexjs.sparse([[4.5, 0, 3.2, 0], [3.1, 2.9, 0, 0.9], [0, 1.7, 3, 0], [3.5, 0.4, 0, 1]]);

    var b = [1.000000, 1.250000, 1.500000, 1.750000];

    var x = _index.indexjs.lusolve(m, b, 2, 1);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-0.186372], [-0.131621], [0.574586], [2.454950]]));
  });

  it('should solve linear system 4 x 4, amd(A\'*A) (order=3), partial pivoting, sparse matrix', function () {
    var m = _index.indexjs.sparse([[4.5, 0, 3.2, 0], [3.1, 2.9, 0, 0.9], [0, 1.7, 3, 0], [3.5, 0.4, 0, 1]]);

    var b = [1.000000, 1.250000, 1.500000, 1.750000];

    var x = _index.indexjs.lusolve(m, b, 3, 1);

    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-0.186372], [-0.131621], [0.574586], [2.454950]]));
  });

  it('should throw exception when matrix is singular', function () {
    _assert2.default.throws(function () {
      _index.indexjs.lusolve([[1, 1], [0, 0]], [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
    _assert2.default.throws(function () {
      _index.indexjs.lusolve(_index.indexjs.matrix([[1, 1], [0, 0]], 'dense'), [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
    _assert2.default.throws(function () {
      _index.indexjs.lusolve(_index.indexjs.matrix([[1, 1], [0, 0]], 'sparse'), [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
  });
});
