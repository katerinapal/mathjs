"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test resize
var error = require('../../../lib/error/index'),
    Matrix = _index.indexjs.type.Matrix;

describe('resize', function () {

  it('should resize an array', function () {
    var array = [[0, 1, 2], [3, 4, 5]];
    _assert2.default.deepEqual(_index.indexjs.resize(array, [3, 2]), [[0, 1], [3, 4], [0, 0]]);

    // content should be cloned
    var x = _index.indexjs.complex(2, 3);
    var a = [x];
    var b = _index.indexjs.resize(a, [2], 4);
    _assert2.default.deepEqual(b, [x, 4]);
    _assert2.default.notStrictEqual(b[0], x);
  });

  it('should resize an array with a default value', function () {
    var array = [[0, 1, 2], [3, 4, 5]];
    _assert2.default.deepEqual(_index.indexjs.resize(array, [3, 2], 5), [[0, 1], [3, 4], [5, 5]]);
    _assert2.default.deepEqual(_index.indexjs.resize(array, [2]), arr(0, 3));
  });

  it('should resize an array with uninitialized as default value', function () {
    var array = [];
    _assert2.default.deepEqual(_index.indexjs.resize(array, [3], _index.indexjs.uninitialized), arr(uninit, uninit, uninit));
  });

  it('should resize an array with bignumbers', function () {
    var zero = _index.indexjs.bignumber(0);
    var one = _index.indexjs.bignumber(1);
    var two = _index.indexjs.bignumber(2);
    var three = _index.indexjs.bignumber(3);
    var array = [one, two, three];
    _assert2.default.deepEqual(_index.indexjs.resize(array, [three, two], zero), [[one, zero], [two, zero], [three, zero]]);
  });

  it('should resize a matrix', function () {
    var matrix = _index.indexjs.matrix([[0, 1, 2], [3, 4, 5]]);
    _assert2.default.deepEqual(_index.indexjs.resize(matrix, [3, 2]), _index.indexjs.matrix([[0, 1], [3, 4], [0, 0]]));
    _assert2.default.deepEqual(_index.indexjs.resize(matrix, _index.indexjs.matrix([3, 2])), _index.indexjs.matrix([[0, 1], [3, 4], [0, 0]]));

    // content should be cloned
    var x = _index.indexjs.complex(2, 3);
    var a = _index.indexjs.matrix([x]);
    var b = _index.indexjs.resize(a, [2], 4);
    _assert2.default.deepEqual(b, _index.indexjs.matrix([x, 4]));
    _assert2.default.notStrictEqual(b.valueOf()[0], x);
  });

  it('should resize an array into a scalar', function () {
    var array = [[0, 1, 2], [3, 4, 5]];
    _assert2.default.deepEqual(_index.indexjs.resize(array, []), 0);
  });

  it('should resize a matrix into a scalar', function () {
    var matrix = _index.indexjs.matrix([[0, 1, 2], [3, 4, 5]]);
    _assert2.default.deepEqual(_index.indexjs.resize(matrix, []), 0);
  });

  it('should resize a scalar into an array when array is specified in settings', function () {
    var math2 = _index.indexjs.create({ matrix: 'Array' });

    _assert2.default.deepEqual(math2.resize(2, [3], 4), [2, 4, 4]);
    _assert2.default.deepEqual(math2.resize(2, [2, 2], 4), [[2, 4], [4, 4]]);
  });

  it('should resize a vector into a 2d matrix', function () {
    var math2 = _index.indexjs.create({ matrix: 'Array' });

    _assert2.default.deepEqual(math2.resize([1, 2, 3], [3, 2], 0), [[1, 0], [2, 0], [3, 0]]);
  });

  it('should resize 2d matrix into a vector', function () {
    var math2 = _index.indexjs.create({ matrix: 'Array' });

    _assert2.default.deepEqual(math2.resize([[1, 2], [3, 4], [5, 6]], [3], 0), [1, 3, 5]);
  });

  it('should resize a scalar into a matrix', function () {
    _assert2.default.deepEqual(_index.indexjs.resize(2, [3], 4), _index.indexjs.matrix([2, 4, 4]));
    _assert2.default.deepEqual(_index.indexjs.resize(2, [2, 2], 4), _index.indexjs.matrix([[2, 4], [4, 4]]));
  });

  it('should resize a scalar into a scalar', function () {
    var x = _index.indexjs.complex(2, 3);
    var y = _index.indexjs.resize(x, []);
    _assert2.default.deepEqual(x, y);
    _assert2.default.notStrictEqual(x, y);
  });

  it('should resize a string', function () {
    _assert2.default.equal(_index.indexjs.resize('hello', [2]), 'he');
    _assert2.default.equal(_index.indexjs.resize('hello', [8]), 'hello   ');
    _assert2.default.equal(_index.indexjs.resize('hello', [5]), 'hello');
    _assert2.default.equal(_index.indexjs.resize('hello', [8], '!'), 'hello!!!');
  });

  it('should throw an error on invalid arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.resize();
    });
    _assert2.default.throws(function () {
      _index.indexjs.resize([]);
    });
    _assert2.default.throws(function () {
      _index.indexjs.resize([], 2);
    });
    _assert2.default.throws(function () {
      _index.indexjs.resize([], [], 4, 555);
    });

    _assert2.default.throws(function () {
      _index.indexjs.resize([], ['no number']);
    }, /Invalid size/);
    _assert2.default.throws(function () {
      _index.indexjs.resize([], [2.3]);
    }, /Invalid size/);

    _assert2.default.throws(function () {
      _index.indexjs.resize('hello', []);
    });
    _assert2.default.throws(function () {
      _index.indexjs.resize('hello', [2, 3]);
    });
    _assert2.default.throws(function () {
      _index.indexjs.resize('hello', [8], 'charzzz');
    });
    _assert2.default.throws(function () {
      _index.indexjs.resize('hello', [8], 2);
    });

    _assert2.default.throws(function () {
      _index.indexjs.resize('hello', ['no number']);
    }, /Invalid size/);
    _assert2.default.throws(function () {
      _index.indexjs.resize('hello', [2.3]);
    }, /Invalid size/);
  });

  it('should LaTeX resize', function () {
    var expression = _index.indexjs.parse('resize([1,2],1)');
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
