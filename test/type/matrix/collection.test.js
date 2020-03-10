import assert from "assert";
import { isCollection as libutilscollectionisCollection_isCollection } from "../../../lib/utils/collection/isCollection";
import { index } from "../../../index";
var isCollection = libutilscollectionisCollection_isCollection;
var math = index;
var DenseMatrix = index.type.DenseMatrix;
var SparseMatrix = index.type.SparseMatrix;

describe('isCollection', function() {

  it('should test whether an object is a collection', function () {
    assert.strictEqual(libutilscollectionisCollection_isCollection([]), true);
    assert.strictEqual(libutilscollectionisCollection_isCollection({}), false);
    assert.strictEqual(libutilscollectionisCollection_isCollection(2), false);
    assert.strictEqual(libutilscollectionisCollection_isCollection(new DenseMatrix()), true);
    assert.strictEqual(libutilscollectionisCollection_isCollection(new SparseMatrix()), true);
  });
});
