'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('compile', function () {

  it('should compile an expression', function () {
    var code = math.compile('(5+3)/4');
    _assert2.default.ok(code instanceof Object);
    _assert2.default.ok(code.eval instanceof Function);
    _assert2.default.equal(code.eval(), 2);
  });

  it('should parse multiple expressions', function () {
    var codes = math.compile(['2+3', '4+5']);
    _assert2.default.ok(Array.isArray(codes));
    _assert2.default.equal(codes.length, 2);

    _assert2.default.equal(codes[0].eval(), 5);
    _assert2.default.equal(codes[1].eval(), 9);
  });

  it('should throw an error on wrong number of arguments', function () {
    _assert2.default.throws(function () {
      math.compile();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      math.compile('2+3', '3+4');
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error on wrong type of argument', function () {
    _assert2.default.throws(function () {
      math.compile(math.complex(2, 3));
    }, TypeError);
  });

  it('should LaTeX compile', function () {
    var expression = math.parse('compile(1)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{compile}\\left(1\\right)');
  });
});
