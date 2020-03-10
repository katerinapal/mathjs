import { utilsobject } from "./utils/object";
import { utilsbignumberconstants } from "./utils/bignumber/constants";
import { utilsarray } from "./utils/array";
import * as version from "./version";
'use strict';

var object = utilsobject;
var bigConstants = utilsbignumberconstants;

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
  math['uninitialized'] = utilsarray.UNINITIALIZED;

  if (config.number === 'BigNumber') {
    math['Infinity'] = new type.BigNumber(Infinity);
    math['NaN']      = new type.BigNumber(NaN);

    utilsobject.lazy(math, 'pi',  function () {return utilsbignumberconstants.pi(type.BigNumber);});
    utilsobject.lazy(math, 'tau', function () {return utilsbignumberconstants.tau(type.BigNumber);});
    utilsobject.lazy(math, 'e',   function () {return utilsbignumberconstants(type.BigNumber);});
    utilsobject.lazy(math, 'phi', function () {return utilsbignumberconstants.phi(type.BigNumber);}); // golden ratio, (1+sqrt(5))/2

    // uppercase constants (for compatibility with built-in Math)
    utilsobject.lazy(math, 'E',       function () {return math.e;});
    utilsobject.lazy(math, 'LN2',     function () {return new type.BigNumber(2).ln();});
    utilsobject.lazy(math, 'LN10',    function () {return new type.BigNumber(10).ln()});
    utilsobject.lazy(math, 'LOG2E',   function () {return new type.BigNumber(1).div(new type.BigNumber(2).ln());});
    utilsobject.lazy(math, 'LOG10E',  function () {return new type.BigNumber(1).div(new type.BigNumber(10).ln())});
    utilsobject.lazy(math, 'PI',      function () {return math.pi});
    utilsobject.lazy(math, 'SQRT1_2', function () {return new type.BigNumber('0.5').sqrt()});
    utilsobject.lazy(math, 'SQRT2',   function () {return new type.BigNumber(2).sqrt()});
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
  math.version = version;
}

var factory_exportedObj = factory;
var lazy_exportedObj = false;
var math_exportedObj = true;
export { factory_exportedObj as factory };
export { lazy_exportedObj as lazy };
export { math_exportedObj as math };