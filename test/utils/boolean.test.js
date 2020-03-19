"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _boolean = require("../../lib/utils/boolean");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('boolean', function () {

  it('isBoolean', function () {
    _assert2.default.equal((0, _boolean.isBoolean)(true), true);
    _assert2.default.equal((0, _boolean.isBoolean)(false), true);
    _assert2.default.equal((0, _boolean.isBoolean)(Boolean(false)), true);
    _assert2.default.equal((0, _boolean.isBoolean)('hi'), false);
    _assert2.default.equal((0, _boolean.isBoolean)(23), false);
    _assert2.default.equal((0, _boolean.isBoolean)([]), false);
    _assert2.default.equal((0, _boolean.isBoolean)({}), false);
    _assert2.default.equal((0, _boolean.isBoolean)(new Date()), false);

    // we don't support non primitive Boolean anymore
    _assert2.default.equal((0, _boolean.isBoolean)(new Boolean(true)), false);
    _assert2.default.equal((0, _boolean.isBoolean)(new Boolean(false)), false);
  });
});
