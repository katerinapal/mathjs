import assert from "assert";
// test keywords
var keywords = require('../../lib/expression/keywords');

describe('keywords', function() {

  it('should return a map with reserved keywords', function() {
    assert.deepEqual(Object.keys(keywords).sort(), ['end'].sort());
  });

});
