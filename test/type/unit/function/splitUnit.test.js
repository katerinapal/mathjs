import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../../index";
var assert = {};
var math = indexjs;
var splitUnit = indexjs.splitUnit;
var Unit = indexjs.type.Unit;

describe('splitUnit', function() {
    it('should split a unit into parts', function() {
      assert.equal(splitUnit(new Unit(1, 'm'), ['ft', 'in']).toString(), "3 ft,3.3700787401574765 in");
      assert.equal(splitUnit(new Unit(-1, 'm'), ['ft', 'in']).toString(), "-3 ft,-3.3700787401574765 in");
      assert.equal(splitUnit(new Unit(1, 'm/s'), ['m/s']).toString(), "1 m / s");

      assert.equal(indexjs.eval('splitUnit(1 m, [ft, in])').toString(), "3 ft,3.3700787401574765 in");
    });
});
