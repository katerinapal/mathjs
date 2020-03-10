import assert from "assert";
import * as liberrorindex_obj from "../../lib/error/index";
var error = liberrorindex_obj;

describe('index.js', function () {

  it('should contain error factory functions', function () {
    assert(Array.isArray(liberrorindex_obj));
    assert(liberrorindex_obj[0].name, 'ArgumentsError');
    assert(liberrorindex_obj[1].name, 'DimensionError');
    assert(liberrorindex_obj[2].name, 'IndexError');
  });

});