"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test squeeze
var error = {},
    squeeze = _index.indexjs.squeeze,
    size = _index.indexjs.size,
    matrix = _index.indexjs.matrix;

describe('squeeze', function () {

  it('should squeeze an matrix', function () {
    var m = _index.indexjs.ones(matrix([1, 3, 2]));
    _assert2.default.deepEqual(size(m), matrix([1, 3, 2]));
    _assert2.default.deepEqual(size(m.valueOf()), [1, 3, 2]);
    _assert2.default.deepEqual(size(squeeze(m)), matrix([3, 2]));

    m = _index.indexjs.ones(matrix([1, 1, 3]));
    _assert2.default.deepEqual(size(m), matrix([1, 1, 3]));
    _assert2.default.deepEqual(size(squeeze(m)), matrix([3]));
    _assert2.default.deepEqual(size(squeeze(_index.indexjs.range(1, 6))), matrix([5]));

    _assert2.default.deepEqual(squeeze(2.3), 2.3);
    _assert2.default.deepEqual(squeeze(matrix([[5]])), 5);
  });

  it('should squeeze an array', function () {
    _assert2.default.deepEqual(squeeze([[2, 3]]), [2, 3]);
  });

  it('should throw an error if called with an invalid number of arguments', function () {
    _assert2.default.throws(function () {
      squeeze();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      squeeze(1, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should LaTeX squeeze', function () {
    var expression = _index.indexjs.parse('squeeze([[0],[0]])');
    _assert2.default.equal(expression.toTex(), '\\mathrm{squeeze}\\left(\\begin{bmatrix}0\\\\0\\\\\\end{bmatrix}\\right)');
  });
});
