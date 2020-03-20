"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var subset = _index.indexjs.subset,
    matrix = _index.indexjs.matrix,
    Range = _index.indexjs.type.Range,
    Set = _index.indexjs.type.Set,
    index = _index.indexjs.index;

describe('subset', function () {

  var a = [[1, 2], [3, 4]];
  var b = _index.indexjs.matrix(a);

  it('should get the right subset of an array', function () {
    _assert2.default.deepEqual(subset(a, index(new Range(0, 2), 1)), [[2], [4]]);
    _assert2.default.deepEqual(subset(a, index(1, 0)), 3);
  });

  it('should throw an error if trying to access an invalid subset of an array', function () {
    _assert2.default.throws(function () {
      subset(a, index(6, 0));
    }, RangeError);
    _assert2.default.throws(function () {
      subset(a, index(1));
    }, RangeError);
    _assert2.default.throws(function () {
      subset(a, index(1, 0, 0));
    }, RangeError);
    _assert2.default.throws(function () {
      subset(a, index(1.3, 0));
    }, TypeError);
  });

  it('should get the right subset of an object', function () {
    var obj = { 'foo': 'bar' };
    _assert2.default.deepEqual(subset(obj, index('foo')), 'bar');
    _assert2.default.deepEqual(subset(obj, index('bla')), undefined);
  });

  it('should throw an error in case of an invalid subset for an object', function () {
    var obj = { 'foo': 'bar' };
    var i = index('a', 'b');
    _assert2.default.throws(function () {
      subset(obj, i);
    }, /DimensionError/);
  });

  it('should get the right subset of a matrix', function () {
    _assert2.default.deepEqual(subset(b, index(new Range(0, 2), 1)), matrix([[2], [4]]));
    _assert2.default.deepEqual(subset(b, index(1, 0)), 3);
  });

  it('should get a subset of a matrix returning a null or undefined value', function () {
    _assert2.default.deepEqual(subset([0], index(0)), 0);
    _assert2.default.deepEqual(subset([null], index(0)), null);
    _assert2.default.deepEqual(subset([undefined], index(0)), undefined);

    _assert2.default.deepEqual(subset([null, undefined], index(new Range(0, 2))), [null, undefined]);
  });

  it('should throw an error if trying to access an invalid subset of a matrix', function () {
    _assert2.default.throws(function () {
      subset(b, index(6, 0));
    }, RangeError);
    _assert2.default.throws(function () {
      subset(b, index(1));
    }, RangeError);
    _assert2.default.throws(function () {
      subset(b, index(1, 0, 0));
    }, RangeError);
    _assert2.default.throws(function () {
      subset(b, index(1.3, 0));
    }, TypeError);
  });

  var d = [[1, 2], [3, 4]];
  var g = matrix([[1, 2], [3, 4]]);

  // TODO: test getting subset of an array and matrix

  it('should set the right subset of an array', function () {
    _assert2.default.deepEqual(d, [[1, 2], [3, 4]]);
    _assert2.default.deepEqual(subset(d, index(new Range(0, 2), 1), [[-2], [-4]]), [[1, -2], [3, -4]]);
    _assert2.default.deepEqual(d, [[1, 2], [3, 4]]);
    _assert2.default.deepEqual(subset(d, index(2, new Range(0, 2)), [[5, 6]]), [[1, 2], [3, 4], [5, 6]]);
    _assert2.default.deepEqual(d, [[1, 2], [3, 4]]);
    _assert2.default.deepEqual(subset(d, index(0, 0), 123), [[123, 2], [3, 4]]);
  });

  it('should set a subset of an array with uninitialized default value', function () {
    var a = [];
    _assert2.default.deepEqual(subset(a, index(2), 1), [0, 0, 1]);
    _assert2.default.deepEqual(subset(a, index(2), 1, _index.indexjs.uninitialized), arr(uninit, uninit, 1));
  });

  it('should throw an error if setting the subset of an array with an invalid replacement', function () {
    _assert2.default.throws(function () {
      subset(d, index(1), 123);
    }, RangeError);
    _assert2.default.throws(function () {
      subset(d, index(1.3, 0), 123);
    }, TypeError);
  });

  it('should set the right subset of a matrix', function () {
    _assert2.default.deepEqual(g, matrix([[1, 2], [3, 4]]));
    _assert2.default.deepEqual(subset(g, index(new Range(0, 2), 1), [[-2], [-4]]), matrix([[1, -2], [3, -4]]));
    _assert2.default.deepEqual(g, matrix([[1, 2], [3, 4]]));
    _assert2.default.deepEqual(subset(g, index(2, new Range(0, 2)), [[5, 6]]), matrix([[1, 2], [3, 4], [5, 6]]));
  });

  it('should throw an error if setting the subset of a matrix with an invalid replacement', function () {
    _assert2.default.throws(function () {
      subset(d, index(1), 123);
    }, RangeError);
    _assert2.default.throws(function () {
      subset(d, index(1.3, 0), 123);
    }, TypeError);
  });

  describe('string', function () {

    it('should get the right subset of a string', function () {
      _assert2.default.deepEqual(subset('hello', index(1)), 'e');
      _assert2.default.deepEqual(subset('hello', index(new Range(4, -1, -1))), 'olleh');
    });

    it('should throw an error if trying to access an invalid subset of a string', function () {
      //assert.throws(function () {subset('hello', 1);}, TypeError);
      _assert2.default.throws(function () {
        subset('hello', index([6]));
      }, RangeError);
      _assert2.default.throws(function () {
        subset('hello', index([-2]));
      }, RangeError);
      _assert2.default.throws(function () {
        subset('hello', index([1.3]));
      }, TypeError);
    });

    it('should set the right subset of a string', function () {
      var j = 'hello';
      _assert2.default.deepEqual(subset(j, index(0), 'H'), 'Hello');
      _assert2.default.deepEqual(j, 'hello');
      _assert2.default.deepEqual(subset(j, index(5), '!'), 'hello!');
      _assert2.default.deepEqual(j, 'hello');
      _assert2.default.deepEqual(subset(j, index(new Range(5, 11)), ' world'), 'hello world');
      _assert2.default.deepEqual(j, 'hello');
    });

    it('should throw an error when index is out of range for a string', function () {
      _assert2.default.throws(function () {
        subset('hello', index(5));
      }, /Index out of range/);
      _assert2.default.throws(function () {
        subset('hello', index(-1));
      }, /Index out of range/);
    });

    it('should set the right subset of a string with resizing', function () {
      var j = '';
      var defaultValue = 'i';
      _assert2.default.deepEqual(subset(j, index(5), '!', defaultValue), 'iiiii!');
    });

    it('should set a property of an object', function () {
      var obj = {};
      var res = subset(obj, index('foo'), 'bar');
      _assert2.default.deepEqual(res, { foo: 'bar' });
      _assert2.default.deepEqual(obj, {}); // should leave the original object untouched
    });

    it('should throw an error if setting the subset of a string with an invalid replacement', function () {
      _assert2.default.throws(function () {
        subset('hello', index([1, 2]), '1234');
      }, RangeError);
      _assert2.default.throws(function () {
        subset('hello', index(1, 2), 'a');
      }, RangeError);
    });

    it('should throw an error if in case of dimensions mismatch', function () {
      _assert2.default.throws(function () {
        subset('hello', index(1, 2));
      }, /Dimension mismatch/);
      _assert2.default.throws(function () {
        subset('hello', index(1, 2), 'a');
      }, /Dimension mismatch/);
    });

    it('should throw an error if in case of a default value with length > 0', function () {
      _assert2.default.throws(function () {
        subset('hello', index(10), '!', 'foo');
      }, /Single character expected as defaultValue/);
    });

    it('should throw an error if in case of an invalid index type', function () {
      _assert2.default.throws(function () {
        subset('hello', 2);
      }, /TypeError: Unexpected type of argument/);
      _assert2.default.throws(function () {
        subset('hello', 2, 'A');
      }, /TypeError: Unexpected type of argument/);
    });
  });

  it('should throw an error in case of invalid number of arguments', function () {
    _assert2.default.throws(function () {
      subset();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      subset(d);
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      subset(d, index(0, 0), 1, 0, 5);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error in case of invalid type of arguments', function () {
    _assert2.default.throws(function () {
      subset([1, 2], [0]);
    }, /TypeError: Unexpected type of argument/);
    //assert.throws(function () {subset(new Date(), index(0));}, /TypeError: Unexpected type of argument/); // FIXME: should fail too. Problem is, Date is also an Object
    // assert.throws(function () {subset(/foo/, index(0));}, /TypeError: Unexpected type of argument/); // FIXME: should fail too. Problem is, Date is also an Object
  });

  it('should LaTeX subset', function () {
    var expression = _index.indexjs.parse('subset([1],index(0,0))');
    _assert2.default.equal(expression.toTex(), '\\mathrm{subset}\\left(\\begin{bmatrix}1\\\\\\end{bmatrix},\\mathrm{index}\\left(0,0\\right)\\right)');
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
