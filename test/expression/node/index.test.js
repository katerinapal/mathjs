'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var index = require('../../../lib/expression/node/index');

describe('node/index', function () {

  it('should contain all nodes', function () {
    _assert2.default.equal(index.length, 16);
  });
});
