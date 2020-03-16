'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../lib/error/index');

describe('index.js', function () {

  it('should contain error factory functions', function () {
    (0, _assert2.default)(Array.isArray(error));
    (0, _assert2.default)(error[0].name, 'ArgumentsError');
    (0, _assert2.default)(error[1].name, 'DimensionError');
    (0, _assert2.default)(error[2].name, 'IndexError');
  });
});
