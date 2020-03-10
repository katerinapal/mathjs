import assert from "assert";
import { index } from "../../../index";
import { toolsapprox } from "../../../tools/approx";
var math = index;
var approx = toolsapprox;
var pi = index.pi;
var acos = index.acos;
var cos = index.cos;
var complex = index.complex;
var matrix = index.matrix;
var unit = index.unit;
var bigmath = index.create({number: 'BigNumber', precision: 20});
var mathPredictable = index.create({predictable: true});
var acosBig = bigmath.acos;
var cosBig = bigmath.cos;
var Big = bigmath.bignumber;

describe('acos', function() {
  it('should return the arccos of a boolean', function () {
    toolsapprox(acos(true), 0);
    toolsapprox(acos(false), 0.5 * pi);
  });

  it('should return the arccos of null', function () {
    toolsapprox(acos(null), 0.5 * pi);
  });

  it('should return the arccos of a number', function() {
    toolsapprox(acos(-1) / pi, 1);
    toolsapprox(acos(-0.5) / pi, 2 / 3);
    toolsapprox(acos(0) / pi, 0.5);
    toolsapprox(acos(0.5) / pi, 1 / 3);
    toolsapprox(acos(1) / pi, 0);

    toolsapprox.deepEqual(acos(-2), complex('3.14159265358979 - 1.31695789692482i'));
    toolsapprox.deepEqual(acos(2), complex('1.316957896924817i'));
  });

  it('should return the arccos of a number when predictable:true', function() {
    assert.equal(typeof mathPredictable.acos(-2), 'number');
    assert(isNaN(mathPredictable.acos(-2)));
  });

  it('should return the arccos of a bignumber', function() {
    var arg = Big(-1);
    assert.deepEqual(acosBig(arg).toString(), bigmath.pi.toString());
    assert.deepEqual(acosBig(Big(-0.5)), Big('2.0943951023931954923'));
    assert.deepEqual(acosBig(Big(0)), Big('1.5707963267948966192'));
    assert.deepEqual(acosBig(Big(0.5)), Big('1.0471975511965977462'));
    assert.deepEqual(acosBig(Big(1)), Big(0));

    // Hit Newton's method case
    bigmath.config({precision: 61});
    assert.deepEqual(acosBig(Big(0.00000001)), Big('1.570796316794896619231321524973084775431910533020886243820359'));
    // Wolfram:                                     1.5707963167948966192313215249730847754319105330208862438203592009158129650174844596314777278941600852176250962802
    //Make sure arg was not changed
    assert.deepEqual(arg, Big(-1));
  });

  it('should be the inverse function of cos', function() {
    toolsapprox(acos(cos(-1)), 1);
    toolsapprox(acos(cos(0)), 0);
    toolsapprox(acos(cos(0.1)), 0.1);
    toolsapprox(acos(cos(0.5)), 0.5);
    toolsapprox(acos(cos(2)), 2);
  });

  it('should be the inverse function of bignumber cos', function() {
    bigmath.config({precision: 20});
    assert.deepEqual(acosBig(cosBig(Big(-1))), Big(1));
    assert.deepEqual(acosBig(cosBig(Big(0))), Big('0'));
    assert.deepEqual(acosBig(cosBig(Big(0.1))), Big('0.099999999999999999956'));
    assert.deepEqual(acosBig(cosBig(Big(0.5))), Big('0.49999999999999999999'));
    assert.deepEqual(acosBig(cosBig(Big(2))), Big(2));
  });

  it('should return for bignumber cos for x > 1', function() {
    assert.ok(acos(Big(1.1)).isNaN());
    assert.ok(acos(Big(-1.1)).isNaN());
  });

  it('should return the arccos of a complex number', function() {
    toolsapprox.deepEqual(acos(complex('2+3i')), complex(1.00014354247380, -1.98338702991654));
    toolsapprox.deepEqual(acos(complex('2-3i')), complex(1.00014354247380, 1.98338702991654));
    toolsapprox.deepEqual(acos(complex('-2+3i')), complex(2.14144911111600, -1.98338702991654));
    toolsapprox.deepEqual(acos(complex('-2-3i')), complex(2.14144911111600, 1.98338702991654));
    toolsapprox.deepEqual(acos(complex('i')), complex(1.570796326794897, -0.881373587019543));
    toolsapprox.deepEqual(acos(complex('1')), complex(0, 0));
    toolsapprox.deepEqual(acos(complex('1+i')), complex(0.904556894302381, -1.061275061905036));
  });

  it('should throw an error if called with a unit', function() {
    assert.throws(function () {acos(unit('45deg'))});
    assert.throws(function () {acos(unit('5 celsius'))});
  });

  it('should throw an error if called with a string', function() {
    assert.throws(function () {acos('string')});
  });

  it('should calculate the arccos element-wise for arrays and matrices', function() {
    // note: the results of acos(2) and acos(3) differs in octave
    // the next tests are verified with mathematica
    var acos123 = [0, complex(0, 1.316957896924817), complex(0, 1.762747174039086)];
    toolsapprox.deepEqual(acos([1,2,3]), acos123);
    toolsapprox.deepEqual(acos(matrix([1,2,3])), matrix(acos123));
  });

  it('should throw an error in case of invalid number of arguments', function() {
    assert.throws(function () {acos()}, /TypeError: Too few arguments/);
    assert.throws(function () {acos(1, 2)}, /TypeError: Too many arguments/);
  });

  it('should LaTeX acos', function () {
    var expression = index.parse('acos(1)');
    assert.equal(expression.toTex(), '\\cos^{-1}\\left(1\\right)');
  });

});
