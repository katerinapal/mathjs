'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conj = math.conj;

describe('conj', function () {
  it('should compute the conjugate of a boolean', function () {
    _assert2.default.strictEqual(conj(true), 1);
    _assert2.default.strictEqual(conj(false), 0);
  });

  it('should compute the conjugate of null', function () {
    _assert2.default.strictEqual(conj(null), 0);
  });

  it('should compute the conjugate of a number', function () {
    _assert2.default.equal(conj(1), 1);
    _assert2.default.equal(conj(2), 2);
    _assert2.default.equal(conj(0), 0);
    _assert2.default.equal(conj(-2), -2);
  });
  it('should compute the conjugate of a bignumber', function () {
    _assert2.default.deepEqual(conj(math.bignumber(2)), math.bignumber(2));
  });

  it('should calculate the conjugate of a complex number correctly', function () {
    _assert2.default.equal(conj(math.complex('2 + 3i')).toString(), '2 - 3i');
    _assert2.default.equal(conj(123).toString(), '123');
    _assert2.default.equal(conj(math.complex('2 - 3i')).toString(), '2 + 3i');
    _assert2.default.equal(conj(math.complex('2')).toString(), '2');
    _assert2.default.equal(conj(math.complex('-4i')).toString(), '4i');
    _assert2.default.equal(conj(math.i).toString(), '-i');
  });

  it('should calculate the conjugate for each element in a matrix', function () {
    _assert2.default.equal(math.format(conj([math.complex('2+3i'), math.complex('3-4i')])), '[2 - 3i, 3 + 4i]');
    _assert2.default.equal(conj(math.matrix([math.complex('2+3i'), math.complex('3-4i')])).toString(), '[2 - 3i, 3 + 4i]');
  });

  it('should throw an error when called with an unsupported type of argument', function () {
    _assert2.default.throws(function () {
      conj(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      conj(math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      conj();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      conj(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX conj', function () {
    var expression = math.parse('conj(1+i)');
    _assert2.default.equal(expression.toTex(), '\\left(1+ i\\right)^*');
  });
});
