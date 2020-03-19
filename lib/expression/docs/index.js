"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.factory = exports.path = exports.name = undefined;

var _bignumber = require("./construction/bignumber");

var _boolean = require("./construction/boolean");

var _complex = require("./construction/complex");

var _fraction = require("./construction/fraction");

var _index = require("./construction/index");

var _matrix = require("./construction/matrix");

var _number = require("./construction/number");

var _sparse = require("./construction/sparse");

var _string = require("./construction/string");

var _unit = require("./construction/unit");

var _e = require("./constants/e");

var _false = require("./constants/false");

var _i = require("./constants/i");

var _Infinity = require("./constants/Infinity");

var _LN = require("./constants/LN2");

var _LN2 = require("./constants/LN10");

var _LOG2E = require("./constants/LOG2E");

var _LOG10E = require("./constants/LOG10E");

var _NaN = require("./constants/NaN");

var _null = require("./constants/null");

var _pi = require("./constants/pi");

var _phi = require("./constants/phi");

var _SQRT1_ = require("./constants/SQRT1_2");

var _SQRT = require("./constants/SQRT2");

var _tau = require("./constants/tau");

var _true = require("./constants/true");

var _version = require("./constants/version");

var _lsolve = require("./function/algebra/lsolve");

var _lup = require("./function/algebra/lup");

var _lusolve = require("./function/algebra/lusolve");

var _slu = require("./function/algebra/slu");

var _usolve = require("./function/algebra/usolve");

var _abs = require("./function/arithmetic/abs");

var _add = require("./function/arithmetic/add");

var _cbrt = require("./function/arithmetic/cbrt");

var _ceil = require("./function/arithmetic/ceil");

var _cube = require("./function/arithmetic/cube");

var _divide = require("./function/arithmetic/divide");

var _dotDivide = require("./function/arithmetic/dotDivide");

var _dotMultiply = require("./function/arithmetic/dotMultiply");

var _dotPow = require("./function/arithmetic/dotPow");

var _exp = require("./function/arithmetic/exp");

var _fix = require("./function/arithmetic/fix");

var _floor = require("./function/arithmetic/floor");

var _gcd = require("./function/arithmetic/gcd");

var _hypot = require("./function/arithmetic/hypot");

var _lcm = require("./function/arithmetic/lcm");

var _log = require("./function/arithmetic/log");

var _log2 = require("./function/arithmetic/log10");

var _mod = require("./function/arithmetic/mod");

var _multiply = require("./function/arithmetic/multiply");

var _norm = require("./function/arithmetic/norm");

var _nthRoot = require("./function/arithmetic/nthRoot");

var _pow = require("./function/arithmetic/pow");

var _round = require("./function/arithmetic/round");

var _sign = require("./function/arithmetic/sign");

var _sqrt = require("./function/arithmetic/sqrt");

var _square = require("./function/arithmetic/square");

var _subtract = require("./function/arithmetic/subtract");

var _unaryMinus = require("./function/arithmetic/unaryMinus");

var _unaryPlus = require("./function/arithmetic/unaryPlus");

var _xgcd = require("./function/arithmetic/xgcd");

var _bitAnd = require("./function/bitwise/bitAnd");

var _bitNot = require("./function/bitwise/bitNot");

var _bitOr = require("./function/bitwise/bitOr");

var _bitXor = require("./function/bitwise/bitXor");

var _leftShift = require("./function/bitwise/leftShift");

var _rightArithShift = require("./function/bitwise/rightArithShift");

var _rightLogShift = require("./function/bitwise/rightLogShift");

var _bellNumbers = require("./function/combinatorics/bellNumbers");

var _catalan = require("./function/combinatorics/catalan");

var _composition = require("./function/combinatorics/composition");

var _stirlingS = require("./function/combinatorics/stirlingS2");

var _config = require("./core/config");

var _import = require("./core/import");

var _typed = require("./core/typed");

