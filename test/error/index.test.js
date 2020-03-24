import assert from "assert";
import { indexjs as liberrorindex_indexjsjs } from "../../lib/error/index";

describe('index.js', function () {

  it('should contain error factory functions', function () {
    assert(Array.isArray(liberrorindex_indexjsjs));
    assert(liberrorindex_indexjsjs[0].name, 'ArgumentsError');
    assert(liberrorindex_indexjsjs[1].name, 'DimensionError');
    assert(liberrorindex_indexjsjs[2].name, 'IndexError');
  });

});