import assert from "assert";
import { index } from "../../../index";
import * as liberrorindex from "../../../lib/error/index";
import { toolsapprox } from "../../../tools/approx";
var math = index;
var error = liberrorindex;
var approx = toolsapprox;
var divide = index.divide;
var bignumber = index.bignumber;
var complex = index.complex;

describe('divide', function() {
  it('should divide two numbers', function() {
    assert.equal(divide(4, 2), 2);
    assert.equal(divide(-4, 2), -2);
    assert.equal(divide(4, -2), -2);
    assert.equal(divide(-4, -2), 2);
    assert.equal(divide(4, 0), Infinity);
    assert.equal(divide(-4, 0), -Infinity);
    assert.equal(divide(0, -5), 0);
    assert.ok(isNaN(divide(0, 0)));
  });

  it('should divide booleans', function() {
    assert.equal(divide(true, true), 1);
    assert.equal(divide(true, false), Infinity);
    assert.equal(divide(false, true), 0);
    assert.ok(isNaN(divide(false, false)));
  });

  it('should divide numbers and null', function () {
    assert.equal(divide(1, null), Infinity);
    assert.equal(divide(null, 1), 0);
    assert(isNaN(divide(null, null)));
  });

  it('should divide mixed numbers and booleans', function() {
    assert.equal(divide(2, true), 2);
    assert.equal(divide(2, false), Infinity);
    toolsapprox(divide(true, 2), 0.5);
    assert.equal(divide(false, 2), 0);
  });

  it('should divide bignumbers', function() {
    assert.deepEqual(divide(bignumber(0.3), bignumber(0.2)), bignumber(1.5));
    assert.deepEqual(divide(bignumber('2.6e5000'), bignumber('2')), bignumber('1.3e5000'));
  });

  it('should divide mixed numbers and bignumbers', function() {
    assert.deepEqual(divide(bignumber(0.3), 0.2), bignumber(1.5));
    assert.deepEqual(divide(0.3, bignumber(0.2)), bignumber(1.5));
    assert.deepEqual(divide(bignumber('2.6e5000'), 2), bignumber('1.3e5000'));

    assert.throws(function () {divide(1/3, bignumber(2))}, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);
    assert.throws(function () {divide(bignumber(1), 1/3)}, /Cannot implicitly convert a number with >15 significant digits to BigNumber/);

  });

  it('should divide mixed booleans and bignumbers', function() {
    assert.deepEqual(divide(bignumber(0.3), true), bignumber(0.3));
    assert.deepEqual(divide(bignumber(0.3), false).toString(), 'Infinity');
    assert.deepEqual(divide(false, bignumber('2')), bignumber(0));
    assert.deepEqual(divide(true, bignumber('2')), bignumber(0.5));
  });

  it('should divide two complex numbers', function() {
    toolsapprox.deepEqual(divide(complex('2+3i'), 2), complex('1+1.5i'));
    toolsapprox.deepEqual(divide(complex('2+3i'), complex('4i')), complex('0.75 - 0.5i'));
    toolsapprox.deepEqual(divide(complex('2i'), complex('4i')), complex('0.5'));
    toolsapprox.deepEqual(divide(4, complex('1+2i')), complex('0.8 - 1.6i'));
    toolsapprox.deepEqual(divide(index.i, 0), complex(0, Infinity));
    toolsapprox.deepEqual(divide(complex(0,1), 0), complex(0, Infinity));
    toolsapprox.deepEqual(divide(complex(1,0), 0), complex(Infinity, 0));
    toolsapprox.deepEqual(divide(complex(0,1), complex(0,0)), complex(0, Infinity));
    toolsapprox.deepEqual(divide(complex(1,1), complex(0,0)), complex(Infinity, Infinity));
    toolsapprox.deepEqual(divide(complex(1,-1), complex(0,0)), complex(Infinity, -Infinity));
    toolsapprox.deepEqual(divide(complex(-1,1), complex(0,0)), complex(-Infinity, Infinity));
    toolsapprox.deepEqual(divide(complex(1,1), complex(0,1)), complex(1, -1));
    toolsapprox.deepEqual(divide(complex(1,1), complex(1,0)), complex(1, 1));

    toolsapprox.deepEqual(divide(complex(2, 3), complex(4, 5)), complex('0.5609756097560976 + 0.0487804878048781i'));
    toolsapprox.deepEqual(divide(complex(2, 3), complex(4, -5)), complex('-0.170731707317073 + 0.536585365853659i'));
    toolsapprox.deepEqual(divide(complex(2, 3), complex(-4, 5)), complex('0.170731707317073 - 0.536585365853659i'));
    toolsapprox.deepEqual(divide(complex(2, 3), complex(-4, -5)), complex('-0.5609756097560976 - 0.0487804878048781i'));
    toolsapprox.deepEqual(divide(complex(2, -3), complex(4, 5)), complex('-0.170731707317073 - 0.536585365853659i'));
    toolsapprox.deepEqual(divide(complex(2, -3), complex(4, -5)), complex('0.5609756097560976 - 0.0487804878048781i'));
    toolsapprox.deepEqual(divide(complex(2, -3), complex(-4, 5)), complex('-0.5609756097560976 + 0.0487804878048781i'));
    toolsapprox.deepEqual(divide(complex(2, -3), complex(-4, -5)), complex('0.170731707317073 + 0.536585365853659i'));
    toolsapprox.deepEqual(divide(complex(-2, 3), complex(4, 5)), complex('0.170731707317073 + 0.536585365853659i'));
    toolsapprox.deepEqual(divide(complex(-2, 3), complex(4, -5)), complex('-0.5609756097560976 + 0.0487804878048781i'));
    toolsapprox.deepEqual(divide(complex(-2, 3), complex(-4, 5)), complex('0.5609756097560976 - 0.0487804878048781i'));
    toolsapprox.deepEqual(divide(complex(-2, 3), complex(-4, -5)), complex('-0.170731707317073 - 0.536585365853659i'));
    toolsapprox.deepEqual(divide(complex(-2, -3), complex(4, 5)), complex('-0.5609756097560976 - 0.0487804878048781i'));
    toolsapprox.deepEqual(divide(complex(-2, -3), complex(4, -5)), complex('0.170731707317073 - 0.536585365853659i'));
    toolsapprox.deepEqual(divide(complex(-2, -3), complex(-4, 5)), complex('-0.170731707317073 + 0.536585365853659i'));
    toolsapprox.deepEqual(divide(complex(-2, -3), complex(-4, -5)), complex('0.5609756097560976 + 0.0487804878048781i'));
  });

  it('should divide mixed complex numbers and numbers', function() {
    assert.deepEqual(divide(index.complex(6, -4), 2), index.complex(3, -2));
    assert.deepEqual(divide(1, index.complex(2, 4)), index.complex(0.1, -0.2));
  });

  it('should divide mixed complex numbers and bignumbers', function() {
    assert.deepEqual(divide(index.complex(6, -4), bignumber(2)), index.complex(3, -2));
    assert.deepEqual(divide(bignumber(1), index.complex(2, 4)), index.complex(0.1, -0.2));
  });

  it('should divide two fractions', function() {
    var a = index.fraction(1,4);
    assert.equal(divide(a, index.fraction(1,2)).toString(), '0.5');
    assert.equal(a.toString(), '0.25');
  });

  it('should divide mixed fractions and numbers', function() {
    assert.deepEqual(divide(1, index.fraction(3)), index.fraction(1,3));
    assert.deepEqual(divide(index.fraction(1), 3), index.fraction(1,3));
  });

  it('should divide units by a number', function() {
    assert.equal(divide(index.unit('5 m'), 10).toString(), '500 mm');
  });

  it('should divide valueless units by a number', function() {
    assert.equal(divide(index.unit('m'), 2).toString(), '500 mm');
  });

  it('should divide a number by a unit', function() {
    assert.equal(divide(20, index.unit('4 N s')).toString(), '5 N^-1 s^-1');
    assert.equal(divide(4, index.unit('W')).toString(), '4 W^-1');
    assert.equal(divide(2.5, index.unit('1.25 mm')).toString(), '2 mm^-1');
    assert.equal(divide(10, index.unit('4 mg/s')).toString(), '2.5 s / mg');

    assert.equal(divide(10, index.unit(index.fraction(4), 'mg/s')).toString(), '5/2 s / mg');

    toolsapprox(index.format(divide(10, index.unit(index.complex(1,2), 'm/s')), 14), '(2 - 4i) s / m');
  });

  it('should divide two units', function() {
    assert.equal(divide(index.unit('75 mi/h'), index.unit('40 mi/gal')).to('gal/minute').toString(), '0.03125 gal / minute');

    var a = index.unit(index.fraction(75), 'mi/h');
    var b = index.unit(index.fraction(40), 'mi/gal');
    assert.equal(divide(a, b).to('gal/minute').toString(), '1/32 gal / minute');

    var c = index.unit(index.complex(21, 1), 'kg');
    var d = index.unit(index.complex(2, -3), 's');
    assert.equal(divide(c, d).toString(), "(3 + 5.000000000000001i) kg / s");
  });

  it('should divide one valued unit by a valueless unit and vice-versa', function() {
    assert.equal(divide(index.unit('4 gal'), index.unit('L')).toString(), '15.141648');
    assert.equal(divide(index.unit('gal'), index.unit('4 L')).toString(), '0.946353');

    assert.equal(divide(index.unit('inch'), index.unit(index.fraction(1), 'cm')).toFraction(), '127/50');
  });

  it('should divide (but not simplify) two valueless units', function() {
    assert.equal(divide(index.unit('gal'), index.unit('L')).toString(), 'gal / L');
  });

  it('should divide units by a big number', function() {
    assert.equal(divide(index.unit('5 m'), bignumber(10)).toString(), '500 mm');
  });

  it('should divide each elements in a matrix by a number', function() {
    assert.deepEqual(divide([2,4,6], 2), [1,2,3]);
    a  = index.matrix([[1,2],[3,4]]);
    assert.deepEqual(divide(a, 2), index.matrix([[0.5,1],[1.5,2]]));
    assert.deepEqual(divide(a.valueOf(), 2), [[0.5,1],[1.5,2]]);
    assert.deepEqual(divide([], 2), []);
    assert.deepEqual(divide([], 2), []);
  });

  it('should divide 1 over a matrix (matrix inverse)', function() {
    toolsapprox.deepEqual(divide(1, [
      [ 1, 4,  7],
      [ 3, 0,  5],
      [-1, 9, 11]
    ]), [
      [ 5.625, -2.375, -2.5],
      [ 4.75,  -2.25,  -2],
      [-3.375,  1.625,  1.5]
    ]);
  });

  it('should perform matrix division', function() {
    a = index.matrix([[1,2],[3,4]]);
    b = index.matrix([[5,6],[7,8]]);
    assert.deepEqual(divide(a, b), index.matrix([[3,-2], [2,-1]]));
  });

  it('should divide a matrix by a matrix containing a scalar', function() {
    assert.throws(function () {divide(a, [[1]])});
  });

  /*
  // These are supported now --ericman314
  it('should throw an error if dividing a number by a unit', function() {
    assert.throws(function () {divide(10, math.unit('5 m')).toString()});
  });

  it('should throw an error if dividing a unit by a non-number', function() {
    assert.throws(function () {divide(math.unit('5 m'), math.unit('5cm')).toString()});
  });
  */

  it('should throw an error if there\'s wrong number of arguments', function() {
    assert.throws(function () {divide(2,3,4); });
    assert.throws(function () {divide(2); });
  });

  it('should LaTeX divide', function () {
    var expression = index.parse('divide(1,2)');
    assert.equal(expression.toTex(), '\\frac{1}{2}');
  });

});
