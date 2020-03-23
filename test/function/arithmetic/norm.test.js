import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";

describe('norm', function () {

  it('should return the absolute value of a boolean', function () {
    assert.equal(index_indexjsjs.norm(true), 1);
    assert.equal(index_indexjsjs.norm(true, 10), 1);
    assert.equal(index_indexjsjs.norm(false), 0);
    assert.equal(index_indexjsjs.norm(false, 10), 0);
  });

  it('should return the absolute value of null', function () {
    assert.equal(index_indexjsjs.norm(null), 0);
    assert.equal(index_indexjsjs.norm(null, 10), 0);
  });

  it('should return the absolute value of a number', function () {
    assert.equal(index_indexjsjs.norm(-4.2), 4.2);
    assert.equal(index_indexjsjs.norm(-3.5), 3.5);
    assert.equal(index_indexjsjs.norm(100), 100);
    assert.equal(index_indexjsjs.norm(0), 0);
    assert.equal(index_indexjsjs.norm(100, 10), 100);
  });

  it('should return the absolute value of a big number', function () {
    assert.deepEqual(index_indexjsjs.norm(index_indexjsjs.bignumber(-2.3)), index_indexjsjs.bignumber(2.3));
    assert.deepEqual(index_indexjsjs.norm(index_indexjsjs.bignumber('5e500')), index_indexjsjs.bignumber('5e500'));
    assert.deepEqual(index_indexjsjs.norm(index_indexjsjs.bignumber('-5e500')), index_indexjsjs.bignumber('5e500'));
  });

  it('should return the norm of a complex number', function () {
    assert.equal(index_indexjsjs.norm(index_indexjsjs.complex(3, -4)), 5);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.complex(1e200, -4e200)), 4.12310562561766e+200);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.complex(-4e200, 1e200)), 4.12310562561766e+200);
  });

  it('should return the norm of a vector', function () {
    // empty vector
    assert.equal(index_indexjsjs.norm([]), 0.0);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([])), 0.0);
    // p = Infinity
    assert.equal(index_indexjsjs.norm([1, 2, -3], Number.POSITIVE_INFINITY), 3);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([1, 2, -3]), Number.POSITIVE_INFINITY), 3);
    assert.equal(index_indexjsjs.norm([1, 2, -3], 'inf'), 3);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([1, 2, -3]), 'inf'), 3);
    // p = -Infinity
    assert.equal(index_indexjsjs.norm([1, 2, -3], Number.NEGATIVE_INFINITY), 1);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([1, 2, -3]), Number.NEGATIVE_INFINITY), 1);
    assert.equal(index_indexjsjs.norm([1, 2, -3], '-inf'), 1);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([1, 2, -3]), '-inf'), 1);
    // p == 1
    assert.equal(index_indexjsjs.norm([-3, -4], 1), 7.0);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([-3, -4]), 1), 7.0);
    // p - positive
    assert.equal(index_indexjsjs.norm([3, 4], 2), 5.0);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([3, 4]), 2), 5.0);
    // p - negative
    assert.equal(index_indexjsjs.norm([3, 4], -2), 2.4);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([3, 4]), -2), 2.4);
    // missing p (defaults to 2)
    assert.equal(index_indexjsjs.norm([3, 4]), 5.0);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([3, 4])), 5.0);
    // p == 'fro'
    assert.equal(index_indexjsjs.norm([3, 4], 'fro'), 5.0);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([3, 4]), 'fro'), 5.0);
    // p == 0
    assert.equal(index_indexjsjs.norm([3, 4], 0), Number.POSITIVE_INFINITY);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([3, 4]), 0), Number.POSITIVE_INFINITY);
  });

  it('should return the norm of a matrix', function () {
    // p = 1
    assert.equal(index_indexjsjs.norm([[1, 2], [3, 4]], 1), 6);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([[1, 2], [3, 4]]), 1), 6);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([[1, 2], [3, 4]], 'sparse'), 1), 6);
    // p = Infinity
    assert.equal(index_indexjsjs.norm([[1, 2], [3, 4]], Number.POSITIVE_INFINITY), 7);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([[1, 2], [3, 4]]), Number.POSITIVE_INFINITY), 7);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([[1, 2], [3, 4]], 'sparse'), Number.POSITIVE_INFINITY), 7);
    assert.equal(index_indexjsjs.norm([[1, 2], [3, 4]], 'inf'), 7);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([[1, 2], [3, 4]]), 'inf'), 7);
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([[1, 2], [3, 4]], 'sparse'), 'inf'), 7);
    // p = 'fro'
    assert.equal(index_indexjsjs.norm([[1, 2], [-3, -4]], 'fro'), index_indexjsjs.sqrt(30));
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([[1, 2], [-3, -4]]), 'fro'), index_indexjsjs.sqrt(30));
    assert.equal(index_indexjsjs.norm(index_indexjsjs.matrix([[1, 2], [-3, -4]], 'sparse'), 'fro'), index_indexjsjs.sqrt(30));
    // p - not implemented yet!
    assert.throws(function() {
      index_indexjsjs.norm(index_indexjsjs.norm([[1, 2], [3, 4]], 2), 6);
    });
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index_indexjsjs.norm();}, /TypeError: Too few arguments/);
    assert.throws(function () {index_indexjsjs.norm(1, 2, 3);}, /TypeError: Too many arguments/);
  });

  it('should throw an error with a string', function () {
    assert.throws(function () {
      index_indexjsjs.norm('a string');
    });
  });

  it('should LaTeX norm', function () {
    var expr1 = index_indexjsjs.parse('norm(a)');
    var expr2 = index_indexjsjs.parse("norm(a,2)");

    assert.equal(expr1.toTex(), '\\left\\| a\\right\\|');
    assert.equal(expr2.toTex(), '\\mathrm{norm}\\left( a,2\\right)');
  });
});
