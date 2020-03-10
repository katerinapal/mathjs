import assert from "assert";
import { index_obj } from "../../../index";
var math = index_obj;

describe('abs', function () {
  it('should return the abs value of a boolean', function () {
    assert.strictEqual(index_obj.abs(true), 1);
    assert.strictEqual(index_obj.abs(false), 0);
  });

  it('should return the abs value of null', function () {
    assert.strictEqual(index_obj.abs(null), 0);
  });

  it('should return the abs value of a number', function () {
    assert.strictEqual(index_obj.abs(-4.2), 4.2);
    assert.strictEqual(index_obj.abs(-3.5), 3.5);
    assert.strictEqual(index_obj.abs(100), 100);
    assert.strictEqual(index_obj.abs(0), 0);
  });

  it('should return the absolute value of a big number', function () {
    assert.deepEqual(index_obj.abs(index_obj.bignumber(-2.3)), index_obj.bignumber(2.3));
    assert.deepEqual(index_obj.abs(index_obj.bignumber('5e500')), index_obj.bignumber('5e500'));
    assert.deepEqual(index_obj.abs(index_obj.bignumber('-5e500')), index_obj.bignumber('5e500'));
  });

  it('should return the absolute value of a complex number', function () {
    assert.equal(index_obj.abs(index_obj.complex(3, -4)), 5);
    assert.equal(index_obj.abs(index_obj.complex(1e200, -4e200)), 4.12310562561766e+200);
  });

  it('should return the absolute value of a fraction', function () {
    var a = index_obj.fraction('-1/3');
    assert.equal(index_obj.abs(a).toString(), '0.(3)');
    assert.equal(a.toString(), '-0.(3)');
    assert.equal(index_obj.abs(index_obj.fraction('1/3')).toString(), '0.(3)');
  });

  it('should convert a string to a number', function() {
    assert.strictEqual(index_obj.abs('-2'), 2);
  });

  it('should return the absolute value of all elements in an Array', function () {
    var a1 = index_obj.abs([1,-2,3]);
    assert.ok(Array.isArray(a1));
    assert.deepEqual(a1, [1,2,3]);
    a1 = index_obj.abs([-2,-1,0,1,2]);
    assert.ok(Array.isArray(a1));
    assert.deepEqual(a1, [2,1,0,1,2]);
  });

  it('should return the absolute number of a complex number with zero', function () {
    assert.equal(index_obj.abs(index_obj.complex(1, 0)), 1);
    assert.equal(index_obj.abs(index_obj.complex(0, 1)), 1);
    assert.equal(index_obj.abs(index_obj.complex(0, 0)), 0);
    assert.equal(index_obj.abs(index_obj.complex(-1, 0)), 1);
    assert.equal(index_obj.abs(index_obj.complex(0, -1)), 1);
  });

  it('should return the absolute value of all elements in a matrix', function () {
    var a1 = index_obj.abs(index_obj.matrix([1,-2,3]));
    assert.ok(a1 instanceof index_obj.type.Matrix);
    assert.deepEqual(a1.size(), [3]);
    assert.deepEqual(a1.valueOf(), [1,2,3]);
    a1 = index_obj.abs(index_obj.matrix([-2,-1,0,1,2]));
    assert.ok(a1 instanceof index_obj.type.Matrix);
    assert.deepEqual(a1.size(), [5]);
    assert.deepEqual(a1.valueOf(), [2,1,0,1,2])
  });

  it('should return the absolute value of a unit', function () {
    var u = index_obj.abs(index_obj.unit('5 m'));
    assert.equal(u.toString(), '5 m');

    u = index_obj.abs(index_obj.unit('-5 m'));
    assert.equal(u.toString(), '5 m');

    u = index_obj.abs(index_obj.unit('-283.15 degC'));
    assert.equal(u.toString(), '-263.15 degC');

    u = index_obj.abs(index_obj.unit(index_obj.fraction(2,3), 'm'));
    assert.equal(u.toString(), '2/3 m');

    u = index_obj.abs(index_obj.unit(index_obj.complex(-4, 3), 'in'));
    assert.equal(u.toString(), '5 in');
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index_obj.abs()}, /TypeError: Too few arguments/);
    assert.throws(function () {index_obj.abs(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of unsupported types', function () {
    assert.throws(function () {index_obj.abs(new Date());}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {index_obj.abs(undefined);}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX abs', function () {
    var expression = index_obj.parse('abs(-1)');
    assert.equal(expression.toTex(),'\\left|-1\\right|');
  });

});
