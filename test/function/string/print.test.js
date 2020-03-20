"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _index = require("../../../index");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

describe('print', function () {

  it('should interpolate values in a template', function () {
    _assert2.default.equal(_index.indexjs.print('hello, $name!', { name: 'user' }), 'hello, user!');
  });

  it('should interpolate values from a nested object in a template', function () {
    _assert2.default.equal(_index.indexjs.print('hello, $name.first $name.last!', {
      name: {
        first: 'first',
        last: 'last'
      }
    }), 'hello, first last!');
  });

  it('should round interpolate values with provided precision', function () {
    _assert2.default.equal(_index.indexjs.print('pi=$pi', { pi: _index.indexjs.pi }, 3), 'pi=3.14');
  });

  it('should leave unresolved variables untouched', function () {
    _assert2.default.equal(_index.indexjs.print('$a,$b', { b: 2 }), '$a,2');
    _assert2.default.equal(_index.indexjs.print('$a.value,$b.value', { a: {}, b: { value: 2 } }), '$a.value,2');
  });

  it('should leave trailing point intact', function () {
    _assert2.default.equal(_index.indexjs.print('Hello $name.', { name: 'user' }), 'Hello user.');
    _assert2.default.equal(_index.indexjs.print('Hello $name...', { name: 'user' }), 'Hello user...');
    _assert2.default.equal(_index.indexjs.print('Hello $user.name.', { user: { name: 'user' } }), 'Hello user.');
  });

  it('should throw an error on wrong number of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.print();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.print('');
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      _index.indexjs.print('', {}, 6, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error on wrong type of arguments', function () {
    _assert2.default.throws(function () {
      _index.indexjs.print('', 2);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX print', function () {
    var expression = _index.indexjs.parse('print(template,values)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{print}\\left( template, values\\right)');
  });
});
