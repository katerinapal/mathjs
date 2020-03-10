import assert from "assert";
import { index } from "../index";
var math = index;

describe('deprecated stuff', function() {

  it('should throw a deprecation error when using UpdateNode', function () {

    assert.throws(function () {
      new index.expression.node.UpdateNode();
    }, /UpdateNode is deprecated/);

  })
});
