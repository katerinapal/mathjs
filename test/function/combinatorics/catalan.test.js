import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
var assert = {},
error = indexjs,
math = indexjs,
catalan = indexjs.catalan;

describe('catalan', function() {

  it('should calculate the nth catalan number', function() {
    assert.equal(catalan(3), 5);
    assert.equal(catalan(0), 1);
    assert.equal(catalan(8), 1430);
  });

  it('should calculate the nth catalan number with BigNumbers', function(){
    assert.deepEqual(catalan(indexjs.bignumber(7)), indexjs.bignumber(429));
    assert.deepEqual(catalan(indexjs.bignumber(13)), indexjs.bignumber(742900));
  });

  it('should not work with non-integer and negative input', function() {
    assert.throws(function() {catalan(0.5)}, TypeError);
    assert.throws(function() {catalan(-1)}, TypeError);
    assert.throws(function() {catalan(indexjs.bignumber(-3))}, TypeError);
    assert.throws(function() {catalan(indexjs.bignumber(3.5))}, TypeError);
  });

  it('should throw an error in case of non-integer input', function() {
    assert.throws(function() {catalan(5.2)}, /Non-negative integer value expected/);
  });

  it('should throw an error in case of negative input', function() {
    assert.throws(function() {catalan(-2)}, /Non-negative integer value expected/);
  });

  it('should throw an error in case of wrong number or type of arguments', function() {
    assert.throws(function() {catalan(5, 3, 2)});
    assert.throws(function() {catalan(true, "hello world")});
  });

  it('should LaTeX catalan', function () {
    var expression = indexjs.parse('catalan(3)');
    assert.equal(expression.toTex(), '\\mathrm{C}_{3}');
  });

});
