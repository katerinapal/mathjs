import assert from "assert";

describe('keywords', function() {

  it('should return a map with reserved keywords', function() {
    assert.deepEqual(Object.keys(keywords).sort(), ['end'].sort());
  });

});
