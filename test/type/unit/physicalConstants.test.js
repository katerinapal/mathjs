import assert from "assert";
import { equal as toolsapprox_equaljs } from "../../../tools/approx";
import { indexjs as index_indexjsjs } from "../../../index";

describe('physical constants', function() {

  it('should return the correct value and unit for physical constants', function () {
    // NOte: to keep these unit tests readable and compact, the toString() of the units is compared

    // Universal constants
    assert.equal(index_indexjsjs.speedOfLight.toString(),         '2.99792458e+8 m / s');
    assert.equal(index_indexjsjs.gravitationConstant.toString(),  '6.673848e-11 m^3 / (kg s^2)');
    assert.equal(index_indexjsjs.planckConstant.toString(),       '6.626069311e-34 J s');
    assert.equal(index_indexjsjs.reducedPlanckConstant.toString(),'1.05457172647e-34 J s');

    // Electromagnetic constants
    assert.equal(index_indexjsjs.magneticConstant.toString(),          '1.2566370614e-6 N / A^2');
    assert.equal(index_indexjsjs.electricConstant.toString(),          '8.854187817e-12 F / m');
    assert.equal(index_indexjsjs.vacuumImpedance.toString(),           '376.730313461 ohm');
    assert.equal(index_indexjsjs.coulomb.toString(),                   '8.987551787368176e+9 (N m^2) / C^2');
    assert.equal(index_indexjsjs.elementaryCharge.toString(),          '1.60217656535e-19 C');
    assert.equal(index_indexjsjs.bohrMagneton.toString(),              '9.274009682e-24 J / T');
    assert.equal(index_indexjsjs.conductanceQuantum.toString(),        '7.748091734625e-5 S');
    assert.equal(index_indexjsjs.inverseConductanceQuantum.toString(), '12906.403721742 ohm'); 
    assert.equal(index_indexjsjs.magneticFluxQuantum.toString(),       '2.06783375846e-15 Wb');
    assert.equal(index_indexjsjs.nuclearMagneton.toString(),           '5.0507835311e-27 J / T');
    assert.equal(index_indexjsjs.klitzing.toString(),                  '25812.807443484 ohm');
    //assert.equal(math.josephson.toString(),                 '4.8359787011e-14 Hz V^-1');  // TODO: support for Hz needed

    // Atomic and nuclear constants
    assert.equal(index_indexjsjs.bohrRadius.toString(),              '5.291772109217e-11 m');
    assert.equal(index_indexjsjs.classicalElectronRadius.toString(), '2.817940326727e-15 m');
    assert.equal(index_indexjsjs.electronMass.toString(),            '9.109382913999998e-31 kg');
    assert.equal(index_indexjsjs.fermiCoupling.toString(),           '1.1663645e-5 GeV^-2');
    toolsapprox_equaljs(index_indexjsjs.fineStructure.toString(),           7.297352569824e-3);
    assert.equal(index_indexjsjs.hartreeEnergy.toString(),           '4.3597443419e-18 J');
    assert.equal(index_indexjsjs.protonMass.toString(),              '1.67262177774e-27 kg');
    assert.equal(index_indexjsjs.deuteronMass.toString(),            '3.3435830926e-27 kg');  // round-off error
    assert.equal(index_indexjsjs.neutronMass.toString(),             '1.6749271613e-27 kg');
    assert.equal(index_indexjsjs.quantumOfCirculation.toString(),    '3.636947552024e-4 m^2 / s');
    assert.equal(index_indexjsjs.rydberg.toString(),                 '1.097373156853955e+7 m^-1');
    assert.equal(index_indexjsjs.thomsonCrossSection.toString(),     '6.65245873413e-29 m^2');
    toolsapprox_equaljs(index_indexjsjs.weakMixingAngle.toString(),         0.222321);
    toolsapprox_equaljs(index_indexjsjs.efimovFactor.toString(),            22.7);

    // Physico-chemical constants
    assert.equal(index_indexjsjs.atomicMass.toString(),          '1.6605389217299995e-27 kg');  // round-off error
    assert.equal(index_indexjsjs.avogadro.toString(),            '6.0221412927e+23 mol^-1');
    assert.equal(index_indexjsjs.boltzmann.toString(),           '1.380648813e-23 J / K');
    assert.equal(index_indexjsjs.faraday.toString(),             '96485.336521 C / mol');
    assert.equal(index_indexjsjs.firstRadiation.toString(),      '3.7417715317e-16 W m^2');
    assert.equal(index_indexjsjs.loschmidt.toString(),           '2.686780524e+25 m^-3');
    assert.equal(index_indexjsjs.gasConstant.toString(),         '8.314462175 J / (K mol)');
    assert.equal(index_indexjsjs.molarPlanckConstant.toString(), '3.990312717628e-10 (J s) / mol');
    assert.equal(index_indexjsjs.molarVolume.toString(),         '2.24139682e-10 m^3 / mol');
    toolsapprox_equaljs(index_indexjsjs.sackurTetrode.toString(),       -1.164870823);
    assert.equal(index_indexjsjs.secondRadiation.toString(),     '0.01438777013 m K');
    assert.equal(index_indexjsjs.stefanBoltzmann.toString(),     '5.67037321e-8 W / (m^2 K^4)');
    assert.equal(index_indexjsjs.wienDisplacement.toString(),    '0.002897772126 m K');
    // assert.equal(math.spectralRadiance.toString(),   '1.19104286953e-16 W m^2 sr^-1'); // TODO spectralRadiance

    // Adopted values
    assert.equal(index_indexjsjs.molarMass.toString(),         '0.001 kg / mol');
    assert.equal(index_indexjsjs.molarMassC12.toString(),      '0.012 kg / mol');
    assert.equal(index_indexjsjs.gravity.toString(),           '9.80665 m / s^2');

    // Natural units
    assert.equal(index_indexjsjs.planckLength.toString(),      '1.61619997e-35 m');
    assert.equal(index_indexjsjs.planckMass.toString(),        '2.1765113e-8 kg');
    assert.equal(index_indexjsjs.planckTime.toString(),        '5.3910632e-44 s');
    assert.equal(index_indexjsjs.planckCharge.toString(),      '1.87554595641e-18 C');
    assert.equal(index_indexjsjs.planckTemperature.toString(), '1.41683385e+32 K');

  });

});
