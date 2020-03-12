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
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;

  // Electromagnetic constants
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  //lazy(math, 'josephson',                 function () {return fixedUnit('4.8359787011e-14 Hz V^-1')});  // TODO: support for Hz needed

  // Atomic and nuclear constants
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;

  // Physico-chemical constants
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  // lazy(math, 'spectralRadiance',   function () {return fixedUnit('1.19104286953e-16 W m^2 sr^-1')}); // TODO spectralRadiance
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;

  // Adopted values
  _object.clone;
  _object.clone;
  _object.clone;
  // atm is defined in Unit.js

  // Natural units
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
  _object.clone;
}

var factory_exportedObj = factory;
var lazy_exportedObj = false;
var math_exportedObj = true;
exports.factory = factory_exportedObj;
exports.lazy = lazy_exportedObj;
exports.math = math_exportedObj;
