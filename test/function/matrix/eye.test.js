'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index'),
    matrix = math.matrix,
    eye = math.eye;

describe('eye', function () {

  it('should create an empty matrix', function () {
    _assert2.default.deepEqual(eye(), matrix());
    _assert2.default.deepEqual(eye([]), []);
    _assert2.default.deepEqual(eye(matrix([])), matrix());
  });

  it('should create an empty sparse matrix', function () {
    _assert2.default.deepEqual(eye('sparse'), matrix('sparse'));
    _assert2.default.deepEqual(eye(matrix([], 'sparse')), matrix('sparse'));
  });

  it('should create an identity matrix of the given size', function () {
    _assert2.default.deepEqual(eye(1), matrix([[1]]));
    _assert2.default.deepEqual(eye(2), matrix([[1, 0], [0, 1]]));
    _assert2.default.deepEqual(eye([2]), [[1, 0], [0, 1]]);
    _assert2.default.deepEqual(eye(2, 3), matrix([[1, 0, 0], [0, 1, 0]]));
    _assert2.default.deepEqual(eye(3, 2), matrix([[1, 0], [0, 1], [0, 0]]));
    _assert2.default.deepEqual(eye([3, 2]), [[1, 0], [0, 1], [0, 0]]);
    _assert2.default.deepEqual(eye(math.matrix([3, 2])), matrix([[1, 0], [0, 1], [0, 0]]));
    _assert2.default.deepEqual(eye(3, 3), matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]]));
  });

  it('should create an identity matrix with storage type css of the given size', function () {
    _assert2.default.deepEqual(eye(1, 'sparse'), matrix([[1]], 'sparse'));
    _assert2.default.deepEqual(eye(2, 'sparse'), matrix([[1, 0], [0, 1]], 'sparse'));
    _assert2.default.deepEqual(eye(2, 3, 'sparse'), matrix([[1, 0, 0], [0, 1, 0]], 'sparse'));
    _assert2.default.deepEqual(eye(3, 2, 'sparse'), matrix([[1, 0], [0, 1], [0, 0]], 'sparse'));
    _assert2.default.deepEqual(eye(3, 3, 'sparse'), matrix([[1, 0, 0], [0, 1, 0], [0, 0, 1]], 'sparse'));
  });

  it('should create an identity matrix with bignumbers', function () {
    var zero = math.bignumber(0);
    var one = math.bignumber(1);
    var two = math.bignumber(2);
    var three = math.bignumber(3);
    _assert2.default.deepEqual(eye(two), matrix([[one, zero], [zero, one]]));
    //assert.deepEqual(eye(two, 'sparse'), matrix([[one,zero],[zero,one]], 'sparse')); // FIXME: eye css
    _assert2.default.deepEqual(eye(two, three), matrix([[one, zero, zero], [zero, one, zero]]));
    //assert.deepEqual(eye(two, three, 'sparse'), matrix([[one,zero,zero],[zero,one,zero]], 'sparse')); // FIXME: eye css
  });

  it('should return an array when setting matrix=="array"', function () {
    var math2 = math.create({ matrix: 'Array' });
    _assert2.default.deepEqual(math2.eye(2), [[1, 0], [0, 1]]);
  });

  it('should throw an error with an invalid input', function () {
    _assert2.default.throws(function () {
      eye(3, 3, 2);
    });
    _assert2.default.throws(function () {
      eye([3, 3, 2]);
    });
    _assert2.default.throws(function () {
      eye([3, 3], 2);
    });
    _assert2.default.throws(function () {
      eye([3.2, 3]);
    });
    _assert2.default.throws(function () {
      eye([3, 3.2]);
    });
    _assert2.default.throws(function () {
      eye([3.2, 3.2]);
    });
    _assert2.default.throws(function () {
      eye([2, 'str']);
    });
    _assert2.default.throws(function () {
      eye(['str', 2]);
    });
    _assert2.default.throws(function () {
      eye([-2, 2]);
    });
    _assert2.default.throws(function () {
      eye([2, -2]);
    });
  });

  it('should LaTeX eye', function () {
    var expression = math.parse('eye(2)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{eye}\\left(2\\right)');
  });
});
