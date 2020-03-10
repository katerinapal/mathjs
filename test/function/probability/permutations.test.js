import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
var assert = {},
    error = indexjs,
    math = indexjs,
    permutations = indexjs.permutations;

describe('permutations', function() {

  it('should calculate the permutations of a number', function() {
    assert.equal(permutations(0), 1);
    assert.equal(permutations(1), 1);
    assert.equal(permutations(2), 2);
    assert.equal(permutations(3), 6);
    assert.equal(permutations(4), 24);
    assert.equal(permutations(5), 120);
  });

  it('should calculate the permutations of a BigNumber', function() {
    assert.deepEqual(permutations(indexjs.bignumber(4)), indexjs.bignumber(24));
    assert.deepEqual(permutations(indexjs.bignumber(5)), indexjs.bignumber(120));
    assert.deepEqual(permutations(indexjs.bignumber(8)), indexjs.bignumber(40320));
  });

  it('should calculate the permutations of a BigNumber, taking k at a time', function() {
    assert.deepEqual(permutations(indexjs.bignumber(5), indexjs.bignumber(4)), indexjs.bignumber(120));
    assert.deepEqual(permutations(indexjs.bignumber(6), indexjs.bignumber(3)), indexjs.bignumber(120));
    assert.deepEqual(permutations(indexjs.bignumber(9), indexjs.bignumber(8)), indexjs.bignumber(362880));
  });

  it('should calculate the permutations of a number, taking k at a time', function() {
    assert.equal(permutations(5, 4), 120);
    assert.equal(permutations(9, 8), 362880);
    assert.equal(permutations(7, 5), 2520);
  });

  it('should fail loudly when k is larger than x', function() {
      assert.throws(function(){permutations(5, 6);}, TypeError);
      assert.throws(function(){permutations(indexjs.bignumber(5), indexjs.bignumber(6));}, TypeError);
  });

  it('should not accept negative or non-integer arguments', function() {
      assert.throws(function(){permutations(12, -6);}, TypeError);
      assert.throws(function(){permutations(-12, 6);}, TypeError);
      assert.throws(function(){permutations(4.5, 2);}, TypeError);
      assert.throws(function(){permutations(4, 0.5);}, TypeError);
      assert.throws(function(){permutations(indexjs.bignumber(-12), -6);}, TypeError);
      assert.throws(function(){permutations(indexjs.bignumber(12.5), indexjs.bignumber(6));}, TypeError);
      assert.throws(function(){permutations(indexjs.bignumber(12.5), indexjs.pi);}, TypeError);
  });

  it('should not accept more than two arguments', function() {
      assert.throws(function(){permutations(12, 6, 13);});
      assert.throws(function(){permutations(-12, 6, 13);});
  });

  it('should not accept arguments of the wrong type', function() {
      assert.throws(function(){permutations("baa baa black sheep", true);});
      assert.throws(function(){permutations(new Array(12));});
  });

  it('should LaTeX permutations', function () {
    var expression = indexjs.parse('permutations(2)');
    assert.equal(expression.toTex(), '\\mathrm{permutations}\\left(2\\right)');
  });

});
