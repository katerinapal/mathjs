import assert from "assert";
import { toSymbol as libutilslatex_toSymboljs } from "../../lib/utils/latex";

describe('util.latex', function() {
  it('should convert symbols with indices', function () {
    assert.equal(libutilslatex_toSymboljs('alpha_1'), '\\alpha_{1}');
  });

  it('should convert units', function () {
    assert.equal(libutilslatex_toSymboljs('deg', true), '^\\circ');
  });
});
