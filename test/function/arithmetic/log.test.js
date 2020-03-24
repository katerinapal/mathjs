import assert from "assert";
import { deepEqual as toolsapprox_deepEqualjs } from "../../../tools/approx";
import { indexjs as index_indexjsjs } from "../../../index";
var error = {};
var mathPredictable = index_indexjsjs.create({predictable: true});
var complex = index_indexjsjs.complex;
var matrix = index_indexjsjs.matrix;
var unit = index_indexjsjs.unit;
var range = index_indexjsjs.range;
var log = index_indexjsjs.log;

describe('log', function() {
  it('should return the log of a boolean value', function () {
    assert.equal(log(true), 0);
    assert.equal(log(false), -Infinity);
    assert.equal(log(1,false), 0);
  });

  it('should return the log of null', function () {
    assert.equal(log(null), -Infinity);
    assert.equal(log(1, null), 0);
  });

  it('should return the log of positive numbers', function() {
    toolsapprox_deepEqualjs(log(1), 0);
    toolsapprox_deepEqualjs(log(2), 0.693147180559945);
    toolsapprox_deepEqualjs(log(3), 1.098612288668110);
    toolsapprox_deepEqualjs(index_indexjsjs.exp(log(100)), 100);
  });

  it('should return the log of negative numbers', function() {
    toolsapprox_deepEqualjs(log(-1), complex('0.000000000000000 + 3.141592653589793i'));
    toolsapprox_deepEqualjs(log(-2), complex('0.693147180559945 + 3.141592653589793i'));
    toolsapprox_deepEqualjs(log(-3), complex('1.098612288668110 + 3.141592653589793i'));
  });

  it('should return the log of negative numbers with predictable: true', function() {
    assert.equal(typeof mathPredictable.log(-1), 'number');
    assert(isNaN(mathPredictable.log(-1)));
  });

  it('should return the log of zero', function() {
    toolsapprox_deepEqualjs(log(0), -Infinity);
  });

  it('should return the log base N of a number', function() {
    toolsapprox_deepEqualjs(log(100, 10), 2);
    toolsapprox_deepEqualjs(log(1000, 10), 3);
    toolsapprox_deepEqualjs(log(8, 2), 3);
    toolsapprox_deepEqualjs(log(16, 2), 4);
  });

  it('should throw an error if invalid number of arguments', function() {
    assert.throws(function () {log()}, /TypeError: Too few arguments in function log \(expected: any, index: 1\)/);
    assert.throws(function () {log(1, 2, 3)}, /TypeError: Too many arguments in function log \(expected: 2, actual: 3\)/);
  });

  it('should return the log of positive bignumbers', function() {
    var bigmath = index_indexjsjs.create({precision: 100});

    assert.deepEqual(bigmath.log(bigmath.bignumber(1)), bigmath.bignumber('0'));
    assert.deepEqual(bigmath.log(bigmath.bignumber(2)), bigmath.bignumber('0.6931471805599453094172321214581765680755001343602552541206800094933936219696947156058633269964186875'));
    assert.deepEqual(bigmath.log(bigmath.bignumber(3)), bigmath.bignumber('1.098612288668109691395245236922525704647490557822749451734694333637494293218608966873615754813732089'));

    // note: the following gives a round-off error with regular numbers
    assert.deepEqual(bigmath.log(bigmath.bignumber(1000), bigmath.bignumber(10)), bigmath.bignumber(3));
  });

  it('should return the log of negative bignumbers', function() {
    var bigmath = index_indexjsjs.create({precision: 100});

    toolsapprox_deepEqualjs(bigmath.log(bigmath.bignumber(-1)), complex('0.000000000000000 + 3.141592653589793i'));
    toolsapprox_deepEqualjs(bigmath.log(bigmath.bignumber(-2)), complex('0.693147180559945 + 3.141592653589793i'));
    toolsapprox_deepEqualjs(bigmath.log(bigmath.bignumber(-3)), complex('1.098612288668110 + 3.141592653589793i'));
  });

  it('should return the log of negative bignumbers with predictable:true', function() {
    assert.ok(mathPredictable.log(index_indexjsjs.bignumber(-1)).isNaN());
  });

  it('should return the log of a bignumber with value zero', function() {
    var bigmath = index_indexjsjs.create({precision: 100});

    assert.deepEqual(bigmath.log(bigmath.bignumber(0)).toString(), '-Infinity');
  });

  it('should return the log of a complex number', function() {
    toolsapprox_deepEqualjs(log(index_indexjsjs.i),          complex('1.570796326794897i'));
    toolsapprox_deepEqualjs(log(complex(0, -1)),  complex('-1.570796326794897i'));
    toolsapprox_deepEqualjs(log(complex(1, 1)),   complex('0.346573590279973 + 0.785398163397448i'));
    toolsapprox_deepEqualjs(log(complex(1, -1)),  complex('0.346573590279973 - 0.785398163397448i'));
    toolsapprox_deepEqualjs(log(complex(-1, -1)), complex('0.346573590279973 - 2.356194490192345i'));
    toolsapprox_deepEqualjs(log(complex(-1, 1)),  complex('0.346573590279973 + 2.356194490192345i'));
    toolsapprox_deepEqualjs(log(complex(1, 0)),   complex(0, 0));
  });

  it('should throw an error when used on a unit', function() {
    assert.throws(function () {log(unit('5cm'))});
  });

  it('should throw an error when used on a string', function() {
    assert.throws(function () {log('text')});
  });

  it('should return the log of each element of a matrix', function() {
    var res = [0, 0.693147180559945, 1.098612288668110, 1.386294361119891];
    toolsapprox_deepEqualjs(log([1,2,3,4]), res);
    toolsapprox_deepEqualjs(log(matrix([1,2,3,4])), matrix(res));
    toolsapprox_deepEqualjs(log(matrix([[1,2],[3,4]])),
        matrix([[0, 0.693147180559945], [1.098612288668110, 1.386294361119891]]));
  });

  it('should LaTeX log', function () {
    var expr1 = index_indexjsjs.parse('log(e)');
    var expr2 = index_indexjsjs.parse('log(32,2)');

    assert.equal(expr1.toTex(), '\\ln\\left( e\\right)');
    assert.equal(expr2.toTex(), '\\log_{2}\\left(32\\right)');
  });

});
