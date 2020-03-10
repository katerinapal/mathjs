import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../../index";
var assert = {};
var math = indexjs;
var Chain = indexjs.type.Chain;

describe('chain', function() {

  it ('should construct a chain', function () {
    assert.ok(indexjs.chain(45) instanceof Chain);
    assert.ok(indexjs.chain(indexjs.complex(2, 3)) instanceof Chain);
    assert.ok(indexjs.chain() instanceof Chain);
  });

  it('should LaTeX chain', function () {
    var expression = indexjs.parse('chain(1)');
    assert.equal(expression.toTex(), '\\mathrm{chain}\\left(1\\right)');
  });

});
