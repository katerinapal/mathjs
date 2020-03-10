import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
// test print
var assert = {},
    error = indexjs,
    math = indexjs;

describe('print', function() {

  it('should interpolate values in a template', function() {
    assert.equal(indexjs.print('hello, $name!', {name: 'user'}), 'hello, user!');
  });

  it('should interpolate values from a nested object in a template', function() {
    assert.equal(indexjs.print('hello, $name.first $name.last!', {
      name: {
        first: 'first',
        last: 'last'
      }
    }), 'hello, first last!');
  });

  it('should round interpolate values with provided precision', function() {
    assert.equal(indexjs.print('pi=$pi', {pi: indexjs.pi}, 3), 'pi=3.14');
  });

  it('should leave unresolved variables untouched', function() {
    assert.equal(indexjs.print('$a,$b', {b: 2}), '$a,2');
    assert.equal(indexjs.print('$a.value,$b.value', {a: {}, b: {value: 2}}), '$a.value,2');
  });

  it('should leave trailing point intact', function() {
    assert.equal(indexjs.print('Hello $name.', {name: 'user'}), 'Hello user.');
    assert.equal(indexjs.print('Hello $name...', {name: 'user'}), 'Hello user...');
    assert.equal(indexjs.print('Hello $user.name.', {user: {name: 'user'}}), 'Hello user.');
  });

  it('should throw an error on wrong number of arguments', function() {
    assert.throws (function () {indexjs.print()}, /TypeError: Too few arguments/);
    assert.throws (function () {indexjs.print('')}, /TypeError: Too few arguments/);
    assert.throws (function () {indexjs.print('', {}, 6, 2)}, /TypeError: Too many arguments/);
  });

  it('should throw an error on wrong type of arguments', function() {
    assert.throws (function () {indexjs.print('', 2)}, /TypeError: Unexpected type of argument/);
  });

  it('should LaTeX print', function () {
    var expression = indexjs.parse('print(template,values)');
    assert.equal(expression.toTex(), '\\mathrm{print}\\left( template, values\\right)');
  });

});
