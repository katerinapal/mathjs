import assert_moduleDefault from "assert";
import { isCollection as isCollection_isCollectionjs } from "../../../lib/utils/collection/isCollection";
import { math as indexjs } from "../../../index";
var assert = {};
var isCollection = isCollection_isCollectionjs;
var math = indexjs;
var DenseMatrix = indexjs.type.DenseMatrix;
var SparseMatrix = indexjs.type.SparseMatrix;

describe('isCollection', function() {

  it('should test whether an object is a collection', function () {
    assert.strictEqual(isCollection_isCollectionjs([]), true);
    assert.strictEqual(isCollection_isCollectionjs({}), false);
    assert.strictEqual(isCollection_isCollectionjs(2), false);
    assert.strictEqual(isCollection_isCollectionjs(new DenseMatrix()), true);
    assert.strictEqual(isCollection_isCollectionjs(new SparseMatrix()), true);
  });
});
