import assert from "assert";
import { index_obj } from "../../../../index";
var math = index_obj;
var Chain = index_obj.type.Chain;

describe('chain', function() {

  it ('should construct a chain', function () {
    assert.ok(index_obj.chain(45) instanceof Chain);
    assert.ok(index_obj.chain(index_obj.complex(2, 3)) instanceof Chain);
    assert.ok(index_obj.chain() instanceof Chain);
  });

  it('should LaTeX chain', function () {
    var expression = index_obj.parse('chain(1)');
    assert.equal(expression.toTex(), '\\mathrm{chain}\\left(1\\right)');
  });

});
