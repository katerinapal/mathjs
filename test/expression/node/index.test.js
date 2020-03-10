import assert_moduleDefault from "assert";
import { index as indexjs } from "../../../lib/expression/node/index";
// test the contents of index.js
var assert = {};
var index = indexjs;

describe('node/index', function() {

  it('should contain all nodes', function() {
    assert.equal(indexjs.length, 16);
  });

});
