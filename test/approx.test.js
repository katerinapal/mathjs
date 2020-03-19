import assert from "assert";
import { equal as toolsapprox_equaljs } from "../tools/approx";

describe('approx', function() {

  it('should test equality of positive values', function() {
    toolsapprox_equaljs(1/3, 0.33333333);
    toolsapprox_equaljs(2, 2.000001);
    toolsapprox_equaljs(2, 1.999999);
    assert.throws(function () {toolsapprox_equaljs(2, 2.001)}, assert.AssertionError);
    assert.throws(function () {toolsapprox_equaljs(2, 1.999)}, assert.AssertionError);
  });

  it('should test equality of negative values', function() {
    toolsapprox_equaljs(-2, -2.000001);
    toolsapprox_equaljs(-2, -1.999999);
    assert.throws(function () {toolsapprox_equaljs(-2, -2.001)}, assert.AssertionError);
    assert.throws(function () {toolsapprox_equaljs(-2, -1.999)}, assert.AssertionError);
  });

  it('should test equality of very large values', function() {
    toolsapprox_equaljs(2e100, 2.000001e100);
    toolsapprox_equaljs(2e100, 1.999999e100);
    assert.throws(function () {toolsapprox_equaljs(2e100, 2.001e100)}, assert.AssertionError);
    assert.throws(function () {toolsapprox_equaljs(2e100, 1.999e100)}, assert.AssertionError);
  });

  it('should test equality of very small values', function() {
    toolsapprox_equaljs(2e-100, 2.000001e-100);
    toolsapprox_equaljs(2e-100, 1.999999e-100);
    assert.throws(function () {toolsapprox_equaljs(2e-100, 2.001e-100)}, assert.AssertionError);
    assert.throws(function () {toolsapprox_equaljs(2e-100, 1.999e-100)}, assert.AssertionError);
  });

  it('should test equality of NaN numbers', function() {
      // NaN values
    var a = NaN;
    var b = NaN;
    toolsapprox_equaljs(a, b);
    assert.throws(function () {toolsapprox_equaljs(NaN, 3)}, assert.AssertionError);
    assert.throws(function () {toolsapprox_equaljs(NaN, 'nonumber')}, assert.AssertionError);
  });

  it('should test equality when one of the values is zero', function() {
        // zero as one of the two values
    toolsapprox_equaljs(0, 1e-15);
    toolsapprox_equaljs(1e-15, 0);
    assert.throws(function () {toolsapprox_equaljs(0, 0.001)}, assert.AssertionError);
  });

  it('should test deep equality of arrays and objects', function() {
    approx.deepEqual({
      a: [1, 2, 3],
      b: [{c:4, d:5}]
    }, {
      a: [1.000001, 1.99999999, 3.000005],
      b: [{c:3.999999981, d:5.0000023}]
    });

    assert.throws(function () {approx.deepEqual({
      a: [1, 2, 3],
      b: [{c:4, d:5}]
    }, {
      a: [1.000001, 1.99999999, 3.000005],
      b: [{c:3.1, d:5.0000023}]
    })}, assert.AssertionError);

    assert.throws(function () {approx.deepEqual({
      a: [1, 2, 3],
      b: [{c:4, d:5}]
    }, {
      a: [1.001, 1.99999999, 3.000005],
      b: [{c:3, d:5.0000023}]
    })}, assert.AssertionError);
  });

});
