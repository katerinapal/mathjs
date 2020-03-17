import assert from "assert";
import { isCollectionjs as libutilscollectionisCollection_isCollectionjsjs } from "../../../lib/utils/collection/isCollection";
var math = require('../../../index');
var DenseMatrix = math.type.DenseMatrix;
var SparseMatrix = math.type.SparseMatrix;

describe('isCollection', function() {

  it('should test whether an object is a collection', function () {
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs([]), true);
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs({}), false);
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs(2), false);
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs(new DenseMatrix()), true);
    assert.strictEqual(libutilscollectionisCollection_isCollectionjsjs(new SparseMatrix()), true);
  });
});
