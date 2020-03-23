import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
var error = require('../../../lib/error/index'), catalan = index_indexjsjs.catalan;

describe('catalan', function() {

  it('should calculate the nth catalan number', function() {
    assert.equal(catalan(3), 5);
    assert.equal(catalan(0), 1);
    assert.equal(catalan(8), 1430);
  });

  it('should calculate the nth catalan number with BigNumbers', function(){
    assert.deepEqual(catalan(index_indexjsjs.bignumber(7)), index_indexjsjs.bignumber(429));
    assert.deepEqual(catalan(index_indexjsjs.bignumber(13)), index_indexjsjs.bignumber(742900));
  });

  it('should not work with non-integer and negative input', function() {
    assert.throws(function() {catalan(0.5)}, TypeError);
    assert.throws(function() {catalan(-1)}, TypeError);
    assert.throws(function() {catalan(index_indexjsjs.bignumber(-3))}, TypeError);
    assert.throws(function() {catalan(index_indexjsjs.bignumber(3.5))}, TypeError);
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
    var expression = index_indexjsjs.parse('catalan(3)');
    assert.equal(expression.toTex(), '\\mathrm{C}_{3}');
  });

});
