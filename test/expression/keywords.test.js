import assert from "assert";
import { keywordsjs as libexpressionkeywords_keywordsjsjs } from "../../lib/expression/keywords";

describe('keywords', function() {

  it('should return a map with reserved keywords', function() {
    assert.deepEqual(Object.keys(libexpressionkeywords_keywordsjsjs).sort(), ['end'].sort());
  });

});
