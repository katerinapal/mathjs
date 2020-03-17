'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test resize
var error = require('../../../lib/error/index'),
    math = require('../../../index'),
    Matrix = math.type.Matrix;

describe('resize', function () {

  it('should resize an array', function () {
    var array = [[0, 1, 2], [3, 4, 5]];
    _assert2.default.deepEqual(math.resize(array, [3, 2]), [[0, 1], [3, 4], [0, 0]]);

    // content should be cloned
    var x = math.complex(2, 3);
    var a = [x];
    var b = math.resize(a, [2], 4);
    _assert2.default.deepEqual(b, [x, 4]);
    _assert2.default.notStrictEqual(b[0], x);
  });

  it('should resize an array with a default value', function () {
    var array = [[0, 1, 2], [3, 4, 5]];
    _assert2.default.deepEqual(math.resize(array, [3, 2], 5), [[0, 1], [3, 4], [5, 5]]);
    _assert2.default.deepEqual(math.resize(array, [2]), arr(0, 3));
  });

  it('should resize an array with uninitialized as default value', function () {
    var array = [];
    _assert2.default.deepEqual(math.resize(array, [3], math.uninitialized), arr(uninit, uninit, uninit));
  });

  it('should resize an array with bignumbers', function () {
    var zero = math.bignumber(0);
    var one = math.bignumber(1);
    var two = math.bignumber(2);
    var three = math.bignumber(3);
    var array = [one, two, three];
    _assert2.default.deepEqual(math.resize(array, [three, two], zero), [[one, zero], [two, zero], [three, zero]]);
  });

  it('should resize a matrix', function () {
    var matrix = math.matrix([[0, 1, 2], [3, 4, 5]]);
    _assert2.default.deepEqual(math.resize(matrix, [3, 2]), math.matrix([[0, 1], [3, 4], [0, 0]]));
    _assert2.default.deepEqual(math.resize(matrix, math.matrix([3, 2])), math.matrix([[0, 1], [3, 4], [0, 0]]));

    // content should be cloned
    var x = math.complex(2, 3);
    var a = math.matrix([x]);
    var b = math.resize(a, [2], 4);
    _assert2.default.deepEqual(b, math.matrix([x, 4]));
    _assert2.default.notStrictEqual(b.valueOf()[0], x);
  });

  it('should resize an array into a scalar', function () {
    var array = [[0, 1, 2], [3, 4, 5]];
    _assert2.default.deepEqual(math.resize(array, []), 0);
  });

  it('should resize a matrix into a scalar', function () {
    var matrix = math.matrix([[0, 1, 2], [3, 4, 5]]);
    _assert2.default.deepEqual(math.resize(matrix, []), 0);
  });

  it('should resize a scalar into an array when array is specified in settings', function () {
    var math2 = math.create({ matrix: 'Array' });

    _assert2.default.deepEqual(math2.resize(2, [3], 4), [2, 4, 4]);
    _assert2.default.deepEqual(math2.resize(2, [2, 2], 4), [[2, 4], [4, 4]]);
  });

  it('should resize a vector into a 2d matrix', function () {
    var math2 = math.create({ matrix: 'Array' });

    _assert2.default.deepEqual(math2.resize([1, 2, 3], [3, 2], 0), [[1, 0], [2, 0], [3, 0]]);
  });

  it('should resize 2d matrix into a vector', function () {
    var math2 = math.create({ matrix: 'Array' });

    _assert2.default.deepEqual(math2.resize([[1, 2], [3, 4], [5, 6]], [3], 0), [1, 3, 5]);
  });

  it('should resize a scalar into a matrix', function () {
    _assert2.default.deepEqual(math.resize(2, [3], 4), math.matrix([2, 4, 4]));
    _assert2.default.deepEqual(math.resize(2, [2, 2], 4), math.matrix([[2, 4], [4, 4]]));
  });

  it('should resize a scalar into a scalar', function () {
    var x = math.complex(2, 3);
    var y = math.resize(x, []);
    _assert2.default.deepEqual(x, y);
    _assert2.default.notStrictEqual(x, y);
  });

  it('should resize a string', function () {
    _assert2.default.equal(math.resize('hello', [2]), 'he');
    _assert2.default.equal(math.resize('hello', [8]), 'hello   ');
    _assert2.default.equal(math.resize('hello', [5]), 'hello');
    _assert2.default.equal(math.resize('hello', [8], '!'), 'hello!!!');
  });

  it('should throw an error on invalid arguments', function () {
    _assert2.default.throws(function () {
      math.resize();
    });
    _assert2.default.throws(function () {
      math.resize([]);
    });
    _assert2.default.throws(function () {
      math.resize([], 2);
    });
    _assert2.default.throws(function () {
      math.resize([], [], 4, 555);
    });

    _assert2.default.throws(function () {
      math.resize([], ['no number']);
    }, /Invalid size/);
    _assert2.default.throws(function () {
      math.resize([], [2.3]);
    }, /Invalid size/);

    _assert2.default.throws(function () {
      math.resize('hello', []);
    });
    _assert2.default.throws(function () {
      math.resize('hello', [2, 3]);
    });
    _assert2.default.throws(function () {
      math.resize('hello', [8], 'charzzz');
    });
    _assert2.default.throws(function () {
      math.resize('hello', [8], 2);
    });

    _assert2.default.throws(function () {
      math.resize('hello', ['no number']);
    }, /Invalid size/);
    _assert2.default.throws(function () {
      math.resize('hello', [2.3]);
    }, /Invalid size/);
  });

  it('should LaTeX resize', function () {
    var expression = math.parse('resize([1,2],1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{resize}\\left(\\begin{bmatrix}1\\\\2\\\\\\end{bmatrix},1\\right)');
  });
});

/**
 * Helper function to create an Array containing uninitialized values
 * Example: arr(uninit, uninit, 2);    // [ , , 2 ]
 */
var uninit = {};
function arr() {
  var array = [];
  array.length = arguments.length;
  for (var i = 0; i < arguments.length; i++) {
    var value = arguments[i];
    if (value !== uninit) {
      array[i] = value;
    }
  }
  return array;
}
