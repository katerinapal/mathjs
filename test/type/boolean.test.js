"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = {},
    bool = _index.indexjs['boolean'];

describe('boolean', function () {

  it('should convert a boolean to a boolean', function () {
    _assert2.default.equal(bool(true), true);
    _assert2.default.equal(bool(false), false);
  });

  it('should convert null to a boolean', function () {
    _assert2.default.equal(bool(null), false);
  });

  it('should convert a number into a boolean', function () {
    _assert2.default.equal(bool(-2), true);
    _assert2.default.equal(bool(-1), true);
    _assert2.default.equal(bool(0), false);
    _assert2.default.equal(bool(1), true);
    _assert2.default.equal(bool(2), true);
  });

  it('should convert a bignumber into a boolean', function () {
    _assert2.default.equal(bool(_index.indexjs.bignumber(-2)), true);
    _assert2.default.equal(bool(_index.indexjs.bignumber(-1)), true);
    _assert2.default.equal(bool(_index.indexjs.bignumber(0)), false);
    _assert2.default.equal(bool(_index.indexjs.bignumber(1)), true);
    _assert2.default.equal(bool(_index.indexjs.bignumber(2)), true);
  });

  it('should convert the elements of a matrix or array to booleans', function () {
    _assert2.default.deepEqual(bool(_index.indexjs.matrix([1, 0, 1, 1])), _index.indexjs.matrix([true, false, true, true]));
    _assert2.default.deepEqual(bool([1, 0, 1, 1]), [true, false, true, true]);
  });

  it('should convert a string into a boolean', function () {
    _assert2.default.equal(bool('true'), true);
    _assert2.default.equal(bool('false'), false);

    _assert2.default.equal(bool('True'), true);
    _assert2.default.equal(bool('False'), false);

    _assert2.default.equal(bool('1'), true);
    _assert2.default.equal(bool('0'), false);
    _assert2.default.equal(bool(' 0 '), false);

    _assert2.default.equal(bool('2'), true);
    _assert2.default.equal(bool(' 4e2 '), true);
    _assert2.default.equal(bool(' -4e2 '), true);
  });

  it('should throw an error if the string is not a valid number', function () {
    _assert2.default.throws(function () {
      bool('');
    }, /Error: Cannot convert/);
    _assert2.default.throws(function () {
      bool('23a');
    }, /Error: Cannot convert/);
  });

  it('should throw an error if there\'s a wrong number of arguments', function () {
    _assert2.default.throws(function () {
      bool(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error if used with a complex', function () {
    _assert2.default.throws(function () {
      bool(_index.indexjs.complex(2, 3));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      bool(_index.indexjs.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX boolean', function () {
    var expression = _index.indexjs.parse('boolean(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{boolean}\\left(1\\right)');
  });
});
