import assert_moduleDefault from "assert";
import { math as indexjs } from "../../../../index";
import fraction_moduleDefault from "fraction.js";
var assert = {};
var math = indexjs;
var Fraction = {};

describe('fraction', function () {

  it('should create a fraction', function () {
    equalFraction(indexjs.fraction(1,3), new Fraction(1, 3));
    equalFraction(indexjs.fraction(0.3), new Fraction(0.3));
    equalFraction(indexjs.fraction('1/3'), new Fraction(1,3));
    equalFraction(indexjs.fraction({n: 1, d: 3}), new Fraction(1,3));
  });

  it('should create a fraction from a BigNumber', function () {
    var b = indexjs.bignumber(2).div(3);
    var f = indexjs.fraction(b);
    equalFraction(f, new Fraction('0.6666666666666666666666666666666666666666666666666666666666666667'));
  });

  it('should clone a fraction', function () {
    var a = indexjs.fraction(1,3);
    var b = indexjs.fraction(a);
    assert.strictEqual(a, b); // b === a as fractions are supposed to be immutable
  });

  it('should create a fraction for all elements in an array', function () {
    var arr = indexjs.fraction([0.2, 0.25, 0.125]);
    assert(Array.isArray(arr));
    assert.equal(arr.length, 3);

    equalFraction(arr[0], new Fraction(1, 5));
    equalFraction(arr[1], new Fraction(1, 4));
    equalFraction(arr[2], new Fraction(1, 8));
  });

  it('should create a fraction for all elements in a Matrix', function () {
    var mat = indexjs.fraction(indexjs.matrix([0.2, 0.25, 0.125]));
    assert.strictEqual(mat.isMatrix, true);

    var arr = mat.toArray();
    equalFraction(arr[0], new Fraction(1, 5));
    equalFraction(arr[1], new Fraction(1, 4));
    equalFraction(arr[2], new Fraction(1, 8));
  });

  it('should throw an error in case of NaN or Infinity', function () {
    assert.throws(function () {indexjs.fraction(Infinity)}, /Error: Infinity cannot be represented as a fraction/);
    assert.throws(function () {indexjs.fraction(-Infinity)}, /Error: -Infinity cannot be represented as a fraction/);
    assert.throws(function () {indexjs.fraction(NaN)}, /Error: NaN cannot be represented as a fraction/);
  });

});

function equalFraction (a, b) {
  var msg = a.toString() + ' !== ' + b.toString();
  assert.strictEqual(a.s, b.s, msg);
  assert.strictEqual(a.n, b.n, msg);
  assert.strictEqual(a.d, b.d, msg);
}
