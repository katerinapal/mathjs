import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
var assert = {};
var math = indexjs;


describe('Fraction', function () {

  it('should have a property isFraction', function () {
    var a = new indexjs.type.Fraction(1,3);
    assert.strictEqual(a.isFraction, true);
  });

  it('should have a property type', function () {
    var a = new indexjs.type.Fraction(1,3);
    assert.strictEqual(a.type, 'Fraction');
  });

  it('should have a valueOf method', function () {
    var a = new indexjs.type.Fraction(1,2);
    assert.strictEqual(a.valueOf(), 0.5);
  });

  it('toJSON', function () {
    assert.deepEqual(new indexjs.type.Fraction(0.375).toJSON(), {'mathjs': 'Fraction', n: 3, d: 8});
    assert.deepEqual(new indexjs.type.Fraction(-0.375).toJSON(), {'mathjs': 'Fraction', n: -3, d: 8});
  });

  it('fromJSON', function () {
    var b = indexjs.type.Fraction.fromJSON({n: 3, d: 8});
    assert.ok(b instanceof indexjs.type.Fraction);
    assert.strictEqual(b.toString(), '0.375');

    var c = indexjs.type.Fraction.fromJSON({n: -3, d: 8});
    assert.ok(c instanceof indexjs.type.Fraction);
    assert.strictEqual(c.toString(), '-0.375');

    var d = indexjs.type.Fraction.fromJSON({n: 3, d: -8});
    assert.ok(d instanceof indexjs.type.Fraction);
    assert.strictEqual(d.toString(), '-0.375');
  });

});
