"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _latex = require("../../lib/utils/latex");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('util.latex', function () {
  it('should convert symbols with indices', function () {
    _assert2.default.equal((0, _latex.toSymbol)('alpha_1'), '\\alpha_{1}');
  });

  it('should convert units', function () {
    _assert2.default.equal((0, _latex.toSymbol)('deg', true), '^\\circ');
  });
});
