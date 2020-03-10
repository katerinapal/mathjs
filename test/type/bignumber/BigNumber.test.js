import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../index";
var assert = {};
var math = indexjs;


describe('BigNumber', function () {

  it('should have a property isBigNumber', function () {
    var a = new indexjs.type.BigNumber(5);
    assert.strictEqual(a.isBigNumber, true);
  });

  it('should have a property type', function () {
    var a = new indexjs.type.BigNumber(5);
    assert.strictEqual(a.type, 'BigNumber');
  });

  it('toJSON', function () {
    assert.deepEqual(new indexjs.type.BigNumber(5).toJSON(), {'mathjs': 'BigNumber', value: '5'});
  });

  it('fromJSON', function () {
    var b = indexjs.type.BigNumber.fromJSON({value: '5'});
    assert.ok(b instanceof indexjs.type.BigNumber);
    assert.strictEqual(b.toString(), '5');
    assert.deepEqual(b, new indexjs.type.BigNumber(5));
  });

});
