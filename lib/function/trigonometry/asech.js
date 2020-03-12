"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.name = undefined;

var _deepMap = require("../../utils/collection/deepMap");

var _acosh = require("./acosh");

var acosh_obj = _interopRequireWildcard(_acosh);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed) {
  var acosh = typed.find(load(acosh_obj), ['Complex']);

  /**
   * Calculate the hyperbolic arcsecant of a value,
   * defined as `asech(x) = acosh(1/x) = ln(sqrt(1/x^2 - 1) + 1/x)`.
   *
   * For matrices, the function is evaluated element wise.
   *
   * Syntax:
   *
   *    math.asech(x)
   *
   * Examples:
   *
   *    math.asech(0.5);       // returns 1.3169578969248166
   *
   * See also:
   *
   *    acsch, acoth
   *
   * @param {number | Complex | Array | Matrix} x  Function input
   * @return {number | Complex | Array | Matrix} Hyperbolic arcsecant of x
   */
  var asech = typed('asech', {
    'number': function number(x) {
      if (x <= 1 && x >= -1 || config.predictable) {
        x = 1 / x;

        var ret = Math.sqrt(x * x - 1);
        if (x > 0 || config.predictable) {
          return Math.log(ret + x);
        }

        return new type.Complex(Math.log(ret - x), Math.PI);
      }

      return new type.Complex(x, 0).asech();
    },

    'Complex': function Complex(x) {
      return x.asech();
    },

    'BigNumber': function BigNumber(x) {
      return new type.BigNumber(1).div(x).acosh();
    },

    'Array | Matrix': function ArrayMatrix(x) {
      return (0, _deepMap.deepMapjs)(x, asech);
    }
  });

  asech.toTex = { 1: '\\mathrm{sech}^{-1}\\left(${args[0]}\\right)' };

  return asech;
}

var name_exportedObj = 'asech';
var factory_exportedObj = factory;
exports.name = name_exportedObj;
exports.factory = factory_exportedObj;
