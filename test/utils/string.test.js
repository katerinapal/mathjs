import assert_moduleDefault from "assert";
import * as approxjs from "../../tools/approx";
import decimal_moduleDefault from "decimal.js";
import { math as indexjs } from "../../index";
import { string as stringjs } from "../../lib/utils/string";
// test string utils
var assert = {};
var approx = approxjs;
var BigNumber = {};
var math = indexjs;
var string = stringjs;

describe ('string', function () {

  it('isString', function() {
    assert.equal(stringjs.isString('hi'), true);
    assert.equal(stringjs.isString(String('hi')), true);

    assert.equal(stringjs.isString(23), false);
    assert.equal(stringjs.isString(true), false);
    assert.equal(stringjs.isString(new Date()), false);

    // we don't support non primitive Strings anymore
    assert.equal(stringjs.isString(new String('hi')), false);
  });

  it('endsWith', function() {
    assert.equal(stringjs.endsWith('hello', 'hello'), true);
    assert.equal(stringjs.endsWith('hello', 'lo'), true);
    assert.equal(stringjs.endsWith('hello', ''), true);

    assert.equal(stringjs.endsWith('hello!', 'lo'), false);
    assert.equal(stringjs.endsWith('hello', 'LO'), false);
    assert.equal(stringjs.endsWith('hello', 'hellohello'), false);
  });

  describe('format', function () {

    it ('should format null', function () {
      assert.equal(stringjs.format(null), 'null');
    });

    it ('should format undefined', function () {
      assert.equal(stringjs.format(undefined), 'undefined');
    });

    it ('should format a number', function () {
      assert.equal(stringjs.format(2.3), '2.3');
    });

    it ('should format a bignumber', function () {
      var B = BigNumber.config({
        precision: 20
      });
      assert.equal(stringjs.format(new B(1).div(3)), '0.33333333333333333333');
    });

    it ('should format a fraction without options', function () {
      assert.equal(stringjs.format(indexjs.fraction(1,3)), '1/3');
      assert.equal(stringjs.format(indexjs.fraction(2,6)), '1/3');
      assert.equal(stringjs.format(indexjs.fraction(-0.125)), '-1/8');
    });

    it ('should format a fraction with option fraction=\'ratio\'', function () {
      assert.equal(stringjs.format(indexjs.fraction(1,3), {fraction: 'ratio'}), '1/3');
      assert.equal(stringjs.format(indexjs.fraction(2,6), {fraction: 'ratio'}), '1/3');
    });

    it ('should format a fraction with option fraction=\'decimal\'', function () {
      assert.equal(stringjs.format(indexjs.fraction(1,3), {fraction: 'decimal'}), '0.(3)');
      assert.equal(stringjs.format(indexjs.fraction(2,6), {fraction: 'decimal'}), '0.(3)');
    });

    it ('should format a number with configuration', function () {
      assert.equal(stringjs.format(1.23456, 3), '1.23');
      assert.equal(stringjs.format(1.23456, {precision: 3}), '1.23');
    });

    it ('should format an array', function () {
      assert.equal(stringjs.format([1,2,3]), '[1, 2, 3]');
      assert.equal(stringjs.format([[1,2],[3,4]]), '[[1, 2], [3, 4]]');
    });

    it ('should format a string', function () {
      assert.equal(stringjs.format('string'), '"string"');
    });

    it ('should format an object', function () {
      var obj = {
        a: 1.1111,
        b: indexjs.complex(2.2222,3)
      };

      assert.equal(stringjs.format(obj), '{"a": 1.1111, "b": 2.2222 + 3i}');
      assert.equal(stringjs.format(obj, 3), '{"a": 1.11, "b": 2.22 + 3i}');
    });

    it ('should format an object with its own format function', function () {
      var obj = {
        format: function (options) {
          var str = 'obj';
          if (options !== undefined) {
            str += ' ' + JSON.stringify(options);
          }
          return str;
        }
      };

      assert.equal(stringjs.format(obj), 'obj');
      assert.equal(stringjs.format(obj, 4), 'obj 4');
      assert.equal(stringjs.format(obj, {precision: 4}), 'obj {"precision":4}');
    });

    it ('should format a function', function () {
      assert.equal(stringjs.format(function (a, b) {return a + b}), 'function');
      var f = function (a, b) {return a + b};
      f.syntax = 'f(x, y)';
      assert.equal(stringjs.format(f), 'f(x, y)');
    });

    it ('should format unknown objects by converting them to string', function () {
      assert.equal(stringjs.format({}), '{}');
    });

    it ('should format unknown primitives by converting them to string', function () {
      assert.equal(stringjs.format(true), 'true');
    });

  });

});