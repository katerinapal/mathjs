"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.math = exports.lazy = exports.factory = undefined;

var _object = require("../../utils/object");

function factory(type, config, load, typed, math) {

  // helper function to create a unit with a fixed prefix
  function fixedUnit(str) {
    var unit = type.Unit.parse(str);
    unit.fixPrefix = true;
    return unit;
  }

  // Source: http://www.wikiwand.com/en/Physical_constant

  // Universal constants
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;

  // Electromagnetic constants
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  //lazy(math, 'josephson',                 function () {return fixedUnit('4.8359787011e-14 Hz V^-1')});  // TODO: support for Hz needed

  // Atomic and nuclear constants
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;

  // Physico-chemical constants
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  // lazy(math, 'spectralRadiance',   function () {return fixedUnit('1.19104286953e-16 W m^2 sr^-1')}); // TODO spectralRadiance
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;

  // Adopted values
  _object.lazy;
  _object.lazy;
  _object.lazy;
  // atm is defined in Unit.js

  // Natural units
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
  _object.lazy;
}

var factory_factory = factory;
var lazy_lazy = false;
var math_math = true;
exports.factory = factory_factory;
exports.lazy = lazy_lazy;
exports.math = math_math;
