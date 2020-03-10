import assert_moduleDefault from "assert";
import { math as indexjs } from "../index";
// test error messages for deprecated functions
var assert = {};
var math = indexjs;

describe('deprecated stuff', function() {

  it('should throw a deprecation error when using UpdateNode', function () {

    assert.throws(function () {
      new indexjs.expression.node.UpdateNode();
    }, /UpdateNode is deprecated/);

  })
});
