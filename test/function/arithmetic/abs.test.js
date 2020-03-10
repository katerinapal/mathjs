import assert from "assert";
import { index } from "../../../index";
var math = index;

describe('abs', function () {
  it('should return the abs value of a boolean', function () {
    assert.strictEqual(index.abs(true), 1);
    assert.strictEqual(index.abs(false), 0);
  });

  it('should return the abs value of null', function () {
    assert.strictEqual(index.abs(null), 0);
  });

  it('should return the abs value of a number', function () {
    assert.strictEqual(index.abs(-4.2), 4.2);
    assert.strictEqual(index.abs(-3.5), 3.5);
    assert.strictEqual(index.abs(100), 100);
    assert.strictEqual(index.abs(0), 0);
  });

  it('should return the absolute value of a big number', function () {
    assert.deepEqual(index.abs(index.bignumber(-2.3)), index.bignumber(2.3));
    assert.deepEqual(index.abs(index.bignumber('5e500')), index.bignumber('5e500'));
    assert.deepEqual(index.abs(index.bignumber('-5e500')), index.bignumber('5e500'));
  });

  it('should return the absolute value of a complex number', function () {
    assert.equal(index.abs(index.complex(3, -4)), 5);
    assert.equal(index.abs(index.complex(1e200, -4e200)), 4.12310562561766e+200);
  });

  it('should return the absolute value of a fraction', function () {
    var a = index.fraction('-1/3');
    assert.equal(index.abs(a).toString(), '0.(3)');
    assert.equal(a.toString(), '-0.(3)');
    assert.equal(index.abs(index.fraction('1/3')).toString(), '0.(3)');
  });

  it('should convert a string to a number', function() {
    assert.strictEqual(index.abs('-2'), 2);
  });

  it('should return the absolute value of all elements in an Array', function () {
    var a1 = index.abs([1,-2,3]);
    assert.ok(Array.isArray(a1));
    assert.deepEqual(a1, [1,2,3]);
    a1 = index.abs([-2,-1,0,1,2]);
    assert.ok(Array.isArray(a1));
    assert.deepEqual(a1, [2,1,0,1,2]);
  });

  it('should return the absolute number of a complex number with zero', function () {
    assert.equal(index.abs(index.complex(1, 0)), 1);
    assert.equal(index.abs(index.complex(0, 1)), 1);
    assert.equal(index.abs(index.complex(0, 0)), 0);
    assert.equal(index.abs(index.complex(-1, 0)), 1);
    assert.equal(index.abs(index.complex(0, -1)), 1);
  });

  it('should return the absolute value of all elements in a matrix', function () {
    var a1 = index.abs(index.matrix([1,-2,3]));
    assert.ok(a1 instanceof index.type.Matrix);
    assert.deepEqual(a1.size(), [3]);
    assert.deepEqual(a1.valueOf(), [1,2,3]);
    a1 = index.abs(index.matrix([-2,-1,0,1,2]));
    assert.ok(a1 instanceof index.type.Matrix);
    assert.deepEqual(a1.size(), [5]);
    assert.deepEqual(a1.valueOf(), [2,1,0,1,2])
  });

  it('should return the absolute value of a unit', function () {
    var u = index.abs(index.unit('5 m'));
    assert.equal(u.toString(), '5 m');

    u = index.abs(index.unit('-5 m'));
    assert.equal(u.toString(), '5 m');

    u = index.abs(index.unit('-283.15 degC'));
    assert.equal(u.toString(), '-263.15 degC');

    u = index.abs(index.unit(index.fraction(2,3), 'm'));
    assert.equal(u.toString(), '2/3 m');

    u = index.abs(index.unit(index.complex(-4, 3), 'in'));
    assert.equal(u.toString(), '5 in');
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {index.abs()}, /TypeError: Too few arguments/);
    assert.throws(function () {index.abs(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of unsupported types', function () {
    assert.throws(function () {index.abs(new Date());}, /TypeError: Unexpected type of argument/);
    assert.throws(function () {index.abs(undefined);}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX abs', function () {
    var expression = index.parse('abs(-1)');
    assert.equal(expression.toTex(),'\\left|-1\\right|');
  });

});
