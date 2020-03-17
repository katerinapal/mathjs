'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test matrix construction
var math = require('../../../../index'),
    sparse = math.sparse;

describe('sparse', function () {

  it('should create empty matrix', function () {
    var a = sparse();
    _assert2.default.ok(a instanceof math.type.Matrix);
  });

  it('should create empty matrix, number datatype', function () {
    var a = sparse('number');
    _assert2.default.ok(a instanceof math.type.Matrix);
    _assert2.default.ok(a.datatype() === 'number');
  });

  it('should be the identity if called with a matrix', function () {
    var b = sparse([[1, 2], [3, 4]]);
    var c = sparse(b);
    _assert2.default.ok(c._values != b._values); // data should be cloned
    _assert2.default.deepEqual(c, sparse([[1, 2], [3, 4]]));
  });

  it('should be the identity if called with a matrix, number datatype', function () {
    var b = sparse([[1, 2], [3, 4]], 'number');
    var c = sparse(b);
    _assert2.default.ok(c._values != b._values); // data should be cloned
    _assert2.default.deepEqual(c.valueOf(), b.valueOf());
    _assert2.default.ok(c.datatype() === 'number');
  });

  it('should throw an error if called with an invalid argument', function () {
    _assert2.default.throws(function () {
      sparse(new Date());
    }, TypeError);
  });

  it('should throw an error if called with a unit', function () {
    _assert2.default.throws(function () {
      sparse(math.unit('5cm'));
    }, TypeError);
  });

  it('should throw an error if called with too many arguments', function () {
    _assert2.default.throws(function () {
      sparse([], 3, 3);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX matrix', function () {
    var expr1 = math.parse('sparse()');
    var expr2 = math.parse('sparse([1])');

    _assert2.default.equal(expr1.toTex(), '\\begin{bsparse}\\end{bsparse}');
    _assert2.default.equal(expr2.toTex(), '\\left(\\begin{bmatrix}1\\\\\\end{bmatrix}\\right)');
  });
});
