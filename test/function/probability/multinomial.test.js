import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
import underscore_moduleDefault from "underscore";
var assert = {},
error = indexjs,
math = indexjs,
multinomial = indexjs.multinomial,
_ = {};

describe('multinomial', function() {

  it('should calculate the multinomial of an array of numbers', function() {
    assert.equal(multinomial([1,2,1]), 12);
    assert.equal(multinomial([4,2,1]), 105);
    assert.equal(multinomial([4,4]), 70);
  });

  it('should calculate the multinomial of n items taken k at a time with BigNumbers', function() {
    assert.equal(_.isEqual(multinomial([indexjs.bignumber(3), indexjs.bignumber(4), indexjs.bignumber(5)]), indexjs.bignumber(27720)),true);
    assert.deepEqual(multinomial([indexjs.bignumber(10), indexjs.bignumber(1), indexjs.bignumber(2)]), indexjs.bignumber(858));
  });

  it('should not work with non-integer and negative input', function() {
    assert.throws(function() {multinomial([0.5,3])}, TypeError);
      assert.throws(function() {multinomial([indexjs.bignumber(3), indexjs.bignumber(0.5)])}, TypeError);
      assert.throws(function() {multinomial([indexjs.bignumber(3.5), indexjs.bignumber(-3)])}, TypeError);
      assert.throws(function() {multinomial([indexjs.bignumber(3.5), 1/3])}, TypeError);
    });

  it('should not work with the wrong number or type of arguments', function() {
      assert.throws(function() {multinomial(5, 3, 2)});
      assert.throws(function() {multinomial(true, "hello world")});
  });

});