var _arg = require("./function/complex/arg");

var _conj = require("./function/complex/conj");

var _re = require("./function/complex/re");

var _im = require("./function/complex/im");

var _eval = require("./function/expression/eval");

var _help = require("./function/expression/help");

var _distance = require("./function/geometry/distance");

var functiongeometrydistance_distancejs = _interopRequireWildcard(_distance);

var _intersect = require("./function/geometry/intersect");

var _and = require("./function/logical/and");

var _not = require("./function/logical/not");

var _or = require("./function/logical/or");

var _xor = require("./function/logical/xor");

var _concat = require("./function/matrix/concat");

var _cross = require("./function/matrix/cross");

var _det = require("./function/matrix/det");

var _diag = require("./function/matrix/diag");

var _dot = require("./function/matrix/dot");

var _eye = require("./function/matrix/eye");

var _filter = require("./function/matrix/filter");

var _flatten = require("./function/matrix/flatten");

var _forEach = require("./function/matrix/forEach");

var _inv = require("./function/matrix/inv");

var _map = require("./function/matrix/map");

var _ones = require("./function/matrix/ones");

var _partitionSelect = require("./function/matrix/partitionSelect");

var _range = require("./function/matrix/range");

var _resize = require("./function/matrix/resize");

var _size = require("./function/matrix/size");

var _sort = require("./function/matrix/sort");

var _squeeze = require("./function/matrix/squeeze");

var _subset = require("./function/matrix/subset");

var _trace = require("./function/matrix/trace");

var _transpose = require("./function/matrix/transpose");

var _zeros = require("./function/matrix/zeros");

var _combinations = require("./function/probability/combinations");

var _factorial = require("./function/probability/factorial");

var _gamma = require("./function/probability/gamma");

var _kldivergence = require("./function/probability/kldivergence");

var _multinomial = require("./function/probability/multinomial");

var _permutations = require("./function/probability/permutations");

var _pickRandom = require("./function/probability/pickRandom");

var _random = require("./function/probability/random");

var _randomInt = require("./function/probability/randomInt");

var _compare = require("./function/relational/compare");

var _deepEqual = require("./function/relational/deepEqual");

var _equal = require("./function/relational/equal");

var _larger = require("./function/relational/larger");

var _largerEq = require("./function/relational/largerEq");

var _smaller = require("./function/relational/smaller");

var _smallerEq = require("./function/relational/smallerEq");

var _unequal = require("./function/relational/unequal");

var _max = require("./function/statistics/max");

var _mean = require("./function/statistics/mean");

var _median = require("./function/statistics/median");

var _min = require("./function/statistics/min");

var _mode = require("./function/statistics/mode");

var _prod = require("./function/statistics/prod");

var _quantileSeq = require("./function/statistics/quantileSeq");

var _std = require("./function/statistics/std");

var _sum = require("./function/statistics/sum");

var _var = require("./function/statistics/var");

var _acos = require("./function/trigonometry/acos");

var _acosh = require("./function/trigonometry/acosh");

var _acot = require("./function/trigonometry/acot");

var _acoth = require("./function/trigonometry/acoth");

var _acsc = require("./function/trigonometry/acsc");

var _acsch = require("./function/trigonometry/acsch");

var _asec = require("./function/trigonometry/asec");

var _asech = require("./function/trigonometry/asech");

var _asin = require("./function/trigonometry/asin");

var _asinh = require("./function/trigonometry/asinh");

var _atan = require("./function/trigonometry/atan");

var _atanh = require("./function/trigonometry/atanh");

var _atan2 = require("./function/trigonometry/atan2");

var _cos = require("./function/trigonometry/cos");

var _cosh = require("./function/trigonometry/cosh");

var _cot = require("./function/trigonometry/cot");

var _coth = require("./function/trigonometry/coth");

var _csc = require("./function/trigonometry/csc");

var _csch = require("./function/trigonometry/csch");

