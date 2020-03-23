"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _isCollection = require("../../../lib/utils/collection/isCollection");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DenseMatrix = _index.indexjs.type.DenseMatrix;
var SparseMatrix = _index.indexjs.type.SparseMatrix;

describe('isCollection', function () {

  it('should test whether an object is a collection', function () {
    _assert2.default.strictEqual((0, _isCollection.isCollectionjs)([]), true);
    _assert2.default.strictEqual((0, _isCollection.isCollectionjs)({}), false);
    _assert2.default.strictEqual((0, _isCollection.isCollectionjs)(2), false);
    _assert2.default.strictEqual((0, _isCollection.isCollectionjs)(new DenseMatrix()), true);
    _assert2.default.strictEqual((0, _isCollection.isCollectionjs)(new SparseMatrix()), true);
  });
});
