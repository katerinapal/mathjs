import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
var assert = {},
    error = indexjs,
    math = indexjs,
    combinations = indexjs.combinations;

describe('combinations', function() {

  it('should calculate the combinations of a number taking k at a time', function() {
    assert.equal(combinations(0, 0), 1);
    assert.equal(combinations(7, 5), 21);
    assert.equal(combinations(20, 15), 15504);
    assert.equal(combinations(63, 7), 553270671);
    assert.equal(combinations(25, 6), 177100);
  });

  it('should calculate the combinations of n items taken k at a time with BigNumbers', function() {
      assert.deepEqual(combinations(indexjs.bignumber(7), indexjs.bignumber(5)), indexjs.bignumber(21));
      assert.deepEqual(combinations(indexjs.bignumber(20), indexjs.bignumber(15)), indexjs.bignumber(15504));
      assert.deepEqual(combinations(indexjs.bignumber(63), indexjs.bignumber(7)), indexjs.bignumber(553270671));
      assert.deepEqual(combinations(indexjs.bignumber(25), indexjs.bignumber(6)), indexjs.bignumber(177100));
  });

  it('should not work with non-integer and negative input', function() {
      assert.throws(function() {combinations(-12, 6)}, TypeError);
      assert.throws(function() {combinations(12, -6)}, TypeError);
      assert.throws(function() {combinations(0.5, 3)}, TypeError);
      assert.throws(function() {combinations(4, 0.5)}, TypeError);
      assert.throws(function() {combinations(3, 5)}, TypeError);
      assert.throws(function() {combinations(indexjs.bignumber(3), indexjs.bignumber(5))}, TypeError);
      assert.throws(function() {combinations(indexjs.bignumber(3.5), indexjs.bignumber(-3))}, TypeError);
      assert.throws(function() {combinations(indexjs.bignumber(3.5), 1/3)}, TypeError);
  });

  it('should not work with the wrong number or type of arguments', function() {
      assert.throws(function() {combinations(5, 3, 2)});
      assert.throws(function() {combinations(true, "hello world")});
  });

  it('should LaTeX combinations', function () {
    var expression = indexjs.parse('combinations(3,2)');
    assert.equal(expression.toTex(), '\\binom{3}{2}');
  });

});
