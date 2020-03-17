'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../../index');
var splitUnit = math.splitUnit;
var Unit = math.type.Unit;

describe('splitUnit', function () {
  it('should split a unit into parts', function () {
    _assert2.default.equal(splitUnit(new Unit(1, 'm'), ['ft', 'in']).toString(), "3 ft,3.3700787401574765 in");
    _assert2.default.equal(splitUnit(new Unit(-1, 'm'), ['ft', 'in']).toString(), "-3 ft,-3.3700787401574765 in");
    _assert2.default.equal(splitUnit(new Unit(1, 'm/s'), ['m/s']).toString(), "1 m / s");

    _assert2.default.equal(math.eval('splitUnit(1 m, [ft, in])').toString(), "3 ft,3.3700787401574765 in");
  });
});
