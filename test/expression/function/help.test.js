import assert_moduleDefault from "assert";
import * as indexjs from "../../../lib/error/index";
import { math as indexjs } from "../../../index";
var assert = {},
    error = indexjs,
    math = indexjs;

describe('help', function() {

  it('should find documentation for a function by its name', function() {
    var help = indexjs.help('sin');
    assert.ok(help instanceof indexjs.type.Help);
    assert.deepEqual(help.doc, indexjs.expression.docs.sin);
  });

  it('should find documentation for a function by the function itself', function() {
    var help = indexjs.help(indexjs.sin);
    assert.ok(help instanceof indexjs.type.Help);
    assert.deepEqual(help.doc, indexjs.expression.docs.sin);
  });

  it('should throw an error on wrong number of arguments', function() {
    assert.throws(function () {indexjs.help()}, /TypeError: Too few arguments/);
    assert.throws(function () {indexjs.help('sin', 2)}, /TypeError: Too many arguments/);
  });

  it('should find help from a function name', function() {
    var help = indexjs.help('sin');
    assert(help instanceof indexjs.type.Help);
    assert.equal(help.doc.name, 'sin');
  });

  it('should find help from a function', function() {
    var help = indexjs.help(indexjs.sin);
    assert(help instanceof indexjs.type.Help);
    assert.equal(help.doc.name, 'sin');
  });

  it('should find help from a constant name', function() {
    var help = indexjs.help('pi');
    assert(help instanceof indexjs.type.Help);
    assert.equal(help.doc.name, 'pi');
  });

  it('should find help from a constant', function() {
    var help = indexjs.help(indexjs.pi);
    assert(help instanceof indexjs.type.Help);
    assert.equal(help.doc.name, 'pi');
  });

  it('should throw an error when no help is found', function() {
    // assert.throws(function () {math.help(undefined)}, /No documentation found/);
    assert.throws(function () {indexjs.help(new Date())}, /No documentation found/);
    assert.throws(function () {indexjs.help('nonExistingFunction')}, /No documentation found/);
    assert.throws(function () {indexjs.help('parse')}, /No documentation found/);
  });

  it('should LaTeX help', function () {
    var expression = indexjs.parse('help(parse)');
    assert.equal(expression.toTex(), '\\mathrm{help}\\left( parse\\right)');
  });

});
