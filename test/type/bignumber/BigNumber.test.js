import assert from "assert";
import { index } from "../../../index";
var math = index;


describe('BigNumber', function () {

  it('should have a property isBigNumber', function () {
    var a = new index.type.BigNumber(5);
    assert.strictEqual(a.isBigNumber, true);
  });

  it('should have a property type', function () {
    var a = new index.type.BigNumber(5);
    assert.strictEqual(a.type, 'BigNumber');
  });

  it('toJSON', function () {
    assert.deepEqual(new index.type.BigNumber(5).toJSON(), {'mathjs': 'BigNumber', value: '5'});
  });

  it('fromJSON', function () {
    var b = index.type.BigNumber.fromJSON({value: '5'});
    assert.ok(b instanceof index.type.BigNumber);
    assert.strictEqual(b.toString(), '5');
    assert.deepEqual(b, new index.type.BigNumber(5));
  });

});
