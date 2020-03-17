'use strict';

var _assert = require('assert');

var _assert2 = _interopRequireDefault(_assert);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// test print
var error = require('../../../lib/error/index'),
    math = require('../../../index');

describe('print', function () {

  it('should interpolate values in a template', function () {
    _assert2.default.equal(math.print('hello, $name!', { name: 'user' }), 'hello, user!');
  });

  it('should interpolate values from a nested object in a template', function () {
    _assert2.default.equal(math.print('hello, $name.first $name.last!', {
      name: {
        first: 'first',
        last: 'last'
      }
    }), 'hello, first last!');
  });

  it('should round interpolate values with provided precision', function () {
    _assert2.default.equal(math.print('pi=$pi', { pi: math.pi }, 3), 'pi=3.14');
  });

  it('should leave unresolved variables untouched', function () {
    _assert2.default.equal(math.print('$a,$b', { b: 2 }), '$a,2');
    _assert2.default.equal(math.print('$a.value,$b.value', { a: {}, b: { value: 2 } }), '$a.value,2');
  });

  it('should leave trailing point intact', function () {
    _assert2.default.equal(math.print('Hello $name.', { name: 'user' }), 'Hello user.');
    _assert2.default.equal(math.print('Hello $name...', { name: 'user' }), 'Hello user...');
    _assert2.default.equal(math.print('Hello $user.name.', { user: { name: 'user' } }), 'Hello user.');
  });

  it('should throw an error on wrong number of arguments', function () {
    _assert2.default.throws(function () {
      math.print();
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      math.print('');
    }, /TypeError: Too few arguments/);
    _assert2.default.throws(function () {
      math.print('', {}, 6, 2);
    }, /TypeError: Too many arguments/);
  });

  it('should throw an error on wrong type of arguments', function () {
    _assert2.default.throws(function () {
      math.print('', 2);
    }, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX print', function () {
    var expression = math.parse('print(template,values)');
    _assert2.default.equal(expression.toTex(), '\\mathrm{print}\\left( template, values\\right)');
  });
});
