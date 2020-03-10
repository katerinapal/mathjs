import assert from "assert";
import * as liberrorindex from "../../lib/error/index";
var error = liberrorindex;

describe('index.js', function () {

  it('should contain error factory functions', function () {
    assert(Array.isArray(liberrorindex));
    assert(liberrorindex[0].name, 'ArgumentsError');
    assert(liberrorindex[1].name, 'DimensionError');
    assert(liberrorindex[2].name, 'IndexError');
  });

});