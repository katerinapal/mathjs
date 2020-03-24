"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.math = exports.lazy = exports.factory = undefined;

var _object = require("./utils/object");

var _constants = require("./utils/bignumber/constants");

var _array = require("./utils/array");

var utilsarray_obj = _interopRequireWildcard(_array);

var _version = require("./version");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

'use strict';

function factory(type, config, load, typed, math) {
  // listen for changed in the configuration, automatically reload
  // constants when needed
  math.on('config', function (curr, prev) {
    if (curr.number !== prev.number) {
      factory(type, config, load, typed, math);
    }
  });

  math['true'] = true;
  math['false'] = false;
  math['null'] = null;
  math['uninitialized'] = utilsarray_obj.UNINITIALIZED;

  if (config.number === 'BigNumber') {
    math['Infinity'] = new type.BigNumber(Infinity);
    math['NaN'] = new type.BigNumber(NaN);

    (0, _object.lazy)(math, 'pi', function () {
      return bigConstants.pi(type.BigNumber);
    });
    (0, _object.lazy)(math, 'tau', function () {
      return bigConstants.tau(type.BigNumber);
    });
    (0, _object.lazy)(math, 'e', function () {
      return bigConstants.e(type.BigNumber);
    });
    (0, _object.lazy)(math, 'phi', function () {
      return bigConstants.phi(type.BigNumber);
    }); // golden ratio, (1+sqrt(5))/2

    // uppercase constants (for compatibility with built-in Math)
    (0, _object.lazy)(math, 'E', function () {
      return math.e;
    });
    (0, _object.lazy)(math, 'LN2', function () {
      return new type.BigNumber(2).ln();
    });
    (0, _object.lazy)(math, 'LN10', function () {
      return new type.BigNumber(10).ln();
    });
    (0, _object.lazy)(math, 'LOG2E', function () {
      return new type.BigNumber(1).div(new type.BigNumber(2).ln());
    });
    (0, _object.lazy)(math, 'LOG10E', function () {
      return new type.BigNumber(1).div(new type.BigNumber(10).ln());
    });
    (0, _object.lazy)(math, 'PI', function () {
      return math.pi;
    });
    (0, _object.lazy)(math, 'SQRT1_2', function () {
      return new type.BigNumber('0.5').sqrt();
    });
    (0, _object.lazy)(math, 'SQRT2', function () {
      return new type.BigNumber(2).sqrt();
    });
  } else {
    math['Infinity'] = Infinity;
    math['NaN'] = NaN;

    math.pi = Math.PI;
    math.tau = Math.PI * 2;
    math.e = Math.E;
    math.phi = 1.61803398874989484820458683436563811772030917980576286213545; // golden ratio, (1+sqrt(5))/2

    // uppercase constants (for compatibility with built-in Math)
    math.E = math.e;
    math.LN2 = Math.LN2;
    math.LN10 = Math.LN10;
    math.LOG2E = Math.LOG2E;
    math.LOG10E = Math.LOG10E;
    math.PI = math.pi;
    math.SQRT1_2 = Math.SQRT1_2;
    math.SQRT2 = Math.SQRT2;
  }

  // complex i
  math.i = type.Complex.I;

  // meta information
  math.version = _version.versionjs;
}

var factory_factory = factory;
var lazy_lazy = false;
var math_math = true;
exports.factory = factory_factory;
exports.lazy = lazy_lazy;
exports.math = math_math;
