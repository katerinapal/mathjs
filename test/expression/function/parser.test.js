"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Parser = _index.indexjs.expression.Parser;

describe('parser', function () {

  it('should create a parser', function () {
    var parser = _index.indexjs.parser();

    (0, _assert2.default)(parser instanceof Parser);
  });

  it('should LaTeX parser', function () {
    //This doesn't really make sense in a way
    var expression = _index.indexjs.parse('parser()');
    _assert2.default.equal(expression.toTex(), '\\mathrm{parser}\\left(\\right)');
  });
});
