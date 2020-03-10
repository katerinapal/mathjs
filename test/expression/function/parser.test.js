import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
var assert = {};
var math = indexjs;
var Parser = indexjs.expression.Parser;

describe('parser', function() {

  it('should create a parser', function() {
    var parser = indexjs.parser();

    assert(parser instanceof Parser);
  });

  it('should LaTeX parser', function () { //This doesn't really make sense in a way
    var expression = indexjs.parse('parser()');
    assert.equal(expression.toTex(), '\\mathrm{parser}\\left(\\right)');
  });

});

