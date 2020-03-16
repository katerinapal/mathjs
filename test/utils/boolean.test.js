'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test boolean utils
var approx = require('../../tools/approx'),
    boolean = require('../../lib/utils/boolean');

describe('boolean', function () {

  it('isBoolean', function () {
    _assert2.default.equal(boolean.isBoolean(true), true);
    _assert2.default.equal(boolean.isBoolean(false), true);
    _assert2.default.equal(boolean.isBoolean(Boolean(false)), true);
    _assert2.default.equal(boolean.isBoolean('hi'), false);
    _assert2.default.equal(boolean.isBoolean(23), false);
    _assert2.default.equal(boolean.isBoolean([]), false);
    _assert2.default.equal(boolean.isBoolean({}), false);
    _assert2.default.equal(boolean.isBoolean(new Date()), false);

    // we don't support non primitive Boolean anymore
    _assert2.default.equal(boolean.isBoolean(new Boolean(true)), false);
    _assert2.default.equal(boolean.isBoolean(new Boolean(false)), false);
  });
});
