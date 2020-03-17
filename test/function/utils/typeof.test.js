'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var Index = math.type.Index;
var Range = math.type.Range;
var Matrix = math.type.Matrix;
var Help = math.type.Help;
var Unit = math.type.Unit;
var Complex = math.type.Complex;
var Fraction = math.type.Fraction;

describe('typeof', function () {

  it('should return number type for a number', function () {
    _assert2.default.equal(math.typeof(2), 'number');
    _assert2.default.equal(math.typeof(new Number(2)), 'number');
  });

  it('should return bignumber type for a bignumber', function () {
    _assert2.default.equal(math.typeof(math.bignumber(0.1)), 'BigNumber');
    _assert2.default.equal(math.typeof(new math.type.BigNumber('0.2')), 'BigNumber');
  });

  it('should return string type for a string', function () {
    _assert2.default.equal(math.typeof('hello there'), 'string');
    _assert2.default.equal(math.typeof(new String('hello there')), 'string');
  });

  it('should return complex type for a complex number', function () {
    _assert2.default.equal(math.typeof(new Complex(2, 3)), 'Complex');
    _assert2.default.equal(math.typeof(math.complex(2, 3)), 'Complex');
  });

  it('should return complex type for a fraction', function () {
    _assert2.default.equal(math.typeof(new Fraction(2, 3)), 'Fraction');
    _assert2.default.equal(math.typeof(math.fraction(2, 3)), 'Fraction');
  });

  it('should return array type for an array', function () {
    _assert2.default.equal(math.typeof([1, 2, 3]), 'Array');
    _assert2.default.equal(math.typeof(new Array()), 'Array');
  });

  it('should return array type for an array', function () {
    _assert2.default.equal(math.typeof([1, 2, 3]), 'Array');
    _assert2.default.equal(math.typeof(new Array()), 'Array');
  });

  it('should return matrix type for a matrix', function () {
    _assert2.default.equal(math.typeof(math.matrix()), 'Matrix');
    _assert2.default.equal(math.typeof(math.matrix()), 'Matrix');
  });

  it('should return unit type for a unit', function () {
    _assert2.default.equal(math.typeof(new Unit(5, 'cm')), 'Unit');
    _assert2.default.equal(math.typeof(math.unit('5cm')), 'Unit');
  });

  it('should return boolean type for a boolean', function () {
    _assert2.default.equal(math.typeof(true), 'boolean');
    _assert2.default.equal(math.typeof(false), 'boolean');
    _assert2.default.equal(math.typeof(new Boolean(true)), 'boolean');
  });

  it('should return null type for null', function () {
    _assert2.default.equal(math.typeof(null), 'null');
  });

  it('should return undefined type for undefined', function () {
    _assert2.default.equal(math.typeof(undefined), 'undefined');
  });

  it('should return date type for a Date', function () {
    _assert2.default.equal(math.typeof(new Date()), 'Date');
  });

  it('should return function type for a function', function () {
    _assert2.default.equal(math.typeof(function () {}), 'Function');
    _assert2.default.equal(math.typeof(new Function()), 'Function');
  });

  it('should return function type for a chain', function () {
    _assert2.default.equal(math.typeof(math.chain(3)), 'Chain');
  });

  it('should return function type for an index', function () {
    _assert2.default.equal(math.typeof(new Index([0, 10])), 'Index');
  });

  it('should return function type for a range', function () {
    _assert2.default.equal(math.typeof(new Range(0, 10)), 'Range');
  });

  it('should return function type for a help object', function () {
    _assert2.default.equal(math.typeof(new Help({}, {})), 'Help');
  });

  it('should return object type for an object', function () {
    _assert2.default.equal(math.typeof({}), 'Object');
    _assert2.default.equal(math.typeof(new Object()), 'Object');
  });

  it('should throw an error if called with a wrong number of arguments', function () {
    _assert2.default.throws(function () {
      math.typeof();
    });
    _assert2.default.throws(function () {
      math.typeof(1, 2);
    });
  });

  it('should LaTeX typeof', function () {
    var expression = math.parse('typeof(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{typeof}\\left(1\\right)');
  });
});
