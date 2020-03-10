import assert from "assert";
import { libexpressionnodeindex } from "../../../lib/expression/node/index";
var index = libexpressionnodeindex;

describe('node/index', function() {

  it('should contain all nodes', function() {
    assert.equal(libexpressionnodeindex.length, 16);
  });

});
