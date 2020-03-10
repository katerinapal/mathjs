import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;
var Parser = index_obj.expression.Parser;

describe('parser', function() {

  it('should create a parser', function() {
    var parser = index_obj.parser();

    assert(parser instanceof Parser);
  });

  it('should LaTeX parser', function () { //This doesn't really make sense in a way
    var expression = index_obj.parse('parser()');
    assert.equal(expression.toTex(), '\\mathrm{parser}\\left(\\right)');
  });

});

