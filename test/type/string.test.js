'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../lib/error/index'),
    math = require('../../index'),
    string = math.string;

describe('string', function () {

  it('should be \'\' if called with no argument', function () {
    _assert2.default.equal(string(), '');
  });

  it('should convert a boolean to a string', function () {
    _assert2.default.equal(string(true), 'true');
    _assert2.default.equal(string(false), 'false');
  });

  it('should convert null to a string', function () {
    _assert2.default.equal(string(null), 'null');
  });

  it('should be the identity if called with a string', function () {
    _assert2.default.equal(string('hello'), 'hello');
    _assert2.default.equal(string(''), '');
    _assert2.default.equal(string(' '), ' ');
  });

  it('should convert the elements of an array to strings', function () {
    _assert2.default.deepEqual(string([[2, true], ['hi', null]]), [['2', 'true'], ['hi', 'null']]);
  });

  it('should convert the elements of a matrix to strings', function () {
    _assert2.default.deepEqual(string(math.matrix([[2, true], ['hi', null]])), math.matrix([['2', 'true'], ['hi', 'null']]));
  });

  it('should convert a number to string', function () {
    _assert2.default.equal(string(1 / 8), '0.125');
    _assert2.default.equal(string(2.1e-3), '0.0021');
    _assert2.default.equal(string(123456789), '1.23456789e+8');
    _assert2.default.equal(string(2000000), '2e+6');
  });

  it('should convert a bignumber to string', function () {
    _assert2.default.equal(string(math.bignumber('2.3e+500')), '2.3e+500');
  });

  it('should convert a complex number to string', function () {
    _assert2.default.equal(string(math.complex(2, 3)), '2 + 3i');
  });

  it('should convert a unit to string', function () {
    _assert2.default.equal(string(math.unit('5cm')), '50 mm');
  });

  it('should throw an error if called with wrong number of arguments', function () {
    _assert2.default.throws(function () {
      string(1, 2);
    }, /TypeError: Too many arguments/);
    _assert2.default.throws(function () {
      string(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });
});
