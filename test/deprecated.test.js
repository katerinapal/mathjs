'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('deprecated stuff', function () {

  it('should throw a deprecation error when using UpdateNode', function () {

    _assert2.default.throws(function () {
      new math.expression.node.UpdateNode();
    }, /UpdateNode is deprecated/);
  });
});
