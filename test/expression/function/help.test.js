import assert from "assert";
import { indexjs as index_indexjsjs } from "../../../index";
var error = {};

describe('help', function() {

  it('should find documentation for a function by its name', function() {
    var help = index_indexjsjs.help('sin');
    assert.ok(help instanceof index_indexjsjs.type.Help);
    assert.deepEqual(help.doc, index_indexjsjs.expression.docs.sin);
  });

  it('should find documentation for a function by the function itself', function() {
    var help = index_indexjsjs.help(index_indexjsjs.sin);
    assert.ok(help instanceof index_indexjsjs.type.Help);
    assert.deepEqual(help.doc, index_indexjsjs.expression.docs.sin);
  });

  it('should throw an error on wrong number of arguments', function() {
    assert.throws(function () {index_indexjsjs.help()}, /TypeError: Too few arguments/);
    assert.throws(function () {index_indexjsjs.help('sin', 2)}, /TypeError: Too many arguments/);
  });

  it('should find help from a function name', function() {
    var help = index_indexjsjs.help('sin');
    assert(help instanceof index_indexjsjs.type.Help);
    assert.equal(help.doc.name, 'sin');
  });

  it('should find help from a function', function() {
    var help = index_indexjsjs.help(index_indexjsjs.sin);
    assert(help instanceof index_indexjsjs.type.Help);
    assert.equal(help.doc.name, 'sin');
  });

  it('should find help from a constant name', function() {
    var help = index_indexjsjs.help('pi');
    assert(help instanceof index_indexjsjs.type.Help);
    assert.equal(help.doc.name, 'pi');
  });

  it('should find help from a constant', function() {
    var help = index_indexjsjs.help(index_indexjsjs.pi);
    assert(help instanceof index_indexjsjs.type.Help);
    assert.equal(help.doc.name, 'pi');
  });

  it('should throw an error when no help is found', function() {
    // assert.throws(function () {math.help(undefined)}, /No documentation found/);
    assert.throws(function () {index_indexjsjs.help(new Date())}, /No documentation found/);
    assert.throws(function () {index_indexjsjs.help('nonExistingFunction')}, /No documentation found/);
    assert.throws(function () {index_indexjsjs.help('parse')}, /No documentation found/);
  });

  it('should LaTeX help', function () {
    var expression = index_indexjsjs.parse('help(parse)');
    assert.equal(expression.toTex(), '\\mathrm{help}\\left( parse\\right)');
  });

});
