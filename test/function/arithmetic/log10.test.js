import assert from "assert";
import { deepEqual as toolsapprox_deepEqualjs } from "../../../tools/approx";
import { indexjs as index_indexjsjs } from "../../../index";
var mathPredictable = index_indexjsjs.create({predictable: true});
var complex = index_indexjsjs.complex;
var matrix = index_indexjsjs.matrix;
var unit = index_indexjsjs.unit;
var range = index_indexjsjs.range;
var log10 = index_indexjsjs.log10;

describe('log10', function() {
  it('should return the log base 10 of a boolean', function () {
    assert.equal(log10(true), 0);
    assert.equal(log10(false), -Infinity);
  });

  it('should return the log base 10 of null', function () {
    assert.equal(log10(null), -Infinity);
  });

  it('should return the log base 10 of positive numbers', function() {
    toolsapprox_deepEqualjs(log10(1), 0);
    toolsapprox_deepEqualjs(log10(2), 0.301029995663981);
    toolsapprox_deepEqualjs(log10(3), 0.477121254719662);

    toolsapprox_deepEqualjs(log10(0.01), -2);
    toolsapprox_deepEqualjs(log10(0.1), -1);
    toolsapprox_deepEqualjs(log10(1), 0);
    toolsapprox_deepEqualjs(log10(10), 1);
    toolsapprox_deepEqualjs(log10(100), 2);
    toolsapprox_deepEqualjs(log10(1000), 3);
  });

  it('should return the log base 10 of negative numbers', function() {
    toolsapprox_deepEqualjs(log10(-1), complex('0.000000000000000 + 1.364376353841841i'));
    toolsapprox_deepEqualjs(log10(-2), complex('0.301029995663981 + 1.364376353841841i'));
    toolsapprox_deepEqualjs(log10(-3), complex('0.477121254719662 + 1.364376353841841i'));
  });

  it('should return the log base 10 of negative numbers with predicable:true', function() {
    assert.equal(typeof mathPredictable.log10(-1), 'number');
    assert(isNaN(mathPredictable.log10(-1)));
  });

  it('should return the log base 10 of zero', function() {
    toolsapprox_deepEqualjs(log10(0), -Infinity);
  });

  it('should return the log of positive bignumbers', function() {
    var bigmath = index_indexjsjs.create({precision: 100});

    assert.deepEqual(bigmath.log10(bigmath.bignumber(1)), bigmath.bignumber(0));
    assert.deepEqual(bigmath.log10(bigmath.bignumber(10)), bigmath.bignumber(1));
    assert.deepEqual(bigmath.log10(bigmath.bignumber(100)), bigmath.bignumber(2));
    assert.deepEqual(bigmath.log10(bigmath.bignumber(1000)), bigmath.bignumber(3)); // note: this gives a round-off error with regular numbers
    assert.deepEqual(bigmath.log10(bigmath.bignumber(10000)), bigmath.bignumber(4));
    assert.deepEqual(bigmath.log10(bigmath.bignumber('1e500')), bigmath.bignumber(500));
  });

  it('should return the log of negative bignumbers', function() {
    var bigmath = index_indexjsjs.create({precision: 100});

    toolsapprox_deepEqualjs(bigmath.log10(bigmath.bignumber(-1)), bigmath.complex('0.000000000000000 + 1.364376353841841i'));
    toolsapprox_deepEqualjs(bigmath.log10(bigmath.bignumber(-2)), bigmath.complex('0.301029995663981 + 1.364376353841841i'));
    toolsapprox_deepEqualjs(bigmath.log10(bigmath.bignumber(-3)), bigmath.complex('0.477121254719662 + 1.364376353841841i'));
  });

  it('should return the log of a bignumber with value zero', function() {
    var bigmath = index_indexjsjs.create({precision: 100});

    assert.deepEqual(bigmath.log10(bigmath.bignumber(0)).toString(), '-Infinity');
  });

  it('should throw an error if used with a wrong number of arguments', function() {
    assert.throws(function () {log10()}, /TypeError: Too few arguments/);
    assert.throws(function () {log10(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should return the log base 10 of a complex number', function() {
    toolsapprox_deepEqualjs(log10(complex(0, 1)),   complex('0.000000000000000 + 0.682188176920921i'));
    toolsapprox_deepEqualjs(log10(complex(0, -1)),  complex('0.000000000000000 - 0.682188176920921i'));
    toolsapprox_deepEqualjs(log10(complex(1, 1)),   complex('0.150514997831991 + 0.341094088460460i'));
    toolsapprox_deepEqualjs(log10(complex(1, -1)),  complex('0.150514997831991 - 0.341094088460460i'));
    toolsapprox_deepEqualjs(log10(complex(-1, -1)), complex('0.150514997831991 - 1.023282265381381i'));
    toolsapprox_deepEqualjs(log10(complex(-1, 1)),  complex('0.150514997831991 + 1.023282265381381i'));
    toolsapprox_deepEqualjs(log10(complex(1, 0)),   complex(0, 0));
  });

  it('should throw an error when used on a unit', function() {
    assert.throws(function () {log10(unit('5cm'))});
  });

  it('should throw an error when used on a string', function() {
    assert.throws(function () {log10('text')});
  });

  it('should return the log base 10 of each element of a matrix', function() {
    var res = [0, 0.301029995663981, 0.477121254719662, 0.602059991327962];
    toolsapprox_deepEqualjs(log10([1,2,3,4]), res);
    toolsapprox_deepEqualjs(log10(matrix([1,2,3,4])), matrix(res));
    toolsapprox_deepEqualjs(index_indexjsjs.divide(log10(matrix([1,2,3,4])), index_indexjsjs.LOG10E),
        matrix([0, 0.693147180559945, 1.098612288668110, 1.386294361119891]));
    toolsapprox_deepEqualjs(log10(matrix([[1,2],[3,4]])),
        matrix([[0, 0.301029995663981], [0.477121254719662, 0.602059991327962]]));
  });

  it('should LaTeX log10', function () {
    var expression = index_indexjsjs.parse('log10(10)');
    assert.equal(expression.toTex(), '\\log_{10}\\left(10\\right)');
  });

});
