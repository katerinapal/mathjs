'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var unit = math.unit;
var bignumber = math.bignumber;
var fraction = math.fraction;
var matrix = math.matrix;
var range = math.range;
var cube = math.cube;

describe('cube', function () {
  it('should return the cube of a boolean', function () {
    _assert2.default.equal(cube(true), 1);
    _assert2.default.equal(cube(false), 0);
  });

  it('should return the cube of null', function () {
    _assert2.default.equal(math.ceil(null), 0);
  });

  it('should return the cube of a number', function () {
    _assert2.default.equal(cube(4), 64);
    _assert2.default.equal(cube(-2), -8);
    _assert2.default.equal(cube(0), 0);
  });

  it('should return the cube of a big number', function () {
    _assert2.default.deepEqual(cube(bignumber(4)), bignumber(64));
    _assert2.default.deepEqual(cube(bignumber(-2)), bignumber(-8));
    _assert2.default.deepEqual(cube(bignumber(0)), bignumber(0));
  });

  it('should return the cube of a fraction', function () {
    var a = fraction(0.5);
    (0, _assert2.default)(cube(a) instanceof math.type.Fraction);
    _assert2.default.equal(cube(a).toString(), '0.125');
    _assert2.default.equal(a.toString(), '0.5');
  });

  it('should return the cube of a complex number', function () {
    _assert2.default.deepEqual(cube(math.complex('2i')), math.complex('-8i'));
    _assert2.default.deepEqual(cube(math.complex('2+3i')), math.complex('-46+9i'));
    _assert2.default.deepEqual(cube(math.complex('2')), math.complex('8'));
  });

  it('should return the cube of a unit', function () {
    _assert2.default.equal(cube(math.unit('4 cm')).toString(), '64 cm^3');
    _assert2.default.equal(cube(math.unit('-2 cm')).toString(), '-8 cm^3');
    _assert2.default.equal(cube(math.unit('0 cm')).toString(), '0 cm^3');
  });

  it('should throw an error with strings', function () {
    _assert2.default.throws(function () {
      cube('text');
    });
  });

  it('should throw an error if there\'s wrong number of args', function () {
    _assert2.default.throws(function () {
      cube();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      cube(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should cube each element in a matrix, array or range', function () {
    // array, matrix, range
    // arrays are evaluated element wise
    _assert2.default.deepEqual(cube([2, 3, 4, 5]), [8, 27, 64, 125]);
    _assert2.default.deepEqual(cube(matrix([2, 3, 4, 5])), matrix([8, 27, 64, 125]));
    _assert2.default.deepEqual(cube(matrix([[1, 2], [3, 4]])), matrix([[1, 8], [27, 64]]));
  });

  it('should LaTeX cube', function () {
    var expression = math.parse('cube(2)');
    _assert2.default.equal(expression.toTex(), '\\left(2\\right)^3');
  });
});
