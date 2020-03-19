'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Chain = math.type.Chain;

describe('chain', function () {

  it('should construct a chain', function () {
    _assert2.default.ok(math.chain(45) instanceof Chain);
    _assert2.default.ok(math.chain(math.complex(2, 3)) instanceof Chain);
    _assert2.default.ok(math.chain() instanceof Chain);
  });

  it('should LaTeX chain', function () {
    var expression = math.parse('chain(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{chain}\\left(1\\right)');
  });
});
