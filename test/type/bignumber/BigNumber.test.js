'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('BigNumber', function () {

  it('should have a property isBigNumber', function () {
    var a = new math.type.BigNumber(5);
    _assert2.default.strictEqual(a.isBigNumber, true);
  });

  it('should have a property type', function () {
    var a = new math.type.BigNumber(5);
    _assert2.default.strictEqual(a.type, 'BigNumber');
  });

  it('toJSON', function () {
    _assert2.default.deepEqual(new math.type.BigNumber(5).toJSON(), { 'mathjs': 'BigNumber', value: '5' });
  });

  it('fromJSON', function () {
    var b = math.type.BigNumber.fromJSON({ value: '5' });
    _assert2.default.ok(b instanceof math.type.BigNumber);
    _assert2.default.strictEqual(b.toString(), '5');
    _assert2.default.deepEqual(b, new math.type.BigNumber(5));
  });
});
