"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require("./../utils/collection/deepMap");

var _number = require("../utils/number");

'use strict';

function factory(type, config, load, typed) {
  /**
   * Create a string or convert any object into a string.
   * Elements of Arrays and Matrices are processed element wise.
   *
   * Syntax:
   *
   *    math.string(value)
   *
   * Examples:
   *
   *    math.string(4.2);               // returns string '4.2'
   *    math.string(math.complex(3, 2); // returns string '3 + 2i'
   *
   *    var u = math.unit(5, 'km');
   *    math.string(u.to('m'));         // returns string '5000 m'
   *
   *    math.string([true, false]);     // returns ['true', 'false']
   *
   * See also:
   *
   *    bignumber, boolean, complex, index, matrix, number, unit
   *
   * @param {* | Array | Matrix | null} [value]  A value to convert to a string
   * @return {string | Array | Matrix} The created string
   */
  var string = typed('string', {
    '': function _() {
      return '';
    },

    'number': _number.format,

    'null': function _null(x) {
      return 'null';
    },

    'boolean': function boolean(x) {
      return x + '';
    },

    'string': function string(x) {
      return x;
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, string);
    },

    'any': function any(x) {
      return String(x);
    }
  });

  string.toTex = {
    0: '\\mathtt{""}',
    1: '\\mathrm{string}\\left(${args[0]}\\right)'
  };

  return string;
}

var name_name = 'string';
var factory_factory = factory;
exports.name = name_name;
exports.factory = factory_factory;
