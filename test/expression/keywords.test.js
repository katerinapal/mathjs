'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test keywords
var keywords = require('../../lib/expression/keywords');

describe('keywords', function () {

  it('should return a map with reserved keywords', function () {
    _assert2.default.deepEqual(Object.keys(keywords).sort(), ['end'].sort());
  });
});
