import assert from "assert";
import { index_obj } from "../../../../index";
var math = index_obj;
var splitUnit = index_obj.splitUnit;
var Unit = index_obj.type.Unit;

describe('splitUnit', function() {
    it('should split a unit into parts', function() {
      assert.equal(splitUnit(new Unit(1, 'm'), ['ft', 'in']).toString(), "3 ft,3.3700787401574765 in");
      assert.equal(splitUnit(new Unit(-1, 'm'), ['ft', 'in']).toString(), "-3 ft,-3.3700787401574765 in");
      assert.equal(splitUnit(new Unit(1, 'm/s'), ['m/s']).toString(), "1 m / s");

      assert.equal(index_obj.eval('splitUnit(1 m, [ft, in])').toString(), "3 ft,3.3700787401574765 in");
    });
});
