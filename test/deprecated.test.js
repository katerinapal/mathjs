"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('deprecated stuff', function () {

  it('should throw a deprecation error when using UpdateNode', function () {

    _assert2.default.throws(function () {
      new _index.indexjs.expression.node.UpdateNode();
    }, /UpdateNode is deprecated/);
  });
});
