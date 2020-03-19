'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('Fraction', function () {

  it('should have a property isFraction', function () {
    var a = new math.type.Fraction(1, 3);
    _assert2.default.strictEqual(a.isFraction, true);
  });

  it('should have a property type', function () {
    var a = new math.type.Fraction(1, 3);
    _assert2.default.strictEqual(a.type, 'Fraction');
  });

  it('should have a valueOf method', function () {
    var a = new math.type.Fraction(1, 2);
    _assert2.default.strictEqual(a.valueOf(), 0.5);
  });

  it('toJSON', function () {
    _assert2.default.deepEqual(new math.type.Fraction(0.375).toJSON(), { 'mathjs': 'Fraction', n: 3, d: 8 });
    _assert2.default.deepEqual(new math.type.Fraction(-0.375).toJSON(), { 'mathjs': 'Fraction', n: -3, d: 8 });
  });

  it('fromJSON', function () {
    var b = math.type.Fraction.fromJSON({ n: 3, d: 8 });
    _assert2.default.ok(b instanceof math.type.Fraction);
    _assert2.default.strictEqual(b.toString(), '0.375');

    var c = math.type.Fraction.fromJSON({ n: -3, d: 8 });
    _assert2.default.ok(c instanceof math.type.Fraction);
    _assert2.default.strictEqual(c.toString(), '-0.375');

    var d = math.type.Fraction.fromJSON({ n: 3, d: -8 });
    _assert2.default.ok(d instanceof math.type.Fraction);
    _assert2.default.strictEqual(d.toString(), '-0.375');
  });
});
