"use strict";

var _assert = require("assert");

var _assert2 = _interopRequireDefault(_assert);

var _approx = require("../../../tools/approx");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var math = require('../../../index');

describe('physical constants', function () {

    it('should return the correct value and unit for physical constants', function () {
        // NOte: to keep these unit tests readable and compact, the toString() of the units is compared

        // Universal constants
        _assert2.default.equal(math.speedOfLight.toString(), '2.99792458e+8 m / s');
        _assert2.default.equal(math.gravitationConstant.toString(), '6.673848e-11 m^3 / (kg s^2)');
        _assert2.default.equal(math.planckConstant.toString(), '6.626069311e-34 J s');
        _assert2.default.equal(math.reducedPlanckConstant.toString(), '1.05457172647e-34 J s');

        // Electromagnetic constants
        _assert2.default.equal(math.magneticConstant.toString(), '1.2566370614e-6 N / A^2');
        _assert2.default.equal(math.electricConstant.toString(), '8.854187817e-12 F / m');
        _assert2.default.equal(math.vacuumImpedance.toString(), '376.730313461 ohm');
        _assert2.default.equal(math.coulomb.toString(), '8.987551787368176e+9 (N m^2) / C^2');
        _assert2.default.equal(math.elementaryCharge.toString(), '1.60217656535e-19 C');
        _assert2.default.equal(math.bohrMagneton.toString(), '9.274009682e-24 J / T');
        _assert2.default.equal(math.conductanceQuantum.toString(), '7.748091734625e-5 S');
        _assert2.default.equal(math.inverseConductanceQuantum.toString(), '12906.403721742 ohm');
        _assert2.default.equal(math.magneticFluxQuantum.toString(), '2.06783375846e-15 Wb');
        _assert2.default.equal(math.nuclearMagneton.toString(), '5.0507835311e-27 J / T');
        _assert2.default.equal(math.klitzing.toString(), '25812.807443484 ohm');
        //assert.equal(math.josephson.toString(),                 '4.8359787011e-14 Hz V^-1');  // TODO: support for Hz needed

        // Atomic and nuclear constants
        _assert2.default.equal(math.bohrRadius.toString(), '5.291772109217e-11 m');
        _assert2.default.equal(math.classicalElectronRadius.toString(), '2.817940326727e-15 m');
        _assert2.default.equal(math.electronMass.toString(), '9.109382913999998e-31 kg');
        _assert2.default.equal(math.fermiCoupling.toString(), '1.1663645e-5 GeV^-2');
        (0, _approx.equal)(math.fineStructure.toString(), 7.297352569824e-3);
        _assert2.default.equal(math.hartreeEnergy.toString(), '4.3597443419e-18 J');
        _assert2.default.equal(math.protonMass.toString(), '1.67262177774e-27 kg');
        _assert2.default.equal(math.deuteronMass.toString(), '3.3435830926e-27 kg'); // round-off error
        _assert2.default.equal(math.neutronMass.toString(), '1.6749271613e-27 kg');
        _assert2.default.equal(math.quantumOfCirculation.toString(), '3.636947552024e-4 m^2 / s');
        _assert2.default.equal(math.rydberg.toString(), '1.097373156853955e+7 m^-1');
        _assert2.default.equal(math.thomsonCrossSection.toString(), '6.65245873413e-29 m^2');
        (0, _approx.equal)(math.weakMixingAngle.toString(), 0.222321);
        (0, _approx.equal)(math.efimovFactor.toString(), 22.7);

        // Physico-chemical constants
        _assert2.default.equal(math.atomicMass.toString(), '1.6605389217299995e-27 kg'); // round-off error
        _assert2.default.equal(math.avogadro.toString(), '6.0221412927e+23 mol^-1');
        _assert2.default.equal(math.boltzmann.toString(), '1.380648813e-23 J / K');
        _assert2.default.equal(math.faraday.toString(), '96485.336521 C / mol');
        _assert2.default.equal(math.firstRadiation.toString(), '3.7417715317e-16 W m^2');
        _assert2.default.equal(math.loschmidt.toString(), '2.686780524e+25 m^-3');
        _assert2.default.equal(math.gasConstant.toString(), '8.314462175 J / (K mol)');
        _assert2.default.equal(math.molarPlanckConstant.toString(), '3.990312717628e-10 (J s) / mol');
        _assert2.default.equal(math.molarVolume.toString(), '2.24139682e-10 m^3 / mol');
        (0, _approx.equal)(math.sackurTetrode.toString(), -1.164870823);
        _assert2.default.equal(math.secondRadiation.toString(), '0.01438777013 m K');
        _assert2.default.equal(math.stefanBoltzmann.toString(), '5.67037321e-8 W / (m^2 K^4)');
        _assert2.default.equal(math.wienDisplacement.toString(), '0.002897772126 m K');
        // assert.equal(math.spectralRadiance.toString(),   '1.19104286953e-16 W m^2 sr^-1'); // TODO spectralRadiance

        // Adopted values
        _assert2.default.equal(math.molarMass.toString(), '0.001 kg / mol');
        _assert2.default.equal(math.molarMassC12.toString(), '0.012 kg / mol');
        _assert2.default.equal(math.gravity.toString(), '9.80665 m / s^2');

        // Natural units
        _assert2.default.equal(math.planckLength.toString(), '1.61619997e-35 m');
        _assert2.default.equal(math.planckMass.toString(), '2.1765113e-8 kg');
        _assert2.default.equal(math.planckTime.toString(), '5.3910632e-44 s');
        _assert2.default.equal(math.planckCharge.toString(), '1.87554595641e-18 C');
        _assert2.default.equal(math.planckTemperature.toString(), '1.41683385e+32 K');
    });
});
