import { clone as lazy } from "../../utils/object";


function factory (type, config, load, typed, math) {

  // helper function to create a unit with a fixed prefix
  function fixedUnit(str) {
    var unit = type.Unit.parse(str);
    unit.fixPrefix = true;
    return unit;
  }

  // Source: http://www.wikiwand.com/en/Physical_constant

  // Universal constants
  lazy;
  lazy;
  lazy;
  lazy;

  // Electromagnetic constants
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  //lazy(math, 'josephson',                 function () {return fixedUnit('4.8359787011e-14 Hz V^-1')});  // TODO: support for Hz needed

  // Atomic and nuclear constants
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;

  // Physico-chemical constants
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  // lazy(math, 'spectralRadiance',   function () {return fixedUnit('1.19104286953e-16 W m^2 sr^-1')}); // TODO spectralRadiance
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;

  // Adopted values
  lazy;
  lazy;
  lazy;
  // atm is defined in Unit.js

  // Natural units
  lazy;
  lazy;
  lazy;
  lazy;
  lazy;

}

var factory_exportedObj = factory;
var lazy_exportedObj = false;
var math_exportedObj = true;
export { factory_exportedObj as factory };
export { lazy_exportedObj as lazy };
export { math_exportedObj as math };
