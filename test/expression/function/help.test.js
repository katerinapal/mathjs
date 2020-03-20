"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('help', function () {

  it('should find documentation for a function by its name', function () {
    var help = _index.indexjs.help('sin');
    _assert2.default.ok(help instanceof _index.indexjs.type.Help);
    _assert2.default.deepEqual(help.doc, _index.indexjs.expression.docs.sin);
  });

  it('should find documentation for a function by the function itself', function () {
    var help = _index.indexjs.help(_index.indexjs.sin);
    _assert2.default.ok(help instanceof _index.indexjs.type.Help);
    _assert2.default.deepEqual(help.doc, _index.indexjs.expression.docs.sin);
  });

  it('should throw an error on wrong number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.help();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.help('sin', 2);
    }, /TypeError: Too many arguments/);
  });

  it('should find help from a function name', function () {
    var help = _index.indexjs.help('sin');
    (0, _assert2.default)(help instanceof _index.indexjs.type.Help);
    _assert2.default.equal(help.doc.name, 'sin');
  });

  it('should find help from a function', function () {
    var help = _index.indexjs.help(_index.indexjs.sin);
    (0, _assert2.default)(help instanceof _index.indexjs.type.Help);
    _assert2.default.equal(help.doc.name, 'sin');
  });

  it('should find help from a constant name', function () {
    var help = _index.indexjs.help('pi');
    (0, _assert2.default)(help instanceof _index.indexjs.type.Help);
    _assert2.default.equal(help.doc.name, 'pi');
  });

  it('should find help from a constant', function () {
    var help = _index.indexjs.help(_index.indexjs.pi);
    (0, _assert2.default)(help instanceof _index.indexjs.type.Help);
    _assert2.default.equal(help.doc.name, 'pi');
  });

  it('should throw an error when no help is found', function () {
    // assert.throws(function () {math.help(undefined)}, /No documentation found/);
    _assert2.default.throws(function () {
      _index.indexjs.help(new Date());
    }, /No documentation found/);
    _assert2.default.throws(function () {
      _index.indexjs.help('nonExistingFunction');
    }, /No documentation found/);
    _assert2.default.throws(function () {
      _index.indexjs.help('parse');
    }, /No documentation found/);
  });

  it('should LaTeX help', function () {
    var expression = _index.indexjs.parse('help(parse)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{help}\\left( parse\\right)');
  });
});
