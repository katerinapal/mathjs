import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;


describe('Fraction', function () {

  it('should have a property isFraction', function () {
    var a = new index_obj.type.Fraction(1,3);
    assert.strictEqual(a.isFraction, true);
  });

  it('should have a property type', function () {
    var a = new index_obj.type.Fraction(1,3);
    assert.strictEqual(a.type, 'Fraction');
  });

  it('should have a valueOf method', function () {
    var a = new index_obj.type.Fraction(1,2);
    assert.strictEqual(a.valueOf(), 0.5);
  });

  it('toJSON', function () {
    assert.deepEqual(new index_obj.type.Fraction(0.375).toJSON(), {'mathjs': 'Fraction', n: 3, d: 8});
    assert.deepEqual(new index_obj.type.Fraction(-0.375).toJSON(), {'mathjs': 'Fraction', n: -3, d: 8});
  });

  it('fromJSON', function () {
    var b = index_obj.type.Fraction.fromJSON({n: 3, d: 8});
    assert.ok(b instanceof index_obj.type.Fraction);
    assert.strictEqual(b.toString(), '0.375');

    var c = index_obj.type.Fraction.fromJSON({n: -3, d: 8});
    assert.ok(c instanceof index_obj.type.Fraction);
    assert.strictEqual(c.toString(), '-0.375');

    var d = index_obj.type.Fraction.fromJSON({n: 3, d: -8});
    assert.ok(d instanceof index_obj.type.Fraction);
    assert.strictEqual(d.toString(), '-0.375');
  });

});
