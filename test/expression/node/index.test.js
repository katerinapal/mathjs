import assert from "assert";
import { indexjs as libexpressionnodeindex_indexjsjs } from "../../../lib/expression/node/index";

describe('node/index', function() {

  it('should contain all nodes', function() {
    assert.equal(libexpressionnodeindex_indexjsjs.length, 16);
  });

});
