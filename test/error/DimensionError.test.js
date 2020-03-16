import assert from "assert";
import { DimensionError as liberrorDimensionError_DimensionErrorjs } from "../../lib/error/DimensionError";

describe('DimensionError', function () {

  it('should construct a DimensionError with numbers', function () {
    var err = new liberrorDimensionError_DimensionErrorjs(3, 5);
    assert(err instanceof Error);
    assert(err instanceof RangeError);
    assert(err instanceof liberrorDimensionError_DimensionErrorjs);
    assert.equal(err.actual, 3);
    assert.equal(err.expected, 5);
    assert.equal(err.relation, undefined);
    assert.equal(err.toString(), 'DimensionError: Dimension mismatch (3 != 5)');
  });

  it('should construct a DimensionError with numbers and a custom relation', function () {
    var err = new liberrorDimensionError_DimensionErrorjs(3, 5, '<');
    assert(err instanceof Error);
    assert(err instanceof RangeError);
    assert(err instanceof liberrorDimensionError_DimensionErrorjs);
    assert.equal(err.actual, 3);
    assert.equal(err.expected, 5);
    assert.equal(err.relation, '<');
    assert.equal(err.toString(), 'DimensionError: Dimension mismatch (3 < 5)');
  });

  it('should construct a DimensionError with arrays', function () {
    var err = new liberrorDimensionError_DimensionErrorjs([2,3], [1,3]);
    assert(err instanceof Error);
    assert(err instanceof RangeError);
    assert(err instanceof liberrorDimensionError_DimensionErrorjs);
    assert.deepEqual(err.actual, [2,3]);
    assert.deepEqual(err.expected, [1,3]);
    assert.equal(err.relation, undefined);
    assert.equal(err.toString(), 'DimensionError: Dimension mismatch ([2, 3] != [1, 3])');
  });

  it('should construct a DimensionError with arrays and a custom relation', function () {
    var err = new liberrorDimensionError_DimensionErrorjs([2,3], [1,3], '<');
    assert(err instanceof Error);
    assert(err instanceof RangeError);
    assert(err instanceof liberrorDimensionError_DimensionErrorjs);
    assert.deepEqual(err.actual, [2,3]);
    assert.deepEqual(err.expected, [1,3]);
    assert.equal(err.relation, '<');
    assert.equal(err.toString(), 'DimensionError: Dimension mismatch ([2, 3] < [1, 3])');
  });

  it('should throw an error when operator new is missing', function () {
    assert.throws(function () {liberrorDimensionError_DimensionErrorjs(3, 5);}, SyntaxError);
  });

});
