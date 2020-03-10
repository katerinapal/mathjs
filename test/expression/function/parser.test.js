import assert from "assert";
import { index } from "../../../index";
var math = index;
var Parser = index.expression.Parser;

describe('parser', function() {

  it('should create a parser', function() {
    var parser = index.parser();

    assert(parser instanceof Parser);
  });

  it('should LaTeX parser', function () { //This doesn't really make sense in a way
    var expression = index.parse('parser()');
    assert.equal(expression.toTex(), '\\mathrm{parser}\\left(\\right)');
  });

});

