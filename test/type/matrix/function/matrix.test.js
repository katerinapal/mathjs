'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test matrix construction
var math = require('../../../../index'),
    matrix = math.matrix;

describe('matrix', function () {

  it('should create an empty matrix with one dimension if called without argument', function () {
    var a = matrix();
    _assert2.default.ok(a instanceof math.type.Matrix);
    _assert2.default.deepEqual(math.size(a), matrix([0])); // TODO: wouldn't it be nicer if an empty matrix has zero dimensions?
  });

  it('should create empty matrix, dense format', function () {
    var a = matrix('dense');
    _assert2.default.ok(a instanceof math.type.Matrix);
    _assert2.default.deepEqual(math.size(a), matrix([0]));
  });

  it('should create empty matrix, dense format, number datatype', function () {
    var a = matrix('dense', 'number');
    _assert2.default.ok(a instanceof math.type.Matrix);
    _assert2.default.deepEqual(math.size(a), matrix([0]));
    (0, _assert2.default)(a.datatype(), 'number');
  });

  it('should create empty matrix, sparse', function () {
    var a = matrix('sparse');
    _assert2.default.ok(a instanceof math.type.Matrix);
  });

  it('should create a matrix from an array', function () {
    var b = matrix([[1, 2], [3, 4]]);
    _assert2.default.ok(b instanceof math.type.Matrix);
    _assert2.default.deepEqual(b, matrix([[1, 2], [3, 4]]));
    _assert2.default.deepEqual(math.size(b), matrix([2, 2]));
  });

  it('should be the identity if called with a matrix, dense format', function () {
    var b = matrix([[1, 2], [3, 4]], 'dense');
    var c = matrix(b, 'dense');
    _assert2.default.ok(c._data != b._data); // data should be cloned
    _assert2.default.deepEqual(c, matrix([[1, 2], [3, 4]], 'dense'));
    _assert2.default.deepEqual(math.size(c), matrix([2, 2], 'dense'));
  });

  it('should be the identity if called with a matrix, dense format, number datatype', function () {
    var b = matrix([[1, 2], [3, 4]], 'dense', 'number');
    var c = matrix(b, 'dense');
    _assert2.default.ok(c._data != b._data); // data should be cloned
    _assert2.default.ok(c._size != b._size);
    _assert2.default.deepEqual(c._data, b._data);
    _assert2.default.deepEqual(c._size, b._size);
    _assert2.default.ok(c.datatype() === 'number');
  });

  it('should be the identity if called with a matrix, sparse', function () {
    var b = matrix([[1, 2], [3, 4]], 'sparse');
    var c = matrix(b, 'sparse');
    _assert2.default.ok(c._values != b._values); // data should be cloned
    _assert2.default.deepEqual(c, matrix([[1, 2], [3, 4]], 'sparse'));
  });

  it('should be the identity if called with a matrix, sparse, number datatype', function () {
    var b = matrix([[1, 2], [3, 4]], 'sparse', 'number');
    var c = matrix(b, 'sparse');
    _assert2.default.ok(c._values != b._values); // data should be cloned
    _assert2.default.deepEqual(c.valueOf(), b.valueOf());
    _assert2.default.ok(c.datatype() === 'number');
  });

  it('should create a matrix from a range correctly', function () {
    var d = matrix(math.range(1, 6));
    _assert2.default.ok(d instanceof math.type.Matrix);
    _assert2.default.deepEqual(d, matrix([1, 2, 3, 4, 5]));
    _assert2.default.deepEqual(math.size(d), matrix([5]));
  });

  it('should throw an error if called with an invalid argument', function () {
    _assert2.default.throws(function () {
      matrix(new Date());
    }, TypeError);
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      matrix(math.unit('5cm'));
    }, TypeError);
  });

  it('should throw an error if called with too many arguments', function () {
    _assert2.default.throws(function () {
      matrix([], 3, 3, 7);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error when called with an invalid storage format', function () {
    _assert2.default.throws(function () {
      math.matrix([], 1);
    }, /Unsupported matrix storage format: 1/);
  });

  it('should throw an error when called with an unknown storage format', function () {
    _assert2.default.throws(function () {
      math.matrix([], '123');
    }, /Unsupported matrix storage format: 123/);
  });

  it('should LaTeX matrix', function () {
    var expr1 = math.parse('matrix()');
    var expr2 = math.parse('matrix([1])');

    _assert2.default.equal(expr1.toTex(), '\\begin{bmatrix}\\end{bmatrix}');
    _assert2.default.equal(expr2.toTex(), '\\left(\\begin{bmatrix}1\\\\\\end{bmatrix}\\right)');
  });
});
