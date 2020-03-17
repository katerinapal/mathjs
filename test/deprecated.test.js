import assert from "assert";
var math = require('../index');

describe('deprecated stuff', function() {

  it('should throw a deprecation error when using UpdateNode', function () {

    assert.throws(function () {
      new math.expression.node.UpdateNode();
    }, /UpdateNode is deprecated/);

  })
});
