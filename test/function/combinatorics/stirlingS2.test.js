import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
var assert = {},
error = indexjs,
math = indexjs,
stirlingS2 = indexjs.stirlingS2;

describe('stirlingS2', function() {

  it('should calculate the number of ways to partition a set of n objects into k non-empty subsets', function() {
    assert.equal(stirlingS2(5,3), 25);
    assert.equal(stirlingS2(0,0), 1);
    assert.equal(stirlingS2(8,7), 28);
  });

  it('should calculate the stirlingS2 of n items taken k at a time with BigNumbers', function(){
    assert.deepEqual(stirlingS2(indexjs.bignumber(7), indexjs.bignumber(5)),indexjs.bignumber(140));
    assert.deepEqual(stirlingS2(indexjs.bignumber(8), indexjs.bignumber(6)),indexjs.bignumber(266));
  });

  it('should not work with non-integer and negative input', function() {
    assert.throws(function() {stirlingS2(0.5, 3)}, /Non-negative integer value expected/);
    assert.throws(function() {stirlingS2(-2, 3)}, /Non-negative integer value expected/);

    assert.throws(function() {stirlingS2(3, 5)}, /k must be less than or equal to n in function stirlingS2/);
    assert.throws(function() {stirlingS2(indexjs.bignumber(3), indexjs.bignumber(5))}, /k must be less than or equal to n in function stirlingS2/);
    assert.throws(function() {stirlingS2(indexjs.bignumber(3.5), indexjs.bignumber(-3))}, /Non-negative integer value expected/);
    assert.throws(function() {stirlingS2(indexjs.bignumber(3.5), 1/3)}, /Non-negative integer value expected/);
  });

  it('should not work with the wrong number or type of arguments', function() {
    assert.throws(function() {stirlingS2(5, 3, 2)});
    assert.throws(function() {stirlingS2(true, "hello world")});
  });

  it('should LaTeX stirlingS2', function () {
    var expression = indexjs.parse('stirlingS2(3,2)');
    assert.equal(expression.toTex(), '\\mathrm{S}\\left(3,2\\right)');
  });

});
