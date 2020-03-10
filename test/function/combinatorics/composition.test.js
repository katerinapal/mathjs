import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
var assert = {};
var error = indexjs;
var math = indexjs;
var composition = indexjs.composition;

describe('composition', function() {

  it('should calculate the number of ways to compose a set of n objects into k non-empty subsets', function() {
    assert.equal(composition(5,3), 6);
    assert.equal(composition(1,1), 1);
    assert.equal(composition(8,3), 21);
  });

  it('should calculate the composition of n items taken k at a time with BigNumbers', function(){
    assert.deepEqual(composition(indexjs.bignumber(7), indexjs.bignumber(5)), indexjs.bignumber(15));
    assert.deepEqual(composition(indexjs.bignumber(70), indexjs.bignumber(3)), indexjs.bignumber(2346));
    assert.deepEqual(composition(indexjs.bignumber(56), indexjs.bignumber(11)), indexjs.bignumber(29248649430));
  });

  it('should not work with non-integer and negative input', function() {
    assert.throws(function() {composition(0.5, 3)}, /TypeError: Positive integer value expected in function composition/);
    assert.throws(function() {composition(-2, 3)}, /TypeError: Positive integer value expected in function composition/);
    assert.throws(function() {composition(6, -2)}, /TypeError: Positive integer value expected in function composition/);
    assert.throws(function() {composition(3, 5)}, /TypeError: k must be less than or equal to n in function composition/);
    assert.throws(function() {composition(indexjs.bignumber(3), indexjs.bignumber(5))}, /TypeError: k must be less than or equal to n in function composition/);
    assert.throws(function() {composition(indexjs.bignumber(3.5), indexjs.bignumber(-3))}, /TypeError: Positive integer value expected in function composition/);
    assert.throws(function() {composition(indexjs.bignumber(3.5), 0.25)}, /TypeError: Positive integer value expected in function composition/);
  });

  it('should not work with the wrong number or type of arguments', function() {
    assert.throws(function() {composition(5, 3, 2)});
    assert.throws(function() {composition(true, "hello world")});
  });
});
