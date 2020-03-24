import assert from "assert";
import { indexjs as index_indexjsjs } from "../index";

describe('deprecated stuff', function() {

  it('should throw a deprecation error when using UpdateNode', function () {

    assert.throws(function () {
      new index_indexjsjs.expression.node.UpdateNode();
    }, /UpdateNode is deprecated/);

  })
});
