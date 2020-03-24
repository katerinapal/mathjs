import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";


describe('BigNumber', function () {

  it('should have a property isBigNumber', function () {
    var a = new index_indexjsjs.type.BigNumber(5);
    assert.strictEqual(a.isBigNumber, true);
  });

  it('should have a property type', function () {
    var a = new index_indexjsjs.type.BigNumber(5);
    assert.strictEqual(a.type, 'BigNumber');
  });

  it('toJSON', function () {
    assert.deepEqual(new index_indexjsjs.type.BigNumber(5).toJSON(), {'mathjs': 'BigNumber', value: '5'});
  });

  it('fromJSON', function () {
    var b = index_indexjsjs.type.BigNumber.fromJSON({value: '5'});
    assert.ok(b instanceof index_indexjsjs.type.BigNumber);
    assert.strictEqual(b.toString(), '5');
    assert.deepEqual(b, new index_indexjsjs.type.BigNumber(5));
  });

});
