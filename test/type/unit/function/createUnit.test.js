import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../../index";
var createUnit = index_indexjsjs.createUnit;
var Unit = index_indexjsjs.type.Unit;

describe('createUnit', function() {

  it('should create a unit', function () {
    var u = createUnit('flibbity', '4 hogshead');
    assert.equal(index_indexjsjs.eval('2 flibbity to hogshead').toString(), '8 hogshead');
  });

  it('should accept a unit as second parameter', function () {
    assert.equal(index_indexjsjs.eval('50 in^2 to createUnit("bingo", 25 in^2)').toString(), '2 bingo');
  });

  it('should accept a string as second parameter', function () {
    assert.equal(index_indexjsjs.eval('50 in^2 to createUnit("zingo", "25 in^2")').toString(), '2 zingo');
  });

  it('should return the created unit', function() {
    assert.equal(index_indexjsjs.eval('createUnit("giblet", "6 flibbity")').toString(), 'giblet');
    assert.equal(index_indexjsjs.eval('120 hogshead to createUnit("fliblet", "0.25 giblet")').format(4), '20 fliblet');
  });

  it('should accept options', function() {
    index_indexjsjs.eval('createUnit("whosit", { definition: 3.14 kN, prefixes:"long"})');
    assert.equal(index_indexjsjs.eval('1e-9 whosit').toString(), '1 nanowhosit');

    index_indexjsjs.eval('createUnit("wheresit", { definition: 3.14 kN, offset:2})');
    assert.equal(index_indexjsjs.eval('1 wheresit to kN').toString(), '9.42 kN');
  });

  it('should create multiple units', function() {
    index_indexjsjs.eval('createUnit({"xfoo":{}, "xbar":{}, "xfoobar":"1 xfoo xbar"})');
    assert.equal(index_indexjsjs.eval('5 xfoo').toString(), '5 xfoo');
  });

  it('should simplify created units', function() {
    // TODO: New units do not have base units set, therefore simplifying is impossible. Figure out a way to create base units for created units.
    assert.equal(index_indexjsjs.eval('5 xfoo * 5 xbar').toString(), '25 xfoobar');
  });

  it('should override units', function() {
    index_indexjsjs.eval('createUnit({"bar": 1e12 Pa}, {"override":true})');
    assert.equal(index_indexjsjs.eval('1 bar to Pa').toString(), '1e+12 Pa');
  });
});
