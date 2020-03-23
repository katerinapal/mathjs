import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
var Parser = index_indexjsjs.expression.Parser;

describe('parser', function() {

  it('should create a parser', function() {
    var parser = index_indexjsjs.parser();

    assert(parser instanceof Parser);
  });

  it('should LaTeX parser', function () { //This doesn't really make sense in a way
    var expression = index_indexjsjs.parse('parser()');
    assert.equal(expression.toTex(), '\\mathrm{parser}\\left(\\right)');
  });

});

