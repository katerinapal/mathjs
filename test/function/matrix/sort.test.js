'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index');

describe('sort', function () {

  it('should sort an array with numbers', function () {
    _assert2.default.deepEqual(math.sort([5, 10, 1]), [1, 5, 10]);
  });

  it('should sort an array with strings', function () {
    _assert2.default.deepEqual(math.sort(['C', 'B', 'A', 'D']), ['A', 'B', 'C', 'D']);
  });

  it('should sort a Matrix', function () {
    _assert2.default.deepEqual(math.sort(math.matrix([5, 10, 1])), math.matrix([1, 5, 10]));
  });

  it('should sort an array in ascending order', function () {
    _assert2.default.deepEqual(math.sort([5, 10, 1], 'asc'), [1, 5, 10]);
  });

  it('should sort an array in descending order', function () {
    _assert2.default.deepEqual(math.sort([5, 10, 1], 'desc'), [10, 5, 1]);
  });

  it('should sort an array with a custom compare function', function () {
    function sortByLength(a, b) {
      return a.length - b.length;
    }
    _assert2.default.deepEqual(math.sort(['Langdon', 'Tom', 'Sara'], sortByLength), ['Tom', 'Sara', 'Langdon']);
  });

  it('should throw an error if called with a multi dimensional matrix', function () {
    _assert2.default.throws(function () {
      math.sort(math.matrix([[1, 2], [3, 4]]));
    }, /One dimensional matrix expected/);
  });

  it('should throw an error if called with unsupported type', function () {
    _assert2.default.throws(function () {
      math.sort(2);
    });
    _assert2.default.throws(function () {
      math.sort('string');
    });
    _assert2.default.throws(function () {
      math.sort([], 'string');
    }, /String "asc" or "desc" expected/);
    _assert2.default.throws(function () {
      math.sort([], {});
    });
  });

  it('should throw an error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      math.sort([], 'asc', 'foo');
    });
    _assert2.default.throws(function () {
      math.sort();
    });
  });

  it('should LaTeX sort', function () {
    var expression = math.parse('sort([3,2,1])');
    _assert2.default.equal(expression.toTex(), '\\mathrm{sort}\\left(\\begin{bmatrix}3\\\\2\\\\1\\\\\\end{bmatrix}\\right)');
  });
});
