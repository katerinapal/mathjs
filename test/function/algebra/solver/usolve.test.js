"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../../tools/approx");

var _index = require("../../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('usolve', function () {

  it('should solve linear system 4 x 4, arrays', function () {
    var m = [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]];
    var b = [1, 2, 3, 4];

    var x = _index.indexjs.usolve(m, b);

    (0, _approx.deepEqual)(x, [-1, -1, -1, 4]);
  });

  it('should solve linear system 4 x 4, array and column array', function () {
    var m = [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]];
    var b = [[1], [2], [3], [4]];
    var x = _index.indexjs.usolve(m, b);

    (0, _approx.deepEqual)(x, [[-1], [-1], [-1], [4]]);
  });

  it('should solve linear system 4 x 4, matrices', function () {
    var m = _index.indexjs.matrix([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]]);
    var b = _index.indexjs.matrix([1, 2, 3, 4]);

    var x = _index.indexjs.usolve(m, b);

    (0, _assert2.default)(x instanceof _index.indexjs.type.Matrix);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-1], [-1], [4]]));
  });

  it('should solve linear system 4 x 4, sparse matrices', function () {
    var m = _index.indexjs.sparse([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]]);
    var b = _index.indexjs.matrix([[1], [2], [3], [4]], 'sparse');

    var x = _index.indexjs.usolve(m, b);

    (0, _assert2.default)(x instanceof _index.indexjs.type.Matrix);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-1], [-1], [4]]));
  });

  it('should solve linear system 4 x 4, matrix and column matrix', function () {
    var m = _index.indexjs.matrix([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]]);
    var b = _index.indexjs.matrix([[1], [2], [3], [4]]);

    var x = _index.indexjs.usolve(m, b);

    (0, _assert2.default)(x instanceof _index.indexjs.type.Matrix);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-1], [-1], [4]]));
  });

  it('should solve linear system 4 x 4, sparse matrix and column matrix', function () {
    var m = _index.indexjs.matrix([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]], 'sparse');
    var b = _index.indexjs.matrix([[1], [2], [3], [4]], 'sparse');

    var x = _index.indexjs.usolve(m, b);

    (0, _assert2.default)(x instanceof _index.indexjs.type.Matrix);
    (0, _approx.deepEqual)(x, _index.indexjs.matrix([[-1], [-1], [-1], [4]]));
  });

  it('should throw exception when matrix is singular', function () {
    _assert2.default.throws(function () {
      _index.indexjs.usolve([[1, 1], [0, 0]], [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
    _assert2.default.throws(function () {
      _index.indexjs.usolve(_index.indexjs.matrix([[1, 1], [0, 0]], 'dense'), [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
    _assert2.default.throws(function () {
      _index.indexjs.usolve(_index.indexjs.matrix([[1, 1], [0, 0]], 'sparse'), [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
  });
});
