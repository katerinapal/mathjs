import assert_moduleDefault from "assert";
import { approx as approxjs } from "../../../tools/approx";
import { math as indexjs } from "../../../index";
var assert = {};
var approx = approxjs;
var math = indexjs;

describe('physical constants', function() {

  it('should return the correct value and unit for physical constants', function () {
    // NOte: to keep these unit tests readable and compact, the toString() of the units is compared

    // Universal constants
    assert.equal(indexjs.speedOfLight.toString(),         '2.99792458e+8 m / s');
    assert.equal(indexjs.gravitationConstant.toString(),  '6.673848e-11 m^3 / (kg s^2)');
    assert.equal(indexjs.planckConstant.toString(),       '6.626069311e-34 J s');
    assert.equal(indexjs.reducedPlanckConstant.toString(),'1.05457172647e-34 J s');

    // Electromagnetic constants
    assert.equal(indexjs.magneticConstant.toString(),          '1.2566370614e-6 N / A^2');
    assert.equal(indexjs.electricConstant.toString(),          '8.854187817e-12 F / m');
    assert.equal(indexjs.vacuumImpedance.toString(),           '376.730313461 ohm');
    assert.equal(indexjs.coulomb.toString(),                   '8.987551787368176e+9 (N m^2) / C^2');
    assert.equal(indexjs.elementaryCharge.toString(),          '1.60217656535e-19 C');
    assert.equal(indexjs.bohrMagneton.toString(),              '9.274009682e-24 J / T');
    assert.equal(indexjs.conductanceQuantum.toString(),        '7.748091734625e-5 S');
    assert.equal(indexjs.inverseConductanceQuantum.toString(), '12906.403721742 ohm'); 
    assert.equal(indexjs.magneticFluxQuantum.toString(),       '2.06783375846e-15 Wb');
    assert.equal(indexjs.nuclearMagneton.toString(),           '5.0507835311e-27 J / T');
    assert.equal(indexjs.klitzing.toString(),                  '25812.807443484 ohm');
    //assert.equal(math.josephson.toString(),                 '4.8359787011e-14 Hz V^-1');  // TODO: support for Hz needed

    // Atomic and nuclear constants
    assert.equal(indexjs.bohrRadius.toString(),              '5.291772109217e-11 m');
    assert.equal(indexjs.classicalElectronRadius.toString(), '2.817940326727e-15 m');
    assert.equal(indexjs.electronMass.toString(),            '9.109382913999998e-31 kg');
    assert.equal(indexjs.fermiCoupling.toString(),           '1.1663645e-5 GeV^-2');
    approxjs(indexjs.fineStructure.toString(),           7.297352569824e-3);
    assert.equal(indexjs.hartreeEnergy.toString(),           '4.3597443419e-18 J');
    assert.equal(indexjs.protonMass.toString(),              '1.67262177774e-27 kg');
    assert.equal(indexjs.deuteronMass.toString(),            '3.3435830926e-27 kg');  // round-off error
    assert.equal(indexjs.neutronMass.toString(),             '1.6749271613e-27 kg');
    assert.equal(indexjs.quantumOfCirculation.toString(),    '3.636947552024e-4 m^2 / s');
    assert.equal(indexjs.rydberg.toString(),                 '1.097373156853955e+7 m^-1');
    assert.equal(indexjs.thomsonCrossSection.toString(),     '6.65245873413e-29 m^2');
    approxjs(indexjs.weakMixingAngle.toString(),         0.222321);
    approxjs(indexjs.efimovFactor.toString(),            22.7);

    // Physico-chemical constants
    assert.equal(indexjs.atomicMass.toString(),          '1.6605389217299995e-27 kg');  // round-off error
    assert.equal(indexjs.avogadro.toString(),            '6.0221412927e+23 mol^-1');
    assert.equal(indexjs.boltzmann.toString(),           '1.380648813e-23 J / K');
    assert.equal(indexjs.faraday.toString(),             '96485.336521 C / mol');
    assert.equal(indexjs.firstRadiation.toString(),      '3.7417715317e-16 W m^2');
    assert.equal(indexjs.loschmidt.toString(),           '2.686780524e+25 m^-3');
    assert.equal(indexjs.gasConstant.toString(),         '8.314462175 J / (K mol)');
    assert.equal(indexjs.molarPlanckConstant.toString(), '3.990312717628e-10 (J s) / mol');
    assert.equal(indexjs.molarVolume.toString(),         '2.24139682e-10 m^3 / mol');
    approxjs(indexjs.sackurTetrode.toString(),       -1.164870823);
    assert.equal(indexjs.secondRadiation.toString(),     '0.01438777013 m K');
    assert.equal(indexjs.stefanBoltzmann.toString(),     '5.67037321e-8 W / (m^2 K^4)');
    assert.equal(indexjs.wienDisplacement.toString(),    '0.002897772126 m K');
    // assert.equal(math.spectralRadiance.toString(),   '1.19104286953e-16 W m^2 sr^-1'); // TODO spectralRadiance

    // Adopted values
    assert.equal(indexjs.molarMass.toString(),         '0.001 kg / mol');
    assert.equal(indexjs.molarMassC12.toString(),      '0.012 kg / mol');
    assert.equal(indexjs.gravity.toString(),           '9.80665 m / s^2');

    // Natural units
    assert.equal(indexjs.planckLength.toString(),      '1.61619997e-35 m');
    assert.equal(indexjs.planckMass.toString(),        '2.1765113e-8 kg');
    assert.equal(indexjs.planckTime.toString(),        '5.3910632e-44 s');
    assert.equal(indexjs.planckCharge.toString(),      '1.87554595641e-18 C');
    assert.equal(indexjs.planckTemperature.toString(), '1.41683385e+32 K');

  });

});
