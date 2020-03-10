import assert from "assert";
import * as toolsapprox_obj from "../../tools/approx";
import decimal from "decimal.js";
import { index_obj } from "../../index";
import { libutilsstring_obj } from "../../lib/utils/string";
var approx = toolsapprox_obj;
var BigNumber = {};
var math = index_obj;
var string = libutilsstring_obj;

describe ('string', function () {

  it('isString', function() {
    assert.equal(libutilsstring_obj.isString('hi'), true);
    assert.equal(libutilsstring_obj.isString(String('hi')), true);

    assert.equal(libutilsstring_obj.isString(23), false);
    assert.equal(libutilsstring_obj.isString(true), false);
    assert.equal(libutilsstring_obj.isString(new Date()), false);

    // we don't support non primitive Strings anymore
    assert.equal(libutilsstring_obj.isString(new String('hi')), false);
  });

  it('endsWith', function() {
    assert.equal(libutilsstring_obj.endsWith('hello', 'hello'), true);
    assert.equal(libutilsstring_obj.endsWith('hello', 'lo'), true);
    assert.equal(libutilsstring_obj.endsWith('hello', ''), true);

    assert.equal(libutilsstring_obj.endsWith('hello!', 'lo'), false);
    assert.equal(libutilsstring_obj.endsWith('hello', 'LO'), false);
    assert.equal(libutilsstring_obj.endsWith('hello', 'hellohello'), false);
  });

  describe('format', function () {

    it ('should format null', function () {
      assert.equal(libutilsstring_obj.format(null), 'null');
    });

    it ('should format undefined', function () {
      assert.equal(libutilsstring_obj.format(undefined), 'undefined');
    });

    it ('should format a number', function () {
      assert.equal(libutilsstring_obj.format(2.3), '2.3');
    });

    it ('should format a bignumber', function () {
      var B = BigNumber.config({
        precision: 20
      });
      assert.equal(libutilsstring_obj.format(new B(1).div(3)), '0.33333333333333333333');
    });

    it ('should format a fraction without options', function () {
      assert.equal(libutilsstring_obj.format(index_obj.fraction(1,3)), '1/3');
      assert.equal(libutilsstring_obj.format(index_obj.fraction(2,6)), '1/3');
      assert.equal(libutilsstring_obj.format(index_obj.fraction(-0.125)), '-1/8');
    });

    it ('should format a fraction with option fraction=\'ratio\'', function () {
      assert.equal(libutilsstring_obj.format(index_obj.fraction(1,3), {fraction: 'ratio'}), '1/3');
      assert.equal(libutilsstring_obj.format(index_obj.fraction(2,6), {fraction: 'ratio'}), '1/3');
    });

    it ('should format a fraction with option fraction=\'decimal\'', function () {
      assert.equal(libutilsstring_obj.format(index_obj.fraction(1,3), {fraction: 'decimal'}), '0.(3)');
      assert.equal(libutilsstring_obj.format(index_obj.fraction(2,6), {fraction: 'decimal'}), '0.(3)');
    });

    it ('should format a number with configuration', function () {
      assert.equal(libutilsstring_obj.format(1.23456, 3), '1.23');
      assert.equal(libutilsstring_obj.format(1.23456, {precision: 3}), '1.23');
    });

    it ('should format an array', function () {
      assert.equal(libutilsstring_obj.format([1,2,3]), '[1, 2, 3]');
      assert.equal(libutilsstring_obj.format([[1,2],[3,4]]), '[[1, 2], [3, 4]]');
    });

    it ('should format a string', function () {
      assert.equal(libutilsstring_obj.format('string'), '"string"');
    });

    it ('should format an object', function () {
      var obj = {
        a: 1.1111,
        b: index_obj.complex(2.2222,3)
      };

      assert.equal(libutilsstring_obj.format(obj), '{"a": 1.1111, "b": 2.2222 + 3i}');
      assert.equal(libutilsstring_obj.format(obj, 3), '{"a": 1.11, "b": 2.22 + 3i}');
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

      assert.equal(libutilsstring_obj.format(obj), 'obj');
      assert.equal(libutilsstring_obj.format(obj, 4), 'obj 4');
      assert.equal(libutilsstring_obj.format(obj, {precision: 4}), 'obj {"precision":4}');
    });

    it ('should format a function', function () {
      assert.equal(libutilsstring_obj.format(function (a, b) {return a + b}), 'function');
      var f = function (a, b) {return a + b};
      f.syntax = 'f(x, y)';
      assert.equal(libutilsstring_obj.format(f), 'f(x, y)');
    });

    it ('should format unknown objects by converting them to string', function () {
      assert.equal(libutilsstring_obj.format({}), '{}');
    });

    it ('should format unknown primitives by converting them to string', function () {
      assert.equal(libutilsstring_obj.format(true), 'true');
    });

  });

});