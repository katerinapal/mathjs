"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _keywords = require("../../lib/expression/keywords");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('keywords', function () {

  it('should return a map with reserved keywords', function () {
    _assert2.default.deepEqual(Object.keys(_keywords.keywordsjs).sort(), ['end'].sort());
  });
});
