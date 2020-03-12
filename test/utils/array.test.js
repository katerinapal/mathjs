"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _array = require("../../lib/utils/array");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var resize = _array.size;
size = _array.size;

describe('util.array', function () {

  describe('size', function () {

    it('should calculate the size of a scalar', function () {
      _assert2.default.deepEqual(size(2), []);
      _assert2.default.deepEqual(size("string"), []);
    });

    it('should calculate the size of a 1-dimensional array', function () {
      _assert2.default.deepEqual(size([]), [0]);
      _assert2.default.deepEqual(size([1]), [1]);
      _assert2.default.deepEqual(size([1, 2, 3]), [3]);
    });

    it('should calculate the size of a 2-dimensional array', function () {
      _assert2.default.deepEqual(size([[]]), [1, 0]);
      _assert2.default.deepEqual(size([[], []]), [2, 0]);
      _assert2.default.deepEqual(size([[1, 2], [3, 4]]), [2, 2]);
      _assert2.default.deepEqual(size([[1, 2, 3], [4, 5, 6]]), [2, 3]);
    });

    it('should calculate the size of a 3-dimensional array', function () {
      _assert2.default.deepEqual(size([[[]]]), [1, 1, 0]);
      _assert2.default.deepEqual(size([[[], []]]), [1, 2, 0]);
      _assert2.default.deepEqual(size([[[], []], [[], []]]), [2, 2, 0]);
      _assert2.default.deepEqual(size([[[1], [2]], [[3], [4]]]), [2, 2, 1]);
      _assert2.default.deepEqual(size([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [2, 2, 2]);
      _assert2.default.deepEqual(size([[[1, 2, 3, 4], [5, 6, 7, 8]], [[1, 2, 3, 4], [5, 6, 7, 8]], [[1, 2, 3, 4], [5, 6, 7, 8]]]), [3, 2, 4]);
    });

    it('should not validate whether all dimensions match', function () {
      _assert2.default.deepEqual(size([[1, 2], [3, 4, 5]]), [2, 2]);
    });
  });

  describe('resize', function () {

    it('should resize a 1 dimensional array', function () {
      var a = [];

      // resize with a default value
      a = resize(a, [3], 100);
      _assert2.default.deepEqual(a, [100, 100, 100]);

      // resize without default value
      a = resize(a, [5]);
      _assert2.default.deepEqual(a, [100, 100, 100, 0, 0]);

      a = resize(a, [2]);
      _assert2.default.deepEqual(a, [100, 100]);
    });

    it('should resize a 1 dimensional array with UNINITIALIZED defaultValue', function () {
      var a = [];

      // resize with default value UNINITIALIZED
      a = resize(a, [3], _array.size);
      _assert2.default.deepEqual(a, arr(uninit, uninit, uninit));
    });

    it('should resize a 2 dimensional array', function () {
      var a = [[0, 1], [2, 3]];

      a = resize(a, [2, 4]);
      _assert2.default.deepEqual(a, [[0, 1, 0, 0], [2, 3, 0, 0]]);

      a = resize(a, [4, 4]);
      _assert2.default.deepEqual(a, [[0, 1, 0, 0], [2, 3, 0, 0], [0, 0, 0, 0], [0, 0, 0, 0]]);

      a = resize(a, [4, 2]);
      _assert2.default.deepEqual(a, [[0, 1], [2, 3], [0, 0], [0, 0]]);

      a = resize(a, [2, 2]);
      _assert2.default.deepEqual(a, [[0, 1], [2, 3]]);

      a = resize(a, [1, 1]);
      _assert2.default.deepEqual(a, [[0]]);
    });

    it('should resize a 2 dimensional array with default value', function () {
      var a = [[0, 1], [2, 3]];

      a = resize(a, [2, 4], 100);
      _assert2.default.deepEqual(a, [[0, 1, 100, 100], [2, 3, 100, 100]]);

      a = resize(a, [4, 4], 100);
      _assert2.default.deepEqual(a, [[0, 1, 100, 100], [2, 3, 100, 100], [100, 100, 100, 100], [100, 100, 100, 100]]);

      a = resize(a, [4, 2]);
      _assert2.default.deepEqual(a, [[0, 1], [2, 3], [100, 100], [100, 100]]);

      a = resize(a, [2, 2]);
      _assert2.default.deepEqual(a, [[0, 1], [2, 3]]);

      a = resize(a, [1, 1]);
      _assert2.default.deepEqual(a, [[0]]);
    });

    it('should resize a 1 dimensional array to 2 dimensional', function () {
      var a = [1, 2];

      a = resize(a, [4], 3);
      _assert2.default.deepEqual(a, [1, 2, 3, 3]);

      a = resize(a, [4, 2], 4);
      _assert2.default.deepEqual(a, [[1, 4], [2, 4], [3, 4], [3, 4]]);

      // without default value
      var b = [1, 2];

      b = resize(b, [4]);
      _assert2.default.deepEqual(b, [1, 2, 0, 0]);

      b = resize(b, [4, 2]);
      _assert2.default.deepEqual(b, [[1, 0], [2, 0], [0, 0], [0, 0]]);
      // TODO: would be nicer if this returns uninit everwhere and not undefined on some places
    });

    it('should resize a 2 dimensional array to 1 dimensional', function () {
      var a = [[1, 2], [3, 4], [5, 6], [7, 8]];
      a = resize(a, [6]);
      _assert2.default.deepEqual(a, [1, 3, 5, 7, 0, 0]);

      var b = [[], []];
      b = resize(b, [2], 8);
      _assert2.default.deepEqual(b, [undefined, undefined]);

      var b = [];
      b = resize(b, [2], 8);
      _assert2.default.deepEqual(b, [8, 8]);
    });

    it('should resize a 3 dimensional array', function () {
      var a = [];
      a = resize(a, [2, 3], 5);
      _assert2.default.deepEqual(a, [[5, 5, 5], [5, 5, 5]]);

      a = resize(a, [2, 3, 2], 7);
      _assert2.default.deepEqual(a, [[[5, 7], [5, 7], [5, 7]], [[5, 7], [5, 7], [5, 7]]]);

      a = resize(a, [3, 2], 9);
      _assert2.default.deepEqual(a, [[5, 5], [5, 5], [9, 9]]);
    });

    it('should resize to an empty array', function () {
      var a = [];
      a = resize(a, [2, 3], 5);
      _assert2.default.deepEqual(a, [[5, 5, 5], [5, 5, 5]]);

      a = resize(a, [0]);
      _assert2.default.deepEqual(a, []);
    });

    it('should throw an error when resizing to a scalar', function () {
      var a = [];
      _assert2.default.throws(function () {
        a = resize(a, []);
      }, /Resizing to scalar is not supported/);
    });

    it('should throw an error in case of wrong type of arguments', function () {
      _assert2.default.throws(function () {
        resize([], 2);
      }, /Array expected/);
      _assert2.default.throws(function () {
        resize(2);
      }, /Array expected/);
    });
  });

  describe('squeeze', function () {

    it('should squeeze a scalar', function () {
      _assert2.default.deepEqual((0, _array.size)(2), 2);
      _assert2.default.deepEqual((0, _array.size)({}), {});
      _assert2.default.deepEqual((0, _array.size)('string'), 'string');
    });

    it('should squeeze an array', function () {
      // leave zero dimensions as is
      _assert2.default.deepEqual((0, _array.size)([]), []);
      _assert2.default.deepEqual((0, _array.size)([[]]), []);
      _assert2.default.deepEqual((0, _array.size)([[[]]]), []);
      _assert2.default.deepEqual((0, _array.size)([[[], []]]), [[], []]);
      _assert2.default.deepEqual((0, _array.size)([[[]], [[]]]), [[[]], [[]]]);

      _assert2.default.deepEqual((0, _array.size)(2), 2);
      _assert2.default.deepEqual((0, _array.size)([[2]]), 2);
      _assert2.default.deepEqual((0, _array.size)([[[2]]]), 2);
      _assert2.default.deepEqual((0, _array.size)([1, 2, 3]), [1, 2, 3]);
      _assert2.default.deepEqual((0, _array.size)([[1, 2, 3]]), [1, 2, 3]);
      _assert2.default.deepEqual((0, _array.size)([[[1, 2, 3]]]), [1, 2, 3]);
      _assert2.default.deepEqual((0, _array.size)([[1], [2], [3]]), [1, 2, 3]);
      _assert2.default.deepEqual((0, _array.size)([[1, 2], [3, 4]]), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual((0, _array.size)([[[1, 2]], [[3, 4]]]), [[[1, 2]], [[3, 4]]]);
      _assert2.default.deepEqual((0, _array.size)([[[1, 2], [3, 4]]]), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual((0, _array.size)([[[1], [2]], [[3], [4]]]), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual((0, _array.size)([[[1]], [[2]], [[3]], [[4]]]), [1, 2, 3, 4]);
    });

    it('should adjust size when squeezing an array', function () {
      var a = [[[1], [2]], [[3], [4]]];
      var size = [2, 2, 1];
      a = (0, _array.size)(a, size);
      _assert2.default.deepEqual(a, [[1, 2], [3, 4]]);
      _assert2.default.deepEqual(size, [2, 2]);

      a = [[1, 2]];
      size = [1, 2];
      a = (0, _array.size)(a, size);
      _assert2.default.deepEqual(a, [1, 2]);
      _assert2.default.deepEqual(size, [2]);

      a = [[[1]], [[2]], [[3]], [[4]]];
      size = [4, 1, 1];
      a = (0, _array.size)(a, size);
      _assert2.default.deepEqual(a, [1, 2, 3, 4]);
      _assert2.default.deepEqual(size, [4]);
    });
  });

  describe('unsqueeze', function () {

    it('should unsqueeze a scalar', function () {
      _assert2.default.deepEqual((0, _array.size)(2, 0), 2);
      _assert2.default.deepEqual((0, _array.size)(2, 1), [2]);
      _assert2.default.deepEqual((0, _array.size)(2, 2), [[2]]);
      _assert2.default.deepEqual((0, _array.size)('string', 2), [['string']]);
    });

    it('should ignore empty arrays in unsqueeze', function () {
      // should do nothing with empty arrays
      _assert2.default.deepEqual((0, _array.size)([], 0), []);
      _assert2.default.deepEqual((0, _array.size)([], 1), []);
      _assert2.default.deepEqual((0, _array.size)([], 2), []);
      _assert2.default.deepEqual((0, _array.size)([], 3), []);
      _assert2.default.deepEqual((0, _array.size)([[]], 0), [[]]);
      _assert2.default.deepEqual((0, _array.size)([[]], 1), [[]]);
      _assert2.default.deepEqual((0, _array.size)([[]], 2), [[]]);
      _assert2.default.deepEqual((0, _array.size)([[]], 3), [[]]);
    });

    it('should unsqueeze an array', function () {
      _assert2.default.deepEqual((0, _array.size)([1, 2, 3], 1), [1, 2, 3]);
      _assert2.default.deepEqual((0, _array.size)([1, 2, 3], 2), [[1], [2], [3]]);
      _assert2.default.deepEqual((0, _array.size)([1, 2, 3], 3), [[[1]], [[2]], [[3]]]);
      _assert2.default.deepEqual((0, _array.size)([1, 2, 3], 3, 1), [[[1], [2], [3]]]);
      _assert2.default.deepEqual((0, _array.size)([1, 2, 3], 3, 2), [[[1, 2, 3]]]);

      _assert2.default.deepEqual((0, _array.size)([[1, 2], [3, 4]], 1), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual((0, _array.size)([[1, 2], [3, 4]], 2), [[1, 2], [3, 4]]);
      _assert2.default.deepEqual((0, _array.size)([[1, 2], [3, 4]], 3), [[[1], [2]], [[3], [4]]]);
    });

    it('should adjust size when unsqueezing an array', function () {
      var a = [[1, 2], [3, 4]];
      var size = [2, 2];
      (0, _array.size)(a, 3, 0, size);
      _assert2.default.deepEqual(a, [[[1], [2]], [[3], [4]]]);
      _assert2.default.deepEqual(size, [2, 2, 1]);

      a = [1, 2, 3, 4];
      size = [4];
      (0, _array.size)(a, 3, 0, size);
      _assert2.default.deepEqual(a, [[[1]], [[2]], [[3]], [[4]]]);
      _assert2.default.deepEqual(size, [4, 1, 1]);
    });
  });

  describe('resize', function () {

    it('should test whether an object is an array', function () {
      _assert2.default.equal((0, _array.size)([]), true);
      _assert2.default.equal((0, _array.size)({}), false);
      _assert2.default.equal((0, _array.size)(2), false);
      _assert2.default.equal((0, _array.size)('string'), false);
    });
  });

  describe('validateIndex', function () {

    it('should validate whether an index contains integers', function () {
      _assert2.default.equal((0, _array.size)(2), undefined);
      _assert2.default.equal((0, _array.size)(10), undefined);
      _assert2.default.throws(function () {
        (0, _array.size)(2.3);
      }, /Index must be an integer/);
      _assert2.default.throws(function () {
        (0, _array.size)('str');
      }, /Index must be an integer/);
      _assert2.default.throws(function () {
        (0, _array.size)(true);
      }, /Index must be an integer/);
    });

    it('should validate whether an index doesn\'t exceed the minimum 0', function () {
      _assert2.default.equal((0, _array.size)(2), undefined);
      _assert2.default.equal((0, _array.size)(0), undefined);
      _assert2.default.throws(function () {
        (0, _array.size)(-1);
      }, /Index out of range/);
      _assert2.default.throws(function () {
        (0, _array.size)(-100);
      }, /Index out of range/);
    });

    it('should validate whether an index doesn\'t exceed both minimum and maximum', function () {
      _assert2.default.equal((0, _array.size)(0, 10), undefined);
      _assert2.default.equal((0, _array.size)(4, 10), undefined);
      _assert2.default.equal((0, _array.size)(9, 10), undefined);
      _assert2.default.throws(function () {
        (0, _array.size)(-1, 10);
      }, /Index out of range/);
      _assert2.default.throws(function () {
        (0, _array.size)(10, 10);
      }, /Index out of range/);
      _assert2.default.throws(function () {
        (0, _array.size)(11, 10);
      }, /Index out of range/);
      _assert2.default.throws(function () {
        (0, _array.size)(100, 10);
      }, /Index out of range/);
    });

    it('thrown IndexError should contain the right index, max, and min properties', function () {
      try {
        (0, _array.size)(4, 3);
        _assert2.default.ok(false, 'should not reach this point');
      } catch (err) {
        _assert2.default.equal(err.toString(), 'IndexError: Index out of range (4 > 2)');
        _assert2.default.equal(err.index, 4);
        _assert2.default.equal(err.min, 0);
        _assert2.default.equal(err.max, 3);
      }

      try {
        (0, _array.size)(-1, 3);
        _assert2.default.ok(false, 'should not reach this point');
      } catch (err) {
        _assert2.default.equal(err.toString(), 'IndexError: Index out of range (-1 < 0)');
        _assert2.default.equal(err.index, -1);
        _assert2.default.equal(err.min, 0);
        _assert2.default.equal(err.max, 3);
      }

      try {
        (0, _array.size)(-1);
        _assert2.default.ok(false, 'should not reach this point');
      } catch (err) {
        _assert2.default.equal(err.toString(), 'IndexError: Index out of range (-1 < 0)');
        _assert2.default.equal(err.index, -1);
        _assert2.default.equal(err.min, 0);
        _assert2.default.equal(err.max, undefined);
      }
    });
  });

  describe('validate', function () {

    it('should validate whether all elements in a vector have correct size', function () {
      // valid vector with correct size
      _assert2.default.equal((0, _array.size)([], [0]), undefined);
      _assert2.default.equal((0, _array.size)([1], [1]), undefined);
      _assert2.default.equal((0, _array.size)([1, 2, 3], [3]), undefined);

      // valid matrix but wrong size
      _assert2.default.throws(function () {
        (0, _array.size)([1, 2, 3], [2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([1, 2, 3], [4]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([1, 2, 3], []);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([1, 2, 3], [3, 2]);
      }, /Dimension mismatch/);

      // invalid vector
      _assert2.default.throws(function () {
        (0, _array.size)([1, [2], 3], [3]);
      }, /Dimension mismatch/);
    });

    it('should validate whether all elements in a 2d matrix have correct size', function () {
      // valid matrix with correct size
      _assert2.default.equal((0, _array.size)([[1, 2], [3, 4]], [2, 2]), undefined);
      _assert2.default.equal((0, _array.size)([[1, 2, 3], [4, 5, 6]], [2, 3]), undefined);
      _assert2.default.equal((0, _array.size)([[1, 2], [3, 4], [5, 6]], [3, 2]), undefined);

      // valid matrix with wrong size
      _assert2.default.throws(function () {
        (0, _array.size)([[1, 2], [3, 4]], [2, 1]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[1, 2], [3, 4]], [3, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[1, 2, 3], [4, 5, 6]], [2, 4]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[1, 2], [3, 4], [5, 6]], [4, 3]);
      }, /Dimension mismatch/);

      // invalid matrix
      _assert2.default.throws(function () {
        (0, _array.size)([[1, 2], [3, 4, 5]], [2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[1, 2], [3]], [2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[1, 2], 3], [2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([1, 2], [2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]]], [2, 2]);
      }, /Dimension mismatch/);
    });

    it('should validate whether all elements in a multi dimensional matrix have correct size', function () {
      // valid matrix with correct size
      _assert2.default.equal((0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [2, 2, 2]), undefined);
      _assert2.default.equal((0, _array.size)([[[1, 2, 3], [4, 5, 6]], [[7, 8, 9], [10, 11, 12]]], [2, 2, 3]), undefined);
      _assert2.default.equal((0, _array.size)([[[1, 2], [3, 4], [5, 6]], [[7, 8], [9, 10], [11, 12]]], [2, 3, 2]), undefined);
      _assert2.default.equal((0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]]], [3, 2, 2]), undefined);

      // valid matrix with wrong size
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [2, 2, 3]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [2, 2, 2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [3, 2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8]]], [2, 3, 2]);
      }, /Dimension mismatch/);

      // invalid matrix
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8, 9]]], [2, 2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [[5, 6, 6.5], [7, 8]]], [2, 2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [[5, 6], 7]], [2, 2, 2]);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[[1, 2], [3, 4]], [6, [7, 8]]], [2, 2, 2]);
      }, /Dimension mismatch/);
    });

    it('should validate whether a variable contains a scalar', function () {
      _assert2.default.equal((0, _array.size)(2.3, []), undefined);
      _assert2.default.equal((0, _array.size)(new Date(), []), undefined);
      _assert2.default.equal((0, _array.size)({}, []), undefined);

      _assert2.default.throws(function () {
        (0, _array.size)([], []);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([1, 2, 3], []);
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        (0, _array.size)([[1, 2], [3, 4]], []);
      }, /Dimension mismatch/);
    });
  });

  describe('flatten', function () {

    it('should flatten a scalar', function () {
      _assert2.default.deepEqual((0, _array.size)(1), 1);
    });

    it('should flatten a 1 dimensional array', function () {
      _assert2.default.deepEqual((0, _array.size)([1, 2, 3]), [1, 2, 3]);
    });

    it('should flatten a 2 dimensional array', function () {
      _assert2.default.deepEqual((0, _array.size)([[1, 2], [3, 4]]), [1, 2, 3, 4]);
    });

    it('should flatten a 3 dimensional array', function () {
      _assert2.default.deepEqual((0, _array.size)([[[1, 2], [3, 4]], [[5, 6], [7, 8]]]), [1, 2, 3, 4, 5, 6, 7, 8]);
    });

    it('should return a new array', function () {
      var input = [3, 2, 1];
      var flat = (0, _array.size)(input);
      flat.sort();
      _assert2.default.deepEqual(input, [3, 2, 1]);
    });
  });
});

/**
 * Helper function to create an Array containing uninitialized values
 * Example: arr(uninit, uninit, 2);    // [ , , 2 ]
 */
var uninit = {};
function arr() {
  var array = [];
  array.length = arguments.length;
  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i];
    if (value !== uninit) {
      array[i] = value;
    }
  }
  return array;
}
