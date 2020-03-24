import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
var error = {};
var composition = index_indexjsjs.composition;

describe('composition', function() {

  it('should calculate the number of ways to compose a set of n objects into k non-empty subsets', function() {
    assert.equal(composition(5,3), 6);
    assert.equal(composition(1,1), 1);
    assert.equal(composition(8,3), 21);
  });

  it('should calculate the composition of n items taken k at a time with BigNumbers', function(){
    assert.deepEqual(composition(index_indexjsjs.bignumber(7), index_indexjsjs.bignumber(5)), index_indexjsjs.bignumber(15));
    assert.deepEqual(composition(index_indexjsjs.bignumber(70), index_indexjsjs.bignumber(3)), index_indexjsjs.bignumber(2346));
    assert.deepEqual(composition(index_indexjsjs.bignumber(56), index_indexjsjs.bignumber(11)), index_indexjsjs.bignumber(29248649430));
  });

  it('should not work with non-integer and negative input', function() {
    assert.throws(function() {composition(0.5, 3)}, /TypeError: Positive integer value expected in function composition/);
    assert.throws(function() {composition(-2, 3)}, /TypeError: Positive integer value expected in function composition/);
    assert.throws(function() {composition(6, -2)}, /TypeError: Positive integer value expected in function composition/);
    assert.throws(function() {composition(3, 5)}, /TypeError: k must be less than or equal to n in function composition/);
    assert.throws(function() {composition(index_indexjsjs.bignumber(3), index_indexjsjs.bignumber(5))}, /TypeError: k must be less than or equal to n in function composition/);
    assert.throws(function() {composition(index_indexjsjs.bignumber(3.5), index_indexjsjs.bignumber(-3))}, /TypeError: Positive integer value expected in function composition/);
    assert.throws(function() {composition(index_indexjsjs.bignumber(3.5), 0.25)}, /TypeError: Positive integer value expected in function composition/);
  });

  it('should not work with the wrong number or type of arguments', function() {
    assert.throws(function() {composition(5, 3, 2)});
    assert.throws(function() {composition(true, "hello world")});
  });
});
