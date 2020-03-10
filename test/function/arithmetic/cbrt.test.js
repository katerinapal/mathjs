import assert from "assert";
import { toolsapprox } from "../../../tools/approx";
import * as liberrorindex from "../../../lib/error/index";
import { index } from "../../../index";
var approx = toolsapprox;
var error = liberrorindex;
var math = index;
var cbrt = index.cbrt;
var bignumber = index.bignumber;
var complex = index.complex;

describe('cbrt', function() {
  it('should return the cubic root of a boolean', function () {
    assert.equal(cbrt(true), 1);
    assert.equal(cbrt(false), 0);
  });

  it('should return the cubic root of null', function () {
    assert.equal(cbrt(null), 0);
  });

  it('should return the cubic root of a positive number', function() {
    assert.equal(cbrt(0), 0);
    assert.equal(cbrt(1), 1);
    assert.equal(cbrt(8), 2);
    assert.equal(cbrt(27), 3);
    assert.equal(cbrt(64), 4);
    assert.equal(cbrt(125), 5);

    toolsapprox(cbrt(10), 2.1544346900318834);
  });

  it('should return the cubic root of a negative number', function() {
    assert.strictEqual(cbrt(-8), -2);
    assert.strictEqual(cbrt(-64), -4);
  });

  it('should return the cubic root of infinity', function() {
    assert.strictEqual(cbrt(Infinity), Infinity);
    assert.strictEqual(cbrt(-Infinity), -Infinity);
  });

  it('should return all cubic roots of a number', function() {
    toolsapprox.deepEqual(cbrt(8, true), index.matrix([
      complex('2'),
      complex('-1 + 1.7321i'),
      complex('-1 - 1.7321i')
    ]));

    toolsapprox.deepEqual(cbrt(-8, true), index.matrix([
      complex('1 + 1.7321i'),
      complex('-2'),
      complex('1 - 1.7321i')
    ]));
  });

  it('should return the cubic root of a positive bignumber', function() {
    assert.deepEqual(cbrt(bignumber(0)), bignumber(0));
    assert.deepEqual(cbrt(bignumber(1)), bignumber(1));
    assert.deepEqual(cbrt(bignumber(8)), bignumber(2));
    assert.deepEqual(cbrt(bignumber(27)), bignumber(3));
    assert.deepEqual(cbrt(bignumber(64)), bignumber(4));
    assert.deepEqual(cbrt(bignumber(125)), bignumber(5));

    assert.deepEqual(cbrt(bignumber(10)), bignumber('2.154434690031883721759293566519350495259344942192108582489235506'));
  });

  it('should return the cubic root of a negative bignumber', function() {
    assert.deepEqual(cbrt(bignumber(-8)), bignumber(-2));
    assert.deepEqual(cbrt(bignumber(-64)), bignumber(-4));
  });

  it('should return the cubic root of a complex number', function() {
    toolsapprox.deepEqual(cbrt(complex('2 + 3i')), complex('1.451856618352664928164697 + 0.493403534104004716735578i'));
    toolsapprox.deepEqual(cbrt(complex('-2 + 3i')), complex('1.15322830402742 + 1.01064294709397i'));
    toolsapprox.deepEqual(cbrt(complex('8i')), complex('1.73205080756888 + i'));
  });

  it('should return all three roots of a complex number', function() {
    toolsapprox.deepEqual(cbrt(complex('2 + 3i'), true), index.matrix([
        complex('1.4519 + 0.4934i'),
        complex('-1.1532 + 1.0106i'),
        complex('-0.2986 - 1.5040i')
    ]));

    toolsapprox.deepEqual(cbrt(complex('8i'), true), index.matrix([
        complex(' 1.7321 + i'),
        complex('-1.7321 + i'),
        complex('-2i')
    ]));

    index.config({matrix: 'Array'});

    toolsapprox.deepEqual(cbrt(complex('8i'), true), [
      complex(' 1.7321 + i'),
      complex('-1.7321 + i'),
      complex('-2i')
    ]);

    index.config({matrix: 'Matrix'});
  });

  it('should return the cubic root of a unit', function() {
    assert.equal(cbrt(index.unit('27 m^3')).toString(), index.unit('3 m').toString());
    assert.equal(cbrt(index.unit('-27 m^3')).toString(), index.unit('-3 m').toString());

    assert(cbrt(index.unit(index.bignumber(27), 'm^3')).value.isBigNumber);
    assert.deepEqual(cbrt(index.unit(index.bignumber(27), 'm^3')).value, index.bignumber(3));
    assert(cbrt(index.unit(index.bignumber(-27), 'm^3')).value.isBigNumber);
    assert.deepEqual(cbrt(index.unit(index.bignumber(-27), 'm^3')).value, index.bignumber(-3));

    assert(cbrt(index.unit(index.complex(-46, 9), 's^3')).value.isComplex);
    toolsapprox.deepEqual(cbrt(index.unit(index.complex(-46, 9), 's^3')).value, index.complex(2, 3));
  });

  it('should throw an error when used with a string', function() {
    assert.throws(function () {
      cbrt('a string');
    });
  });

  it('should return the cubic root of each element of a matrix', function() {
    assert.deepEqual(cbrt([8,27,64,125]), [2,3,4,5]);
    assert.deepEqual(cbrt([[8,27],[64,125]]), [[2,3],[4,5]]);
    assert.deepEqual(cbrt(index.matrix([[8,27],[64,125]])), index.matrix([[2,3],[4,5]]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {cbrt()}, /TypeError: Too few arguments/);
    assert.throws(function () {cbrt(1, true, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX cbrt', function () {
    var expression = index.parse('cbrt(2)');
    assert.equal(expression.toTex(), '\\sqrt[3]{2}');
  });

});
