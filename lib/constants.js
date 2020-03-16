import { lazy as utilsobject_lazyjs } from "./utils/object";
import { e as utilsbignumberconstants_ejs } from "./utils/bignumber/constants";
import { utilsarray_obj } from "./utils/array";
import * as version_obj from "./version";
'use strict';

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
  math['uninitialized'] = utilsarray_obj.UNINITIALIZED;

  if (config.number === 'BigNumber') {
    math['Infinity'] = new type.BigNumber(Infinity);
    math['NaN']      = new type.BigNumber(NaN);

    utilsobject_lazyjs(math, 'pi',  function () {return utilsbignumberconstants_ejs(type.BigNumber);});
    utilsobject_lazyjs(math, 'tau', function () {return utilsbignumberconstants_ejs(type.BigNumber);});
    utilsobject_lazyjs(math, 'e',   function () {return utilsbignumberconstants_ejs(type.BigNumber);});
    utilsobject_lazyjs(math, 'phi', function () {return utilsbignumberconstants_ejs(type.BigNumber);}); // golden ratio, (1+sqrt(5))/2

    // uppercase constants (for compatibility with built-in Math)
    utilsobject_lazyjs(math, 'E',       function () {return math.e;});
    utilsobject_lazyjs(math, 'LN2',     function () {return new type.BigNumber(2).ln();});
    utilsobject_lazyjs(math, 'LN10',    function () {return new type.BigNumber(10).ln()});
    utilsobject_lazyjs(math, 'LOG2E',   function () {return new type.BigNumber(1).div(new type.BigNumber(2).ln());});
    utilsobject_lazyjs(math, 'LOG10E',  function () {return new type.BigNumber(1).div(new type.BigNumber(10).ln())});
    utilsobject_lazyjs(math, 'PI',      function () {return math.pi});
    utilsobject_lazyjs(math, 'SQRT1_2', function () {return new type.BigNumber('0.5').sqrt()});
    utilsobject_lazyjs(math, 'SQRT2',   function () {return new type.BigNumber(2).sqrt()});
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
  math.version = version_obj;
}

var factory_factory = factory;
var lazy_lazy = false;
var math_math = true;
export { factory_factory as factory };
export { lazy_lazy as lazy };
export { math_math as math };