"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _ArgumentsError = require("../../lib/error/ArgumentsError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('ArgumentsError', function () {

  it('should construct an ArgumentsError without max', function () {
    var err = new _ArgumentsError.ArgumentsError('myfunction', 1, 2);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof _ArgumentsError.ArgumentsError);
    _assert2.default.equal(err.fn, 'myfunction');
    _assert2.default.equal(err.count, 1);
    _assert2.default.equal(err.min, 2);
    _assert2.default.equal(err.max, undefined);
    _assert2.default.equal(err.toString(), 'ArgumentsError: Wrong number of arguments in function myfunction (1 provided, 2 expected)');
  });

  it('should construct an ArgumentsError with max', function () {
    var err = new _ArgumentsError.ArgumentsError('myfunction', 1, 2, 3);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof _ArgumentsError.ArgumentsError);
    _assert2.default.equal(err.fn, 'myfunction');
    _assert2.default.equal(err.count, 1);
    _assert2.default.equal(err.min, 2);
    _assert2.default.equal(err.max, 3);
    _assert2.default.equal(err.toString(), 'ArgumentsError: Wrong number of arguments in function myfunction (1 provided, 2-3 expected)');
  });

  it('should throw an error when operator new is missing', function () {
    _assert2.default.throws(function () {
      (0, _ArgumentsError.ArgumentsError)();
    }, SyntaxError);
  });
});
