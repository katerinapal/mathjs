import assert from "assert";
import { libexpressionnodeindex_obj } from "../../../lib/expression/node/index";
var index = libexpressionnodeindex_obj;

describe('node/index', function() {

  it('should contain all nodes', function() {
    assert.equal(libexpressionnodeindex_obj.length, 16);
  });

});
