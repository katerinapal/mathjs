'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var latex = require('../../lib/utils/latex');

describe('util.latex', function () {
  it('should convert symbols with indices', function () {
    _assert2.default.equal(latex.toSymbol('alpha_1'), '\\alpha_{1}');
  });

  it('should convert units', function () {
    _assert2.default.equal(latex.toSymbol('deg', true), '^\\circ');
  });
});
