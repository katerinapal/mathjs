"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createUnit = _index.indexjs.createUnit;
var Unit = _index.indexjs.type.Unit;

describe('createUnit', function () {

  it('should create a unit', function () {
    var u = createUnit('flibbity', '4 hogshead');
    _assert2.default.equal(_index.indexjs.eval('2 flibbity to hogshead').toString(), '8 hogshead');
  });

  it('should accept a unit as second parameter', function () {
    _assert2.default.equal(_index.indexjs.eval('50 in^2 to createUnit("bingo", 25 in^2)').toString(), '2 bingo');
  });

  it('should accept a string as second parameter', function () {
    _assert2.default.equal(_index.indexjs.eval('50 in^2 to createUnit("zingo", "25 in^2")').toString(), '2 zingo');
  });

  it('should return the created unit', function () {
    _assert2.default.equal(_index.indexjs.eval('createUnit("giblet", "6 flibbity")').toString(), 'giblet');
    _assert2.default.equal(_index.indexjs.eval('120 hogshead to createUnit("fliblet", "0.25 giblet")').format(4), '20 fliblet');
  });

  it('should accept options', function () {
    _index.indexjs.eval('createUnit("whosit", { definition: 3.14 kN, prefixes:"long"})');
    _assert2.default.equal(_index.indexjs.eval('1e-9 whosit').toString(), '1 nanowhosit');

    _index.indexjs.eval('createUnit("wheresit", { definition: 3.14 kN, offset:2})');
    _assert2.default.equal(_index.indexjs.eval('1 wheresit to kN').toString(), '9.42 kN');
  });

  it('should create multiple units', function () {
    _index.indexjs.eval('createUnit({"xfoo":{}, "xbar":{}, "xfoobar":"1 xfoo xbar"})');
    _assert2.default.equal(_index.indexjs.eval('5 xfoo').toString(), '5 xfoo');
  });

  it('should simplify created units', function () {
    // TODO: New units do not have base units set, therefore simplifying is impossible. Figure out a way to create base units for created units.
    _assert2.default.equal(_index.indexjs.eval('5 xfoo * 5 xbar').toString(), '25 xfoobar');
  });

  it('should override units', function () {
    _index.indexjs.eval('createUnit({"bar": 1e12 Pa}, {"override":true})');
    _assert2.default.equal(_index.indexjs.eval('1 bar to Pa').toString(), '1e+12 Pa');
  });
});
