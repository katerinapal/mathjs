import assert from "assert";
import { index_obj } from "../index";
var math = index_obj;

describe('deprecated stuff', function() {

  it('should throw a deprecation error when using UpdateNode', function () {

    assert.throws(function () {
      new index_obj.expression.node.UpdateNode();
    }, /UpdateNode is deprecated/);

  })
});
