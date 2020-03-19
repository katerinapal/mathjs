"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('usolve', function () {

  it('should solve linear system 4 x 4, arrays', function () {
    var m = [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]];
    var b = [1, 2, 3, 4];

    var x = math.usolve(m, b);

    (0, _approx.deepEqual)(x, [-1, -1, -1, 4]);
  });

  it('should solve linear system 4 x 4, array and column array', function () {
    var m = [[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]];
    var b = [[1], [2], [3], [4]];
    var x = math.usolve(m, b);

    (0, _approx.deepEqual)(x, [[-1], [-1], [-1], [4]]);
  });

  it('should solve linear system 4 x 4, matrices', function () {
    var m = math.matrix([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]]);
    var b = math.matrix([1, 2, 3, 4]);

    var x = math.usolve(m, b);

    (0, _assert2.default)(x instanceof math.type.Matrix);
    (0, _approx.deepEqual)(x, math.matrix([[-1], [-1], [-1], [4]]));
  });

  it('should solve linear system 4 x 4, sparse matrices', function () {
    var m = math.sparse([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]]);
    var b = math.matrix([[1], [2], [3], [4]], 'sparse');

    var x = math.usolve(m, b);

    (0, _assert2.default)(x instanceof math.type.Matrix);
    (0, _approx.deepEqual)(x, math.matrix([[-1], [-1], [-1], [4]]));
  });

  it('should solve linear system 4 x 4, matrix and column matrix', function () {
    var m = math.matrix([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]]);
    var b = math.matrix([[1], [2], [3], [4]]);

    var x = math.usolve(m, b);

    (0, _assert2.default)(x instanceof math.type.Matrix);
    (0, _approx.deepEqual)(x, math.matrix([[-1], [-1], [-1], [4]]));
  });

  it('should solve linear system 4 x 4, sparse matrix and column matrix', function () {
    var m = math.matrix([[1, 1, 1, 1], [0, 1, 1, 1], [0, 0, 1, 1], [0, 0, 0, 1]], 'sparse');
    var b = math.matrix([[1], [2], [3], [4]], 'sparse');

    var x = math.usolve(m, b);

    (0, _assert2.default)(x instanceof math.type.Matrix);
    (0, _approx.deepEqual)(x, math.matrix([[-1], [-1], [-1], [4]]));
  });

  it('should throw exception when matrix is singular', function () {
    _assert2.default.throws(function () {
      math.usolve([[1, 1], [0, 0]], [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
    _assert2.default.throws(function () {
      math.usolve(math.matrix([[1, 1], [0, 0]], 'dense'), [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
    _assert2.default.throws(function () {
      math.usolve(math.matrix([[1, 1], [0, 0]], 'sparse'), [1, 1]);
    }, /Error: Linear system cannot be solved since matrix is singular/);
  });
});
