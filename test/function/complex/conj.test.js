"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var conj = _index.indexjs.conj;

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
    _assert2.default.deepEqual(conj(_index.indexjs.bignumber(2)), _index.indexjs.bignumber(2));
  });

  it('should calculate the conjugate of a complex number correctly', function () {
    _assert2.default.equal(conj(_index.indexjs.complex('2 + 3i')).toString(), '2 - 3i');
    _assert2.default.equal(conj(123).toString(), '123');
    _assert2.default.equal(conj(_index.indexjs.complex('2 - 3i')).toString(), '2 + 3i');
    _assert2.default.equal(conj(_index.indexjs.complex('2')).toString(), '2');
    _assert2.default.equal(conj(_index.indexjs.complex('-4i')).toString(), '4i');
    _assert2.default.equal(conj(_index.indexjs.i).toString(), '-i');
  });

  it('should calculate the conjugate for each element in a matrix', function () {
    _assert2.default.equal(_index.indexjs.format(conj([_index.indexjs.complex('2+3i'), _index.indexjs.complex('3-4i')])), '[2 - 3i, 3 + 4i]');
    _assert2.default.equal(conj(_index.indexjs.matrix([_index.indexjs.complex('2+3i'), _index.indexjs.complex('3-4i')])).toString(), '[2 - 3i, 3 + 4i]');
  });

  it('should throw an error when called with an unsupported type of argument', function () {
    _assert2.default.throws(function () {
      conj(new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      conj(_index.indexjs.unit('5cm'));
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
    var expression = _index.indexjs.parse('conj(1+i)');
    _assert2.default.equal(expression.toTex(), '\\left(1+ i\\right)^*');
  });
});
