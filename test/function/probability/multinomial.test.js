import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
import _ from "underscore";
var error = {}, multinomial = index_indexjsjs.multinomial;

describe('multinomial', function() {

  it('should calculate the multinomial of an array of numbers', function() {
    assert.equal(multinomial([1,2,1]), 12);
    assert.equal(multinomial([4,2,1]), 105);
    assert.equal(multinomial([4,4]), 70);
  });

  it('should calculate the multinomial of n items taken k at a time with BigNumbers', function() {
    assert.equal(_.isEqual(multinomial([index_indexjsjs.bignumber(3), index_indexjsjs.bignumber(4), index_indexjsjs.bignumber(5)]), index_indexjsjs.bignumber(27720)),true);
    assert.deepEqual(multinomial([index_indexjsjs.bignumber(10), index_indexjsjs.bignumber(1), index_indexjsjs.bignumber(2)]), index_indexjsjs.bignumber(858));
  });

  it('should not work with non-integer and negative input', function() {
    assert.throws(function() {multinomial([0.5,3])}, TypeError);
      assert.throws(function() {multinomial([index_indexjsjs.bignumber(3), index_indexjsjs.bignumber(0.5)])}, TypeError);
      assert.throws(function() {multinomial([index_indexjsjs.bignumber(3.5), index_indexjsjs.bignumber(-3)])}, TypeError);
      assert.throws(function() {multinomial([index_indexjsjs.bignumber(3.5), 1/3])}, TypeError);
    });

  it('should not work with the wrong number or type of arguments', function() {
      assert.throws(function() {multinomial(5, 3, 2)});
      assert.throws(function() {multinomial(true, "hello world")});
  });

});
