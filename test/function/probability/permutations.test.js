'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    permutations = math.permutations;

describe('permutations', function () {

  it('should calculate the permutations of a number', function () {
    _assert2.default.equal(permutations(0), 1);
    _assert2.default.equal(permutations(1), 1);
    _assert2.default.equal(permutations(2), 2);
    _assert2.default.equal(permutations(3), 6);
    _assert2.default.equal(permutations(4), 24);
    _assert2.default.equal(permutations(5), 120);
  });

  it('should calculate the permutations of a BigNumber', function () {
    _assert2.default.deepEqual(permutations(math.bignumber(4)), math.bignumber(24));
    _assert2.default.deepEqual(permutations(math.bignumber(5)), math.bignumber(120));
    _assert2.default.deepEqual(permutations(math.bignumber(8)), math.bignumber(40320));
  });

  it('should calculate the permutations of a BigNumber, taking k at a time', function () {
    _assert2.default.deepEqual(permutations(math.bignumber(5), math.bignumber(4)), math.bignumber(120));
    _assert2.default.deepEqual(permutations(math.bignumber(6), math.bignumber(3)), math.bignumber(120));
    _assert2.default.deepEqual(permutations(math.bignumber(9), math.bignumber(8)), math.bignumber(362880));
  });

  it('should calculate the permutations of a number, taking k at a time', function () {
    _assert2.default.equal(permutations(5, 4), 120);
    _assert2.default.equal(permutations(9, 8), 362880);
    _assert2.default.equal(permutations(7, 5), 2520);
  });

  it('should fail loudly when k is larger than x', function () {
    _assert2.default.throws(function () {
      permutations(5, 6);
    }, TypeError);
    _assert2.default.throws(function () {
      permutations(math.bignumber(5), math.bignumber(6));
    }, TypeError);
  });

  it('should not accept negative or non-integer arguments', function () {
    _assert2.default.throws(function () {
      permutations(12, -6);
    }, TypeError);
    _assert2.default.throws(function () {
      permutations(-12, 6);
    }, TypeError);
    _assert2.default.throws(function () {
      permutations(4.5, 2);
    }, TypeError);
    _assert2.default.throws(function () {
      permutations(4, 0.5);
    }, TypeError);
    _assert2.default.throws(function () {
      permutations(math.bignumber(-12), -6);
    }, TypeError);
    _assert2.default.throws(function () {
      permutations(math.bignumber(12.5), math.bignumber(6));
    }, TypeError);
    _assert2.default.throws(function () {
      permutations(math.bignumber(12.5), math.pi);
    }, TypeError);
  });

  it('should not accept more than two arguments', function () {
    _assert2.default.throws(function () {
      permutations(12, 6, 13);
    });
    _assert2.default.throws(function () {
      permutations(-12, 6, 13);
    });
  });

  it('should not accept arguments of the wrong type', function () {
    _assert2.default.throws(function () {
      permutations("baa baa black sheep", true);
    });
    _assert2.default.throws(function () {
      permutations(new Array(12));
    });
  });

  it('should LaTeX permutations', function () {
    var expression = math.parse('permutations(2)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{permutations}\\left(2\\right)');
  });
});
