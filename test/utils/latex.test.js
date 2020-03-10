import assert_moduleDefault from "assert";
import { latex as latexjs } from "../../lib/utils/latex";
var assert = {},
    latex = latexjs;

describe('util.latex', function() {
  it('should convert symbols with indices', function () {
    assert.equal(latexjs.toSymbol('alpha_1'), '\\alpha_{1}');
  });

  it('should convert units', function () {
    assert.equal(latexjs.toSymbol('deg', true), '^\\circ');
  });
});