var _sec = require("./function/trigonometry/sec");

var _sech = require("./function/trigonometry/sech");

var _sin = require("./function/trigonometry/sin");

var _sinh = require("./function/trigonometry/sinh");

var _tan = require("./function/trigonometry/tan");

var _tanh = require("./function/trigonometry/tanh");

var _to = require("./function/units/to");

var _clone = require("./function/utils/clone");

var _format = require("./function/utils/format");

var _isNaN = require("./function/utils/isNaN");

var _isInteger = require("./function/utils/isInteger");

var _isNegative = require("./function/utils/isNegative");

var _isNumeric = require("./function/utils/isNumeric");

var _isPositive = require("./function/utils/isPositive");

var _isPrime = require("./function/utils/isPrime");

var _isZero = require("./function/utils/isZero");

var _typeof = require("./function/utils/typeof");

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function factory(construction, config, load, typed) {
  var docs = {};

  // construction functions
  docs.bignumber = _bignumber.bignumberjs;
  docs['boolean'] = _boolean.booleanjs;
  docs.complex = _complex.complexjs;
  docs.fraction = _fraction.fractionjs;
  docs.index = _index.indexjs;
  docs.matrix = _matrix.matrixjs;
  docs.number = _number.numberjs;
  docs.sparse = _sparse.sparsejs;
  docs.string = _string.stringjs;
  docs.unit = _unit.unitjs;

  // constants
  docs.e = _e.ejs;
  docs.E = _e.ejs;
  docs['false'] = _false.falsejs;
  docs.i = _i.ijs;
  docs['Infinity'] = _Infinity.Infinityjs;
  docs.LN2 = _LN.LN2js;
  docs.LN10 = _LN2.LN10js;
  docs.LOG2E = _LOG2E.LOG2Ejs;
  docs.LOG10E = _LOG10E.LOG10Ejs;
  docs.NaN = _NaN.NaNjs;
  docs['null'] = _null.nulljs;
  docs.pi = _pi.pijs;
  docs.PI = _pi.pijs;
  docs.phi = _phi.phijs;
  docs.SQRT1_2 = _SQRT1_.SQRT1_2js;
  docs.SQRT2 = _SQRT.SQRT2js;
  docs.tau = _tau.taujs;
  docs['true'] = _true.truejs;
  docs.version = _version.versionjs;

  // physical constants
  // TODO: more detailed docs for physical constants
  docs.speedOfLight = { description: 'Speed of light in vacuum', examples: ['speedOfLight'] };
  docs.gravitationConstant = { description: 'Newtonian constant of gravitation', examples: ['gravitationConstant'] };
  docs.planckConstant = { description: 'Planck constant', examples: ['planckConstant'] };
  docs.reducedPlanckConstant = { description: 'Reduced Planck constant', examples: ['reducedPlanckConstant'] };

  docs.magneticConstant = { description: 'Magnetic constant (vacuum permeability)', examples: ['magneticConstant'] };
  docs.electricConstant = { description: 'Electric constant (vacuum permeability)', examples: ['electricConstant'] };
  docs.vacuumImpedance = { description: 'Characteristic impedance of vacuum', examples: ['vacuumImpedance'] };
  docs.coulomb = { description: 'Coulomb\'s constant', examples: ['coulomb'] };
  docs.elementaryCharge = { description: 'Elementary charge', examples: ['elementaryCharge'] };
  docs.bohrMagneton = { description: 'Borh magneton', examples: ['bohrMagneton'] };
  docs.conductanceQuantum = { description: 'Conductance quantum', examples: ['conductanceQuantum'] };
  docs.inverseConductanceQuantum = { description: 'Inverse conductance quantum', examples: ['inverseConductanceQuantum'] };
  //docs.josephson = {description: 'Josephson constant', examples: ['josephson']};
  docs.magneticFluxQuantum = { description: 'Magnetic flux quantum', examples: ['magneticFluxQuantum'] };
  docs.nuclearMagneton = { description: 'Nuclear magneton', examples: ['nuclearMagneton'] };
  docs.klitzing = { description: 'Von Klitzing constant', examples: ['klitzing'] };

  docs.bohrRadius = { description: 'Borh radius', examples: ['bohrRadius'] };
  docs.classicalElectronRadius = { description: 'Classical electron radius', examples: ['classicalElectronRadius'] };
  docs.electronMass = { description: 'Electron mass', examples: ['electronMass'] };
  docs.fermiCoupling = { description: 'Fermi coupling constant', examples: ['fermiCoupling'] };
  docs.fineStructure = { description: 'Fine-structure constant', examples: ['fineStructure'] };
  docs.hartreeEnergy = { description: 'Hartree energy', examples: ['hartreeEnergy'] };
  docs.protonMass = { description: 'Proton mass', examples: ['protonMass'] };
  docs.deuteronMass = { description: 'Deuteron Mass', examples: ['deuteronMass'] };
  docs.neutronMass = { description: 'Neutron mass', examples: ['neutronMass'] };
  docs.quantumOfCirculation = { description: 'Quantum of circulation', examples: ['quantumOfCirculation'] };
  docs.rydberg = { description: 'Rydberg constant', examples: ['rydberg'] };
  docs.thomsonCrossSection = { description: 'Thomson cross section', examples: ['thomsonCrossSection'] };
  docs.weakMixingAngle = { description: 'Weak mixing angle', examples: ['weakMixingAngle'] };
  docs.efimovFactor = { description: 'Efimov factor', examples: ['efimovFactor'] };

  docs.atomicMass = { description: 'Atomic mass constant', examples: ['atomicMass'] };
  docs.avogadro = { description: 'Avogadro\'s number', examples: ['avogadro'] };
  docs.boltzmann = { description: 'Boltzmann constant', examples: ['boltzmann'] };
  docs.faraday = { description: 'Faraday constant', examples: ['faraday'] };
  docs.firstRadiation = { description: 'First radiation constant', examples: ['firstRadiation'] };
  docs.loschmidt = { description: 'Loschmidt constant at T=273.15 K and p=101.325 kPa', examples: ['loschmidt'] };
  docs.gasConstant = { description: 'Gas constant', examples: ['gasConstant'] };
  docs.molarPlanckConstant = { description: 'Molar Planck constant', examples: ['molarPlanckConstant'] };
  docs.molarVolume = { description: 'Molar volume of an ideal gas at T=273.15 K and p=101.325 kPa', examples: ['molarVolume'] };
  docs.sackurTetrode = { description: 'Sackur-Tetrode constant at T=1 K and p=101.325 kPa', examples: ['sackurTetrode'] };
  docs.secondRadiation = { description: 'Second radiation constant', examples: ['secondRadiation'] };
  docs.stefanBoltzmann = { description: 'Stefan-Boltzmann constant', examples: ['stefanBoltzmann'] };
  docs.wienDisplacement = { description: 'Wien displacement law constant', examples: ['wienDisplacement'] };
  //docs.spectralRadiance = {description: 'First radiation constant for spectral radiance', examples: ['spectralRadiance']};

  docs.molarMass = { description: 'Molar mass constant', examples: ['molarMass'] };
  docs.molarMassC12 = { description: 'Molar mass constant of carbon-12', examples: ['molarMassC12'] };
  docs.gravity = { description: 'Standard acceleration of gravity (standard acceleration of free-fall on Earth)', examples: ['gravity'] };

  docs.planckLength = { description: 'Planck length', examples: ['planckLength'] };
  docs.planckMass = { description: 'Planck mass', examples: ['planckMass'] };
  docs.planckTime = { description: 'Planck time', examples: ['planckTime'] };
  docs.planckCharge = { description: 'Planck charge', examples: ['planckCharge'] };
  docs.planckTemperature = { description: 'Planck temperature', examples: ['planckTemperature'] };

  // functions - algebra
  docs.lsolve = _lsolve.lsolvejs;
  docs.lup = _lup.lupjs;
  docs.lusolve = _lusolve.lusolvejs;
  docs.slu = _slu.slujs;
  docs.usolve = _usolve.usolvejs;

  // functions - arithmetic
  docs.abs = _abs.absjs;
  docs.add = _add.addjs;
  docs.cbrt = _cbrt.cbrtjs;
  docs.ceil = _ceil.ceiljs;
  docs.cube = _cube.cubejs;
  docs.divide = _divide.dividejs;
  docs.dotDivide = _dotDivide.dotDividejs;
  docs.dotMultiply = _dotMultiply.dotMultiplyjs;
  docs.dotPow = _dotPow.dotPowjs;
  docs.exp = _exp.expjs;
  docs.fix = _fix.fixjs;
  docs.floor = _floor.floorjs;
  docs.gcd = _gcd.gcdjs;
  docs.hypot = _hypot.hypotjs;
  docs.lcm = _lcm.lcmjs;
  docs.log = _log.logjs;
  docs.log10 = _log2.log10js;
  docs.mod = _mod.modjs;
  docs.multiply = _multiply.multiplyjs;
  docs.norm = _norm.normjs;
  docs.nthRoot = _nthRoot.nthRootjs;
  docs.pow = _pow.powjs;
  docs.round = _round.roundjs;
  docs.sign = _sign.signjs;
  docs.sqrt = _sqrt.sqrtjs;
  docs.square = _square.squarejs;
  docs.subtract = _subtract.subtractjs;
  docs.unaryMinus = _unaryMinus.unaryMinusjs;
  docs.unaryPlus = _unaryPlus.unaryPlusjs;
  docs.xgcd = _xgcd.xgcdjs;

  // functions - bitwise
  docs.bitAnd = _bitAnd.bitAndjs;
  docs.bitNot = _bitNot.bitNotjs;
  docs.bitOr = _bitOr.bitOrjs;
  docs.bitXor = _bitXor.bitXorjs;
  docs.leftShift = _leftShift.leftShiftjs;
  docs.rightArithShift = _rightArithShift.rightArithShiftjs;
  docs.rightLogShift = _rightLogShift.rightLogShiftjs;

  // functions - combinatorics
  docs.bellNumbers = _bellNumbers.bellNumbersjs;
  docs.catalan = _catalan.catalanjs;
  docs.composition = _composition.compositionjs;
  docs.stirlingS2 = _stirlingS.stirlingS2js;

  // functions - core
  docs['config'] = _config.configjs;
  docs['import'] = _import.importjs;
  docs['typed'] = _typed.typedjs;

  // functions - complex
  docs.arg = _arg.argjs;
  docs.conj = _conj.conjjs;
  docs.re = _re.rejs;
  docs.im = _im.imjs;

  // functions - expression
  docs['eval'] = _eval.evaljs;
  docs.help = _help.helpjs;

  // functions - geometry
  docs.distance = {};
  docs.intersect = _intersect.intersectjs;

  // functions - logical
  docs['and'] = _and.andjs;
  docs['not'] = _not.notjs;
  docs['or'] = _or.orjs;
  docs['xor'] = _xor.xorjs;

  // functions - matrix
  docs['concat'] = _concat.concatjs;
  docs.cross = _cross.crossjs;
  docs.det = _det.detjs;
  docs.diag = _diag.diagjs;
  docs.dot = _dot.dotjs;
  docs.eye = _eye.eyejs;
  docs.filter = _filter.filterjs;
  docs.flatten = _flatten.flattenjs;
  docs.forEach = _forEach.forEachjs;
  docs.inv = _inv.invjs;
  docs.map = _map.mapjs;
  docs.ones = _ones.onesjs;
  docs.partitionSelect = _partitionSelect.partitionSelectjs;
  docs.range = _range.rangejs;
  docs.resize = _resize.resizejs;
  docs.size = _size.sizejs;
  docs.sort = _sort.sortjs;
  docs.squeeze = _squeeze.squeezejs;
  docs.subset = _subset.subsetjs;
  docs.trace = _trace.tracejs;
  docs.transpose = _transpose.transposejs;
  docs.zeros = _zeros.zerosjs;

  // functions - probability
  docs.combinations = _combinations.combinationsjs;
  //docs.distribution = require('./function/probability/distribution');
  docs.factorial = _factorial.factorialjs;
  docs.gamma = _gamma.gammajs;
  docs.kldivergence = _kldivergence.kldivergencejs;
  docs.multinomial = _multinomial.multinomialjs;
  docs.permutations = _permutations.permutationsjs;
  docs.pickRandom = _pickRandom.pickRandomjs;
  docs.random = _random.randomjs;
  docs.randomInt = _randomInt.randomIntjs;

  // functions - relational
  docs.compare = _compare.comparejs;
  docs.deepEqual = _deepEqual.deepEqualjs;
  docs['equal'] = _equal.equaljs;
  docs.larger = _larger.largerjs;
  docs.largerEq = _largerEq.largerEqjs;
  docs.smaller = _smaller.smallerjs;
  docs.smallerEq = _smallerEq.smallerEqjs;
  docs.unequal = _unequal.unequaljs;

  // functions - statistics
  docs.max = _max.maxjs;
  docs.mean = _mean.meanjs;
  docs.median = _median.medianjs;
  docs.min = _min.minjs;
  docs.mode = _mode.modejs;
  docs.prod = _prod.prodjs;
  docs.quantileSeq = _quantileSeq.quantileSeqjs;
  docs.std = _std.stdjs;
  docs.sum = _sum.sumjs;
  docs['var'] = _var.varjs;

  // functions - trigonometry
  docs.acos = _acos.acosjs;
  docs.acosh = _acosh.acoshjs;
  docs.acot = _acot.acotjs;
  docs.acoth = _acoth.acothjs;
  docs.acsc = _acsc.acscjs;
  docs.acsch = _acsch.acschjs;
  docs.asec = _asec.asecjs;
  docs.asech = _asech.asechjs;
  docs.asin = _asin.asinjs;
  docs.asinh = _asinh.asinhjs;
  docs.atan = _atan.atanjs;
  docs.atanh = _atanh.atanhjs;
  docs.atan2 = _atan2.atan2js;
  docs.cos = _cos.cosjs;
  docs.cosh = _cosh.coshjs;
  docs.cot = _cot.cotjs;
  docs.coth = _coth.cothjs;
  docs.csc = _csc.cscjs;
  docs.csch = _csch.cschjs;
  docs.sec = _sec.secjs;
  docs.sech = _sech.sechjs;
  docs.sin = _sin.sinjs;
  docs.sinh = _sinh.sinhjs;
  docs.tan = _tan.tanjs;
  docs.tanh = _tanh.tanhjs;

  // functions - units
  docs.to = _to.tojs;

  // functions - utils
  docs.clone = _clone.clonejs;
  docs.format = _format.formatjs;
  docs.isNaN = _isNaN.isNaNjs;
  docs.isInteger = _isInteger.isIntegerjs;
  docs.isNegative = _isNegative.isNegativejs;
  docs.isNumeric = _isNumeric.isNumericjs;
  docs.isPositive = _isPositive.isPositivejs;
  docs.isPrime = _isPrime.isPrimejs;
  docs.isZero = _isZero.isZerojs;
  // docs.print = require('./function/utils/print'); // TODO: add documentation for print as soon as the parser supports objects.
  docs['typeof'] = _typeof.typeofjs;

  return docs;
}

var name_name = 'docs';
var path_path = 'expression';
var factory_factory = factory;
exports.name = name_name;
exports.path = path_path;
exports.factory = factory_factory;
