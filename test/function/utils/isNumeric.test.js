import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
var isNumeric = index_indexjsjs.isNumeric;
var bignumber = index_indexjsjs.bignumber;
var fraction = index_indexjsjs.fraction;

describe('isNumeric', function() {

  it('should test whether a value is numeric', function() {
    assert.strictEqual(isNumeric(2), true);
    assert.strictEqual(isNumeric(true), true);
    assert.strictEqual(isNumeric(bignumber(2.3)), true);
    assert.strictEqual(isNumeric(fraction(1,3)), true);

    assert.strictEqual(isNumeric('2'), false);
    assert.strictEqual(isNumeric('foo'), false);
    assert.strictEqual(isNumeric(index_indexjsjs.complex(2,3)), false);
    assert.strictEqual(isNumeric(index_indexjsjs.unit('5 cm')), false);
  });

  it('should test isNumeric element wise on an Array', function() {
    assert.deepEqual(isNumeric([2, 'foo', true]), [true, false, true]);
  });

  it('should test isNumeric element wise on a Matrix', function() {
    assert.deepEqual(isNumeric(index_indexjsjs.matrix([2, 'foo', true])), index_indexjsjs.matrix([true, false, true]));
  });

  it('should throw an error in case of unsupported data types', function() {
    assert.throws(function () {isNumeric(new Date())}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {isNumeric({})}, /TypeError: Unexpected type of argument/);
  });

});
