import assert_moduleDefault from "assert";
import * as keywordsjs from "../../lib/expression/keywords";
// test keywords
var assert = {},
    keywords = keywordsjs;

describe('keywords', function() {

  it('should return a map with reserved keywords', function() {
    assert.deepEqual(Object.keys(keywordsjs).sort(), ['end'].sort());
  });

});
