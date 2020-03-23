import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../../index";
var Chain = index_indexjsjs.type.Chain;

describe('chain', function() {

  it ('should construct a chain', function () {
    assert.ok(index_indexjsjs.chain(45) instanceof Chain);
    assert.ok(index_indexjsjs.chain(index_indexjsjs.complex(2, 3)) instanceof Chain);
    assert.ok(index_indexjsjs.chain() instanceof Chain);
  });

  it('should LaTeX chain', function () {
    var expression = index_indexjsjs.parse('chain(1)');
    assert.equal(expression.toTex(), '\\mathrm{chain}\\left(1\\right)');
  });

});
