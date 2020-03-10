import { utilsobject_obj } from "../../utils/object";
var lazy = utilsobject_obj.lazy;


function factory (type, config, load, typed, math) {

  // helper function to create a unit with a fixed prefix
  function fixedUnit(str) {
    var unit = type.Unit.parse(str);
    unit.fixPrefix = true;
    return unit;
  }

  // Source: http://www.wikiwand.com/en/Physical_constant

  // Universal constants
  utilsobject_obj(math, 'speedOfLight',         function () {return fixedUnit('299792458 m s^-1')});
  utilsobject_obj(math, 'gravitationConstant',  function () {return fixedUnit('6.6738480e-11 m^3 kg^-1 s^-2')});
  utilsobject_obj(math, 'planckConstant',       function () {return fixedUnit('6.626069311e-34 J s')});
  utilsobject_obj(math, 'reducedPlanckConstant',function () {return fixedUnit('1.05457172647e-34 J s')});

  // Electromagnetic constants
  utilsobject_obj(math, 'magneticConstant',          function () {return fixedUnit('1.2566370614e-6 N A^-2')});
  utilsobject_obj(math, 'electricConstant',          function () {return fixedUnit('8.854187817e-12 F m^-1')});
  utilsobject_obj(math, 'vacuumImpedance',           function () {return fixedUnit('376.730313461 ohm')});
  utilsobject_obj(math, 'coulomb',                   function () {return fixedUnit('8.9875517873681764e9 N m^2 C^-2')});
  utilsobject_obj(math, 'elementaryCharge',          function () {return fixedUnit('1.60217656535e-19 C')});
  utilsobject_obj(math, 'bohrMagneton',              function () {return fixedUnit('9.2740096820e-24 J T^-1')});
  utilsobject_obj(math, 'conductanceQuantum',        function () {return fixedUnit('7.748091734625e-5 S')});
  utilsobject_obj(math, 'inverseConductanceQuantum', function () {return fixedUnit('12906.403721742 ohm')});
  utilsobject_obj(math, 'magneticFluxQuantum',       function () {return fixedUnit('2.06783375846e-15 Wb')});
  utilsobject_obj(math, 'nuclearMagneton',           function () {return fixedUnit('5.0507835311e-27 J T^-1')});
  utilsobject_obj(math, 'klitzing',                  function () {return fixedUnit('25812.807443484 ohm')});
  //lazy(math, 'josephson',                 function () {return fixedUnit('4.8359787011e-14 Hz V^-1')});  // TODO: support for Hz needed

  // Atomic and nuclear constants
  utilsobject_obj(math, 'bohrRadius',              function () {return fixedUnit('5.291772109217e-11 m')});
  utilsobject_obj(math, 'classicalElectronRadius', function () {return fixedUnit('2.817940326727e-15 m')});
  utilsobject_obj(math, 'electronMass',            function () {return fixedUnit('9.1093829140e-31 kg')});
  utilsobject_obj(math, 'fermiCoupling',           function () {return fixedUnit('1.1663645e-5 GeV^-2')});
  utilsobject_obj(math, 'fineStructure',           function () {return 7.297352569824e-3});
  utilsobject_obj(math, 'hartreeEnergy',           function () {return fixedUnit('4.3597443419e-18 J')});
  utilsobject_obj(math, 'protonMass',              function () {return fixedUnit('1.67262177774e-27 kg')});
  utilsobject_obj(math, 'deuteronMass',            function () {return fixedUnit('3.3435830926e-27 kg')});
  utilsobject_obj(math, 'neutronMass',             function () {return fixedUnit('1.6749271613e-27 kg')});
  utilsobject_obj(math, 'quantumOfCirculation',    function () {return fixedUnit('3.636947552024e-4 m^2 s^-1')});
  utilsobject_obj(math, 'rydberg',                 function () {return fixedUnit('10973731.56853955 m^-1')});
  utilsobject_obj(math, 'thomsonCrossSection',     function () {return fixedUnit('6.65245873413e-29 m^2')});
  utilsobject_obj(math, 'weakMixingAngle',         function () {return 0.222321});
  utilsobject_obj(math, 'efimovFactor',            function () {return 22.7});

  // Physico-chemical constants
  utilsobject_obj(math, 'atomicMass',          function () {return fixedUnit('1.66053892173e-27 kg')});
  utilsobject_obj(math, 'avogadro',            function () {return fixedUnit('6.0221412927e23 mol^-1')});
  utilsobject_obj(math, 'boltzmann',           function () {return fixedUnit('1.380648813e-23 J K^-1')});
  utilsobject_obj(math, 'faraday',             function () {return fixedUnit('96485.336521 C mol^-1')});
  utilsobject_obj(math, 'firstRadiation',      function () {return fixedUnit('3.7417715317e-16 W m^2')});
  // lazy(math, 'spectralRadiance',   function () {return fixedUnit('1.19104286953e-16 W m^2 sr^-1')}); // TODO spectralRadiance
  utilsobject_obj(math, 'loschmidt',           function () {return fixedUnit('2.686780524e25 m^-3')});
  utilsobject_obj(math, 'gasConstant',         function () {return fixedUnit('8.314462175 J K^-1 mol^-1')});
  utilsobject_obj(math, 'molarPlanckConstant', function () {return fixedUnit('3.990312717628e-10 J s mol^-1')});
  utilsobject_obj(math, 'molarVolume',         function () {return fixedUnit('2.241396820e-10 m^3 mol^-1')});
  utilsobject_obj(math, 'sackurTetrode',       function () {return -1.164870823});
  utilsobject_obj(math, 'secondRadiation',     function () {return fixedUnit('1.438777013e-2 m K')});
  utilsobject_obj(math, 'stefanBoltzmann',     function () {return fixedUnit('5.67037321e-8 W m^-2 K^-4')});
  utilsobject_obj(math, 'wienDisplacement',    function () {return fixedUnit('2.897772126e-3 m K')});

  // Adopted values
  utilsobject_obj(math, 'molarMass',         function () {return fixedUnit('1e-3 kg mol^-1')});
  utilsobject_obj(math, 'molarMassC12',      function () {return fixedUnit('1.2e-2 kg mol^-1')});
  utilsobject_obj(math, 'gravity',           function () {return fixedUnit('9.80665 m s^-2')});
  // atm is defined in Unit.js

  // Natural units
  utilsobject_obj(math, 'planckLength',      function () {return fixedUnit('1.61619997e-35 m')});
  utilsobject_obj(math, 'planckMass',        function () {return fixedUnit('2.1765113e-8 kg')});
  utilsobject_obj(math, 'planckTime',        function () {return fixedUnit('5.3910632e-44 s')});
  utilsobject_obj(math, 'planckCharge',      function () {return fixedUnit('1.87554595641e-18 C')});
  utilsobject_obj(math, 'planckTemperature', function () {return fixedUnit('1.41683385e+32 K')});

}

var factory_exportedObj = factory;
var lazy_exportedObj = false;
var math_exportedObj = true;
export { factory_exportedObj as factory };
export { lazy_exportedObj as lazy };
export { math_exportedObj as math };
