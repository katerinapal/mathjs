import assert from "assert";
var index = require('../../../lib/expression/node/index');

describe('node/index', function() {

  it('should contain all nodes', function() {
    assert.equal(index.length, 16);
  });

});
