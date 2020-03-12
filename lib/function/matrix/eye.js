"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _array = require("../../utils/array");

var _number = require("../../utils/number");

var _matrix = require("../../type/matrix/function/matrix");

var typematrixfunctionmatrix_obj = _interopRequireWildcard(_matrix);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {

  var matrix = load(typematrixfunctionmatrix_obj);

  /**
   * Create a 2-dimensional identity matrix with size m x n or n x n.
   * The matrix has ones on the diagonal and zeros elsewhere.
   *
   * Syntax:
   *
   *    math.eye(n)
   *    math.eye(n, format)
   *    math.eye(m, n)
   *    math.eye(m, n, format)
   *    math.eye([m, n])
   *    math.eye([m, n], format)
   *
   * Examples:
   *
   *    math.eye(3);                    // returns [[1, 0, 0], [0, 1, 0], [0, 0, 1]]
   *    math.eye(3, 2);                 // returns [[1, 0], [0, 1], [0, 0]]
   *
   *    var A = [[1, 2, 3], [4, 5, 6]];
   *    math.eye(math.size(A));         // returns [[1, 0, 0], [0, 1, 0]]
   *
   * See also:
   *
   *    diag, ones, zeros, size, range
   *
   * @param {...number | Matrix | Array} size   The size for the matrix
   * @param {string} [format]                   The Matrix storage format
   *
   * @return {Matrix | Array | number} A matrix with ones on the diagonal.
   */
  var eye = typed('eye', {
    '': function _() {
      return config.matrix === 'Matrix' ? matrix([]) : [];
    },

    'string': function string(format) {
      return matrix(format);
    },

    'number | BigNumber': function numberBigNumber(rows) {
      return _eye(rows, rows, config.matrix === 'Matrix' ? 'default' : undefined);
    },

    'number | BigNumber, string': function numberBigNumberString(rows, format) {
      return _eye(rows, rows, format);
    },

    'number | BigNumber, number | BigNumber': function numberBigNumberNumberBigNumber(rows, cols) {
      return _eye(rows, cols, config.matrix === 'Matrix' ? 'default' : undefined);
    },

    'number | BigNumber, number | BigNumber, string': function numberBigNumberNumberBigNumberString(rows, cols, format) {
      return _eye(rows, cols, format);
    },

    'Array': function Array(size) {
      return _eyeVector(size);
    },

    'Array, string': function ArrayString(size, format) {
      return _eyeVector(size, format);
    },

    'Matrix': function Matrix(size) {
      return _eyeVector(size.valueOf(), size.storage());
    },

    'Matrix, string': function MatrixString(size, format) {
      return _eyeVector(size.valueOf(), format);
    }
  });

  eye.toTex = undefined; // use default template

  return eye;

  function _eyeVector(size, format) {
    switch (size.length) {
      case 0:
        return format ? matrix(format) : [];
      case 1:
        return _eye(size[0], size[0], format);
      case 2:
        return _eye(size[0], size[1], format);
      default:
        throw new Error('Vector containing two values expected');
    }
  }

  /**
   * Create an identity matrix
   * @param {number | BigNumber} rows
   * @param {number | BigNumber} cols
   * @param {string} [format]
   * @returns {Matrix}
   * @private
   */
  function _eye(rows, cols, format) {
    // BigNumber constructor with the right precision
    var Big = rows && rows.isBigNumber === true ? type.BigNumber : cols && cols.isBigNumber === true ? type.BigNumber : null;

    if (rows && rows.isBigNumber === true) rows = rows.toNumber();
    if (cols && cols.isBigNumber === true) cols = cols.toNumber();

    if (!_number.isNumber || rows < 1) {
      throw new Error('Parameters in function eye must be positive integers');
    }
    if (!_number.isNumber || cols < 1) {
      throw new Error('Parameters in function eye must be positive integers');
    }

    var one = Big ? new type.BigNumber(1) : 1;
    var defaultValue = Big ? new Big(0) : 0;
    var size = [rows, cols];

    // check we need to return a matrix
    if (format) {
      // get matrix storage constructor
      var F = type.Matrix.storage(format);
      // create diagonal matrix (use optimized implementation for storage format)
      return F.diagonal(size, one, 0, defaultValue);
    }

    // create and resize array
    var res = (0, _array.size)([], size, defaultValue);
    // fill in ones on the diagonal
    var minimum = rows < cols ? rows : cols;
    // fill diagonal
    for (var d = 0; d < minimum; d++) {
      res[d][d] = one;
    }
    return res;
  }
}

var name_exportedObj = 'eye';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
