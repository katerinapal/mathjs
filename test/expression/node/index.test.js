"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../lib/expression/node/index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('node/index', function () {

  it('should contain all nodes', function () {
    _assert2.default.equal(_index.indexjs.length, 16);
  });
});
