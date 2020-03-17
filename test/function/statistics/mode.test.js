'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index'),
    mode = math.mode,
    DenseMatrix = math.type.DenseMatrix;

describe('mode', function () {
  it('should return the mode accurately for one dimensional array', function () {
    _assert2.default.deepEqual(mode([1, 2.7, 3.2, 4, 2.7]), [2.7]);
    _assert2.default.deepEqual(mode([13, 24, 35, 46, 13]), [13]);
    _assert2.default.deepEqual(mode([1, 5, -5, 1]), [1]);
  });

  it('should return the correct mode when there are more than one values of mode', function () {
    _assert2.default.deepEqual(mode([1, 2.7, 3.2, 3.2, 4, 2.7]), [3.2, 2.7]);
    _assert2.default.deepEqual(mode([13, 24, 35, 46]), [13, 24, 35, 46]);
    _assert2.default.deepEqual(mode(['boston', 'delhi', 'cape town']), ['boston', 'delhi', 'cape town']);
  });

  it('should return the mode accurately for loose arguments', function () {
    _assert2.default.deepEqual(mode(2, 1, 4, 3, 1), [1]);
    _assert2.default.deepEqual(mode('a', 'b', 'c', 'b'), ['b']);
  });

  it('should return the mode of booleans', function () {
    _assert2.default.deepEqual(mode(true, true, false), [true]);
    _assert2.default.deepEqual(mode(true, [false, false]), [false]);
  });

  it('should return the mode correctly for different datatypes', function () {
    _assert2.default.deepEqual(mode(2, 1, 'f', 3.5, 1.0), [1]);
    _assert2.default.deepEqual(mode('a', 'b', 4, 'b'), ['b']);
  });

  it('should not throw an error if the input contains mixture of array and non-array values', function () {
    _assert2.default.deepEqual(mode(1, [3], [1, 2, 3, 7], 3, [8]), [3]);
    _assert2.default.deepEqual(mode([1], 3, [3]), [3]);
    _assert2.default.deepEqual(mode([13, 24], [35, 46]), [13, 24, 35, 46]);
    _assert2.default.deepEqual(mode([], 0), [0]);
  });

  it('should throw appropriate error if no parameters are assigned', function () {
    _assert2.default.throws(function () {
      mode([]);
    });
    _assert2.default.throws(function () {
      mode();
    });
  });

  /* TODO :
  it('should throw appropriate error if parameters contain array of arrays or nested arrays', function(){
    assert.throws(function() {mode([1][3][3])});
    assert.throws(function() {mode([a[b, a]])});
  });
  */

  it('should return the mode of a 1D matrix', function () {
    _assert2.default.deepEqual(mode(new DenseMatrix([1, 3, 5, 2, -5, 3])), [3]);
  });

  it('should return the mode of a 2D matrix', function () {
    _assert2.default.deepEqual(mode(new DenseMatrix([[1, 4, 0], [3, 0, 5]])), [0]);
  });
});
