import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
// test cbrt
var assert = {};
var approx = approxjs;
var error = indexjs;
var math = indexjs;
var cbrt = indexjs.cbrt;
var bignumber = indexjs.bignumber;
var complex = indexjs.complex;

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

    approxjs(cbrt(10), 2.1544346900318834);
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
    approxjs.deepEqual(cbrt(8, true), indexjs.matrix([
      complex('2'),
      complex('-1 + 1.7321i'),
      complex('-1 - 1.7321i')
    ]));

    approxjs.deepEqual(cbrt(-8, true), indexjs.matrix([
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
    approxjs.deepEqual(cbrt(complex('2 + 3i')), complex('1.451856618352664928164697 + 0.493403534104004716735578i'));
    approxjs.deepEqual(cbrt(complex('-2 + 3i')), complex('1.15322830402742 + 1.01064294709397i'));
    approxjs.deepEqual(cbrt(complex('8i')), complex('1.73205080756888 + i'));
  });

  it('should return all three roots of a complex number', function() {
    approxjs.deepEqual(cbrt(complex('2 + 3i'), true), indexjs.matrix([
        complex('1.4519 + 0.4934i'),
        complex('-1.1532 + 1.0106i'),
        complex('-0.2986 - 1.5040i')
    ]));

    approxjs.deepEqual(cbrt(complex('8i'), true), indexjs.matrix([
        complex(' 1.7321 + i'),
        complex('-1.7321 + i'),
        complex('-2i')
    ]));

    indexjs.config({matrix: 'Array'});

    approxjs.deepEqual(cbrt(complex('8i'), true), [
      complex(' 1.7321 + i'),
      complex('-1.7321 + i'),
      complex('-2i')
    ]);

    indexjs.config({matrix: 'Matrix'});
  });

  it('should return the cubic root of a unit', function() {
    assert.equal(cbrt(indexjs.unit('27 m^3')).toString(), indexjs.unit('3 m').toString());
    assert.equal(cbrt(indexjs.unit('-27 m^3')).toString(), indexjs.unit('-3 m').toString());

    assert(cbrt(indexjs.unit(indexjs.bignumber(27), 'm^3')).value.isBigNumber);
    assert.deepEqual(cbrt(indexjs.unit(indexjs.bignumber(27), 'm^3')).value, indexjs.bignumber(3));
    assert(cbrt(indexjs.unit(indexjs.bignumber(-27), 'm^3')).value.isBigNumber);
    assert.deepEqual(cbrt(indexjs.unit(indexjs.bignumber(-27), 'm^3')).value, indexjs.bignumber(-3));

    assert(cbrt(indexjs.unit(indexjs.complex(-46, 9), 's^3')).value.isComplex);
    approxjs.deepEqual(cbrt(indexjs.unit(indexjs.complex(-46, 9), 's^3')).value, indexjs.complex(2, 3));
  });

  it('should throw an error when used with a string', function() {
    assert.throws(function () {
      cbrt('a string');
    });
  });

  it('should return the cubic root of each element of a matrix', function() {
    assert.deepEqual(cbrt([8,27,64,125]), [2,3,4,5]);
    assert.deepEqual(cbrt([[8,27],[64,125]]), [[2,3],[4,5]]);
    assert.deepEqual(cbrt(indexjs.matrix([[8,27],[64,125]])), indexjs.matrix([[2,3],[4,5]]));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {cbrt()}, /TypeError: Too few arguments/);
    assert.throws(function () {cbrt(1, true, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX cbrt', function () {
    var expression = indexjs.parse('cbrt(2)');
    assert.equal(expression.toTex(), '\\sqrt[3]{2}');
  });

});
