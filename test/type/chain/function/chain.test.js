"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chain = _index.indexjs.type.Chain;

describe('chain', function () {

  it('should construct a chain', function () {
    _assert2.default.ok(_index.indexjs.chain(45) instanceof Chain);
    _assert2.default.ok(_index.indexjs.chain(_index.indexjs.complex(2, 3)) instanceof Chain);
    _assert2.default.ok(_index.indexjs.chain() instanceof Chain);
  });

  it('should LaTeX chain', function () {
    var expression = _index.indexjs.parse('chain(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{chain}\\left(1\\right)');
  });
});
