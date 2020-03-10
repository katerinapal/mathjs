import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;

describe('compile', function() {

  it('should compile an expression', function() {
    var code = index_obj.compile('(5+3)/4');
    assert.ok(code instanceof Object);
    assert.ok(code.eval instanceof Function);
    assert.equal(code.eval(), 2);
  });

  it('should parse multiple expressions', function() {
    var codes = index_obj.compile(['2+3', '4+5']);
    assert.ok(Array.isArray(codes));
    assert.equal(codes.length, 2);

    assert.equal(codes[0].eval(), 5);
    assert.equal(codes[1].eval(), 9);
  });

  it('should throw an error on wrong number of arguments', function() {
    assert.throws(function () {index_obj.compile()}, /TypeError: Too few arguments/);
    assert.throws(function () {index_obj.compile('2+3', '3+4')}, /TypeError: Too many arguments/);
  });

  it('should throw an error on wrong type of argument', function() {
    assert.throws(function () {index_obj.compile(index_obj.complex(2, 3))}, TypeError);
  });

  it('should LaTeX compile', function () {
    var expression = index_obj.parse('compile(1)');
    assert.equal(expression.toTex(), '\\mathrm{compile}\\left(1\\right)');
  });

});
