import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
// test exp
var assert = {},
    approx = approxjs,
    math = indexjs,
    complex = indexjs.complex,
    matrix = indexjs.matrix,
    sparse = indexjs.sparse,
    unit = indexjs.unit,
    exp = indexjs.exp;

describe('exp', function() {

  it('should exponentiate a boolean', function () {
    approxjs(exp(true), 2.71828182845905);
    approxjs(exp(false), 1);
  });

  it('should exponentiate null', function () {
    assert.equal(exp(null), 1);
  });

  it('should exponentiate a number', function() {
    approxjs(exp(-3), 0.0497870683678639);
    approxjs(exp(-2), 0.1353352832366127);
    approxjs(exp(-1), 0.3678794411714423);
    approxjs(exp(0), 1);
    approxjs(exp(1), 2.71828182845905);
    approxjs(exp(2), 7.38905609893065);
    approxjs(exp(3), 20.0855369231877);
    approxjs(exp(indexjs.log(100)), 100);
  });

  it('should exponentiate a bignumber', function() {
    var bigmath = indexjs.create({precision: 100});

    assert.deepEqual(bigmath.exp(bigmath.bignumber(1)), bigmath.bignumber('2.718281828459045235360287471352662497757247093699959574966967627724076630353547594571382178525166427'));
  });

  it('should throw an error if there\'s wrong number of arguments', function() {
    assert.throws(function () {exp();}, /TypeError: Too few arguments/);
    assert.throws(function () {exp(1, 2);}, /TypeError: Too many arguments/);
  });

  it('should exponentiate a complex number correctly', function() {
    approxjs.deepEqual(exp(indexjs.i),          complex('0.540302305868140 + 0.841470984807897i'));
    approxjs.deepEqual(exp(complex(0, -1)),  complex('0.540302305868140 - 0.841470984807897i'));
    approxjs.deepEqual(exp(complex(1, 1)),   complex('1.46869393991589 + 2.28735528717884i'));
    approxjs.deepEqual(exp(complex(1, -1)),  complex('1.46869393991589 - 2.28735528717884i'));
    approxjs.deepEqual(exp(complex(-1, -1)), complex('0.198766110346413 - 0.309559875653112i'));
    approxjs.deepEqual(exp(complex(-1, 1)),  complex('0.198766110346413 + 0.309559875653112i'));
    approxjs.deepEqual(exp(complex(1, 0)),   complex('2.71828182845905'));

    // test some logic identities
    var multiply = indexjs.multiply,
        pi = indexjs.pi,
        i = indexjs.i;
    approxjs.deepEqual(exp(multiply( 0.5, multiply(pi, i))), complex(0, 1));
    approxjs.deepEqual(exp(multiply( 1,   multiply(pi, i))), complex(-1, 0));
    approxjs.deepEqual(exp(multiply( 1.5, multiply(pi, i))), complex(0, -1));
    approxjs.deepEqual(exp(multiply( 2,   multiply(pi, i))), complex(1, 0));
    approxjs.deepEqual(exp(multiply(-0.5, multiply(pi, i))), complex(0, -1));
    approxjs.deepEqual(exp(multiply(-1,   multiply(pi, i))), complex(-1, 0));
    approxjs.deepEqual(exp(multiply(-1.5, multiply(pi, i))), complex(0, 1));
  });

  it('should throw an error on a unit', function() {
    assert.throws(function () {exp(unit('5cm'));});
  });

  it('should throw an error with a string', function() {
    assert.throws(function () {exp('text');});
  });

  it('should exponentiate matrices, arrays and ranges correctly', function() {
    // array
    approxjs.deepEqual(exp([0, 1, 2, 3]), [1, 2.71828182845905, 7.38905609893065, 20.0855369231877]);
    approxjs.deepEqual(exp([[0, 1], [2, 3]]), [[1, 2.71828182845905], [7.38905609893065, 20.0855369231877]]);
    // dense matrix
    approxjs.deepEqual(exp(matrix([0, 1, 2, 3])), matrix([1, 2.71828182845905, 7.38905609893065, 20.0855369231877]));
    approxjs.deepEqual(exp(matrix([[0, 1], [2, 3]])), matrix([[1, 2.71828182845905], [7.38905609893065, 20.0855369231877]]));
    // sparse matrix, TODO: it should return a dense matrix
    approxjs.deepEqual(exp(sparse([[0, 1], [2, 3]])), sparse([[1, 2.71828182845905], [7.38905609893065, 20.0855369231877]]));
  });

  it('should LaTeX exp', function () {
    var expression = indexjs.parse('exp(0)');
    assert.equal(expression.toTex(), '\\exp\\left(0\\right)');
  });
});
