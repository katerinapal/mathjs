"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _array = require("../../utils/array");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

var _compare = require("../relational/compare");

var relationalcompare_obj = _interopRequireWildcard(_compare);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);
  var asc = load(relationalcompare_obj);
  var desc = function desc(a, b) {
    return -asc(a, b);
  };

  /**
   * Sort the items in a matrix.
   *
   * Syntax:
   *
   *    math.sort(x)
   *    math.sort(x, compare)
   *
   * Examples:
   *
   *    math.sort([5, 10, 1]); // returns [1, 5, 10]
   *    math.sort(['C', 'B', 'A', 'D']); // returns ['A', 'B', 'C', 'D']
   *
   *    function sortByLength (a, b) {
   *      return a.length - b.length;
   *    }
   *    math.sort(['Langdon', 'Tom', 'Sara'], sortByLength); // returns ['Tom', 'Sara', 'Langdon']
   *
   * See also:
   *
   *    filter, forEach, map
   *
   * @param {Matrix | Array} x    A one dimensional matrix or array to sort
   * @param {Function | 'asc' | 'desc'} [compare='asc']
   *        An optional _comparator function. The function is called as
   *        `compare(a, b)`, and must return 1 when a > b, -1 when a < b,
   *        and 0 when a == b.
   * @return {Matrix | Array} Returns the sorted matrix.
   */
  var sort = typed('sort', {
    'Array': function Array(x) {
      _arrayIsVector(x);
      return x.sort(asc);
    },

    'Matrix': function Matrix(x) {
      _matrixIsVector(x);
      return matrix(x.toArray().sort(asc), x.storage());
    },

    'Array, function': function ArrayFunction(x, _comparator) {
      _arrayIsVector(x);
      return x.sort(_comparator);
    },

    'Matrix, function': function MatrixFunction(x, _comparator) {
      _matrixIsVector(x);
      return matrix(x.toArray().sort(_comparator), x.storage());
    },

    'Array, string': function ArrayString(x, order) {
      _arrayIsVector(x);
      return x.sort(_comparator(order));
    },

    'Matrix, string': function MatrixString(x, order) {
      _matrixIsVector(x);
      return matrix(x.toArray().sort(_comparator(order)), x.storage());
    }
  });

  sort.toTex = undefined; // use default template

  /**
   * Get the comparator for given order ('asc' or 'desc')
   * @param {'asc' | 'desc'} order
   * @return {Function} Returns a _comparator function
   */
  function _comparator(order) {
    if (order === 'asc') {
      return asc;
    } else if (order === 'desc') {
      return desc;
    } else {
      throw new Error('String "asc" or "desc" expected');
    }
  }

  /**
   * Validate whether an array is one dimensional
   * Throws an error when this is not the case
   * @param {Array} array
   * @private
   */
  function _arrayIsVector(array) {
    if (_array.size.length !== 1) {
      throw new Error('One dimensional array expected');
    }
  }

  /**
   * Validate whether a matrix is one dimensional
   * Throws an error when this is not the case
   * @param {Matrix} matrix
   * @private
   */
  function _matrixIsVector(matrix) {
    if (matrix.size().length !== 1) {
      throw new Error('One dimensional matrix expected');
    }
  }

  return sort;
}

var name_exportedObj = 'sort';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
