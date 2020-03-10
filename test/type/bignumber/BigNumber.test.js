import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;


describe('BigNumber', function () {

  it('should have a property isBigNumber', function () {
    var a = new index_obj.type.BigNumber(5);
    assert.strictEqual(a.isBigNumber, true);
  });

  it('should have a property type', function () {
    var a = new index_obj.type.BigNumber(5);
    assert.strictEqual(a.type, 'BigNumber');
  });

  it('toJSON', function () {
    assert.deepEqual(new index_obj.type.BigNumber(5).toJSON(), {'mathjs': 'BigNumber', value: '5'});
  });

  it('fromJSON', function () {
    var b = index_obj.type.BigNumber.fromJSON({value: '5'});
    assert.ok(b instanceof index_obj.type.BigNumber);
    assert.strictEqual(b.toString(), '5');
    assert.deepEqual(b, new index_obj.type.BigNumber(5));
  });

});
