"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {},
    factorial = _index.indexjs.factorial;

describe('factorial', function () {

  it('should calculate the factorial of a number', function () {
    _assert2.default.equal(factorial(0), 1);
    _assert2.default.equal(factorial(1), 1);
    _assert2.default.equal(factorial(2), 2);
    _assert2.default.equal(factorial(3), 6);
    _assert2.default.equal(factorial(4), 24);
    _assert2.default.equal(factorial(5), 120);
    _assert2.default.ok(!isFinite(factorial(Number.MAX_VALUE))); // shouldn't stall
    _assert2.default.ok(!isFinite(factorial(Infinity)));
  });

  it('should calculate the factorial of a bignumber', function () {
    var bigmath = _index.indexjs.create({ number: 'BigNumber', precision: 5 });
    var bigfactorial = bigmath.factorial;
    var bignumber = bigmath.bignumber;

    _assert2.default.deepEqual(bigfactorial(bignumber(0)), bignumber(1));
    _assert2.default.deepEqual(bigfactorial(bignumber(Infinity)).toString(), 'Infinity');

    _assert2.default.deepEqual(bigfactorial(bignumber(11)), bignumber(39917000));
    _assert2.default.deepEqual(bigfactorial(bignumber(22)), bignumber(1.124e+21));

    bigmath.config({ precision: 20 });
    _assert2.default.deepEqual(bigfactorial(bignumber(5)), bignumber(120));
    _assert2.default.deepEqual(bigfactorial(bignumber(19)), bignumber(121645100408832000));
    _assert2.default.deepEqual(bigfactorial(bignumber(20)), bignumber(2432902008176640000));
    _assert2.default.deepEqual(bigfactorial(bignumber(21)), bignumber('51090942171709440000'));
    _assert2.default.deepEqual(bigfactorial(bignumber(25)), bignumber('1.5511210043330985984e+25'));
    _assert2.default.deepEqual(bigfactorial(bignumber(24)), bignumber('6.2044840173323943936e+23'));
    _assert2.default.deepEqual(bigfactorial(bignumber(22)), bignumber('1124000727777607680000'));

    bigmath.config({ precision: 5 });
    _assert2.default.deepEqual(bigfactorial(bignumber(11)), bignumber(39917000));
    _assert2.default.deepEqual(bigfactorial(bignumber(22)), bignumber(1.124e+21));
    _assert2.default.deepEqual(bigfactorial(bignumber(24)), bignumber(6.2045e+23));
    _assert2.default.deepEqual(bigfactorial(bignumber(21)), bignumber(5.1091e+19));
    _assert2.default.deepEqual(bigfactorial(bignumber(26)), bignumber(4.0329e+26));

    bigmath.config({ precision: 20 });
    _assert2.default.deepEqual(bigfactorial(bignumber(3000)), bignumber('4.1493596034378540856e+9130'));
  });

  it('should calculate the factorial of a boolean', function () {
    _assert2.default.equal(factorial(true), 1);
    _assert2.default.equal(factorial(false), 1);
  });

  it('should calculate the factorial of null', function () {
    _assert2.default.equal(factorial(null), 1);
  });

  it('should calculate the factorial of each element in a matrix', function () {
    _assert2.default.deepEqual(factorial(_index.indexjs.matrix([0, 1, 2, 3, 4, 5])), _index.indexjs.matrix([1, 1, 2, 6, 24, 120]));
  });

  it('should calculate the factorial of each element in an array', function () {
    _assert2.default.deepEqual(factorial([0, 1, 2, 3, 4, 5]), [1, 1, 2, 6, 24, 120]);
  });

  it('should calculate the factorial of a non-integer', function () {
    (0, _approx.equal)(factorial(1.5), 1.32934038817913702047362561);
    (0, _approx.equal)(factorial(7.5), 14034.40729348);
  });

  it('should throw error if called with negative number', function () {
    _assert2.default.throws(function () {
      factorial(-1);
    }, /Value must be non-negative/);
    _assert2.default.throws(function () {
      factorial(-1.5);
    }, /Value must be non-negative/);

    _assert2.default.throws(function () {
      factorial(_index.indexjs.bignumber(-1));
    }, /Value must be non-negative/);
    _assert2.default.throws(function () {
      factorial(_index.indexjs.bignumber(-1.5));
    }, /Value must be non-negative/);
    _assert2.default.throws(function () {
      factorial(_index.indexjs.bignumber(-Infinity));
    }, /Value must be non-negative/);
  });

  it('should throw an error if called with non-integer bignumber', function () {
    _assert2.default.throws(function () {
      factorial(_index.indexjs.bignumber(1.5));
    });
  });

  it('should throw en error if called with invalid number of arguments', function () {
    _assert2.default.throws(function () {
      factorial();
    });
    _assert2.default.throws(function () {
      factorial(1, 3);
    });
  });

  it('should throw en error if called with invalid type of argument', function () {
    _assert2.default.throws(function () {
      factorial(new Date());
    });
    _assert2.default.throws(function () {
      factorial('a string');
    });
  });

  it('should LaTeX factorial', function () {
    var expression = _index.indexjs.parse('factorial(6)');
    _assert2.default.equal(expression.toTex(), '\\left(6\\right)!');
  });
});
