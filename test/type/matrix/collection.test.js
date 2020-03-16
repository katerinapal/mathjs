"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _isCollection = require("../../../lib/utils/collection/isCollection");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var DenseMatrix = math.type.DenseMatrix;
var SparseMatrix = math.type.SparseMatrix;

describe('isCollection', function () {

  it('should test whether an object is a collection', function () {
    _assert2.default.strictEqual(isCollection([]), true);
    _assert2.default.strictEqual(isCollection({}), false);
    _assert2.default.strictEqual(isCollection(2), false);
    _assert2.default.strictEqual(isCollection(new DenseMatrix()), true);
    _assert2.default.strictEqual(isCollection(new SparseMatrix()), true);
  });
});
