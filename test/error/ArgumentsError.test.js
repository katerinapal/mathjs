import assert_moduleDefault from "assert";
import { ArgumentsError as ArgumentsError_ArgumentsErrorjs } from "../../lib/error/ArgumentsError";
var assert = {},
    ArgumentsError = ArgumentsError_ArgumentsErrorjs;

describe('ArgumentsError', function () {

  it('should construct an ArgumentsError without max', function () {
    var err = new ArgumentsError_ArgumentsErrorjs('myfunction', 1, 2);
    assert(err instanceof Error);
    assert(err instanceof ArgumentsError_ArgumentsErrorjs);
    assert.equal(err.fn, 'myfunction');
    assert.equal(err.count, 1);
    assert.equal(err.min, 2);
    assert.equal(err.max, undefined);
    assert.equal(err.toString(), 'ArgumentsError: Wrong number of arguments in function myfunction (1 provided, 2 expected)');
  });

  it('should construct an ArgumentsError with max', function () {
    var err = new ArgumentsError_ArgumentsErrorjs('myfunction', 1, 2, 3);
    assert(err instanceof Error);
    assert(err instanceof ArgumentsError_ArgumentsErrorjs);
    assert.equal(err.fn, 'myfunction');
    assert.equal(err.count, 1);
    assert.equal(err.min, 2);
    assert.equal(err.max, 3);
    assert.equal(err.toString(), 'ArgumentsError: Wrong number of arguments in function myfunction (1 provided, 2-3 expected)');
  });

  it('should throw an error when operator new is missing', function () {
    assert.throws(function () {
      ArgumentsError_ArgumentsErrorjs();
    }, SyntaxError);
  });

});
