import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
// test hypot
var assert = {};
var approx = approxjs;
var math = indexjs;
var hypot = indexjs.hypot;
var bignumber = indexjs.bignumber;
var fraction = indexjs.fraction;

describe('hypot', function() {
  it('should return the hypot of numbers', function () {
    assert.strictEqual(hypot(3, 4), 5);
    assert.strictEqual(hypot(3, -4), 5);
    approxjs(hypot(3, 4, 5), 7.0710678118654755);
    assert.strictEqual(hypot(-2), 2);
    assert.strictEqual(hypot(0), 0);
    assert.strictEqual(hypot(Infinity), Infinity);
  });

  it('should return the hypot of BigNumbers', function () {
    assert.deepEqual(hypot(bignumber(3), bignumber(4)), bignumber(5));
    assert.deepEqual(hypot(bignumber(3), bignumber(-4)), bignumber(5));
    assert.deepEqual(hypot(bignumber(3), bignumber(4), bignumber(5)),
        bignumber('7.07106781186547524400844362104849039284835937688474036588339869'));
    assert.deepEqual(hypot(bignumber(-2)), bignumber(2));
  });

  it('should return the hypot of an Array with numbers', function () {
    assert.strictEqual(hypot([3, 4]), 5);
  });

  it('should return the hypot of an Matrix with numbers', function () {
    assert.strictEqual(hypot(indexjs.matrix([3, 4])), 5);
  });

  it('should return the hypot of an Array with mixed numbers and BigNumbers', function () {
    assert.deepEqual(hypot([3, bignumber(4)]), bignumber(5));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {hypot()}, /TypeError: Too few arguments/);
    assert.throws(function () {hypot([], 2)}, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of unsupported types', function () {
    assert.throws(function () {hypot(new Date());}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {hypot([new Date()]);}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {hypot([2, 3, indexjs.complex()]);}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {hypot(undefined);}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX hypot', function () {
    var expression = indexjs.parse('hypot(3,4)');
    assert.equal(expression.toTex(),'\\hypot\\left(3,4\\right)');
  });

});
