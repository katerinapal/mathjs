'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');
var Parser = math.expression.Parser;

describe('parser', function () {

  it('should create a parser', function () {
    var parser = math.parser();

    (0, _assert2.default)(parser instanceof Parser);
  });

  it('should LaTeX parser', function () {
    //This doesn't really make sense in a way
    var expression = math.parse('parser()');
    _assert2.default.equal(expression.toTex(), '\\mathrm{parser}\\left(\\right)');
  });
});
