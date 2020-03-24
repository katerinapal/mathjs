import assert from "assert";
import { isCollectionjs as libutilscollectionisCollection_isCollectionjsjs } from "../../../lib/utils/collection/isCollection";
import { indexjs as index_indexjsjs } from "../../../index";
var DenseMatrix = index_indexjsjs.type.DenseMatrix;
var SparseMatrix = index_indexjsjs.type.SparseMatrix;

describe('isCollection', function() {

  it('should test whether an object is a collection', function () {
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs([]), true);
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs({}), false);
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs(2), false);
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs(new DenseMatrix()), true);
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs(new SparseMatrix()), true);
  });
});
