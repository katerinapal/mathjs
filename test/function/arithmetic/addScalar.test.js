import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
import decimal_moduleDefault from "decimal.js";
// test add
var assert = {};
var approx = approxjs;
var math = indexjs;
var BigNumber = {};
var add = indexjs.add;

// TODO: make unit tests independent of math
describe('add', function() {

  it('should add two numbers', function() {
    assert.equal(add(2, 3), 5);
    assert.equal(add(-2, 3), 1);
    assert.equal(add(2, -3), -1);
    assert.equal(add(-5, -3), -8);
  });

  it('should add booleans', function() {
    assert.equal(add(true, true), 2);
    assert.equal(add(true, false), 1);
    assert.equal(add(false, true), 1);
    assert.equal(add(false, false), 0);
  });

  it('should add numbers and null', function () {
    assert.equal(indexjs.add(null, null), 0);
    assert.equal(indexjs.add(null, 1), 1);
    assert.equal(indexjs.add(1, null), 1);
  });

  it('should add mixed numbers and booleans', function() {
    assert.equal(add(2, true), 3);
    assert.equal(add(2, false), 2);
    assert.equal(add(true, 2), 3);
    assert.equal(add(false, 2), 2);
  });

  it('should add BigNumbers', function() {
    assert.deepEqual(add(new BigNumber(0.1), new BigNumber(0.2)), new BigNumber(0.3));
    assert.deepEqual(add(new BigNumber('2e5001'), new BigNumber('3e5000')), new BigNumber('2.3e5001'));
    assert.deepEqual(add(new BigNumber('9999999999999999999'), new BigNumber('1')), new BigNumber('1e19'));
  });

  it('should add mixed numbers and BigNumbers', function() {
    assert.deepEqual(add(new BigNumber(0.1), 0.2), new BigNumber(0.3));
    assert.deepEqual(add(0.1, new BigNumber(0.2)), new indexjs.type.BigNumber(0.3));

    assert.throws(function () {add(1/3, new BigNumber(1));}, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    assert.throws(function () {add(new BigNumber(1), 1/3);}, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
  });

  it('should add mixed booleans and BigNumbers', function() {
    assert.deepEqual(add(new BigNumber(0.1), true), new BigNumber(1.1));
    assert.deepEqual(add(new BigNumber(0.1), false), new BigNumber(0.1));
    assert.deepEqual(add(false, new BigNumber(0.2)), new indexjs.type.BigNumber(0.2));
    assert.deepEqual(add(true, new BigNumber(0.2)), new indexjs.type.BigNumber(1.2));
  });

  it('should add mixed complex numbers and BigNumbers', function() {
    assert.deepEqual(add(indexjs.complex(3, -4), new BigNumber(2)), indexjs.complex(5, -4));
    assert.deepEqual(add(new BigNumber(2), indexjs.complex(3, -4)), indexjs.complex(5, -4));
  });

  it('should add two complex numbers', function() {
    assert.equal(add(indexjs.complex(3, -4), indexjs.complex(8, 2)), '11 - 2i');
    assert.equal(add(indexjs.complex(3, -4), 10), '13 - 4i');
    assert.equal(add(10, indexjs.complex(3, -4)), '13 - 4i');
  });

  it('should add two fractions', function() {
    var a = indexjs.fraction(1,3);
    assert.equal(add(a, indexjs.fraction(1,6)).toString(), '0.5');
    assert.equal(a.toString(), '0.(3)');
    assert.equal(add(indexjs.fraction(1,5), indexjs.fraction(2,5)).toString(), '0.6');
    assert.equal(add(indexjs.fraction(1), indexjs.fraction(1,3)).toString(), '1.(3)');
  });

  it('should add mixed fractions and numbers', function() {
    assert.deepEqual(add(1, indexjs.fraction(1,3)), indexjs.fraction(4,3));
    assert.deepEqual(add(indexjs.fraction(1,3), 1), indexjs.fraction(4,3));
  });

  it('should throw an error when converting a number with 15+ digits to fraction', function() {
    assert.throws(function () {
      add(indexjs.pi, indexjs.fraction(1,3))
    }, /Cannot implicitly convert a number with >15 significant digits to Fraction/);
  });

  it('should convert strings to numbers', function() {
    assert.strictEqual(add('2', '3'), 5);
    assert.strictEqual(add(2, '3'), 5);
    assert.strictEqual(add('2', 3), 5);
  });

  it('should add two measures of the same unit', function() {
    approxjs.deepEqual(add(indexjs.unit(5, 'km'), indexjs.unit(100, 'mile')), indexjs.unit(165.93, 'km'));

    approxjs.deepEqual(add(indexjs.unit(indexjs.fraction(1,3), 'm'), indexjs.unit(indexjs.fraction(1,3), 'm')).toString(), '2/3 m');

    approxjs.deepEqual(add(indexjs.unit(indexjs.complex(-3, 2), 'g'), indexjs.unit(indexjs.complex(5, -6), 'g')).toString(), '(2 - 4i) g');
  });

  it('should throw an error for two measures of different units', function() {
    assert.throws(function () {
      add(indexjs.unit(5, 'km'), indexjs.unit(100, 'gram'));
    });
  });

  it('should throw an error when one of the two units has undefined value', function() {
    assert.throws(function () {
      add(indexjs.unit('km'), indexjs.unit('5gram'));
    }, /Parameter x contains a unit with undefined value/);
    assert.throws(function () {
      add(indexjs.unit('5 km'), indexjs.unit('gram'));
    }, /Parameter y contains a unit with undefined value/);
  });

  it('should throw an error in case of a unit and non-unit argument', function() {
    assert.throws(function () {add(indexjs.unit('5cm'), 2);}, /TypeError: Unexpected type of argument in function add/);
    assert.throws(function () {add(indexjs.unit('5cm'), new Date());}, /TypeError: Unexpected type of argument in function add/);
    assert.throws(function () {add(new Date(), indexjs.unit('5cm'));}, /TypeError: Unexpected type of argument in function add/);
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {add(1);}, /TypeError: Too few arguments/);
    assert.throws(function () {add(1, 2, 3);}, /TypeError: Too many arguments/);
  });

  it('should LaTeX add', function () {
    var expression = indexjs.parse('add(1,2)');
    assert.equal(expression.toTex(), '\\left(1+2\\right)');
  });

});
