"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var splitUnit = _index.indexjs.splitUnit;
var Unit = _index.indexjs.type.Unit;

describe('splitUnit', function () {
  it('should split a unit into parts', function () {
    _assert2.default.equal(splitUnit(new Unit(1, 'm'), ['ft', 'in']).toString(), "3 ft,3.3700787401574765 in");
    _assert2.default.equal(splitUnit(new Unit(-1, 'm'), ['ft', 'in']).toString(), "-3 ft,-3.3700787401574765 in");
    _assert2.default.equal(splitUnit(new Unit(1, 'm/s'), ['m/s']).toString(), "1 m / s");

    _assert2.default.equal(_index.indexjs.eval('splitUnit(1 m, [ft, in])').toString(), "3 ft,3.3700787401574765 in");
  });
});
