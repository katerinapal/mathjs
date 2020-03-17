"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _IndexError = require("../../lib/error/IndexError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('IndexError', function () {

  it('should construct an IndexError without min and max', function () {
    var err = new _IndexError.IndexError(5);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof _IndexError.IndexError);
    _assert2.default.equal(err.index, 5);
    _assert2.default.equal(err.min, 0);
    _assert2.default.equal(err.max, undefined);
    _assert2.default.equal(err.toString(), 'IndexError: Index out of range (5)');
  });

  it('should construct an IndexError without min and max (2)', function () {
    var err = new _IndexError.IndexError(-5);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof _IndexError.IndexError);
    _assert2.default.equal(err.index, -5);
    _assert2.default.equal(err.min, 0);
    _assert2.default.equal(err.max, undefined);
    _assert2.default.equal(err.toString(), 'IndexError: Index out of range (-5 < 0)');
  });

  it('should construct an IndexError with max', function () {
    var err = new _IndexError.IndexError(5, 3);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof _IndexError.IndexError);
    _assert2.default.equal(err.index, 5);
    _assert2.default.equal(err.min, 0);
    _assert2.default.equal(err.max, 3);
    _assert2.default.equal(err.toString(), 'IndexError: Index out of range (5 > 2)');
  });

  it('should construct an IndexError with min and max', function () {
    var err = new _IndexError.IndexError(0, 2, 5);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof _IndexError.IndexError);
    _assert2.default.equal(err.index, 0);
    _assert2.default.equal(err.min, 2);
    _assert2.default.equal(err.max, 5);
    _assert2.default.equal(err.toString(), 'IndexError: Index out of range (0 < 2)');
  });

  it('should construct an IndexError with min and max', function () {
    var err = new _IndexError.IndexError(6, 1, 4);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof _IndexError.IndexError);
    _assert2.default.equal(err.index, 6);
    _assert2.default.equal(err.min, 1);
    _assert2.default.equal(err.max, 4);
    _assert2.default.equal(err.toString(), 'IndexError: Index out of range (6 > 3)');
  });

  it('should throw an error when constructed without new operator', function () {
    _assert2.default.throws(function () {
      (0, _IndexError.IndexError)(5);
    });
  });
});
