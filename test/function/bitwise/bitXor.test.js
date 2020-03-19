'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test bitXor
var math = require('../../../index'),
    matrix = math.matrix,
    sparse = math.sparse,
    bignumber = math.bignumber,
    bitXor = math.bitXor;

describe('bitXor', function () {

  it('should xor two numbers', function () {
    _assert2.default.equal(bitXor(53, 131), 182);
    _assert2.default.equal(bitXor(2, 3), 1);
    _assert2.default.equal(bitXor(-2, 3), -3);
    _assert2.default.equal(bitXor(2, -3), -1);
    _assert2.default.equal(bitXor(-5, -3), 6);
  });

  it('should xor booleans', function () {
    _assert2.default.equal(bitXor(true, true), 0);
    _assert2.default.equal(bitXor(true, false), 1);
    _assert2.default.equal(bitXor(false, true), 1);
    _assert2.default.equal(bitXor(false, false), 0);
  });

  it('should xor numbers and null', function () {
    _assert2.default.equal(math.bitXor(null, null), 0);
    _assert2.default.equal(math.bitXor(null, 1), 1);
    _assert2.default.equal(math.bitXor(1, null), 1);
  });

  it('should xor mixed numbers and booleans', function () {
    _assert2.default.equal(bitXor(0, true), 1);
    _assert2.default.equal(bitXor(0, false), 0);
    _assert2.default.equal(bitXor(true, 0), 1);
    _assert2.default.equal(bitXor(false, 0), 0);
    _assert2.default.equal(bitXor(true, 1), 0);
    _assert2.default.equal(bitXor(false, 1), 1);
  });

  it('should bitwise xor bignumbers', function () {
    _assert2.default.deepEqual(bitXor(bignumber(1), bignumber(2)), bignumber(3));
    _assert2.default.deepEqual(bitXor(bignumber('-1.0e+31'), bignumber('-1.0e+32')), bignumber('92546795970570634164073698164736'));
    _assert2.default.deepEqual(bitXor(bignumber('1.0e+31'), bignumber('1.0e+32')), bignumber('92546795970570634164077993132032'));
    _assert2.default.deepEqual(bitXor(bignumber('-1.0e+31'), bignumber('1.0e+32')), bignumber('-92546795970570634164077993132032'));
    _assert2.default.deepEqual(bitXor(bignumber('1.0e+31'), bignumber('-1.0e+32')), bignumber('-92546795970570634164073698164736'));
  });

  it('should bitwise xor mixed numbers and bignumbers', function () {
    _assert2.default.deepEqual(bitXor(bignumber(1), 2), bignumber(3));
    _assert2.default.deepEqual(bitXor(1, bignumber(2)), bignumber(3));
    _assert2.default.deepEqual(bitXor(bignumber(7), 9), bignumber(14));
    _assert2.default.deepEqual(bitXor(7, bignumber(9)), bignumber(14));
  });

  it('should bitwise xor mixed booleans and bignumbers', function () {
    _assert2.default.deepEqual(bitXor(bignumber(1), true), bignumber(0));
    _assert2.default.deepEqual(bitXor(bignumber(1), false), bignumber(1));
    _assert2.default.deepEqual(bitXor(true, bignumber(3)), bignumber(2));
    _assert2.default.deepEqual(bitXor(false, bignumber(3)), bignumber(3));
  });

  it('should throw an error if used with a unit', function () {
    _assert2.default.throws(function () {
      bitXor(math.unit('5cm'), 2);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitXor(2, math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitXor(math.unit('2cm'), math.unit('5cm'));
    }, /TypeError: Unexpected type of argument/);
  });

  it('should throw an error if the parameters are not integers', function () {
    _assert2.default.throws(function () {
      bitXor(1.1, 1);
    }, /Integers expected in function bitXor/);
    _assert2.default.throws(function () {
      bitXor(1, 1.1);
    }, /Integers expected in function bitXor/);
    _assert2.default.throws(function () {
      bitXor(1.1, 1.1);
    }, /Integers expected in function bitXor/);
    _assert2.default.throws(function () {
      bitXor(bignumber(1.1), 1);
    }, /Integers expected in function bitXor/);
    _assert2.default.throws(function () {
      bitXor(1, bignumber(1.1));
    }, /Integers expected in function bitXor/);
    _assert2.default.throws(function () {
      bitXor(bignumber(1.1), bignumber(1));
    }, /Integers expected in function bitXor/);
    _assert2.default.throws(function () {
      bitXor(bignumber(1), bignumber(1.1));
    }, /Integers expected in function bitXor/);
  });

  describe('Array', function () {

    it('should bitwise xor array - scalar', function () {
      _assert2.default.deepEqual(bitXor(12, [3, 9]), [15, 5]);
      _assert2.default.deepEqual(bitXor([3, 9], 12), [15, 5]);
    });

    it('should bitwise xor array - array', function () {
      _assert2.default.deepEqual(bitXor([[1, 2], [3, 4]], [[5, 6], [7, 8]]), [[4, 4], [4, 12]]);
    });

    it('should bitwise xor array - dense matrix', function () {
      _assert2.default.deepEqual(bitXor([[1, 2], [3, 4]], matrix([[5, 6], [7, 8]])), matrix([[4, 4], [4, 12]]));
    });

    it('should bitwise xor array - sparse matrix', function () {
      _assert2.default.deepEqual(bitXor([[1, 2], [3, 4]], sparse([[5, 6], [7, 8]])), matrix([[4, 4], [4, 12]]));
    });
  });

  describe('DenseMatrix', function () {

    it('should bitwise xor dense matrix - scalar', function () {
      _assert2.default.deepEqual(bitXor(12, matrix([3, 9])), matrix([15, 5]));
      _assert2.default.deepEqual(bitXor(matrix([3, 9]), 12), matrix([15, 5]));
    });

    it('should bitwise xor dense matrix - array', function () {
      _assert2.default.deepEqual(bitXor(matrix([[1, 2], [3, 4]]), [[5, 6], [7, 8]]), matrix([[4, 4], [4, 12]]));
    });

    it('should bitwise xor dense matrix - dense matrix', function () {
      _assert2.default.deepEqual(bitXor(matrix([[1, 2], [3, 4]]), matrix([[5, 6], [7, 8]])), matrix([[4, 4], [4, 12]]));
    });

    it('should bitwise xor dense matrix - sparse matrix', function () {
      _assert2.default.deepEqual(bitXor(matrix([[1, 2], [3, 4]]), sparse([[5, 6], [7, 8]])), matrix([[4, 4], [4, 12]]));
    });
  });

  describe('SparseMatrix', function () {

    it('should bitwise xor sparse matrix - scalar', function () {
      _assert2.default.deepEqual(bitXor(12, sparse([[3, 9], [9, 3]])), matrix([[15, 5], [5, 15]]));
      _assert2.default.deepEqual(bitXor(sparse([[3, 9], [9, 3]]), 12), matrix([[15, 5], [5, 15]]));
    });

    it('should bitwise xor sparse matrix - array', function () {
      _assert2.default.deepEqual(bitXor(sparse([[1, 2], [3, 4]]), [[5, 6], [7, 8]]), matrix([[4, 4], [4, 12]]));
    });

    it('should bitwise xor sparse matrix - dense matrix', function () {
      _assert2.default.deepEqual(bitXor(sparse([[1, 2], [3, 4]]), matrix([[5, 6], [7, 8]])), matrix([[4, 4], [4, 12]]));
    });

    it('should bitwise xor sparse matrix - sparse matrix', function () {
      _assert2.default.deepEqual(bitXor(sparse([[1, 2], [3, 4]]), sparse([[5, 6], [7, 8]])), matrix([[4, 4], [4, 12]]));
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      bitXor(1);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      bitXor(1, 2, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      bitXor(new Date(), true);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitXor(true, new Date());
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitXor(true, undefined);
    }, /TypeError: Unexpected type of argument/);
    _assert2.default.throws(function () {
      bitXor(undefined, true);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX bitXor', function () {
    var expression = math.parse('bitXor(2,3)');
    _assert2.default.equal(expression.toTex(), '\\left(2\\underline{|}3\\right)');
  });
});
