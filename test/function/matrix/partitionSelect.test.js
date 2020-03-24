"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {};
var matrix = _index.indexjs.matrix;
var partitionSelect = _index.indexjs.partitionSelect;

describe('partitionSelect', function () {

  it('should sort an array with numbers', function () {
    _assert2.default.equal(partitionSelect([5, 10, 1], 0), 1);
    _assert2.default.equal(partitionSelect([5, 10, 1], 1), 5);
    _assert2.default.equal(partitionSelect([5, 10, 1], 2), 10);
  });

  it('should sort an array with strings', function () {
    _assert2.default.equal(partitionSelect(['C', 'B', 'A', 'D'], 0), 'A');
    _assert2.default.equal(partitionSelect(['C', 'B', 'A', 'D'], 1), 'B');
    _assert2.default.equal(partitionSelect(['C', 'B', 'A', 'D'], 2), 'C');
    _assert2.default.equal(partitionSelect(['C', 'B', 'A', 'D'], 3), 'D');
  });

  it('should sort a Matrix', function () {
    _assert2.default.equal(partitionSelect(matrix([5, 10, 1]), 0), 1);
    _assert2.default.equal(partitionSelect(matrix([5, 10, 1]), 1), 5);
    _assert2.default.equal(partitionSelect(matrix([5, 10, 1]), 2), 10);
  });

  it('should sort an array in ascending order', function () {
    _assert2.default.equal(partitionSelect([5, 10, 1], 0, 'asc'), 1);
    _assert2.default.equal(partitionSelect([5, 10, 1], 1, 'asc'), 5);
    _assert2.default.equal(partitionSelect([5, 10, 1], 2, 'asc'), 10);
  });

  it('should sort an array in descending order', function () {
    _assert2.default.equal(partitionSelect([5, 10, 1], 0, 'desc'), 10);
    _assert2.default.equal(partitionSelect([5, 10, 1], 1, 'desc'), 5);
    _assert2.default.equal(partitionSelect([5, 10, 1], 2, 'desc'), 1);
  });

  it('should sort an array with a custom compare function', function () {
    function sortByLength(a, b) {
      return a.length - b.length;
    }
    _assert2.default.equal(partitionSelect(['Langdon', 'Tom', 'Sara'], 0, sortByLength), 'Tom');
    _assert2.default.equal(partitionSelect(['Langdon', 'Tom', 'Sara'], 1, sortByLength), 'Sara');
    _assert2.default.equal(partitionSelect(['Langdon', 'Tom', 'Sara'], 2, sortByLength), 'Langdon');
  });

  it('should mutate the input array, leaving it partitioned at k', function () {
    var arr = [3, 2, 4, 6, -2, 5];
    partitionSelect(arr, 3);

    for (var i = 0; i < 3; ++i) {
      _assert2.default.ok(arr[i] <= arr[3]);
    }
    _assert2.default.ok(arr[3] === 4);
    for (var i = 4; i < arr.length; ++i) {
      _assert2.default.ok(arr[3] <= arr[i]);
    }
  });

  it('should mutate the input matrix, leaving it partitioned at k', function () {
    var m = matrix([3, 2, 4, 6, -2, 5]);
    partitionSelect(m, 3);

    m.forEach(function (value, index, matrix) {
      if (index[0] < 3) {
        _assert2.default.ok(value <= 4);
      } else if (index[0] === 3) {
        _assert2.default.ok(value === 4);
      } else {
        _assert2.default.ok(value >= 4);
      }
    });
  });

  it('should throw an error if called with a multi dimensional matrix', function () {
    _assert2.default.throws(function () {
      partitionSelect(matrix([[1, 2], [3, 4]]), 2);
    }, /Only one dimensional matrices supported/);
  });

  it('should throw an error if called with a non-negative k, within the bounds of the array', function () {
    _assert2.default.throws(function () {
      partitionSelect([1], -2);
    }, /k must be a non-negative integer/);
    _assert2.default.throws(function () {
      partitionSelect([3, 2, 1], 1.2);
    }, /k must be a non-negative integer/);
    _assert2.default.throws(function () {
      partitionSelect([3, 2, 1], 3);
    }, /k out of bounds/);
    _assert2.default.throws(function () {
      partitionSelect([], 0);
    }, /k out of bounds/);
  });

  it('should throw an error if called with unsupported type', function () {
    _assert2.default.throws(function () {
      partitionSelect(2, 2);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      partitionSelect('string', 2);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      partitionSelect([1], new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      partitionSelect([1], 1, 'function');
    }, /Error: Compare string must be "asc" or "desc"/);
    _assert2.default.throws(function () {
      partitionSelect([1], 1, {});
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      partitionSelect();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      partitionSelect([]);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      partitionSelect([], 2, 'foo', 3);
    }, /TypeError: Too many arguments/);
  });

  /*
  it('should LaTeX sort', function () {
    var expression = math.parse('sort([3,2,1])');
    assert.equal(expression.toTex(), '\\mathrm{sort}\\left(\\begin{bmatrix}3\\\\2\\\\1\\\\\\end{bmatrix}\\right)');
  });
  */
});
