'use strict';

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var mathPredictable = math.create({ predictable: true });
var sqrt = math.sqrt;
var bignumber = math.bignumber;

describe('sqrt', function () {
  it('should return the square root of a boolean', function () {
    _assert2.default.equal(sqrt(true), 1);
    _assert2.default.equal(sqrt(false), 0);
  });

  it('should return the square root of null', function () {
    _assert2.default.equal(sqrt(null), 0);
  });

  it('should return the square root of a positive number', function () {
    _assert2.default.equal(sqrt(0), 0);
    _assert2.default.equal(sqrt(1), 1);
    _assert2.default.equal(sqrt(4), 2);
    _assert2.default.equal(sqrt(9), 3);
    _assert2.default.equal(sqrt(16), 4);
    _assert2.default.equal(sqrt(25), 5);
  });

  it('should return the square root of a negative number', function () {
    _assert2.default.deepEqual(sqrt(-4), math.complex(0, 2));
    _assert2.default.deepEqual(sqrt(-16), math.complex(0, 4));
  });

  it('should return the square root of a negative number when predictable:true', function () {
    _assert2.default.strictEqual(mathPredictable.sqrt(4), 2);
    (0, _assert2.default)(_typeof(mathPredictable.sqrt(-4)), 'number');
    (0, _assert2.default)(isNaN(mathPredictable.sqrt(-4)));
  });

  it('should return the square root of a positive bignumber', function () {
    _assert2.default.deepEqual(sqrt(bignumber(0)), bignumber(0));
    _assert2.default.deepEqual(sqrt(bignumber(1)), bignumber(1));
    _assert2.default.deepEqual(sqrt(bignumber(4)), bignumber(2));
    _assert2.default.deepEqual(sqrt(bignumber(9)), bignumber(3));
    _assert2.default.deepEqual(sqrt(bignumber(16)), bignumber(4));
    _assert2.default.deepEqual(sqrt(bignumber(25)), bignumber(5));

    // validate whether we are really working at high precision
    var bigmath = math.create({ precision: 100 });
    _assert2.default.deepEqual(bigmath.sqrt(bigmath.bignumber(2)), bigmath.bignumber('1.414213562373095048801688724209698078569671875376948073176679737990732478462107038850387534327641573'));
  });

  it('should return the square root of a negative bignumber', function () {
    _assert2.default.deepEqual(sqrt(bignumber(-4)), math.complex(0, 2));
  });

  it('should return the square root of a negative bignumber when predictable:true', function () {
    _assert2.default.deepEqual(mathPredictable.sqrt(bignumber(4)), bignumber(2));
    _assert2.default.ok(mathPredictable.sqrt(bignumber(-4)).isNaN());
  });

  it('should return the square root of a complex number', function () {
    _assert2.default.deepEqual(sqrt(math.complex(3, -4)), math.complex(2, -1));
    _assert2.default.deepEqual(sqrt(math.complex(1e10, 1e-10)), math.complex(1e5, 5e-16));
  });

  it('should return the square root of a unit', function () {
    _assert2.default.equal(sqrt(math.unit('25 m^2/s^2')).toString(), '5 m / s');
    _assert2.default.equal(sqrt(math.unit('4 kg')).toString(), '2 kg^0.5');
  });

  it('should return a Unit with a Complex value when computing the square root of a negative unit', function () {
    // Update this when support for complex units is added
    //assert.equal(sqrt(math.unit('-25 m^2/s^2')).toString(), 'NaN m / s');
    _assert2.default.equal(math.format(sqrt(math.unit('-25 m^2/s^2')), 14), '(5i) m / s');
  });

  it('should throw an error when used with a string', function () {
    _assert2.default.throws(function () {
      sqrt('a string');
    });
  });

  it('should return the square root of each element of a matrix', function () {
    _assert2.default.deepEqual(sqrt([4, 9, 16, 25]), [2, 3, 4, 5]);
    _assert2.default.deepEqual(sqrt([[4, 9], [16, 25]]), [[2, 3], [4, 5]]);
    _assert2.default.deepEqual(sqrt(math.matrix([[4, 9], [16, 25]])), math.matrix([[2, 3], [4, 5]]));
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      sqrt();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      sqrt(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX sqrt', function () {
    var expression = math.parse('sqrt(2)');
    _assert2.default.equal(expression.toTex(), '\\sqrt{2}');
  });
});
