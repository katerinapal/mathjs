"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../lib/error/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('index.js', function () {

  it('should contain error factory functions', function () {
    (0, _assert2.default)(Array.isArray(_index.indexjs));
    (0, _assert2.default)(_index.indexjs[0].name, 'ArgumentsError');
    (0, _assert2.default)(_index.indexjs[1].name, 'DimensionError');
    (0, _assert2.default)(_index.indexjs[2].name, 'IndexError');
  });
});
