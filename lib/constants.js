import { object as objectjs } from "./utils/object";
import { bigConstants as constantsjs } from "./utils/bignumber/constants";
import { size as arrayjs } from "./utils/array";
import * as versionjs from "./version";
'use strict';

var object = objectjs;
var bigConstants = constantsjs;

function factory (type, config, load, typed, math) {
  // listen for changed in the configuration, automatically reload
  // constants when needed
  math.on('config', function (curr, prev) {
    if (curr.number !== prev.number) {
      factory(type, config, load, typed, math);
    }
  });

  math['true']     = true;
  math['false']    = false;
  math['null']     = null;
  math['uninitialized'] = arrayjs.UNINITIALIZED;

  if (config.number === 'BigNumber') {
    math['Infinity'] = new type.BigNumber(Infinity);
    math['NaN']      = new type.BigNumber(NaN);

    objectjs.lazy(math, 'pi',  function () {return constantsjs.pi(type.BigNumber);});
    objectjs.lazy(math, 'tau', function () {return constantsjs.tau(type.BigNumber);});
    objectjs.lazy(math, 'e',   function () {return constantsjs(type.BigNumber);});
    objectjs.lazy(math, 'phi', function () {return constantsjs.phi(type.BigNumber);}); // golden ratio, (1+sqrt(5))/2

    // uppercase constants (for compatibility with built-in Math)
    objectjs.lazy(math, 'E',       function () {return math.e;});
    objectjs.lazy(math, 'LN2',     function () {return new type.BigNumber(2).ln();});
    objectjs.lazy(math, 'LN10',    function () {return new type.BigNumber(10).ln()});
    objectjs.lazy(math, 'LOG2E',   function () {return new type.BigNumber(1).div(new type.BigNumber(2).ln());});
    objectjs.lazy(math, 'LOG10E',  function () {return new type.BigNumber(1).div(new type.BigNumber(10).ln())});
    objectjs.lazy(math, 'PI',      function () {return math.pi});
    objectjs.lazy(math, 'SQRT1_2', function () {return new type.BigNumber('0.5').sqrt()});
    objectjs.lazy(math, 'SQRT2',   function () {return new type.BigNumber(2).sqrt()});
  }
  else {
    math['Infinity'] = Infinity;
    math['NaN']      = NaN;

    math.pi  = Math.PI;
    math.tau = Math.PI * 2;
    math.e   = Math.E;
    math.phi = 1.61803398874989484820458683436563811772030917980576286213545; // golden ratio, (1+sqrt(5))/2

    // uppercase constants (for compatibility with built-in Math)
    math.E           = math.e;
    math.LN2         = Math.LN2;
    math.LN10        = Math.LN10;
    math.LOG2E       = Math.LOG2E;
    math.LOG10E      = Math.LOG10E;
    math.PI          = math.pi;
    math.SQRT1_2     = Math.SQRT1_2;
    math.SQRT2       = Math.SQRT2;
  }

  // complex i
  math.i = type.Complex.I;

  // meta information
  math.version = versionjs;
}

var factory_exportedObj = factory;
var lazy_exportedObj = false;
var math_exportedObj = true;
export { factory_exportedObj as factory };
export { lazy_exportedObj as lazy };
export { math_exportedObj as math };