import assert from "assert";
import { index } from "../../../../index";
var math = index;
var Chain = index.type.Chain;

describe('chain', function() {

  it ('should construct a chain', function () {
    assert.ok(index.chain(45) instanceof Chain);
    assert.ok(index.chain(index.complex(2, 3)) instanceof Chain);
    assert.ok(index.chain() instanceof Chain);
  });

  it('should LaTeX chain', function () {
    var expression = index.parse('chain(1)');
    assert.equal(expression.toTex(), '\\mathrm{chain}\\left(1\\right)');
  });

});
