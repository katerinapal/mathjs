"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _array = require("../../utils/array");

var _function = require("../../utils/function");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var matrix = load(typematrixfunctionmatrix_obj);

  /**
   * Filter the items in an array or one dimensional matrix.
   *
   * Syntax:
   *
   *    math.filter(x, test)
   *
   * Examples:
   *
   *    function isPositive (x) {
   *      return x > 0;
   *    }
   *    math.filter([6, -2, -1, 4, 3], isPositive); // returns [6, 4, 3]
   *
   *    math.filter(["23", "foo", "100", "55", "bar"], /[0-9]+/); // returns ["23", "100", "55"]
   *
   * See also:
   *
   *    forEach, map, sort
   *
   * @param {Matrix | Array} x    A one dimensional matrix or array to filter
   * @param {Function | RegExp} test
   *        A function or regular expression to test items.
   *        All entries for which `test` returns true are returned.
   *        When `test` is a function, it is invoked with three parameters:
   *        the value of the element, the index of the element, and the
   *        matrix/array being traversed. The function must return a boolean.
   * @return {Matrix | Array} Returns the filtered matrix.
   */
  var filter = typed('filter', {
    'Array, function': _filterCallback,

    'Array, RegExp': _filterRegExp,

    'Matrix, function': function MatrixFunction(x, test) {
      return matrix(_filterCallback(x.toArray(), test));
    },

    'Matrix, RegExp': function MatrixRegExp(x, test) {
      return matrix(_filterRegExp(x.toArray(), test));
    }
  });

  filter.toTex = undefined; // use default template

  return filter;
}

/**
 * Filter values in a callback given a callback function
 * @param {Array} x
 * @param {Function} callback
 * @return {Array} Returns the filtered array
 * @private
 */
function _filterCallback(x, callback) {
  if (_array.size.length !== 1) {
    throw new Error('Only one dimensional matrices supported');
  }

  // figure out what number of arguments the callback function expects
  var args = (0, _function.maxArgumentCount)(callback);

  return x.filter(function (value, index, array) {
    // invoke the callback function with the right number of arguments
    if (args === 1) {
      return callback(value);
    } else if (args === 2) {
      return callback(value, [index]);
    } else {
      // 3 or -1
      return callback(value, [index], array);
    }
  });
}

/**
 * Filter values in a callback given a regular expression
 * @param {Array} x
 * @param {Function} regexp
 * @return {Array} Returns the filtered array
 * @private
 */
function _filterRegExp(x, regexp) {
  if (_array.size.length !== 1) {
    throw new Error('Only one dimensional matrices supported');
  }

  return x.filter(function (entry) {
    return regexp.test(entry);
  });
}

var name_name = 'filter';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
