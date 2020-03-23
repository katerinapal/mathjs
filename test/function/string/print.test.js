import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
// test print
var error = require('../../../lib/error/index');

describe('print', function() {

  it('should interpolate values in a template', function() {
    assert.equal(index_indexjsjs.print('hello, $name!', {name: 'user'}), 'hello, user!');
  });

  it('should interpolate values from a nested object in a template', function() {
    assert.equal(index_indexjsjs.print('hello, $name.first $name.last!', {
      name: {
        first: 'first',
        last: 'last'
      }
    }), 'hello, first last!');
  });

  it('should round interpolate values with provided precision', function() {
    assert.equal(index_indexjsjs.print('pi=$pi', {pi: index_indexjsjs.pi}, 3), 'pi=3.14');
  });

  it('should leave unresolved variables untouched', function() {
    assert.equal(index_indexjsjs.print('$a,$b', {b: 2}), '$a,2');
    assert.equal(index_indexjsjs.print('$a.value,$b.value', {a: {}, b: {value: 2}}), '$a.value,2');
  });

  it('should leave trailing point intact', function() {
    assert.equal(index_indexjsjs.print('Hello $name.', {name: 'user'}), 'Hello user.');
    assert.equal(index_indexjsjs.print('Hello $name...', {name: 'user'}), 'Hello user...');
    assert.equal(index_indexjsjs.print('Hello $user.name.', {user: {name: 'user'}}), 'Hello user.');
  });

  it('should throw an error on wrong number of arguments', function() {
    assert.throws (function () {index_indexjsjs.print()}, /TypeError: Too few arguments/);
    assert.throws (function () {index_indexjsjs.print('')}, /TypeError: Too few arguments/);
    assert.throws (function () {index_indexjsjs.print('', {}, 6, 2)}, /TypeError: Too many arguments/);
  });

  it('should throw an error on wrong type of arguments', function() {
    assert.throws (function () {index_indexjsjs.print('', 2)}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX print', function () {
    var expression = index_indexjsjs.parse('print(template,values)');
    assert.equal(expression.toTex(), '\\mathrm{print}\\left( template, values\\right)');
  });

});
