"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _boolean = require("../../lib/utils/boolean");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test boolean utils
var approx = require('../../tools/approx');

describe('boolean', function () {

  it('isBoolean', function () {
    _assert2.default.equal(_boolean.isBoolean.isBoolean(true), true);
    _assert2.default.equal(_boolean.isBoolean.isBoolean(false), true);
    _assert2.default.equal(_boolean.isBoolean.isBoolean(Boolean(false)), true);
    _assert2.default.equal(_boolean.isBoolean.isBoolean('hi'), false);
    _assert2.default.equal(_boolean.isBoolean.isBoolean(23), false);
    _assert2.default.equal(_boolean.isBoolean.isBoolean([]), false);
    _assert2.default.equal(_boolean.isBoolean.isBoolean({}), false);
    _assert2.default.equal(_boolean.isBoolean.isBoolean(new Date()), false);

    // we don't support non primitive Boolean anymore
    _assert2.default.equal(_boolean.isBoolean.isBoolean(new Boolean(true)), false);
    _assert2.default.equal(_boolean.isBoolean.isBoolean(new Boolean(false)), false);
  });
});
