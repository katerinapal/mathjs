import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
// test resize
var error = {}, Matrix = index_indexjsjs.type.Matrix;

describe('resize', function() {

  it('should resize an array', function() {
    var array = [[0,1,2],[3,4,5]];
    assert.deepEqual(index_indexjsjs.resize(array, [3, 2]), [[0,1], [3,4], [0, 0]]);

    // content should be cloned
    var x = index_indexjsjs.complex(2, 3);
    var a = [x];
    var b = index_indexjsjs.resize(a, [2], 4);
    assert.deepEqual(b, [x, 4]);
    assert.notStrictEqual(b[0], x);
  });

  it('should resize an array with a default value', function() {
    var array = [[0,1,2],[3,4,5]];
    assert.deepEqual(index_indexjsjs.resize(array, [3, 2], 5), [[0,1], [3,4], [5,5]]);
    assert.deepEqual(index_indexjsjs.resize(array, [2]), arr(0,3));
  });

  it('should resize an array with uninitialized as default value', function() {
    var array = [];
    assert.deepEqual(index_indexjsjs.resize(array, [3], index_indexjsjs.uninitialized), arr(uninit, uninit, uninit));
  });

  it('should resize an array with bignumbers', function() {
    var zero = index_indexjsjs.bignumber(0);
    var one = index_indexjsjs.bignumber(1);
    var two = index_indexjsjs.bignumber(2);
    var three = index_indexjsjs.bignumber(3);
    var array = [one, two, three];
    assert.deepEqual(index_indexjsjs.resize(array, [three, two], zero),
        [[one,zero], [two, zero], [three, zero]]);
  });

  it('should resize a matrix', function() {
    var matrix = index_indexjsjs.matrix([[0,1,2],[3,4,5]]);
    assert.deepEqual(index_indexjsjs.resize(matrix, [3, 2]),
        index_indexjsjs.matrix([[0,1], [3,4], [0,0]]));
    assert.deepEqual(index_indexjsjs.resize(matrix, index_indexjsjs.matrix([3, 2])),
        index_indexjsjs.matrix([[0,1], [3,4], [0,0]]));

    // content should be cloned
    var x = index_indexjsjs.complex(2, 3);
    var a = index_indexjsjs.matrix([x]);
    var b = index_indexjsjs.resize(a, [2], 4);
    assert.deepEqual(b, index_indexjsjs.matrix([x, 4]));
    assert.notStrictEqual(b.valueOf()[0], x);
  });

  it('should resize an array into a scalar', function() {
    var array = [[0,1,2],[3,4,5]];
    assert.deepEqual(index_indexjsjs.resize(array, []), 0);
  });

  it('should resize a matrix into a scalar', function() {
    var matrix = index_indexjsjs.matrix([[0,1,2],[3,4,5]]);
    assert.deepEqual(index_indexjsjs.resize(matrix, []), 0);
  });

  it('should resize a scalar into an array when array is specified in settings', function() {
    var math2 = index_indexjsjs.create({matrix: 'Array'});

    assert.deepEqual(math2.resize(2, [3], 4), [2, 4, 4]);
    assert.deepEqual(math2.resize(2, [2,2], 4), [[2,4], [4,4]]);
  });

  it('should resize a vector into a 2d matrix', function() {
    var math2 = index_indexjsjs.create({matrix: 'Array'});

    assert.deepEqual(math2.resize([1,2,3], [3,2], 0), [[1, 0], [2, 0], [3, 0]]);
  });

  it('should resize 2d matrix into a vector', function() {
    var math2 = index_indexjsjs.create({matrix: 'Array'});

    assert.deepEqual(math2.resize([[1,2],[3,4],[5,6]], [3], 0), [1,3,5]);
  });

  it('should resize a scalar into a matrix', function() {
    assert.deepEqual(index_indexjsjs.resize(2, [3], 4), index_indexjsjs.matrix([2, 4, 4]));
    assert.deepEqual(index_indexjsjs.resize(2, [2,2], 4), index_indexjsjs.matrix([[2,4], [4,4]]));
  });

  it('should resize a scalar into a scalar', function() {
    var x = index_indexjsjs.complex(2, 3);
    var y = index_indexjsjs.resize(x, []);
    assert.deepEqual(x, y);
    assert.notStrictEqual(x, y);
  });

  it('should resize a string', function() {
    assert.equal(index_indexjsjs.resize('hello', [2]), 'he');
    assert.equal(index_indexjsjs.resize('hello', [8]), 'hello   ');
    assert.equal(index_indexjsjs.resize('hello', [5]), 'hello');
    assert.equal(index_indexjsjs.resize('hello', [8], '!'), 'hello!!!');
  });

  it('should throw an error on invalid arguments', function() {
    assert.throws(function () {index_indexjsjs.resize()});
    assert.throws(function () {index_indexjsjs.resize([])});
    assert.throws(function () {index_indexjsjs.resize([], 2)});
    assert.throws(function () {index_indexjsjs.resize([], [], 4, 555)});

    assert.throws(function () {index_indexjsjs.resize([], ['no number'])}, /Invalid size/);
    assert.throws(function () {index_indexjsjs.resize([], [2.3])}, /Invalid size/);

    assert.throws(function () {index_indexjsjs.resize('hello', [])});
    assert.throws(function () {index_indexjsjs.resize('hello', [2,3])});
    assert.throws(function () {index_indexjsjs.resize('hello', [8], 'charzzz')});
    assert.throws(function () {index_indexjsjs.resize('hello', [8], 2)});


    assert.throws(function () {index_indexjsjs.resize('hello', ['no number'])}, /Invalid size/);
    assert.throws(function () {index_indexjsjs.resize('hello', [2.3])}, /Invalid size/);
  });

  it('should LaTeX resize', function () {
    var expression = index_indexjsjs.parse('resize([1,2],1)');
    assert.equal(expression.toTex(), '\\mathrm{resize}\\left(\\begin{bmatrix}1\\\\2\\\\\\end{bmatrix},1\\right)');
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
