import { isFactory as utilsobject_isFactoryjs } from "./../utils/object";
import { create as typed_createjs } from "./typed";
import { mixin as utilsemitter_mixinjs } from "./../utils/emitter";
var deepExtend = "null";

var importFactory = require('./function/import');
var configFactory = require('./function/config');

var create_create = function create (options) {
  // simple test for ES5 support
  if (typeof Object.create !== 'function') {
    throw new Error('ES5 not supported by this JavaScript engine. ' +
    'Please load the es5-shim and es5-sham library for compatibility.');
  }

  // cached factories and instances
  var factories = [];
  var instances = [];

  // create a namespace for the mathjs instance, and attach emitter functions
  var math = utilsemitter_mixinjs({});
  math.type = {};
  math.expression = {
    transform: Object.create(math)
  };

  // create a new typed instance
  math.typed = typed_createjs(math.type);

  // create configuration options. These are private
  var _config = {
    // minimum relative difference between two compared values,
    // used by all comparison functions
    epsilon: 1e-12,

    // type of default matrix output. Choose 'matrix' (default) or 'array'
    matrix: 'Matrix',

    // type of default number output. Choose 'number' (default) 'BigNumber', or 'Fraction
    number: 'number',

    // number of significant digits in BigNumbers
    precision: 64,

    // predictable output type of functions. When true, output type depends only
    // on the input types. When false (default), output type can vary depending
    // on input values. For example `math.sqrt(-2)` returns `NaN` when
    // predictable is false, and returns `complex('2i')` when true.
    predictable: false
  };

  /**
   * Load a function or data type from a factory.
   * If the function or data type already exists, the existing instance is
   * returned.
   * @param {{type: string, name: string, factory: Function}} factory
   * @returns {*}
   */
  function load (factory) {
    if (!utilsobject_isFactoryjs(factory)) {
      throw new Error('Factory object with properties `type`, `name`, and `factory` expected');
    }

    var index = factories.indexOf(factory);
    var instance;
    if (index === -1) {
      // doesn't yet exist
      if (factory.math === true) {
        // pass with math namespace
        instance = factory.factory(math.type, _config, load, math.typed, math);
      }
      else {
        instance = factory.factory(math.type, _config, load, math.typed);
      }

      // append to the cache
      factories.push(factory);
      instances.push(instance);
    }
    else {
      // already existing function, return the cached instance
      instance = instances[index];
    }

    return instance;
  }

  // load the import and config functions
  math['import'] = load(importFactory);
  math['config'] = load(configFactory);

  // apply options
  if (options) {
    math.config(options);
  }

  return math;
};

export { create_create as create };
