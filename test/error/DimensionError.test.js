"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _DimensionError = require("../../lib/error/DimensionError");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('DimensionError', function () {

  it('should construct a DimensionError with numbers', function () {
    var err = new DimensionError(3, 5);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof DimensionError);
    _assert2.default.equal(err.actual, 3);
    _assert2.default.equal(err.expected, 5);
    _assert2.default.equal(err.relation, undefined);
    _assert2.default.equal(err.toString(), 'DimensionError: Dimension mismatch (3 != 5)');
  });

  it('should construct a DimensionError with numbers and a custom relation', function () {
    var err = new DimensionError(3, 5, '<');
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof DimensionError);
    _assert2.default.equal(err.actual, 3);
    _assert2.default.equal(err.expected, 5);
    _assert2.default.equal(err.relation, '<');
    _assert2.default.equal(err.toString(), 'DimensionError: Dimension mismatch (3 < 5)');
  });

  it('should construct a DimensionError with arrays', function () {
    var err = new DimensionError([2, 3], [1, 3]);
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof DimensionError);
    _assert2.default.deepEqual(err.actual, [2, 3]);
    _assert2.default.deepEqual(err.expected, [1, 3]);
    _assert2.default.equal(err.relation, undefined);
    _assert2.default.equal(err.toString(), 'DimensionError: Dimension mismatch ([2, 3] != [1, 3])');
  });

  it('should construct a DimensionError with arrays and a custom relation', function () {
    var err = new DimensionError([2, 3], [1, 3], '<');
    (0, _assert2.default)(err instanceof Error);
    (0, _assert2.default)(err instanceof RangeError);
    (0, _assert2.default)(err instanceof DimensionError);
    _assert2.default.deepEqual(err.actual, [2, 3]);
    _assert2.default.deepEqual(err.expected, [1, 3]);
    _assert2.default.equal(err.relation, '<');
    _assert2.default.equal(err.toString(), 'DimensionError: Dimension mismatch ([2, 3] < [1, 3])');
  });

  it('should throw an error when operator new is missing', function () {
    _assert2.default.throws(function () {
      DimensionError(3, 5);
    }, SyntaxError);
  });
});
