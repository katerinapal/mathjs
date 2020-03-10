import assert_moduleDefault from "assert";
import * as indexjs from "../../lib/error/index";
var assert = {};
var error = indexjs;

describe('index.js', function () {

  it('should contain error factory functions', function () {
    assert(Array.isArray(indexjs));
    assert(indexjs[0].name, 'ArgumentsError');
    assert(indexjs[1].name, 'DimensionError');
    assert(indexjs[2].name, 'IndexError');
  });

});