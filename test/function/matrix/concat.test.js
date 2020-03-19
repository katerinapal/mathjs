'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    bignumber = math.bignumber;

describe('concat', function () {

  var a = [[1, 2], [3, 4]];
  var b = [[5, 6], [7, 8]];
  var c = [[9, 10], [11, 12]];
  var d = [[[1, 2], [3, 4]], [[5, 6], [7, 8]]];
  var e = [[[9, 10], [11, 12]], [[13, 14], [15, 16]]];

  it('should concatenate compatible matrices on the last dimension by default', function () {
    _assert2.default.deepEqual(math.concat([1, 2, 3], [4, 5]), [1, 2, 3, 4, 5]);
    _assert2.default.deepEqual(math.concat([bignumber(1), bignumber(2), bignumber(3)], [bignumber(4)]), [bignumber(1), bignumber(2), bignumber(3), bignumber(4)]);
    _assert2.default.deepEqual(math.concat([[1], [2], [3]], [[4]], 0), [[1], [2], [3], [4]]);
    _assert2.default.deepEqual(math.concat([[], []], [[1, 2], [3, 4]]), [[1, 2], [3, 4]]);

    _assert2.default.deepEqual(math.concat(math.matrix(a), math.matrix(b)), math.matrix([[1, 2, 5, 6], [3, 4, 7, 8]]));

    _assert2.default.deepEqual(math.concat(a, b, c), [[1, 2, 5, 6, 9, 10], [3, 4, 7, 8, 11, 12]]);

    _assert2.default.deepEqual(math.concat(d, e), [[[1, 2, 9, 10], [3, 4, 11, 12]], [[5, 6, 13, 14], [7, 8, 15, 16]]]);
  });

  it('should concatenate compatible matrices on the given dimension', function () {
    _assert2.default.deepEqual(math.concat([[1]], [[2]], 1), [[1, 2]]);
    _assert2.default.deepEqual(math.concat([[1]], [[2]], 0), [[1], [2]]);
    _assert2.default.deepEqual(math.concat([[1]], [[2]], 0), [[1], [2]]);

    _assert2.default.deepEqual(math.concat(a, b, 0), [[1, 2], [3, 4], [5, 6], [7, 8]]);

    _assert2.default.deepEqual(math.concat(a, b, c, 0), [[1, 2], [3, 4], [5, 6], [7, 8], [9, 10], [11, 12]]);

    _assert2.default.deepEqual(math.concat(d, e, 0), [[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]], [[13, 14], [15, 16]]]);

    _assert2.default.deepEqual(math.concat(d, e, 1), [[[1, 2], [3, 4], [9, 10], [11, 12]], [[5, 6], [7, 8], [13, 14], [15, 16]]]);

    _assert2.default.deepEqual(math.concat(d, e, bignumber(1)), [[[1, 2], [3, 4], [9, 10], [11, 12]], [[5, 6], [7, 8], [13, 14], [15, 16]]]);
  });

  it('should concatenate strings', function () {
    _assert2.default.strictEqual(math.concat('a', 'b'), 'ab');
    _assert2.default.strictEqual(math.concat('a', 'b', 'c'), 'abc');
  });

  it('should throw an error in case of invalid requested dimension number', function () {
    _assert2.default.throws(function () {
      math.concat([1, 2], [3, 4], 2.3);
    }, /Integer number expected for dimension/);
    _assert2.default.throws(function () {
      math.concat([1, 2], [3, 4], 1);
    }, /Index out of range \(1 > 0\)/);
  });

  it('should throw an error in case dimension mismatch', function () {
    _assert2.default.throws(function () {
      math.concat([1, 2], [[1, 2], [3, 4]]);
    }, RangeError);
    _assert2.default.throws(function () {
      math.concat([[1, 2]], [[1, 2], [3, 4]]);
    }, /Dimension mismatch/);
  });

  it('should throw an error in case of invalid type of argument', function () {
    _assert2.default.throws(function () {
      math.concat(math.complex(2, 3));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error when called without matrices as argument', function () {
    _assert2.default.throws(function () {
      math.concat(2);
    }, /At least one matrix expected/);
  });

  it('should LaTeX concat', function () {
    var expression = math.parse('concat([1],[2])');
    _assert2.default.equal(expression.toTex(), '\\mathrm{concat}\\left(\\begin{bmatrix}1\\\\\\end{bmatrix},\\begin{bmatrix}2\\\\\\end{bmatrix}\\right)');
  });
});
